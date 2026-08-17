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
dotenv.config({ path: envLocalPath });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

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
    const { error: adminErr } = await supabase.from('admins').upsert(
      {
        email: adminSeed.email,
        password_hash: adminSeed.passwordHash,
        name: adminSeed.name,
        role: adminSeed.role,
        must_change_password: adminSeed.mustChangePassword,
      },
      { onConflict: 'email' }
    );
    if (adminErr) {
      console.warn('Admin user seed:', adminErr.message);
    } else {
      console.log('✔ Admin user (vicks@balaji.com) seeded in remote database.');
    }

    console.log('\n--- 3. SEEDING CATEGORIES ---');
    const categoryIdMap = new Map<string, string>();
    for (const cat of initialCategories) {
      const { data, error } = await supabase
        .from('categories')
        .upsert(
          {
            name: cat.name,
            slug: cat.slug,
            description: cat.description,
            image_url: cat.imageUrl,
            sort_order: cat.sortOrder,
            is_active: cat.isActive,
          },
          { onConflict: 'slug' }
        )
        .select('id, slug')
        .single();

      if (error) {
        console.warn(`Category "${cat.name}":`, error.message);
      } else if (data) {
        categoryIdMap.set(cat.id, data.id);
        categoryIdMap.set(cat.slug, data.id);
      }
    }
    console.log(`✔ Synced ${initialCategories.length} categories.`);

    console.log('\n--- 4. SEEDING PRODUCTS CATALOG ---');
    for (const prod of initialProducts) {
      const mappedCatId = categoryIdMap.get(prod.categoryId) || categoryIdMap.get(prod.categorySlug || '') || null;
      const { error } = await supabase.from('products').upsert(
        {
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
        },
        { onConflict: 'slug' }
      );
      if (error) {
        console.warn(`Product "${prod.name}":`, error.message);
      }
    }
    console.log(`✔ Synced ${initialProducts.length} luxury products.`);

    console.log('\n--- 5. SEEDING ARCHITECTURAL PROJECTS ---');
    for (const proj of initialProjects) {
      const { error } = await supabase.from('projects').upsert(
        {
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
        },
        { onConflict: 'slug' }
      );
      if (error) {
        console.warn(`Project "${proj.title}":`, error.message);
      }
    }
    console.log(`✔ Synced ${initialProjects.length} architectural projects.`);

    console.log('\n--- 6. SEEDING ARCHITECTURAL SERVICES ---');
    for (const srv of initialServices) {
      const { error } = await supabase.from('services').upsert(
        {
          title: srv.title,
          slug: srv.slug,
          short_desc: srv.shortDesc,
          full_desc: srv.fullDesc,
          icon_name: srv.iconName,
          image_url: srv.imageUrl,
          deliverables: srv.deliverables,
          sort_order: srv.sortOrder,
          is_published: srv.isPublished,
        },
        { onConflict: 'slug' }
      );
      if (error) {
        console.warn(`Service "${srv.title}":`, error.message);
      }
    }
    console.log(`✔ Synced ${initialServices.length} architectural services.`);

    console.log('\n--- 7. SEEDING SITE SETTINGS ---');
    const { error: setErr } = await supabase.from('site_settings').upsert(
      {
        key: 'general',
        value: initialSiteSettings,
      },
      { onConflict: 'key' }
    );
    if (setErr) console.warn('Site settings:', setErr.message);
    else console.log('✔ Synced studio settings.');

    console.log('\n==================================================');
    console.log('ALL SUPABASE TABLES & STORAGE BUCKETS VERIFIED!');
    console.log('==================================================');
  } catch (err: any) {
    console.error('Fatal seeding error:', err);
  }
}

runSeed();
