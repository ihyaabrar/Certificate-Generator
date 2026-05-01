'use client';

import type { Project } from '@/src/types';

const STORAGE_KEY = 'cert-gen-projects';

export function loadProjects(): Project[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Project[];
  } catch {
    return [];
  }
}

export function saveProjects(projects: Project[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export function getProject(id: string): Project | null {
  return loadProjects().find((p) => p.id === id) ?? null;
}

export function upsertProject(project: Project): void {
  const projects = loadProjects();
  const idx = projects.findIndex((p) => p.id === project.id);
  if (idx >= 0) {
    projects[idx] = project;
  } else {
    projects.unshift(project);
  }
  saveProjects(projects);
}

export function deleteProject(id: string): void {
  const projects = loadProjects().filter((p) => p.id !== id);
  saveProjects(projects);
}

export function duplicateProject(id: string): Project | null {
  const original = getProject(id);
  if (!original) return null;
  const copy: Project = {
    ...original,
    id: crypto.randomUUID(),
    name: `${original.name} (Salinan)`,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  upsertProject(copy);
  return copy;
}

// ─── Backup / Restore ─────────────────────────────────────────────────────────

export function exportAllData(): string {
  const projects = loadProjects();
  return JSON.stringify({ version: 1, exportedAt: Date.now(), projects }, null, 2);
}

export function importAllData(json: string): { success: boolean; count: number; error?: string } {
  try {
    const data = JSON.parse(json) as { version: number; projects: Project[] };
    if (!Array.isArray(data.projects)) throw new Error('Format tidak valid');
    const existing = loadProjects();
    const existingIds = new Set(existing.map(p => p.id));
    const toImport = data.projects.filter(p => !existingIds.has(p.id));
    saveProjects([...toImport, ...existing]);
    return { success: true, count: toImport.length };
  } catch (e) {
    return { success: false, count: 0, error: e instanceof Error ? e.message : 'Error tidak diketahui' };
  }
}
