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
