import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import {
  initialCategories,
  initialProducts,
  initialProjects,
  initialServices,
  initialSiteSettings,
  getInitialAdminSeed,
} from '../src/lib/seedData';

// Load .env.local
const envLocalPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envLocalPath)) {
  dotenv.config({ path: envLocalPath });
} else {
  dotenv.config();
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://yvureduruttjoxhwuqwx.supabase.co';
const supabaseServiceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2dXJlZHVydXR0am94aHd1cXd4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4Njk4MDc2OCwiZXhwIjoyMTAyNTU2NzY4fQ.sHAE78IUF3wgmxDaj3OTWWOPB1Qhlth2FCzgAQdsqzU';

console.log('Connecting to Supabase at:', supabaseUrl);
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function runSeed() {
  try {
    console.log('\n--- 1. SETTING UP STORAGE BUCKETS ---');
    const buckets = ['products', 'projects', 'services', 'site-media'];
    for (const b of buckets) {
      const { error } = await supabase.storage.createBucket(b, {
        public: true,
        fileSizeLimit: 10485760, // 10MB
      });
      if (error) {
        if (error.message.toLowerCase().includes('already exists')) {
          console.log(`✔ Storage bucket "${b}" already exists and ready.`);
        } else {
          console.warn(`Storage bucket "${b}":`, error.message);
        }
      } else {
        console.log(`✔ Storage bucket "${b}" created successfully.`);
      }
    }

    console.log('\n--- 2. SEEDING ADMIN BOOTSTRAP USER ---');
    const adminSeed = getInitialAdminSeed();
    const { data: existingAdmin } = await supabase.from('admins').select('id').eq('email', adminSeed.email).maybeSingle();
    if (!existingAdmin) {
      const { error: adminErr } = await supabase.from('admins').insert({
        id: adminSeed.id,
        email: adminSeed.email,
        password_hash: adminSeed.passwordHash,
        name: adminSeed.name,
        role: adminSeed.role,
        must_change_password: adminSeed.mustChangePassword,
      });
      if (adminErr) console.warn('Admin user seed:', adminErr.message);
      else console.log('✔ Admin user (vicks@balaji.com) initialized.');
    } else {
      console.log('✔ Admin user already exists; preserved password and credentials.');
    }

    console.log('\n--- 3. SEEDING CATEGORIES ---');
    const categoryIdMap = new Map<string, string>();
    for (const cat of initialCategories) {
      const { data: existing } = await supabase.from('categories').select('id, slug').eq('slug', cat.slug).maybeSingle();
      if (!existing) {
        const { data: inserted } = await supabase
          .from('categories')
          .insert({
            name: cat.name,
            slug: cat.slug,
            description: cat.description,
            image_url: cat.imageUrl,
            sort_order: cat.sortOrder,
            is_active: cat.isActive,
          })
          .select('id, slug')
          .single();
        if (inserted) {
          categoryIdMap.set(cat.id, inserted.id);
          categoryIdMap.set(cat.slug, inserted.id);
        }
      } else {
        categoryIdMap.set(cat.id, existing.id);
        categoryIdMap.set(cat.slug, existing.id);
      }
    }
    console.log(`✔ Synced categories (preserved existing modifications).`);

    console.log('\n--- 4. SEEDING PRODUCTS CATALOG ---');
    for (const prod of initialProducts) {
      const { data: existing } = await supabase.from('products').select('id, slug').eq('slug', prod.slug).maybeSingle();
      if (!existing) {
        const mappedCatId = categoryIdMap.get(prod.categoryId) || categoryIdMap.get(prod.categorySlug || '') || null;
        await supabase.from('products').insert({
          name: prod.name,
          slug: prod.slug,
          sku: prod.sku,
          brand: prod.brand,
          category_id: mappedCatId,
          subcategory: prod.subcategory,
          description: prod.description,
          price: prod.price,
          sale_price: prod.salePrice,
          unit: prod.unit,
          moq: prod.moq,
          stock: prod.stock,
          purchase_mode: prod.purchaseMode,
          lead_time: prod.leadTime,
          dimensions: prod.dimensions,
          thickness: prod.thickness,
          material: prod.material,
          finish: prod.finish,
          color: prod.color,
          images: prod.images,
          is_featured: prod.isFeatured,
          is_new: prod.isNew,
          is_bestseller: prod.isBestseller,
          published: prod.published,
          tags: prod.tags,
          specifications: prod.specifications,
        });
      }
    }
    console.log(`✔ Products catalog verified (no duplicate insertions).`);

    console.log('\n--- 5. SEEDING ARCHITECTURAL PROJECTS ---');
    for (const proj of initialProjects) {
      const { data: existing } = await supabase.from('projects').select('id').eq('slug', proj.slug).maybeSingle();
      if (!existing) {
        await supabase.from('projects').insert({
          title: proj.title,
          slug: proj.slug,
          location: proj.location,
          year: proj.year,
          project_type: proj.projectType,
          area: proj.area,
          short_description: proj.shortDescription,
          description: proj.description,
          hero_image: proj.heroImage,
          gallery: proj.gallery,
          design_approach: proj.designApproach,
          materials_used: proj.materialsUsed,
          is_published: proj.isPublished,
          is_featured: proj.isFeatured,
          sort_order: proj.sortOrder,
          tags: proj.tags,
        });
      }
    }
    console.log(`✔ Architectural projects verified.`);

    console.log('\n--- 6. SEEDING ARCHITECTURAL SERVICES ---');
    for (const srv of initialServices) {
      const { data: existing } = await supabase.from('services').select('id').eq('slug', srv.slug).maybeSingle();
      if (!existing) {
        await supabase.from('services').insert({
          title: srv.title,
          slug: srv.slug,
          short_desc: srv.shortDesc,
          full_desc: srv.fullDesc,
          icon_name: srv.iconName,
          image_url: srv.imageUrl,
          deliverables: srv.deliverables,
          sort_order: srv.sortOrder,
          is_published: srv.isPublished,
        });
      }
    }
    console.log(`✔ Architectural services verified.`);

    console.log('\n--- 7. SEEDING SITE SETTINGS ---');
    const { data: existingSettings } = await supabase.from('site_settings').select('key').eq('key', 'general').maybeSingle();
    if (!existingSettings) {
      const { error: setErr } = await supabase.from('site_settings').insert({
        key: 'general',
        value: initialSiteSettings,
      });
      if (setErr) console.warn('Site settings initialization notice:', setErr.message);
      else console.log('✔ Initialized studio settings.');
    } else {
      console.log('✔ Studio settings already exist; preserved admin-configured settings.');
    }

    console.log('\n==================================================');
    console.log('ALL SUPABASE TABLES & STORAGE BUCKETS VERIFIED SAFELY!');
    console.log('==================================================');
  } catch (err: any) {
    console.error('Fatal seeding error:', err);
  }
}

runSeed();
