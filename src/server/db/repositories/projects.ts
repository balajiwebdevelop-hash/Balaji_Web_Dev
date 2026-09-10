import crypto from 'crypto';
import { Project } from '@/types';
import {
  memoryCache,
  invalidateMemoryCache,
  CACHE_TTL_MS,
  getDb,
  saveDb,
} from '../client';
import { mapSupabaseProject } from '../mappers';
import { ConflictError } from '../../errors';
import { isMySQLConfigured, query, queryOne, execute } from '../mysql';

export async function getProjects(options?: {
  publishedOnly?: boolean;
  featuredOnly?: boolean;
  search?: string;
  limit?: number;
  offset?: number;
}): Promise<Project[]> {
  const cacheKey = JSON.stringify(options || {});
  const now = Date.now();
  const cached = memoryCache.projects.get(cacheKey);
  if (cached && now - cached.timestamp < CACHE_TTL_MS) {
    return cached.data;
  }

  // 1. Hostinger MySQL Primary Layer
  if (isMySQLConfigured()) {
    try {
      let sql = 'SELECT * FROM projects WHERE 1=1';
      const params: any[] = [];
      if (options?.publishedOnly) {
        sql += ' AND is_published = 1';
      }
      if (options?.featuredOnly) {
        sql += ' AND is_featured = 1';
      }
      if (options?.search) {
        const term = `%${options.search}%`;
        sql += ' AND (title LIKE ? OR location LIKE ? OR project_type LIKE ? OR short_description LIKE ?)';
        params.push(term, term, term, term);
      }
      sql += ' ORDER BY sort_order ASC, created_at DESC';
      if (options?.limit) {
        sql += ' LIMIT ?';
        params.push(Number(options.limit));
        if (options?.offset) {
          sql += ' OFFSET ?';
          params.push(Number(options.offset));
        }
      }
      const rows = await query(sql, params);
      const projects = rows.map(mapSupabaseProject);
      memoryCache.projects.set(cacheKey, { data: projects, timestamp: now });
      return projects;
    } catch (mysqlErr) {
      console.warn('Hostinger MySQL getProjects failed, falling back:', mysqlErr);
    }
  }

  // 2. Unit Test / Local Fallback
  const db = getDb();
  let list = [...db.projects];
  if (options?.publishedOnly) {
    list = list.filter((p) => p.isPublished);
  }
  if (options?.featuredOnly) {
    list = list.filter((p) => p.isFeatured);
  }
  if (options?.search) {
    const q = options.search.toLowerCase();
    list = list.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.projectType.toLowerCase().includes(q)
    );
  }
  list.sort((a, b) => a.sortOrder - b.sortOrder);
  if (options?.offset) {
    list = list.slice(options.offset);
  }
  if (options?.limit) {
    list = list.slice(0, options.limit);
  }
  memoryCache.projects.set(cacheKey, { data: list, timestamp: now });
  return list;
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const now = Date.now();
  const cached = memoryCache.projectByIdOrSlug.get(slug);
  if (cached && now - cached.timestamp < CACHE_TTL_MS) {
    return cached.data;
  }

  // 1. Hostinger MySQL Primary Layer
  if (isMySQLConfigured()) {
    try {
      const row = await queryOne('SELECT * FROM projects WHERE slug = ? LIMIT 1', [slug]);
      if (row) {
        const project = mapSupabaseProject(row);
        memoryCache.projectByIdOrSlug.set(slug, { data: project, timestamp: now });
        return project;
      }
    } catch (mysqlErr) {
      console.warn('Hostinger MySQL getProjectBySlug failed, falling back:', mysqlErr);
    }
  }

  // 2. Unit Test / Local Fallback
  const db = getDb();
  const p = db.projects.find((pr) => pr.slug === slug) || null;
  memoryCache.projectByIdOrSlug.set(slug, { data: p, timestamp: now });
  return p;
}

export async function getProjectById(id: string): Promise<Project | null> {
  const now = Date.now();
  const cached = memoryCache.projectByIdOrSlug.get(id);
  if (cached && now - cached.timestamp < CACHE_TTL_MS) {
    return cached.data;
  }

  // 1. Hostinger MySQL Primary Layer
  if (isMySQLConfigured()) {
    try {
      const row = await queryOne('SELECT * FROM projects WHERE id = ? LIMIT 1', [id]);
      if (row) {
        const project = mapSupabaseProject(row);
        memoryCache.projectByIdOrSlug.set(id, { data: project, timestamp: now });
        return project;
      }
    } catch (mysqlErr) {
      console.warn('Hostinger MySQL getProjectById failed, falling back:', mysqlErr);
    }
  }

  // 2. Unit Test / Local Fallback
  const db = getDb();
  const p = db.projects.find((pr) => pr.id === id) || null;
  memoryCache.projectByIdOrSlug.set(id, { data: p, timestamp: now });
  return p;
}

