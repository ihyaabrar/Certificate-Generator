'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getProject } from '@/src/lib/storage';
import { formatDate } from '@/src/lib/utils';
import CertificateRenderer from '@/src/components/templates/CertificateRenderer';
import type { Project, CertificateData, Recipient } from '@/src/types';

function buildCertData(project: Project, recipient: Recipient): CertificateData {
  return {
    eventTitle: project.eventTitle || 'Nama Kegiatan',
    eventType: project.eventType || 'Peserta',
    organizer: project.organizer || 'Nama Organisasi',
    date: project.date || formatDate(),
    location: project.location,
    recipientName: recipient.name,
    certificateNumber: recipient.certificateNumber,
    logoDataURL: project.logoDataURL || undefined,
    signer1Name: project.signer1Name,
    signer1Title: project.signer1Title,
    signer1SignatureURL: project.signer1SignatureURL || undefined,
    signer2Name: project.signer2Name,
    signer2Title: project.signer2Title,
    signer2SignatureURL: project.signer2SignatureURL || undefined,
  };
}

export default function PrintPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [printed, setPrinted] = useState(false);

  useEffect(() => {
    const p = getProject(params.id);
    if (!p) { router.push('/'); return; }
    setProject(p);
  }, [params.id, router]);

  if (!project) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="animate-spin h-8 w-8 border-4 border-emerald-200 border-t-emerald-500 rounded-full" />
    </div>
  );

  const recipients = project.recipients.length > 0
    ? project.recipients
    : [{ id: 'preview', name: 'Nama Penerima', certificateNumber: '001', customFields: {} }];

  return (
    <div className="min-h-screen bg-white">
      {/* Control bar */}
      <div className="no-print sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <Link href={`/projects/${project.id}`} className="text-gray-400 hover:text-emerald-600 transition-colors flex-shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </Link>
            <div className="min-w-0">
              <span className="font-semibold text-gray-800 text-sm truncate block">{project.name}</span>
              <span className="text-xs text-gray-400">{recipients.length} sertifikat</span>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {printed && <span className="text-xs text-emerald-600 hidden sm:block">✓ Dialog print dibuka</span>}
            <button
              onClick={() => { window.print(); setPrinted(true); }}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 sm:px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-sm hover:shadow-md flex items-center gap-1.5"
            >
              🖨️ <span className="hidden sm:inline">Print / Simpan PDF</span>
              <span className="sm:hidden">Print</span>
            </button>
          </div>
        </div>

        {/* Tip bar */}
        <div className="bg-emerald-50 border-t border-emerald-100 px-4 sm:px-6 py-2">
          <p className="text-xs text-emerald-700 max-w-5xl mx-auto">
            💡 <strong>Download PDF:</strong> Klik Print → pilih <strong>"Save as PDF"</strong> → Simpan
          </p>
        </div>
      </div>

      {/* Print area — rendered at actual print size */}
      <div className="print-area">
        {recipients.map((recipient, i) => (
          <div
            key={recipient.id}
            className="certificate-page"
            style={{
              width: 1122,
              height: 794,
              pageBreakAfter: i < recipients.length - 1 ? 'always' : 'auto',
              breakAfter: i < recipients.length - 1 ? 'page' : 'auto',
              margin: '0 auto',
              overflow: 'hidden',
            }}
          >
            <CertificateRenderer
              templateId={project.templateId}
              data={buildCertData(project, recipient)}
              scale={1}
            />
          </div>
        ))}
      </div>

      {/* Preview list */}
      <div className="no-print max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6 pb-20">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-gray-800">Semua Sertifikat</h2>
          <span className="text-xs text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">{recipients.length} sertifikat</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {recipients.map((recipient) => (
            <div key={recipient.id} className="bg-gray-50 rounded-2xl border border-gray-100 p-3 overflow-hidden">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {recipient.name.charAt(0).toUpperCase()}
                </div>
                <p className="text-xs font-semibold text-gray-700 truncate">{recipient.name}</p>
                <span className="text-xs text-gray-400 font-mono ml-auto flex-shrink-0">#{recipient.certificateNumber}</span>
              </div>
              <div className="overflow-auto rounded-xl">
                <div style={{ width: 1122 * 0.44, height: 794 * 0.44, position: 'relative' }}>
                  <CertificateRenderer templateId={project.templateId} data={buildCertData(project, recipient)} scale={0.44} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center pt-4">
          <button
            onClick={() => { window.print(); setPrinted(true); }}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-full text-base font-semibold transition-all shadow-lg hover:shadow-emerald-200 hover:shadow-xl inline-flex items-center gap-2"
          >
            🖨️ Print / Simpan PDF
          </button>
          <p className="text-xs text-gray-400 mt-3">Pilih "Save as PDF" di dialog print untuk download</p>
        </div>
      </div>
    </div>
  );
}
