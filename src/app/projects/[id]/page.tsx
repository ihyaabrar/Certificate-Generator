'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getProject, upsertProject } from '@/src/lib/storage';
import {
  generateId,
  formatDate,
  generateCertNumber,
  regenerateCertNumbers,
  exportRecipientsToCSV,
  downloadText,
  parseExcelFile,
  parseCSVFile,
} from '@/src/lib/utils';
import {
  TEMPLATE_CATEGORIES,
  getTemplatesByCategory,
  EVENT_TYPES,
} from '@/src/lib/templates';
import CertificateRenderer from '@/src/components/templates/CertificateRenderer';
import type {
  Project,
  Recipient,
  TemplateId,
  CertificateData,
  TemplateDefinition,
  TemplateCategory,
  NumberingConfig,
  NumberingMode,
} from '@/src/types';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  X,
  Check,
  Trash,
  Printer,
  Eye,
  Upload,
  Image,
  PenLine,
  Users,
  Palette,
  ClipboardList,
  ArrowRight,
  Download,
} from '@/src/components/ui/Icons';

// ─── Constants ────────────────────────────────────────────────────────────────

const DEFAULT_NUMBERING: NumberingConfig = {
  mode: 'auto',
  prefix: '',
  suffix: String(new Date().getFullYear()),
  startFrom: 1,
  digits: 3,
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function handleFileUpload(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function buildCertData(project: Project, recipient: Recipient): CertificateData {
  return {
    eventTitle: project.eventTitle,
    eventType: project.eventType,
    organizer: project.organizer,
    date: project.date,
    location: project.location,
    recipientName: recipient.name,
    certificateNumber: recipient.certificateNumber,
    logoDataURL: project.logoDataURL || undefined,
    signer1Name: project.signer1Name || undefined,
    signer1Title: project.signer1Title || undefined,
    signer1SignatureURL: project.signer1SignatureURL || undefined,
    signer2Name: project.signer2Name || undefined,
    signer2Title: project.signer2Title || undefined,
    signer2SignatureURL: project.signer2SignatureURL || undefined,
  };
}

function certNumberPreview(config: NumberingConfig): string {
  const examples = [0, 1, 2].map((i) => generateCertNumber(config, i));
  return examples.join(', ') + '...';
}

// ─── Step Indicator ───────────────────────────────────────────────────────────

const STEPS = [
  { label: 'Template', icon: <Palette size={14} /> },
  { label: 'Info Kegiatan', icon: <ClipboardList size={14} /> },
  { label: 'Pengaturan', icon: <Check size={14} /> },
  { label: 'Penerima', icon: <Users size={14} /> },
  { label: 'Preview', icon: <Eye size={14} /> },
];

function StepIndicator({
  active,
  onChange,
}: {
  active: number;
  onChange: (i: number) => void;
}) {
  return (
    <div className="flex items-start justify-center gap-0 w-full overflow-x-auto pb-1">
      {STEPS.map((step, i) => {
        const done = i < active;
        const current = i === active;
        return (
          <div key={i} className="flex items-start flex-1 min-w-0">
            <div className="flex flex-col items-center flex-shrink-0">
              <button
                onClick={() => onChange(i)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all
                  ${done ? 'bg-emerald-500 text-white' : current ? 'bg-emerald-500 text-white ring-4 ring-emerald-100' : 'bg-gray-200 text-gray-500'}`}
              >
                {done ? <Check size={14} strokeWidth={3} /> : i + 1}
              </button>
              <span
                className={`mt-1 text-[10px] font-medium text-center leading-tight max-w-[60px] ${current ? 'text-emerald-600' : done ? 'text-emerald-500' : 'text-gray-400'}`}
              >
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className="flex-1 h-[2px] mt-4 mx-1 rounded-full transition-all"
                style={{ background: i < active ? '#10b981' : '#e5e7eb' }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Toast ────────────────────────────────────────────────────────────────────

interface ToastItem {
  id: string;
  message: string;
  type: 'success' | 'info' | 'undo';
  onUndo?: () => void;
}

function Toast({ toast, onDismiss }: { toast: ToastItem; onDismiss: (id: string) => void }) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-sm font-medium text-white animate-fade-in
        ${toast.type === 'success' ? 'bg-emerald-500' : toast.type === 'undo' ? 'bg-gray-800' : 'bg-blue-500'}`}
    >
      <span className="flex-1">{toast.message}</span>
      {toast.onUndo && (
        <button
          onClick={() => { toast.onUndo?.(); onDismiss(toast.id); }}
          className="underline text-white/90 hover:text-white text-xs font-semibold"
        >
          Batalkan
        </button>
      )}
      <button onClick={() => onDismiss(toast.id)} className="text-white/70 hover:text-white">
        <X size={14} />
      </button>
    </div>
  );
}

// ─── Input class ──────────────────────────────────────────────────────────────

const inputCls =
  'border border-gray-200 bg-gray-50 focus:bg-white rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-400 w-full transition';

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ProjectPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [project, setProject] = useState<Project | null>(null);
  const [tab, setTab] = useState(0);

  // Template tab state
  const [templateCategory, setTemplateCategory] = useState<TemplateCategory>('Semua');
  const [previewTemplate, setPreviewTemplate] = useState<TemplateDefinition | null>(null);

  // Recipients tab state
  const [bulkMode, setBulkMode] = useState(false);
  const [singleInput, setSingleInput] = useState('');
  const [bulkText, setBulkText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [lastDeleted, setLastDeleted] = useState<{ recipient: Recipient; index: number } | null>(null);
  const undoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Toast state
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  // Preview tab state
  const [previewIndex, setPreviewIndex] = useState(0);

  function showToast(message: string, type: ToastItem['type'] = 'success', onUndo?: () => void) {
    const toastId = generateId();
    setToasts((prev) => [...prev, { id: toastId, message, type, onUndo }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== toastId));
    }, 5000);
  }

  function dismissToast(id: string) {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }

  // Load project
  useEffect(() => {
    if (!id) return;
    const p = getProject(id);
    if (p) {
      // Backfill missing fields for old data
      const patched: Project = {
        ...p,
        numberingConfig: p.numberingConfig ?? DEFAULT_NUMBERING,
      };
      setProject(patched);
    } else {
      const newProject: Project = {
        id,
        name: 'Proyek Baru',
        templateId: 'formal',
        eventTitle: '',
        eventType: EVENT_TYPES[0],
        organizer: '',
        date: formatDate(new Date()),
        location: '',
        logoDataURL: '',
        signer1Name: '',
        signer1Title: '',
        signer1SignatureURL: '',
        signer2Name: '',
        signer2Title: '',
        signer2SignatureURL: '',
        numberingConfig: DEFAULT_NUMBERING,
        recipients: [],
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      upsertProject(newProject);
      setProject(newProject);
    }
  }, [id]);

  function save(updated: Project) {
    const p = { ...updated, updatedAt: Date.now() };
    setProject(p);
    upsertProject(p);
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-[Poppins,sans-serif]">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => router.push('/')}
            className="p-2 rounded-xl hover:bg-gray-100 text-gray-500 transition"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex-1 min-w-0">
            <input
              value={project.name}
              onChange={(e) => save({ ...project, name: e.target.value })}
              className="text-base font-semibold text-gray-800 bg-transparent outline-none w-full truncate"
              placeholder="Nama Proyek"
            />
          </div>
          <Link
            href={`/projects/${id}/print`}
            className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium px-4 py-2 rounded-xl transition"
          >
            <Printer size={16} />
            <span className="hidden sm:inline">Cetak</span>
          </Link>
        </div>
      </header>

      {/* Step Indicator */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <StepIndicator active={tab} onChange={setTab} />
        </div>
      </div>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-4 py-6">
        {tab === 0 && (
          <TemplateTab
            project={project}
            onSave={save}
            templateCategory={templateCategory}
            setTemplateCategory={setTemplateCategory}
            previewTemplate={previewTemplate}
            setPreviewTemplate={setPreviewTemplate}
            onNext={() => setTab(1)}
          />
        )}
        {tab === 1 && (
          <InfoTab
            project={project}
            onSave={save}
            onNext={() => setTab(2)}
            onBack={() => setTab(0)}
          />
        )}
        {tab === 2 && (
          <SettingsTab
            project={project}
            onSave={save}
            onNext={() => setTab(3)}
            onBack={() => setTab(1)}
            showToast={showToast}
          />
        )}
        {tab === 3 && (
          <RecipientsTab
            project={project}
            onSave={save}
            bulkMode={bulkMode}
            setBulkMode={setBulkMode}
            singleInput={singleInput}
            setSingleInput={setSingleInput}
            bulkText={bulkText}
            setBulkText={setBulkText}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
            lastDeleted={lastDeleted}
            setLastDeleted={setLastDeleted}
            undoTimerRef={undoTimerRef}
            onNext={() => setTab(4)}
            onBack={() => setTab(2)}
            showToast={showToast}
          />
        )}
        {tab === 4 && (
          <PreviewTab
            project={project}
            previewIndex={previewIndex}
            setPreviewIndex={setPreviewIndex}
            onBack={() => setTab(3)}
          />
        )}
      </main>

      {/* Toast container */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 w-full max-w-sm px-4 pointer-events-none">
        {toasts.map((t) => (
          <div key={t.id} className="pointer-events-auto">
            <Toast toast={t} onDismiss={dismissToast} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Tab 1: Template ──────────────────────────────────────────────────────────

function TemplateTab({
  project,
  onSave,
  templateCategory,
  setTemplateCategory,
  previewTemplate,
  setPreviewTemplate,
  onNext,
}: {
  project: Project;
  onSave: (p: Project) => void;
  templateCategory: TemplateCategory;
  setTemplateCategory: (c: TemplateCategory) => void;
  previewTemplate: TemplateDefinition | null;
  setPreviewTemplate: (t: TemplateDefinition | null) => void;
  onNext: () => void;
}) {
  const filtered = getTemplatesByCategory(templateCategory);

  const demoData: CertificateData = {
    eventTitle: project.eventTitle || 'Pelatihan Pengembangan SDM',
    eventType: project.eventType || 'Peserta',
    organizer: project.organizer || 'Organisasi Anda',
    date: project.date || formatDate(new Date()),
    location: project.location,
    recipientName: 'Nama Penerima',
    certificateNumber: 'CERT/001/2024',
    logoDataURL: project.logoDataURL || undefined,
    signer1Name: project.signer1Name || 'Nama Penandatangan',
    signer1Title: project.signer1Title || 'Jabatan',
    signer1SignatureURL: project.signer1SignatureURL || undefined,
    signer2Name: project.signer2Name || undefined,
    signer2Title: project.signer2Title || undefined,
    signer2SignatureURL: project.signer2SignatureURL || undefined,
  };

  return (
    <div className="space-y-5">
      {/* Category filter */}
      <div className="bg-white rounded-2xl shadow-sm p-4">
        <h2 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <Palette size={16} className="text-emerald-500" />
          Pilih Template
        </h2>
        <div className="flex flex-wrap gap-2">
          {TEMPLATE_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setTemplateCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition
                ${templateCategory === cat
                  ? 'bg-emerald-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Template grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {filtered.map((tpl) => {
          const selected = project.templateId === tpl.id;
          return (
            <div
              key={tpl.id}
              className={`bg-white rounded-2xl shadow-sm overflow-hidden border-2 transition cursor-pointer
                ${selected ? 'border-emerald-500' : 'border-transparent hover:border-emerald-200'}`}
            >
              <div
                className={`relative h-28 ${tpl.previewBg} flex items-center justify-center group`}
                onClick={() => setPreviewTemplate(tpl)}
              >
                <span className="text-xs font-semibold opacity-40 text-gray-700 px-2 text-center leading-tight">
                  {tpl.name}
                </span>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center gap-1">
                  <Eye size={20} className="text-white" />
                  <span className="text-white text-xs font-medium">Preview</span>
                </div>
                {selected && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                    <Check size={12} strokeWidth={3} className="text-white" />
                  </div>
                )}
              </div>
              <div className="p-2.5">
                <p className="text-xs font-semibold text-gray-800 truncate">{tpl.name}</p>
                <p className="text-[10px] text-gray-400 truncate mt-0.5">{tpl.description}</p>
                <button
                  onClick={() => onSave({ ...project, templateId: tpl.id as TemplateId })}
                  className={`mt-2 w-full text-xs font-medium py-1.5 rounded-lg transition
                    ${selected
                      ? 'bg-emerald-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-emerald-50 hover:text-emerald-600'}`}
                >
                  {selected ? 'Dipilih ✓' : 'Pilih'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Next button */}
      <div className="flex justify-end">
        <button
          onClick={onNext}
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition"
        >
          Lanjut ke Info Kegiatan
          <ArrowRight size={16} />
        </button>
      </div>

      {/* Preview Modal */}
      {previewTemplate && (
        <TemplatePreviewModal
          template={previewTemplate}
          data={demoData}
          selected={project.templateId === previewTemplate.id}
          onSelect={() => {
            onSave({ ...project, templateId: previewTemplate.id as TemplateId });
            setPreviewTemplate(null);
          }}
          onClose={() => setPreviewTemplate(null)}
        />
      )}
    </div>
  );
}

function TemplatePreviewModal({
  template,
  data,
  selected,
  onSelect,
  onClose,
}: {
  template: TemplateDefinition;
  data: CertificateData;
  selected: boolean;
  onSelect: () => void;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div>
            <h3 className="font-semibold text-gray-800">{template.name}</h3>
            <p className="text-xs text-gray-400 mt-0.5">{template.description}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-gray-100 text-gray-500 transition"
          >
            <X size={18} />
          </button>
        </div>
        <div className="bg-gray-100 p-4 flex items-start justify-center overflow-auto">
          <div style={{ width: 1122 * 0.58, height: 794 * 0.58, position: 'relative', flexShrink: 0 }}>
            <CertificateRenderer templateId={template.id as TemplateId} data={data} scale={0.58} />
          </div>
        </div>
        <div className="px-5 py-4 border-t border-gray-100 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-xl transition"
          >
            Tutup
          </button>
          <button
            onClick={onSelect}
            className={`flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-xl transition
              ${selected ? 'bg-gray-200 text-gray-600' : 'bg-emerald-500 hover:bg-emerald-600 text-white'}`}
          >
            {selected ? (
              <><Check size={15} strokeWidth={3} /> Sudah Dipilih</>
            ) : (
              <><Check size={15} strokeWidth={3} /> Pilih Template Ini</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Tab 2: Info Kegiatan ─────────────────────────────────────────────────────

function InfoTab({
  project,
  onSave,
  onNext,
  onBack,
}: {
  project: Project;
  onSave: (p: Project) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const logoInputRef = useRef<HTMLInputElement>(null);
  const sig1InputRef = useRef<HTMLInputElement>(null);
  const sig2InputRef = useRef<HTMLInputElement>(null);

  async function handleLogoUpload(file: File) {
    const url = await handleFileUpload(file);
    onSave({ ...project, logoDataURL: url });
  }

  async function handleSig1Upload(file: File) {
    const url = await handleFileUpload(file);
    onSave({ ...project, signer1SignatureURL: url });
  }

  async function handleSig2Upload(file: File) {
    const url = await handleFileUpload(file);
    onSave({ ...project, signer2SignatureURL: url });
  }

  return (
    <div className="space-y-5">
      {/* Informasi Kegiatan */}
      <div className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
        <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <ClipboardList size={16} className="text-emerald-500" />
          Informasi Kegiatan
        </h2>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5">
            Nama Kegiatan <span className="text-red-400">*</span>
          </label>
          <input
            className={inputCls}
            placeholder="Contoh: Pelatihan Kepemimpinan 2024"
            value={project.eventTitle}
            onChange={(e) => onSave({ ...project, eventTitle: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5">
            Jenis Sertifikat
          </label>
          <div className="flex flex-wrap gap-2">
            {EVENT_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => onSave({ ...project, eventType: type })}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition
                  ${project.eventType === type
                    ? 'bg-emerald-500 border-emerald-500 text-white'
                    : 'bg-white border-gray-200 text-gray-600 hover:border-emerald-300 hover:text-emerald-600'}`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5">Penyelenggara</label>
          <input
            className={inputCls}
            placeholder="Nama organisasi / institusi"
            value={project.organizer}
            onChange={(e) => onSave({ ...project, organizer: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5">Tanggal</label>
          <input
            className={inputCls}
            placeholder="Contoh: 15 Januari 2024"
            value={project.date}
            onChange={(e) => onSave({ ...project, date: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5">
            Lokasi <span className="text-gray-400 font-normal">(opsional)</span>
          </label>
          <input
            className={inputCls}
            placeholder="Contoh: Jakarta, Indonesia"
            value={project.location}
            onChange={(e) => onSave({ ...project, location: e.target.value })}
          />
        </div>
      </div>

      {/* Logo Organisasi */}
      <div className="bg-white rounded-2xl shadow-sm p-5 space-y-3">
        <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <Image size={16} className="text-emerald-500" />
          Logo Organisasi
        </h2>

        {project.logoDataURL ? (
          <div className="flex items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.logoDataURL}
              alt="Logo"
              className="h-16 w-auto object-contain rounded-lg border border-gray-200 bg-gray-50 p-1"
            />
            <button
              onClick={() => onSave({ ...project, logoDataURL: '' })}
              className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-600 transition"
            >
              <X size={14} /> Hapus Logo
            </button>
          </div>
        ) : (
          <button
            onClick={() => logoInputRef.current?.click()}
            className="w-full border-2 border-dashed border-gray-200 hover:border-emerald-300 rounded-xl p-6 flex flex-col items-center gap-2 text-gray-400 hover:text-emerald-500 transition"
          >
            <Upload size={24} />
            <span className="text-xs font-medium">Klik untuk upload logo</span>
            <span className="text-[10px]">PNG, JPG, SVG — maks 2MB</span>
          </button>
        )}
        <input
          ref={logoInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleLogoUpload(file);
            e.target.value = '';
          }}
        />
      </div>

      {/* Penandatangan */}
      <div className="bg-white rounded-2xl shadow-sm p-5 space-y-5">
        <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <PenLine size={16} className="text-emerald-500" />
          Penandatangan
        </h2>

        <SignerSection
          label="Penandatangan 1"
          name={project.signer1Name}
          title={project.signer1Title}
          signatureURL={project.signer1SignatureURL}
          inputRef={sig1InputRef}
          onNameChange={(v) => onSave({ ...project, signer1Name: v })}
          onTitleChange={(v) => onSave({ ...project, signer1Title: v })}
          onSignatureUpload={handleSig1Upload}
          onSignatureRemove={() => onSave({ ...project, signer1SignatureURL: '' })}
        />

        <div className="border-t border-gray-100" />

        <SignerSection
          label="Penandatangan 2 (opsional)"
          name={project.signer2Name}
          title={project.signer2Title}
          signatureURL={project.signer2SignatureURL}
          inputRef={sig2InputRef}
          onNameChange={(v) => onSave({ ...project, signer2Name: v })}
          onTitleChange={(v) => onSave({ ...project, signer2Title: v })}
          onSignatureUpload={handleSig2Upload}
          onSignatureRemove={() => onSave({ ...project, signer2SignatureURL: '' })}
        />
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 px-4 py-2.5 rounded-xl hover:bg-gray-100 transition"
        >
          <ChevronLeft size={16} /> Kembali
        </button>
        <button
          onClick={onNext}
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition"
        >
          Lanjut ke Pengaturan <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

function SignerSection({
  label,
  name,
  title,
  signatureURL,
  inputRef,
  onNameChange,
  onTitleChange,
  onSignatureUpload,
  onSignatureRemove,
}: {
  label: string;
  name: string;
  title: string;
  signatureURL: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onNameChange: (v: string) => void;
  onTitleChange: (v: string) => void;
  onSignatureUpload: (f: File) => void;
  onSignatureRemove: () => void;
}) {
  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5">Nama</label>
          <input
            className={inputCls}
            placeholder="Nama lengkap"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5">Jabatan</label>
          <input
            className={inputCls}
            placeholder="Jabatan / posisi"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1.5">
          Gambar Tanda Tangan
        </label>
        {signatureURL ? (
          <div className="flex items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={signatureURL}
              alt="Tanda tangan"
              className="h-12 w-auto object-contain rounded-lg border border-gray-200 bg-gray-50 p-1"
            />
            <button
              onClick={onSignatureRemove}
              className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-600 transition"
            >
              <X size={14} /> Hapus
            </button>
          </div>
        ) : (
          <button
            onClick={() => inputRef.current?.click()}
            className="w-full border-2 border-dashed border-gray-200 hover:border-emerald-300 rounded-xl p-4 flex items-center justify-center gap-2 text-gray-400 hover:text-emerald-500 transition"
          >
            <Upload size={18} />
            <span className="text-xs font-medium">Upload tanda tangan</span>
          </button>
        )}
        <p className="text-[10px] text-gray-400 mt-1">
          Upload gambar tanda tangan (PNG transparan direkomendasikan)
        </p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onSignatureUpload(file);
            e.target.value = '';
          }}
        />
      </div>
    </div>
  );
}

// ─── Tab 3: Pengaturan ────────────────────────────────────────────────────────

function SettingsTab({
  project,
  onSave,
  onNext,
  onBack,
  showToast,
}: {
  project: Project;
  onSave: (p: Project) => void;
  onNext: () => void;
  onBack: () => void;
  showToast: (msg: string, type?: ToastItem['type']) => void;
}) {
  const cfg = project.numberingConfig ?? DEFAULT_NUMBERING;

  function updateCfg(patch: Partial<NumberingConfig>) {
    onSave({ ...project, numberingConfig: { ...cfg, ...patch } });
  }

  function applyToAll() {
    const updated = regenerateCertNumbers(project.recipients, cfg);
    onSave({ ...project, recipients: updated });
    showToast(`Nomor sertifikat diperbarui untuk ${updated.length} penerima`, 'success');
  }

  const preview = certNumberPreview(cfg);

  return (
    <div className="space-y-5">
      {/* Nomor Sertifikat */}
      <div className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
        <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          {/* Hash icon via inline SVG */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500">
            <line x1="4" y1="9" x2="20" y2="9" /><line x1="4" y1="15" x2="20" y2="15" />
            <line x1="10" y1="3" x2="8" y2="21" /><line x1="16" y1="3" x2="14" y2="21" />
          </svg>
          Nomor Sertifikat
        </h2>

        {/* Mode toggle */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-2">Mode Penomoran</label>
          <div className="flex bg-gray-100 rounded-xl p-1 gap-1 w-fit">
            {(['auto', 'custom'] as NumberingMode[]).map((m) => (
              <button
                key={m}
                onClick={() => updateCfg({ mode: m })}
                className={`px-4 py-1.5 text-xs font-medium rounded-lg transition
                  ${cfg.mode === m ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                {m === 'auto' ? 'Otomatis' : 'Kustom'}
              </button>
            ))}
          </div>
        </div>

        {cfg.mode === 'auto' ? (
          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
            <p className="text-xs text-emerald-700 font-medium mb-1">Mode Otomatis</p>
            <p className="text-xs text-emerald-600">
              Nomor sertifikat akan dibuat otomatis secara berurutan.
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Contoh: <span className="font-mono font-semibold text-gray-700">{preview}</span>
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                  Prefix <span className="text-gray-400 font-normal">(opsional)</span>
                </label>
                <input
                  className={inputCls}
                  placeholder="Contoh: SK/WORKSHOP"
                  value={cfg.prefix}
                  onChange={(e) => updateCfg({ prefix: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                  Suffix <span className="text-gray-400 font-normal">(opsional)</span>
                </label>
                <input
                  className={inputCls}
                  placeholder="Contoh: 2026"
                  value={cfg.suffix}
                  onChange={(e) => updateCfg({ suffix: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Mulai dari</label>
                <input
                  type="number"
                  min={1}
                  className={inputCls}
                  value={cfg.startFrom}
                  onChange={(e) => updateCfg({ startFrom: Math.max(1, Number(e.target.value)) })}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                  Jumlah digit (3–5)
                </label>
                <input
                  type="number"
                  min={3}
                  max={5}
                  className={inputCls}
                  value={cfg.digits}
                  onChange={(e) => updateCfg({ digits: Math.min(5, Math.max(3, Number(e.target.value))) })}
                />
              </div>
            </div>

            {/* Live preview */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-3">
              <p className="text-xs text-gray-500 mb-1">Contoh hasil:</p>
              <p className="font-mono text-sm font-semibold text-gray-800">{preview}</p>
            </div>
          </div>
        )}

        {project.recipients.length > 0 && (
          <button
            onClick={applyToAll}
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition"
          >
            <Check size={15} strokeWidth={3} />
            Terapkan ke semua penerima ({project.recipients.length})
          </button>
        )}
      </div>

      {/* QR Code */}
      <div className="bg-white rounded-2xl shadow-sm p-5 space-y-3">
        <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          {/* QR icon */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500">
            <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" /><path d="M14 14h3v3h-3zM17 17h3v3h-3zM14 20h3" />
          </svg>
          QR Code
        </h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-700 font-medium">Aktifkan QR Code</p>
            <p className="text-xs text-gray-400 mt-0.5">
              QR code akan muncul di pojok sertifikat berisi nomor sertifikat
            </p>
          </div>
          <button
            onClick={() => onSave({ ...project, qrEnabled: !project.qrEnabled })}
            className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0
              ${project.qrEnabled ? 'bg-emerald-500' : 'bg-gray-200'}`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform
                ${project.qrEnabled ? 'translate-x-5' : 'translate-x-0'}`}
            />
          </button>
        </div>
      </div>

      {/* Watermark */}
      <div className="bg-white rounded-2xl shadow-sm p-5 space-y-3">
        <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          {/* Layers icon */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500">
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
          </svg>
          Watermark
        </h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-700 font-medium">Aktifkan Watermark</p>
            <p className="text-xs text-gray-400 mt-0.5">Teks watermark diagonal di atas sertifikat</p>
          </div>
          <button
            onClick={() =>
              onSave({
                ...project,
                watermarkText: project.watermarkText !== undefined
                  ? undefined
                  : 'DRAFT',
              })
            }
            className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0
              ${project.watermarkText !== undefined ? 'bg-emerald-500' : 'bg-gray-200'}`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform
                ${project.watermarkText !== undefined ? 'translate-x-5' : 'translate-x-0'}`}
            />
          </button>
        </div>
        {project.watermarkText !== undefined && (
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Teks Watermark</label>
            <input
              className={inputCls}
              placeholder="DRAFT"
              value={project.watermarkText}
              onChange={(e) => onSave({ ...project, watermarkText: e.target.value })}
            />
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 px-4 py-2.5 rounded-xl hover:bg-gray-100 transition"
        >
          <ChevronLeft size={16} /> Kembali
        </button>
        <button
          onClick={onNext}
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition"
        >
          Lanjut ke Penerima <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

// ─── Tab 4: Penerima ──────────────────────────────────────────────────────────

interface ImportPreview {
  rows: { name: string; customFields: Record<string, string> }[];
  nameColumn: string;
  extraColumns: string[];
}

function RecipientsTab({
  project,
  onSave,
  bulkMode,
  setBulkMode,
  singleInput,
  setSingleInput,
  bulkText,
  setBulkText,
  searchQuery,
  setSearchQuery,
  selectedIds,
  setSelectedIds,
  lastDeleted,
  setLastDeleted,
  undoTimerRef,
  onNext,
  onBack,
  showToast,
}: {
  project: Project;
  onSave: (p: Project) => void;
  bulkMode: boolean;
  setBulkMode: (v: boolean) => void;
  singleInput: string;
  setSingleInput: (v: string) => void;
  bulkText: string;
  setBulkText: (v: string) => void;
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  selectedIds: Set<string>;
  setSelectedIds: (v: Set<string>) => void;
  lastDeleted: { recipient: Recipient; index: number } | null;
  setLastDeleted: (v: { recipient: Recipient; index: number } | null) => void;
  undoTimerRef: React.MutableRefObject<ReturnType<typeof setTimeout> | null>;
  onNext: () => void;
  onBack: () => void;
  showToast: (msg: string, type?: ToastItem['type'], onUndo?: () => void) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importPreview, setImportPreview] = useState<ImportPreview | null>(null);
  const [importing, setImporting] = useState(false);

  const cfg = project.numberingConfig ?? DEFAULT_NUMBERING;

  function addSingle() {
    const name = singleInput.trim();
    if (!name) return;
    const idx = project.recipients.length;
    const recipient: Recipient = {
      id: generateId(),
      name,
      customFields: {},
      certificateNumber: generateCertNumber(cfg, idx),
    };
    onSave({ ...project, recipients: [...project.recipients, recipient] });
    setSingleInput('');
  }

  function importBulk() {
    const names = bulkText
      .split('\n')
      .map((n) => n.trim())
      .filter(Boolean);
    if (!names.length) return;
    const startIdx = project.recipients.length;
    const newRecipients: Recipient[] = names.map((name, i) => ({
      id: generateId(),
      name,
      customFields: {},
      certificateNumber: generateCertNumber(cfg, startIdx + i),
    }));
    onSave({ ...project, recipients: [...project.recipients, ...newRecipients] });
    setBulkText('');
    showToast(`${newRecipients.length} penerima berhasil ditambahkan`, 'success');
  }

  async function handleFileSelect(file: File) {
    setImporting(true);
    try {
      const ext = file.name.split('.').pop()?.toLowerCase();
      const rows = ext === 'csv' ? await parseCSVFile(file) : await parseExcelFile(file);
      if (!rows.length) {
        showToast('Tidak ada data ditemukan di file', 'info');
        return;
      }
      const extraColumns = rows.length > 0 ? Object.keys(rows[0].customFields) : [];
      setImportPreview({ rows, nameColumn: 'Nama', extraColumns });
    } catch {
      showToast('Gagal membaca file. Pastikan format file benar.', 'info');
    } finally {
      setImporting(false);
    }
  }

  function confirmImport() {
    if (!importPreview) return;
    const startIdx = project.recipients.length;
    const newRecipients: Recipient[] = importPreview.rows.map((row, i) => ({
      id: generateId(),
      name: row.name,
      customFields: row.customFields,
      certificateNumber: generateCertNumber(cfg, startIdx + i),
    }));
    onSave({ ...project, recipients: [...project.recipients, ...newRecipients] });
    setImportPreview(null);
    showToast(`${newRecipients.length} penerima berhasil diimport`, 'success');
  }

  function removeRecipient(id: string) {
    const idx = project.recipients.findIndex((r) => r.id === id);
    if (idx < 0) return;
    const recipient = project.recipients[idx];
    setLastDeleted({ recipient, index: idx });

    if (undoTimerRef.current) clearTimeout(undoTimerRef.current);
    undoTimerRef.current = setTimeout(() => setLastDeleted(null), 5000);

    onSave({ ...project, recipients: project.recipients.filter((r) => r.id !== id) });
    const savedRecipient = recipient;
    const savedIdx = idx;
    showToast(`Hapus "${recipient.name}"`, 'undo', () => {
      // undo: re-insert at original position
      const current = project.recipients.filter((r) => r.id !== id);
      const restored = [...current];
      restored.splice(savedIdx, 0, savedRecipient);
      onSave({ ...project, recipients: restored });
      setLastDeleted(null);
    });
  }

  function deleteSelected() {
    const count = selectedIds.size;
    onSave({
      ...project,
      recipients: project.recipients.filter((r) => !selectedIds.has(r.id)),
    });
    setSelectedIds(new Set());
    showToast(`${count} penerima dihapus`, 'success');
  }

  function toggleSelect(id: string) {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  }

  function toggleSelectAll(filtered: Recipient[]) {
    if (filtered.every((r) => selectedIds.has(r.id))) {
      const next = new Set(selectedIds);
      filtered.forEach((r) => next.delete(r.id));
      setSelectedIds(next);
    } else {
      const next = new Set(selectedIds);
      filtered.forEach((r) => next.add(r.id));
      setSelectedIds(next);
    }
  }

  function handleExportCSV() {
    const csv = exportRecipientsToCSV(project.recipients);
    downloadText(csv, 'penerima.csv');
  }

  const filteredRecipients = searchQuery.trim()
    ? project.recipients.filter((r) =>
        r.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : project.recipients;

  const bulkCount = bulkText
    .split('\n')
    .map((n) => n.trim())
    .filter(Boolean).length;

  // Collect all extra column keys across all recipients
  const extraKeys = Array.from(
    new Set(project.recipients.flatMap((r) => Object.keys(r.customFields)))
  );

  const allFilteredSelected =
    filteredRecipients.length > 0 &&
    filteredRecipients.every((r) => selectedIds.has(r.id));

  return (
    <div className="space-y-5">
      {/* Input section */}
      <div className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <Users size={16} className="text-emerald-500" />
            Tambah Penerima
          </h2>
          <div className="flex bg-gray-100 rounded-xl p-1 gap-1">
            <button
              onClick={() => setBulkMode(false)}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition
                ${!bulkMode ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-500'}`}
            >
              Satu per satu
            </button>
            <button
              onClick={() => setBulkMode(true)}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition
                ${bulkMode ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-500'}`}
            >
              Import massal
            </button>
          </div>
        </div>

        {!bulkMode ? (
          <div className="flex gap-2">
            <input
              className={inputCls}
              placeholder="Nama penerima sertifikat"
              value={singleInput}
              onChange={(e) => setSingleInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') { e.preventDefault(); addSingle(); }
              }}
            />
            <button
              onClick={addSingle}
              className="flex-shrink-0 flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition"
            >
              <Plus size={16} />
              <span className="hidden sm:inline">Tambah</span>
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <textarea
              className={`${inputCls} resize-none`}
              rows={6}
              placeholder={"Satu nama per baris:\nBudi Santoso\nSiti Rahayu\nAhmad Fauzi"}
              value={bulkText}
              onChange={(e) => setBulkText(e.target.value)}
            />
            <button
              onClick={importBulk}
              disabled={bulkCount === 0}
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium px-4 py-2.5 rounded-xl transition"
            >
              <Plus size={16} />
              Import {bulkCount > 0 ? `${bulkCount} nama` : 'nama'}
            </button>
          </div>
        )}

        {/* Excel/CSV import */}
        <div className="border-t border-gray-100 pt-4 flex flex-wrap gap-2">
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={importing}
            className="flex items-center gap-2 border border-emerald-300 text-emerald-600 hover:bg-emerald-50 text-xs font-medium px-3 py-2 rounded-xl transition disabled:opacity-50"
          >
            <Upload size={14} />
            {importing ? 'Membaca...' : 'Import Excel / CSV'}
          </button>
          {project.recipients.length > 0 && (
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 border border-gray-200 text-gray-600 hover:bg-gray-50 text-xs font-medium px-3 py-2 rounded-xl transition"
            >
              <Download size={14} />
              Export CSV
            </button>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.csv"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileSelect(file);
              e.target.value = '';
            }}
          />
        </div>
      </div>

      {/* Import preview modal */}
      {importPreview && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-semibold text-gray-800">Konfirmasi Import</h3>
              <button
                onClick={() => setImportPreview(null)}
                className="p-2 rounded-xl hover:bg-gray-100 text-gray-500 transition"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-5 space-y-3">
              <p className="text-sm text-gray-700">
                <span className="font-semibold text-emerald-600">{importPreview.rows.length} nama</span> ditemukan dari file.
              </p>
              <div className="text-xs text-gray-500">
                Kolom nama: <span className="font-semibold text-gray-700">{importPreview.nameColumn}</span>
              </div>
              {importPreview.extraColumns.length > 0 && (
                <div className="text-xs text-gray-500">
                  Kolom tambahan:{' '}
                  <span className="font-semibold text-gray-700">
                    {importPreview.extraColumns.join(', ')}
                  </span>
                </div>
              )}
              {/* Preview first 5 */}
              <div className="bg-gray-50 rounded-xl p-3 max-h-40 overflow-y-auto">
                {importPreview.rows.slice(0, 5).map((r, i) => (
                  <p key={i} className="text-xs text-gray-700 py-0.5">{i + 1}. {r.name}</p>
                ))}
                {importPreview.rows.length > 5 && (
                  <p className="text-xs text-gray-400 mt-1">...dan {importPreview.rows.length - 5} lainnya</p>
                )}
              </div>
            </div>
            <div className="px-5 py-4 border-t border-gray-100 flex justify-end gap-3">
              <button
                onClick={() => setImportPreview(null)}
                className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-xl transition"
              >
                Batal
              </button>
              <button
                onClick={confirmImport}
                className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium px-5 py-2 rounded-xl transition"
              >
                <Check size={15} strokeWidth={3} />
                Import Sekarang
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Recipients table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h2 className="text-sm font-semibold text-gray-700">Daftar Penerima</h2>
            <span className="text-xs text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">
              {project.recipients.length} orang
            </span>
          </div>

          {/* Search bar */}
          {project.recipients.length > 0 && (
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                </svg>
                <input
                  className="border border-gray-200 bg-gray-50 focus:bg-white rounded-xl pl-8 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-400 w-full transition"
                  placeholder="Cari nama penerima..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              {selectedIds.size > 0 && (
                <button
                  onClick={deleteSelected}
                  className="flex items-center gap-1.5 bg-red-500 hover:bg-red-600 text-white text-xs font-medium px-3 py-2 rounded-xl transition"
                >
                  <Trash size={13} />
                  Hapus {selectedIds.size} terpilih
                </button>
              )}
            </div>
          )}
        </div>

        {project.recipients.length === 0 ? (
          <div className="py-16 flex flex-col items-center gap-3 text-gray-300">
            <Users size={40} strokeWidth={1.5} />
            <p className="text-sm font-medium text-gray-400">Belum ada penerima</p>
            <p className="text-xs text-gray-300">Tambahkan nama penerima di atas</p>
          </div>
        ) : filteredRecipients.length === 0 ? (
          <div className="py-12 flex flex-col items-center gap-2 text-gray-300">
            <p className="text-sm font-medium text-gray-400">Tidak ada hasil untuk &ldquo;{searchQuery}&rdquo;</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-4 py-3 w-10">
                    <input
                      type="checkbox"
                      checked={allFilteredSelected}
                      onChange={() => toggleSelectAll(filteredRecipients)}
                      className="rounded accent-emerald-500"
                    />
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 w-10">No</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500">Nama</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 hidden sm:table-cell">
                    No. Sertifikat
                  </th>
                  {extraKeys.map((k) => (
                    <th key={k} className="px-4 py-3 text-xs font-semibold text-gray-500 hidden md:table-cell">
                      {k}
                    </th>
                  ))}
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 w-12 text-right">
                    Hapus
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredRecipients.map((r, i) => {
                  const globalIdx = project.recipients.indexOf(r);
                  return (
                    <tr
                      key={r.id}
                      className={`hover:bg-gray-50 transition ${selectedIds.has(r.id) ? 'bg-emerald-50' : ''}`}
                    >
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={selectedIds.has(r.id)}
                          onChange={() => toggleSelect(r.id)}
                          className="rounded accent-emerald-500"
                        />
                      </td>
                      <td className="px-4 py-3 text-gray-400 text-xs">{globalIdx + 1}</td>
                      <td className="px-4 py-3 text-gray-800 font-medium">{r.name}</td>
                      <td className="px-4 py-3 text-gray-400 text-xs hidden sm:table-cell font-mono">
                        {r.certificateNumber}
                      </td>
                      {extraKeys.map((k) => (
                        <td key={k} className="px-4 py-3 text-gray-500 text-xs hidden md:table-cell">
                          {r.customFields[k] ?? ''}
                        </td>
                      ))}
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => removeRecipient(r.id)}
                          className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                        >
                          <Trash size={14} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 px-4 py-2.5 rounded-xl hover:bg-gray-100 transition"
        >
          <ChevronLeft size={16} /> Kembali
        </button>
        <button
          onClick={onNext}
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition"
        >
          Lanjut ke Preview <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

// ─── Tab 5: Preview ───────────────────────────────────────────────────────────

function PreviewTab({
  project,
  previewIndex,
  setPreviewIndex,
  onBack,
}: {
  project: Project;
  previewIndex: number;
  setPreviewIndex: (i: number) => void;
  onBack: () => void;
}) {
  const recipients = project.recipients;
  const hasRecipients = recipients.length > 0;

  const safeIndex = hasRecipients
    ? Math.min(Math.max(previewIndex, 0), recipients.length - 1)
    : 0;

  const currentRecipient = hasRecipients ? recipients[safeIndex] : null;

  const certData: CertificateData = currentRecipient
    ? buildCertData(project, currentRecipient)
    : {
        eventTitle: project.eventTitle || 'Nama Kegiatan',
        eventType: project.eventType || 'Peserta',
        organizer: project.organizer || 'Penyelenggara',
        date: project.date || formatDate(new Date()),
        location: project.location,
        recipientName: 'Nama Penerima',
        certificateNumber: 'CERT/001/2024',
        logoDataURL: project.logoDataURL || undefined,
        signer1Name: project.signer1Name || undefined,
        signer1Title: project.signer1Title || undefined,
        signer1SignatureURL: project.signer1SignatureURL || undefined,
        signer2Name: project.signer2Name || undefined,
        signer2Title: project.signer2Title || undefined,
        signer2SignatureURL: project.signer2SignatureURL || undefined,
      };

  return (
    <div className="space-y-5">
      {/* Navigation bar */}
      {hasRecipients && (
        <div className="bg-white rounded-2xl shadow-sm p-4 flex items-center gap-3">
          <button
            onClick={() => setPreviewIndex(Math.max(safeIndex - 1, 0))}
            disabled={safeIndex === 0}
            className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            <ChevronLeft size={18} />
          </button>

          <select
            value={safeIndex}
            onChange={(e) => setPreviewIndex(Number(e.target.value))}
            className="flex-1 border border-gray-200 bg-gray-50 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-400 transition"
          >
            {recipients.map((r, i) => (
              <option key={r.id} value={i}>
                {i + 1}. {r.name}
              </option>
            ))}
          </select>

          <button
            onClick={() => setPreviewIndex(Math.min(safeIndex + 1, recipients.length - 1))}
            disabled={safeIndex === recipients.length - 1}
            className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            <ChevronRight size={18} />
          </button>

          <span className="text-xs text-gray-400 flex-shrink-0">
            {safeIndex + 1} / {recipients.length}
          </span>
        </div>
      )}

      {!hasRecipients && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-sm text-amber-700 flex items-center gap-2">
          <Users size={16} />
          Belum ada penerima — menampilkan preview dengan data contoh.
        </div>
      )}

      {/* Certificate preview */}
      <div className="bg-gray-200 rounded-2xl overflow-auto flex items-start justify-center p-6">
        <div style={{ width: 1122 * 0.6, height: 794 * 0.6, position: 'relative', flexShrink: 0 }}>
          <CertificateRenderer
            templateId={project.templateId}
            data={certData}
            scale={0.6}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row justify-between gap-3">
        <button
          onClick={onBack}
          className="flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-gray-700 px-4 py-2.5 rounded-xl hover:bg-gray-100 transition"
        >
          <ChevronLeft size={16} /> Kembali
        </button>
        <Link
          href={`/projects/${project.id}/print`}
          className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition"
        >
          <Printer size={16} />
          Generate &amp; Download
        </Link>
      </div>
    </div>
  );
}
