import crypto from 'crypto';
import { Project } from '@/types';
import {
  isSupabaseConfigured,
  getServiceSupabase,
  memoryCache,
  invalidateMemoryCache,
  CACHE_TTL_MS,
  getDb,
  saveDb,
} from '../client';
import { mapSupabaseProject } from '../mappers';

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

  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    let query = supabase.from('projects').select('*').order('sort_order', { ascending: true });

    if (options?.publishedOnly) {
      query = query.eq('is_published', true);
    }
    if (options?.featuredOnly) {
      query = query.eq('is_featured', true);
    }
    if (options?.search) {
      const term = `%${options.search}%`;
      query = query.or(`title.ilike.${term},location.ilike.${term},project_type.ilike.${term},short_description.ilike.${term}`);
    }
    if (options?.limit) {
      query = query.limit(options.limit);
    }
    if (options?.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 50) - 1);
    }

    const { data, error } = await query;
    if (error) {
      console.error('Supabase getProjects error:', error);
      if (
        process.env.NEXT_PHASE === 'phase-production-build' ||
        error.message?.includes('fetch failed') ||
        error.message?.includes('ENOTFOUND')
      ) {
        console.warn('Supabase unreachable. Falling back to projects fixture.');
      } else {
        throw new Error(`Failed to load projects from database: ${error.message}`);
      }
    } else {
      const projects = (data || []).map(mapSupabaseProject);
      memoryCache.projects.set(cacheKey, { data: projects, timestamp: now });
      return projects;
    }
  }

  const db = getDb();
  let result = [...db.projects];
  if (options?.publishedOnly) {
    result = result.filter((p) => p.isPublished);
  }
  if (options?.featuredOnly) {
    result = result.filter((p) => p.isFeatured);
  }
  if (options?.search) {
    const term = options.search.toLowerCase();
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(term) ||
        p.location.toLowerCase().includes(term) ||
        p.projectType.toLowerCase().includes(term) ||
        p.shortDescription.toLowerCase().includes(term)
    );
  }
  if (options?.offset) {
    result = result.slice(options.offset);
  }
  if (options?.limit) {
    result = result.slice(0, options.limit);
  }

  memoryCache.projects.set(cacheKey, { data: result, timestamp: now });
  return result;
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const now = Date.now();
  const cached = memoryCache.projectByIdOrSlug.get(`slug:${slug}`);
  if (cached && now - cached.timestamp < CACHE_TTL_MS) {
    return cached.data;
  }

  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const { data, error } = await supabase.from('projects').select('*').eq('slug', slug).maybeSingle();
    if (error) {
      console.error('Supabase getProjectBySlug error:', error);
      if (
        process.env.NEXT_PHASE === 'phase-production-build' ||
        error.message?.includes('fetch failed') ||
        error.message?.includes('ENOTFOUND')
      ) {
        console.warn(`Supabase unreachable. Falling back to projects fixture for slug ${slug}.`);
      } else {
        throw new Error(`Database error loading project ${slug}: ${error.message}`);
      }
    } else {
      const project = data ? mapSupabaseProject(data) : null;
      memoryCache.projectByIdOrSlug.set(`slug:${slug}`, { data: project, timestamp: now });
      return project;
    }
  }

  const db = getDb();
  const project = db.projects.find((p) => p.slug === slug) || null;
  memoryCache.projectByIdOrSlug.set(`slug:${slug}`, { data: project, timestamp: now });
  return project;
}

