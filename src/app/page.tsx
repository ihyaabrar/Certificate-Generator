'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { loadProjects, deleteProject, upsertProject } from '@/src/lib/storage';
import { generateId, formatDate } from '@/src/lib/utils';
import type { Project } from '@/src/types';

export default function Dashboard() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [showNew, setShowNew] = useState(false);
  const [newName, setNewName] = useState('');
  const [nameError, setNameError] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    setProjects(loadProjects());
  }, []);

  function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!newName.trim()) {
      setNameError('Nama proyek tidak boleh kosong');
      return;
    }
    setIsCreating(true);
    const project: Project = {
      id: generateId(),
      name: newName.trim(),
      templateId: 'formal',
      eventTitle: '',
      eventType: 'Peserta',
      organizer: '',
      date: formatDate(),
      location: '',
      logoDataURL: '',
      signer1Name: '',
      signer1Title: '',
      signer1SignatureURL: '',
      signer2Name: '',
      signer2Title: '',
      signer2SignatureURL: '',
      recipients: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    upsertProject(project);
    router.push(`/projects/${project.id}`);
  }

  function handleDelete(id: string, name: string) {
    if (!confirm(`Hapus proyek "${name}"?`)) return;
    deleteProject(id);
    setProjects(loadProjects());
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white text-sm font-bold shadow-sm">
              C
            </div>
            <span className="font-bold text-gray-900 text-lg">CertGen</span>
          </div>
          <button
            onClick={() => { setShowNew(true); setNewName(''); setNameError(''); }}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-full text-sm font-semibold transition-all shadow-sm hover:shadow-md flex items-center gap-1.5"
          >
            <span className="text-base leading-none">+</span>
            <span className="hidden sm:inline">Proyek Baru</span>
            <span className="sm:hidden">Baru</span>
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50 via-white to-white pt-16 pb-12 px-4 sm:px-6">
        {/* Background blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-100 rounded-full blur-3xl opacity-40 pointer-events-none" />
        <div className="absolute top-10 right-0 w-64 h-64 bg-emerald-200 rounded-full blur-3xl opacity-20 pointer-events-none" />

        <div className="relative max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            Generator Sertifikat Massal
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
            Buat Sertifikat{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">
              Massal
            </span>{' '}
            dengan Mudah
          </h1>
          <p className="text-gray-500 text-base sm:text-lg mb-8 max-w-xl mx-auto">
            Pilih template, isi data kegiatan, tambahkan penerima, dan download semua sertifikat sekaligus.
          </p>
          <button
            onClick={() => { setShowNew(true); setNewName(''); setNameError(''); }}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-full text-base font-semibold transition-all shadow-lg hover:shadow-emerald-200 hover:shadow-xl inline-flex items-center gap-2"
          >
            <span>Mulai Sekarang</span>
            <span>→</span>
          </button>
        </div>
      </section>

      {/* Stats bar */}
      {projects.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="grid grid-cols-3 gap-3 sm:gap-6 max-w-sm sm:max-w-lg mx-auto">
            {[
              { label: 'Proyek', value: projects.length },
              { label: 'Penerima', value: projects.reduce((s, p) => s + p.recipients.length, 0) },
              { label: 'Template', value: 8 },
            ].map(stat => (
              <div key={stat.label} className="text-center bg-emerald-50 rounded-2xl py-3 px-2">
                <div className="text-2xl font-extrabold text-emerald-600">{stat.value}</div>
                <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* New project form */}
      {showNew && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="bg-white rounded-2xl border border-emerald-200 shadow-lg shadow-emerald-50 p-5 sm:p-6">
            <h2 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-xs font-bold">+</span>
              Buat Proyek Baru
            </h2>
            <form onSubmit={handleCreate} className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <input
                  autoFocus
                  type="text"
                  value={newName}
                  onChange={e => { setNewName(e.target.value); setNameError(''); }}
                  placeholder="Nama proyek, contoh: Workshop UI/UX 2026"
                  className={`w-full border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-400 transition-all ${nameError ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50 focus:bg-white'}`}
                />
                {nameError && <p className="text-xs text-red-500 mt-1.5">{nameError}</p>}
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={isCreating}
                  className="flex-1 sm:flex-none bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all disabled:opacity-60"
                >
                  {isCreating ? 'Membuat...' : 'Buat'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowNew(false)}
                  className="flex-1 sm:flex-none border border-gray-200 text-gray-500 px-5 py-2.5 rounded-xl text-sm hover:bg-gray-50 transition-all"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </section>
      )}

      {/* Projects */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 pb-16">
        {projects.length === 0 && !showNew ? (
          /* Empty state */
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-emerald-50 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-5 shadow-inner">
              🎓
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Belum ada proyek</h2>
            <p className="text-gray-400 text-sm mb-6 max-w-xs mx-auto">
              Mulai dengan membuat proyek sertifikat pertama kamu
            </p>
            <button
              onClick={() => setShowNew(true)}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all shadow-md hover:shadow-lg"
            >
              Buat Proyek Pertama
            </button>
          </div>
        ) : projects.length > 0 ? (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-gray-800">Proyek Saya</h2>
              <span className="text-xs text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">{projects.length} proyek</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map(p => (
                <div
                  key={p.id}
                  className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all p-5 flex flex-col gap-4"
                >
                  {/* Card header */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-lg shadow-sm flex-shrink-0">
                      {p.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-sm leading-snug truncate">{p.name}</h3>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {new Date(p.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                  </div>

                  {/* Info */}
                  {p.eventTitle && (
                    <p className="text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg truncate">
                      📋 {p.eventTitle}
                    </p>
                  )}

                  {/* Stats */}
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                      {p.recipients.length} penerima
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-teal-400 rounded-full" />
                      {p.templateId}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-1">
                    <Link
                      href={`/projects/${p.id}`}
                      className="flex-1 text-center bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-2 rounded-xl text-xs font-semibold transition-all"
                    >
                      Buka →
                    </Link>
                    {p.recipients.length > 0 && (
                      <Link
                        href={`/projects/${p.id}/print`}
                        className="border border-emerald-200 text-emerald-600 hover:bg-emerald-50 px-3 py-2 rounded-xl text-xs font-semibold transition-all"
                      >
                        🖨️
                      </Link>
                    )}
                    <button
                      onClick={() => handleDelete(p.id, p.name)}
                      className="border border-red-100 text-red-400 hover:bg-red-50 px-3 py-2 rounded-xl text-xs transition-all"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-6 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white text-xs font-bold">C</div>
            <span className="font-medium text-gray-600">CertGen</span>
          </div>
          <span>Generator Sertifikat Massal · Data tersimpan di browser</span>
        </div>
      </footer>
    </div>
  );
}