export async function createProject(
  data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Project> {
  const now = new Date().toISOString();

  // 1. Hostinger MySQL Primary Layer
  if (isMySQLConfigured()) {
    try {
      const projId = `proj-${crypto.randomUUID()}`;
      await execute(
        `INSERT INTO projects (
          id, title, slug, location, year, project_type, area,
          short_description, description, hero_image, gallery,
          design_approach, materials_used, before_after, is_published,
          is_featured, sort_order, tags, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
        [
          projId,
          data.title,
          data.slug,
          data.location,
          data.year,
          data.projectType,
          data.area || '',
          data.shortDescription || '',
          data.description,
          data.heroImage,
          JSON.stringify(data.gallery || []),
          data.designApproach || '',
          JSON.stringify(data.materialsUsed || []),
          data.beforeAfter ? JSON.stringify(data.beforeAfter) : null,
          data.isPublished !== false ? 1 : 0,
          data.isFeatured ? 1 : 0,
          data.sortOrder || 0,
          JSON.stringify(data.tags || []),
        ]
      );
      invalidateMemoryCache('projects');

      const inserted = await queryOne('SELECT * FROM projects WHERE id = ?', [projId]);
      if (inserted) return mapSupabaseProject(inserted);
      throw new Error(`Failed to retrieve newly created project ${projId}`);
    } catch (mysqlErr: any) {
      if (mysqlErr instanceof ConflictError) throw mysqlErr;
      console.error('Hostinger MySQL createProject failed:', mysqlErr);
      throw mysqlErr;
    }
  }

  // 2. Unit Test / Local Fallback
  const db = getDb();
  const newProj: Project = {
    ...data,
    id: `proj-${Date.now()}-${crypto.randomBytes(2).toString('hex')}`,
    createdAt: now,
    updatedAt: now,
  };
  db.projects.push(newProj);
  saveDb(db);
  invalidateMemoryCache('projects');
  return newProj;
}

export async function updateProject(
  id: string,
  partial: Partial<Project>
): Promise<Project | null> {
  const now = new Date().toISOString();

  // 1. Hostinger MySQL Primary Layer
  if (isMySQLConfigured()) {
    try {
      const updates: string[] = ['updated_at = NOW()'];
      const params: any[] = [];
      if (partial.title !== undefined) { updates.push('title = ?'); params.push(partial.title); }
      if (partial.slug !== undefined) { updates.push('slug = ?'); params.push(partial.slug); }
      if (partial.location !== undefined) { updates.push('location = ?'); params.push(partial.location); }
      if (partial.year !== undefined) { updates.push('year = ?'); params.push(partial.year); }
      if (partial.projectType !== undefined) { updates.push('project_type = ?'); params.push(partial.projectType); }
      if (partial.area !== undefined) { updates.push('area = ?'); params.push(partial.area); }
      if (partial.shortDescription !== undefined) { updates.push('short_description = ?'); params.push(partial.shortDescription); }
      if (partial.description !== undefined) { updates.push('description = ?'); params.push(partial.description); }
      if (partial.heroImage !== undefined) { updates.push('hero_image = ?'); params.push(partial.heroImage); }
      if (partial.gallery !== undefined) { updates.push('gallery = ?'); params.push(JSON.stringify(partial.gallery)); }
      if (partial.designApproach !== undefined) { updates.push('design_approach = ?'); params.push(partial.designApproach); }
      if (partial.materialsUsed !== undefined) { updates.push('materials_used = ?'); params.push(JSON.stringify(partial.materialsUsed)); }
      if (partial.beforeAfter !== undefined) { updates.push('before_after = ?'); params.push(partial.beforeAfter ? JSON.stringify(partial.beforeAfter) : null); }
      if (partial.isPublished !== undefined) { updates.push('is_published = ?'); params.push(partial.isPublished ? 1 : 0); }
      if (partial.isFeatured !== undefined) { updates.push('is_featured = ?'); params.push(partial.isFeatured ? 1 : 0); }
      if (partial.sortOrder !== undefined) { updates.push('sort_order = ?'); params.push(partial.sortOrder); }
      if (partial.tags !== undefined) { updates.push('tags = ?'); params.push(JSON.stringify(partial.tags)); }

      params.push(id);
      await execute(`UPDATE projects SET ${updates.join(', ')} WHERE id = ?`, params);
      invalidateMemoryCache('projects');

      const updated = await queryOne('SELECT * FROM projects WHERE id = ?', [id]);
      return updated ? mapSupabaseProject(updated) : null;
    } catch (mysqlErr: any) {
      if (mysqlErr instanceof ConflictError) throw mysqlErr;
      console.error('Hostinger MySQL updateProject failed:', mysqlErr);
      throw mysqlErr;
    }
  }

  // 2. Unit Test / Local Fallback
  const db = getDb();
  const index = db.projects.findIndex((p) => p.id === id);
  if (index === -1) return null;

  db.projects[index] = {
    ...db.projects[index],
    ...partial,
    updatedAt: now,
  };
  saveDb(db);
  invalidateMemoryCache('projects');
  return db.projects[index];
}

export async function deleteProject(id: string): Promise<boolean> {
  // 1. Hostinger MySQL Primary Layer
  if (isMySQLConfigured()) {
    try {
      const res = await execute('DELETE FROM projects WHERE id = ?', [id]);
      invalidateMemoryCache('projects');
      return res.affectedRows > 0;
    } catch (mysqlErr: any) {
      console.error('Hostinger MySQL deleteProject failed:', mysqlErr);
      throw mysqlErr;
    }
  }

  // 2. Unit Test / Local Fallback
  const db = getDb();
  const initialLength = db.projects.length;
  db.projects = db.projects.filter((p) => p.id !== id);
  if (db.projects.length < initialLength) {
    saveDb(db);
    invalidateMemoryCache('projects');
    return true;
  }
  return false;
}