export async function getProjectById(id: string): Promise<Project | null> {
  const now = Date.now();
  const cached = memoryCache.projectByIdOrSlug.get(`id:${id}`);
  if (cached && now - cached.timestamp < CACHE_TTL_MS) {
    return cached.data;
  }

  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const { data, error } = await supabase.from('projects').select('*').eq('id', id).maybeSingle();
    if (error) {
      console.error('Supabase getProjectById error:', error);
      if (
        process.env.NEXT_PHASE === 'phase-production-build' ||
        error.message?.includes('fetch failed') ||
        error.message?.includes('ENOTFOUND')
      ) {
        console.warn(`Supabase unreachable. Falling back to projects fixture for id ${id}.`);
      } else {
        throw new Error(`Database error loading project ${id}: ${error.message}`);
      }
    } else {
      const project = data ? mapSupabaseProject(data) : null;
      memoryCache.projectByIdOrSlug.set(`id:${id}`, { data: project, timestamp: now });
      return project;
    }
  }

  const db = getDb();
  const project = db.projects.find((p) => p.id === id) || null;
  memoryCache.projectByIdOrSlug.set(`id:${id}`, { data: project, timestamp: now });
  return project;
}

export async function createProject(
  data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Project> {
  const now = new Date().toISOString();

  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const { data: inserted, error } = await supabase
      .from('projects')
      .insert({
        title: data.title,
        slug: data.slug,
        location: data.location || '',
        year: data.year || String(new Date().getFullYear()),
        area: data.area || '',
        project_type: data.projectType,
        short_description: data.shortDescription || '',
        description: data.description || '',
        hero_image: data.heroImage || '',
        gallery: data.gallery || [],
        design_approach: data.designApproach || '',
        materials_used: data.materialsUsed || [],
        is_featured: Boolean(data.isFeatured),
        is_published: data.isPublished !== false,
        sort_order: data.sortOrder || 0,
        tags: data.tags || [],
        created_at: now,
        updated_at: now,
      })
      .select()
      .single();

    if (error || !inserted) {
      console.error('Supabase createProject error:', error);
      throw new Error(`Failed to create project: ${error?.message}`);
    }

    invalidateMemoryCache('projects');
    return mapSupabaseProject(inserted);
  }

  const db = getDb();
  const newProj: Project = {
    ...data,
    id: `proj-${Date.now()}-${crypto.randomBytes(2).toString('hex')}`,
    createdAt: now,
    updatedAt: now,
  };
  db.projects.unshift(newProj);
  saveDb(db);
  invalidateMemoryCache('projects');
  return newProj;
}

export async function updateProject(
  id: string,
  partial: Partial<Project>
): Promise<Project | null> {
  const now = new Date().toISOString();

  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const updates: any = { updated_at: now };
    if (partial.title !== undefined) updates.title = partial.title;
    if (partial.slug !== undefined) updates.slug = partial.slug;
    if (partial.location !== undefined) updates.location = partial.location;
    if (partial.year !== undefined) updates.year = partial.year;
    if (partial.area !== undefined) updates.area = partial.area;
    if (partial.projectType !== undefined) updates.project_type = partial.projectType;
    if (partial.shortDescription !== undefined) updates.short_description = partial.shortDescription;
    if (partial.description !== undefined) updates.description = partial.description;
    if (partial.heroImage !== undefined) updates.hero_image = partial.heroImage;
    if (partial.gallery !== undefined) updates.gallery = partial.gallery;
    if (partial.designApproach !== undefined) updates.design_approach = partial.designApproach;
    if (partial.materialsUsed !== undefined) updates.materials_used = partial.materialsUsed;
    if (partial.isFeatured !== undefined) updates.is_featured = partial.isFeatured;
    if (partial.isPublished !== undefined) updates.is_published = partial.isPublished;
    if (partial.sortOrder !== undefined) updates.sort_order = partial.sortOrder;
    if (partial.tags !== undefined) updates.tags = partial.tags;

    const { data: updated, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', id)
      .select()
      .maybeSingle();

    if (error) {
      console.error('Supabase updateProject error:', error);
      throw new Error(`Failed to update project ${id}: ${error.message}`);
    }

    invalidateMemoryCache('projects');
    return updated ? mapSupabaseProject(updated) : null;
  }

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
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) {
      console.error('Supabase deleteProject error:', error);
      throw new Error(`Failed to delete project ${id}: ${error.message}`);
    }
    invalidateMemoryCache('projects');
    return true;
  }

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
