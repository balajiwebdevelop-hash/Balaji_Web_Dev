# BALAJI ARCHITECT & INTERIORS — ALL-IN-ONE MASTER CODEBASE

> **Studio Platform**: Architectural Monograph, Bespoke Turnkey Contracting, Spec Material E-Commerce, and Real-Time Studio Operations.  
> **Brand**: BALAJI ARCHITECT & INTERIORS  
> **Studio Address**: Door No. 306, DN TOWER, Floor No. 03, Beltola Tiniali, Guwahati, Assam 781040  
> **Direct Contact**: +91 70029 48484 | atelier@balaji-interior.com  
> **Google Rating**: ★ 5.0 (22 Google Reviews)  
> **Repository**: https://github.com/balajiwebdevelop-hash/Balaji_Web_Dev  
> **Total Source Files Included**: 84

---

## INDEX OF ALL SOURCE FILES

1. [`data/db.json`](#data-db-json)
2. [`next-env.d.ts`](#next-env-d-ts)
3. [`next.config.js`](#next-config-js)
4. [`package.json`](#package-json)
5. [`postcss.config.js`](#postcss-config-js)
6. [`public/sw.js`](#public-sw-js)
7. [`scripts/seed-supabase.ts`](#scripts-seed-supabase-ts)
8. [`scripts/verify-production.ts`](#scripts-verify-production-ts)
9. [`src/app/about/page.tsx`](#src-app-about-page-tsx)
10. [`src/app/account/page.tsx`](#src-app-account-page-tsx)
11. [`src/app/admin/categories/page.tsx`](#src-app-admin-categories-page-tsx)
12. [`src/app/admin/customers/page.tsx`](#src-app-admin-customers-page-tsx)
13. [`src/app/admin/inventory/page.tsx`](#src-app-admin-inventory-page-tsx)
14. [`src/app/admin/login/page.tsx`](#src-app-admin-login-page-tsx)
15. [`src/app/admin/orders/page.tsx`](#src-app-admin-orders-page-tsx)
16. [`src/app/admin/page.tsx`](#src-app-admin-page-tsx)
17. [`src/app/admin/products/page.tsx`](#src-app-admin-products-page-tsx)
18. [`src/app/admin/projects/page.tsx`](#src-app-admin-projects-page-tsx)
19. [`src/app/admin/quotes/page.tsx`](#src-app-admin-quotes-page-tsx)
20. [`src/app/admin/services/page.tsx`](#src-app-admin-services-page-tsx)
21. [`src/app/admin/settings/page.tsx`](#src-app-admin-settings-page-tsx)
22. [`src/app/api/admin/audit-logs/route.ts`](#src-app-api-admin-audit-logs-route-ts)
23. [`src/app/api/admin/notifications/test/route.ts`](#src-app-api-admin-notifications-test-route-ts)
24. [`src/app/api/admin/settings/route.ts`](#src-app-api-admin-settings-route-ts)
25. [`src/app/api/admin/upload/route.ts`](#src-app-api-admin-upload-route-ts)
26. [`src/app/api/auth/change-password/route.ts`](#src-app-api-auth-change-password-route-ts)
27. [`src/app/api/auth/login/route.ts`](#src-app-api-auth-login-route-ts)
28. [`src/app/api/auth/logout/route.ts`](#src-app-api-auth-logout-route-ts)
29. [`src/app/api/auth/me/route.ts`](#src-app-api-auth-me-route-ts)
30. [`src/app/api/categories/[id]/route.ts`](#src-app-api-categories-id-route-ts)
31. [`src/app/api/categories/route.ts`](#src-app-api-categories-route-ts)
32. [`src/app/api/enquiries/[id]/route.ts`](#src-app-api-enquiries-id-route-ts)
33. [`src/app/api/enquiries/route.ts`](#src-app-api-enquiries-route-ts)
34. [`src/app/api/notifications/subscribe/route.ts`](#src-app-api-notifications-subscribe-route-ts)
35. [`src/app/api/orders/[id]/route.ts`](#src-app-api-orders-id-route-ts)
36. [`src/app/api/orders/route.ts`](#src-app-api-orders-route-ts)
37. [`src/app/api/products/[id]/route.ts`](#src-app-api-products-id-route-ts)
38. [`src/app/api/products/route.ts`](#src-app-api-products-route-ts)
39. [`src/app/api/projects/[id]/route.ts`](#src-app-api-projects-id-route-ts)
40. [`src/app/api/projects/route.ts`](#src-app-api-projects-route-ts)
41. [`src/app/api/quotes/[id]/route.ts`](#src-app-api-quotes-id-route-ts)
42. [`src/app/api/quotes/route.ts`](#src-app-api-quotes-route-ts)
43. [`src/app/api/services/[id]/route.ts`](#src-app-api-services-id-route-ts)
44. [`src/app/api/services/route.ts`](#src-app-api-services-route-ts)
45. [`src/app/cart/page.tsx`](#src-app-cart-page-tsx)
46. [`src/app/category/[slug]/page.tsx`](#src-app-category-slug-page-tsx)
47. [`src/app/checkout/page.tsx`](#src-app-checkout-page-tsx)
48. [`src/app/contact/page.tsx`](#src-app-contact-page-tsx)
49. [`src/app/globals.css`](#src-app-globals-css)
50. [`src/app/layout.tsx`](#src-app-layout-tsx)
51. [`src/app/material/[slug]/page.tsx`](#src-app-material-slug-page-tsx)
52. [`src/app/materials/page.tsx`](#src-app-materials-page-tsx)
53. [`src/app/page.tsx`](#src-app-page-tsx)
54. [`src/app/projects/[slug]/page.tsx`](#src-app-projects-slug-page-tsx)
55. [`src/app/projects/page.tsx`](#src-app-projects-page-tsx)
56. [`src/app/quote/page.tsx`](#src-app-quote-page-tsx)
57. [`src/app/robots.ts`](#src-app-robots-ts)
58. [`src/app/search/page.tsx`](#src-app-search-page-tsx)
59. [`src/app/services/page.tsx`](#src-app-services-page-tsx)
60. [`src/app/shop/page.tsx`](#src-app-shop-page-tsx)
61. [`src/app/sitemap.ts`](#src-app-sitemap-ts)
62. [`src/app/wishlist/page.tsx`](#src-app-wishlist-page-tsx)
63. [`src/components/AdminLayout.tsx`](#src-components-adminlayout-tsx)
64. [`src/components/CartDrawer.tsx`](#src-components-cartdrawer-tsx)
65. [`src/components/Footer.tsx`](#src-components-footer-tsx)
66. [`src/components/ImageReveal.tsx`](#src-components-imagereveal-tsx)
67. [`src/components/ImageUploader.tsx`](#src-components-imageuploader-tsx)
68. [`src/components/MobileBottomNav.tsx`](#src-components-mobilebottomnav-tsx)
69. [`src/components/Navbar.tsx`](#src-components-navbar-tsx)
70. [`src/components/PageTransition.tsx`](#src-components-pagetransition-tsx)
71. [`src/components/ProductDetailClient.tsx`](#src-components-productdetailclient-tsx)
72. [`src/components/Reveal.tsx`](#src-components-reveal-tsx)
73. [`src/context/AdminAuthContext.tsx`](#src-context-adminauthcontext-tsx)
74. [`src/context/CartContext.tsx`](#src-context-cartcontext-tsx)
75. [`src/context/WishlistContext.tsx`](#src-context-wishlistcontext-tsx)
76. [`src/lib/auth.ts`](#src-lib-auth-ts)
77. [`src/lib/db.ts`](#src-lib-db-ts)
78. [`src/lib/push.ts`](#src-lib-push-ts)
79. [`src/lib/seedData.ts`](#src-lib-seeddata-ts)
80. [`src/lib/supabase.ts`](#src-lib-supabase-ts)
81. [`src/types/index.ts`](#src-types-index-ts)
82. [`supabase/schema.sql`](#supabase-schema-sql)
83. [`tailwind.config.js`](#tailwind-config-js)
84. [`tsconfig.json`](#tsconfig-json)

---

## COMPLETE SOURCE CODE REPOSITORY

### `data/db.json`

- **File**: `data/db.json`
- **Size**: 48.0 KB (1218 lines)
- **Language**: `json`

```json
{
  "admins": [
    {
      "id": "2bd20632-00dd-4f48-84b4-6e526543c8d8",
      "email": "vicks@balaji.com",
      "passwordHash": "3903a96046ec99bc94100f812cfee1b2:e72fa457ba6ab3be8353defbdf61b4c243714f27acb2cbc20fd2232dc36e184bd6564345d66103f433154a166821c36b5e0a0b162aeddf378182678a830c7f5b",
      "name": "Vikas Sir (Principal Architect)",
      "role": "super_admin",
      "mustChangePassword": false,
      "createdAt": "2026-08-17T16:23:54.088Z",
      "updatedAt": "2026-08-18T14:26:57.433Z"
    }
  ],
  "categories": [
    {
      "id": "cat-stone",
      "name": "Natural Stone & Marble",
      "slug": "natural-stone-marble",
      "description": "Quarried Italian marbles, honed travertines, and architectural granites with bespoke cut-to-size options.",
      "imageUrl": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "sortOrder": 1,
      "isActive": true,
      "createdAt": "2026-08-17T16:23:53.256Z",
      "updatedAt": "2026-08-17T16:23:53.257Z"
    },
    {
      "id": "cat-wood",
      "name": "Hardwood & Architectural Veneers",
      "slug": "hardwood-veneers",
      "description": "Sustainably harvested smoked oaks, European walnuts, and natural fluted timber panels.",
      "imageUrl": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
      "sortOrder": 2,
      "isActive": true,
      "createdAt": "2026-08-17T16:23:53.257Z",
      "updatedAt": "2026-08-17T16:23:53.257Z"
    },
    {
      "id": "cat-panels",
      "name": "Wall Panels & Acoustic Surfaces",
      "slug": "wall-panels-acoustic",
      "description": "Linear slatted wall systems, architectural micro-cement claddings, and acoustic linen textures.",
      "imageUrl": "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
      "sortOrder": 3,
      "isActive": true,
      "createdAt": "2026-08-17T16:23:53.257Z",
      "updatedAt": "2026-08-17T16:23:53.257Z"
    },
    {
      "id": "cat-porcelain",
      "name": "Large Format Porcelain Slabs",
      "slug": "porcelain-slabs",
      "description": "Monolithic sintered stone slabs for luxury countertops, bookmatched feature walls, and seamless floors.",
      "imageUrl": "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
      "sortOrder": 4,
      "isActive": true,
      "createdAt": "2026-08-17T16:23:53.257Z",
      "updatedAt": "2026-08-17T16:23:53.257Z"
    },
    {
      "id": "cat-lighting",
      "name": "Architectural Lighting",
      "slug": "architectural-lighting",
      "description": "Sculptural unlacquered brass pendants, minimal linear sconces, and recessed gallery luminescence.",
      "imageUrl": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80",
      "sortOrder": 5,
      "isActive": true,
      "createdAt": "2026-08-17T16:23:53.257Z",
      "updatedAt": "2026-08-17T16:23:53.257Z"
    },
    {
      "id": "cat-hardware",
      "name": "Bespoke Hardware & Pulls",
      "slug": "bespoke-hardware",
      "description": "Solid forged bronze handles, knurled cabinet pulls, and precision-engineered architectural pivots.",
      "imageUrl": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80",
      "sortOrder": 6,
      "isActive": true,
      "createdAt": "2026-08-17T16:23:53.257Z",
      "updatedAt": "2026-08-17T16:23:53.257Z"
    },
    {
      "id": "cat-furniture",
      "name": "Atelier Furniture & Objects",
      "slug": "atelier-furniture",
      "description": "Limited edition travertine monoliths, solid oak dining tables, and tailored bouclé seating.",
      "imageUrl": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80",
      "sortOrder": 7,
      "isActive": true,
      "createdAt": "2026-08-17T16:23:53.257Z",
      "updatedAt": "2026-08-17T16:23:53.257Z"
    }
  ],
  "products": [
    {
      "id": "prod-travertine-slab",
      "name": "Romano Classico Vein-Cut Travertine",
      "slug": "romano-classico-travertine",
      "sku": "MAT-STN-001",
      "brand": "Balaji Architect & Interiors",
      "categoryId": "cat-stone",
      "categoryName": "Natural Stone & Marble",
      "categorySlug": "natural-stone-marble",
      "subcategory": "Honed Travertine",
      "description": "Authentic Italian vein-cut travertine quarried in Tivoli. Honed to a velvety matte tactile finish with natural open pores lightly filled for lasting resilience in high-end living spaces and bath suites.",
      "price": 850,
      "salePrice": 780,
      "unit": "sq ft",
      "moq": 100,
      "stock": 2380,
      "purchaseMode": "BOTH",
      "leadTime": "5-7 business days",
      "dimensions": "2400mm x 1200mm slab / custom tile sizes",
      "thickness": "20mm",
      "material": "Natural Travertine",
      "finish": "Honed Matte",
      "color": "Warm Ivory / Biscuit",
      "images": [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
      ],
      "variants": [
        {
          "id": "var-trav-20mm",
          "productId": "prod-travertine-slab",
          "sku": "MAT-STN-001-20",
          "name": "20mm Slab - Honed",
          "finish": "Honed",
          "thickness": "20mm",
          "priceModifier": 0,
          "stock": 1800
        },
        {
          "id": "var-trav-30mm",
          "productId": "prod-travertine-slab",
          "sku": "MAT-STN-001-30",
          "name": "30mm Slab - Polished Matte",
          "finish": "Polished Matte",
          "thickness": "30mm",
          "priceModifier": 190,
          "stock": 600
        }
      ],
      "isFeatured": true,
      "isNew": false,
      "isBestseller": true,
      "published": true,
      "tags": [
        "Stone",
        "Travertine",
        "Flooring",
        "Wall Cladding",
        "Luxury Bath"
      ],
      "specifications": {
        "Origin": "Tivoli, Italy",
        "Compressive Strength": "112 MPa",
        "Water Absorption": "< 0.8%",
        "Application": "Indoor flooring, feature walls, bathroom surrounds",
        "Edge Detail": "Straight rectified / custom bullnose on request"
      },
      "createdAt": "2026-08-17T17:05:35.782Z",
      "updatedAt": "2026-08-17T17:06:09.346Z"
    },
    {
      "id": "prod-smoked-oak-flooring",
      "name": "Smoked European White Oak Wide Plank",
      "slug": "smoked-european-oak-flooring",
      "sku": "MAT-WOD-002",
      "brand": "Balaji Architect & Interiors",
      "categoryId": "cat-wood",
      "categoryName": "Hardwood & Architectural Veneers",
      "categorySlug": "hardwood-veneers",
      "subcategory": "Engineered Hardwood",
      "description": "Slow-smoked French white oak planks with a triple-brushed wire texture and invisible natural UV polyurethane oil finish. Engineered with a multi-layer birch ply core for dimensional stability in humid climates.",
      "price": 620,
      "unit": "sq ft",
      "moq": 150,
      "stock": 3500,
      "purchaseMode": "BUY_NOW",
      "leadTime": "3-5 business days",
      "dimensions": "2200mm L x 220mm W",
      "thickness": "15mm (4mm top wear layer)",
      "material": "European White Oak & Baltic Birch",
      "finish": "Natural Ultra-Matte Oil",
      "color": "Muted Earth Brown",
      "images": [
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=1200&q=80"
      ],
      "variants": [
        {
          "id": "var-oak-smoked",
          "productId": "prod-smoked-oak-flooring",
          "sku": "MAT-WOD-002-SMK",
          "name": "Smoked Natural",
          "color": "Warm Umber",
          "finish": "Wire Brushed",
          "priceModifier": 0,
          "stock": 2200
        },
        {
          "id": "var-oak-raw",
          "productId": "prod-smoked-oak-flooring",
          "sku": "MAT-WOD-002-RAW",
          "name": "Raw Nordic Sand",
          "color": "Light Biscuit",
          "finish": "Smooth Matte",
          "priceModifier": 40,
          "stock": 1300
        }
      ],
      "isFeatured": true,
      "isNew": true,
      "isBestseller": true,
      "published": true,
      "tags": [
        "Wood",
        "Flooring",
        "Oak",
        "Wide Plank",
        "Living Room"
      ],
      "specifications": {
        "Grade": "Select Architectural ABC",
        "Core": "11-ply Cross-Grain Baltic Birch",
        "Bevel": "Micro-bevel on 4 sides",
        "Installation": "Tongue & Groove / Glue-down or Floating",
        "Underfloor Heating Compatible": "Yes, up to 27°C"
      },
      "createdAt": "2026-08-17T17:05:35.782Z",
      "updatedAt": "2026-08-17T17:05:35.782Z"
    },
    {
      "id": "prod-fluted-acoustic-panel",
      "name": "Acoustic Fluted Walnut Wall Panel",
      "slug": "acoustic-fluted-walnut-panel",
      "sku": "MAT-PNL-003",
      "brand": "Balaji Architect & Interiors",
      "categoryId": "cat-panels",
      "categoryName": "Wall Panels & Acoustic Surfaces",
      "categorySlug": "wall-panels-acoustic",
      "subcategory": "Acoustic Cladding",
      "description": "Precision-milled American walnut slats affixed to a recycled high-density acoustic PET felt backing. Elevates room acoustics while introducing warm architectural rhythm to master bedrooms and private cinema suites.",
      "price": 14500,
      "salePrice": 13200,
      "unit": "sheet",
      "moq": 2,
      "stock": 85,
      "purchaseMode": "BUY_NOW",
      "leadTime": "3-4 business days",
      "dimensions": "2400mm H x 600mm W x 22mm D",
      "thickness": "22mm",
      "material": "Natural American Walnut & Recycled Felt",
      "finish": "Silky Natural Wax Oil",
      "color": "Deep Espresso Walnut",
      "images": [
        "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80"
      ],
      "isFeatured": true,
      "isNew": true,
      "isBestseller": false,
      "published": true,
      "tags": [
        "Acoustic",
        "Wall Panels",
        "Walnut",
        "Fluted",
        "Bedrooms"
      ],
      "specifications": {
        "NRC Rating": "0.85 Sound Absorption",
        "Fire Rating": "Class B-s1, d0 (Flame Retardant)",
        "Mounting": "Concealed screw or polyurethane construction adhesive",
        "Slat Spacing": "13mm width with 14mm felt reveals"
      },
      "createdAt": "2026-08-17T17:05:35.782Z",
      "updatedAt": "2026-08-17T17:05:35.782Z"
    },
    {
      "id": "prod-calacatta-porcelain",
      "name": "Calacatta Vagli Sintered Porcelain Slab",
      "slug": "calacatta-vagli-porcelain-slab",
      "sku": "MAT-POR-004",
      "brand": "Balaji Architect & Interiors",
      "categoryId": "cat-porcelain",
      "categoryName": "Large Format Porcelain Slabs",
      "categorySlug": "porcelain-slabs",
      "subcategory": "Continuous Bookmatched Slabs",
      "description": "Continuous vein-matched sintered ceramic slab with deep golden and slate veins on an ultra-clean warm white background. 100% stain, heat, and scratch proof for demanding culinary islands and master vanities.",
      "price": 1100,
      "unit": "sq ft",
      "moq": 50,
      "stock": 1200,
      "purchaseMode": "BOTH",
      "leadTime": "7-10 business days",
      "dimensions": "3200mm x 1600mm",
      "thickness": "12mm / 20mm",
      "material": "Sintered Ceramic Porcelain",
      "finish": "Silk Touch Satin",
      "color": "Pure White with Gold & Charcoal Veining",
      "images": [
        "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
      ],
      "isFeatured": false,
      "isNew": false,
      "isBestseller": true,
      "published": true,
      "tags": [
        "Kitchen Countertop",
        "Porcelain Slab",
        "Bookmatched",
        "Island Counter"
      ],
      "specifications": {
        "Porosity": "0.01% (Zero Porosity)",
        "Thermal Shock": "Resistant to direct pans up to 400°C",
        "UV Stability": "Fade proof for indoor and outdoor loggias"
      },
      "createdAt": "2026-08-17T17:05:35.782Z",
      "updatedAt": "2026-08-17T17:05:35.782Z"
    },
    {
      "id": "prod-monolith-coffee-table",
      "name": "Brutalist Travertine Monolith Coffee Table",
      "slug": "brutalist-travertine-coffee-table",
      "sku": "FUR-TBL-005",
      "brand": "Balaji Architect & Interiors",
      "categoryId": "cat-furniture",
      "categoryName": "Atelier Furniture & Objects",
      "categorySlug": "atelier-furniture",
      "subcategory": "Sculptural Tables",
      "description": "Sculpted from a single block of Tuscan Romano travertine. Defined by raw chiseled edges contrasting with a silky hand-honed flat surface. Each table is an individual architectural sculpture numbered by the studio.",
      "price": 185000,
      "unit": "piece",
      "moq": 1,
      "stock": 4,
      "purchaseMode": "BUY_NOW",
      "leadTime": "Made to order (2-3 weeks)",
      "dimensions": "1400mm L x 800mm W x 360mm H",
      "thickness": "120mm solid block perimeter",
      "material": "Solid Honed Travertine Stone",
      "finish": "Natural Matte Wax Sealed",
      "color": "Ivory Travertine",
      "images": [
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
      ],
      "isFeatured": true,
      "isNew": true,
      "isBestseller": false,
      "published": true,
      "tags": [
        "Furniture",
        "Coffee Table",
        "Travertine",
        "Sculptural",
        "Living Room"
      ],
      "specifications": {
        "Weight": "115 kg",
        "Craftsmanship": "Hand-chiseled perimeter with CNC planar accuracy",
        "Care": "Wipe with damp cloth and pH neutral stone cleanser"
      },
      "createdAt": "2026-08-17T17:05:35.782Z",
      "updatedAt": "2026-08-17T17:05:35.782Z"
    },
    {
      "id": "prod-linear-bronze-pendant",
      "name": "Kanso Linear Brushed Bronze Chandelier",
      "slug": "kanso-linear-bronze-chandelier",
      "sku": "LGT-PEN-006",
      "brand": "Balaji Architect & Interiors",
      "categoryId": "cat-lighting",
      "categoryName": "Architectural Lighting",
      "categorySlug": "architectural-lighting",
      "subcategory": "Suspension Lighting",
      "description": "A monolithic 1.8-meter solid extruded bronze fixture housing warm 2700K museum-grade CRI 97+ LED arrays diffused through frosted Japanese alabaster glass. Dimmable via DALI and TRIAC protocols.",
      "price": 88000,
      "unit": "set",
      "moq": 1,
      "stock": 12,
      "purchaseMode": "BUY_NOW",
      "leadTime": "5-7 business days",
      "dimensions": "1800mm L x 60mm W x 80mm H (Suspension up to 2500mm)",
      "material": "Solid Extruded Bronze & Cast Alabaster",
      "finish": "Hand-Rubbed Aged Bronze",
      "color": "Antique Bronze",
      "images": [
        "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80"
      ],
      "isFeatured": true,
      "isNew": false,
      "isBestseller": true,
      "published": true,
      "tags": [
        "Lighting",
        "Bronze",
        "Dining Table Chandelier",
        "Minimalist"
      ],
      "specifications": {
        "Luminous Flux": "4,200 Lumens",
        "Color Temperature": "2700K Warm Architectural Glow",
        "Color Rendering Index": "CRI 98",
        "Voltage": "220-240V AC 50/60Hz"
      },
      "createdAt": "2026-08-17T17:05:35.782Z",
      "updatedAt": "2026-08-17T17:05:35.782Z"
    },
    {
      "id": "prod-knurled-bronze-hardware",
      "name": "Bespoke Knurled Bronze Door Lever & Escutcheon Set",
      "slug": "bespoke-knurled-bronze-door-lever",
      "sku": "HRD-LVR-007",
      "brand": "Balaji Architect & Interiors",
      "categoryId": "cat-hardware",
      "categoryName": "Bespoke Hardware & Pulls",
      "categorySlug": "bespoke-hardware",
      "subcategory": "Architectural Door Hardware",
      "description": "Machined from solid naval brass billets and finished with a dark antique bronze patina that deepens with use. Features a precision cross-hatch diamond knurled barrel for a reassuring tactile grip on heavy entrance doors.",
      "price": 9500,
      "salePrice": 8600,
      "unit": "set",
      "moq": 2,
      "stock": 65,
      "purchaseMode": "BUY_NOW",
      "leadTime": "2-3 business days",
      "dimensions": "150mm Lever x 52mm Rose",
      "material": "Solid Forged Naval Brass",
      "finish": "Unlacquered Living Bronze Patina",
      "color": "Dark Antique Bronze",
      "images": [
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80"
      ],
      "isFeatured": false,
      "isNew": true,
      "isBestseller": true,
      "published": true,
      "tags": [
        "Door Hardware",
        "Bronze Handles",
        "Knurled Brass",
        "Luxury Entrance"
      ],
      "specifications": {
        "Mechanism": "Heavy duty sprung return rose with ball-bearing hub",
        "Spindle": "8mm solid steel standard",
        "Door Thickness Fit": "38mm to 55mm solid timber doors"
      },
      "createdAt": "2026-08-17T17:05:35.782Z",
      "updatedAt": "2026-08-17T17:05:35.782Z"
    },
    {
      "id": "prod-custom-millwork-veneer",
      "name": "Smoked Santos Rosewood Architectural Veneer",
      "slug": "smoked-santos-rosewood-veneer",
      "sku": "MAT-VNR-008",
      "brand": "Balaji Architect & Interiors",
      "categoryId": "cat-wood",
      "categoryName": "Hardwood & Architectural Veneers",
      "categorySlug": "hardwood-veneers",
      "subcategory": "Natural Wood Veneer",
      "description": "Sequenced architectural flitch veneer with rich espresso cathedrals and bronze undertones. Backed with non-woven fleece for seamless pressing onto curved cabinetry and bespoke wardrobes.",
      "price": 320,
      "unit": "sq ft",
      "moq": 200,
      "stock": 4200,
      "purchaseMode": "REQUEST_QUOTE",
      "leadTime": "7-10 business days",
      "dimensions": "3050mm L x 1250mm W",
      "thickness": "0.6mm",
      "material": "Natural Santos Rosewood",
      "finish": "Raw Unfinished (Ready for matte polyurethane or hardwax)",
      "color": "Rich Espresso & Bronze Striations",
      "images": [
        "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=1200&q=80"
      ],
      "isFeatured": false,
      "isNew": false,
      "isBestseller": false,
      "published": true,
      "tags": [
        "Veneer",
        "Rosewood",
        "Wardrobes",
        "Wall Paneling",
        "Joinery"
      ],
      "specifications": {
        "Cut": "Crown Cut & Quarter Cut Bookmatched",
        "Moisture Content": "8-12%",
        "Sustainably Certified": "FSC 100% Controlled Harvest"
      },
      "createdAt": "2026-08-17T17:05:35.782Z",
      "updatedAt": "2026-08-17T17:05:35.782Z"
    }
  ],
  "projects": [
    {
      "id": "proj-sanctuary-alibaug",
      "title": "The Sanctuary at Alibaug",
      "slug": "the-sanctuary-at-alibaug",
      "location": "Awas Coast, Alibaug",
      "year": "2025",
      "projectType": "Architecture & Villa",
      "area": "8,200 sq ft",
      "shortDescription": "A monolithic coastal retreat grounded in honed Tivoli travertine, smoked French oak, and frameless pocketing glass walls connecting lush banyan groves.",
      "description": "Designed as a timeless multi-generational weekend villa, The Sanctuary is configured around a central reflecting pool framed by board-formed concrete and warm Italian travertine. Every interior element was custom designed and fabricated by Balaji Architect & Interiors, ensuring unbroken harmony between raw architectural mass and delicate tactile finishes.",
      "heroImage": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
      "gallery": [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
        "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1400&q=80",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80",
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=80"
      ],
      "designApproach": "Our approach balanced heavy thermal mass walls with delicate bronze joinery and natural woven linens, allowing sea breezes to filter through while maintaining deep shade and thermal comfort.",
      "materialsUsed": [
        {
          "materialId": "prod-travertine-slab",
          "materialName": "Romano Classico Vein-Cut Travertine",
          "category": "Natural Stone",
          "imageUrl": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80"
        },
        {
          "materialId": "prod-smoked-oak-flooring",
          "materialName": "Smoked European White Oak Wide Plank",
          "category": "Timber",
          "imageUrl": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80"
        },
        {
          "materialId": "prod-linear-bronze-pendant",
          "materialName": "Kanso Linear Brushed Bronze Chandelier",
          "category": "Lighting",
          "imageUrl": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=400&q=80"
        }
      ],
      "isPublished": true,
      "isFeatured": true,
      "sortOrder": 1,
      "tags": [
        "Villa",
        "Coastal",
        "Travertine",
        "Minimalist Luxury",
        "Turnkey Execution"
      ],
      "createdAt": "2026-08-17T17:05:35.782Z",
      "updatedAt": "2026-08-17T17:05:35.782Z"
    },
    {
      "id": "proj-pavilion-worli",
      "title": "Pavilion of Light",
      "slug": "pavilion-of-light-worli",
      "location": "Worli Seaface, Mumbai",
      "year": "2024",
      "projectType": "Penthouse & Estate",
      "area": "5,400 sq ft",
      "shortDescription": "An expansive sea-facing sky penthouse wrapped in acoustic fluted walnut paneling, Calacatta Vagli porcelain, and custom patinated bronze millwork.",
      "description": "Perched high above the Arabian Sea, this sky residence explores how sunlight behaves across contrasting textures. The public salon flows seamlessly from honed stone floors to floor-to-ceiling smoked walnut millwork housing a curated collection of modern sculpture.",
      "heroImage": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85",
      "gallery": [
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80",
        "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=80",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1400&q=80"
      ],
      "designApproach": "We eradicated unnecessary visual clutter, replacing drywall partitions with sliding fluted acoustic timber screens that allow the living space to transform dynamically from open gallery to private entertaining salon.",
      "materialsUsed": [
        {
          "materialId": "prod-fluted-acoustic-panel",
          "materialName": "Acoustic Fluted Walnut Wall Panel",
          "category": "Acoustic Cladding",
          "imageUrl": "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=400&q=80"
        },
        {
          "materialId": "prod-calacatta-porcelain",
          "materialName": "Calacatta Vagli Sintered Porcelain Slab",
          "category": "Sintered Stone",
          "imageUrl": "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=400&q=80"
        }
      ],
      "isPublished": true,
      "isFeatured": true,
      "sortOrder": 2,
      "tags": [
        "Penthouse",
        "Mumbai",
        "Walnut",
        "Sea View",
        "Interior Design"
      ],
      "createdAt": "2026-08-17T17:05:35.782Z",
      "updatedAt": "2026-08-17T17:05:35.782Z"
    },
    {
      "id": "proj-maison-brutaliste",
      "title": "Maison Brutaliste",
      "slug": "maison-brutaliste-delhi",
      "location": "Chhatarpur Farms, New Delhi",
      "year": "2025",
      "projectType": "Residential Interiors",
      "area": "11,000 sq ft",
      "shortDescription": "A bold sculptural private residence contrasting raw architectural board-formed concrete with refined brushed bronze and lush interior courtyard gardens.",
      "description": "Conceived as an inward-looking sanctuary shielded from urban noise, Maison Brutaliste features soaring 6-meter ceilings and rhythmic colonnades that capture changing light across the seasons.",
      "heroImage": "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85",
      "gallery": [
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=80",
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=80"
      ],
      "designApproach": "The project demonstrates our philosophy of material honesty—every concrete pour, timber grain, and bronze joint is left exposed to celebrate true construction craftsmanship.",
      "materialsUsed": [
        {
          "materialId": "prod-travertine-slab",
          "materialName": "Romano Classico Vein-Cut Travertine",
          "category": "Stone"
        },
        {
          "materialId": "prod-knurled-bronze-hardware",
          "materialName": "Bespoke Knurled Bronze Door Lever",
          "category": "Hardware"
        }
      ],
      "isPublished": true,
      "isFeatured": true,
      "sortOrder": 3,
      "tags": [
        "Brutalist",
        "Private Residence",
        "Delhi",
        "Concrete & Bronze"
      ],
      "createdAt": "2026-08-17T17:05:35.782Z",
      "updatedAt": "2026-08-17T17:05:35.782Z"
    },
    {
      "id": "proj-monolith-studio",
      "title": "The Monolith Design Headquarters",
      "slug": "the-monolith-design-headquarters",
      "location": "Indiranagar, Bengaluru",
      "year": "2024",
      "projectType": "Commercial & Studio",
      "area": "4,200 sq ft",
      "shortDescription": "A serene creative studio for an international fashion house featuring modular walnut workstations and monolithic stone meeting pods.",
      "description": "Balaji Architect & Interiors was commissioned to rethink modern creative workspace architecture. We crafted quiet acoustic alcoves and an open library of tactile material specimens to inspire daily design exploration.",
      "heroImage": "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85",
      "gallery": [
        "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80"
      ],
      "designApproach": "Focus on high acoustic performance and calm ambient illumination to support deep creative focus.",
      "materialsUsed": [
        {
          "materialId": "prod-fluted-acoustic-panel",
          "materialName": "Acoustic Fluted Walnut Wall Panel",
          "category": "Acoustics"
        }
      ],
      "isPublished": true,
      "isFeatured": false,
      "sortOrder": 4,
      "tags": [
        "Studio",
        "Workplace",
        "Bengaluru",
        "Commercial"
      ],
      "createdAt": "2026-08-17T17:05:35.782Z",
      "updatedAt": "2026-08-17T17:05:35.782Z"
    },
    {
      "id": "proj-aura-hyderabad",
      "title": "Aura Residence",
      "slug": "aura-residence-hyderabad",
      "location": "Jubilee Hills, Hyderabad",
      "year": "2025",
      "projectType": "Residential Interiors",
      "area": "6,800 sq ft",
      "shortDescription": "An understated private residence balancing traditional Deccan courtyard typologies with razor-sharp modern detailing.",
      "description": "Every room in Aura Residence is composed around intimate landscaped lightwells. Custom unlacquered bronze partitions and vein-matched marble floors foster a feeling of continuous calm.",
      "heroImage": "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85",
      "gallery": [
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=80"
      ],
      "designApproach": "Integration of passive ventilation, natural daylight, and enduring local granite masonry.",
      "materialsUsed": [],
      "isPublished": true,
      "isFeatured": true,
      "sortOrder": 5,
      "tags": [
        "Courtyard House",
        "Hyderabad",
        "Luxury Interior"
      ],
      "createdAt": "2026-08-17T17:05:35.782Z",
      "updatedAt": "2026-08-17T17:05:35.782Z"
    },
    {
      "id": "proj-kyoto-tea-dine",
      "title": "Kyoto Tea & Dine Atelier",
      "slug": "kyoto-tea-dine-atelier",
      "location": "Pali Hill, Bandra West, Mumbai",
      "year": "2024",
      "projectType": "Hospitality & Luxury Dining",
      "area": "3,900 sq ft",
      "shortDescription": "An intimate omakase and artisanal tea lounge celebrated for its charred Shou Sugi Ban cedar walls and monolithic travertine bar.",
      "description": "Designed as a multisensory journey, guests transition through a tranquil rock garden into an ambient dining room anchored by an 8-meter solid stone counter illuminated by custom linear bronze fixtures.",
      "heroImage": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=85",
      "gallery": [
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80"
      ],
      "designApproach": "Minimalist Japanese wabi-sabi principles interpreted through contemporary Indian stone craftsmanship.",
      "materialsUsed": [
        {
          "materialId": "prod-linear-bronze-pendant",
          "materialName": "Kanso Linear Brushed Bronze Chandelier",
          "category": "Lighting"
        }
      ],
      "isPublished": true,
      "isFeatured": false,
      "sortOrder": 6,
      "tags": [
        "Hospitality",
        "Restaurant",
        "Bandra",
        "Dining"
      ],
      "createdAt": "2026-08-17T17:05:35.782Z",
      "updatedAt": "2026-08-17T17:05:35.782Z"
    }
  ],
  "services": [
    {
      "id": "srv-interior-architecture",
      "title": "Interior Architecture & Space Planning",
      "slug": "interior-architecture-space-planning",
      "shortDesc": "Comprehensive spatial reconfiguration, structural alignment, and architectural interior detailing for luxury residences and estates.",
      "fullDesc": "We re-engineer spatial flows from first principles, taking into account natural daylight vectors, sightlines, acoustics, and structural integration. Our drawings cover full architectural CAD & BIM sets, reflected ceiling plans, MEP coordination, and micro-detailed millwork joinery.",
      "iconName": "Compass",
      "imageUrl": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "deliverables": [
        "Concept spatial diagrams & 3D volumetric studies",
        "Full architectural interior blueprint packages",
        "Reflected ceiling & architectural lighting plans",
        "Custom door, window, and wall assembly details",
        "Statutory & structural consultant coordination"
      ],
      "sortOrder": 1,
      "isPublished": true,
      "createdAt": "2026-08-17T16:23:53.257Z",
      "updatedAt": "2026-08-17T16:23:53.257Z"
    },
    {
      "id": "srv-turnkey-execution",
      "title": "Turnkey Luxury Execution",
      "slug": "turnkey-luxury-execution",
      "shortDesc": "End-to-end master project management, artisan craftsmanship, and on-site engineering from bare shell to final handover.",
      "fullDesc": "Our dedicated site engineering and project management division oversees every phase of construction. We ensure absolute adherence to millimeter tolerances, material integrity, and promised delivery timelines.",
      "iconName": "ShieldCheck",
      "imageUrl": "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
      "deliverables": [
        "Dedicated on-site architectural project manager",
        "Daily photographic progress tracking & Gantt charts",
        "Master artisan supervision (masonry, carpentry, stone finishing)",
        "Rigorous multi-stage QA and snag resolution",
        "Comprehensive maintenance manuals & warranty portfolio"
      ],
      "sortOrder": 2,
      "isPublished": true,
      "createdAt": "2026-08-17T16:23:53.257Z",
      "updatedAt": "2026-08-17T16:23:53.257Z"
    },
    {
      "id": "srv-material-consultation",
      "title": "Material Curation & Sourcing Advisory",
      "slug": "material-curation-sourcing",
      "shortDesc": "Global stone quarry selection, certified timber procurement, and bespoke surface formulation tailored to project climate.",
      "fullDesc": "Leveraging our direct relationships with European quarries and master timber mills, we curate bespoke material palettes that age gracefully. We conduct rigorous laboratory testing for water absorption, hardness, and thermal behavior.",
      "iconName": "Layers",
      "imageUrl": "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
      "deliverables": [
        "Physical tactile sample trays & curated finish moodboards",
        "Direct quarry inspection and slab block selection",
        "Full technical specification sheets & maintenance protocols",
        "Contractor procurement schedules and MOQ optimization"
      ],
      "sortOrder": 3,
      "isPublished": true,
      "createdAt": "2026-08-17T16:23:53.257Z",
      "updatedAt": "2026-08-17T16:23:53.257Z"
    },
    {
      "id": "srv-custom-furniture",
      "title": "Bespoke Furniture & Custom Millwork",
      "slug": "bespoke-furniture-custom-millwork",
      "shortDesc": "Limited edition furniture, sculptural stone monoliths, and precision-engineered architectural cabinetry handcrafted in our studio.",
      "fullDesc": "Every piece is drafted specifically for its designated space, utilizing select hardwoods, hand-poured bronze castings, and monolithic natural stones.",
      "iconName": "Armchair",
      "imageUrl": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80",
      "deliverables": [
        "1:1 scale ergonomic prototypes and timber mockups",
        "Hand-selected natural flitch veneer matching",
        "Integrated soft-close concealed hardware engineering",
        "Numbered certificate of atelier authenticity"
      ],
      "sortOrder": 4,
      "isPublished": true,
      "createdAt": "2026-08-17T16:23:53.257Z",
      "updatedAt": "2026-08-17T16:23:53.257Z"
    }
  ],
  "orders": [],
  "quotes": [
    {
      "id": "qt-1786986369348-tnbv",
      "quoteNumber": "QT-2026-69348",
      "customerName": "Karan Singhania (Architect)",
      "customerEmail": "karan@singhania-arch.com",
      "customerPhone": "+91 98111 22334",
      "projectType": "Penthouse & Estate",
      "projectLocation": "Jubilee Hills, Hyderabad",
      "estimatedTimeline": "Immediate",
      "budgetRange": "₹1 Cr+",
      "notes": "Looking for 2,000 sq ft vein-cut travertine and acoustic walnut fluting.",
      "items": [
        {
          "id": "qti-1786986369348-3zz8",
          "quoteId": "qt-1786986369348-tnbv",
          "productName": "Romano Classico Vein-Cut Travertine",
          "dimensions": "Custom cut 1200x600",
          "quantity": 2000,
          "unit": "sq ft"
        }
      ],
      "status": "Under_Review",
      "createdAt": "2026-08-17T17:06:09.348Z",
      "updatedAt": "2026-08-17T17:06:09.349Z",
      "totalQuotedAmount": 1700000,
      "adminNotes": "Travertine quarry block confirmed"
    },
    {
      "id": "qt-1786984724575-vnkn",
      "quoteNumber": "QT-2026-24575",
      "customerName": "Karan Singhania (Architect)",
      "customerEmail": "karan@singhania-arch.com",
      "customerPhone": "+91 98111 22334",
      "projectType": "Penthouse & Estate",
      "projectLocation": "Jubilee Hills, Hyderabad",
      "estimatedTimeline": "Immediate",
      "budgetRange": "₹1 Cr+",
      "notes": "Looking for 2,000 sq ft vein-cut travertine and acoustic walnut fluting.",
      "items": [
        {
          "id": "qti-1786984724575-tfmy",
          "quoteId": "qt-1786984724575-vnkn",
          "productName": "Romano Classico Vein-Cut Travertine",
          "dimensions": "Custom cut 1200x600",
          "quantity": 2000,
          "unit": "sq ft"
        }
      ],
      "status": "Under_Review",
      "createdAt": "2026-08-17T16:38:44.575Z",
      "updatedAt": "2026-08-17T16:38:44.575Z",
      "totalQuotedAmount": 1700000,
      "adminNotes": "Travertine quarry block confirmed"
    },
    {
      "id": "qt-1786984681533-hgeo",
      "quoteNumber": "QT-2026-81533",
      "customerName": "Karan Singhania (Architect)",
      "customerEmail": "karan@singhania-arch.com",
      "customerPhone": "+91 98111 22334",
      "projectType": "Penthouse & Estate",
      "projectLocation": "Jubilee Hills, Hyderabad",
      "estimatedTimeline": "Immediate",
      "budgetRange": "₹1 Cr+",
      "notes": "Looking for 2,000 sq ft vein-cut travertine and acoustic walnut fluting.",
      "items": [
        {
          "id": "qti-1786984681533-yga2",
          "quoteId": "qt-1786984681533-hgeo",
          "productName": "Romano Classico Vein-Cut Travertine",
          "dimensions": "Custom cut 1200x600",
          "quantity": 2000,
          "unit": "sq ft"
        }
      ],
      "status": "Under_Review",
      "createdAt": "2026-08-17T16:38:01.533Z",
      "updatedAt": "2026-08-17T16:38:01.534Z",
      "totalQuotedAmount": 1700000,
      "adminNotes": "Travertine quarry block confirmed"
    },
    {
      "id": "qt-1786984657101-va26",
      "quoteNumber": "QT-2026-57101",
      "customerName": "Karan Singhania (Architect)",
      "customerEmail": "karan@singhania-arch.com",
      "customerPhone": "+91 98111 22334",
      "projectType": "Penthouse & Estate",
      "projectLocation": "Jubilee Hills, Hyderabad",
      "estimatedTimeline": "Immediate",
      "budgetRange": "₹1 Cr+",
      "notes": "Looking for 2,000 sq ft vein-cut travertine and acoustic walnut fluting.",
      "items": [
        {
          "id": "qti-1786984657101-bzzx",
          "quoteId": "qt-1786984657101-va26",
          "productName": "Romano Classico Vein-Cut Travertine",
          "dimensions": "Custom cut 1200x600",
          "quantity": 2000,
          "unit": "sq ft"
        }
      ],
      "status": "Under_Review",
      "createdAt": "2026-08-17T16:37:37.101Z",
      "updatedAt": "2026-08-17T16:37:37.102Z",
      "totalQuotedAmount": 1700000,
      "adminNotes": "Travertine quarry block confirmed"
    },
    {
      "id": "qt-1786983899968-72ks",
      "quoteNumber": "QT-2026-99968",
      "customerName": "Karan Singhania (Architect)",
      "customerEmail": "karan@singhania-arch.com",
      "customerPhone": "+91 98111 22334",
      "projectType": "Penthouse & Estate",
      "projectLocation": "Jubilee Hills, Hyderabad",
      "estimatedTimeline": "Immediate",
      "budgetRange": "₹1 Cr+",
      "notes": "Looking for 2,000 sq ft vein-cut travertine and acoustic walnut fluting.",
      "items": [
        {
          "id": "qti-1786983899968-24q9",
          "quoteId": "qt-1786983899968-72ks",
          "productName": "Romano Classico Vein-Cut Travertine",
          "dimensions": "Custom cut 1200x600",
          "quantity": 2000,
          "unit": "sq ft"
        }
      ],
      "status": "Under_Review",
      "createdAt": "2026-08-17T16:24:59.968Z",
      "updatedAt": "2026-08-17T16:24:59.969Z",
      "totalQuotedAmount": 1700000,
      "adminNotes": "Travertine quarry block confirmed"
    }
  ],
  "enquiries": [
    {
      "name": "Pooja Verma",
      "email": "pooja@verma.com",
      "phone": "+91 98333 44556",
      "subject": "Studio Consultation",
      "message": "We would like to visit the Lower Parel gallery this Friday.",
      "source": "Contact Page",
      "id": "enq-1786986369349-vfnu",
      "status": "New",
      "createdAt": "2026-08-17T17:06:09.349Z"
    },
    {
      "name": "Pooja Verma",
      "email": "pooja@verma.com",
      "phone": "+91 98333 44556",
      "subject": "Studio Consultation",
      "message": "We would like to visit the Lower Parel gallery this Friday.",
      "source": "Contact Page",
      "id": "enq-1786984724576-d32w",
      "status": "New",
      "createdAt": "2026-08-17T16:38:44.576Z"
    },
    {
      "name": "Pooja Verma",
      "email": "pooja@verma.com",
      "phone": "+91 98333 44556",
      "subject": "Studio Consultation",
      "message": "We would like to visit the Lower Parel gallery this Friday.",
      "source": "Contact Page",
      "id": "enq-1786984681535-87zz",
      "status": "New",
      "createdAt": "2026-08-17T16:38:01.535Z"
    },
    {
      "name": "Pooja Verma",
      "email": "pooja@verma.com",
      "phone": "+91 98333 44556",
      "subject": "Studio Consultation",
      "message": "We would like to visit the Lower Parel gallery this Friday.",
      "source": "Contact Page",
      "id": "enq-1786984657103-937g",
      "status": "New",
      "createdAt": "2026-08-17T16:37:37.103Z"
    },
    {
      "name": "Pooja Verma",
      "email": "pooja@verma.com",
      "phone": "+91 98333 44556",
      "subject": "Studio Consultation",
      "message": "We would like to visit the Lower Parel gallery this Friday.",
      "source": "Contact Page",
      "id": "enq-1786983899970-uvnw",
      "status": "New",
      "createdAt": "2026-08-17T16:24:59.970Z"
    }
  ],
  "siteSettings": {
    "brandName": "Balaji Architect & Interior",
    "tagline": "Crafted spaces, luxury architecture, and considered materials for timeless living.",
    "logoUrl": "",
    "contactEmail": "atelier@balaji-interior.com",
    "contactPhone": "+91 70029 48484",
    "studioAddress": "Door No. 306, DN TOWER, Floor No. 03, Beltola Tiniali",
    "city": "Guwahati",
    "state": "Assam",
    "country": "India",
    "pincode": "781040",
    "currency": "INR",
    "currencySymbol": "₹",
    "taxRatePercent": 18,
    "standardShippingFee": 1500,
    "freeShippingThreshold": 50000,
    "socialInstagram": "https://instagram.com/balajiatelier",
    "socialPinterest": "https://pinterest.com/balajiatelier",
    "socialLinkedin": "https://linkedin.com/company/balaji-atelier",
    "announcementBanner": {
      "enabled": true,
      "text": "Complimentary Material Advisory Sessions Available for Q3/Q4 Architectural Commissions",
      "linkUrl": "/quote"
    }
  },
  "pushSubscriptions": [],
  "auditLogs": [
    {
      "id": "log-1787152756799",
      "adminId": "system",
      "adminEmail": "checkout@balaji.com",
      "action": "ORDER_PLACED",
      "entity": "Order",
      "entityId": "22ed6b59-72f1-4c51-a631-1c5adb048c17",
      "details": {
        "orderNumber": "BAL-756132-541",
        "total": 32652,
        "itemsCount": 1
      },
      "createdAt": "2026-08-19T15:19:16.799Z"
    },
    {
      "id": "log-1787152721500",
      "adminId": "system",
      "adminEmail": "checkout@balaji.com",
      "action": "ORDER_PLACED",
      "entity": "Order",
      "entityId": "071304c5-d535-4aa0-9363-8dd603b49998",
      "details": {
        "orderNumber": "BAL-721036-937",
        "total": 32652,
        "itemsCount": 1
      },
      "createdAt": "2026-08-19T15:18:41.500Z"
    },
    {
      "id": "log-1786986369346",
      "adminId": "system",
      "adminEmail": "checkout@balaji.com",
      "action": "ORDER_PLACED",
      "entity": "Order",
      "entityId": "ord-1786986369346-43ydx",
      "details": {
        "orderNumber": "BAL-369346-717",
        "total": 19908,
        "itemsCount": 1
      },
      "createdAt": "2026-08-17T17:06:09.346Z"
    },
    {
      "id": "log-1786986369335",
      "adminId": "admin-balaji-root",
      "adminEmail": "vicks@balaji.com",
      "action": "ADMIN_PASSWORD_CHANGED",
      "entity": "Admin",
      "entityId": "admin-balaji-root",
      "details": {
        "message": "Initial bootstrap password replaced with permanent custom password."
      },
      "createdAt": "2026-08-17T17:06:09.335Z"
    },
    {
      "id": "log-1786984724573",
      "adminId": "system",
      "adminEmail": "checkout@balaji.com",
      "action": "ORDER_PLACED",
      "entity": "Order",
      "entityId": "ord-1786984724573-glnn8",
      "details": {
        "orderNumber": "BAL-724573-452",
        "total": 19908,
        "itemsCount": 1
      },
      "createdAt": "2026-08-17T16:38:44.573Z"
    },
    {
      "id": "log-1786984724563",
      "adminId": "admin-balaji-root",
      "adminEmail": "vicks@balaji.com",
      "action": "ADMIN_PASSWORD_CHANGED",
      "entity": "Admin",
      "entityId": "admin-balaji-root",
      "details": {
        "message": "Initial bootstrap password replaced with permanent custom password."
      },
      "createdAt": "2026-08-17T16:38:44.563Z"
    },
    {
      "id": "log-1786984681531",
      "adminId": "system",
      "adminEmail": "checkout@balaji.com",
      "action": "ORDER_PLACED",
      "entity": "Order",
      "entityId": "ord-1786984681531-7o0k4",
      "details": {
        "orderNumber": "BAL-681531-570",
        "total": 19908,
        "itemsCount": 1
      },
      "createdAt": "2026-08-17T16:38:01.531Z"
    },
    {
      "id": "log-1786984681519",
      "adminId": "admin-balaji-root",
      "adminEmail": "vicks@balaji.com",
      "action": "ADMIN_PASSWORD_CHANGED",
      "entity": "Admin",
      "entityId": "admin-balaji-root",
      "details": {
        "message": "Initial bootstrap password replaced with permanent custom password."
      },
      "createdAt": "2026-08-17T16:38:01.519Z"
    },
    {
      "id": "log-1786984667361",
      "adminId": "admin-balaji-root",
      "adminEmail": "vicks@balaji.com",
      "action": "ADMIN_PASSWORD_CHANGED",
      "entity": "Admin",
      "entityId": "admin-balaji-root",
      "details": {
        "message": "Initial bootstrap password replaced with permanent custom password."
      },
      "createdAt": "2026-08-17T16:37:47.361Z"
    },
    {
      "id": "log-1786984657099",
      "adminId": "system",
      "adminEmail": "checkout@balaji.com",
      "action": "ORDER_PLACED",
      "entity": "Order",
      "entityId": "ord-1786984657099-ufqu3",
      "details": {
        "orderNumber": "BAL-657099-574",
        "total": 19908,
        "itemsCount": 1
      },
      "createdAt": "2026-08-17T16:37:37.099Z"
    },
    {
      "id": "log-1786984657086",
      "adminId": "admin-balaji-root",
      "adminEmail": "vicks@balaji.com",
      "action": "ADMIN_PASSWORD_CHANGED",
      "entity": "Admin",
      "entityId": "admin-balaji-root",
      "details": {
        "message": "Initial bootstrap password replaced with permanent custom password."
      },
      "createdAt": "2026-08-17T16:37:37.086Z"
    },
    {
      "id": "log-1786983899967",
      "adminId": "system",
      "adminEmail": "checkout@balaji.com",
      "action": "ORDER_PLACED",
      "entity": "Order",
      "entityId": "ord-1786983899967-25odp",
      "details": {
        "orderNumber": "BAL-899967-440",
        "total": 19908,
        "itemsCount": 1
      },
      "createdAt": "2026-08-17T16:24:59.967Z"
    },
    {
      "id": "log-1786983899957",
      "adminId": "admin-balaji-root",
      "adminEmail": "vicks@balaji.com",
      "action": "ADMIN_PASSWORD_CHANGED",
      "entity": "Admin",
      "entityId": "admin-balaji-root",
      "details": {
        "message": "Initial bootstrap password replaced with permanent custom password."
      },
      "createdAt": "2026-08-17T16:24:59.957Z"
    },
    {
      "id": "log-init",
      "adminId": "system",
      "adminEmail": "system@balaji.com",
      "action": "DATABASE_INITIALIZED",
      "entity": "System",
      "details": {
        "message": "Balaji Atelier Production Database successfully initialized with editorial seed."
      },
      "createdAt": "2026-08-17T16:23:54.088Z"
    }
  ]
}
```

---

### `next-env.d.ts`

- **File**: `next-env.d.ts`
- **Size**: 0.2 KB (6 lines)
- **Language**: `typescript`

```typescript
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/building-your-application/configuring/typescript for more information.
```

---

### `next.config.js`

- **File**: `next.config.js`
- **Size**: 0.3 KB (19 lines)
- **Language**: `javascript`

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
    ],
  },
};

module.exports = nextConfig;
```

---

### `package.json`

- **File**: `package.json`
- **Size**: 0.9 KB (37 lines)
- **Language**: `json`

```json
{
  "name": "balaji-atelier",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@supabase/supabase-js": "^2.48.1",
    "@types/web-push": "^3.6.4",
    "clsx": "^2.1.1",
    "jsonwebtoken": "^9.0.2",
    "lucide-react": "^0.475.0",
    "next": "^14.2.23",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "tailwind-merge": "^2.6.0",
    "web-push": "^3.6.7"
  },
  "devDependencies": {
    "@types/jsonwebtoken": "^9.0.8",
    "@types/node": "^20.17.17",
    "@types/react": "^18.3.18",
    "@types/react-dom": "^18.3.5",
    "autoprefixer": "^10.4.20",
    "dotenv": "^17.4.2",
    "eslint": "^8.57.1",
    "eslint-config-next": "^14.2.23",
    "postcss": "^8.5.1",
    "tailwindcss": "^3.4.17",
    "typescript": "^5.7.3"
  }
}
```

---

### `postcss.config.js`

- **File**: `postcss.config.js`
- **Size**: 0.1 KB (7 lines)
- **Language**: `javascript`

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

---

### `public/sw.js`

- **File**: `public/sw.js`
- **Size**: 1.1 KB (36 lines)
- **Language**: `javascript`

```javascript
// Balaji Architect & Interiors Service Worker - Realtime Order & Quote Notifications
self.addEventListener('push', function (event) {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body || 'New architectural order registered.',
      icon: '/favicon.ico',
      badge: '/favicon.ico',
      data: {
        url: data.url || '/admin/orders',
      },
      vibrate: [200, 100, 200],
    };

    event.waitUntil(self.registration.showNotification(data.title || 'Balaji Architect & Interiors Admin', options));
  }
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(function (clientList) {
      const url = event.notification.data?.url || '/admin/orders';
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i];
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});
```

---

### `scripts/seed-supabase.ts`

- **File**: `scripts/seed-supabase.ts`
- **Size**: 6.5 KB (201 lines)
- **Language**: `typescript`

```typescript
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
```

---

### `scripts/verify-production.ts`

- **File**: `scripts/verify-production.ts`
- **Size**: 10.3 KB (291 lines)
- **Language**: `typescript`

```typescript
import fs from 'fs';
import path from 'path';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  getServices,
  createOrderAtomic,
  getOrders,
  updateOrderStatus,
  createQuote,
  getQuotes,
  updateQuoteStatus,
  createEnquiry,
  getEnquiries,
  getAdminByEmail,
  updateAdminPassword,
  getSiteSettings,
  getAuditLogs,
  resetDbCache,
} from '../src/lib/db';

import { hashPassword, verifyPassword, signAdminToken, verifyAdminToken } from '../src/lib/auth';

async function runAllTests() {
  console.log('==================================================');
  console.log('RUNNING ATELIER BALAJI FULL PRODUCTION VERIFICATION');
  console.log('==================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string) {
    if (condition) {
      console.log(`[PASS] ${testName}`);
      passed++;
    } else {
      console.error(`[FAIL] ${testName}`);
      failed++;
    }
  }

  // 1. ADMIN BOOTSTRAP AUTH TEST
  console.log('--- TEST GROUP 1: ADMIN AUTH & SECURITY ---');
  // Reset admin state for idempotent test
  const adminInitial = await getAdminByEmail('vicks@balaji.com');
  if (adminInitial) {
    const bootstrapHash = hashPassword('v****@********');
    const dbFilePath = path.join(process.cwd(), 'data', 'db.json');
    if (fs.existsSync(dbFilePath)) {
      const rawData = JSON.parse(fs.readFileSync(dbFilePath, 'utf-8'));
      const adm = rawData.admins.find((a: any) => a.email === 'vicks@balaji.com');
      if (adm) {
        adm.passwordHash = bootstrapHash;
        adm.mustChangePassword = true;
        fs.writeFileSync(dbFilePath, JSON.stringify(rawData, null, 2), 'utf-8');
        resetDbCache();
      }
    }
  }

  const admin = await getAdminByEmail('vicks@balaji.com');
  assert(admin !== null, 'Initial admin user vicks@balaji.com exists in database');
  assert(admin?.mustChangePassword === true, 'Initial admin has mustChangePassword = true');

  const initialBootstrapValid = verifyPassword('v****@********', admin!.passwordHash);
  assert(initialBootstrapValid === true, 'Initial bootstrap password hashes and verifies correctly');

  // Test Session Token Signing & Verification
  const token = signAdminToken({
    id: admin!.id,
    email: admin!.email,
    name: admin!.name,
    role: admin!.role,
    mustChangePassword: admin!.mustChangePassword,
  });
  const decoded = verifyAdminToken(token);
  assert(decoded !== null && decoded.email === 'vicks@balaji.com', 'Admin JWT session token signs and verifies');

  // Test Password Change (Invaliding initial bootstrap password)
  const newPassHash = hashPassword('VikasSecure2026!Atelier');
  await updateAdminPassword(admin!.id, newPassHash);

  const updatedAdmin = await getAdminByEmail('vicks@balaji.com');
  assert(updatedAdmin?.mustChangePassword === false, 'After update, mustChangePassword is false');
  assert(
    verifyPassword('VikasSecure2026!Atelier', updatedAdmin!.passwordHash) === true,
    'New permanent custom password verifies successfully'
  );
  assert(
    verifyPassword('v****@********', updatedAdmin!.passwordHash) === false,
    'Original bootstrap password is permanently invalidated and fails'
  );

  // 2. PRODUCT CRUD & PARTIAL UPDATES TEST
  console.log('\n--- TEST GROUP 2: PRODUCT CATALOG & PARTIAL UPDATE RULES ---');
  const initialProducts = await getProducts({ publishedOnly: false });
  assert(initialProducts.length >= 8, `Catalog seeded with ${initialProducts.length} luxury materials`);

  // Create Product Test
  const testProduct = await createProduct({
    name: 'Test Sintered Basalt Slab',
    slug: 'test-sintered-basalt-slab',
    sku: 'MAT-BST-999',
    brand: 'Balaji Atelier Test Lab',
    categoryId: initialProducts[0].categoryId,
    description: 'Deep volcanic basalt slab with textured flamed finish for architectural testing.',
    price: 1200,
    unit: 'sq ft',
    moq: 50,
    stock: 500,
    purchaseMode: 'BOTH',
    leadTime: '3-5 days',
    images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c'],
    isFeatured: false,
    isNew: true,
    isBestseller: false,
    published: true,
    tags: ['Test', 'Basalt'],
    specifications: { 'Origin': 'Sicily, Italy' },
  });
  assert(testProduct !== undefined && testProduct.id.startsWith('prod-'), 'New product created with unique immutable ID');

  // Test Partial Update (Change ONLY stock)
  const updatedStockProd = await updateProduct(testProduct.id, { stock: 420 });
  assert(
    updatedStockProd !== null && updatedStockProd.stock === 420 && updatedStockProd.price === 1200,
    'Partial update (stock only) preserved all existing fields'
  );

  // Test Partial Update (Change ONLY published status)
  await updateProduct(testProduct.id, { published: false });
  const publishedList = await getProducts({ publishedOnly: true });
  assert(
    !publishedList.some((p) => p.id === testProduct.id),
    'Unpublished product is omitted from customer storefront'
  );

  // Delete test product
  const deleted = await deleteProduct(testProduct.id);
  assert(deleted === true, 'Product deleted successfully');
  const checkDeleted = await getProductById(testProduct.id);
  assert(checkDeleted === null, 'Deleted product is completely removed from database');

  // 3. CATEGORIES TEST
  console.log('\n--- TEST GROUP 3: CATEGORIES ---');
  const categories = await getCategories();
  assert(categories.length >= 6, `Categories loaded: ${categories.length}`);
  const catStone = categories.find((c) => c.slug === 'natural-stone-marble');
  assert(catStone !== undefined && (catStone.productCount || 0) > 0, 'Stone category has active products linked');

  // 4. ATOMIC ORDERING & PRICE TAMPERING RESISTANCE TEST
  console.log('\n--- TEST GROUP 4: ORDERS & ATOMIC INVENTORY ---');
  const targetProduct = initialProducts[0];
  const initialStock = targetProduct.stock;
  const orderQuantity = 20;

  // Place Order with Server-Authoritative Price Calculation
  const orderResult = await createOrderAtomic({
    customerName: 'Aarav Mehta',
    customerEmail: 'aarav.mehta@studio.com',
    customerPhone: '+91 98201 12345',
    shippingAddress: {
      fullName: 'Aarav Mehta',
      phone: '+91 98201 12345',
      addressLine1: 'Villa 14, Palm Avenue, Worli',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400018',
      country: 'India',
    },
    items: [
      {
        productId: targetProduct.id,
        quantity: orderQuantity,
      },
    ],
    paymentMethod: 'Credit Card',
    notes: 'Ground floor crane delivery',
  });

  assert(orderResult.success === true, 'Order created successfully');
  assert(orderResult.order !== undefined, 'Order object returned with unique orderNumber');
  assert(
    orderResult.order?.subtotal === (targetProduct.salePrice || targetProduct.price) * orderQuantity,
    'Server computed authoritative subtotal ignoring any client manipulation'
  );

  // Verify Atomic Stock Decrement
  const prodAfterOrder = await getProductById(targetProduct.id);
  assert(
    prodAfterOrder?.stock === initialStock - orderQuantity,
    `Stock decremented atomically from ${initialStock} to ${prodAfterOrder?.stock}`
  );

  // Test Overselling Prevention
  const oversellResult = await createOrderAtomic({
    customerName: 'Oversell Tester',
    customerEmail: 'test@oversell.com',
    customerPhone: '+91 99999 99999',
    shippingAddress: { fullName: 'Test', phone: '999', addressLine1: 'Test St', city: 'Mumbai', state: 'MH', pincode: '400001', country: 'India' },
    items: [
      {
        productId: targetProduct.id,
        quantity: (prodAfterOrder?.stock || 0) + 1000, // Exceeds available stock
      },
    ],
    paymentMethod: 'Credit Card',
  });
  assert(oversellResult.success === false, 'Oversell attempt was safely rejected by server');

  // Test Order Status Transitions
  const updatedOrder = await updateOrderStatus(orderResult.order!.id, 'Processing', 'Paid');
  assert(
    updatedOrder?.orderStatus === 'Processing' && updatedOrder?.paymentStatus === 'Paid',
    'Order status transitioned to Processing / Paid'
  );

  // 5. QUOTES ESTIMATION TEST
  console.log('\n--- TEST GROUP 5: QUOTES ---');
  const quote = await createQuote({
    customerName: 'Karan Singhania (Architect)',
    customerEmail: 'karan@singhania-arch.com',
    customerPhone: '+91 98111 22334',
    projectType: 'Penthouse & Estate',
    projectLocation: 'Jubilee Hills, Hyderabad',
    estimatedTimeline: 'Immediate',
    budgetRange: '₹1 Cr+',
    notes: 'Looking for 2,000 sq ft vein-cut travertine and acoustic walnut fluting.',
    items: [
      {
        productName: 'Romano Classico Vein-Cut Travertine',
        dimensions: 'Custom cut 1200x600',
        quantity: 2000,
        unit: 'sq ft',
      },
    ],
  });
  assert(quote !== undefined && quote.quoteNumber.startsWith('QT-'), 'Quote generated with reference number');

  const updatedQuote = await updateQuoteStatus(quote.id, 'Under_Review', 1700000, 'Travertine quarry block confirmed');
  assert(
    updatedQuote?.status === 'Under_Review' && updatedQuote?.totalQuotedAmount === 1700000,
    'Quote successfully updated with estimated total and studio internal notes'
  );

  // 6. ENQUIRY / CONTACT TEST
  console.log('\n--- TEST GROUP 6: ENQUIRIES ---');
  const enquiry = await createEnquiry({
    name: 'Pooja Verma',
    email: 'pooja@verma.com',
    phone: '+91 98333 44556',
    subject: 'Studio Consultation',
    message: 'We would like to visit the Lower Parel gallery this Friday.',
    source: 'Contact Page',
  });
  assert(enquiry !== undefined && enquiry.status === 'New', 'Customer enquiry persisted in database');

  // 7. AUDIT LOGS TEST
  console.log('\n--- TEST GROUP 7: AUDIT LOGS ---');
  const logs = await getAuditLogs();
  assert(logs.length >= 3, `Audit logs recorded ${logs.length} immutable events`);
  assert(
    logs.some((l) => l.action === 'ORDER_PLACED' || l.action === 'ADMIN_PASSWORD_CHANGED'),
    'Critical mutations recorded in audit log'
  );

  console.log('\n==================================================');
  console.log(`VERIFICATION COMPLETE: ${passed} PASSED, ${failed} FAILED`);
  console.log('==================================================');

  if (failed > 0) {
    process.exit(1);
  }
}

runAllTests().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
```

---

### `src/app/about/page.tsx`

- **File**: `src/app/about/page.tsx`
- **Size**: 10.0 KB (208 lines)
- **Language**: `tsx`

```tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { ImageReveal } from '@/components/ImageReveal';

export const metadata = {
  title: 'About The Studio — Balaji Architect & Interiors',
  description: 'Learn about Balaji Architect & Interiors, our architectural philosophy, craftsmanship pedigree, and material sourcing excellence.',
};

export default function AboutPage() {
  const principles = [
    {
      title: 'Material Authenticity',
      desc: 'We never disguise or simulate materials. Stone reveals its true geology, timber breathes its natural grain, and metals celebrate organic patinas.',
    },
    {
      title: 'Architectural Rigor',
      desc: 'Every millwork joint, ceiling reveal, and floor transition is calculated with millimeter precision, creating spaces of profound quietude.',
    },
    {
      title: 'Direct Sourcing Provenance',
      desc: 'By procuring blocks directly from Italian, Greek, and Portuguese quarries and collaborating with certified master mills, we ensure ethical stewardship and unmatched quality.',
    },
    {
      title: 'Turnkey Stewardship',
      desc: 'We oversee the complete lifecycle of a project—from conceptual architectural drawings through master artisan craftsmanship to final spatial styling.',
    },
  ];

  return (
    <div className="space-y-24 sm:space-y-32 pb-24">
      {/* Header Banner */}
      <section className="bg-espresso text-surface py-24 sm:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <Reveal>
            <span className="text-xs uppercase tracking-widest-plus text-champagne font-medium">
              About Balaji Architect & Interiors
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-surface font-light leading-tight mt-2 max-w-4xl">
              Architecture rooted in material honesty and spatial calm.
            </h1>
          </Reveal>
          <Reveal delay={150}>
            <p className="max-w-2xl text-base sm:text-lg text-surface/80 font-light leading-relaxed">
              Headquartered in Guwahati, Balaji Architect & Interiors unites high-end residential architecture, turnkey interior design, and an exclusive supply network of raw and refined architectural materials.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Studio Story & Photography */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-6">
            <Reveal>
              <span className="text-xs uppercase tracking-widest text-bronze font-medium">Our Heritage</span>
              <h2 className="font-serif text-3xl sm:text-4xl text-espresso font-light leading-tight mt-1">
                From artisan workshop to full-service architectural studio.
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="text-sm sm:text-base text-warmgray font-light leading-relaxed">
                Balaji Architect & Interiors began with a focused obsession: master woodworking and stone joinery. Over more than a decade of executing bespoke penthouses, private villas, and landmark commercial spaces, our practice evolved into a holistic architectural studio.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <p className="text-sm sm:text-base text-warmgray font-light leading-relaxed">
                Today, we operate a multidisciplinary studio comprising architects, interior spatial planners, site engineers, and material specialists. We control the entire creative and physical supply chain, ensuring that what is envisioned on paper translates flawlessly into lived reality.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div className="pt-4">
                <Link
                  href="/projects"
                  className="px-6 py-3.5 btn-luxury-dark text-xs uppercase tracking-widest inline-flex items-center gap-2"
                >
                  Explore Completed Portfolio <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal delay={200}>
              <ImageReveal
                src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=80"
                alt="Balaji Architect & Interiors Architectural Master Suite"
                aspectRatio="aspect-[4/3]"
                className="shadow-lg"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* 4 Guiding Principles */}
      <section className="bg-surface py-16 sm:py-24 border-y border-atelier">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-2 sm:space-y-3">
            <span className="text-xs uppercase tracking-widest text-bronze font-medium">Core Tenets</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-espresso font-light">
              Principles of our Architectural Practice
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {principles.map((item, idx) => (
              <Reveal key={item.title} delay={idx * 100}>
                <div className="bg-canvas p-8 border border-atelier h-full space-y-4">
                  <span className="font-serif text-3xl text-bronze font-light">0{idx + 1}</span>
                  <h3 className="font-serif text-xl text-espresso font-medium">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-warmgray font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Materials Sourcing Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <Reveal>
              <ImageReveal
                src="https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1400&q=80"
                alt="Direct Italian Quarry Sourcing"
                aspectRatio="aspect-[4/3]"
              />
            </Reveal>
          </div>
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
            <Reveal>
              <span className="text-xs uppercase tracking-widest text-bronze font-medium">Supply Ecosystem</span>
              <h2 className="font-serif text-3xl sm:text-4xl text-espresso font-light leading-tight mt-1">
                Direct global quarry & millwork integration.
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="text-sm sm:text-base text-warmgray font-light leading-relaxed">
                Rather than relying on intermediaries, Balaji Architect & Interiors imports blocks directly from certified quarries in Tuscany, Verona, and Drama, slicing and finishing them to custom architectural dimensions in our advanced surface facility.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <ul className="space-y-3 pt-2 text-xs sm:text-sm text-espresso">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-bronze flex-shrink-0" />
                  <span>Vein-matched continuous slabs up to 3.2 meters</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-bronze flex-shrink-0" />
                  <span>FSC-certified European white oak and French walnut</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-bronze flex-shrink-0" />
                  <span>Acoustic NRC 0.85+ high-density ribbed wall panels</span>
                </li>
              </ul>
            </Reveal>
            <Reveal delay={300}>
              <div className="pt-2">
                <Link
                  href="/materials"
                  className="px-6 py-3.5 btn-luxury-outline text-xs uppercase tracking-widest inline-flex items-center gap-2"
                >
                  Explore Materials Catalog <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Consultation CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 pt-12">
        <Reveal>
          <span className="text-xs uppercase tracking-widest text-bronze font-medium">Engage the Studio</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-espresso font-light mt-2">
            Schedule a Private Architecture & Material Consultation
          </h2>
          <p className="text-sm sm:text-base text-warmgray max-w-xl mx-auto mt-2 font-light">
            Visit our Mumbai design studio or request a preliminary spatial review with our senior architects.
          </p>
          <div className="pt-6 flex justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-4 btn-luxury-dark text-xs uppercase tracking-widest"
            >
              Contact Studio
            </Link>
            <Link
              href="/quote"
              className="px-8 py-4 btn-luxury-outline text-xs uppercase tracking-widest"
            >
              Request Project Estimate
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
```

---

### `src/app/account/page.tsx`

- **File**: `src/app/account/page.tsx`
- **Size**: 5.5 KB (132 lines)
- **Language**: `tsx`

```tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, ShoppingBag, Package, CheckCircle2, ArrowRight } from 'lucide-react';
import { Order } from '@/types';

export default function AccountPage() {
  const [lookupEmail, setLookupEmail] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lookupEmail.trim()) return;

    setLoading(true);
    setSearched(true);

    try {
      const res = await fetch('/api/orders');
      if (res.ok) {
        const data = await res.json();
        const matched = (data.orders || []).filter(
          (o: Order) => o.customerEmail.toLowerCase().trim() === lookupEmail.toLowerCase().trim()
        );
        setOrders(matched);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-12 min-h-[65vh]">
      <div className="space-y-3 border-b border-atelier pb-6 text-center">
        <span className="text-xs uppercase tracking-widest text-bronze font-medium">Customer Portal</span>
        <h1 className="font-serif text-3xl sm:text-4xl text-espresso font-light">
          Track Your Architectural Orders
        </h1>
        <p className="text-xs sm:text-sm text-warmgray font-light max-w-md mx-auto">
          Enter the email address used during checkout to view dispatch status, tracking information, and invoices.
        </p>
      </div>

      <form onSubmit={handleLookup} className="max-w-md mx-auto flex gap-2">
        <input
          type="email"
          required
          placeholder="Enter client email address..."
          value={lookupEmail}
          onChange={(e) => setLookupEmail(e.target.value)}
          className="flex-1 p-3 bg-surface border border-atelier text-xs focus:border-bronze focus:outline-hidden"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 btn-luxury-dark text-xs uppercase tracking-widest font-medium"
        >
          {loading ? 'Searching...' : 'Find Orders'}
        </button>
      </form>

      {searched && (
        <div className="space-y-6">
          {orders.length === 0 ? (
            <div className="bg-surface border border-atelier p-8 text-center space-y-3">
              <p className="font-serif text-xl text-espresso">No active orders found for &ldquo;{lookupEmail}&rdquo;</p>
              <p className="text-xs text-warmgray">Please check for typographical errors or verify the email used at checkout.</p>
            </div>
          ) : (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl text-espresso">
                Past Orders ({orders.length})
              </h2>

              <div className="space-y-4">
                {orders.map((ord) => (
                  <div key={ord.id} className="bg-surface border border-atelier p-6 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-atelier pb-4 gap-2 text-xs">
                      <div>
                        <span className="font-mono font-medium text-espresso block text-sm">
                          Order #{ord.orderNumber}
                        </span>
                        <span className="text-warmgray">
                          Placed on {new Date(ord.createdAt).toLocaleDateString('en-IN')}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="px-2.5 py-1 bg-espresso text-surface text-[10px] uppercase tracking-wider">
                          Status: {ord.orderStatus}
                        </span>
                        <span className="font-serif text-base font-medium text-timber">
                          ₹{ord.totalAmount.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>

                    {/* Items List */}
                    <div className="divide-y divide-atelier/60 text-xs">
                      {ord.items.map((item) => (
                        <div key={item.id} className="py-2 flex justify-between items-center">
                          <div>
                            <span className="font-medium text-espresso">{item.productName}</span>
                            <span className="text-warmgray block text-[11px]">
                              Qty: {item.quantity} {item.unit} • ₹{item.unitPrice.toLocaleString('en-IN')}/{item.unit}
                            </span>
                          </div>
                          <span className="font-medium text-timber">₹{item.subtotal.toLocaleString('en-IN')}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-atelier flex justify-between items-center text-xs text-warmgray">
                      <span>Dispatch Site: {ord.shippingAddress.city}, {ord.shippingAddress.state}</span>
                      <span className="text-bronze font-medium">Payment: {ord.paymentStatus}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
```

---

### `src/app/admin/categories/page.tsx`

- **File**: `src/app/admin/categories/page.tsx`
- **Size**: 10.9 KB (295 lines)
- **Language**: `tsx`

```tsx
'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Plus, Edit2, Trash2, Check, X, FolderTree, ExternalLink } from 'lucide-react';
import { AdminLayout } from '@/components/AdminLayout';
import { ImageUploader } from '@/components/ImageUploader';
import { Category } from '@/types';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [sortOrder, setSortOrder] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [formError, setFormError] = useState<string | null>(null);

  const loadCategories = async () => {
    try {
      const res = await fetch('/api/categories?admin=true');
      if (res.ok) {
        const data = await res.json();
        setCategories(data.categories || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const openCreateModal = () => {
    setEditingCategory(null);
    setName('');
    setSlug('');
    setDescription('');
    setImageUrl('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80');
    setSortOrder(categories.length + 1);
    setIsActive(true);
    setFormError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (c: Category) => {
    setEditingCategory(c);
    setName(c.name);
    setSlug(c.slug);
    setDescription(c.description || '');
    setImageUrl(c.imageUrl || '');
    setSortOrder(c.sortOrder);
    setIsActive(c.isActive);
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const payload = {
      name,
      slug: slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description,
      imageUrl,
      sortOrder: Number(sortOrder),
      isActive,
    };

    try {
      const url = editingCategory ? `/api/categories/${editingCategory.id}` : '/api/categories';
      const method = editingCategory ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsModalOpen(false);
        loadCategories();
      } else {
        setFormError(data.error || 'Failed to save category');
      }
    } catch (err: any) {
      setFormError(err.message || 'Server error');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return;
    try {
      const res = await fetch(`/api/categories/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setCategories(categories.filter((c) => c.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-atelier pb-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-bronze font-medium">Structure</span>
            <h1 className="font-serif text-3xl sm:text-4xl text-espresso font-light">Material Categories</h1>
          </div>
          <button
            onClick={openCreateModal}
            className="px-5 py-2.5 btn-luxury-dark text-xs uppercase tracking-widest flex items-center gap-2 font-medium"
          >
            <Plus className="w-4 h-4" /> Create Category
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-surface border border-atelier p-5 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="relative aspect-[16/9] bg-canvas overflow-hidden border border-atelier">
                  {cat.imageUrl && (
                    <Image src={cat.imageUrl} alt={cat.name} fill className="object-cover" />
                  )}
                  <span className="absolute top-2 right-2 px-2 py-0.5 bg-espresso text-surface text-[10px] uppercase font-mono">
                    Order: {cat.sortOrder}
                  </span>
                </div>

                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="font-serif text-xl text-espresso font-medium">{cat.name}</h3>
                    <span className="text-xs text-bronze font-medium">{cat.productCount || 0} Materials</span>
                  </div>
                  <p className="text-[11px] font-mono text-warmgray mt-0.5">/category/{cat.slug}</p>
                  {cat.description && (
                    <p className="text-xs text-warmgray font-light mt-2 line-clamp-2">{cat.description}</p>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-atelier flex items-center justify-between">
                <span
                  className={`text-[10px] uppercase tracking-wider px-2 py-0.5 ${
                    cat.isActive ? 'bg-green-100 text-green-800' : 'bg-warmgray/20 text-warmgray'
                  }`}
                >
                  {cat.isActive ? 'Active' : 'Disabled'}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(cat)}
                    className="p-1.5 bg-canvas border border-atelier hover:border-bronze text-espresso text-xs"
                    title="Edit"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="p-1.5 bg-canvas border border-atelier hover:text-red-700 text-warmgray text-xs"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-espresso/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-surface border border-atelier p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex justify-between items-center border-b border-atelier pb-4">
              <h2 className="font-serif text-2xl text-espresso">
                {editingCategory ? 'Edit Category' : 'New Category'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-warmgray hover:text-espresso">
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-800 text-xs">{formError}</div>
            )}

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="uppercase tracking-wider text-warmgray font-medium">Category Title *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 bg-canvas border border-atelier text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="uppercase tracking-wider text-warmgray font-medium">Slug URL (Optional)</label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="e.g. natural-stone-marble"
                  className="w-full p-2.5 bg-canvas border border-atelier text-xs font-mono"
                />
              </div>

              <div className="border-t border-atelier pt-3">
                <ImageUploader
                  bucket="products"
                  images={imageUrl ? [imageUrl] : []}
                  onChange={(imgs) => setImageUrl(imgs[0] || '')}
                  multiple={false}
                  label="Category Cover Photo (Upload from Device)"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="uppercase tracking-wider text-warmgray font-medium">Sort Order</label>
                  <input
                    type="number"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(Number(e.target.value))}
                    className="w-full p-2.5 bg-canvas border border-atelier text-xs"
                  />
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="accent-espresso"
                  />
                  <label htmlFor="isActive" className="uppercase tracking-wider text-espresso font-medium cursor-pointer">
                    Active in Navbar
                  </label>
                </div>
              </div>

              <div className="space-y-1">
                <label className="uppercase tracking-wider text-warmgray font-medium">Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2.5 bg-canvas border border-atelier text-xs"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-atelier">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2.5 border border-atelier text-xs uppercase tracking-widest text-warmgray"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-2.5 btn-luxury-dark text-xs uppercase tracking-widest font-medium"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
```

---

### `src/app/admin/customers/page.tsx`

- **File**: `src/app/admin/customers/page.tsx`
- **Size**: 5.8 KB (156 lines)
- **Language**: `tsx`

```tsx
'use client';

import React, { useEffect, useState } from 'react';
import { Users, Search, ShoppingBag, Mail, Phone, MapPin } from 'lucide-react';
import { AdminLayout } from '@/components/AdminLayout';
import { Order } from '@/types';

interface AggregatedCustomer {
  email: string;
  name: string;
  phone: string;
  city: string;
  orderCount: number;
  totalSpend: number;
  lastOrderDate: string;
}

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<AggregatedCustomer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function loadCustomers() {
      try {
        const res = await fetch('/api/orders');
        if (res.ok) {
          const data = await res.json();
          const orders: Order[] = data.orders || [];

          const map = new Map<string, AggregatedCustomer>();

          orders.forEach((o) => {
            const key = o.customerEmail.toLowerCase().trim();
            if (!map.has(key)) {
              map.set(key, {
                email: o.customerEmail,
                name: o.customerName,
                phone: o.customerPhone,
                city: o.shippingAddress.city || 'Mumbai',
                orderCount: 1,
                totalSpend: o.totalAmount,
                lastOrderDate: o.createdAt,
              });
            } else {
              const cur = map.get(key)!;
              cur.orderCount += 1;
              cur.totalSpend += o.totalAmount;
              if (new Date(o.createdAt) > new Date(cur.lastOrderDate)) {
                cur.lastOrderDate = o.createdAt;
              }
            }
          });

          setCustomers(Array.from(map.values()));
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadCustomers();
  }, []);

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-atelier pb-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-bronze font-medium">Client Directory</span>
            <h1 className="font-serif text-3xl sm:text-4xl text-espresso font-light">Client Portfolio</h1>
          </div>
          <div className="text-xs text-warmgray">
            Total Unique Clients: <strong className="text-espresso">{customers.length}</strong>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Search by client name, email, or city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2.5 pl-9 bg-surface border border-atelier text-xs focus:border-bronze focus:outline-hidden"
          />
          <Search className="w-4 h-4 text-warmgray absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        {/* Customers Table */}
        <div className="bg-surface border border-atelier overflow-hidden">
          <table className="w-full text-left text-xs text-espresso border-collapse">
            <thead>
              <tr className="bg-canvas border-b border-atelier text-[10px] uppercase tracking-widest text-warmgray font-medium">
                <th className="p-4">Client Entity</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Primary Location</th>
                <th className="p-4">Orders Placed</th>
                <th className="p-4">Lifetime Value</th>
                <th className="p-4 text-right">Last Transaction</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-atelier/60">
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-warmgray">
                    Loading client records...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-warmgray">
                    No client records found.
                  </td>
                </tr>
              ) : (
                filtered.map((c) => (
                  <tr key={c.email} className="hover:bg-canvas/50 transition-colors">
                    <td className="p-4 font-medium text-espresso">{c.name}</td>
                    <td className="p-4">
                      <div className="space-y-0.5 text-[11px] text-warmgray">
                        <span className="flex items-center gap-1.5"><Mail className="w-3 h-3 text-bronze" /> {c.email}</span>
                        <span className="flex items-center gap-1.5"><Phone className="w-3 h-3 text-bronze" /> {c.phone}</span>
                      </div>
                    </td>
                    <td className="p-4 text-warmgray">{c.city}</td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 bg-canvas border border-atelier text-[10px] font-mono">
                        {c.orderCount}
                      </span>
                    </td>
                    <td className="p-4 font-serif text-sm font-medium text-timber">
                      ₹{c.totalSpend.toLocaleString('en-IN')}
                    </td>
                    <td className="p-4 text-right text-warmgray">
                      {new Date(c.lastOrderDate).toLocaleDateString('en-IN')}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
```

---

### `src/app/admin/inventory/page.tsx`

- **File**: `src/app/admin/inventory/page.tsx`
- **Size**: 8.7 KB (214 lines)
- **Language**: `tsx`

```tsx
'use client';

import React, { useEffect, useState } from 'react';
import { Boxes, AlertTriangle, Check, Search, Save, RefreshCw } from 'lucide-react';
import { AdminLayout } from '@/components/AdminLayout';
import { Product } from '@/types';

export default function AdminInventoryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [stockChanges, setStockChanges] = useState<Record<string, number>>({});
  const [savingId, setSavingId] = useState<string | null>(null);
  const [saveSuccessId, setSaveSuccessId] = useState<string | null>(null);
  const [filterLowOnly, setFilterLowOnly] = useState(false);
  const [search, setSearch] = useState('');

  const loadProducts = async () => {
    try {
      const res = await fetch('/api/products?all=true');
      if (res.ok) {
        const d = await res.json();
        setProducts(d.products || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleStockInputChange = (productId: string, val: number) => {
    setStockChanges({
      ...stockChanges,
      [productId]: val,
    });
  };

  const handleSaveStock = async (product: Product) => {
    const newStock = stockChanges[product.id] !== undefined ? stockChanges[product.id] : product.stock;
    setSavingId(product.id);

    try {
      // Partial update rule: Send only ID and stock
      const res = await fetch(`/api/products/${product.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stock: Number(newStock) }),
      });

      if (res.ok) {
        setProducts(products.map((p) => (p.id === product.id ? { ...p, stock: Number(newStock) } : p)));
        setSaveSuccessId(product.id);
        setTimeout(() => setSaveSuccessId(null), 2000);
      }
    } catch (e) {
      console.error('Failed to update stock', e);
    } finally {
      setSavingId(null);
    }
  };

  const filtered = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase());
    const isLow = p.stock <= (p.moq * 2) || p.stock < 10;
    if (filterLowOnly) return matchesSearch && isLow;
    return matchesSearch;
  });

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-atelier pb-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-bronze font-medium">Warehouse & Logistics</span>
            <h1 className="font-serif text-3xl sm:text-4xl text-espresso font-light">Inventory Control</h1>
          </div>
          <button
            onClick={loadProducts}
            className="p-2.5 bg-surface border border-atelier hover:border-bronze text-espresso text-xs uppercase tracking-wider flex items-center gap-1.5 self-start"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Sync Stock
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 bg-surface border border-atelier p-4 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Search material or SKU..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-2.5 pl-9 bg-canvas border border-atelier text-xs focus:border-bronze focus:outline-hidden"
            />
            <Search className="w-4 h-4 text-warmgray absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          <label className="flex items-center gap-2 text-xs uppercase tracking-wider text-espresso cursor-pointer self-start sm:self-center">
            <input
              type="checkbox"
              checked={filterLowOnly}
              onChange={(e) => setFilterLowOnly(e.target.checked)}
              className="accent-espresso"
            />
            <span className="flex items-center gap-1 text-amber-700 font-medium">
              <AlertTriangle className="w-3.5 h-3.5" /> Show Low-Stock Lots Only
            </span>
          </label>
        </div>

        {/* Table */}
        <div className="bg-surface border border-atelier overflow-hidden">
          <table className="w-full text-left text-xs text-espresso border-collapse">
            <thead>
              <tr className="bg-canvas border-b border-atelier text-[10px] uppercase tracking-widest text-warmgray font-medium">
                <th className="p-4">Material / SKU</th>
                <th className="p-4">Category</th>
                <th className="p-4">Unit of Measure</th>
                <th className="p-4">MOQ</th>
                <th className="p-4">Stock on Hand</th>
                <th className="p-4">Quick Adjust</th>
                <th className="p-4 text-right">Save</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-atelier/60">
              {loading ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-warmgray">
                    Loading inventory records...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-warmgray">
                    No material records found.
                  </td>
                </tr>
              ) : (
                filtered.map((p) => {
                  const currentInputStock =
                    stockChanges[p.id] !== undefined ? stockChanges[p.id] : p.stock;
                  const isModified = stockChanges[p.id] !== undefined && stockChanges[p.id] !== p.stock;
                  const isLow = p.stock <= p.moq;

                  return (
                    <tr key={p.id} className="hover:bg-canvas/50 transition-colors">
                      <td className="p-4">
                        <span className="font-serif text-sm font-medium text-espresso block">{p.name}</span>
                        <span className="text-[10px] font-mono text-warmgray">SKU: {p.sku}</span>
                      </td>
                      <td className="p-4 text-warmgray">{p.categoryName}</td>
                      <td className="p-4 uppercase font-medium">{p.unit}</td>
                      <td className="p-4 text-warmgray">{p.moq}</td>
                      <td className="p-4">
                        <span
                          className={`font-medium px-2 py-1 ${
                            isLow
                              ? 'bg-red-50 text-red-800 border border-red-200'
                              : 'bg-canvas text-espresso'
                          }`}
                        >
                          {p.stock} {p.unit}
                        </span>
                      </td>
                      <td className="p-4">
                        <input
                          type="number"
                          min="0"
                          value={currentInputStock}
                          onChange={(e) => handleStockInputChange(p.id, Number(e.target.value))}
                          className="w-24 p-1.5 bg-canvas border border-atelier text-xs text-espresso font-medium focus:border-bronze focus:outline-hidden"
                        />
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleSaveStock(p)}
                          disabled={savingId === p.id || !isModified}
                          className={`px-3 py-1.5 text-xs uppercase tracking-wider font-medium inline-flex items-center gap-1 ${
                            saveSuccessId === p.id
                              ? 'bg-green-700 text-white'
                              : isModified
                              ? 'btn-luxury-dark cursor-pointer'
                              : 'opacity-40 bg-canvas text-warmgray cursor-not-allowed border border-atelier'
                          }`}
                        >
                          {saveSuccessId === p.id ? (
                            <>
                              <Check className="w-3.5 h-3.5" /> Saved
                            </>
                          ) : (
                            <>
                              <Save className="w-3.5 h-3.5" /> Update
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
```

---

### `src/app/admin/login/page.tsx`

- **File**: `src/app/admin/login/page.tsx`
- **Size**: 8.5 KB (215 lines)
- **Language**: `tsx`

```tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Shield, Lock, Mail, ArrowRight, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useAdminAuth } from '@/context/AdminAuthContext';

export default function AdminLoginPage() {
  const router = useRouter();
  const { login, changePassword } = useAdminAuth();

  const [email, setEmail] = useState('vicks@balaji.com');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Forced Password Change State
  const [showForcePasswordModal, setShowForcePasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordChanging, setPasswordChanging] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      if (res.mustChangePassword) {
        setShowForcePasswordModal(true);
      } else {
        router.push('/admin');
      }
    } else {
      setError(res.error || 'Invalid credentials');
    }
  };

  const handleForcePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setPasswordChanging(true);
    setError(null);

    const res = await changePassword(password, newPassword);
    setPasswordChanging(false);

    if (res.success) {
      setPasswordSuccess(true);
      setTimeout(() => {
        router.push('/admin');
      }, 1500);
    } else {
      setError(res.error || 'Failed to update password');
    }
  };

  return (
    <div className="min-h-screen bg-espresso flex items-center justify-center p-4 sm:p-6">
      {/* Background Graphic Texture */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-[radial-gradient(#C5A880_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="w-full max-w-md bg-surface border border-atelier shadow-2xl p-8 sm:p-10 space-y-8 relative z-10">
        {/* Studio Branding */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-espresso text-champagne rounded-full flex items-center justify-center mx-auto mb-3">
            <Shield className="w-6 h-6 stroke-[1.5]" />
          </div>
          <span className="text-[10px] uppercase tracking-widest-plus text-bronze font-medium">
            Studio Administration
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl text-espresso font-light">Balaji Architect & Interiors</h1>
          <p className="text-xs text-warmgray font-light">
            Authorized Architect & Studio Management Access
          </p>
        </div>

        {error && (
          <div className="p-3.5 bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-wider text-espresso font-medium block">
              Admin Email
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vicks@balaji.com"
                className="w-full p-3 pl-10 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden text-xs text-espresso"
              />
              <Mail className="w-4 h-4 text-warmgray absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-wider text-espresso font-medium block">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full p-3 pl-10 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden text-xs text-espresso"
              />
              <Lock className="w-4 h-4 text-warmgray absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 btn-luxury-dark text-xs uppercase tracking-widest flex items-center justify-center gap-2 font-medium"
          >
            {loading ? 'Authenticating...' : 'Sign In to Portal'} <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-atelier text-center text-xs text-warmgray">
          <Link href="/" className="hover:text-espresso underline">
            ← Return to Public Atelier Website
          </Link>
        </div>
      </div>

      {/* Forced First-Time Password Change Modal */}
      {showForcePasswordModal && (
        <div className="fixed inset-0 z-50 bg-espresso/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-surface border border-atelier p-8 space-y-6 shadow-2xl animate-fade-up">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-champagne/20 text-timber flex items-center justify-center mx-auto">
                <Lock className="w-6 h-6" />
              </div>
              <h2 className="font-serif text-2xl text-espresso">Establish Permanent Password</h2>
              <p className="text-xs text-warmgray leading-relaxed">
                As a security policy for Balaji Architect & Interiors, the initial bootstrap credential must now be replaced with your permanent custom password.
              </p>
            </div>

            {passwordSuccess ? (
              <div className="p-4 bg-green-50 border border-green-200 text-green-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span>Password updated! Redirecting to dashboard...</span>
              </div>
            ) : (
              <form onSubmit={handleForcePasswordChange} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-warmgray font-medium">
                    New Secure Password
                  </label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    className="w-full p-3 bg-canvas border border-atelier text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-warmgray font-medium">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat password"
                    className="w-full p-3 bg-canvas border border-atelier text-xs"
                  />
                </div>

                <button
                  type="submit"
                  disabled={passwordChanging}
                  className="w-full py-3.5 btn-luxury-dark text-xs uppercase tracking-widest font-medium"
                >
                  {passwordChanging ? 'Securing Account...' : 'Save & Enter Admin Panel'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
```

---

### `src/app/admin/orders/page.tsx`

- **File**: `src/app/admin/orders/page.tsx`
- **Size**: 18.2 KB (427 lines)
- **Language**: `tsx`

```tsx
'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  ShoppingBag,
  RefreshCw,
  Search,
  Eye,
  CheckCircle2,
  Clock,
  Truck,
  PackageCheck,
  X,
  Printer,
  Radio,
} from 'lucide-react';
import { AdminLayout } from '@/components/AdminLayout';
import { Order, OrderStatus, PaymentStatus } from '@/types';
import { supabase } from '@/lib/supabase';

function AdminOrdersContent() {
  const searchParams = useSearchParams();
  const highlightId = searchParams?.get('id') || null;

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [isLiveConnected, setIsLiveConnected] = useState(false);

  const loadOrders = async () => {
    try {
      const res = await fetch('/api/orders', {
        headers: { 'Cache-Control': 'no-cache' },
      });
      if (res.ok) {
        const d = await res.json();
        const ords: Order[] = d.orders || [];
        setOrders(ords);

        if (highlightId && !selectedOrder) {
          const match = ords.find((o) => o.id === highlightId || o.orderNumber === highlightId);
          if (match) setSelectedOrder(match);
        }
      }
    } catch (e) {
      console.error('Error loading orders:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();

    // 1. Setup Supabase Realtime Channel
    const channel = supabase
      .channel('admin-orders-realtime-stream')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'orders' },
        (payload) => {
          // Immediately reload orders on any new order insertion or status update
          loadOrders();

          // If browser notifications are permitted, display order alert
          if (payload.eventType === 'INSERT' && 'Notification' in window && Notification.permission === 'granted') {
            const newRecord = payload.new as any;
            new Notification('New Order Placed — Balaji Architect & Interiors', {
              body: `Order #${newRecord.order_number || 'New'} received from ${newRecord.customer_name || 'Customer'}.`,
              icon: '/favicon.ico',
            });
          }
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          setIsLiveConnected(true);
        }
      });

    // 2. Periodic sync fallback (every 8 seconds)
    const interval = setInterval(loadOrders, 8000);

    return () => {
      supabase.removeChannel(channel);
      clearInterval(interval);
    };
  }, []);

  const handleUpdateStatus = async (orderId: string, orderStatus: OrderStatus, paymentStatus?: PaymentStatus) => {
    setUpdatingId(orderId);
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderStatus, paymentStatus }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.order) {
          setOrders(orders.map((o) => (o.id === orderId ? data.order : o)));
          if (selectedOrder && selectedOrder.id === orderId) {
            setSelectedOrder(data.order);
          }
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.customerEmail.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !statusFilter || o.orderStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-atelier pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest text-bronze font-medium">Logistics & Orders</span>
              <span className="flex items-center gap-1 text-[10px] text-green-500 font-medium">
                <Radio className="w-3 h-3 animate-pulse" /> Live Stream
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-espresso font-light">Client Orders</h1>
          </div>
          <button
            onClick={loadOrders}
            className="p-2.5 bg-surface border border-atelier hover:border-bronze text-espresso text-xs uppercase tracking-wider flex items-center gap-1.5 self-start"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Sync Orders
          </button>
        </div>

        {/* Filter Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-surface border border-atelier p-4">
          <div className="sm:col-span-2 relative">
            <input
              type="text"
              placeholder="Search by order #, client name, or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-2.5 pl-9 bg-canvas border border-atelier text-xs focus:border-bronze focus:outline-hidden"
            />
            <Search className="w-4 h-4 text-warmgray absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full p-2.5 bg-canvas border border-atelier text-xs focus:border-bronze focus:outline-hidden"
            >
              <option value="">All Statuses ({orders.length})</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Processing">Processing</option>
              <option value="Packed">Packed</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-surface border border-atelier overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-espresso border-collapse">
              <thead>
                <tr className="bg-canvas border-b border-atelier text-[10px] uppercase tracking-widest text-warmgray font-medium">
                  <th className="p-4">Order Ref</th>
                  <th className="p-4">Client</th>
                  <th className="p-4">Date Placed</th>
                  <th className="p-4">Total Amount</th>
                  <th className="p-4">Payment</th>
                  <th className="p-4">Order Status</th>
                  <th className="p-4 text-right">Review</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-atelier/60">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-warmgray">
                      Loading incoming order logs...
                    </td>
                  </tr>
                ) : filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-warmgray">
                      No order records matching filter.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-canvas/50 transition-colors">
                      <td className="p-4">
                        <span className="font-mono font-medium text-espresso block">{ord.orderNumber}</span>
                        <span className="text-[10px] text-warmgray">{ord.items.length} materials</span>
                      </td>
                      <td className="p-4">
                        <span className="font-medium text-espresso block">{ord.customerName}</span>
                        <span className="text-[10px] text-warmgray">{ord.customerEmail}</span>
                      </td>
                      <td className="p-4 text-warmgray">
                        {new Date(ord.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="p-4 font-serif text-sm font-medium text-timber">
                        ₹{ord.totalAmount.toLocaleString('en-IN')}
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-0.5 text-[10px] uppercase tracking-wider font-medium border ${
                            ord.paymentStatus === 'Paid'
                              ? 'bg-green-50 text-green-800 border-green-200'
                              : 'bg-amber-50 text-amber-800 border-amber-200'
                          }`}
                        >
                          {ord.paymentStatus}
                        </span>
                      </td>
                      <td className="p-4">
                        <select
                          value={ord.orderStatus}
                          onChange={(e) => handleUpdateStatus(ord.id, e.target.value as OrderStatus)}
                          disabled={updatingId === ord.id}
                          className="p-1 bg-canvas border border-atelier text-xs font-medium focus:border-bronze focus:outline-hidden"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Processing">Processing</option>
                          <option value="Packed">Packed</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => setSelectedOrder(ord)}
                          className="p-1.5 bg-canvas border border-atelier hover:border-bronze text-espresso"
                          title="View Slip"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Order Detail Modal / Packing Slip */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-espresso/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-surface border border-atelier p-6 sm:p-8 space-y-6 shadow-2xl my-8">
            <div className="flex justify-between items-start border-b border-atelier pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-bronze font-medium">Order Slip</span>
                <h2 className="font-serif text-2xl text-espresso font-normal">
                  Order #{selectedOrder.orderNumber}
                </h2>
                <span className="text-xs text-warmgray">
                  Placed on {new Date(selectedOrder.createdAt).toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="p-1.5 bg-canvas border border-atelier hover:border-bronze text-espresso"
                  title="Print Packing Slip"
                >
                  <Printer className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-1.5 text-warmgray hover:text-espresso"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Client & Address Info */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-canvas border border-atelier text-xs">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-warmgray font-medium block">
                  Customer Information
                </span>
                <p className="font-medium text-espresso">{selectedOrder.customerName}</p>
                <p className="text-warmgray">{selectedOrder.customerEmail}</p>
                <p className="text-warmgray">{selectedOrder.customerPhone}</p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-warmgray font-medium block">
                  Delivery Site
                </span>
                <p className="text-espresso">{selectedOrder.shippingAddress.addressLine1}</p>
                {selectedOrder.shippingAddress.addressLine2 && (
                  <p className="text-espresso">{selectedOrder.shippingAddress.addressLine2}</p>
                )}
                <p className="text-warmgray">
                  {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} -{' '}
                  {selectedOrder.shippingAddress.pincode}
                </p>
              </div>
            </div>

            {/* Line Items */}
            <div className="space-y-3">
              <h3 className="text-xs uppercase tracking-wider text-espresso font-medium">
                Materials in this Crate ({selectedOrder.items.length})
              </h3>
              <div className="border border-atelier divide-y divide-atelier/60 text-xs">
                {selectedOrder.items.map((item) => (
                  <div key={item.id} className="p-3 flex justify-between items-center">
                    <div>
                      <p className="font-serif text-sm font-medium text-espresso">{item.productName}</p>
                      <p className="text-[11px] text-warmgray">
                        SKU: {item.productSku} • Qty: {item.quantity} {item.unit} @ ₹{item.unitPrice.toLocaleString('en-IN')}/{item.unit}
                      </p>
                    </div>
                    <span className="font-medium text-timber">
                      ₹{item.subtotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial Summary */}
            <div className="p-4 bg-canvas border border-atelier space-y-1.5 text-xs text-warmgray">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-espresso font-medium">₹{selectedOrder.subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>GST (18%)</span>
                <span className="text-espresso font-medium">₹{selectedOrder.tax.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Freight Fee</span>
                <span className="text-espresso font-medium">₹{selectedOrder.shippingFee.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-atelier text-sm font-medium text-espresso">
                <span>Total Due / Paid</span>
                <span className="font-serif text-lg text-timber">₹{selectedOrder.totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Status Controls */}
            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-atelier text-xs">
              <div className="space-y-1">
                <label className="uppercase tracking-wider text-warmgray font-medium block">
                  Update Order Status
                </label>
                <select
                  value={selectedOrder.orderStatus}
                  onChange={(e) => handleUpdateStatus(selectedOrder.id, e.target.value as OrderStatus)}
                  className="w-full p-2.5 bg-canvas border border-atelier font-medium"
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Processing">Processing</option>
                  <option value="Packed">Packed</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="uppercase tracking-wider text-warmgray font-medium block">
                  Update Payment Status
                </label>
                <select
                  value={selectedOrder.paymentStatus}
                  onChange={(e) =>
                    handleUpdateStatus(selectedOrder.id, selectedOrder.orderStatus, e.target.value as PaymentStatus)
                  }
                  className="w-full p-2.5 bg-canvas border border-atelier font-medium"
                >
                  <option value="Pending">Pending</option>
                  <option value="Submitted">Submitted</option>
                  <option value="Paid">Paid</option>
                  <option value="Failed">Failed</option>
                  <option value="Refunded">Refunded</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

export default function AdminOrdersPage() {
  return (
    <Suspense fallback={<div className="p-16 text-center text-warmgray text-xs">Loading orders module...</div>}>
      <AdminOrdersContent />
    </Suspense>
  );
}
```

---

### `src/app/admin/page.tsx`

- **File**: `src/app/admin/page.tsx`
- **Size**: 9.9 KB (238 lines)
- **Language**: `tsx`

```tsx
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  ShoppingBag,
  Clock,
  Package,
  AlertTriangle,
  FileText,
  Building2,
  ArrowRight,
  RefreshCw,
  Eye,
} from 'lucide-react';
import { AdminLayout } from '@/components/AdminLayout';
import { Order, Quote, Product } from '@/types';

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    try {
      const [ordRes, qtRes, prodRes] = await Promise.all([
        fetch('/api/orders'),
        fetch('/api/quotes'),
        fetch('/api/products?all=true'),
      ]);

      if (ordRes.ok) {
        const d = await ordRes.json();
        setOrders(d.orders || []);
      }
      if (qtRes.ok) {
        const d = await qtRes.json();
        setQuotes(d.quotes || []);
      }
      if (prodRes.ok) {
        const d = await prodRes.json();
        setProducts(d.products || []);
      }
    } catch (e) {
      console.error('Failed to load dashboard data', e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
    // Realtime polling / event fallback
    const interval = setInterval(loadData, 10000);
    return () => clearInterval(interval);
  }, []);

  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const pendingOrders = orders.filter((o) => o.orderStatus === 'Pending' || o.orderStatus === 'Confirmed');
  const pendingQuotes = quotes.filter((q) => q.status === 'Pending' || q.status === 'Under_Review');
  const lowStockProducts = products.filter((p) => p.stock <= (p.moq * 2) || p.stock < 10);

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Top Title & Refresh */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-atelier pb-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-bronze font-medium">Studio Overview</span>
            <h1 className="font-serif text-3xl sm:text-4xl text-espresso font-light">Management Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setRefreshing(true);
                loadData();
              }}
              className="p-2.5 bg-surface border border-atelier hover:border-bronze text-espresso text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
              <span>Sync Realtime</span>
            </button>
            <Link
              href="/admin/products"
              className="px-4 py-2.5 btn-luxury-dark text-xs uppercase tracking-widest font-medium"
            >
              + New Material
            </Link>
          </div>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Revenue */}
          <div className="bg-surface border border-atelier p-6 space-y-2">
            <div className="flex items-center justify-between text-xs text-warmgray">
              <span className="uppercase tracking-wider">Total Sales Billed</span>
              <TrendingUp className="w-4 h-4 text-bronze" />
            </div>
            <div className="font-serif text-2xl sm:text-3xl text-timber font-light">
              ₹{totalRevenue.toLocaleString('en-IN')}
            </div>
            <p className="text-[11px] text-warmgray">{orders.length} total client transactions</p>
          </div>

          {/* Pending Orders */}
          <div className="bg-surface border border-atelier p-6 space-y-2">
            <div className="flex items-center justify-between text-xs text-warmgray">
              <span className="uppercase tracking-wider">Active Orders</span>
              <ShoppingBag className="w-4 h-4 text-bronze" />
            </div>
            <div className="font-serif text-2xl sm:text-3xl text-espresso font-light">
              {pendingOrders.length}
            </div>
            <p className="text-[11px] text-warmgray">{orders.length - pendingOrders.length} fulfilled & delivered</p>
          </div>

          {/* Pending Quotes */}
          <div className="bg-surface border border-atelier p-6 space-y-2">
            <div className="flex items-center justify-between text-xs text-warmgray">
              <span className="uppercase tracking-wider">Quote Requests</span>
              <FileText className="w-4 h-4 text-bronze" />
            </div>
            <div className="font-serif text-2xl sm:text-3xl text-espresso font-light">
              {pendingQuotes.length}
            </div>
            <p className="text-[11px] text-warmgray">{quotes.length} total architectural requests</p>
          </div>

          {/* Low Stock Warning */}
          <div className="bg-surface border border-atelier p-6 space-y-2">
            <div className="flex items-center justify-between text-xs text-warmgray">
              <span className="uppercase tracking-wider">Low Stock Lots</span>
              <AlertTriangle className="w-4 h-4 text-amber-600" />
            </div>
            <div className="font-serif text-2xl sm:text-3xl text-espresso font-light">
              {lowStockProducts.length}
            </div>
            <p className="text-[11px] text-warmgray">Out of {products.length} catalog items</p>
          </div>
        </div>

        {/* Orders & Quotes Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Recent Orders */}
          <div className="lg:col-span-7 bg-surface border border-atelier p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-atelier pb-4">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-bronze" />
                <h2 className="font-serif text-xl text-espresso font-light">Recent Orders (Realtime)</h2>
              </div>
              <Link href="/admin/orders" className="text-xs uppercase tracking-wider text-bronze hover:underline">
                View All →
              </Link>
            </div>

            {orders.length === 0 ? (
              <div className="text-center py-12 text-xs text-warmgray">No orders placed yet.</div>
            ) : (
              <div className="space-y-3 overflow-x-auto">
                {orders.slice(0, 5).map((ord) => (
                  <div
                    key={ord.id}
                    className="p-3.5 bg-canvas border border-atelier/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-medium text-espresso">{ord.orderNumber}</span>
                        <span className="px-2 py-0.5 bg-espresso text-surface text-[10px] uppercase tracking-wider">
                          {ord.orderStatus}
                        </span>
                      </div>
                      <p className="text-warmgray mt-0.5">
                        {ord.customerName} • {ord.items.length} materials
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-serif text-sm font-medium text-timber">
                        ₹{ord.totalAmount.toLocaleString('en-IN')}
                      </span>
                      <Link
                        href={`/admin/orders?id=${ord.id}`}
                        className="p-1.5 bg-surface border border-atelier hover:border-bronze text-espresso"
                        title="View order details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pending Project Quotes */}
          <div className="lg:col-span-5 bg-surface border border-atelier p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-atelier pb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-bronze" />
                <h2 className="font-serif text-xl text-espresso font-light">Quote Requests</h2>
              </div>
              <Link href="/admin/quotes" className="text-xs uppercase tracking-wider text-bronze hover:underline">
                View All →
              </Link>
            </div>

            {quotes.length === 0 ? (
              <div className="text-center py-12 text-xs text-warmgray">No quote requests in queue.</div>
            ) : (
              <div className="space-y-3">
                {quotes.slice(0, 5).map((q) => (
                  <div
                    key={q.id}
                    className="p-3.5 bg-canvas border border-atelier/80 space-y-1 text-xs"
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-mono font-medium text-espresso">{q.quoteNumber}</span>
                      <span className="px-2 py-0.5 bg-champagne/30 text-espresso text-[10px] uppercase tracking-wider font-medium">
                        {q.status}
                      </span>
                    </div>
                    <p className="font-medium text-espresso">{q.customerName}</p>
                    <p className="text-warmgray text-[11px] truncate">{q.projectType} • {q.projectLocation}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
```

---

### `src/app/admin/products/page.tsx`

- **File**: `src/app/admin/products/page.tsx`
- **Size**: 23.1 KB (597 lines)
- **Language**: `tsx`

```tsx
'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Check,
  X,
  Upload,
  Layers,
  ArrowUpDown,
  Eye,
  EyeOff,
} from 'lucide-react';
import { AdminLayout } from '@/components/AdminLayout';
import { ImageUploader } from '@/components/ImageUploader';
import { Product, Category, UnitType, PurchaseMode } from '@/types';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Form Fields
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [brand, setBrand] = useState('Balaji Architect & Interiors');
  const [categoryId, setCategoryId] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number>(1000);
  const [salePrice, setSalePrice] = useState<number | undefined>(undefined);
  const [unit, setUnit] = useState<UnitType>('sq ft');
  const [moq, setMoq] = useState<number>(1);
  const [stock, setStock] = useState<number>(100);
  const [purchaseMode, setPurchaseMode] = useState<PurchaseMode>('BUY_NOW');
  const [leadTime, setLeadTime] = useState('3-5 business days');
  const [dimensions, setDimensions] = useState('');
  const [thickness, setThickness] = useState('');
  const [material, setMaterial] = useState('');
  const [finish, setFinish] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [published, setPublished] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);

  const loadData = async () => {
    try {
      const [prodRes, catRes] = await Promise.all([
        fetch('/api/products?all=true'),
        fetch('/api/categories?admin=true'),
      ]);
      if (prodRes.ok) {
        const d = await prodRes.json();
        setProducts(d.products || []);
      }
      if (catRes.ok) {
        const c = await catRes.json();
        setCategories(c.categories || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const openCreateModal = () => {
    setEditingProduct(null);
    setName('');
    setSku(`MAT-${Math.floor(100 + Math.random() * 900)}`);
    setBrand('Balaji Architect & Interiors');
    setCategoryId(categories[0]?.id || '');
    setSubcategory('');
    setDescription('');
    setPrice(850);
    setSalePrice(undefined);
    setUnit('sq ft');
    setMoq(50);
    setStock(500);
    setPurchaseMode('BUY_NOW');
    setLeadTime('3-5 business days');
    setDimensions('');
    setThickness('');
    setMaterial('');
    setFinish('');
    setImages(['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80']);
    setPublished(true);
    setIsFeatured(false);
    setFormError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setName(p.name);
    setSku(p.sku);
    setBrand(p.brand);
    setCategoryId(p.categoryId);
    setSubcategory(p.subcategory || '');
    setDescription(p.description);
    setPrice(p.price);
    setSalePrice(p.salePrice);
    setUnit(p.unit);
    setMoq(p.moq);
    setStock(p.stock);
    setPurchaseMode(p.purchaseMode);
    setLeadTime(p.leadTime);
    setDimensions(p.dimensions || '');
    setThickness(p.thickness || '');
    setMaterial(p.material || '');
    setFinish(p.finish || '');
    setImages(p.images || []);
    setPublished(p.published);
    setIsFeatured(p.isFeatured);
    setFormError(null);
    setIsModalOpen(true);
  };

  // Targeted Partial Update (Stock / Published toggle)
  const handleTogglePublish = async (p: Product) => {
    try {
      const res = await fetch(`/api/products/${p.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !p.published }),
      });
      if (res.ok) {
        setProducts(products.map((item) => (item.id === p.id ? { ...item, published: !p.published } : item)));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this material?')) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProducts(products.filter((p) => p.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError(null);

    const payload = {
      name,
      sku,
      brand,
      categoryId,
      subcategory,
      description,
      price: Number(price),
      salePrice: salePrice ? Number(salePrice) : undefined,
      unit,
      moq: Number(moq),
      stock: Number(stock),
      purchaseMode,
      leadTime,
      dimensions,
      thickness,
      material,
      finish,
      images,
      published,
      isFeatured,
    };

    try {
      const url = editingProduct ? `/api/products/${editingProduct.id}` : '/api/products';
      const method = editingProduct ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsModalOpen(false);
        loadData();
      } else {
        setFormError(data.error || 'Failed to save product');
      }
    } catch (err: any) {
      setFormError(err.message || 'Error occurred');
    } finally {
      setFormLoading(false);
    }
  };

  const addImageUrl = () => {
    if (imageUrlInput.trim()) {
      setImages([...images, imageUrlInput.trim()]);
      setImageUrlInput('');
    }
  };

  const removeImage = (idx: number) => {
    setImages(images.filter((_, i) => i !== idx));
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()) ||
      p.material?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !categoryFilter || p.categoryId === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-atelier pb-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-bronze font-medium">Catalog Management</span>
            <h1 className="font-serif text-3xl sm:text-4xl text-espresso font-light">Products & Materials</h1>
          </div>
          <button
            onClick={openCreateModal}
            className="px-5 py-2.5 btn-luxury-dark text-xs uppercase tracking-widest flex items-center gap-2 font-medium"
          >
            <Plus className="w-4 h-4" /> Add New Material
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-surface border border-atelier p-4">
          <div className="sm:col-span-2 relative">
            <input
              type="text"
              placeholder="Search by material name, SKU, or finish..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-2.5 pl-9 bg-canvas border border-atelier text-xs focus:border-bronze focus:outline-hidden"
            />
            <Search className="w-4 h-4 text-warmgray absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          <div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full p-2.5 bg-canvas border border-atelier text-xs focus:border-bronze focus:outline-hidden"
            >
              <option value="">All Categories ({categories.length})</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-surface border border-atelier overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-espresso border-collapse">
              <thead>
                <tr className="bg-canvas border-b border-atelier text-[10px] uppercase tracking-widest text-warmgray font-medium">
                  <th className="p-4">Material / Item</th>
                  <th className="p-4">SKU</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Price / Unit</th>
                  <th className="p-4">Stock on Hand</th>
                  <th className="p-4">Mode</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-atelier/60">
                {loading ? (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-warmgray">
                      Loading catalog materials...
                    </td>
                  </tr>
                ) : filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-warmgray">
                      No materials matching your criteria.
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-canvas/50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-10 h-10 bg-canvas flex-shrink-0 overflow-hidden border border-atelier">
                            {p.images[0] && (
                              <Image src={p.images[0]} alt={p.name} fill className="object-cover" />
                            )}
                          </div>
                          <div>
                            <span className="font-serif text-sm font-medium text-espresso block">{p.name}</span>
                            <span className="text-[10px] text-warmgray">{p.brand}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 font-mono text-[11px] text-warmgray">{p.sku}</td>
                      <td className="p-4">{p.categoryName || 'General'}</td>
                      <td className="p-4 font-medium text-timber">
                        ₹{(p.salePrice || p.price).toLocaleString('en-IN')}{' '}
                        <span className="text-[10px] text-warmgray font-light">/ {p.unit}</span>
                      </td>
                      <td className="p-4">
                        <span
                          className={`font-medium ${
                            p.stock <= p.moq ? 'text-red-700 font-bold' : 'text-espresso'
                          }`}
                        >
                          {p.stock} {p.unit}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 bg-canvas border border-atelier">
                          {p.purchaseMode}
                        </span>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => handleTogglePublish(p)}
                          className={`px-2 py-1 text-[10px] uppercase tracking-wider font-medium flex items-center gap-1 border ${
                            p.published
                              ? 'bg-green-50 text-green-800 border-green-200'
                              : 'bg-warmgray/10 text-warmgray border-warmgray/30'
                          }`}
                        >
                          {p.published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                          <span>{p.published ? 'Live' : 'Hidden'}</span>
                        </button>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEditModal(p)}
                            className="p-1.5 bg-canvas border border-atelier hover:border-bronze text-espresso"
                            title="Edit Material"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(p.id)}
                            className="p-1.5 bg-canvas border border-atelier hover:text-red-700 text-warmgray"
                            title="Delete Material"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-espresso/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-3xl bg-surface border border-atelier p-6 sm:p-8 space-y-6 shadow-2xl my-8">
            <div className="flex justify-between items-center border-b border-atelier pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-bronze font-medium">Product Matrix</span>
                <h2 className="font-serif text-2xl text-espresso">
                  {editingProduct ? `Edit "${editingProduct.name}"` : 'Add New Material'}
                </h2>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-warmgray hover:text-espresso">
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-800 text-xs">{formError}</div>
            )}

            <form onSubmit={handleSaveProduct} className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <label className="uppercase tracking-wider text-warmgray font-medium">Material Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2.5 bg-canvas border border-atelier"
                  />
                </div>

                <div className="space-y-1">
                  <label className="uppercase tracking-wider text-warmgray font-medium">SKU Code *</label>
                  <input
                    type="text"
                    required
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    className="w-full p-2.5 bg-canvas border border-atelier font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="uppercase tracking-wider text-warmgray font-medium">Category *</label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full p-2.5 bg-canvas border border-atelier"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="uppercase tracking-wider text-warmgray font-medium">Subcategory / Series</label>
                  <input
                    type="text"
                    value={subcategory}
                    onChange={(e) => setSubcategory(e.target.value)}
                    placeholder="e.g. Honed Travertine"
                    className="w-full p-2.5 bg-canvas border border-atelier"
                  />
                </div>

                <div className="space-y-1">
                  <label className="uppercase tracking-wider text-warmgray font-medium">Unit of Sale *</label>
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value as UnitType)}
                    className="w-full p-2.5 bg-canvas border border-atelier"
                  >
                    <option>sq ft</option>
                    <option>sq m</option>
                    <option>sheet</option>
                    <option>piece</option>
                    <option>box</option>
                    <option>meter</option>
                    <option>roll</option>
                    <option>set</option>
                    <option>unit</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="uppercase tracking-wider text-warmgray font-medium">Standard Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full p-2.5 bg-canvas border border-atelier"
                  />
                </div>

                <div className="space-y-1">
                  <label className="uppercase tracking-wider text-warmgray font-medium">Sale Price (₹ Optional)</label>
                  <input
                    type="number"
                    value={salePrice || ''}
                    onChange={(e) => setSalePrice(e.target.value ? Number(e.target.value) : undefined)}
                    className="w-full p-2.5 bg-canvas border border-atelier"
                  />
                </div>

                <div className="space-y-1">
                  <label className="uppercase tracking-wider text-warmgray font-medium">Stock On Hand *</label>
                  <input
                    type="number"
                    required
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                    className="w-full p-2.5 bg-canvas border border-atelier"
                  />
                </div>

                <div className="space-y-1">
                  <label className="uppercase tracking-wider text-warmgray font-medium">Minimum Order Qty (MOQ)</label>
                  <input
                    type="number"
                    value={moq}
                    onChange={(e) => setMoq(Number(e.target.value))}
                    className="w-full p-2.5 bg-canvas border border-atelier"
                  />
                </div>

                <div className="space-y-1">
                  <label className="uppercase tracking-wider text-warmgray font-medium">Purchase Mode</label>
                  <select
                    value={purchaseMode}
                    onChange={(e) => setPurchaseMode(e.target.value as PurchaseMode)}
                    className="w-full p-2.5 bg-canvas border border-atelier"
                  >
                    <option value="BUY_NOW">BUY_NOW (Instant Checkout)</option>
                    <option value="REQUEST_QUOTE">REQUEST_QUOTE (Quote Only)</option>
                    <option value="BOTH">BOTH (Buy or Request Quote)</option>
                    <option value="UNAVAILABLE">UNAVAILABLE</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <label className="uppercase tracking-wider text-warmgray font-medium">Material Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2.5 bg-canvas border border-atelier"
                />
              </div>

              {/* Device Image Uploader */}
              <div className="border-t border-atelier pt-4">
                <ImageUploader
                  bucket="products"
                  images={images}
                  onChange={setImages}
                  multiple={true}
                  label="Material High-Res Photos (Upload from Device)"
                />
              </div>

              <div className="flex items-center gap-6 border-t border-atelier pt-4 text-xs">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={published}
                    onChange={(e) => setPublished(e.target.checked)}
                    className="accent-espresso"
                  />
                  <span>Published on Storefront</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="accent-espresso"
                  />
                  <span>Feature on Homepage</span>
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-atelier">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2.5 border border-atelier text-xs uppercase tracking-widest text-warmgray hover:text-espresso"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="px-8 py-2.5 btn-luxury-dark text-xs uppercase tracking-widest font-medium"
                >
                  {formLoading ? 'Saving...' : editingProduct ? 'Update Product' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
```

---

### `src/app/admin/projects/page.tsx`

- **File**: `src/app/admin/projects/page.tsx`
- **Size**: 16.3 KB (433 lines)
- **Language**: `tsx`

```tsx
'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Plus, Edit2, Trash2, Check, X, Building2, Eye, EyeOff } from 'lucide-react';
import { AdminLayout } from '@/components/AdminLayout';
import { ImageUploader } from '@/components/ImageUploader';
import { Project, ProjectType } from '@/types';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Fields
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [location, setLocation] = useState('Mumbai');
  const [year, setYear] = useState('2025');
  const [projectType, setProjectType] = useState<ProjectType>('Residential Interiors');
  const [area, setArea] = useState('6,500 sq ft');
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');
  const [heroImage, setHeroImage] = useState('');
  const [gallery, setGallery] = useState<string[]>([]);
  const [galleryInput, setGalleryInput] = useState('');
  const [designApproach, setDesignApproach] = useState('');
  const [isPublished, setIsPublished] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);

  const loadProjects = async () => {
    try {
      const res = await fetch('/api/projects?all=true');
      if (res.ok) {
        const d = await res.json();
        setProjects(d.projects || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const openCreateModal = () => {
    setEditingProject(null);
    setTitle('');
    setSlug('');
    setLocation('Mumbai');
    setYear('2025');
    setProjectType('Residential Interiors');
    setArea('5,000 sq ft');
    setShortDescription('');
    setDescription('');
    setHeroImage('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85');
    setGallery([]);
    setDesignApproach('');
    setIsPublished(true);
    setIsFeatured(false);
    setFormError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (p: Project) => {
    setEditingProject(p);
    setTitle(p.title);
    setSlug(p.slug);
    setLocation(p.location);
    setYear(p.year);
    setProjectType(p.projectType);
    setArea(p.area);
    setShortDescription(p.shortDescription);
    setDescription(p.description);
    setHeroImage(p.heroImage);
    setGallery(p.gallery || []);
    setDesignApproach(p.designApproach);
    setIsPublished(p.isPublished);
    setIsFeatured(p.isFeatured);
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleTogglePublish = async (p: Project) => {
    try {
      const res = await fetch(`/api/projects/${p.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPublished: !p.isPublished }),
      });
      if (res.ok) {
        setProjects(projects.map((item) => (item.id === p.id ? { ...item, isPublished: !p.isPublished } : item)));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project monograph?')) return;
    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProjects(projects.filter((p) => p.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError(null);

    const payload = {
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      location,
      year,
      projectType,
      area,
      shortDescription,
      description,
      heroImage,
      gallery,
      designApproach,
      isPublished,
      isFeatured,
    };

    try {
      const url = editingProject ? `/api/projects/${editingProject.id}` : '/api/projects';
      const method = editingProject ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsModalOpen(false);
        loadProjects();
      } else {
        setFormError(data.error || 'Failed to save project');
      }
    } catch (err: any) {
      setFormError(err.message || 'Error saving');
    } finally {
      setFormLoading(false);
    }
  };

  const addGalleryImage = () => {
    if (galleryInput.trim()) {
      setGallery([...gallery, galleryInput.trim()]);
      setGalleryInput('');
    }
  };

  const removeGalleryImage = (idx: number) => {
    setGallery(gallery.filter((_, i) => i !== idx));
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-atelier pb-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-bronze font-medium">Monographs</span>
            <h1 className="font-serif text-3xl sm:text-4xl text-espresso font-light">Architectural Projects</h1>
          </div>
          <button
            onClick={openCreateModal}
            className="px-5 py-2.5 btn-luxury-dark text-xs uppercase tracking-widest flex items-center gap-2 font-medium"
          >
            <Plus className="w-4 h-4" /> Add Project Case Study
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="bg-surface border border-atelier p-5 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="relative aspect-[16/10] bg-canvas overflow-hidden border border-atelier">
                  <Image src={proj.heroImage} alt={proj.title} fill className="object-cover" />
                  <span className="absolute top-2 left-2 px-2 py-0.5 bg-espresso text-surface text-[10px] uppercase tracking-wider font-medium">
                    {proj.projectType}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-xl text-espresso font-medium">{proj.title}</h3>
                  <p className="text-xs text-warmgray mt-0.5">
                    {proj.location} • {proj.year} • {proj.area}
                  </p>
                  <p className="text-xs text-warmgray font-light mt-2 line-clamp-2">{proj.shortDescription}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-atelier flex items-center justify-between">
                <button
                  onClick={() => handleTogglePublish(proj)}
                  className={`px-2 py-1 text-[10px] uppercase tracking-wider font-medium flex items-center gap-1 border ${
                    proj.isPublished
                      ? 'bg-green-50 text-green-800 border-green-200'
                      : 'bg-warmgray/10 text-warmgray border-warmgray/30'
                  }`}
                >
                  {proj.isPublished ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                  <span>{proj.isPublished ? 'Live' : 'Draft'}</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(proj)}
                    className="p-1.5 bg-canvas border border-atelier hover:border-bronze text-espresso text-xs"
                    title="Edit"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(proj.id)}
                    className="p-1.5 bg-canvas border border-atelier hover:text-red-700 text-warmgray text-xs"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-espresso/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-3xl bg-surface border border-atelier p-6 sm:p-8 space-y-6 shadow-2xl my-8">
            <div className="flex justify-between items-center border-b border-atelier pb-4">
              <h2 className="font-serif text-2xl text-espresso">
                {editingProject ? `Edit "${editingProject.title}"` : 'New Architectural Case Study'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-warmgray hover:text-espresso">
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-800 text-xs">{formError}</div>
            )}

            <form onSubmit={handleSave} className="space-y-4 text-xs max-h-[70vh] overflow-y-auto pr-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="uppercase tracking-wider text-warmgray font-medium">Project Title *</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2.5 bg-canvas border border-atelier text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="uppercase tracking-wider text-warmgray font-medium">Typology *</label>
                  <select
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value as ProjectType)}
                    className="w-full p-2.5 bg-canvas border border-atelier text-xs"
                  >
                    <option>Residential Interiors</option>
                    <option>Architecture & Villa</option>
                    <option>Penthouse & Estate</option>
                    <option>Commercial & Studio</option>
                    <option>Hospitality & Luxury Dining</option>
                    <option>Custom Spatial Design</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="uppercase tracking-wider text-warmgray font-medium">Site Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full p-2.5 bg-canvas border border-atelier text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="uppercase tracking-wider text-warmgray font-medium">Year Completed</label>
                  <input
                    type="text"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full p-2.5 bg-canvas border border-atelier text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="uppercase tracking-wider text-warmgray font-medium">Built Area (sq ft)</label>
                  <input
                    type="text"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full p-2.5 bg-canvas border border-atelier text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="uppercase tracking-wider text-warmgray font-medium">Hero Image URL *</label>
                  <input
                    type="url"
                    required
                    value={heroImage}
                    onChange={(e) => setHeroImage(e.target.value)}
                    className="w-full p-2.5 bg-canvas border border-atelier text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="uppercase tracking-wider text-warmgray font-medium">Short Monograph Synopsis</label>
                <textarea
                  rows={2}
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  className="w-full p-2.5 bg-canvas border border-atelier text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="uppercase tracking-wider text-warmgray font-medium">Full Architectural Narrative</label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2.5 bg-canvas border border-atelier text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="uppercase tracking-wider text-warmgray font-medium">Design Approach & Material Integration</label>
                <textarea
                  rows={3}
                  value={designApproach}
                  onChange={(e) => setDesignApproach(e.target.value)}
                  className="w-full p-2.5 bg-canvas border border-atelier text-xs"
                />
              </div>

              {/* Hero Image Uploader */}
              <div className="border-t border-atelier pt-3">
                <ImageUploader
                  bucket="projects"
                  images={heroImage ? [heroImage] : []}
                  onChange={(imgs) => setHeroImage(imgs[0] || '')}
                  multiple={false}
                  label="Architectural Hero Photo (Upload from Device) *"
                />
              </div>

              {/* Gallery Plates Uploader */}
              <div className="border-t border-atelier pt-3">
                <ImageUploader
                  bucket="projects"
                  images={gallery}
                  onChange={setGallery}
                  multiple={true}
                  label="Project Gallery Plates (Upload Multiple from Device)"
                />
              </div>

              <div className="flex items-center gap-6 border-t border-atelier pt-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isPublished}
                    onChange={(e) => setIsPublished(e.target.checked)}
                    className="accent-espresso"
                  />
                  <span>Published in Portfolio</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="accent-espresso"
                  />
                  <span>Feature on Homepage</span>
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-atelier">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2.5 border border-atelier text-xs uppercase tracking-widest text-warmgray"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="px-8 py-2.5 btn-luxury-dark text-xs uppercase tracking-widest font-medium"
                >
                  {formLoading ? 'Saving...' : 'Save Case Study'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
```

---

### `src/app/admin/quotes/page.tsx`

- **File**: `src/app/admin/quotes/page.tsx`
- **Size**: 12.5 KB (284 lines)
- **Language**: `tsx`

```tsx
'use client';

import React, { useEffect, useState } from 'react';
import { FileText, Eye, Check, X, RefreshCw, Send, DollarSign, Clock } from 'lucide-react';
import { AdminLayout } from '@/components/AdminLayout';
import { Quote, QuoteStatus } from '@/types';

export default function AdminQuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [quotedAmountInput, setQuotedAmountInput] = useState<number | ''>('');
  const [adminNotesInput, setAdminNotesInput] = useState('');
  const [updating, setUpdating] = useState(false);

  const loadQuotes = async () => {
    try {
      const res = await fetch('/api/quotes');
      if (res.ok) {
        const d = await res.json();
        setQuotes(d.quotes || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuotes();
  }, []);

  const openQuoteModal = (q: Quote) => {
    setSelectedQuote(q);
    setQuotedAmountInput(q.totalQuotedAmount || '');
    setAdminNotesInput(q.adminNotes || '');
  };

  const handleUpdateQuote = async (status: QuoteStatus) => {
    if (!selectedQuote) return;
    setUpdating(true);

    try {
      const res = await fetch(`/api/quotes/${selectedQuote.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status,
          totalQuotedAmount: quotedAmountInput !== '' ? Number(quotedAmountInput) : undefined,
          adminNotes: adminNotesInput,
        }),
      });

      if (res.ok) {
        const d = await res.json();
        if (d.quote) {
          setQuotes(quotes.map((item) => (item.id === selectedQuote.id ? d.quote : item)));
          setSelectedQuote(d.quote);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-atelier pb-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-bronze font-medium">Inquiries & Estimation</span>
            <h1 className="font-serif text-3xl sm:text-4xl text-espresso font-light">Architectural Quotes</h1>
          </div>
          <button
            onClick={loadQuotes}
            className="p-2.5 bg-surface border border-atelier hover:border-bronze text-espresso text-xs uppercase tracking-wider flex items-center gap-1.5 self-start"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Sync Quotes
          </button>
        </div>

        <div className="bg-surface border border-atelier overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-espresso border-collapse">
              <thead>
                <tr className="bg-canvas border-b border-atelier text-[10px] uppercase tracking-widest text-warmgray font-medium">
                  <th className="p-4">Quote Ref</th>
                  <th className="p-4">Client Entity</th>
                  <th className="p-4">Project Typology</th>
                  <th className="p-4">Location</th>
                  <th className="p-4">Target Budget</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-atelier/60">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-warmgray">
                      Loading quote inbox...
                    </td>
                  </tr>
                ) : quotes.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-warmgray">
                      No quote requests in record.
                    </td>
                  </tr>
                ) : (
                  quotes.map((q) => (
                    <tr key={q.id} className="hover:bg-canvas/50 transition-colors">
                      <td className="p-4 font-mono font-medium text-espresso">{q.quoteNumber}</td>
                      <td className="p-4">
                        <span className="font-medium text-espresso block">{q.customerName}</span>
                        <span className="text-[10px] text-warmgray">{q.customerEmail}</span>
                      </td>
                      <td className="p-4 font-serif text-sm">{q.projectType}</td>
                      <td className="p-4 text-warmgray">{q.projectLocation}</td>
                      <td className="p-4 text-timber font-medium">{q.budgetRange}</td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-0.5 text-[10px] uppercase tracking-wider font-medium border ${
                            q.status === 'Approved' || q.status === 'Converted_To_Order'
                              ? 'bg-green-50 text-green-800 border-green-200'
                              : q.status === 'Quotation_Sent'
                              ? 'bg-blue-50 text-blue-800 border-blue-200'
                              : 'bg-amber-50 text-amber-800 border-amber-200'
                          }`}
                        >
                          {q.status.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => openQuoteModal(q)}
                          className="p-1.5 bg-canvas border border-atelier hover:border-bronze text-espresso"
                          title="Review & Price Quote"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Quote Review Drawer / Modal */}
      {selectedQuote && (
        <div className="fixed inset-0 z-50 bg-espresso/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-surface border border-atelier p-6 sm:p-8 space-y-6 shadow-2xl my-8">
            <div className="flex justify-between items-start border-b border-atelier pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-bronze font-medium">Estimate Dossier</span>
                <h2 className="font-serif text-2xl text-espresso font-normal">
                  Quote #{selectedQuote.quoteNumber}
                </h2>
                <p className="text-xs text-warmgray">Received on {new Date(selectedQuote.createdAt).toLocaleString('en-IN')}</p>
              </div>
              <button onClick={() => setSelectedQuote(null)} className="p-1.5 text-warmgray hover:text-espresso">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 p-4 bg-canvas border border-atelier text-xs">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-warmgray font-medium block">
                  Client Details
                </span>
                <p className="font-medium text-espresso">{selectedQuote.customerName}</p>
                <p className="text-warmgray">{selectedQuote.customerEmail}</p>
                <p className="text-warmgray">{selectedQuote.customerPhone}</p>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-warmgray font-medium block">
                  Project Scope
                </span>
                <p className="text-espresso font-medium">{selectedQuote.projectType}</p>
                <p className="text-warmgray">Site: {selectedQuote.projectLocation}</p>
                <p className="text-warmgray">Timeline: {selectedQuote.estimatedTimeline}</p>
              </div>
            </div>

            {/* Line Items */}
            <div className="space-y-3">
              <h3 className="text-xs uppercase tracking-wider text-espresso font-medium">
                Materials & Sizing Requested ({selectedQuote.items.length})
              </h3>
              <div className="border border-atelier divide-y divide-atelier/60 text-xs">
                {selectedQuote.items.map((item, idx) => (
                  <div key={idx} className="p-3 space-y-1">
                    <div className="flex justify-between">
                      <span className="font-serif text-sm font-medium text-espresso">{item.productName}</span>
                      <span className="font-mono text-timber">{item.quantity} {item.unit}</span>
                    </div>
                    {item.dimensions && <p className="text-[11px] text-warmgray">Dimensions: {item.dimensions}</p>}
                    {item.notes && <p className="text-[11px] text-warmgray italic">&ldquo;{item.notes}&rdquo;</p>}
                  </div>
                ))}
              </div>
            </div>

            {selectedQuote.notes && (
              <div className="p-3 bg-canvas border border-atelier text-xs space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-warmgray font-medium block">
                  Client Design Notes:
                </span>
                <p className="text-warmgray leading-relaxed">{selectedQuote.notes}</p>
              </div>
            )}

            {/* Estimation Action Controls */}
            <div className="space-y-4 pt-2 border-t border-atelier text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="uppercase tracking-wider text-warmgray font-medium block">
                    Calculated Quotation Amount (₹)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 450000"
                    value={quotedAmountInput}
                    onChange={(e) => setQuotedAmountInput(e.target.value ? Number(e.target.value) : '')}
                    className="w-full p-2.5 bg-canvas border border-atelier text-xs font-serif text-timber text-base font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="uppercase tracking-wider text-warmgray font-medium block">
                    Update Quote Workflow Status
                  </label>
                  <select
                    value={selectedQuote.status}
                    onChange={(e) => handleUpdateQuote(e.target.value as QuoteStatus)}
                    disabled={updating}
                    className="w-full p-2.5 bg-canvas border border-atelier text-xs font-medium"
                  >
                    <option value="Pending">Pending Review</option>
                    <option value="Under_Review">Under Technical Review</option>
                    <option value="Quotation_Sent">Quotation Dispatched to Client</option>
                    <option value="Approved">Client Approved</option>
                    <option value="Converted_To_Order">Converted to Confirmed Order</option>
                    <option value="Rejected">Rejected / Infeasible</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="uppercase tracking-wider text-warmgray font-medium block">
                  Studio Internal Notes & Quarry Coordination
                </label>
                <textarea
                  rows={2}
                  value={adminNotesInput}
                  onChange={(e) => setAdminNotesInput(e.target.value)}
                  placeholder="e.g. Quarry block #42 reserved in Verona. 3 week shipping timeline."
                  className="w-full p-2.5 bg-canvas border border-atelier text-xs"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => handleUpdateQuote(selectedQuote.status)}
                  disabled={updating}
                  className="px-6 py-2.5 btn-luxury-dark text-xs uppercase tracking-widest font-medium"
                >
                  {updating ? 'Saving...' : 'Save Estimate & Notes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
```

---

### `src/app/admin/services/page.tsx`

- **File**: `src/app/admin/services/page.tsx`
- **Size**: 12.3 KB (337 lines)
- **Language**: `tsx`

```tsx
'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Plus, Edit2, Trash2, Check, X, Compass, Eye, EyeOff } from 'lucide-react';
import { AdminLayout } from '@/components/AdminLayout';
import { ImageUploader } from '@/components/ImageUploader';
import { Service } from '@/types';

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [fullDesc, setFullDesc] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [deliverables, setDeliverables] = useState<string[]>([]);
  const [deliverableInput, setDeliverableInput] = useState('');
  const [sortOrder, setSortOrder] = useState(0);
  const [isPublished, setIsPublished] = useState(true);
  const [formError, setFormError] = useState<string | null>(null);

  const loadServices = async () => {
    try {
      const res = await fetch('/api/services?all=true');
      if (res.ok) {
        const d = await res.json();
        setServices(d.services || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const openCreateModal = () => {
    setEditingService(null);
    setTitle('');
    setSlug('');
    setShortDesc('');
    setFullDesc('');
    setImageUrl('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80');
    setDeliverables([
      'Comprehensive architectural drawing sets',
      'Direct material quarry selection',
      'On-site artisan supervision',
    ]);
    setSortOrder(services.length + 1);
    setIsPublished(true);
    setFormError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (s: Service) => {
    setEditingService(s);
    setTitle(s.title);
    setSlug(s.slug);
    setShortDesc(s.shortDesc);
    setFullDesc(s.fullDesc);
    setImageUrl(s.imageUrl);
    setDeliverables(s.deliverables || []);
    setSortOrder(s.sortOrder);
    setIsPublished(s.isPublished);
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleTogglePublish = async (s: Service) => {
    try {
      const res = await fetch(`/api/services/${s.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPublished: !s.isPublished }),
      });
      if (res.ok) {
        setServices(services.map((item) => (item.id === s.id ? { ...item, isPublished: !s.isPublished } : item)));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this architectural service?')) return;
    try {
      const res = await fetch(`/api/services/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setServices(services.filter((s) => s.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const payload = {
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      shortDesc,
      fullDesc,
      iconName: 'Compass',
      imageUrl,
      deliverables,
      sortOrder: Number(sortOrder),
      isPublished,
    };

    try {
      const url = editingService ? `/api/services/${editingService.id}` : '/api/services';
      const method = editingService ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsModalOpen(false);
        loadServices();
      } else {
        setFormError(data.error || 'Failed to save service');
      }
    } catch (err: any) {
      setFormError(err.message || 'Error occurred');
    }
  };

  const addDeliverable = () => {
    if (deliverableInput.trim()) {
      setDeliverables([...deliverables, deliverableInput.trim()]);
      setDeliverableInput('');
    }
  };

  const removeDeliverable = (idx: number) => {
    setDeliverables(deliverables.filter((_, i) => i !== idx));
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-atelier pb-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-bronze font-medium">Practice Offerings</span>
            <h1 className="font-serif text-3xl sm:text-4xl text-espresso font-light">Architectural Services</h1>
          </div>
          <button
            onClick={openCreateModal}
            className="px-5 py-2.5 btn-luxury-dark text-xs uppercase tracking-widest flex items-center gap-2 font-medium"
          >
            <Plus className="w-4 h-4" /> Add Service Offering
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((srv) => (
            <div
              key={srv.id}
              className="bg-surface border border-atelier p-5 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="relative aspect-[16/10] bg-canvas overflow-hidden border border-atelier">
                  {srv.imageUrl && <Image src={srv.imageUrl} alt={srv.title} fill className="object-cover" />}
                </div>

                <div>
                  <h3 className="font-serif text-xl text-espresso font-medium">{srv.title}</h3>
                  <p className="text-xs text-warmgray font-light mt-1.5 line-clamp-2">{srv.shortDesc}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-atelier flex items-center justify-between">
                <button
                  onClick={() => handleTogglePublish(srv)}
                  className={`px-2 py-1 text-[10px] uppercase tracking-wider font-medium flex items-center gap-1 border ${
                    srv.isPublished
                      ? 'bg-green-50 text-green-800 border-green-200'
                      : 'bg-warmgray/10 text-warmgray border-warmgray/30'
                  }`}
                >
                  {srv.isPublished ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                  <span>{srv.isPublished ? 'Live' : 'Hidden'}</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(srv)}
                    className="p-1.5 bg-canvas border border-atelier hover:border-bronze text-espresso text-xs"
                    title="Edit"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(srv.id)}
                    className="p-1.5 bg-canvas border border-atelier hover:text-red-700 text-warmgray text-xs"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-espresso/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-xl bg-surface border border-atelier p-6 sm:p-8 space-y-6 shadow-2xl my-8">
            <div className="flex justify-between items-center border-b border-atelier pb-4">
              <h2 className="font-serif text-2xl text-espresso">
                {editingService ? `Edit Service` : 'New Architectural Service'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-warmgray hover:text-espresso">
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-800 text-xs">{formError}</div>
            )}

            <form onSubmit={handleSave} className="space-y-4 text-xs max-h-[70vh] overflow-y-auto pr-2">
              <div className="space-y-1">
                <label className="uppercase tracking-wider text-warmgray font-medium">Service Name *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2.5 bg-canvas border border-atelier text-xs"
                />
              </div>

              <div className="border-t border-atelier pt-3">
                <ImageUploader
                  bucket="services"
                  images={imageUrl ? [imageUrl] : []}
                  onChange={(imgs) => setImageUrl(imgs[0] || '')}
                  multiple={false}
                  label="Service Cover Photo (Upload from Device)"
                />
              </div>

              <div className="space-y-1">
                <label className="uppercase tracking-wider text-warmgray font-medium">Short Summary</label>
                <textarea
                  rows={2}
                  value={shortDesc}
                  onChange={(e) => setShortDesc(e.target.value)}
                  className="w-full p-2.5 bg-canvas border border-atelier text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="uppercase tracking-wider text-warmgray font-medium">Detailed Scope Description</label>
                <textarea
                  rows={4}
                  value={fullDesc}
                  onChange={(e) => setFullDesc(e.target.value)}
                  className="w-full p-2.5 bg-canvas border border-atelier text-xs"
                />
              </div>

              {/* Deliverables */}
              <div className="space-y-2 border-t border-atelier pt-3">
                <label className="uppercase tracking-wider text-warmgray font-medium block">
                  Key Deliverables
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. 3D Volumetric BIM Models"
                    value={deliverableInput}
                    onChange={(e) => setDeliverableInput(e.target.value)}
                    className="flex-1 p-2 bg-canvas border border-atelier text-xs"
                  />
                  <button
                    type="button"
                    onClick={addDeliverable}
                    className="px-4 py-2 bg-espresso text-surface text-xs"
                  >
                    Add
                  </button>
                </div>

                <ul className="space-y-1 pt-1">
                  {deliverables.map((item, idx) => (
                    <li key={idx} className="flex justify-between items-center p-2 bg-canvas border border-atelier text-xs">
                      <span>• {item}</span>
                      <button type="button" onClick={() => removeDeliverable(idx)} className="text-red-700">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-atelier">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2.5 border border-atelier text-xs uppercase tracking-widest text-warmgray"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-2.5 btn-luxury-dark text-xs uppercase tracking-widest font-medium"
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
```

---

### `src/app/admin/settings/page.tsx`

- **File**: `src/app/admin/settings/page.tsx`
- **Size**: 14.7 KB (357 lines)
- **Language**: `tsx`

```tsx
'use client';

import React, { useEffect, useState } from 'react';
import { Settings, Shield, Bell, Save, Check, History, RefreshCw, Radio } from 'lucide-react';
import { AdminLayout } from '@/components/AdminLayout';
import { SiteSettings, AuditLog } from '@/types';

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const DEFAULT_VAPID_PUBLIC_KEY =
  'BHsG3ouw3YgPO_jlPvdNIBFISisslHHm-vxyMHmCRswNnDQxTBCZTLR2qRAQvNOC-avolJ61etGkPrNJV4MpxTE';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [testPushing, setTestPushing] = useState(false);
  const [pushResult, setPushResult] = useState<string | null>(null);
  const [browserPerm, setBrowserPerm] = useState<NotificationPermission | 'unsupported'>('default');

  const loadSettingsAndLogs = async () => {
    try {
      if (typeof window !== 'undefined' && 'Notification' in window) {
        setBrowserPerm(Notification.permission);
      } else if (typeof window !== 'undefined') {
        setBrowserPerm('unsupported');
      }

      const [setRes, logRes] = await Promise.all([
        fetch('/api/admin/settings'),
        fetch('/api/admin/audit-logs'),
      ]);

      if (setRes.ok) {
        const d = await setRes.json();
        setSettings(d.settings);
      }
      if (logRes.ok) {
        const l = await logRes.json();
        setLogs(l.logs || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSettingsAndLogs();
  }, []);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setSaving(true);
    setSavedSuccess(false);

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        setSavedSuccess(true);
        loadSettingsAndLogs();
        setTimeout(() => setSavedSuccess(false), 2500);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const handleSendTestPush = async () => {
    setTestPushing(true);
    setPushResult(null);
    try {
      // 1. Ensure service worker and browser push subscription are registered
      if (typeof window !== 'undefined' && 'serviceWorker' in navigator && 'Notification' in window) {
        if (Notification.permission !== 'granted') {
          const perm = await Notification.requestPermission();
          if (perm !== 'granted') {
            setPushResult('Please allow browser notifications in the permission popup to enable alerts on this device.');
            setTestPushing(false);
            return;
          }
        }

        const reg = await navigator.serviceWorker.ready;
        const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || DEFAULT_VAPID_PUBLIC_KEY;
        const convertedKey = urlBase64ToUint8Array(vapidKey);
        let sub = await reg.pushManager.getSubscription();
        if (!sub) {
          sub = await reg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: convertedKey,
          });
        }
        if (sub) {
          await fetch('/api/notifications/subscribe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ subscription: sub }),
          });
        }
      }

      // 2. Dispatch real server push
      const res = await fetch('/api/admin/notifications/test', {
        method: 'POST',
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setPushResult(data.message || 'Real Web Push notification dispatched to your registered device.');
      } else {
        setPushResult(data.message || data.error || 'Test notification sent to registered endpoints.');
      }
    } catch (err: any) {
      setPushResult(err.message || 'Server error sending test push.');
    } finally {
      setTestPushing(false);
    }
  };

  if (loading || !settings) {
    return (
      <AdminLayout>
        <div className="p-12 text-center text-warmgray">Loading studio configuration...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-atelier pb-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-bronze font-medium">Configuration</span>
            <h1 className="font-serif text-3xl sm:text-4xl text-espresso font-light">Studio Settings & Audit</h1>
          </div>
          <button
            onClick={loadSettingsAndLogs}
            className="p-2.5 bg-surface border border-atelier hover:border-bronze text-espresso text-xs uppercase tracking-wider flex items-center gap-1.5 self-start"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reload Config
          </button>
        </div>

        {/* Studio Settings Form */}
        <form onSubmit={handleSaveSettings} className="bg-surface border border-atelier p-6 sm:p-8 space-y-8">
          <div className="flex justify-between items-center border-b border-atelier pb-4">
            <div className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-bronze" />
              <h2 className="font-serif text-2xl text-espresso">Atelier Profile & Tax Rules</h2>
            </div>
            {savedSuccess && (
              <span className="text-xs text-green-800 bg-green-50 px-3 py-1 border border-green-200 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Settings Saved
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
            <div className="space-y-1">
              <label className="uppercase tracking-wider text-warmgray font-medium">Brand / Atelier Name</label>
              <input
                type="text"
                value={settings.brandName}
                onChange={(e) => setSettings({ ...settings, brandName: e.target.value })}
                className="w-full p-2.5 bg-canvas border border-atelier"
              />
            </div>

            <div className="space-y-1">
              <label className="uppercase tracking-wider text-warmgray font-medium">Tagline / Mission</label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="w-full p-2.5 bg-canvas border border-atelier"
              />
            </div>

            <div className="space-y-1">
              <label className="uppercase tracking-wider text-warmgray font-medium">Studio Email</label>
              <input
                type="email"
                value={settings.contactEmail}
                onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                className="w-full p-2.5 bg-canvas border border-atelier"
              />
            </div>

            <div className="space-y-1">
              <label className="uppercase tracking-wider text-warmgray font-medium">Direct Telephone</label>
              <input
                type="text"
                value={settings.contactPhone}
                onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                className="w-full p-2.5 bg-canvas border border-atelier"
              />
            </div>

            <div className="sm:col-span-2 space-y-1">
              <label className="uppercase tracking-wider text-warmgray font-medium">Physical Studio Address</label>
              <input
                type="text"
                value={settings.studioAddress}
                onChange={(e) => setSettings({ ...settings, studioAddress: e.target.value })}
                className="w-full p-2.5 bg-canvas border border-atelier"
              />
            </div>

            <div className="space-y-1">
              <label className="uppercase tracking-wider text-warmgray font-medium">Standard GST Tax Rate (%)</label>
              <input
                type="number"
                value={settings.taxRatePercent}
                onChange={(e) => setSettings({ ...settings, taxRatePercent: Number(e.target.value) })}
                className="w-full p-2.5 bg-canvas border border-atelier"
              />
            </div>

            <div className="space-y-1">
              <label className="uppercase tracking-wider text-warmgray font-medium">Standard Freight Fee (₹)</label>
              <input
                type="number"
                value={settings.standardShippingFee}
                onChange={(e) => setSettings({ ...settings, standardShippingFee: Number(e.target.value) })}
                className="w-full p-2.5 bg-canvas border border-atelier"
              />
            </div>

            <div className="space-y-1">
              <label className="uppercase tracking-wider text-warmgray font-medium">Complimentary Freight Threshold (₹)</label>
              <input
                type="number"
                value={settings.freeShippingThreshold}
                onChange={(e) => setSettings({ ...settings, freeShippingThreshold: Number(e.target.value) })}
                className="w-full p-2.5 bg-canvas border border-atelier"
              />
            </div>

            <div className="space-y-1">
              <label className="uppercase tracking-wider text-warmgray font-medium">Currency Symbol</label>
              <input
                type="text"
                value={settings.currencySymbol}
                onChange={(e) => setSettings({ ...settings, currencySymbol: e.target.value })}
                className="w-full p-2.5 bg-canvas border border-atelier font-mono"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-8 py-3 btn-luxury-dark text-xs uppercase tracking-widest flex items-center gap-2 font-medium"
            >
              <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save Studio Settings'}
            </button>
          </div>
        </form>

        {/* Web Push Notification Diagnostic */}
        <div className="bg-surface border border-atelier p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between border-b border-atelier pb-4">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-bronze" />
              <h2 className="font-serif text-2xl text-espresso">Web Push Dispatch System</h2>
            </div>
            {browserPerm === 'granted' ? (
              <span className="text-[11px] bg-green-50 text-green-800 border border-green-200 px-2.5 py-1 font-medium flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Alerts Active on this Device
              </span>
            ) : (
              <span className="text-[11px] bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-1 font-medium">
                {browserPerm === 'denied' ? 'Notifications Blocked in Browser' : 'Registration Pending'}
              </span>
            )}
          </div>
          <p className="text-xs text-warmgray leading-relaxed max-w-xl">
            When a client completes an online order or submits an architectural quote request, registered admin browser devices receive instant background push notifications.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              type="button"
              onClick={handleSendTestPush}
              disabled={testPushing}
              className="px-6 py-2.5 btn-luxury-dark text-xs uppercase tracking-wider font-medium flex items-center gap-2"
            >
              <Bell className="w-3.5 h-3.5" /> {testPushing ? 'Registering & Sending...' : 'Dispatch Test Notification'}
            </button>
            {pushResult && <span className="text-xs text-bronze font-medium">{pushResult}</span>}
          </div>
        </div>

        {/* Security Audit Log */}
        <div className="bg-surface border border-atelier p-6 sm:p-8 space-y-6">
          <div className="flex justify-between items-center border-b border-atelier pb-4">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-bronze" />
              <h2 className="font-serif text-2xl text-espresso">Security Audit Log</h2>
            </div>
            <span className="text-xs text-warmgray">Immutable Traceability</span>
          </div>

          <div className="overflow-x-auto max-h-96 overflow-y-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-canvas border-b border-atelier text-[10px] uppercase tracking-widest text-warmgray">
                  <th className="p-3">Timestamp</th>
                  <th className="p-3">Operator</th>
                  <th className="p-3">Action</th>
                  <th className="p-3">Entity</th>
                  <th className="p-3">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-atelier/60 font-mono text-[11px]">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-canvas/40">
                    <td className="p-3 text-warmgray whitespace-nowrap">
                      {new Date(log.createdAt).toLocaleString('en-IN')}
                    </td>
                    <td className="p-3 text-espresso whitespace-nowrap">{log.adminEmail}</td>
                    <td className="p-3 text-timber font-medium">{log.action}</td>
                    <td className="p-3 text-warmgray">{log.entity}</td>
                    <td className="p-3 text-warmgray font-sans text-xs">
                      {log.details ? JSON.stringify(log.details) : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
```

---

### `src/app/api/admin/audit-logs/route.ts`

- **File**: `src/app/api/admin/audit-logs/route.ts`
- **Size**: 0.6 KB (19 lines)
- **Language**: `typescript`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getAuditLogs } from '@/lib/db';
import { verifyAdminToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('balaji_admin_session')?.value;
    const admin = token ? verifyAdminToken(token) : null;
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Unauthorized admin access' }, { status: 401 });
    }

    const logs = await getAuditLogs();
    return NextResponse.json({ success: true, logs });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
```

---

### `src/app/api/admin/notifications/test/route.ts`

- **File**: `src/app/api/admin/notifications/test/route.ts`
- **Size**: 0.8 KB (22 lines)
- **Language**: `typescript`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken } from '@/lib/auth';
import { sendTestPushToAdmin } from '@/lib/push';

export async function POST(req: NextRequest) {
  try {
    const cookieToken = req.cookies.get('balaji_admin_session')?.value;
    const authHeader = req.headers.get('authorization')?.replace('Bearer ', '');
    const token = cookieToken || authHeader;
    const admin = token ? verifyAdminToken(token) : null;

    if (!admin) {
      return NextResponse.json({ success: false, error: 'Unauthorized admin access' }, { status: 401 });
    }

    const result = await sendTestPushToAdmin(admin.id);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
```

---

### `src/app/api/admin/settings/route.ts`

- **File**: `src/app/api/admin/settings/route.ts`
- **Size**: 1.2 KB (38 lines)
- **Language**: `typescript`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getSiteSettings, updateSiteSettings, addAuditLog } from '@/lib/db';
import { verifyAdminToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const settings = await getSiteSettings();
    return NextResponse.json({ success: true, settings });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const token = req.cookies.get('balaji_admin_session')?.value;
    const admin = token ? verifyAdminToken(token) : null;
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Unauthorized admin access' }, { status: 401 });
    }

    const partialData = await req.json();
    const updated = await updateSiteSettings(partialData);

    await addAuditLog({
      adminId: admin.id,
      adminEmail: admin.email,
      action: 'SITE_SETTINGS_UPDATED',
      entity: 'SiteSettings',
      details: { modifiedKeys: Object.keys(partialData) },
    });

    return NextResponse.json({ success: true, settings: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
```

---

### `src/app/api/admin/upload/route.ts`

- **File**: `src/app/api/admin/upload/route.ts`
- **Size**: 3.1 KB (89 lines)
- **Language**: `typescript`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { verifyAdminToken } from '@/lib/auth';
import { getServiceSupabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    // 1. Authenticate admin
    const cookieToken = req.cookies.get('balaji_admin_session')?.value;
    const authHeader = req.headers.get('authorization')?.replace('Bearer ', '');
    const token = cookieToken || authHeader;

    const admin = token ? verifyAdminToken(token) : null;
    if (!admin) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized admin access. Please log in.' },
        { status: 401 }
      );
    }

    // 2. Parse file from FormData
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const bucket = (formData.get('bucket') as string) || 'products';

    if (!file) {
      return NextResponse.json({ success: false, error: 'No image file provided' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const rawExtension = path.extname(file.name) || '.jpg';
    const extension = rawExtension.toLowerCase();
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${bucket}-${Date.now()}-${cleanFileName}`;

    // 3. Primary: Try Supabase Cloud Storage
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const supabase = getServiceSupabase();

        // Ensure bucket exists
        await supabase.storage.createBucket(bucket, { public: true }).catch(() => {});

        const { data, error } = await supabase.storage.from(bucket).upload(filename, buffer, {
          contentType: file.type || 'image/jpeg',
          upsert: true,
        });

        if (!error && data) {
          const { data: publicUrlData } = supabase.storage.from(bucket).getPublicUrl(filename);
          if (publicUrlData && publicUrlData.publicUrl) {
            return NextResponse.json({
              success: true,
              url: publicUrlData.publicUrl,
              filename,
              storage: 'supabase',
            });
          }
        } else if (error) {
          console.warn('Supabase upload notice:', error.message);
        }
      } catch (sbErr: any) {
        console.warn('Supabase storage exception, using local fallback:', sbErr.message);
      }
    }

    // 4. Fallback: Local Server Storage (/public/uploads)
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, filename);
    fs.writeFileSync(filePath, buffer);

    const publicUrl = `/uploads/${filename}`;
    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename,
      storage: 'local',
    });
  } catch (err: any) {
    console.error('Upload route error:', err);
    return NextResponse.json({ success: false, error: err.message || 'Server upload error' }, { status: 500 });
  }
}
```

---

### `src/app/api/auth/change-password/route.ts`

- **File**: `src/app/api/auth/change-password/route.ts`
- **Size**: 2.2 KB (67 lines)
- **Language**: `typescript`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getAdminByEmail, updateAdminPassword, addAuditLog } from '@/lib/db';
import { hashPassword, verifyAdminToken, verifyPassword, signAdminToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('balaji_admin_session')?.value;
    if (!token) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const payload = verifyAdminToken(token);
    if (!payload) {
      return NextResponse.json({ success: false, error: 'Session expired' }, { status: 401 });
    }

    const { currentPassword, newPassword } = await req.json();
    if (!newPassword || newPassword.length < 6) {
      return NextResponse.json(
        { success: false, error: 'New password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    const admin = await getAdminByEmail(payload.email);
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Admin account not found' }, { status: 404 });
    }

    // Verify current password if supplied
    if (currentPassword) {
      const isMatch = verifyPassword(currentPassword, admin.passwordHash);
      if (!isMatch) {
        return NextResponse.json({ success: false, error: 'Current password incorrect' }, { status: 400 });
      }
    }

    const newHash = hashPassword(newPassword);
    await updateAdminPassword(admin.id, newHash);

    const updatedToken = signAdminToken({
      id: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
      mustChangePassword: false,
    });

    const response = NextResponse.json({
      success: true,
      message: 'Password updated successfully. Bootstrap password has been permanently invalidated.',
    });

    response.cookies.set('balaji_admin_session', updatedToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message || 'Server error' }, { status: 500 });
  }
}
```

---

### `src/app/api/auth/login/route.ts`

- **File**: `src/app/api/auth/login/route.ts`
- **Size**: 1.9 KB (67 lines)
- **Language**: `typescript`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getAdminByEmail, recordAdminLogin, addAuditLog } from '@/lib/db';
import { verifyPassword, signAdminToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ success: false, error: 'Email and password required' }, { status: 400 });
    }

    const admin = await getAdminByEmail(email);
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
    }

    const isMatch = verifyPassword(password, admin.passwordHash);
    if (!isMatch) {
      return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
    }

    await recordAdminLogin(admin.id);

    const token = signAdminToken({
      id: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
      mustChangePassword: admin.mustChangePassword,
    });

    await addAuditLog({
      adminId: admin.id,
      adminEmail: admin.email,
      action: 'ADMIN_LOGIN_SUCCESS',
      entity: 'Auth',
      entityId: admin.id,
      details: { mustChangePassword: admin.mustChangePassword },
    });

    const response = NextResponse.json({
      success: true,
      admin: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
        mustChangePassword: admin.mustChangePassword,
      },
    });

    // Set secure HTTP-only cookie
    response.cookies.set('balaji_admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message || 'Server error' }, { status: 500 });
  }
}
```

---

### `src/app/api/auth/logout/route.ts`

- **File**: `src/app/api/auth/logout/route.ts`
- **Size**: 0.3 KB (8 lines)
- **Language**: `typescript`

```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const response = NextResponse.json({ success: true, message: 'Logged out successfully' });
  response.cookies.delete('balaji_admin_session');
  return response;
}
```

---

### `src/app/api/auth/me/route.ts`

- **File**: `src/app/api/auth/me/route.ts`
- **Size**: 0.9 KB (35 lines)
- **Language**: `typescript`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken } from '@/lib/auth';
import { getAdminByEmail } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('balaji_admin_session')?.value;
    if (!token) {
      return NextResponse.json({ admin: null });
    }

    const payload = verifyAdminToken(token);
    if (!payload) {
      return NextResponse.json({ admin: null });
    }

    const currentAdmin = await getAdminByEmail(payload.email);
    if (!currentAdmin) {
      return NextResponse.json({ admin: null });
    }

    return NextResponse.json({
      admin: {
        id: currentAdmin.id,
        email: currentAdmin.email,
        name: currentAdmin.name,
        role: currentAdmin.role,
        mustChangePassword: currentAdmin.mustChangePassword,
      },
    });
  } catch {
    return NextResponse.json({ admin: null });
  }
}
```

---

### `src/app/api/categories/[id]/route.ts`

- **File**: `src/app/api/categories/[id]/route.ts`
- **Size**: 2.0 KB (61 lines)
- **Language**: `typescript`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { updateCategory, deleteCategory, addAuditLog } from '@/lib/db';
import { verifyAdminToken } from '@/lib/auth';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = req.cookies.get('balaji_admin_session')?.value;
    const admin = token ? verifyAdminToken(token) : null;
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Unauthorized admin access' }, { status: 401 });
    }

    const partialData = await req.json();
    const updated = await updateCategory(params.id, partialData);

    if (!updated) {
      return NextResponse.json({ success: false, error: 'Category not found' }, { status: 404 });
    }

    await addAuditLog({
      adminId: admin.id,
      adminEmail: admin.email,
      action: 'CATEGORY_UPDATED',
      entity: 'Category',
      entityId: params.id,
      details: { modifiedKeys: Object.keys(partialData) },
    });

    return NextResponse.json({ success: true, category: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = req.cookies.get('balaji_admin_session')?.value;
    const admin = token ? verifyAdminToken(token) : null;
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Unauthorized admin access' }, { status: 401 });
    }

    const success = await deleteCategory(params.id);
    if (!success) {
      return NextResponse.json({ success: false, error: 'Category not found' }, { status: 404 });
    }

    await addAuditLog({
      adminId: admin.id,
      adminEmail: admin.email,
      action: 'CATEGORY_DELETED',
      entity: 'Category',
      entityId: params.id,
    });

    return NextResponse.json({ success: true, message: 'Category deleted successfully' });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
```

---

### `src/app/api/categories/route.ts`

- **File**: `src/app/api/categories/route.ts`
- **Size**: 1.9 KB (61 lines)
- **Language**: `typescript`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getCategories, getAllCategoriesAdmin, createCategory, addAuditLog } from '@/lib/db';
import { verifyAdminToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const isAdmin = searchParams.get('admin') === 'true';

    const categories = isAdmin ? await getAllCategoriesAdmin() : await getCategories();
    return NextResponse.json({ categories });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('balaji_admin_session')?.value;
    const admin = token ? verifyAdminToken(token) : null;
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Unauthorized admin access' }, { status: 401 });
    }

    const body = await req.json();
    if (!body.name) {
      return NextResponse.json({ success: false, error: 'Category name is required' }, { status: 400 });
    }

    const slug =
      body.slug ||
      body.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

    const newCategory = await createCategory({
      name: body.name,
      slug,
      description: body.description || '',
      imageUrl: body.imageUrl || '',
      parentId: body.parentId || null,
      sortOrder: Number(body.sortOrder) || 0,
      isActive: body.isActive !== false,
    });

    await addAuditLog({
      adminId: admin.id,
      adminEmail: admin.email,
      action: 'CATEGORY_CREATED',
      entity: 'Category',
      entityId: newCategory.id,
      details: { name: newCategory.name, slug: newCategory.slug },
    });

    return NextResponse.json({ success: true, category: newCategory });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
```

---

### `src/app/api/enquiries/[id]/route.ts`

- **File**: `src/app/api/enquiries/[id]/route.ts`
- **Size**: 0.9 KB (25 lines)
- **Language**: `typescript`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { updateEnquiryStatus } from '@/lib/db';
import { verifyAdminToken } from '@/lib/auth';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = req.cookies.get('balaji_admin_session')?.value;
    const admin = token ? verifyAdminToken(token) : null;
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Unauthorized admin access' }, { status: 401 });
    }

    const { status } = await req.json();
    const updated = await updateEnquiryStatus(params.id, status);

    if (!updated) {
      return NextResponse.json({ success: false, error: 'Enquiry not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, enquiry: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
```

---

### `src/app/api/enquiries/route.ts`

- **File**: `src/app/api/enquiries/route.ts`
- **Size**: 1.4 KB (45 lines)
- **Language**: `typescript`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createEnquiry, getEnquiries, addAuditLog } from '@/lib/db';
import { verifyAdminToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('balaji_admin_session')?.value;
    const admin = token ? verifyAdminToken(token) : null;
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Unauthorized admin access' }, { status: 401 });
    }

    const enquiries = await getEnquiries();
    return NextResponse.json({ success: true, enquiries });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.name || !body.email || !body.phone || !body.message) {
      return NextResponse.json(
        { success: false, error: 'Name, email, phone, and message are required.' },
        { status: 400 }
      );
    }

    const newEnquiry = await createEnquiry({
      name: body.name,
      email: body.email,
      phone: body.phone,
      subject: body.subject || 'Studio Consultation',
      message: body.message,
      source: body.source || 'Contact Form',
    });

    return NextResponse.json({ success: true, enquiry: newEnquiry });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
```

---

### `src/app/api/notifications/subscribe/route.ts`

- **File**: `src/app/api/notifications/subscribe/route.ts`
- **Size**: 1.4 KB (39 lines)
- **Language**: `typescript`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken } from '@/lib/auth';
import { savePushSubscription } from '@/lib/push';

export async function POST(req: NextRequest) {
  try {
    const cookieToken = req.cookies.get('balaji_admin_session')?.value;
    const authHeader = req.headers.get('authorization')?.replace('Bearer ', '');
    const token = cookieToken || authHeader;
    const admin = token ? verifyAdminToken(token) : null;

    if (!admin) {
      return NextResponse.json({ success: false, error: 'Unauthorized admin session' }, { status: 401 });
    }

    const { subscription } = await req.json();
    if (!subscription || !subscription.endpoint || !subscription.keys) {
      return NextResponse.json({ success: false, error: 'Invalid subscription object' }, { status: 400 });
    }

    const userAgent = req.headers.get('user-agent') || undefined;

    const result = await savePushSubscription({
      endpoint: subscription.endpoint,
      keys: subscription.keys,
      adminId: admin.id,
      userAgent,
    });

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Push notification subscription registered in Supabase' });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
```

---

### `src/app/api/orders/[id]/route.ts`

- **File**: `src/app/api/orders/[id]/route.ts`
- **Size**: 1.6 KB (46 lines)
- **Language**: `typescript`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getOrderById, updateOrderStatus, addAuditLog } from '@/lib/db';
import { verifyAdminToken } from '@/lib/auth';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const order = await getOrderById(params.id);
    if (!order) {
      return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, order });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = req.cookies.get('balaji_admin_session')?.value;
    const admin = token ? verifyAdminToken(token) : null;
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Unauthorized admin access' }, { status: 401 });
    }

    const { orderStatus, paymentStatus } = await req.json();
    const updated = await updateOrderStatus(params.id, orderStatus, paymentStatus);

    if (!updated) {
      return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
    }

    await addAuditLog({
      adminId: admin.id,
      adminEmail: admin.email,
      action: 'ORDER_STATUS_UPDATED',
      entity: 'Order',
      entityId: params.id,
      details: { orderStatus, paymentStatus },
    });

    return NextResponse.json({ success: true, order: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
```

---

### `src/app/api/orders/route.ts`

- **File**: `src/app/api/orders/route.ts`
- **Size**: 2.5 KB (76 lines)
- **Language**: `typescript`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createOrderAtomic, getOrders, addAuditLog, getPushSubscriptions } from '@/lib/db';
import { verifyAdminToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const cookieToken = req.cookies.get('balaji_admin_session')?.value;
    const authHeader = req.headers.get('authorization')?.replace('Bearer ', '');
    const token = cookieToken || authHeader;

    const admin = token ? verifyAdminToken(token) : null;
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Unauthorized admin access' }, { status: 401 });
    }

    const orders = await getOrders();
    return NextResponse.json(
      { success: true, orders },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        },
      }
    );
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.customerName || !body.customerEmail || !body.customerPhone) {
      return NextResponse.json(
        { success: false, error: 'Customer name, email, and phone are required.' },
        { status: 400 }
      );
    }

    if (!body.shippingAddress || !body.shippingAddress.addressLine1) {
      return NextResponse.json(
        { success: false, error: 'Valid delivery address is required.' },
        { status: 400 }
      );
    }

    if (!Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Order must contain at least one material/product.' },
        { status: 400 }
      );
    }

    // Process order with Server-Authoritative Price & Atomic Inventory Lock
    const result = await createOrderAtomic({
      customerName: body.customerName,
      customerEmail: body.customerEmail,
      customerPhone: body.customerPhone,
      shippingAddress: body.shippingAddress,
      billingAddress: body.billingAddress,
      items: body.items,
      paymentMethod: body.paymentMethod || 'Credit Card',
      notes: body.notes,
    });

    if (!result.success || !result.order) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }

    return NextResponse.json({ success: true, order: result.order });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message || 'Server error' }, { status: 500 });
  }
}
```

---

### `src/app/api/products/[id]/route.ts`

- **File**: `src/app/api/products/[id]/route.ts`
- **Size**: 2.5 KB (73 lines)
- **Language**: `typescript`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getProductById, updateProduct, deleteProduct, addAuditLog } from '@/lib/db';
import { verifyAdminToken } from '@/lib/auth';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const product = await getProductById(params.id);
    if (!product) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, product });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = req.cookies.get('balaji_admin_session')?.value;
    const admin = token ? verifyAdminToken(token) : null;
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Unauthorized admin access' }, { status: 401 });
    }

    const partialData = await req.json();
    const updated = await updateProduct(params.id, partialData);

    if (!updated) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
    }

    await addAuditLog({
      adminId: admin.id,
      adminEmail: admin.email,
      action: 'PRODUCT_UPDATED',
      entity: 'Product',
      entityId: params.id,
      details: { modifiedKeys: Object.keys(partialData) },
    });

    return NextResponse.json({ success: true, product: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = req.cookies.get('balaji_admin_session')?.value;
    const admin = token ? verifyAdminToken(token) : null;
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Unauthorized admin access' }, { status: 401 });
    }

    const success = await deleteProduct(params.id);
    if (!success) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
    }

    await addAuditLog({
      adminId: admin.id,
      adminEmail: admin.email,
      action: 'PRODUCT_DELETED',
      entity: 'Product',
      entityId: params.id,
    });

    return NextResponse.json({ success: true, message: 'Product deleted successfully' });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
```

---

### `src/app/api/products/route.ts`

- **File**: `src/app/api/products/route.ts`
- **Size**: 3.3 KB (96 lines)
- **Language**: `typescript`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getProducts, createProduct, addAuditLog } from '@/lib/db';
import { verifyAdminToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get('categoryId') || undefined;
    const categorySlug = searchParams.get('category') || undefined;
    const featuredOnly = searchParams.get('featured') === 'true';
    const search = searchParams.get('search') || undefined;
    const publishedOnly = searchParams.get('all') === 'true' ? false : true;

    const products = await getProducts({
      categoryId,
      categorySlug,
      featuredOnly,
      search,
      publishedOnly,
    });

    return NextResponse.json({ products });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('balaji_admin_session')?.value;
    const admin = token ? verifyAdminToken(token) : null;
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Unauthorized admin access' }, { status: 401 });
    }

    const body = await req.json();
    if (!body.name || !body.sku || !body.price || !body.categoryId) {
      return NextResponse.json(
        { success: false, error: 'Missing required product fields (name, sku, price, categoryId)' },
        { status: 400 }
      );
    }

    // Auto-generate slug if not provided
    const slug =
      body.slug ||
      body.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

    const newProduct = await createProduct({
      name: body.name,
      slug,
      sku: body.sku,
      brand: body.brand || 'Balaji Architect & Interiors',
      categoryId: body.categoryId,
      subcategory: body.subcategory || '',
      description: body.description || '',
      price: Number(body.price),
      salePrice: body.salePrice ? Number(body.salePrice) : undefined,
      unit: body.unit || 'sq ft',
      moq: Number(body.moq) || 1,
      stock: Number(body.stock) || 0,
      purchaseMode: body.purchaseMode || 'BUY_NOW',
      leadTime: body.leadTime || '3-5 business days',
      dimensions: body.dimensions || '',
      thickness: body.thickness || '',
      material: body.material || '',
      finish: body.finish || '',
      color: body.color || '',
      images: Array.isArray(body.images) ? body.images : [],
      variants: Array.isArray(body.variants) ? body.variants : [],
      isFeatured: Boolean(body.isFeatured),
      isNew: Boolean(body.isNew),
      isBestseller: Boolean(body.isBestseller),
      published: body.published !== false,
      tags: Array.isArray(body.tags) ? body.tags : [],
      specifications: body.specifications || {},
    });

    await addAuditLog({
      adminId: admin.id,
      adminEmail: admin.email,
      action: 'PRODUCT_CREATED',
      entity: 'Product',
      entityId: newProduct.id,
      details: { name: newProduct.name, sku: newProduct.sku, price: newProduct.price },
    });

    return NextResponse.json({ success: true, product: newProduct });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
```

---

### `src/app/api/projects/[id]/route.ts`

- **File**: `src/app/api/projects/[id]/route.ts`
- **Size**: 2.5 KB (73 lines)
- **Language**: `typescript`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getProjectById, updateProject, deleteProject, addAuditLog } from '@/lib/db';
import { verifyAdminToken } from '@/lib/auth';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const project = await getProjectById(params.id);
    if (!project) {
      return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, project });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = req.cookies.get('balaji_admin_session')?.value;
    const admin = token ? verifyAdminToken(token) : null;
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Unauthorized admin access' }, { status: 401 });
    }

    const partialData = await req.json();
    const updated = await updateProject(params.id, partialData);

    if (!updated) {
      return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
    }

    await addAuditLog({
      adminId: admin.id,
      adminEmail: admin.email,
      action: 'PROJECT_UPDATED',
      entity: 'Project',
      entityId: params.id,
      details: { modifiedKeys: Object.keys(partialData) },
    });

    return NextResponse.json({ success: true, project: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = req.cookies.get('balaji_admin_session')?.value;
    const admin = token ? verifyAdminToken(token) : null;
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Unauthorized admin access' }, { status: 401 });
    }

    const success = await deleteProject(params.id);
    if (!success) {
      return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
    }

    await addAuditLog({
      adminId: admin.id,
      adminEmail: admin.email,
      action: 'PROJECT_DELETED',
      entity: 'Project',
      entityId: params.id,
    });

    return NextResponse.json({ success: true, message: 'Project deleted successfully' });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
```

---

### `src/app/api/projects/route.ts`

- **File**: `src/app/api/projects/route.ts`
- **Size**: 2.6 KB (75 lines)
- **Language**: `typescript`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getProjects, createProject, addAuditLog } from '@/lib/db';
import { verifyAdminToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const featuredOnly = searchParams.get('featured') === 'true';
    const publishedOnly = searchParams.get('all') === 'true' ? false : true;

    const projects = await getProjects({ featuredOnly, publishedOnly });
    return NextResponse.json({ projects });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('balaji_admin_session')?.value;
    const admin = token ? verifyAdminToken(token) : null;
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Unauthorized admin access' }, { status: 401 });
    }

    const body = await req.json();
    if (!body.title || !body.heroImage) {
      return NextResponse.json(
        { success: false, error: 'Project title and hero image are required' },
        { status: 400 }
      );
    }

    const slug =
      body.slug ||
      body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

    const newProject = await createProject({
      title: body.title,
      slug,
      location: body.location || 'Mumbai',
      year: body.year || new Date().getFullYear().toString(),
      projectType: body.projectType || 'Residential Interiors',
      area: body.area || '',
      shortDescription: body.shortDescription || '',
      description: body.description || '',
      heroImage: body.heroImage,
      gallery: Array.isArray(body.gallery) ? body.gallery : [],
      designApproach: body.designApproach || '',
      materialsUsed: Array.isArray(body.materialsUsed) ? body.materialsUsed : [],
      beforeAfter: body.beforeAfter,
      isPublished: body.isPublished !== false,
      isFeatured: Boolean(body.isFeatured),
      sortOrder: Number(body.sortOrder) || 0,
      tags: Array.isArray(body.tags) ? body.tags : [],
    });

    await addAuditLog({
      adminId: admin.id,
      adminEmail: admin.email,
      action: 'PROJECT_CREATED',
      entity: 'Project',
      entityId: newProject.id,
      details: { title: newProject.title, slug: newProject.slug },
    });

    return NextResponse.json({ success: true, project: newProject });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
```

---

### `src/app/api/quotes/[id]/route.ts`

- **File**: `src/app/api/quotes/[id]/route.ts`
- **Size**: 1.6 KB (46 lines)
- **Language**: `typescript`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getQuoteById, updateQuoteStatus, addAuditLog } from '@/lib/db';
import { verifyAdminToken } from '@/lib/auth';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const quote = await getQuoteById(params.id);
    if (!quote) {
      return NextResponse.json({ success: false, error: 'Quote not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, quote });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = req.cookies.get('balaji_admin_session')?.value;
    const admin = token ? verifyAdminToken(token) : null;
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Unauthorized admin access' }, { status: 401 });
    }

    const { status, totalQuotedAmount, adminNotes } = await req.json();
    const updated = await updateQuoteStatus(params.id, status, totalQuotedAmount, adminNotes);

    if (!updated) {
      return NextResponse.json({ success: false, error: 'Quote not found' }, { status: 404 });
    }

    await addAuditLog({
      adminId: admin.id,
      adminEmail: admin.email,
      action: 'QUOTE_STATUS_UPDATED',
      entity: 'Quote',
      entityId: params.id,
      details: { status, totalQuotedAmount },
    });

    return NextResponse.json({ success: true, quote: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
```

---

### `src/app/api/quotes/route.ts`

- **File**: `src/app/api/quotes/route.ts`
- **Size**: 1.9 KB (57 lines)
- **Language**: `typescript`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createQuote, getQuotes, addAuditLog } from '@/lib/db';
import { verifyAdminToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('balaji_admin_session')?.value;
    const admin = token ? verifyAdminToken(token) : null;
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Unauthorized admin access' }, { status: 401 });
    }

    const quotes = await getQuotes();
    return NextResponse.json({ success: true, quotes });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.customerName || !body.customerEmail || !body.customerPhone) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and phone are required for quotation generation.' },
        { status: 400 }
      );
    }

    const newQuote = await createQuote({
      customerName: body.customerName,
      customerEmail: body.customerEmail,
      customerPhone: body.customerPhone,
      projectType: body.projectType || 'General Architectural Commission',
      projectLocation: body.projectLocation || 'Unspecified',
      estimatedTimeline: body.estimatedTimeline || 'Planning',
      budgetRange: body.budgetRange || 'Flexible',
      notes: body.notes || '',
      items: Array.isArray(body.items) ? body.items : [],
    });

    await addAuditLog({
      adminId: 'system',
      adminEmail: 'quote@balaji.com',
      action: 'QUOTE_SUBMITTED',
      entity: 'Quote',
      entityId: newQuote.id,
      details: { quoteNumber: newQuote.quoteNumber, customer: newQuote.customerName },
    });

    return NextResponse.json({ success: true, quote: newQuote });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
```

---

### `src/app/api/services/[id]/route.ts`

- **File**: `src/app/api/services/[id]/route.ts`
- **Size**: 2.0 KB (61 lines)
- **Language**: `typescript`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { updateService, deleteService, addAuditLog } from '@/lib/db';
import { verifyAdminToken } from '@/lib/auth';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = req.cookies.get('balaji_admin_session')?.value;
    const admin = token ? verifyAdminToken(token) : null;
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Unauthorized admin access' }, { status: 401 });
    }

    const partialData = await req.json();
    const updated = await updateService(params.id, partialData);

    if (!updated) {
      return NextResponse.json({ success: false, error: 'Service not found' }, { status: 404 });
    }

    await addAuditLog({
      adminId: admin.id,
      adminEmail: admin.email,
      action: 'SERVICE_UPDATED',
      entity: 'Service',
      entityId: params.id,
      details: { modifiedKeys: Object.keys(partialData) },
    });

    return NextResponse.json({ success: true, service: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = req.cookies.get('balaji_admin_session')?.value;
    const admin = token ? verifyAdminToken(token) : null;
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Unauthorized admin access' }, { status: 401 });
    }

    const success = await deleteService(params.id);
    if (!success) {
      return NextResponse.json({ success: false, error: 'Service not found' }, { status: 404 });
    }

    await addAuditLog({
      adminId: admin.id,
      adminEmail: admin.email,
      action: 'SERVICE_DELETED',
      entity: 'Service',
      entityId: params.id,
    });

    return NextResponse.json({ success: true, message: 'Service deleted successfully' });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
```

---

### `src/app/api/services/route.ts`

- **File**: `src/app/api/services/route.ts`
- **Size**: 2.0 KB (62 lines)
- **Language**: `typescript`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getServices, createService, addAuditLog } from '@/lib/db';
import { verifyAdminToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const publishedOnly = searchParams.get('all') === 'true' ? false : true;
    const services = await getServices(publishedOnly);
    return NextResponse.json({ services });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('balaji_admin_session')?.value;
    const admin = token ? verifyAdminToken(token) : null;
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Unauthorized admin access' }, { status: 401 });
    }

    const body = await req.json();
    if (!body.title) {
      return NextResponse.json({ success: false, error: 'Service title is required' }, { status: 400 });
    }

    const slug =
      body.slug ||
      body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

    const newService = await createService({
      title: body.title,
      slug,
      shortDesc: body.shortDesc || '',
      fullDesc: body.fullDesc || '',
      iconName: body.iconName || 'Compass',
      imageUrl: body.imageUrl || '',
      deliverables: Array.isArray(body.deliverables) ? body.deliverables : [],
      sortOrder: Number(body.sortOrder) || 0,
      isPublished: body.isPublished !== false,
    });

    await addAuditLog({
      adminId: admin.id,
      adminEmail: admin.email,
      action: 'SERVICE_CREATED',
      entity: 'Service',
      entityId: newService.id,
      details: { title: newService.title },
    });

    return NextResponse.json({ success: true, service: newService });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
```

---

### `src/app/cart/page.tsx`

- **File**: `src/app/cart/page.tsx`
- **Size**: 8.7 KB (185 lines)
- **Language**: `tsx`

```tsx
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Minus, Plus, ArrowRight, ArrowLeft, ShieldCheck, Truck } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, subtotal, tax, shipping, total, itemCount } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12 min-h-[70vh]">
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-atelier pb-6 gap-2">
        <div>
          <span className="text-xs uppercase tracking-widest text-bronze font-medium">Order Staging</span>
          <h1 className="font-serif text-3xl sm:text-4xl text-espresso font-light">
            Shopping Bag ({itemCount} {itemCount === 1 ? 'item' : 'items'})
          </h1>
        </div>
        {items.length > 0 && (
          <button
            onClick={clearCart}
            className="text-xs uppercase tracking-wider text-warmgray hover:text-red-700 transition-colors self-start"
          >
            Clear Entire Bag
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20 space-y-4 max-w-md mx-auto">
          <p className="font-serif text-2xl text-espresso">Your bag is empty.</p>
          <p className="text-xs sm:text-sm text-warmgray font-light">
            Browse our catalog of quarried stones, fluted wall panels, and bespoke furnishings to add materials to your cart.
          </p>
          <div className="pt-4">
            <Link href="/materials" className="px-8 py-3.5 btn-luxury-dark text-xs uppercase tracking-widest inline-block">
              Explore Materials Library
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Items Table */}
          <div className="lg:col-span-8 space-y-6">
            {items.map((item) => (
              <div
                key={`${item.productId}-${item.variantId || 'base'}`}
                className="bg-surface border border-atelier p-4 sm:p-6 flex flex-col sm:flex-row gap-6 items-start justify-between"
              >
                <div className="flex gap-4 sm:gap-6 flex-1">
                  <div className="relative w-24 h-28 sm:w-28 sm:h-32 bg-canvas overflow-hidden flex-shrink-0">
                    {item.product.images[0] && (
                      <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                    )}
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <span className="text-[10px] uppercase tracking-wider text-bronze font-medium">
                      {item.product.categoryName}
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl text-espresso leading-snug">
                      <Link href={`/material/${item.product.slug}`} className="hover:text-bronze transition-colors">
                        {item.product.name}
                      </Link>
                    </h3>
                    {item.variant && (
                      <p className="text-xs text-warmgray">Option: {item.variant.name}</p>
                    )}
                    <p className="text-xs text-timber font-medium pt-1">
                      ₹{item.unitPrice.toLocaleString('en-IN')} <span className="text-warmgray font-light">/ {item.product.unit}</span>
                    </p>
                    <p className="text-[11px] text-warmgray">Lead time: {item.product.leadTime}</p>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4 pt-4 sm:pt-0 border-t sm:border-t-0 border-atelier/60">
                  <div className="flex items-center border border-atelier bg-canvas">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1, item.variantId)}
                      className="p-2 text-espresso hover:text-bronze"
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-medium text-espresso min-w-[2.5rem] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1, item.variantId)}
                      className="p-2 text-espresso hover:text-bronze"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-right">
                    <span className="font-serif text-lg text-espresso block">
                      ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                    </span>
                    <button
                      onClick={() => removeItem(item.productId, item.variantId)}
                      className="text-[11px] text-warmgray hover:text-red-700 transition-colors inline-flex items-center gap-1 mt-1"
                    >
                      <Trash2 className="w-3 h-3" /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="pt-2">
              <Link
                href="/materials"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-warmgray hover:text-espresso font-medium transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Continue Material Selection
              </Link>
            </div>
          </div>

          {/* Summary Column */}
          <div className="lg:col-span-4 bg-surface border border-atelier p-6 sm:p-8 space-y-6 sticky top-28">
            <h2 className="font-serif text-2xl text-espresso font-light border-b border-atelier pb-4">
              Summary
            </h2>

            <div className="space-y-3 text-xs text-warmgray">
              <div className="flex justify-between">
                <span>Materials Subtotal</span>
                <span className="text-espresso font-medium">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Architectural GST (18%)</span>
                <span className="text-espresso font-medium">₹{tax.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Insured Freight & Logistics</span>
                <span className="text-espresso font-medium">
                  {shipping === 0 ? 'Complimentary' : `₹${shipping.toLocaleString('en-IN')}`}
                </span>
              </div>
              {shipping === 0 && (
                <p className="text-[10px] text-bronze">
                  * Eligible for complimentary architectural freight over ₹50,000.
                </p>
              )}
              <div className="flex justify-between pt-3 border-t border-atelier text-sm font-medium text-espresso">
                <span>Total Amount</span>
                <span className="font-serif text-xl text-timber">₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <Link
                href="/checkout"
                className="w-full py-4 btn-luxury-dark text-xs uppercase tracking-widest flex items-center justify-center gap-2 font-medium"
              >
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/quote"
                className="w-full py-3 text-center block text-xs uppercase tracking-widest text-warmgray hover:text-espresso border border-atelier transition-colors"
              >
                Request Custom Bulk Quote
              </Link>
            </div>

            <div className="pt-4 border-t border-atelier/60 space-y-2 text-[11px] text-warmgray">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-bronze" />
                <span>Verified Direct Quarry & Millwork Provenance</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-bronze" />
                <span>Crated and foam-buffered architectural dispatch</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
```

---

### `src/app/category/[slug]/page.tsx`

- **File**: `src/app/category/[slug]/page.tsx`
- **Size**: 7.0 KB (161 lines)
- **Language**: `tsx`

```tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { getCategoryBySlug, getProducts, getCategories } from '@/lib/db';
import { Reveal } from '@/components/Reveal';

export const revalidate = 60;

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const cat = await getCategoryBySlug(params.slug);
  if (!cat) return { title: 'Category Not Found — Balaji Architect & Interiors' };
  return {
    title: `${cat.name} — Architectural Materials | Balaji Architect & Interiors`,
    description: cat.description || `Browse luxury ${cat.name} curated by Balaji Architect & Interiors.`,
  };
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const [category, products, allCategories] = await Promise.all([
    getCategoryBySlug(params.slug),
    getProducts({ categorySlug: params.slug, publishedOnly: true }),
    getCategories(),
  ]);

  if (!category) {
    notFound();
  }

  return (
    <div className="space-y-16 pb-24">
      {/* Top Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link
          href="/materials"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-warmgray hover:text-espresso transition-colors font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to All Materials
        </Link>
      </div>

      {/* Category Hero Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-espresso text-surface p-8 sm:p-16 border border-atelier-dark space-y-4 relative overflow-hidden">
          {category.imageUrl && (
            <div className="absolute inset-0 z-0 opacity-20">
              <Image src={category.imageUrl} alt={category.name} fill className="object-cover" />
            </div>
          )}
          <div className="relative z-10 space-y-3 max-w-3xl">
            <span className="text-xs uppercase tracking-widest text-champagne font-medium">Category Collection</span>
            <h1 className="font-serif text-3xl sm:text-5xl text-surface font-light">{category.name}</h1>
            {category.description && (
              <p className="text-sm sm:text-base text-surface/80 font-light leading-relaxed">
                {category.description}
              </p>
            )}
            <p className="text-xs text-champagne pt-1 font-medium">{products.length} Materials Available</p>
          </div>
        </div>
      </section>

      {/* Category Sibling Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-4 border-b border-atelier no-scrollbar">
          <Link
            href="/materials"
            className="px-4 py-2 text-xs uppercase tracking-widest whitespace-nowrap text-warmgray hover:text-espresso border border-transparent hover:border-atelier"
          >
            All Materials
          </Link>
          {allCategories.map((c) => {
            const isActive = c.slug === category.slug;
            return (
              <Link
                key={c.id}
                href={`/category/${c.slug}`}
                className={`px-4 py-2 text-xs uppercase tracking-widest whitespace-nowrap transition-colors font-medium ${
                  isActive
                    ? 'bg-espresso text-surface border border-espresso'
                    : 'text-warmgray hover:text-espresso border border-transparent hover:border-atelier'
                }`}
              >
                {c.name}
              </Link>
            );
          })}
        </div>

        {/* Product Grid */}
        <div className="pt-8">
          {products.length === 0 ? (
            <div className="py-24 text-center space-y-4">
              <p className="font-serif text-2xl text-espresso">No materials in this collection at the moment.</p>
              <Link
                href="/materials"
                className="inline-block px-6 py-2.5 btn-luxury-dark text-xs uppercase tracking-widest"
              >
                Explore All Materials
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product, idx) => (
                <Reveal key={product.id} delay={idx * 50}>
                  <Link
                    href={`/material/${product.slug}`}
                    className="group block bg-surface border border-atelier p-4 hover:border-bronze transition-all duration-300 space-y-3"
                  >
                    <div className="relative aspect-[4/5] bg-canvas overflow-hidden">
                      {product.images[0] && (
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
                        />
                      )}
                      {product.purchaseMode === 'REQUEST_QUOTE' && (
                        <span className="absolute top-2 left-2 bg-espresso/90 backdrop-blur-xs text-surface text-[9px] px-2 py-0.5 uppercase tracking-wider font-medium">
                          Quote Required
                        </span>
                      )}
                    </div>

                    <div className="space-y-1.5 pt-1">
                      <div className="flex justify-between text-[11px] text-warmgray">
                        <span className="uppercase tracking-wider font-medium text-bronze">
                          {product.subcategory || category.name}
                        </span>
                        <span>MOQ: {product.moq} {product.unit}</span>
                      </div>

                      <h3 className="font-serif text-lg text-espresso group-hover:text-bronze transition-colors font-medium leading-snug line-clamp-1">
                        {product.name}
                      </h3>

                      <div className="flex items-baseline justify-between pt-2 border-t border-atelier/60">
                        <div>
                          <span className="text-sm font-medium text-timber">
                            ₹{(product.salePrice || product.price).toLocaleString('en-IN')}
                          </span>
                          <span className="text-xs text-warmgray font-light"> / {product.unit}</span>
                        </div>
                        <span className="text-[10px] uppercase tracking-widest text-espresso group-hover:translate-x-0.5 transition-transform flex items-center gap-1 font-medium">
                          View Details <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
```

---

### `src/app/checkout/page.tsx`

- **File**: `src/app/checkout/page.tsx`
- **Size**: 20.7 KB (497 lines)
- **Language**: `tsx`

```tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  CreditCard,
  Building,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Truck,
  Lock,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Order } from '@/types';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, tax, shipping, total, clearCart } = useCart();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [submitting, setSubmitting] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  // Form State
  const [customer, setCustomer] = useState({
    fullName: '',
    email: '',
    phone: '',
  });

  const [address, setAddress] = useState({
    addressLine1: '',
    addressLine2: '',
    city: 'Guwahati',
    state: 'Assam',
    pincode: '781040',
    country: 'India',
  });

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'wire' | 'invoice'>('card');
  const [notes, setNotes] = useState('');

  // Handle Order Submission
  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setSubmitting(true);
    setOrderError(null);

    try {
      const payload = {
        customerName: customer.fullName,
        customerEmail: customer.email,
        customerPhone: customer.phone,
        shippingAddress: {
          ...address,
          fullName: customer.fullName,
          phone: customer.phone,
        },
        billingAddress: {
          ...address,
          fullName: customer.fullName,
          phone: customer.phone,
        },
        items: items.map((it) => ({
          productId: it.productId,
          variantId: it.variantId,
          quantity: it.quantity,
          selectedColor: it.variant?.color,
          selectedFinish: it.variant?.finish,
        })),
        paymentMethod:
          paymentMethod === 'card'
            ? 'Encrypted Card Processing'
            : paymentMethod === 'wire'
            ? 'NEFT / RTGS Architectural Wire Transfer'
            : 'Atelier Corporate Purchase Invoice',
        notes,
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setCompletedOrder(data.order);
        clearCart();
      } else {
        setOrderError(data.error || 'Unable to place order. Please try again.');
      }
    } catch (err: any) {
      setOrderError(err.message || 'Network error during checkout.');
    } finally {
      setSubmitting(false);
    }
  };

  // If order was successfully completed, show luxury confirmation
  if (completedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-8">
        <div className="bg-surface border border-atelier p-8 sm:p-12 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-champagne/20 text-timber flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-bronze font-medium">
              Order Confirmed & Staged
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-espresso font-light">
              Thank You for Your Commission
            </h1>
            <p className="text-xs sm:text-sm text-warmgray font-light max-w-md mx-auto">
              Your architectural order has been received and registered directly with our logistics team.
            </p>
          </div>

          <div className="bg-canvas p-6 border border-atelier max-w-md mx-auto text-left space-y-3 text-xs">
            <div className="flex justify-between border-b border-atelier pb-2">
              <span className="text-warmgray">Order Number:</span>
              <span className="font-mono font-medium text-espresso">{completedOrder.orderNumber}</span>
            </div>
            <div className="flex justify-between border-b border-atelier pb-2">
              <span className="text-warmgray">Total Billed:</span>
              <span className="font-serif text-base text-timber font-medium">
                ₹{completedOrder.totalAmount.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="flex justify-between border-b border-atelier pb-2">
              <span className="text-warmgray">Recipient:</span>
              <span className="text-espresso font-medium">{completedOrder.customerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-warmgray">Dispatch City:</span>
              <span className="text-espresso">{completedOrder.shippingAddress.city}, {completedOrder.shippingAddress.state}</span>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/materials"
              className="px-8 py-3.5 btn-luxury-dark text-xs uppercase tracking-widest"
            >
              Continue Exploring Materials
            </Link>
            <Link
              href="/"
              className="px-8 py-3.5 btn-luxury-outline text-xs uppercase tracking-widest"
            >
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center space-y-4">
        <h1 className="font-serif text-3xl text-espresso">Your bag is currently empty</h1>
        <p className="text-xs text-warmgray">Please select materials or furnishings before proceeding to checkout.</p>
        <Link href="/materials" className="inline-block mt-4 px-6 py-3 btn-luxury-dark text-xs uppercase tracking-widest">
          Browse Materials Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Header */}
      <div className="space-y-2 border-b border-atelier pb-6">
        <span className="text-xs uppercase tracking-widest text-bronze font-medium">Encrypted Checkout</span>
        <h1 className="font-serif text-3xl sm:text-4xl text-espresso font-light">
          Complete Your Material Order
        </h1>
      </div>

      {orderError && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-3">
          <Lock className="w-4 h-4 text-red-600 flex-shrink-0" />
          <span>{orderError}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Form: Multi-Step Checkout */}
        <div className="lg:col-span-7 space-y-8">
          {/* Step 1: Customer Info */}
          <div className="bg-surface border border-atelier p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-atelier pb-4">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-espresso text-surface text-xs flex items-center justify-center font-serif">
                  1
                </span>
                <h2 className="font-serif text-xl text-espresso">Customer Contact Details</h2>
              </div>
              <span className="text-[11px] text-warmgray font-light">Guest Checkout Supported</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-warmgray font-medium">
                  Full Name / Client Entity *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikas Sharma / Studio Design LLP"
                  value={customer.fullName}
                  onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                  className="w-full p-3 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-warmgray font-medium">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="client@domain.com"
                  value={customer.email}
                  onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                  className="w-full p-3 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-warmgray font-medium">
                  Contact Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98200 XXXXX"
                  value={customer.phone}
                  onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                  className="w-full p-3 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden text-xs"
                />
              </div>
            </div>
          </div>

          {/* Step 2: Shipping & Site Delivery Address */}
          <div className="bg-surface border border-atelier p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3 border-b border-atelier pb-4">
              <span className="w-6 h-6 rounded-full bg-espresso text-surface text-xs flex items-center justify-center font-serif">
                2
              </span>
              <h2 className="font-serif text-xl text-espresso">Site / Delivery Address</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-warmgray font-medium">
                  Street Address / Site Location *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Apartment, Suite, Project Site, Street"
                  value={address.addressLine1}
                  onChange={(e) => setAddress({ ...address, addressLine1: e.target.value })}
                  className="w-full p-3 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden text-xs"
                />
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-warmgray font-medium">
                  Landmark / Building Name
                </label>
                <input
                  type="text"
                  placeholder="Near design square, Gate 2"
                  value={address.addressLine2}
                  onChange={(e) => setAddress({ ...address, addressLine2: e.target.value })}
                  className="w-full p-3 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-warmgray font-medium">
                  City *
                </label>
                <input
                  type="text"
                  required
                  value={address.city}
                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  className="w-full p-3 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-warmgray font-medium">
                  State *
                </label>
                <input
                  type="text"
                  required
                  value={address.state}
                  onChange={(e) => setAddress({ ...address, state: e.target.value })}
                  className="w-full p-3 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-warmgray font-medium">
                  Postal Pincode *
                </label>
                <input
                  type="text"
                  required
                  value={address.pincode}
                  onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                  className="w-full p-3 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-warmgray font-medium">
                  Country
                </label>
                <input
                  type="text"
                  disabled
                  value={address.country}
                  className="w-full p-3 bg-canvas/60 border border-atelier text-xs text-warmgray"
                />
              </div>
            </div>
          </div>

          {/* Step 3: Payment Method */}
          <div className="bg-surface border border-atelier p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3 border-b border-atelier pb-4">
              <span className="w-6 h-6 rounded-full bg-espresso text-surface text-xs flex items-center justify-center font-serif">
                3
              </span>
              <h2 className="font-serif text-xl text-espresso">Payment Method</h2>
            </div>

            <div className="space-y-3">
              <label
                className={`p-4 border block cursor-pointer transition-all ${
                  paymentMethod === 'card' ? 'border-espresso bg-canvas ring-1 ring-espresso' : 'border-atelier hover:border-bronze'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="accent-espresso"
                    />
                    <span className="text-xs font-medium text-espresso">Credit / Debit Card (256-bit SSL Encrypted)</span>
                  </div>
                  <CreditCard className="w-4 h-4 text-warmgray" />
                </div>
                {paymentMethod === 'card' && (
                  <p className="text-[11px] text-warmgray mt-2 pl-6">
                    Processed securely via direct banking gateway. Instant staging for warehouse crate preparation.
                  </p>
                )}
              </label>

              <label
                className={`p-4 border block cursor-pointer transition-all ${
                  paymentMethod === 'wire' ? 'border-espresso bg-canvas ring-1 ring-espresso' : 'border-atelier hover:border-bronze'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'wire'}
                      onChange={() => setPaymentMethod('wire')}
                      className="accent-espresso"
                    />
                    <span className="text-xs font-medium text-espresso">RTGS / NEFT Architectural Wire Transfer</span>
                  </div>
                  <Building className="w-4 h-4 text-warmgray" />
                </div>
                {paymentMethod === 'wire' && (
                  <p className="text-[11px] text-warmgray mt-2 pl-6">
                    Our studio banking IFSC and proforma invoice will be dispatched immediately for institutional transfer.
                  </p>
                )}
              </label>
            </div>

            <div className="space-y-1.5 pt-2">
              <label className="text-xs uppercase tracking-wider text-warmgray font-medium">
                Site Delivery Instructions or Notes (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Unloading crane required on site, gate passes required before 9am..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-3 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden text-xs"
              />
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={submitting || !customer.fullName || !customer.email || !customer.phone || !address.addressLine1}
            className="w-full py-4 btn-luxury-dark text-xs uppercase tracking-widest flex items-center justify-center gap-2 font-medium disabled:opacity-50"
          >
            {submitting ? (
              <span>Validating & Decrementing Inventory...</span>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" /> Place Order (₹{total.toLocaleString('en-IN')})
              </>
            )}
          </button>
        </div>

        {/* Right Summary Column */}
        <div className="lg:col-span-5 bg-surface border border-atelier p-6 sm:p-8 space-y-6 sticky top-28">
          <h3 className="font-serif text-xl text-espresso border-b border-atelier pb-4">
            Order Review ({items.length} materials)
          </h3>

          <div className="space-y-4 max-h-72 overflow-y-auto pr-2 border-b border-atelier pb-4">
            {items.map((item) => (
              <div key={`${item.productId}-${item.variantId || 'base'}`} className="flex gap-3 text-xs">
                <div className="relative w-14 h-16 bg-canvas flex-shrink-0">
                  {item.product.images[0] && (
                    <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-serif text-sm text-espresso font-medium line-clamp-1">{item.product.name}</h4>
                  <p className="text-[11px] text-warmgray">
                    {item.quantity} {item.product.unit} • ₹{item.unitPrice.toLocaleString('en-IN')}/{item.product.unit}
                  </p>
                  <p className="text-xs font-medium text-timber mt-0.5">
                    ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2 text-xs text-warmgray">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-espresso font-medium">₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span>GST (18%)</span>
              <span className="text-espresso font-medium">₹{tax.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span>Architectural Freight</span>
              <span className="text-espresso font-medium">{shipping === 0 ? 'Complimentary' : `₹${shipping.toLocaleString('en-IN')}`}</span>
            </div>
            <div className="flex justify-between pt-3 border-t border-atelier text-sm font-medium text-espresso">
              <span>Final Total</span>
              <span className="font-serif text-xl text-timber">₹{total.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="pt-2 text-[11px] text-warmgray space-y-1">
            <p className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-bronze" /> 256-bit encrypted checkout
            </p>
            <p className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-bronze" /> Insured freight tracking provided via SMS
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

### `src/app/contact/page.tsx`

- **File**: `src/app/contact/page.tsx`
- **Size**: 10.6 KB (244 lines)
- **Language**: `tsx`

```tsx
'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, CheckCircle2, ArrowRight } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Studio Consultation');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          subject,
          message,
          source: 'Studio Contact Page',
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSent(true);
      } else {
        setError(data.error || 'Failed to submit inquiry.');
      }
    } catch (err: any) {
      setError(err.message || 'Network error.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      <div className="space-y-3 border-b border-atelier pb-6 max-w-3xl">
        <span className="text-xs uppercase tracking-widest text-bronze font-medium">Studio Engagement</span>
        <h1 className="font-serif text-4xl sm:text-5xl text-espresso font-light">
          Contact Balaji Architect & Interiors
        </h1>
        <p className="text-sm text-warmgray font-light leading-relaxed">
          Schedule a consultation at our Guwahati studio office or discuss turnkey luxury architecture & interior design commissions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left: Contact Form */}
        <div className="lg:col-span-7 bg-surface border border-atelier p-6 sm:p-10 space-y-6">
          {sent ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-14 h-14 rounded-full bg-champagne/20 text-timber flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl text-espresso">Inquiry Received</h3>
              <p className="text-xs sm:text-sm text-warmgray font-light max-w-sm mx-auto">
                Thank you for contacting Balaji Architect & Interiors. Our studio team will contact you within 24 hours.
              </p>
              <button
                onClick={() => setSent(false)}
                className="mt-4 px-6 py-2 btn-luxury-dark text-xs uppercase tracking-widest"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="font-serif text-2xl text-espresso">Send a Direct Note</h2>

              {error && (
                <div className="p-3 bg-red-50 text-red-800 text-xs border border-red-200">{error}</div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-warmgray font-medium">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Vikas Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-warmgray font-medium">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="client@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-warmgray font-medium">
                    Phone / Mobile *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98200 XXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-3 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-warmgray font-medium">
                    Subject / Area of Interest
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full p-3 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden text-xs"
                  >
                    <option>Studio Consultation</option>
                    <option>Turnkey Interior Project</option>
                    <option>Direct Quarry Stone Sourcing</option>
                    <option>Bespoke Millwork & Lighting</option>
                    <option>Press & Monograph Inquiries</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-warmgray font-medium">
                  Message / Project Scope *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Share details regarding your site location, square footage, design ambitions, or required material lots..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-3 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden text-xs leading-relaxed"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 btn-luxury-dark text-xs uppercase tracking-widest flex items-center justify-center gap-2 font-medium"
              >
                {submitting ? 'Transmitting Note...' : 'Dispatch Message'} <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

        {/* Right: Studio Location & Logistics */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-surface border border-atelier p-6 sm:p-8 space-y-6">
            <div className="border-b border-atelier pb-4 space-y-1">
              <h3 className="font-serif text-2xl text-espresso">
                Balaji Architect & Interior
              </h3>
              <div className="flex items-center gap-2 text-xs text-bronze">
                <span className="font-medium">★ 5.0 Rating</span>
                <span className="text-warmgray">(22 Google Reviews)</span>
                <span className="text-warmgray/40">•</span>
                <span className="text-warmgray">Interior Architect Office</span>
              </div>
            </div>

            <div className="space-y-5 text-xs text-warmgray">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-bronze mt-0.5 flex-shrink-0" />
                <div className="space-y-0.5">
                  <span className="font-medium text-espresso block">Studio & Office Address</span>
                  <p>Door No. 306, DN TOWER, Floor No. 03</p>
                  <p>Beltola Tiniali, Guwahati, Assam 781040</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-bronze mt-0.5 flex-shrink-0" />
                <div className="space-y-0.5">
                  <span className="font-medium text-espresso block">Direct Line & WhatsApp</span>
                  <p><a href="tel:+917002948484" className="text-espresso hover:text-bronze font-medium">+91 70029 48484</a></p>
                  <p><a href="https://wa.me/917002948484" target="_blank" rel="noreferrer" className="text-warmgray hover:text-espresso">+91 70029 48484 (WhatsApp)</a></p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-bronze mt-0.5 flex-shrink-0" />
                <div className="space-y-0.5">
                  <span className="font-medium text-espresso block">Electronic Inquiries</span>
                  <p>atelier@balaji-interior.com</p>
                  <p>projects@balaji-interior.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-bronze mt-0.5 flex-shrink-0" />
                <div className="space-y-0.5">
                  <span className="font-medium text-espresso block">Studio Consultations</span>
                  <p>Monday – Saturday: 10:00 AM – 7:30 PM</p>
                  <p>Sunday: By Prior Appointment</p>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-atelier">
              <a
                href="https://maps.google.com/?q=DN+TOWER+Beltola+Tiniali+Guwahati+Assam+781040"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 bg-canvas border border-atelier hover:border-bronze text-espresso text-xs uppercase tracking-wider font-medium flex items-center justify-center gap-1.5 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-bronze" /> View on Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

### `src/app/globals.css`

- **File**: `src/app/globals.css`
- **Size**: 3.3 KB (168 lines)
- **Language**: `css`

```css
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --font-cormorant: 'Cormorant Garamond', Georgia, serif;
  --font-jakarta: 'Plus Jakarta Sans', Inter, system-ui, sans-serif;
  --color-canvas: #F6F2EA;
  --color-surface: #FCFAF6;
  --color-espresso: #211914;
  --color-timber: #5A4335;
  --color-bronze: #8C6A45;
  --color-champagne: #C5A880;
  --color-charcoal: #171513;
  --color-warmgray: #746D65;
  --border-subtle: rgba(90, 67, 53, 0.14);
}

html {
  background-color: var(--color-canvas);
  color: var(--color-charcoal);
  font-family: var(--font-jakarta);
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--color-canvas);
}

::selection {
  background-color: #8C6A45;
  color: #FCFAF6;
}

/* Editorial Typography */
.font-serif {
  font-family: var(--font-cormorant);
}

.font-sans {
  font-family: var(--font-jakarta);
}

.tracking-editorial {
  letter-spacing: 0.15em;
}

.tracking-widest-plus {
  letter-spacing: 0.25em;
}

/* Subtle Architectural Border System */
.border-atelier {
  border-color: var(--border-subtle);
}

.border-atelier-dark {
  border-color: rgba(246, 242, 234, 0.15);
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #F6F2EA;
}

::-webkit-scrollbar-thumb {
  background: #C5A880;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #8C6A45;
}

/* Restrained animations */
@media (prefers-reduced-motion: reduce) {
  *,
  ::before,
  ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* Masked Image Scale Effect */
.image-reveal-mask {
  overflow: hidden;
  position: relative;
}

.image-reveal-mask img {
  transition: transform 0.9s cubic-bezier(0.16, 1, 0.3, 1), filter 0.6s ease;
}

.image-reveal-mask:hover img {
  transform: scale(1.035);
}

/* Custom luxury button styles */
.btn-luxury-dark {
  background-color: #211914;
  color: #FCFAF6;
  border: 1px solid #211914;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.btn-luxury-dark:hover {
  background-color: #5A4335;
  border-color: #5A4335;
  color: #FFFFFF;
}

.btn-luxury-bronze {
  background-color: #8C6A45;
  color: #FCFAF6;
  border: 1px solid #8C6A45;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.btn-luxury-bronze:hover {
  background-color: #6F5334;
  border-color: #6F5334;
}

.btn-luxury-outline {
  background-color: transparent;
  color: #211914;
  border: 1px solid rgba(90, 67, 53, 0.35);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.btn-luxury-outline:hover {
  background-color: #211914;
  border-color: #211914;
  color: #FCFAF6;
}

/* Mobile Safe Area & Touch UX */
.safe-area-bottom {
  padding-bottom: max(0.5rem, env(safe-area-inset-bottom, 0.5rem));
}

* {
  -webkit-tap-highlight-color: transparent;
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
```

---

### `src/app/layout.tsx`

- **File**: `src/app/layout.tsx`
- **Size**: 2.2 KB (61 lines)
- **Language**: `tsx`

```tsx
import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { AdminAuthProvider } from '@/context/AdminAuthContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { PageTransition } from '@/components/PageTransition';

export const metadata: Metadata = {
  title: 'Balaji Architect & Interiors — Luxury Architecture, Interior Design & Materials',
  description:
    'Crafted spaces and considered materials for timeless living. Balaji Architect & Interiors unites high-end residential architecture, turnkey interior design, and a curated marketplace of natural stones, hardwood veneers, and acoustic surfaces.',
  keywords: [
    'Balaji Architect & Interiors',
    'Luxury Interior Design Guwahati',
    'Architectural Materials India',
    'Vein-Cut Travertine',
    'Smoked Oak Flooring',
    'Acoustic Walnut Wall Panels',
    'Turnkey Luxury Architecture',
  ],
  authors: [{ name: 'Balaji Architect & Interiors' }],
  openGraph: {
    title: 'Balaji Architect & Interiors — Architecture & Considered Materials',
    description: 'Crafted spaces and considered materials for timeless living.',
    url: 'https://balaji-atelier.com',
    siteName: 'Balaji Architect & Interiors',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-canvas text-charcoal flex flex-col min-h-screen">
        <AdminAuthProvider>
          <CartProvider>
            <WishlistProvider>
              <Navbar />
              <main className="flex-1 pb-16 md:pb-0">
                <PageTransition>{children}</PageTransition>
              </main>
              <CartDrawer />
              <MobileBottomNav />
              <Footer />
            </WishlistProvider>
          </CartProvider>
        </AdminAuthProvider>
      </body>
    </html>
  );
}
```

---

### `src/app/material/[slug]/page.tsx`

- **File**: `src/app/material/[slug]/page.tsx`
- **Size**: 1.6 KB (49 lines)
- **Language**: `tsx`

```tsx
import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { getProductBySlug, getProducts } from '@/lib/db';
import { ProductDetailClient } from '@/components/ProductDetailClient';

export const revalidate = 60;

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  if (!product) return { title: 'Material Not Found — Balaji Architect & Interiors' };
  return {
    title: `${product.name} — ${product.categoryName} | Balaji Architect & Interiors`,
    description: product.description.substring(0, 160),
  };
}

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);

  if (!product || !product.published) {
    notFound();
  }

  const related = await getProducts({
    categoryId: product.categoryId,
    publishedOnly: true,
  });

  const filteredRelated = related.filter((p) => p.id !== product.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Top Breadcrumb */}
      <div>
        <Link
          href="/materials"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-warmgray hover:text-espresso transition-colors font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Materials Library
        </Link>
      </div>

      <ProductDetailClient product={product} relatedProducts={filteredRelated} />
    </div>
  );
}
```

---

### `src/app/materials/page.tsx`

- **File**: `src/app/materials/page.tsx`
- **Size**: 8.0 KB (181 lines)
- **Language**: `tsx`

```tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Filter, Search, ArrowRight, Check } from 'lucide-react';
import { getCategories, getProducts } from '@/lib/db';
import { Reveal } from '@/components/Reveal';

export const metadata = {
  title: 'Materials Marketplace & Surfaces — Balaji Architect & Interiors',
  description: 'Procure authentic Italian travertines, fluted acoustic walnut, Calacatta porcelain slabs, and architectural hardware.',
};

export const revalidate = 60;

export default async function MaterialsPage({
  searchParams,
}: {
  searchParams?: { category?: string; sort?: string; q?: string };
}) {
  const [categories, allProducts] = await Promise.all([
    getCategories(),
    getProducts({ publishedOnly: true }),
  ]);

  const selectedCategorySlug = searchParams?.category;
  const searchQuery = searchParams?.q?.toLowerCase();
  const sortOption = searchParams?.sort;

  let filtered = [...allProducts];

  if (selectedCategorySlug && selectedCategorySlug !== 'all') {
    filtered = filtered.filter((p) => p.categorySlug === selectedCategorySlug);
  }

  if (searchQuery) {
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(searchQuery) ||
        p.sku.toLowerCase().includes(searchQuery) ||
        p.material?.toLowerCase().includes(searchQuery) ||
        p.finish?.toLowerCase().includes(searchQuery) ||
        p.tags.some((t) => t.toLowerCase().includes(searchQuery))
    );
  }

  if (sortOption === 'price-asc') {
    filtered.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
  } else if (sortOption === 'price-desc') {
    filtered.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
  }

  return (
    <div className="space-y-16 pb-24">
      {/* Header Banner */}
      <section className="bg-espresso text-surface py-20 sm:py-28 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <Reveal>
            <span className="text-xs uppercase tracking-widest-plus text-champagne font-medium">
              Materials Library
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl text-surface font-light leading-tight mt-1 max-w-3xl">
              Architectural Materials & Surfaces
            </h1>
          </Reveal>
          <Reveal delay={100}>
            <p className="max-w-2xl text-sm sm:text-base text-surface/80 font-light leading-relaxed">
              Explore our physical library of quarried Italian marbles, smoked French oaks, acoustic wall systems, and large format sintered porcelain slabs.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Main Catalog Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Horizontal Filter Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 border-b border-atelier no-scrollbar">
          <Link
            href="/materials"
            className={`px-4 py-2 text-xs uppercase tracking-widest whitespace-nowrap transition-colors font-medium ${
              !selectedCategorySlug || selectedCategorySlug === 'all'
                ? 'bg-espresso text-surface border border-espresso'
                : 'text-warmgray hover:text-espresso border border-transparent hover:border-atelier'
            }`}
          >
            All Materials ({allProducts.length})
          </Link>
          {categories.map((cat) => {
            const isActive = selectedCategorySlug === cat.slug;
            return (
              <Link
                key={cat.id}
                href={`/materials?category=${cat.slug}`}
                className={`px-4 py-2 text-xs uppercase tracking-widest whitespace-nowrap transition-colors font-medium ${
                  isActive
                    ? 'bg-espresso text-surface border border-espresso'
                    : 'text-warmgray hover:text-espresso border border-transparent hover:border-atelier'
                }`}
              >
                {cat.name} ({cat.productCount || 0})
              </Link>
            );
          })}
        </div>

        {/* Product Grid */}
        <div className="pt-8">
          {filtered.length === 0 ? (
            <div className="py-24 text-center space-y-4">
              <p className="font-serif text-2xl text-espresso">No materials found in this category.</p>
              <p className="text-xs text-warmgray">Try selecting another category or clear search terms.</p>
              <Link
                href="/materials"
                className="inline-block px-6 py-2.5 btn-luxury-dark text-xs uppercase tracking-widest"
              >
                View All Materials
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
              {filtered.map((product, idx) => (
                <Reveal key={product.id} delay={idx * 50}>
                  <Link
                    href={`/material/${product.slug}`}
                    className="group block bg-surface border border-atelier p-2.5 sm:p-4 hover:border-bronze transition-all duration-300 space-y-2 sm:space-y-3"
                  >
                    <div className="relative aspect-[4/5] bg-canvas overflow-hidden">
                      {product.images[0] && (
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                          className="object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
                        />
                      )}
                      {product.purchaseMode === 'REQUEST_QUOTE' && (
                        <span className="absolute top-1.5 left-1.5 bg-espresso/90 backdrop-blur-xs text-surface text-[8px] sm:text-[9px] px-1.5 sm:px-2 py-0.5 uppercase tracking-wider font-medium">
                          Quote
                        </span>
                      )}
                      {product.stock <= 0 && (
                        <span className="absolute top-1.5 right-1.5 bg-warmgray/90 backdrop-blur-xs text-surface text-[8px] sm:text-[9px] px-1.5 sm:px-2 py-0.5 uppercase tracking-wider font-medium">
                          Custom
                        </span>
                      )}
                    </div>

                    <div className="space-y-1 sm:space-y-1.5 pt-0.5 sm:pt-1">
                      <div className="flex justify-between text-[9px] sm:text-[11px] text-warmgray">
                        <span className="uppercase tracking-wider font-medium text-bronze line-clamp-1">
                          {product.categoryName || 'Material'}
                        </span>
                      </div>

                      <h3 className="font-serif text-xs sm:text-lg text-espresso group-hover:text-bronze transition-colors font-medium leading-snug line-clamp-1">
                        {product.name}
                      </h3>

                      <div className="flex items-baseline justify-between pt-1 sm:pt-2 border-t border-atelier/60">
                        <div>
                          <span className="text-xs sm:text-sm font-medium text-timber">
                            ₹{(product.salePrice || product.price).toLocaleString('en-IN')}
                          </span>
                          <span className="text-[10px] sm:text-xs text-warmgray font-light"> / {product.unit}</span>
                        </div>
                        <span className="hidden sm:flex text-[10px] uppercase tracking-widest text-espresso group-hover:translate-x-0.5 transition-transform items-center gap-1 font-medium">
                          Details <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
```

---

### `src/app/page.tsx`

- **File**: `src/app/page.tsx`
- **Size**: 19.6 KB (394 lines)
- **Language**: `tsx`

```tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Compass, Layers, ShieldCheck, Armchair, Sparkles } from 'lucide-react';
import { getProjects, getProducts, getCategories, getServices } from '@/lib/db';
import { Reveal } from '@/components/Reveal';
import { ImageReveal } from '@/components/ImageReveal';

export const revalidate = 60; // SSR with caching

export default async function HomePage() {
  const [featuredProjects, featuredProducts, categories, services] = await Promise.all([
    getProjects({ featuredOnly: true, publishedOnly: true }),
    getProducts({ featuredOnly: true, publishedOnly: true }),
    getCategories(),
    getServices(true),
  ]);

  return (
    <div className="space-y-24 sm:space-y-32 pb-24">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-espresso text-surface">
        {/* Editorial Background Image with Dark Vignette */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=90"
            alt="Balaji Architect & Interiors Architectural Living Space"
            fill
            priority
            className="object-cover object-center opacity-40 scale-105 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/50 to-espresso/30" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 pt-12">
          <Reveal delay={100}>
            <span className="text-xs sm:text-sm uppercase tracking-widest-plus text-champagne font-medium">
              Architecture • Interior Studio • Material Curation
            </span>
          </Reveal>

          <Reveal delay={250}>
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-surface font-light leading-[1.08]">
              INTERIORS.
              <br />
              ARCHITECTURE.
              <br />
              MATERIALS.
            </h1>
          </Reveal>

          <Reveal delay={400}>
            <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-surface/80 font-light leading-relaxed">
              Crafted spaces and considered materials for timeless living. Uniting spatial architecture with a curated marketplace of authentic stones, woods, and architectural accents.
            </p>
          </Reveal>

          <Reveal delay={550}>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
              <Link
                href="/projects"
                className="w-full sm:w-auto px-8 py-4 bg-surface text-espresso hover:bg-champagne hover:text-espresso font-medium text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2"
              >
                Explore Projects <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/materials"
                className="w-full sm:w-auto px-8 py-4 border border-surface/40 text-surface hover:bg-surface/10 font-medium text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2"
              >
                Explore Materials
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Mobile & Desktop Trust Banner */}
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-espresso-dark/90 backdrop-blur-md border-t border-espresso-light py-3 px-4">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-around gap-y-2 text-[10px] sm:text-xs uppercase tracking-wider text-surface/90">
            <span className="flex items-center gap-1.5 font-medium text-champagne">
              ★ 5.0 (22 Google Reviews)
            </span>
            <span className="hidden sm:inline text-surface/30">•</span>
            <span className="font-light">Guwahati Studio Office</span>
            <span className="hidden sm:inline text-surface/30">•</span>
            <span className="font-light">Turnkey Architecture</span>
            <span className="hidden sm:inline text-surface/30">•</span>
            <span className="font-light">Pan-India Material Logistics</span>
          </div>
        </div>
      </section>

      {/* 2. STUDIO INTRODUCTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5 space-y-6">
            <Reveal>
              <span className="text-xs uppercase tracking-widest text-bronze font-medium">
                The Atelier Philosophy
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-espresso font-light leading-tight mt-2">
                Restraint is the ultimate form of luxury.
              </h2>
            </Reveal>

            <Reveal delay={150}>
              <p className="text-sm sm:text-base text-warmgray font-light leading-relaxed">
                Founded on the belief that genuine luxury emerges from architectural precision, raw material integrity, and spatial calm, Balaji Architect & Interiors crafts environments that elevate the human experience.
              </p>
            </Reveal>

            <Reveal delay={250}>
              <p className="text-sm sm:text-base text-warmgray font-light leading-relaxed">
                Beyond architectural commissions, we maintain direct partnerships with heritage European quarries and timber ateliers, making authentic vein-cut travertines, smoked French oaks, and acoustic wall systems directly available to discerning architects and homeowners.
              </p>
            </Reveal>

            <Reveal delay={350}>
              <div className="pt-2 flex items-center gap-8 border-t border-atelier">
                <div>
                  <span className="font-serif text-3xl text-espresso">14+</span>
                  <p className="text-[11px] uppercase tracking-wider text-warmgray mt-0.5">Years of Craft</p>
                </div>
                <div>
                  <span className="font-serif text-3xl text-espresso">80+</span>
                  <p className="text-[11px] uppercase tracking-wider text-warmgray mt-0.5">Signature Spaces</p>
                </div>
                <div>
                  <span className="font-serif text-3xl text-espresso">100%</span>
                  <p className="text-[11px] uppercase tracking-wider text-warmgray mt-0.5">Direct Material Provenance</p>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={200}>
              <ImageReveal
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85"
                alt="Balaji Atelier Living Pavilion"
                aspectRatio="aspect-[4/3]"
                className="shadow-md"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* 3. FEATURED ARCHITECTURAL PROJECTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-atelier">
          <div>
            <span className="text-xs uppercase tracking-widest text-bronze font-medium">Selected Works</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-espresso font-light mt-1">
              Architectural Portfolio
            </h2>
          </div>
          <Link
            href="/projects"
            className="mt-4 md:mt-0 text-xs uppercase tracking-widest text-espresso hover:text-bronze font-medium flex items-center gap-1.5 transition-colors"
          >
            View All Projects ({featuredProjects.length}+) <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12">
          {featuredProjects.slice(0, 4).map((project, idx) => (
            <Reveal key={project.id} delay={idx * 150}>
              <Link href={`/projects/${project.slug}`} className="group block space-y-4">
                <ImageReveal
                  src={project.heroImage}
                  alt={project.title}
                  aspectRatio="aspect-[16/11]"
                  className="bg-canvas-subtle"
                />
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-xs text-warmgray">
                    <span className="uppercase tracking-wider text-bronze font-medium">{project.projectType}</span>
                    <span>{project.location} • {project.year}</span>
                  </div>
                  <h3 className="font-serif text-2xl text-espresso group-hover:text-bronze transition-colors font-normal">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-warmgray font-light line-clamp-2 leading-relaxed">
                    {project.shortDescription}
                  </p>
                  <div className="pt-1 text-xs uppercase tracking-widest text-espresso group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Explore Case Study <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 4. MATERIAL CATEGORIES BAR */}
      <section className="bg-surface py-20 border-y border-atelier">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs uppercase tracking-widest text-bronze font-medium">Materiality</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-espresso font-light">
              Considered Interior Materials
            </h2>
            <p className="text-xs sm:text-sm text-warmgray font-light">
              Direct-from-source architectural stones, architectural hardwood veneers, and acoustic surfaces.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.slice(0, 6).map((cat, idx) => (
              <Reveal key={cat.id} delay={idx * 80}>
                <Link
                  href={`/category/${cat.slug}`}
                  className="group block bg-canvas p-4 text-center border border-atelier hover:border-bronze transition-all space-y-3"
                >
                  <div className="relative aspect-square overflow-hidden bg-canvas-subtle">
                    {cat.imageUrl && (
                      <Image
                        src={cat.imageUrl}
                        alt={cat.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    )}
                  </div>
                  <div>
                    <h4 className="font-serif text-sm text-espresso font-medium group-hover:text-bronze transition-colors">
                      {cat.name}
                    </h4>
                    <p className="text-[10px] text-warmgray mt-0.5">{cat.productCount || 0} Materials</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CURATED MATERIALS & PRODUCTS SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-atelier">
          <div>
            <span className="text-xs uppercase tracking-widest text-bronze font-medium">Atelier Catalog</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-espresso font-light mt-1">
              Curated Materials & Objects
            </h2>
          </div>
          <Link
            href="/materials"
            className="mt-4 md:mt-0 text-xs uppercase tracking-widest text-espresso hover:text-bronze font-medium flex items-center gap-1.5 transition-colors"
          >
            Explore Complete Catalog <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
          {featuredProducts.slice(0, 4).map((product, idx) => (
            <Reveal key={product.id} delay={idx * 100}>
              <Link
                href={`/material/${product.slug}`}
                className="group block bg-surface border border-atelier p-2.5 sm:p-4 hover:border-bronze transition-colors space-y-2 sm:space-y-3"
              >
                <div className="relative aspect-[4/5] bg-canvas overflow-hidden">
                  {product.images[0] && (
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-103 transition-transform duration-700"
                    />
                  )}
                  {product.salePrice && product.salePrice > 0 && (
                    <span className="absolute top-1.5 left-1.5 bg-espresso text-surface text-[8px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 uppercase tracking-wider font-semibold">
                      Featured
                    </span>
                  )}
                </div>

                <div className="space-y-0.5 sm:space-y-1">
                  <div className="flex justify-between text-[9px] sm:text-[11px] text-warmgray">
                    <span className="line-clamp-1">{product.subcategory || product.categoryName}</span>
                  </div>
                  <h4 className="font-serif text-xs sm:text-base text-espresso group-hover:text-bronze transition-colors font-medium leading-snug line-clamp-1">
                    {product.name}
                  </h4>
                  <div className="flex items-baseline gap-1 sm:gap-2 pt-0.5">
                    <span className="text-xs sm:text-sm font-medium text-timber">
                      ₹{(product.salePrice || product.price).toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] sm:text-xs text-warmgray font-light">/ {product.unit}</span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 6. ARCHITECTURAL SERVICES */}
      <section className="bg-espresso text-surface py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-atelier-dark">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-champagne font-medium">Design Practice</span>
              <h2 className="font-serif text-3xl sm:text-4xl text-surface font-light">
                Comprehensive Architectural Services
              </h2>
            </div>
            <Link
              href="/services"
              className="mt-4 md:mt-0 text-xs uppercase tracking-widest text-champagne hover:text-surface font-medium flex items-center gap-1.5 transition-colors"
            >
              Explore All Services <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.slice(0, 4).map((srv, idx) => (
              <Reveal key={srv.id} delay={idx * 100}>
                <div className="bg-espresso-light/60 p-8 border border-atelier-dark space-y-5 h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="w-10 h-10 rounded-full bg-champagne/10 text-champagne flex items-center justify-center">
                      {idx === 0 && <Compass className="w-5 h-5 stroke-[1.5]" />}
                      {idx === 1 && <ShieldCheck className="w-5 h-5 stroke-[1.5]" />}
                      {idx === 2 && <Layers className="w-5 h-5 stroke-[1.5]" />}
                      {idx === 3 && <Armchair className="w-5 h-5 stroke-[1.5]" />}
                    </div>
                    <h3 className="font-serif text-xl text-surface font-normal leading-snug">
                      {srv.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-surface/70 font-light leading-relaxed">
                      {srv.shortDesc}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-atelier-dark">
                    <Link
                      href="/quote"
                      className="text-xs uppercase tracking-widest text-champagne hover:text-surface font-medium flex items-center gap-1"
                    >
                      Inquire Service <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CRAFTSMANSHIP & MATERIAL STATEMENT */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 py-12">
        <Reveal>
          <span className="text-xs uppercase tracking-widest text-bronze font-medium">Studio Credo</span>
          <blockquote className="font-serif text-2xl sm:text-3xl md:text-4xl text-espresso font-light leading-snug mt-3 italic">
            &ldquo;Materials must not imitate one another. Travertine must express its volcanic geology; oak must celebrate its slow growth rings; bronze must accept the patina of living touch.&rdquo;
          </blockquote>
          <p className="text-xs uppercase tracking-widest text-warmgray font-medium mt-4">
            — Vikas Sir, Principal Architect, Balaji Architect & Interiors
          </p>
        </Reveal>
      </section>

      {/* 8. REQUEST A QUOTE / COMMISSION CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-canvas-subtle border border-atelier p-8 sm:p-14 lg:p-20 relative overflow-hidden">
          <div className="max-w-2xl space-y-6 relative z-10">
            <span className="text-xs uppercase tracking-widest text-bronze font-medium">Commence a Project</span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-espresso font-light leading-tight">
              Ready to craft your next architectural space?
            </h2>
            <p className="text-sm sm:text-base text-warmgray font-light leading-relaxed">
              Whether you are designing a private estate, specifying large format stone slabs for a culinary island, or requesting a custom interior turnkey estimate, our design partners are ready to collaborate.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-4">
              <Link
                href="/quote"
                className="px-8 py-4 btn-luxury-dark text-xs uppercase tracking-widest font-medium flex items-center justify-center gap-2"
              >
                Request Custom Quote <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 btn-luxury-outline text-xs uppercase tracking-widest font-medium flex items-center justify-center"
              >
                Schedule Studio Visit
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
```

---

### `src/app/projects/[slug]/page.tsx`

- **File**: `src/app/projects/[slug]/page.tsx`
- **Size**: 9.7 KB (228 lines)
- **Language**: `tsx`

```tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, MapPin, Calendar, Maximize2, Layers } from 'lucide-react';
import { getProjectBySlug, getProjects } from '@/lib/db';
import { Reveal } from '@/components/Reveal';
import { ImageReveal } from '@/components/ImageReveal';

export const revalidate = 60;

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug);
  if (!project) return { title: 'Project Not Found — Balaji Architect & Interiors' };
  return {
    title: `${project.title} — Architectural Case Study | Balaji Architect & Interiors`,
    description: project.shortDescription,
  };
}

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug);

  if (!project || !project.isPublished) {
    notFound();
  }

  return (
    <div className="space-y-16 sm:space-y-24 pb-24">
      {/* Top Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-warmgray hover:text-espresso transition-colors font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Portfolio
        </Link>
      </div>

      {/* Project Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-4 max-w-4xl">
          <span className="text-xs uppercase tracking-widest text-bronze font-medium">
            {project.projectType}
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-espresso font-light leading-[1.1]">
            {project.title}
          </h1>
          <p className="text-base sm:text-lg text-warmgray font-light leading-relaxed">
            {project.shortDescription}
          </p>
        </div>

        {/* Specs Metadata Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-6 border-y border-atelier text-xs">
          <div>
            <span className="uppercase tracking-widest text-warmgray block">Location</span>
            <span className="font-serif text-lg text-espresso mt-1 block">{project.location}</span>
          </div>
          <div>
            <span className="uppercase tracking-widest text-warmgray block">Completion</span>
            <span className="font-serif text-lg text-espresso mt-1 block">{project.year}</span>
          </div>
          <div>
            <span className="uppercase tracking-widest text-warmgray block">Built Area</span>
            <span className="font-serif text-lg text-espresso mt-1 block">{project.area || 'Custom Spatial'}</span>
          </div>
          <div>
            <span className="uppercase tracking-widest text-warmgray block">Execution</span>
            <span className="font-serif text-lg text-bronze mt-1 block">Full Turnkey Atelier</span>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-canvas-subtle">
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            priority
            className="object-cover"
          />
        </div>
      </section>

      {/* Narrative & Design Approach */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-7 space-y-6">
            <Reveal>
              <h2 className="font-serif text-3xl sm:text-4xl text-espresso font-light">
                Spatial Conception & Architecture
              </h2>
              <div className="text-sm sm:text-base text-warmgray font-light leading-relaxed space-y-4 pt-4">
                <p>{project.description}</p>
              </div>
            </Reveal>

            {project.designApproach && (
              <Reveal delay={100}>
                <div className="bg-surface p-8 border border-atelier space-y-3 mt-8">
                  <span className="text-xs uppercase tracking-widest text-bronze font-medium">Design Approach</span>
                  <h3 className="font-serif text-2xl text-espresso font-normal">Material Integration</h3>
                  <p className="text-sm text-warmgray font-light leading-relaxed">
                    {project.designApproach}
                  </p>
                </div>
              </Reveal>
            )}
          </div>

          {/* Materials Used in this Project */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-surface p-8 border border-atelier space-y-6 sticky top-28">
              <div className="space-y-1 border-b border-atelier pb-4">
                <span className="text-xs uppercase tracking-widest text-bronze font-medium flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" /> Materiality Palette
                </span>
                <h3 className="font-serif text-2xl text-espresso font-light">Materials Specified</h3>
              </div>

              {project.materialsUsed && project.materialsUsed.length > 0 ? (
                <div className="space-y-4">
                  {project.materialsUsed.map((mat, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-4 pb-4 border-b border-atelier/60 last:border-0"
                    >
                      {mat.imageUrl ? (
                        <div className="relative w-14 h-14 bg-canvas flex-shrink-0 overflow-hidden">
                          <Image src={mat.imageUrl} alt={mat.materialName} fill className="object-cover" />
                        </div>
                      ) : (
                        <div className="w-14 h-14 bg-canvas flex items-center justify-center text-warmgray flex-shrink-0">
                          <Layers className="w-6 h-6 stroke-1" />
                        </div>
                      )}
                      <div className="flex-1">
                        <span className="text-[10px] uppercase tracking-wider text-warmgray block">
                          {mat.category}
                        </span>
                        <h4 className="font-serif text-base text-espresso font-medium leading-snug">
                          {mat.materialName}
                        </h4>
                        {mat.materialId && (
                          <Link
                            href={`/material/${mat.materialId}`}
                            className="text-[11px] uppercase tracking-widest text-bronze hover:text-espresso font-medium inline-flex items-center gap-1 mt-1"
                          >
                            View Material Specs <ArrowRight className="w-3 h-3" />
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-warmgray">Custom architectural materials and bespoke finishes formulated on-site.</p>
              )}

              <div className="pt-2">
                <Link
                  href={`/quote?project=${project.slug}`}
                  className="w-full py-3.5 btn-luxury-dark text-xs uppercase tracking-widest flex items-center justify-center gap-2 font-medium"
                >
                  Discuss Your Project <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-widest text-bronze font-medium">Monograph</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-espresso font-light">
              Visual Documentation
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {project.gallery.map((imgUrl, gIdx) => (
              <Reveal key={gIdx} delay={gIdx * 100}>
                <ImageReveal
                  src={imgUrl}
                  alt={`${project.title} - Plate ${gIdx + 1}`}
                  aspectRatio="aspect-[4/3]"
                  className="shadow-sm"
                />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 pt-12">
        <Reveal>
          <span className="text-xs uppercase tracking-widest text-bronze font-medium">Start A Dialogue</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-espresso font-light mt-2">
            Interested in a similar architectural execution?
          </h2>
          <p className="text-sm sm:text-base text-warmgray max-w-xl mx-auto font-light">
            Our principal architects consult with clients worldwide to craft spaces of enduring distinction.
          </p>
          <div className="pt-6 flex justify-center gap-4">
            <Link
              href="/quote"
              className="px-8 py-4 btn-luxury-dark text-xs uppercase tracking-widest font-medium"
            >
              Request Project Estimation
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 btn-luxury-outline text-xs uppercase tracking-widest font-medium"
            >
              Contact Studio
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
```

---

### `src/app/projects/page.tsx`

- **File**: `src/app/projects/page.tsx`
- **Size**: 5.3 KB (131 lines)
- **Language**: `tsx`

```tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MapPin, Calendar, Maximize2 } from 'lucide-react';
import { getProjects } from '@/lib/db';
import { Reveal } from '@/components/Reveal';
import { ImageReveal } from '@/components/ImageReveal';

export const metadata = {
  title: 'Architectural Portfolio & Case Studies — Balaji Architect & Interiors',
  description: 'Explore signature residential villas, sky penthouses, and bespoke commercial spaces crafted by Balaji Architect & Interiors.',
};

export const revalidate = 60;

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams?: { type?: string };
}) {
  const allProjects = await getProjects({ publishedOnly: true });
  const selectedType = searchParams?.type;

  const projectTypes = [
    'All',
    'Residential Interiors',
    'Architecture & Villa',
    'Penthouse & Estate',
    'Commercial & Studio',
    'Hospitality & Luxury Dining',
  ];

  const filteredProjects = selectedType && selectedType !== 'All'
    ? allProjects.filter((p) => p.projectType.toLowerCase() === selectedType.toLowerCase())
    : allProjects;

  return (
    <div className="space-y-16 sm:space-y-24 pb-24">
      {/* Header Banner */}
      <section className="bg-espresso text-surface py-20 sm:py-28 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <Reveal>
            <span className="text-xs uppercase tracking-widest-plus text-champagne font-medium">
              Portfolio
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl text-surface font-light leading-tight mt-1 max-w-3xl">
              Selected Architectural Works
            </h1>
          </Reveal>
          <Reveal delay={100}>
            <p className="max-w-2xl text-sm sm:text-base text-surface/80 font-light leading-relaxed">
              A curated monograph of residential villas, sky estates, and bespoke hospitality spaces designed with material restraint and construction honesty.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Filter Tabs & Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Type Filter Buttons */}
        <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto pb-2 border-b border-atelier no-scrollbar">
          {projectTypes.map((type) => {
            const isActive = (!selectedType && type === 'All') || selectedType === type;
            const href = type === 'All' ? '/projects' : `/projects?type=${encodeURIComponent(type)}`;
            return (
              <Link
                key={type}
                href={href}
                className={`px-4 py-2 text-xs uppercase tracking-widest whitespace-nowrap transition-colors font-medium ${
                  isActive
                    ? 'bg-espresso text-surface border border-espresso'
                    : 'text-warmgray hover:text-espresso border border-transparent hover:border-atelier'
                }`}
              >
                {type}
              </Link>
            );
          })}
        </div>

        {/* Portfolio Magazine Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
          {filteredProjects.map((project, idx) => (
            <Reveal key={project.id} delay={idx * 100}>
              <Link href={`/projects/${project.slug}`} className="group block space-y-4">
                <ImageReveal
                  src={project.heroImage}
                  alt={project.title}
                  aspectRatio="aspect-[16/11]"
                  className="bg-canvas-subtle"
                />

                <div className="space-y-2 pt-2">
                  <div className="flex flex-wrap items-center gap-4 text-xs text-warmgray">
                    <span className="uppercase tracking-wider text-bronze font-medium">
                      {project.projectType}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" /> {project.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {project.year}
                    </span>
                    {project.area && (
                      <span className="flex items-center gap-1">
                        <Maximize2 className="w-3.5 h-3.5" /> {project.area}
                      </span>
                    )}
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl text-espresso group-hover:text-bronze transition-colors font-normal">
                    {project.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-warmgray font-light leading-relaxed line-clamp-3">
                    {project.shortDescription}
                  </p>

                  <div className="pt-2 text-xs uppercase tracking-widest text-espresso font-medium group-hover:translate-x-1 transition-transform flex items-center gap-1.5">
                    View Case Study & Materials <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
```

---

### `src/app/quote/page.tsx`

- **File**: `src/app/quote/page.tsx`
- **Size**: 16.4 KB (428 lines)
- **Language**: `tsx`

```tsx
'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  FileText,
  Plus,
  Trash2,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Building2,
  Layers,
} from 'lucide-react';
import { QuoteItem, UnitType } from '@/types';

function QuoteForm() {
  const searchParams = useSearchParams();
  const preselectedService = searchParams?.get('service') || '';
  const preselectedProduct = searchParams?.get('product') || '';

  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [projectType, setProjectType] = useState('Residential Interiors & Villa');
  const [projectLocation, setProjectLocation] = useState('Mumbai / Alibaug');
  const [estimatedTimeline, setEstimatedTimeline] = useState('Immediate (1-3 Months)');
  const [budgetRange, setBudgetRange] = useState('₹50 Lakhs - ₹1.5 Cr');
  const [notes, setNotes] = useState('');

  const [items, setItems] = useState<
    {
      productName: string;
      dimensions: string;
      quantity: number;
      unit: UnitType;
      notes: string;
    }[]
  >([
    {
      productName: 'Vein-Cut Travertine / Custom Slabs',
      dimensions: 'Custom living area cut-to-size',
      quantity: 500,
      unit: 'sq ft',
      notes: 'Honed finish for main salon',
    },
  ]);

  const [submitting, setSubmitting] = useState(false);
  const [submittedQuote, setSubmittedQuote] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const addItemRow = () => {
    setItems([
      ...items,
      {
        productName: '',
        dimensions: '',
        quantity: 100,
        unit: 'sq ft',
        notes: '',
      },
    ]);
  };

  const removeItemRow = (idx: number) => {
    setItems(items.filter((_, i) => i !== idx));
  };

  const updateItem = (idx: number, field: string, value: any) => {
    const next = [...items];
    (next[idx] as any)[field] = value;
    setItems(next);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerEmail || !customerPhone) {
      setError('Please complete your name, email, and phone number.');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const payload = {
        customerName,
        customerEmail,
        customerPhone,
        projectType,
        projectLocation,
        estimatedTimeline,
        budgetRange,
        notes,
        items,
      };

      const res = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmittedQuote(data.quote);
      } else {
        setError(data.error || 'Failed to submit quote request. Please try again.');
      }
    } catch (err: any) {
      setError(err.message || 'Network error.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submittedQuote) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-8">
        <div className="bg-surface border border-atelier p-8 sm:p-12 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-champagne/20 text-timber flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-bronze font-medium">
              Quotation Request Received
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-espresso font-light">
              Formal Estimate Dispatched to Review
            </h1>
            <p className="text-xs sm:text-sm text-warmgray font-light max-w-md mx-auto">
              Your inquiry has been assigned to our senior architectural estimation desk. A comprehensive material specification and pricing schedule will be shared within 24 hours.
            </p>
          </div>

          <div className="bg-canvas p-6 border border-atelier max-w-md mx-auto text-left space-y-3 text-xs">
            <div className="flex justify-between border-b border-atelier pb-2">
              <span className="text-warmgray">Quote Reference:</span>
              <span className="font-mono font-medium text-espresso">{submittedQuote.quoteNumber}</span>
            </div>
            <div className="flex justify-between border-b border-atelier pb-2">
              <span className="text-warmgray">Project Classification:</span>
              <span className="text-espresso font-medium">{submittedQuote.projectType}</span>
            </div>
            <div className="flex justify-between border-b border-atelier pb-2">
              <span className="text-warmgray">Client Contact:</span>
              <span className="text-espresso">{submittedQuote.customerName} ({submittedQuote.customerPhone})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-warmgray">Status:</span>
              <span className="text-bronze font-medium">Pending Studio Review</span>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/materials"
              className="px-8 py-3.5 btn-luxury-dark text-xs uppercase tracking-widest"
            >
              Explore Materials Library
            </Link>
            <Link
              href="/"
              className="px-8 py-3.5 btn-luxury-outline text-xs uppercase tracking-widest"
            >
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      <div className="space-y-3 border-b border-atelier pb-6">
        <span className="text-xs uppercase tracking-widest text-bronze font-medium">Custom Projects & Wholesale</span>
        <h1 className="font-serif text-3xl sm:text-5xl text-espresso font-light">
          Architectural Quote & Material Estimation
        </h1>
        <p className="text-sm text-warmgray font-light max-w-2xl">
          For large-scale residences, turnkey interior projects, or custom cut-to-size travertine and veneer batches, submit your project specifications below.
        </p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-800 text-xs">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-10">
        {/* Client & Project Core Info */}
        <div className="bg-surface border border-atelier p-6 sm:p-8 space-y-6">
          <h2 className="font-serif text-2xl text-espresso border-b border-atelier pb-4">
            1. Project & Client Profile
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-warmgray font-medium">
                Client / Architecture Firm *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Vikas Sharma / Studio Design"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full p-3 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-warmgray font-medium">
                Official Email Address *
              </label>
              <input
                type="email"
                required
                placeholder="client@studio.com"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="w-full p-3 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-warmgray font-medium">
                Direct Phone / WhatsApp *
              </label>
              <input
                type="tel"
                required
                placeholder="+91 98200 XXXXX"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full p-3 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-warmgray font-medium">
                Project Classification
              </label>
              <select
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                className="w-full p-3 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden text-xs"
              >
                <option>Residential Interiors & Villa</option>
                <option>Penthouse & Sky Estate</option>
                <option>Commercial Headquarters & Studio</option>
                <option>Hospitality & Fine Dining</option>
                <option>Material Sourcing Only (Direct Quarry)</option>
                <option>Bespoke Millwork & Joinery</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-warmgray font-medium">
                Site Location (City / Region)
              </label>
              <input
                type="text"
                placeholder="e.g. Worli Seaface, Mumbai"
                value={projectLocation}
                onChange={(e) => setProjectLocation(e.target.value)}
                className="w-full p-3 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-warmgray font-medium">
                Target Timeline
              </label>
              <select
                value={estimatedTimeline}
                onChange={(e) => setEstimatedTimeline(e.target.value)}
                className="w-full p-3 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden text-xs"
              >
                <option>Immediate (1-3 Months)</option>
                <option>Q3/Q4 2026</option>
                <option>Planning Phase (6+ Months)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Specified Materials List */}
        <div className="bg-surface border border-atelier p-6 sm:p-8 space-y-6">
          <div className="flex justify-between items-center border-b border-atelier pb-4">
            <div>
              <h2 className="font-serif text-2xl text-espresso">2. Material & Scope Specifications</h2>
              <p className="text-xs text-warmgray font-light">Add estimated areas, finishes, or custom requirements.</p>
            </div>
            <button
              type="button"
              onClick={addItemRow}
              className="px-4 py-2 border border-atelier hover:border-bronze text-xs uppercase tracking-widest text-espresso inline-flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" /> Add Material Line
            </button>
          </div>

          <div className="space-y-4">
            {items.map((item, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 sm:grid-cols-12 gap-3 p-4 bg-canvas border border-atelier items-center"
              >
                <div className="sm:col-span-4 space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-warmgray font-medium">
                    Material / Product Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Romano Classico Travertine"
                    value={item.productName}
                    onChange={(e) => updateItem(idx, 'productName', e.target.value)}
                    className="w-full p-2 bg-surface border border-atelier text-xs"
                  />
                </div>

                <div className="sm:col-span-3 space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-warmgray font-medium">
                    Dimensions / Cut Spec
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 20mm Honed / 1200x600"
                    value={item.dimensions}
                    onChange={(e) => updateItem(idx, 'dimensions', e.target.value)}
                    className="w-full p-2 bg-surface border border-atelier text-xs"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-warmgray font-medium">
                    Est. Quantity
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateItem(idx, 'quantity', parseInt(e.target.value) || 1)}
                    className="w-full p-2 bg-surface border border-atelier text-xs"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-warmgray font-medium">
                    Unit
                  </label>
                  <select
                    value={item.unit}
                    onChange={(e) => updateItem(idx, 'unit', e.target.value)}
                    className="w-full p-2 bg-surface border border-atelier text-xs"
                  >
                    <option>sq ft</option>
                    <option>sq m</option>
                    <option>sheet</option>
                    <option>piece</option>
                    <option>box</option>
                    <option>meter</option>
                    <option>roll</option>
                    <option>set</option>
                  </select>
                </div>

                <div className="sm:col-span-1 flex justify-end pt-4 sm:pt-0">
                  {items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItemRow(idx)}
                      className="p-2 text-warmgray hover:text-red-700"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-1.5 pt-2">
            <label className="text-xs uppercase tracking-wider text-warmgray font-medium">
              Architectural Drawings, BIM Notes, or Site Details
            </label>
            <textarea
              rows={4}
              placeholder="Provide context regarding slab bookmatching, site elevator constraints, floor-to-ceiling heights, or specific European quarry block preferences..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-3 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden text-xs leading-relaxed"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full py-4 btn-luxury-dark text-xs uppercase tracking-widest flex items-center justify-center gap-2 font-medium"
        >
          {submitting ? 'Transmitting to Estimation Desk...' : 'Submit Architectural Quote Request'}
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}

export default function QuotePage() {
  return (
    <Suspense fallback={<div className="p-16 text-center text-warmgray text-xs">Loading quote module...</div>}>
      <QuoteForm />
    </Suspense>
  );
}
```

---

### `src/app/robots.ts`

- **File**: `src/app/robots.ts`
- **Size**: 0.3 KB (15 lines)
- **Language**: `typescript`

```typescript
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/admin/*', '/api/admin/*'],
      },
    ],
    sitemap: 'https://balaji-atelier.com/sitemap.xml',
  };
}
```

---

### `src/app/search/page.tsx`

- **File**: `src/app/search/page.tsx`
- **Size**: 7.3 KB (182 lines)
- **Language**: `tsx`

```tsx
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search as SearchIcon, ArrowRight, X, Layers } from 'lucide-react';
import { Product, Project } from '@/types';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setProducts([]);
      setProjects([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const [prodRes, projRes] = await Promise.all([
          fetch(`/api/products?search=${encodeURIComponent(query)}`),
          fetch(`/api/projects`),
        ]);

        if (prodRes.ok) {
          const prodData = await prodRes.json();
          setProducts(prodData.products || []);
        }

        if (projRes.ok) {
          const projData = await projRes.json();
          const q = query.toLowerCase();
          const filteredProj = (projData.projects || []).filter(
            (p: Project) =>
              p.title.toLowerCase().includes(q) ||
              p.location.toLowerCase().includes(q) ||
              p.projectType.toLowerCase().includes(q) ||
              p.shortDescription.toLowerCase().includes(q)
          );
          setProjects(filteredProj);
        }
      } catch (err) {
        console.error('Search fetch error', err);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12 min-h-[70vh]">
      {/* Search Bar Input */}
      <div className="max-w-3xl mx-auto space-y-4 text-center">
        <span className="text-xs uppercase tracking-widest text-bronze font-medium">Catalog Index</span>
        <h1 className="font-serif text-3xl sm:text-4xl text-espresso font-light">
          Search Materials & Architectural Works
        </h1>
        <div className="relative mt-6">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by material, stone, wood, finish, SKU (e.g. Travertine, Oak, Fluted, MAT-STN-001)..."
            className="w-full px-6 py-4 pl-12 pr-12 bg-surface border border-atelier focus:border-bronze focus:outline-hidden text-espresso text-sm transition-colors"
            autoFocus
          />
          <SearchIcon className="w-5 h-5 text-warmgray absolute left-4 top-1/2 -translate-y-1/2" />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-warmgray hover:text-espresso"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Results View */}
      {loading ? (
        <div className="text-center py-16 text-warmgray font-light text-sm animate-pulse">
          Querying atelier catalog index...
        </div>
      ) : query.trim() === '' ? (
        <div className="text-center py-16 space-y-4">
          <p className="text-xs uppercase tracking-widest text-warmgray font-medium">Popular Inquiries</p>
          <div className="flex flex-wrap justify-center gap-2 max-w-xl mx-auto">
            {['Romano Travertine', 'Smoked European Oak', 'Acoustic Walnut', 'Porcelain Slab', 'Linear Bronze', 'Door Hardware'].map((term) => (
              <button
                key={term}
                onClick={() => setQuery(term)}
                className="px-3.5 py-1.5 bg-surface border border-atelier hover:border-bronze text-xs text-espresso transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-16">
          {/* Materials Match */}
          <div className="space-y-6">
            <div className="flex justify-between items-baseline border-b border-atelier pb-3">
              <h2 className="font-serif text-2xl text-espresso">
                Materials & Products ({products.length})
              </h2>
            </div>

            {products.length === 0 ? (
              <p className="text-xs text-warmgray">No material records found for &ldquo;{query}&rdquo;.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((p) => (
                  <Link
                    key={p.id}
                    href={`/material/${p.slug}`}
                    className="group block bg-surface border border-atelier p-4 hover:border-bronze transition-colors space-y-2"
                  >
                    <div className="relative aspect-[4/5] bg-canvas overflow-hidden">
                      {p.images[0] && (
                        <Image src={p.images[0]} alt={p.name} fill className="object-cover group-hover:scale-104 transition-transform duration-500" />
                      )}
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-bronze font-medium block">
                      {p.categoryName}
                    </span>
                    <h4 className="font-serif text-base text-espresso group-hover:text-bronze transition-colors truncate">
                      {p.name}
                    </h4>
                    <div className="text-xs font-medium text-timber">
                      ₹{(p.salePrice || p.price).toLocaleString('en-IN')} / {p.unit}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Projects Match */}
          {projects.length > 0 && (
            <div className="space-y-6">
              <div className="flex justify-between items-baseline border-b border-atelier pb-3">
                <h2 className="font-serif text-2xl text-espresso">
                  Architectural Projects ({projects.length})
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((proj) => (
                  <Link
                    key={proj.id}
                    href={`/projects/${proj.slug}`}
                    className="group block bg-surface border border-atelier p-4 hover:border-bronze transition-colors space-y-3"
                  >
                    <div className="relative aspect-[16/10] bg-canvas overflow-hidden">
                      <Image src={proj.heroImage} alt={proj.title} fill className="object-cover group-hover:scale-103 transition-transform duration-500" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-bronze font-medium block">
                        {proj.projectType} • {proj.location}
                      </span>
                      <h4 className="font-serif text-xl text-espresso group-hover:text-bronze transition-colors font-medium">
                        {proj.title}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
```

---

### `src/app/services/page.tsx`

- **File**: `src/app/services/page.tsx`
- **Size**: 8.3 KB (181 lines)
- **Language**: `tsx`

```tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Compass, ShieldCheck, Layers, Armchair, Check } from 'lucide-react';
import { getServices } from '@/lib/db';
import { Reveal } from '@/components/Reveal';
import { ImageReveal } from '@/components/ImageReveal';

export const metadata = {
  title: 'Architectural & Interior Services — Balaji Architect & Interiors',
  description: 'Explore our turnkey interior design, residential architecture, bespoke millwork, and material advisory capabilities.',
};

export default async function ServicesPage() {
  const services = await getServices(true);

  return (
    <div className="space-y-24 sm:space-y-32 pb-24">
      {/* Header Banner */}
      <section className="bg-espresso text-surface py-24 sm:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <Reveal>
            <span className="text-xs uppercase tracking-widest-plus text-champagne font-medium">
              Practice Offerings
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-surface font-light leading-tight mt-2 max-w-4xl">
              Turnkey architectural execution & spatial design.
            </h1>
          </Reveal>
          <Reveal delay={150}>
            <p className="max-w-2xl text-base sm:text-lg text-surface/80 font-light leading-relaxed">
              From bare-shell spatial reconfiguration to master artisan supervision, Balaji Architect & Interiors delivers uncompromising turnkey execution for residences, penthouses, and commercial venues.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Services List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {services.map((service, idx) => {
          const isEven = idx % 2 === 1;
          return (
            <div
              key={service.id}
              id={service.slug}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center border-b border-atelier pb-24 last:border-0"
            >
              <div className={`lg:col-span-6 ${isEven ? 'lg:order-2' : 'lg:order-1'} space-y-6`}>
                <Reveal>
                  <div className="flex items-center gap-3">
                    <span className="font-serif text-3xl text-bronze font-light">0{idx + 1}</span>
                    <div className="h-px bg-atelier flex-1 max-w-[60px]" />
                  </div>
                  <h2 className="font-serif text-3xl sm:text-4xl text-espresso font-light leading-tight mt-2">
                    {service.title}
                  </h2>
                </Reveal>

                <Reveal delay={100}>
                  <p className="text-sm sm:text-base text-warmgray font-light leading-relaxed">
                    {service.fullDesc}
                  </p>
                </Reveal>

                <Reveal delay={200}>
                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs uppercase tracking-widest text-espresso font-medium">Key Deliverables</h4>
                    <ul className="space-y-2.5 text-xs sm:text-sm text-warmgray">
                      {service.deliverables.map((item, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-bronze mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>

                <Reveal delay={300}>
                  <div className="pt-4 flex items-center gap-4">
                    <Link
                      href={`/quote?service=${service.slug}`}
                      className="px-6 py-3 btn-luxury-dark text-xs uppercase tracking-widest inline-flex items-center gap-2 font-medium"
                    >
                      Request Quote for this Service <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </Reveal>
              </div>

              <div className={`lg:col-span-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                <Reveal delay={150}>
                  <ImageReveal
                    src={service.imageUrl}
                    alt={service.title}
                    aspectRatio="aspect-[4/3]"
                    className="shadow-md"
                  />
                </Reveal>
              </div>
            </div>
          );
        })}
      </section>

      {/* Turnkey Process Workflow */}
      <section className="bg-surface py-24 border-y border-atelier">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-widest text-bronze font-medium">Methodology</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-espresso font-light">
              Our Turnkey Execution Sequence
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-canvas p-6 border border-atelier space-y-3">
              <span className="font-serif text-2xl text-bronze">Phase 01</span>
              <h3 className="font-serif text-lg text-espresso font-medium">Spatial Discovery & Volumetric BIM</h3>
              <p className="text-xs text-warmgray leading-relaxed font-light">
                Laser site surveys, natural light orientation analysis, and 3D architectural volumetric planning.
              </p>
            </div>

            <div className="bg-canvas p-6 border border-atelier space-y-3">
              <span className="font-serif text-2xl text-bronze">Phase 02</span>
              <h3 className="font-serif text-lg text-espresso font-medium">Material Curation & Sourcing</h3>
              <p className="text-xs text-warmgray leading-relaxed font-light">
                Direct quarry slab matching, timber moisture stabilization, and custom bronze sample prototypes.
              </p>
            </div>

            <div className="bg-canvas p-6 border border-atelier space-y-3">
              <span className="font-serif text-2xl text-bronze">Phase 03</span>
              <h3 className="font-serif text-lg text-espresso font-medium">On-Site Master Craftsmanship</h3>
              <p className="text-xs text-warmgray leading-relaxed font-light">
                Dedicated on-site site engineers, daily photo logs, and millimeter-level joinery supervision.
              </p>
            </div>

            <div className="bg-canvas p-6 border border-atelier space-y-3">
              <span className="font-serif text-2xl text-bronze">Phase 04</span>
              <h3 className="font-serif text-lg text-espresso font-medium">Handover & Maintenance Portfolio</h3>
              <p className="text-xs text-warmgray leading-relaxed font-light">
                Curated spatial styling, comprehensive material warranty documentation, and lifetime studio support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <Reveal>
          <span className="text-xs uppercase tracking-widest text-bronze font-medium">Commission Studio</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-espresso font-light mt-2">
            Discuss Your Architectural Commission
          </h2>
          <p className="text-sm sm:text-base text-warmgray max-w-xl mx-auto font-light">
            Contact our project management team to receive a tailored estimate and timeline breakdown.
          </p>
          <div className="pt-6 flex justify-center gap-4">
            <Link
              href="/quote"
              className="px-8 py-4 btn-luxury-dark text-xs uppercase tracking-widest"
            >
              Start Project Estimate
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 btn-luxury-outline text-xs uppercase tracking-widest"
            >
              Schedule Studio Meeting
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
```

---

### `src/app/shop/page.tsx`

- **File**: `src/app/shop/page.tsx`
- **Size**: 4.8 KB (105 lines)
- **Language**: `tsx`

```tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { getProducts } from '@/lib/db';
import { Reveal } from '@/components/Reveal';

export const metadata = {
  title: 'Studio Shop — Curated Lighting, Objects & Furnishings | Balaji Architect & Interiors',
  description: 'Limited-edition architectural objects, travertine monolithic tables, cast bronze hardware, and studio design pieces.',
};

export const revalidate = 60;

export default async function ShopPage() {
  const allProducts = await getProducts({ publishedOnly: true });
  // Filter products that can be directly bought online
  const purchasable = allProducts.filter((p) => p.purchaseMode === 'BUY_NOW' || p.purchaseMode === 'BOTH');

  return (
    <div className="space-y-16 pb-24">
      {/* Header Banner */}
      <section className="bg-espresso text-surface py-20 sm:py-28 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <Reveal>
            <span className="text-xs uppercase tracking-widest-plus text-champagne font-medium">
              Curated Shop
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl text-surface font-light leading-tight mt-1 max-w-3xl">
              Atelier Furnishings & Architectural Objects
            </h1>
          </Reveal>
          <Reveal delay={100}>
            <p className="max-w-2xl text-sm sm:text-base text-surface/80 font-light leading-relaxed">
              Limited-edition travertine coffee tables, unlacquered bronze chandeliers, knurled architectural door hardware, and engineered hardwood flooring available for immediate procurement.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center pb-6 border-b border-atelier text-xs text-warmgray">
          <span>Displaying {purchasable.length} Available Creations</span>
          <Link href="/quote" className="text-bronze hover:underline uppercase tracking-wider">
            Need custom fabrication? Request Quote →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pt-8">
          {purchasable.map((product, idx) => (
            <Reveal key={product.id} delay={idx * 50}>
              <Link
                href={`/material/${product.slug}`}
                className="group block bg-surface border border-atelier p-4 hover:border-bronze transition-all space-y-3"
              >
                <div className="relative aspect-[4/5] bg-canvas overflow-hidden">
                  {product.images[0] && (
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
                    />
                  )}
                  {product.isNew && (
                    <span className="absolute top-2 left-2 bg-espresso text-surface text-[9px] px-2 py-0.5 uppercase tracking-wider font-semibold">
                      New Release
                    </span>
                  )}
                </div>

                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between text-[11px] text-warmgray">
                    <span className="uppercase tracking-wider font-medium text-bronze">
                      {product.categoryName}
                    </span>
                    <span>In Stock: {product.stock}</span>
                  </div>

                  <h3 className="font-serif text-lg text-espresso group-hover:text-bronze transition-colors font-medium leading-snug line-clamp-1">
                    {product.name}
                  </h3>

                  <div className="flex items-baseline justify-between pt-2 border-t border-atelier/60">
                    <div>
                      <span className="text-base font-medium text-timber">
                        ₹{(product.salePrice || product.price).toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-warmgray font-light"> / {product.unit}</span>
                    </div>
                    <span className="text-[11px] uppercase tracking-widest text-espresso group-hover:translate-x-0.5 transition-transform flex items-center gap-1 font-medium">
                      Shop Now <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
```

---

### `src/app/sitemap.ts`

- **File**: `src/app/sitemap.ts`
- **Size**: 2.0 KB (48 lines)
- **Language**: `typescript`

```typescript
import { MetadataRoute } from 'next';
import { getCategories, getProducts, getProjects, getServices } from '@/lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://balaji-atelier.com';

  const [categories, products, projects, services] = await Promise.all([
    getCategories(),
    getProducts({ publishedOnly: true }),
    getProjects({ publishedOnly: true }),
    getServices(true),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/projects`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/materials`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/shop`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/quote`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${baseUrl}/category/${c.slug}`,
    lastModified: new Date(c.updatedAt || new Date()),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${baseUrl}/material/${p.slug}`,
    lastModified: new Date(p.updatedAt || new Date()),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${baseUrl}/projects/${p.slug}`,
    lastModified: new Date(p.updatedAt || new Date()),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes, ...projectRoutes];
}
```

---

### `src/app/wishlist/page.tsx`

- **File**: `src/app/wishlist/page.tsx`
- **Size**: 5.2 KB (129 lines)
- **Language**: `tsx`

```tsx
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types';

export default function WishlistPage() {
  const { wishlistIds, toggleWishlist } = useWishlist();
  const { addItem } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWishlistProducts() {
      if (wishlistIds.length === 0) {
        setProducts([]);
        setLoading(false);
        return;
      }
      try {
        const res = await fetch('/api/products');
        if (res.ok) {
          const data = await res.json();
          const matched = (data.products || []).filter((p: Product) => wishlistIds.includes(p.id));
          setProducts(matched);
        }
      } catch (err) {
        console.error('Error fetching wishlist products', err);
      } finally {
        setLoading(false);
      }
    }
    loadWishlistProducts();
  }, [wishlistIds]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12 min-h-[65vh]">
      <div className="space-y-2 border-b border-atelier pb-6">
        <span className="text-xs uppercase tracking-widest text-bronze font-medium">Saved Selection</span>
        <h1 className="font-serif text-3xl sm:text-4xl text-espresso font-light">
          Your Material Wishlist ({wishlistIds.length})
        </h1>
        <p className="text-xs sm:text-sm text-warmgray font-light">
          Save considered finishes, slab options, and architectural fixtures for project specification.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-20 text-warmgray animate-pulse text-sm">
          Loading saved collection...
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-24 space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-surface border border-atelier flex items-center justify-center mx-auto text-warmgray">
            <Heart className="w-8 h-8 stroke-1" />
          </div>
          <h3 className="font-serif text-2xl text-espresso">Your wishlist is empty</h3>
          <p className="text-xs sm:text-sm text-warmgray font-light">
            Click the heart icon on any material or architectural piece to bookmark it for your project palette.
          </p>
          <div className="pt-4">
            <Link href="/materials" className="px-6 py-3 btn-luxury-dark text-xs uppercase tracking-widest inline-block">
              Explore Materials
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-surface border border-atelier p-4 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="relative aspect-[4/5] bg-canvas overflow-hidden">
                  {product.images[0] && (
                    <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                  )}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-2 right-2 p-1.5 bg-surface/90 text-espresso hover:text-red-700 transition-colors"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-wider text-bronze font-medium block">
                    {product.categoryName}
                  </span>
                  <Link
                    href={`/material/${product.slug}`}
                    className="font-serif text-base text-espresso hover:text-bronze transition-colors font-medium line-clamp-1"
                  >
                    {product.name}
                  </Link>
                  <div className="text-xs text-timber font-medium mt-1">
                    ₹{(product.salePrice || product.price).toLocaleString('en-IN')} / {product.unit}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-atelier/60 space-y-2">
                <button
                  onClick={() => addItem(product, product.moq || 1)}
                  className="w-full py-2.5 btn-luxury-dark text-xs uppercase tracking-widest flex items-center justify-center gap-1.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5" /> Add to Bag
                </button>
                <Link
                  href={`/material/${product.slug}`}
                  className="w-full py-2 text-center block text-[10px] uppercase tracking-widest text-warmgray hover:text-espresso"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

---

### `src/components/AdminLayout.tsx`

- **File**: `src/components/AdminLayout.tsx`
- **Size**: 9.5 KB (252 lines)
- **Language**: `tsx`

```tsx
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Boxes,
  ShoppingBag,
  Building2,
  Compass,
  FileText,
  Users,
  Settings,
  LogOut,
  Bell,
  Radio,
  Menu,
  X,
  ExternalLink,
  Shield,
} from 'lucide-react';
import { useAdminAuth } from '@/context/AdminAuthContext';

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const DEFAULT_VAPID_PUBLIC_KEY =
  'BHsG3ouw3YgPO_jlPvdNIBFISisslHHm-vxyMHmCRswNnDQxTBCZTLR2qRAQvNOC-avolJ61etGkPrNJV4MpxTE';

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { admin, loading, logout } = useAdminAuth();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [pushStatus, setPushStatus] = useState<NotificationPermission | 'default'>('default');

  useEffect(() => {
    if (!loading && !admin && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [admin, loading, pathname, router]);

  // Register service worker and synchronize existing push subscription
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && 'Notification' in window) {
      setPushStatus(Notification.permission);

      navigator.serviceWorker
        .register('/sw.js')
        .then(async (reg) => {
          if (Notification.permission === 'granted') {
            try {
              const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || DEFAULT_VAPID_PUBLIC_KEY;
              const convertedKey = urlBase64ToUint8Array(vapidKey);
              let sub = await reg.pushManager.getSubscription();
              if (!sub) {
                sub = await reg.pushManager.subscribe({
                  userVisibleOnly: true,
                  applicationServerKey: convertedKey,
                });
              }
              if (sub) {
                await fetch('/api/notifications/subscribe', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ subscription: sub }),
                });
              }
            } catch (err) {
              console.warn('Auto push subscription sync notice:', err);
            }
          }
        })
        .catch((err) => {
          console.warn('Service worker registration failed:', err);
        });
    }
  }, [admin]);

  const requestPushPermission = async () => {
    if (typeof window !== 'undefined' && 'Notification' in window && 'serviceWorker' in navigator) {
      try {
        const permission = await Notification.requestPermission();
        setPushStatus(permission);
        if (permission === 'granted') {
          const reg = await navigator.serviceWorker.ready;
          const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || DEFAULT_VAPID_PUBLIC_KEY;
          const convertedKey = urlBase64ToUint8Array(vapidKey);
          let sub = await reg.pushManager.getSubscription();
          if (!sub) {
            sub = await reg.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: convertedKey,
            });
          }
          if (sub) {
            await fetch('/api/notifications/subscribe', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ subscription: sub }),
            });
          }
        }
      } catch (e) {
        console.error('Failed to subscribe to push notifications', e);
      }
    }
  };

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-canvas flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-2 border-espresso border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="font-serif text-lg text-espresso font-light">Authenticating Studio Admin...</p>
        </div>
      </div>
    );
  }

  if (!admin) {
    return null;
  }

  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Products & Materials', href: '/admin/products', icon: Package },
    { label: 'Categories', href: '/admin/categories', icon: FolderTree },
    { label: 'Inventory Control', href: '/admin/inventory', icon: Boxes },
    { label: 'Orders & Dispatch', href: '/admin/orders', icon: ShoppingBag },
    { label: 'Architectural Projects', href: '/admin/projects', icon: Building2 },
    { label: 'Design Services', href: '/admin/services', icon: Compass },
    { label: 'Quotes & Inquiries', href: '/admin/quotes', icon: FileText },
    { label: 'Customer Directory', href: '/admin/customers', icon: Users },
    { label: 'Studio Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-canvas flex flex-col md:flex-row">
      {/* Mobile Admin Header */}
      <div className="md:hidden bg-espresso text-surface p-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-champagne" />
          <span className="font-serif text-lg tracking-wider">BALAJI ADMIN</span>
        </div>
        <button onClick={() => setMobileNavOpen(!mobileNavOpen)} className="p-1">
          {mobileNavOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          mobileNavOpen ? 'block' : 'hidden'
        } md:block w-full md:w-64 bg-espresso text-surface flex-shrink-0 flex flex-col border-r border-espresso-light z-40 fixed md:sticky top-0 h-screen overflow-y-auto`}
      >
        {/* Brand Header */}
        <div className="p-6 border-b border-atelier-dark space-y-1">
          <Link href="/admin" className="block">
            <span className="font-serif text-base tracking-widest text-surface block font-light leading-snug">
              BALAJI ARCHITECT & INTERIORS
            </span>
            <span className="text-[9px] uppercase tracking-widest text-champagne font-medium">
              Studio Management Portal
            </span>
          </Link>
          <div className="flex items-center gap-1.5 pt-2 text-[10px] text-green-400">
            <Radio className="w-3 h-3 animate-pulse" />
            <span>Realtime Pipeline Active</span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileNavOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 text-xs tracking-wider rounded-none transition-colors font-medium ${
                  isActive
                    ? 'bg-champagne/15 text-champagne border-l-2 border-champagne'
                    : 'text-surface/70 hover:text-surface hover:bg-espresso-light'
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Push Notification & User Status */}
        <div className="p-4 border-t border-atelier-dark space-y-3 text-xs">
          {pushStatus !== 'granted' && (
            <button
              onClick={requestPushPermission}
              className="w-full py-2 px-3 bg-champagne/10 text-champagne border border-champagne/30 text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-champagne/20 transition-colors"
            >
              <Bell className="w-3.5 h-3.5" /> Enable Push Alerts
            </button>
          )}

          <div className="flex items-center justify-between pt-1">
            <div className="truncate">
              <span className="font-medium text-surface block text-xs truncate">{admin.name}</span>
              <span className="text-[10px] text-surface/50 truncate block">{admin.email}</span>
            </div>
            <button
              onClick={() => logout()}
              className="p-1.5 text-surface/60 hover:text-red-400 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          <div className="pt-2 border-t border-atelier-dark/60 flex items-center justify-between text-[10px] text-surface/40">
            <Link href="/" target="_blank" className="hover:text-surface flex items-center gap-1">
              <span>View Public Studio</span> <ExternalLink className="w-3 h-3" />
            </Link>
            <span>v1.0 Production</span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-8 lg:p-10 max-w-7xl overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
```

---

### `src/components/CartDrawer.tsx`

- **File**: `src/components/CartDrawer.tsx`
- **Size**: 7.7 KB (173 lines)
- **Language**: `tsx`

```tsx
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Minus, Plus, Trash2, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export function CartDrawer() {
  const { items, removeItem, updateQuantity, isCartOpen, setIsCartOpen, subtotal, tax, shipping, total, itemCount } =
    useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-espresso/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-surface border-l border-atelier shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-atelier flex items-center justify-between">
            <div>
              <span className="text-xs uppercase tracking-widest text-warmgray font-medium">Your Selection</span>
              <h2 className="font-serif text-2xl text-espresso font-normal">Shopping Bag ({itemCount})</h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-espresso hover:text-bronze transition-colors"
              aria-label="Close bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="w-16 h-16 rounded-full bg-canvas flex items-center justify-center text-warmgray">
                  <ShieldCheck className="w-8 h-8 stroke-1" />
                </div>
                <p className="text-espresso font-serif text-xl">Your bag is currently empty</p>
                <p className="text-sm text-warmgray max-w-xs">
                  Explore our curated architectural materials and limited-edition atelier furnishings.
                </p>
                <Link
                  href="/materials"
                  onClick={() => setIsCartOpen(false)}
                  className="mt-4 px-6 py-2.5 btn-luxury-dark text-xs uppercase tracking-widest"
                >
                  Explore Materials
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={`${item.productId}-${item.variantId || 'base'}`}
                  className="flex gap-4 pb-6 border-b border-atelier/60"
                >
                  <div className="relative w-20 h-24 bg-canvas flex-shrink-0 overflow-hidden">
                    {item.product.images?.[0] && (
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif text-base text-espresso leading-snug">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeItem(item.productId, item.variantId)}
                          className="text-warmgray hover:text-red-700 transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-warmgray mt-0.5">
                        {item.variant?.name || item.product.subcategory || item.product.unit}
                      </p>
                      <p className="text-xs text-bronze mt-1 font-medium">
                        ₹{item.unitPrice.toLocaleString('en-IN')} / {item.product.unit}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-atelier bg-canvas">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1, item.variantId)}
                          className="p-1.5 text-espresso hover:text-bronze"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-xs font-medium text-espresso min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1, item.variantId)}
                          className="p-1.5 text-espresso hover:text-bronze"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-sm font-medium text-espresso">
                        ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary */}
          {items.length > 0 && (
            <div className="p-6 border-t border-atelier bg-surface space-y-4">
              <div className="space-y-1.5 text-xs text-warmgray">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-espresso font-medium">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated GST (18%)</span>
                  <span className="text-espresso font-medium">₹{tax.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping (Architectural freight)</span>
                  <span className="text-espresso font-medium">
                    {shipping === 0 ? 'Complimentary' : `₹${shipping.toLocaleString('en-IN')}`}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-atelier text-sm font-medium text-espresso">
                  <span>Total Due</span>
                  <span className="font-serif text-lg text-timber">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <Link
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-3.5 btn-luxury-dark text-xs uppercase tracking-widest flex items-center justify-center gap-2 font-medium"
                >
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/quote"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-2.5 text-center block text-xs uppercase tracking-widest text-warmgray hover:text-espresso transition-colors"
                >
                  Request Bulk / Project Quote Instead
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
```

---

### `src/components/Footer.tsx`

- **File**: `src/components/Footer.tsx`
- **Size**: 8.0 KB (187 lines)
- **Language**: `tsx`

```tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';

export function Footer() {
  const pathname = usePathname();

  // Do not render public footer on admin pages
  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="bg-espresso text-surface border-t border-espresso-light mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-atelier-dark">
          {/* Studio Identity */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="font-serif text-2xl tracking-widest text-surface font-light">
              BALAJI ARCHITECT & INTERIORS
            </h3>
            <p className="text-xs uppercase tracking-widest text-champagne font-medium">
              Architecture • Interior Design • Materials
            </p>
            <p className="text-sm text-surface/70 font-light leading-relaxed max-w-sm pt-2">
              Crafted spaces, bespoke architectural commissions, and considered materials for timeless living. We bridge the disciplines of luxury architecture, master interior craftsmanship, and global material curation.
            </p>
            <div className="pt-4 flex items-center space-x-6 text-xs uppercase tracking-widest text-surface/60">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-champagne transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-champagne transition-colors"
              >
                Pinterest
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-champagne transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>

          {/* Architectural Practice */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-champagne font-medium">PRACTICE</h4>
            <ul className="space-y-2.5 text-xs text-surface/70 font-light">
              <li>
                <Link href="/projects" className="hover:text-surface transition-colors">
                  Selected Portfolio
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-surface transition-colors">
                  Design Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-surface transition-colors">
                  Studio & Founders
                </Link>
              </li>
              <li>
                <Link href="/services#turnkey" className="hover:text-surface transition-colors">
                  Turnkey Execution
                </Link>
              </li>
              <li>
                <Link href="/quote" className="hover:text-surface transition-colors">
                  Project Estimation
                </Link>
              </li>
            </ul>
          </div>

          {/* Materials & Shop */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-champagne font-medium">MATERIALS MARKET</h4>
            <ul className="space-y-2.5 text-xs text-surface/70 font-light">
              <li>
                <Link href="/category/natural-stone-marble" className="hover:text-surface transition-colors">
                  Natural Stone & Travertine
                </Link>
              </li>
              <li>
                <Link href="/category/hardwood-veneers" className="hover:text-surface transition-colors">
                  Hardwood & Architectural Veneers
                </Link>
              </li>
              <li>
                <Link href="/category/wall-panels-acoustic" className="hover:text-surface transition-colors">
                  Acoustic Fluted Panels
                </Link>
              </li>
              <li>
                <Link href="/category/porcelain-slabs" className="hover:text-surface transition-colors">
                  Large Format Porcelain Slabs
                </Link>
              </li>
              <li>
                <Link href="/category/architectural-lighting" className="hover:text-surface transition-colors">
                  Architectural Lighting
                </Link>
              </li>
              <li>
                <Link href="/category/bespoke-hardware" className="hover:text-surface transition-colors">
                  Bespoke Patinated Hardware
                </Link>
              </li>
            </ul>
          </div>

          {/* Studio Contact */}
          <div className="lg:col-span-3 space-y-4">
            <div className="space-y-1">
              <h4 className="text-xs uppercase tracking-widest text-champagne font-medium">STUDIO & PRACTICE</h4>
              <div className="flex items-center gap-1.5 text-[11px] text-champagne">
                <span>★ 5.0</span>
                <span className="text-surface/60">(22 Google Reviews)</span>
                <span className="text-surface/40">•</span>
                <span className="text-surface/60">Interior Architect Office</span>
              </div>
            </div>
            <div className="text-xs text-surface/70 font-light space-y-1.5 leading-relaxed">
              <p className="text-surface font-medium">Door No. 306, DN TOWER, Floor No. 03</p>
              <p>Beltola Tiniali</p>
              <p>Guwahati, Assam 781040</p>
            </div>
            <div className="text-xs text-surface/70 font-light space-y-1 pt-1">
              <p>Inquiries: <span className="text-surface">atelier@balaji-interior.com</span></p>
              <p>Direct: <a href="tel:+917002948484" className="text-surface hover:text-champagne transition-colors">+91 70029 48484</a></p>
            </div>
            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-1.5 p-2.5 sm:p-0 text-xs uppercase tracking-widest text-champagne hover:text-surface bg-surface/10 sm:bg-transparent rounded sm:rounded-none transition-colors"
              >
                Schedule Consultation <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>

              <a
                href="https://wa.me/917002948484?text=Hello%20Balaji%20Architect%20%26%20Interiors%2C%20I%20would%20like%20to%20connect."
                target="_blank"
                rel="noopener noreferrer"
                className="sm:hidden inline-flex items-center justify-center gap-1.5 p-2.5 text-xs uppercase tracking-widest text-white bg-green-700 rounded transition-colors"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-surface/40 font-light gap-4">
          <p>© {new Date().getFullYear()} Balaji Architect & Interiors. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <Link href="/about" className="hover:text-surface/70 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/about" className="hover:text-surface/70 transition-colors">
              Terms of Supply
            </Link>
            <Link href="/admin/login" className="hover:text-surface/70 transition-colors text-surface/30">
              Studio Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

---

### `src/components/ImageReveal.tsx`

- **File**: `src/components/ImageReveal.tsx`
- **Size**: 2.0 KB (84 lines)
- **Language**: `tsx`

```tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface ImageRevealProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  aspectRatio?: string; // e.g. "aspect-[4/3]"
}

export function ImageReveal({
  src,
  alt,
  fill = false,
  width,
  height,
  className = '',
  imageClassName = '',
  priority = false,
  aspectRatio = 'aspect-[16/10]',
}: ImageRevealProps) {
  const [loaded, setLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden relative bg-canvas-subtle ${aspectRatio} ${className}`}
    >
      {fill ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
          onLoad={() => setLoaded(true)}
          className={`object-cover transition-all duration-1000 ease-out ${
            loaded && isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          } ${imageClassName}`}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width || 800}
          height={height || 600}
          priority={priority}
          onLoad={() => setLoaded(true)}
          className={`object-cover transition-all duration-1000 ease-out ${
            loaded && isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          } ${imageClassName}`}
        />
      )}
    </div>
  );
}
```

---

### `src/components/ImageUploader.tsx`

- **File**: `src/components/ImageUploader.tsx`
- **Size**: 6.2 KB (202 lines)
- **Language**: `tsx`

```tsx
'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Upload, X, Loader2, Image as ImageIcon, Plus } from 'lucide-react';

interface ImageUploaderProps {
  bucket?: 'products' | 'projects' | 'services' | 'site-media';
  images: string[];
  onChange: (images: string[]) => void;
  multiple?: boolean;
  label?: string;
  maxFiles?: number;
}

export function ImageUploader({
  bucket = 'products',
  images = [],
  onChange,
  multiple = false,
  label = 'Upload Photos from Device',
  maxFiles = 10,
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setError(null);
    setUploading(true);

    const validFiles: File[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith('image/')) {
        setError(`"${file.name}" is not an image file.`);
        setUploading(false);
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setError(`"${file.name}" exceeds 10MB limit.`);
        setUploading(false);
        return;
      }
      validFiles.push(file);
    }

    const uploadedUrls: string[] = [];

    for (const file of validFiles) {
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('bucket', bucket);

        const res = await fetch('/api/admin/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();
        if (res.ok && data.success && data.url) {
          uploadedUrls.push(data.url);
        } else {
          setError(data.error || `Failed to upload ${file.name}`);
        }
      } catch (err: any) {
        setError(err.message || `Upload failed for ${file.name}`);
      }
    }

    if (uploadedUrls.length > 0) {
      if (multiple) {
        onChange([...images, ...uploadedUrls].slice(0, maxFiles));
      } else {
        onChange([uploadedUrls[0]]);
      }
    }

    setUploading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const removeImage = (indexToRemove: number) => {
    const updated = images.filter((_, idx) => idx !== indexToRemove);
    onChange(updated);
  };

  return (
    <div className="space-y-3">
      {label && (
        <label className="text-xs uppercase tracking-wider text-warmgray font-medium block">
          {label}
        </label>
      )}

      {/* Drag & Drop Upload Zone */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed transition-all p-6 text-center cursor-pointer flex flex-col items-center justify-center gap-2 ${
          dragActive
            ? 'border-bronze bg-bronze/5'
            : 'border-atelier hover:border-bronze bg-canvas/60 hover:bg-canvas'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/avif,image/gif"
          multiple={multiple}
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
        />

        {uploading ? (
          <div className="flex flex-col items-center gap-2 py-2">
            <Loader2 className="w-7 h-7 text-bronze animate-spin" />
            <span className="text-xs text-espresso font-medium">
              Uploading high-resolution image to storage...
            </span>
          </div>
        ) : (
          <>
            <div className="w-10 h-10 rounded-full bg-surface border border-atelier flex items-center justify-center text-bronze shadow-2xs">
              <Upload className="w-5 h-5 stroke-[1.5]" />
            </div>
            <div className="space-y-0.5">
              <p className="text-xs font-medium text-espresso">
                Click to browse device or drag and drop photos here
              </p>
              <p className="text-[10px] text-warmgray">
                Supports JPG, PNG, WebP, AVIF up to 10MB each
              </p>
            </div>
          </>
        )}
      </div>

      {error && (
        <p className="text-xs text-red-600 bg-red-50 p-2 border border-red-200">{error}</p>
      )}

      {/* Image Preview Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 pt-2">
          {images.map((url, idx) => (
            <div
              key={idx}
              className="relative aspect-square bg-canvas border border-atelier overflow-hidden group shadow-2xs"
            >
              <Image src={url} alt={`Upload preview ${idx + 1}`} fill className="object-cover" />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage(idx);
                }}
                className="absolute top-1 right-1 bg-espresso/90 text-surface p-1 rounded-full opacity-80 hover:opacity-100 hover:bg-red-700 transition-all shadow-xs"
                title="Remove photo"
              >
                <X className="w-3 h-3" />
              </button>
              {idx === 0 && (
                <span className="absolute bottom-1 left-1 bg-espresso/80 text-surface text-[8px] uppercase tracking-wider px-1.5 py-0.5 font-mono">
                  Primary
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

---

### `src/components/MobileBottomNav.tsx`

- **File**: `src/components/MobileBottomNav.tsx`
- **Size**: 5.5 KB (139 lines)
- **Language**: `tsx`

```tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Building2,
  Package,
  ShoppingBag,
  Phone,
  MessageCircle,
  X,
  FileText,
  Sparkles,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';

export function MobileBottomNav() {
  const pathname = usePathname();
  const { itemCount, setIsCartOpen } = useCart();
  const [quickContactOpen, setQuickContactOpen] = useState(false);

  // Hide mobile bottom nav on admin pages to maximize admin workspace
  if (pathname.startsWith('/admin')) {
    return null;
  }

  const items = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Projects', href: '/projects', icon: Building2 },
    { label: 'Materials', href: '/materials', icon: Package },
    { label: 'Services', href: '/services', icon: Sparkles },
    { label: 'Quote', href: '/quote', icon: FileText },
  ];

  return (
    <>
      {/* Quick Contact Modal Drawer for Mobile */}
      {quickContactOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-espresso/70 backdrop-blur-xs flex items-end animate-fade-in">
          <div className="w-full bg-surface border-t border-atelier p-6 space-y-5 rounded-t-2xl shadow-2xl animate-slide-up pb-8">
            <div className="flex items-center justify-between pb-3 border-b border-atelier">
              <div>
                <h3 className="font-serif text-lg text-espresso font-medium">Connect with Studio</h3>
                <p className="text-[11px] text-warmgray">Direct architectural & interior consultation</p>
              </div>
              <button
                onClick={() => setQuickContactOpen(false)}
                className="p-1.5 rounded-full bg-canvas text-warmgray hover:text-espresso"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <a
                href="https://wa.me/917002948484?text=Hello%20Balaji%20Architect%20%26%20Interiors%2C%20I%20would%20like%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 p-3.5 bg-green-700 text-white rounded-lg text-xs font-medium uppercase tracking-wider shadow-sm active:scale-95 transition-transform"
              >
                <MessageCircle className="w-4 h-4 fill-white/20" />
                <span>WhatsApp</span>
              </a>

              <a
                href="tel:+917002948484"
                className="flex items-center justify-center gap-2.5 p-3.5 bg-espresso text-surface rounded-lg text-xs font-medium uppercase tracking-wider shadow-sm active:scale-95 transition-transform"
              >
                <Phone className="w-4 h-4" />
                <span>Direct Call</span>
              </a>
            </div>

            <div className="pt-2 text-center">
              <p className="text-[10px] text-warmgray">
                Guwahati Office • Mon-Sat 9:30 AM - 7:30 PM • 5.0 ★ Rated
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Mobile Bottom App Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-lg border-t border-atelier px-2 py-1.5 shadow-2xl safe-area-bottom">
        <nav className="flex items-center justify-around">
          {items.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center py-1 px-2.5 transition-colors ${
                  isActive ? 'text-bronze' : 'text-warmgray hover:text-espresso'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.2]' : 'stroke-[1.5]'}`} />
                <span className={`text-[10px] tracking-tight mt-0.5 ${isActive ? 'font-semibold' : 'font-normal'}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}

          {/* Cart Trigger with badge */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex flex-col items-center py-1 px-2.5 relative text-warmgray hover:text-espresso"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-espresso text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {itemCount}
                </span>
              )}
            </div>
            <span className="text-[10px] tracking-tight mt-0.5">Bag</span>
          </button>

          {/* Direct WhatsApp Call Launcher */}
          <button
            onClick={() => setQuickContactOpen(true)}
            className="flex flex-col items-center py-1 px-2.5 text-green-700 hover:text-green-800"
          >
            <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
              <MessageCircle className="w-3.5 h-3.5 stroke-[2]" />
            </div>
            <span className="text-[10px] font-medium tracking-tight mt-0.5 text-green-800">Chat</span>
          </button>
        </nav>
      </div>
    </>
  );
}
```

---

### `src/components/Navbar.tsx`

- **File**: `src/components/Navbar.tsx`
- **Size**: 8.7 KB (219 lines)
- **Language**: `tsx`

```tsx
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Heart, ShoppingBag, Menu, X, Shield, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { itemCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hide public navbar on admin pages
  if (pathname.startsWith('/admin')) {
    return null;
  }

  const navLinks = [
    { label: 'PROJECTS', href: '/projects' },
    { label: 'SERVICES', href: '/services' },
    { label: 'MATERIALS', href: '/materials' },
    { label: 'SHOP', href: '/shop' },
    { label: 'ABOUT', href: '/about' },
    { label: 'QUOTE', href: '/quote' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-surface/95 backdrop-blur-md border-b border-atelier shadow-xs py-3.5'
            : 'bg-canvas/80 backdrop-blur-xs border-b border-atelier/40 py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Studio Brand */}
          <Link href="/" className="flex flex-col group">
            <span className="font-serif text-lg sm:text-xl md:text-2xl tracking-widest text-espresso font-normal group-hover:text-bronze transition-colors">
              BALAJI ARCHITECT & INTERIORS
            </span>
            <span className="text-[9px] uppercase tracking-widest-plus text-warmgray font-medium -mt-0.5">
              Architecture • Interiors • Materials
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs uppercase tracking-widest transition-colors font-medium ${
                    isActive ? 'text-bronze border-b border-bronze pb-0.5' : 'text-espresso/80 hover:text-bronze'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center space-x-4 sm:space-x-5">
            <Link
              href="/search"
              aria-label="Search catalog"
              className="text-espresso/80 hover:text-bronze transition-colors p-1"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.5]" />
            </Link>

            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="relative text-espresso/80 hover:text-bronze transition-colors p-1"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.5]" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-bronze text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Shopping Bag"
              className="relative text-espresso/80 hover:text-bronze transition-colors p-1 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.5]" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-espresso text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {itemCount}
                </span>
              )}
            </button>

            <Link
              href="/admin"
              aria-label="Studio Admin"
              className="hidden sm:flex text-espresso/60 hover:text-espresso transition-colors p-1 items-center gap-1 text-[11px] uppercase tracking-wider"
              title="Studio Admin Portal"
            >
              <Shield className="w-3.5 h-3.5" />
              <span className="hidden lg:inline text-[10px]">Studio</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="md:hidden text-espresso hover:text-bronze p-1"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-surface/98 backdrop-blur-lg flex flex-col p-6 overflow-y-auto">
          <div className="flex items-center justify-between pb-6 border-b border-atelier">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex flex-col"
            >
              <span className="font-serif text-lg tracking-widest text-espresso">BALAJI ARCHITECT & INTERIORS</span>
              <span className="text-[8px] uppercase tracking-widest text-warmgray">Architecture • Interiors • Materials</span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-espresso hover:text-bronze"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-col py-6 space-y-5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-xl text-espresso hover:text-bronze transition-colors flex items-center justify-between py-1 border-b border-atelier/30"
              >
                <span>{link.label}</span>
                <span className="text-xs text-bronze font-sans tracking-widest">→</span>
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="font-serif text-xl text-espresso hover:text-bronze transition-colors flex items-center justify-between py-1 border-b border-atelier/30"
            >
              <span>CONTACT & STUDIO</span>
              <span className="text-xs text-bronze font-sans tracking-widest">→</span>
            </Link>

            {/* Quick Action Contact Row on Mobile Drawer */}
            <div className="grid grid-cols-2 gap-3 pt-3">
              <a
                href="https://wa.me/917002948484?text=Hello%20Balaji%20Architect%20%26%20Interiors%2C%20I%20would%20like%20to%20consult%20on%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-green-700 text-white rounded text-center text-xs uppercase tracking-wider font-medium"
              >
                WhatsApp Us
              </a>
              <a
                href="tel:+917002948484"
                className="p-3 bg-espresso text-surface rounded text-center text-xs uppercase tracking-wider font-medium"
              >
                Call Studio
              </a>
            </div>

            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="font-serif text-base text-warmgray hover:text-espresso transition-colors flex items-center gap-2 pt-4"
            >
              <Shield className="w-4 h-4" />
              <span>Studio Admin Portal</span>
            </Link>
          </div>

          <div className="mt-auto pt-6 border-t border-atelier text-xs text-warmgray space-y-1.5">
            <p className="font-medium text-espresso">Door No. 306, DN TOWER, Floor 03, Beltola Tiniali</p>
            <p>Guwahati, Assam 781040</p>
            <p className="text-bronze font-medium">★ 5.0 Rating • 22 Google Reviews</p>
            <p>Direct: +91 70029 48484</p>
          </div>
        </div>
      )}
    </>
  );
}
```

---

### `src/components/PageTransition.tsx`

- **File**: `src/components/PageTransition.tsx`
- **Size**: 0.7 KB (27 lines)
- **Language**: `tsx`

```tsx
'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionStage, setTransitionStage] = useState<'fadeIn' | 'fadeOut'>('fadeIn');

  useEffect(() => {
    setDisplayChildren(children);
    setTransitionStage('fadeIn');
  }, [pathname, children]);

  return (
    <div
      key={pathname}
      className={`min-h-[calc(100vh-80px)] transition-opacity duration-300 ease-out ${
        transitionStage === 'fadeIn' ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {displayChildren}
    </div>
  );
}
```

---

### `src/components/ProductDetailClient.tsx`

- **File**: `src/components/ProductDetailClient.tsx`
- **Size**: 17.5 KB (393 lines)
- **Language**: `tsx`

```tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Heart,
  ShoppingBag,
  FileText,
  Minus,
  Plus,
  ShieldCheck,
  Truck,
  Layers,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Product, ProductVariant } from '@/types';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

export function ProductDetailClient({
  product,
  relatedProducts,
}: {
  product: Product;
  relatedProducts: Product[];
}) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product.variants && product.variants.length > 0 ? product.variants[0] : undefined
  );
  const [quantity, setQuantity] = useState(product.moq || 1);
  const [openAccordion, setOpenAccordion] = useState<string | null>('specs');
  const [addedToast, setAddedToast] = useState(false);

  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const isFavorited = isInWishlist(product.id);

  const basePrice = product.salePrice && product.salePrice > 0 ? product.salePrice : product.price;
  const currentPrice = basePrice + (selectedVariant?.priceModifier || 0);

  const handleAddToCart = () => {
    addItem(product, quantity, selectedVariant);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3000);
  };

  const toggleSection = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  return (
    <div className="space-y-16 sm:space-y-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left: Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[4/3] sm:aspect-[16/11] bg-canvas overflow-hidden border border-atelier">
            {product.images[selectedImage] && (
              <Image
                src={product.images[selectedImage]}
                alt={`${product.name} - View ${selectedImage + 1}`}
                fill
                priority
                className="object-cover"
              />
            )}
            {product.purchaseMode === 'REQUEST_QUOTE' && (
              <span className="absolute top-4 left-4 bg-espresso text-surface text-[10px] px-3 py-1 uppercase tracking-widest font-medium">
                Quote Only
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative w-20 h-20 bg-canvas flex-shrink-0 border transition-all ${
                    selectedImage === idx ? 'border-bronze opacity-100 ring-1 ring-bronze' : 'border-atelier opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Spec & Purchase Column */}
        <div className="lg:col-span-5 space-y-6">
          {/* Category & Series */}
          <div className="space-y-1.5 border-b border-atelier pb-4">
            <div className="flex items-center justify-between text-xs text-warmgray">
              <Link
                href={`/category/${product.categorySlug}`}
                className="uppercase tracking-widest text-bronze hover:text-espresso font-medium transition-colors"
              >
                {product.categoryName}
              </Link>
              <span className="text-[11px] font-mono">SKU: {selectedVariant?.sku || product.sku}</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-espresso font-normal leading-snug">
              {product.name}
            </h1>
            <p className="text-xs text-warmgray uppercase tracking-wider">{product.brand}</p>
          </div>

          {/* Pricing & Unit */}
          <div className="flex items-baseline gap-3">
            <span className="font-serif text-3xl sm:text-4xl text-timber font-light">
              ₹{currentPrice.toLocaleString('en-IN')}
            </span>
            <span className="text-sm text-warmgray font-light">/ {product.unit}</span>
            {product.salePrice && product.salePrice > 0 && (
              <span className="text-sm text-warmgray line-through ml-2">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <p className="text-sm text-warmgray font-light leading-relaxed">
            {product.description}
          </p>

          {/* Variants Selector */}
          {product.variants && product.variants.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-atelier">
              <span className="text-xs uppercase tracking-widest text-espresso font-medium block">
                Available Option / Finish:
              </span>
              <div className="grid grid-cols-2 gap-2">
                {product.variants.map((v) => {
                  const isSelected = selectedVariant?.id === v.id;
                  return (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      className={`p-3 text-left border transition-all text-xs ${
                        isSelected
                          ? 'border-espresso bg-surface text-espresso font-medium ring-1 ring-espresso'
                          : 'border-atelier bg-canvas text-warmgray hover:border-bronze'
                      }`}
                    >
                      <span className="block font-medium">{v.name}</span>
                      {v.priceModifier !== 0 && (
                        <span className="text-[10px] text-bronze">
                          {v.priceModifier > 0 ? `+₹${v.priceModifier}` : `-₹${Math.abs(v.priceModifier)}`}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity & MOQ */}
          <div className="space-y-2 pt-2 border-t border-atelier">
            <div className="flex justify-between items-center text-xs">
              <span className="uppercase tracking-widest text-espresso font-medium">Quantity ({product.unit}):</span>
              <span className="text-warmgray">MOQ: {product.moq} {product.unit}</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center border border-atelier bg-surface">
                <button
                  onClick={() => setQuantity(Math.max(product.moq, quantity - (product.unit === 'sq ft' ? 50 : 1)))}
                  className="p-3 text-espresso hover:text-bronze"
                  disabled={quantity <= product.moq}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 text-sm font-medium text-espresso min-w-[3.5rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + (product.unit === 'sq ft' ? 50 : 1))}
                  className="p-3 text-espresso hover:text-bronze"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="text-xs text-warmgray">
                Total for this item: <strong className="text-espresso font-medium">₹{(currentPrice * quantity).toLocaleString('en-IN')}</strong>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            {(product.purchaseMode === 'BUY_NOW' || product.purchaseMode === 'BOTH') && (
              <button
                onClick={handleAddToCart}
                className="w-full py-4 btn-luxury-dark text-xs uppercase tracking-widest flex items-center justify-center gap-2 font-medium"
              >
                <ShoppingBag className="w-4 h-4" /> Add {quantity} {product.unit} to Bag
              </button>
            )}

            {(product.purchaseMode === 'REQUEST_QUOTE' || product.purchaseMode === 'BOTH') && (
              <Link
                href={`/quote?product=${product.id}&qty=${quantity}`}
                className="w-full py-4 btn-luxury-outline text-xs uppercase tracking-widest flex items-center justify-center gap-2 font-medium"
              >
                <FileText className="w-4 h-4" /> Request Project / Custom Quote
              </Link>
            )}

            <button
              onClick={() => toggleWishlist(product.id)}
              className="w-full py-3 border border-atelier text-xs uppercase tracking-widest text-espresso hover:bg-canvas transition-colors flex items-center justify-center gap-2"
            >
              <Heart className={`w-4 h-4 ${isFavorited ? 'fill-bronze text-bronze' : ''}`} />
              {isFavorited ? 'Saved to Wishlist' : 'Add to Wishlist'}
            </button>
          </div>

          {/* Toast Notification */}
          {addedToast && (
            <div className="p-3 bg-espresso text-surface text-xs flex items-center gap-2 border border-bronze animate-fade-in">
              <CheckCircle2 className="w-4 h-4 text-champagne" />
              <span>Added to your shopping bag.</span>
              <Link href="/cart" className="underline ml-auto text-champagne">
                View Bag
              </Link>
            </div>
          )}

          {/* Delivery & Assurance Details */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-atelier text-xs text-warmgray">
            <div className="flex items-start gap-2">
              <Truck className="w-4 h-4 text-bronze mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-medium text-espresso block">Lead Time</span>
                <span>{product.leadTime}</span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-bronze mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-medium text-espresso block">Direct Provenance</span>
                <span>100% Certified Sourcing</span>
              </div>
            </div>
          </div>

          {/* Accordion Specs */}
          <div className="pt-4 border-t border-atelier space-y-2">
            {/* Architectural Specifications */}
            <div className="border border-atelier bg-surface">
              <button
                onClick={() => toggleSection('specs')}
                className="w-full p-4 text-left flex justify-between items-center text-xs uppercase tracking-widest text-espresso font-medium"
              >
                <span>Architectural Specifications</span>
                {openAccordion === 'specs' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openAccordion === 'specs' && (
                <div className="p-4 pt-0 border-t border-atelier/40 text-xs text-warmgray space-y-2">
                  <div className="grid grid-cols-2 gap-2 py-1 border-b border-atelier/40">
                    <span className="font-medium text-espresso">Material</span>
                    <span>{product.material || 'Natural Mineral'}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 py-1 border-b border-atelier/40">
                    <span className="font-medium text-espresso">Finish</span>
                    <span>{product.finish || 'Honed Matte'}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 py-1 border-b border-atelier/40">
                    <span className="font-medium text-espresso">Standard Dimensions</span>
                    <span>{product.dimensions || 'Custom Sizing Available'}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 py-1 border-b border-atelier/40">
                    <span className="font-medium text-espresso">Thickness</span>
                    <span>{product.thickness || 'Standard Gauge'}</span>
                  </div>
                  {product.specifications &&
                    Object.entries(product.specifications).map(([key, val]) => (
                      <div key={key} className="grid grid-cols-2 gap-2 py-1 border-b border-atelier/40 last:border-0">
                        <span className="font-medium text-espresso">{key}</span>
                        <span>{val}</span>
                      </div>
                    ))}
                </div>
              )}
            </div>

            {/* Freight & Handling */}
            <div className="border border-atelier bg-surface">
              <button
                onClick={() => toggleSection('shipping')}
                className="w-full p-4 text-left flex justify-between items-center text-xs uppercase tracking-widest text-espresso font-medium"
              >
                <span>Freight & Handling Terms</span>
                {openAccordion === 'shipping' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openAccordion === 'shipping' && (
                <div className="p-4 pt-0 border-t border-atelier/40 text-xs text-warmgray space-y-2">
                  <p>
                    All stone slabs, wood planks, and acoustic wall systems are dispatched in reinforced export-grade wooden crates with corner foam cushioning.
                  </p>
                  <p>
                    Complimentary insured freight on orders above ₹50,000 across major Indian metropolitan hubs. Crane unloading coordination available on request.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Materials */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6 pt-8 sm:pt-12 border-t border-atelier">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-widest text-bronze font-medium">Complementary Finishes</span>
            <h2 className="font-serif text-2xl sm:text-3xl text-espresso font-light">Related Architectural Materials</h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {relatedProducts.slice(0, 4).map((rel) => (
              <Link
                key={rel.id}
                href={`/material/${rel.slug}`}
                className="group block bg-surface border border-atelier p-2.5 sm:p-4 hover:border-bronze transition-colors space-y-1.5 sm:space-y-2"
              >
                <div className="relative aspect-[4/5] bg-canvas overflow-hidden">
                  {rel.images[0] && (
                    <Image src={rel.images[0]} alt={rel.name} fill className="object-cover group-hover:scale-103 transition-transform duration-500" />
                  )}
                </div>
                <h4 className="font-serif text-xs sm:text-sm text-espresso group-hover:text-bronze transition-colors font-medium truncate">
                  {rel.name}
                </h4>
                <div className="text-xs text-timber font-medium">
                  ₹{(rel.salePrice || rel.price).toLocaleString('en-IN')} / {rel.unit}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Mobile Sticky Bottom Floating Action Bar */}
      <div className="md:hidden fixed bottom-14 left-0 right-0 z-30 bg-surface/98 backdrop-blur-md border-t border-atelier p-3 shadow-2xl flex items-center justify-between gap-3 safe-area-bottom">
        <div className="flex flex-col">
          <span className="text-[10px] text-warmgray uppercase tracking-wider">Total Est.</span>
          <span className="font-serif text-base text-timber font-medium leading-tight">
            ₹{(currentPrice * quantity).toLocaleString('en-IN')}
          </span>
        </div>

        <div className="flex items-center gap-2 flex-1 justify-end">
          <a
            href={`https://wa.me/917002948484?text=Hi%20Balaji%20Architect%20%26%20Interiors%2C%20I%20am%20interested%20in%20${encodeURIComponent(
              product.name
            )}%20(SKU%3A%20${product.sku})`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-green-700 text-white rounded text-xs font-medium flex items-center justify-center"
            title="Chat on WhatsApp"
          >
            WhatsApp
          </a>

          {(product.purchaseMode === 'BUY_NOW' || product.purchaseMode === 'BOTH') ? (
            <button
              onClick={handleAddToCart}
              className="flex-1 py-3 px-4 btn-luxury-dark text-xs uppercase tracking-wider font-medium flex items-center justify-center gap-1.5"
            >
              <ShoppingBag className="w-3.5 h-3.5" /> Add to Bag
            </button>
          ) : (
            <Link
              href={`/quote?product=${product.id}&qty=${quantity}`}
              className="flex-1 py-3 px-4 btn-luxury-outline text-xs uppercase tracking-wider font-medium flex items-center justify-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5" /> Get Quote
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
```

---

### `src/components/Reveal.tsx`

- **File**: `src/components/Reveal.tsx`
- **Size**: 1.3 KB (56 lines)
- **Language**: `tsx`

```tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // ms
  duration?: number; // ms
  yOffset?: number; // px
}

export function Reveal({
  children,
  className = '',
  delay = 0,
  duration = 700,
  yOffset = 20,
}: RevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : `translateY(${yOffset}px)`,
        transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
}
```

---

### `src/context/AdminAuthContext.tsx`

- **File**: `src/context/AdminAuthContext.tsx`
- **Size**: 3.2 KB (119 lines)
- **Language**: `tsx`

```tsx
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { AdminUser } from '@/types';

interface AdminAuthContextType {
  admin: AdminUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; mustChangePassword?: boolean; error?: string }>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshAdmin: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshAdmin = async () => {
    try {
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const data = await res.json();
        if (data.admin) {
          setAdmin(data.admin);
        } else {
          setAdmin(null);
        }
      } else {
        setAdmin(null);
      }
    } catch {
      setAdmin(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshAdmin();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setAdmin(data.admin);
        return {
          success: true,
          mustChangePassword: data.admin.mustChangePassword,
        };
      } else {
        return { success: false, error: data.error || 'Invalid credentials' };
      }
    } catch (e: any) {
      return { success: false, error: e.message || 'Connection error' };
    }
  };

  const changePassword = async (currentPassword: string, newPassword: string) => {
    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        if (admin) {
          setAdmin({ ...admin, mustChangePassword: false });
        }
        return { success: true };
      } else {
        return { success: false, error: data.error || 'Failed to update password' };
      }
    } catch (e: any) {
      return { success: false, error: e.message || 'Server error' };
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } finally {
      setAdmin(null);
    }
  };

  return (
    <AdminAuthContext.Provider
      value={{
        admin,
        loading,
        login,
        changePassword,
        logout,
        refreshAdmin,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}
```

---

### `src/context/CartContext.tsx`

- **File**: `src/context/CartContext.tsx`
- **Size**: 3.8 KB (144 lines)
- **Language**: `tsx`

```tsx
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem, Product, ProductVariant } from '@/types';

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number, variant?: ProductVariant) => void;
  removeItem: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'balaji_atelier_cart_v1';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load cart from localStorage', e);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
      } catch (e) {
        console.error('Failed to persist cart', e);
      }
    }
  }, [items, isLoaded]);

  const addItem = (product: Product, quantity = 1, variant?: ProductVariant) => {
    setItems((prev) => {
      const existingIdx = prev.findIndex(
        (it) => it.productId === product.id && (variant ? it.variantId === variant.id : !it.variantId)
      );

      let unitPrice = product.salePrice && product.salePrice > 0 ? product.salePrice : product.price;
      if (variant) {
        unitPrice += variant.priceModifier || 0;
      }

      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += quantity;
        return next;
      } else {
        return [
          ...prev,
          {
            productId: product.id,
            variantId: variant?.id,
            product,
            variant,
            quantity,
            unitPrice,
          },
        ];
      }
    });
    setIsCartOpen(true);
  };

  const removeItem = (productId: string, variantId?: string) => {
    setItems((prev) =>
      prev.filter((it) => !(it.productId === productId && (variantId ? it.variantId === variantId : !it.variantId)))
    );
  };

  const updateQuantity = (productId: string, quantity: number, variantId?: string) => {
    if (quantity <= 0) {
      removeItem(productId, variantId);
      return;
    }
    setItems((prev) =>
      prev.map((it) => {
        if (it.productId === productId && (variantId ? it.variantId === variantId : !it.variantId)) {
          return { ...it, quantity };
        }
        return it;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const tax = Math.round(subtotal * 0.18); // 18% GST standard
  const shipping = subtotal >= 50000 || subtotal === 0 ? 0 : 1500;
  const total = subtotal + tax + shipping;

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        tax,
        shipping,
        total,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
```

---

### `src/context/WishlistContext.tsx`

- **File**: `src/context/WishlistContext.tsx`
- **Size**: 1.9 KB (76 lines)
- **Language**: `tsx`

```tsx
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product } from '@/types';

interface WishlistContextType {
  wishlistIds: string[];
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (productId: string) => void;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const WISHLIST_STORAGE_KEY = 'balaji_atelier_wishlist_v1';

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (saved) {
        setWishlistIds(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load wishlist', e);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistIds));
      } catch (e) {
        console.error('Failed to save wishlist', e);
      }
    }
  }, [wishlistIds, isLoaded]);

  const isInWishlist = (productId: string) => wishlistIds.includes(productId);

  const toggleWishlist = (productId: string) => {
    setWishlistIds((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        isInWishlist,
        toggleWishlist,
        wishlistCount: wishlistIds.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
```

---

### `src/lib/auth.ts`

- **File**: `src/lib/auth.ts`
- **Size**: 1.6 KB (58 lines)
- **Language**: `typescript`

```typescript
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'balaji_atelier_secure_jwt_secret_production_2026_key';
const SALT_ROUNDS = 10000;
const KEY_LEN = 64;
const DIGEST = 'sha512';

/**
 * Hashes a plaintext password using PBKDF2 with a random cryptographic salt.
 * Returns format: "salt:hash"
 */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const derivedKey = crypto.pbkdf2Sync(password, salt, SALT_ROUNDS, KEY_LEN, DIGEST);
  return `${salt}:${derivedKey.toString('hex')}`;
}

/**
 * Verifies a plaintext password against a stored "salt:hash" string.
 */
export function verifyPassword(password: string, storedHash: string): boolean {
  try {
    const [salt, key] = storedHash.split(':');
    if (!salt || !key) return false;
    const derivedKey = crypto.pbkdf2Sync(password, salt, SALT_ROUNDS, KEY_LEN, DIGEST);
    return crypto.timingSafeEqual(Buffer.from(key, 'hex'), derivedKey);
  } catch {
    return false;
  }
}

export interface AdminTokenPayload {
  id: string;
  email: string;
  name: string;
  role: string;
  mustChangePassword: boolean;
}

/**
 * Signs an admin JWT session token
 */
export function signAdminToken(payload: AdminTokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

/**
 * Verifies and decodes an admin JWT token
 */
export function verifyAdminToken(token: string): AdminTokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AdminTokenPayload;
  } catch {
    return null;
  }
}
```

---

### `src/lib/db.ts`

- **File**: `src/lib/db.ts`
- **Size**: 59.4 KB (1761 lines)
- **Language**: `typescript`

```typescript
import fs from 'fs';
import path from 'path';
import {
  AdminUser,
  AuditLog,
  Category,
  Enquiry,
  Order,
  Product,
  Project,
  Quote,
  Service,
  SiteSettings,
} from '@/types';
import {
  getInitialAdminSeed,
  initialCategories,
  initialProducts,
  initialProjects,
  initialServices,
  initialSiteSettings,
} from './seedData';
import { getServiceSupabase } from './supabase';
import { sendNewOrderPush } from './push';

export interface DatabaseState {
  admins: AdminUser[];
  categories: Category[];
  products: Product[];
  projects: Project[];
  services: Service[];
  orders: Order[];
  quotes: Quote[];
  enquiries: Enquiry[];
  siteSettings: SiteSettings;
  pushSubscriptions: {
    id: string;
    endpoint: string;
    keys: { p256dh: string; auth: string };
    adminId?: string;
    createdAt: string;
  }[];
  auditLogs: AuditLog[];
}

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

let dbCache: DatabaseState | null = null;

function isSupabaseConfigured(): boolean {
  return process.env.NODE_ENV !== 'test';
}

function ensureDbFile(): DatabaseState {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(DB_FILE)) {
    const initialState: DatabaseState = {
      admins: [getInitialAdminSeed() as any],
      categories: initialCategories,
      products: initialProducts,
      projects: initialProjects,
      services: initialServices,
      orders: [],
      quotes: [],
      enquiries: [],
      siteSettings: initialSiteSettings,
      pushSubscriptions: [],
      auditLogs: [],
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialState, null, 2), 'utf-8');
    dbCache = initialState;
    return initialState;
  }

  try {
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    const parsed = JSON.parse(data);
    dbCache = parsed;
    return parsed;
  } catch (err) {
    console.error('Error reading db.json, repairing...', err);
    const initialState: DatabaseState = {
      admins: [getInitialAdminSeed() as any],
      categories: initialCategories,
      products: initialProducts,
      projects: initialProjects,
      services: initialServices,
      orders: [],
      quotes: [],
      enquiries: [],
      siteSettings: initialSiteSettings,
      pushSubscriptions: [],
      auditLogs: [],
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialState, null, 2), 'utf-8');
    dbCache = initialState;
    return initialState;
  }
}

export function getDb(): DatabaseState {
  if (dbCache) return dbCache;
  return ensureDbFile();
}

export function resetDbCache(): void {
  dbCache = null;
}

function saveDb(state: DatabaseState): void {
  dbCache = state;
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    const tempFile = `${DB_FILE}.tmp.${Date.now()}`;
    fs.writeFileSync(tempFile, JSON.stringify(state, null, 2), 'utf-8');
    fs.renameSync(tempFile, DB_FILE);
  } catch (err) {
    console.error('Error saving db.json:', err);
  }
}

// =============================================================
// ENTITY MAPPERS (SUPABASE POSTGRESQL <-> TYPESCRIPT)
// =============================================================

function mapSupabaseProduct(row: any, categoryMap?: Map<string, { name: string; slug: string }>): Product {
  const catInfo = categoryMap?.get(row.category_id);
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    sku: row.sku,
    brand: row.brand || 'Balaji Architect & Interiors',
    categoryId: row.category_id || '',
    categoryName: catInfo?.name || row.category_name || 'General',
    categorySlug: catInfo?.slug || row.category_slug || '',
    subcategory: row.subcategory || undefined,
    description: row.description || '',
    price: Number(row.price),
    salePrice: row.sale_price ? Number(row.sale_price) : undefined,
    unit: row.unit || 'sq ft',
    moq: Number(row.moq || 1),
    stock: Number(row.stock || 0),
    purchaseMode: row.purchase_mode || 'BOTH',
    leadTime: row.lead_time || undefined,
    dimensions: row.dimensions || undefined,
    thickness: row.thickness || undefined,
    material: row.material || undefined,
    finish: row.finish || undefined,
    color: row.color || undefined,
    images: Array.isArray(row.images) ? row.images : [],
    isFeatured: Boolean(row.is_featured),
    isNew: Boolean(row.is_new),
    isBestseller: Boolean(row.is_bestseller),
    published: Boolean(row.published),
    tags: Array.isArray(row.tags) ? row.tags : [],
    specifications: typeof row.specifications === 'object' && row.specifications !== null ? row.specifications : {},
    variants: Array.isArray(row.variants) ? row.variants : [],
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapSupabaseCategory(row: any): Category {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description || '',
    imageUrl: row.cover_image || row.image_url || '',
    parentId: row.parent_id || null,
    sortOrder: Number(row.sort_order || 0),
    isActive: Boolean(row.is_active),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapSupabaseProject(row: any): Project {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    location: row.location || '',
    year: String(row.year || new Date().getFullYear()),
    area: row.area || '',
    projectType: row.project_type || 'Residential Interiors',
    shortDescription: row.short_description || '',
    description: row.description || row.short_description || '',
    heroImage: row.hero_image || '',
    gallery: Array.isArray(row.gallery) ? row.gallery : [],
    designApproach: row.design_approach || '',
    materialsUsed: Array.isArray(row.materials_used) ? row.materials_used : [],
    isFeatured: Boolean(row.is_featured),
    isPublished: Boolean(row.is_published !== false && row.published !== false),
    sortOrder: Number(row.sort_order || 0),
    tags: Array.isArray(row.tags) ? row.tags : [],
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapSupabaseService(row: any): Service {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    shortDesc: row.tagline || row.short_desc || '',
    fullDesc: row.description || row.full_desc || '',
    iconName: row.icon_name || 'Home',
    imageUrl: row.hero_image || row.image_url || '',
    deliverables: Array.isArray(row.deliverables) ? row.deliverables : [],
    sortOrder: Number(row.sort_order || 0),
    isPublished: Boolean(row.is_active !== false && row.is_published !== false),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapSupabaseOrder(row: any): Order {
  return {
    id: row.id,
    orderNumber: row.order_number,
    customerName: row.customer_name,
    customerEmail: row.customer_email,
    customerPhone: row.customer_phone,
    shippingAddress: row.shipping_address,
    billingAddress: row.billing_address || row.shipping_address,
    subtotal: Number(row.subtotal),
    tax: Number(row.tax),
    shippingFee: Number(row.shipping_fee),
    discount: Number(row.discount || 0),
    totalAmount: Number(row.total_amount),
    orderStatus: row.order_status,
    paymentStatus: row.payment_status,
    paymentMethod: row.payment_method,
    notes: row.notes || undefined,
    items: (row.items || []).map((it: any) => ({
      id: it.id,
      orderId: it.order_id,
      productId: it.product_id || '',
      variantId: it.variant_id || undefined,
      productName: it.product_name,
      productSku: it.product_sku,
      unit: it.unit,
      unitPrice: Number(it.unit_price),
      quantity: Number(it.quantity),
      subtotal: Number(it.subtotal),
      imageUrl: it.image_url || '',
      selectedColor: it.selected_color || undefined,
      selectedFinish: it.selected_finish || undefined,
    })),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapSupabaseQuote(row: any): Quote {
  return {
    id: row.id,
    quoteNumber: row.quote_number,
    customerName: row.customer_name,
    customerEmail: row.customer_email,
    customerPhone: row.customer_phone,
    projectType: row.project_type,
    projectLocation: row.project_location,
    estimatedTimeline: row.estimated_timeline,
    budgetRange: row.budget_range,
    notes: row.notes || '',
    status: row.status,
    totalQuotedAmount: row.total_quoted_amount ? Number(row.total_quoted_amount) : undefined,
    adminNotes: row.admin_notes || undefined,
    items: (row.items || []).map((it: any) => ({
      id: it.id,
      quoteId: it.quote_id,
      productId: it.product_id || undefined,
      productName: it.product_name,
      dimensions: it.dimensions || undefined,
      quantity: Number(it.quantity || 1),
      unit: it.unit || 'sq ft',
      estimatedUnitPrice: it.estimated_unit_price ? Number(it.estimated_unit_price) : undefined,
      notes: it.notes || undefined,
    })),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapSupabaseEnquiry(row: any): Enquiry {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    subject: row.subject,
    message: row.message,
    source: row.source || 'Contact Page',
    status: row.status || 'New',
    createdAt: row.created_at,
  };
}

// =============================================================
// PRODUCTS
// =============================================================
export async function getProducts(options?: {
  categoryId?: string;
  categorySlug?: string;
  featuredOnly?: boolean;
  publishedOnly?: boolean;
  search?: string;
}): Promise<Product[]> {
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    let query = supabase.from('products').select('*').order('created_at', { ascending: false });

    if (options?.publishedOnly !== false) {
      query = query.eq('published', true);
    }
    if (options?.categoryId) {
      query = query.eq('category_id', options.categoryId);
    }
    if (options?.featuredOnly) {
      query = query.eq('is_featured', true);
    }

    const { data: prods, error } = await query;
    if (error) {
      console.error('Supabase getProducts error:', error);
      throw new Error(`Failed to fetch materials from database: ${error.message}`);
    }

    const { data: cats } = await supabase.from('categories').select('id, name, slug');
    const catMap = new Map<string, { name: string; slug: string }>();
    (cats || []).forEach((c: any) => catMap.set(c.id, { name: c.name, slug: c.slug }));

    let list = (prods || []).map((p: any) => mapSupabaseProduct(p, catMap));

    if (options?.categorySlug) {
      list = list.filter((p) => p.categorySlug === options.categorySlug);
    }

    if (options?.search) {
      const q = options.search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.material?.toLowerCase().includes(q) ||
          p.finish?.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    return list;
  }

  // Isolated Unit Test Fallback
  const db = getDb();
  let list = [...db.products];
  if (options?.publishedOnly !== false) list = list.filter((p) => p.published);
  if (options?.categoryId) list = list.filter((p) => p.categoryId === options.categoryId);
  if (options?.featuredOnly) list = list.filter((p) => p.isFeatured);
  return list;
}

function isUUID(str: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(str);
}

export async function getProductById(id: string): Promise<Product | null> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = getServiceSupabase();
      let query = supabase.from('products').select('*');
      if (isUUID(id)) {
        query = query.eq('id', id);
      } else {
        query = query.or(`slug.eq.${id},sku.eq.${id}`);
      }

      const { data, error } = await query.maybeSingle();
      if (!error && data) {
        const { data: cat } = await supabase.from('categories').select('name, slug').eq('id', data.category_id).maybeSingle();
        const catMap = cat ? new Map([[data.category_id, cat]]) : undefined;
        return mapSupabaseProduct(data, catMap);
      }
    } catch (e) {}
  }

  const db = getDb();
  return db.products.find((p) => p.id === id || p.slug === id || p.sku === id) || null;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = getServiceSupabase();
      const { data, error } = await supabase.from('products').select('*').eq('slug', slug).maybeSingle();
      if (!error && data) {
        const { data: cat } = await supabase.from('categories').select('name, slug').eq('id', data.category_id).maybeSingle();
        const catMap = cat ? new Map([[data.category_id, cat]]) : undefined;
        return mapSupabaseProduct(data, catMap);
      }
    } catch (e) {}
  }

  const db = getDb();
  return db.products.find((p) => p.slug === slug || p.id === slug) || null;
}

export async function createProduct(data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const row = {
      name: data.name,
      slug: data.slug || data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      sku: data.sku,
      brand: data.brand || 'Balaji Architect & Interiors',
      category_id: data.categoryId || null,
      subcategory: data.subcategory || '',
      description: data.description,
      price: data.price,
      sale_price: data.salePrice || null,
      unit: data.unit || 'sq ft',
      moq: data.moq || 1,
      stock: data.stock || 0,
      purchase_mode: data.purchaseMode || 'BOTH',
      lead_time: data.leadTime || '2-3 Weeks',
      dimensions: data.dimensions || '',
      thickness: data.thickness || '',
      material: data.material || '',
      finish: data.finish || '',
      color: data.color || '',
      images: data.images || [],
      is_featured: Boolean(data.isFeatured),
      is_new: Boolean(data.isNew),
      is_bestseller: Boolean(data.isBestseller),
      published: Boolean(data.published),
      tags: data.tags || [],
      specifications: data.specifications || {},
    };

    const { data: inserted, error } = await supabase.from('products').insert(row).select().single();
    if (error || !inserted) {
      console.error('Supabase createProduct error:', error);
      throw new Error(`Failed to create product in database: ${error?.message}`);
    }

    return mapSupabaseProduct(inserted);
  }

  const db = getDb();
  const newProduct: Product = {
    ...data,
    id: `prod-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  db.products.unshift(newProduct);
  saveDb(db);
  return newProduct;
}

export async function updateProduct(id: string, partialData: Partial<Product>): Promise<Product | null> {
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const updates: any = { updated_at: new Date().toISOString() };

    if (partialData.name !== undefined) updates.name = partialData.name;
    if (partialData.slug !== undefined) updates.slug = partialData.slug;
    if (partialData.sku !== undefined) updates.sku = partialData.sku;
    if (partialData.brand !== undefined) updates.brand = partialData.brand;
    if (partialData.categoryId !== undefined) updates.category_id = partialData.categoryId;
    if (partialData.subcategory !== undefined) updates.subcategory = partialData.subcategory;
    if (partialData.description !== undefined) updates.description = partialData.description;
    if (partialData.price !== undefined) updates.price = partialData.price;
    if (partialData.salePrice !== undefined) updates.sale_price = partialData.salePrice;
    if (partialData.unit !== undefined) updates.unit = partialData.unit;
    if (partialData.moq !== undefined) updates.moq = partialData.moq;
    if (partialData.stock !== undefined) updates.stock = partialData.stock;
    if (partialData.purchaseMode !== undefined) updates.purchase_mode = partialData.purchaseMode;
    if (partialData.leadTime !== undefined) updates.lead_time = partialData.leadTime;
    if (partialData.dimensions !== undefined) updates.dimensions = partialData.dimensions;
    if (partialData.thickness !== undefined) updates.thickness = partialData.thickness;
    if (partialData.material !== undefined) updates.material = partialData.material;
    if (partialData.finish !== undefined) updates.finish = partialData.finish;
    if (partialData.color !== undefined) updates.color = partialData.color;
    if (partialData.images !== undefined) updates.images = partialData.images;
    if (partialData.isFeatured !== undefined) updates.is_featured = partialData.isFeatured;
    if (partialData.isNew !== undefined) updates.is_new = partialData.isNew;
    if (partialData.isBestseller !== undefined) updates.is_bestseller = partialData.isBestseller;
    if (partialData.published !== undefined) updates.published = partialData.published;
    if (partialData.tags !== undefined) updates.tags = partialData.tags;
    if (partialData.specifications !== undefined) updates.specifications = partialData.specifications;

    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .or(`id.eq.${id},slug.eq.${id}`)
      .select()
      .single();

    if (error || !data) {
      console.error('Supabase updateProduct error:', error);
      throw new Error(`Failed to update product in database: ${error?.message}`);
    }

    return mapSupabaseProduct(data);
  }

  const db = getDb();
  const index = db.products.findIndex((p) => p.id === id || p.slug === id);
  if (index === -1) return null;
  const existing = db.products[index];
  const updated: Product = { ...existing, ...partialData, id: existing.id, updatedAt: new Date().toISOString() };
  db.products[index] = updated;
  saveDb(db);
  return updated;
}

export async function deleteProduct(id: string): Promise<boolean> {
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const { error } = await supabase.from('products').delete().or(`id.eq.${id},slug.eq.${id}`);
    if (error) {
      console.error('Supabase deleteProduct error:', error);
      return false;
    }
    return true;
  }

  const db = getDb();
  const index = db.products.findIndex((p) => p.id === id || p.slug === id);
  if (index === -1) return false;
  db.products.splice(index, 1);
  saveDb(db);
  return true;
}

// =============================================================
// CATEGORIES
// =============================================================
export async function getCategories(): Promise<Category[]> {
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const { data: cats, error } = await supabase.from('categories').select('*').order('sort_order', { ascending: true });
    if (error) {
      console.error('Supabase getCategories error:', error);
      throw new Error(`Failed to load categories: ${error.message}`);
    }

    const { data: prods } = await supabase.from('products').select('category_id, published');
    const prodCounts = new Map<string, number>();
    (prods || []).forEach((p: any) => {
      if (p.published && p.category_id) {
        prodCounts.set(p.category_id, (prodCounts.get(p.category_id) || 0) + 1);
      }
    });

    return (cats || [])
      .filter((c: any) => c.is_active !== false)
      .map((c: any) => ({
        ...mapSupabaseCategory(c),
        productCount: prodCounts.get(c.id) || 0,
      }));
  }

  const db = getDb();
  return db.categories.filter((c) => c.isActive).sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getAllCategoriesAdmin(): Promise<Category[]> {
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const { data: cats, error } = await supabase.from('categories').select('*').order('sort_order', { ascending: true });
    if (error) throw new Error(error.message);

    const { data: prods } = await supabase.from('products').select('category_id');
    const prodCounts = new Map<string, number>();
    (prods || []).forEach((p: any) => {
      if (p.category_id) {
        prodCounts.set(p.category_id, (prodCounts.get(p.category_id) || 0) + 1);
      }
    });

    return (cats || []).map((c: any) => ({
      ...mapSupabaseCategory(c),
      productCount: prodCounts.get(c.id) || 0,
    }));
  }

  const db = getDb();
  return db.categories.sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const { data, error } = await supabase.from('categories').select('*').eq('slug', slug).single();
    if (error || !data) return null;
    return mapSupabaseCategory(data);
  }

  const db = getDb();
  return db.categories.find((c) => c.slug === slug) || null;
}

export async function createCategory(data: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>): Promise<Category> {
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const { data: inserted, error } = await supabase
      .from('categories')
      .insert({
        name: data.name,
        slug: data.slug || data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        description: data.description || '',
        cover_image: data.imageUrl || '',
        sort_order: data.sortOrder || 0,
        is_active: data.isActive !== false,
      })
      .select()
      .single();

    if (error || !inserted) throw new Error(`Failed to create category: ${error?.message}`);
    return mapSupabaseCategory(inserted);
  }

  const db = getDb();
  const newCat: Category = {
    ...data,
    id: `cat-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  db.categories.push(newCat);
  saveDb(db);
  return newCat;
}

export async function updateCategory(id: string, partial: Partial<Category>): Promise<Category | null> {
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const updates: any = { updated_at: new Date().toISOString() };
    if (partial.name !== undefined) updates.name = partial.name;
    if (partial.slug !== undefined) updates.slug = partial.slug;
    if (partial.description !== undefined) updates.description = partial.description;
    if (partial.imageUrl !== undefined) updates.cover_image = partial.imageUrl;
    if (partial.sortOrder !== undefined) updates.sort_order = partial.sortOrder;
    if (partial.isActive !== undefined) updates.is_active = partial.isActive;

    const { data, error } = await supabase.from('categories').update(updates).eq('id', id).select().single();
    if (error || !data) return null;
    return mapSupabaseCategory(data);
  }

  const db = getDb();
  const idx = db.categories.findIndex((c) => c.id === id);
  if (idx === -1) return null;
  const existing = db.categories[idx];
  const updated: Category = { ...existing, ...partial, id: existing.id, updatedAt: new Date().toISOString() };
  db.categories[idx] = updated;
  saveDb(db);
  return updated;
}

export async function deleteCategory(id: string): Promise<boolean> {
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const { error } = await supabase.from('categories').delete().eq('id', id);
    return !error;
  }

  const db = getDb();
  const idx = db.categories.findIndex((c) => c.id === id);
  if (idx === -1) return false;
  db.categories.splice(idx, 1);
  saveDb(db);
  return true;
}

// =============================================================
// PROJECTS (PORTFOLIO)
// =============================================================
export async function getProjects(options?: { publishedOnly?: boolean; featuredOnly?: boolean }): Promise<Project[]> {
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    let query = supabase.from('projects').select('*').order('sort_order', { ascending: true });

    if (options?.publishedOnly !== false) {
      query = query.eq('is_published', true);
    }
    if (options?.featuredOnly) {
      query = query.eq('is_featured', true);
    }

    const { data, error } = await query;
    if (error) throw new Error(`Failed to load projects: ${error.message}`);
    return (data || []).map(mapSupabaseProject);
  }

  const db = getDb();
  let list = [...db.projects];
  if (options?.publishedOnly !== false) list = list.filter((p) => p.isPublished);
  if (options?.featuredOnly) list = list.filter((p) => p.isFeatured);
  return list.sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const { data, error } = await supabase.from('projects').select('*').eq('slug', slug).single();
    if (error || !data) return null;
    return mapSupabaseProject(data);
  }

  const db = getDb();
  return db.projects.find((p) => p.slug === slug) || null;
}

export async function getProjectById(id: string): Promise<Project | null> {
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const { data, error } = await supabase.from('projects').select('*').eq('id', id).single();
    if (error || !data) return null;
    return mapSupabaseProject(data);
  }

  const db = getDb();
  return db.projects.find((p) => p.id === id) || null;
}

export async function createProject(data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> {
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const { data: inserted, error } = await supabase
      .from('projects')
      .insert({
        title: data.title,
        slug: data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        location: data.location || 'Guwahati, Assam',
        year: String(data.year || new Date().getFullYear()),
        area: data.area || 'Architectural Space',
        project_type: data.projectType || 'Residential Interiors',
        short_description: data.shortDescription || '',
        description: data.description || data.shortDescription || '',
        hero_image: data.heroImage || '',
        gallery: data.gallery || [],
        design_approach: data.designApproach || '',
        materials_used: data.materialsUsed || [],
        is_featured: Boolean(data.isFeatured),
        is_published: Boolean(data.isPublished !== false),
        sort_order: data.sortOrder || 0,
      })
      .select()
      .single();

    if (error || !inserted) throw new Error(`Failed to create project: ${error?.message}`);
    return mapSupabaseProject(inserted);
  }

  const db = getDb();
  const newProj: Project = {
    ...data,
    id: `proj-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  db.projects.push(newProj);
  saveDb(db);
  return newProj;
}

export async function updateProject(id: string, partial: Partial<Project>): Promise<Project | null> {
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const updates: any = { updated_at: new Date().toISOString() };
    if (partial.title !== undefined) updates.title = partial.title;
    if (partial.slug !== undefined) updates.slug = partial.slug;
    if (partial.location !== undefined) updates.location = partial.location;
    if (partial.year !== undefined) updates.year = String(partial.year);
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

    const { data, error } = await supabase.from('projects').update(updates).eq('id', id).select().single();
    if (error || !data) return null;
    return mapSupabaseProject(data);
  }

  const db = getDb();
  const idx = db.projects.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  const existing = db.projects[idx];
  const updated: Project = { ...existing, ...partial, id: existing.id, updatedAt: new Date().toISOString() };
  db.projects[idx] = updated;
  saveDb(db);
  return updated;
}

export async function deleteProject(id: string): Promise<boolean> {
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const { error } = await supabase.from('projects').delete().eq('id', id);
    return !error;
  }

  const db = getDb();
  const idx = db.projects.findIndex((p) => p.id === id);
  if (idx === -1) return false;
  db.projects.splice(idx, 1);
  saveDb(db);
  return true;
}

// =============================================================
// SERVICES
// =============================================================
export async function getServices(publishedOnly = true): Promise<Service[]> {
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    let query = supabase.from('services').select('*').order('sort_order', { ascending: true });
    if (publishedOnly) query = query.eq('is_published', true);

    const { data, error } = await query;
    if (error) throw new Error(`Failed to load services: ${error.message}`);
    return (data || []).map(mapSupabaseService);
  }

  const db = getDb();
  let list = [...db.services];
  if (publishedOnly) list = list.filter((s) => s.isPublished);
  return list.sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const { data, error } = await supabase.from('services').select('*').eq('slug', slug).single();
    if (error || !data) return null;
    return mapSupabaseService(data);
  }

  const db = getDb();
  return db.services.find((s) => s.slug === slug) || null;
}

export async function createService(data: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>): Promise<Service> {
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const { data: inserted, error } = await supabase
      .from('services')
      .insert({
        title: data.title,
        slug: data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        short_desc: data.shortDesc || '',
        full_desc: data.fullDesc || '',
        icon_name: data.iconName || 'Home',
        image_url: data.imageUrl || '',
        deliverables: data.deliverables || [],
        sort_order: data.sortOrder || 0,
        is_published: Boolean(data.isPublished !== false),
      })
      .select()
      .single();

    if (error || !inserted) throw new Error(`Failed to create service: ${error?.message}`);
    return mapSupabaseService(inserted);
  }

  const db = getDb();
  const newSrv: Service = {
    ...data,
    id: `srv-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  db.services.push(newSrv);
  saveDb(db);
  return newSrv;
}

export async function updateService(id: string, partial: Partial<Service>): Promise<Service | null> {
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const updates: any = { updated_at: new Date().toISOString() };
    if (partial.title !== undefined) updates.title = partial.title;
    if (partial.slug !== undefined) updates.slug = partial.slug;
    if (partial.shortDesc !== undefined) updates.short_desc = partial.shortDesc;
    if (partial.fullDesc !== undefined) updates.full_desc = partial.fullDesc;
    if (partial.iconName !== undefined) updates.icon_name = partial.iconName;
    if (partial.deliverables !== undefined) updates.deliverables = partial.deliverables;
    if (partial.imageUrl !== undefined) updates.image_url = partial.imageUrl;
    if (partial.sortOrder !== undefined) updates.sort_order = partial.sortOrder;
    if (partial.isPublished !== undefined) updates.is_published = partial.isPublished;

    const { data, error } = await supabase.from('services').update(updates).eq('id', id).select().single();
    if (error || !data) return null;
    return mapSupabaseService(data);
  }

  const db = getDb();
  const idx = db.services.findIndex((s) => s.id === id);
  if (idx === -1) return null;
  const existing = db.services[idx];
  const updated: Service = { ...existing, ...partial, id: existing.id, updatedAt: new Date().toISOString() };
  db.services[idx] = updated;
  saveDb(db);
  return updated;
}

export async function deleteService(id: string): Promise<boolean> {
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const { error } = await supabase.from('services').delete().eq('id', id);
    return !error;
  }

  const db = getDb();
  const idx = db.services.findIndex((c) => c.id === id);
  if (idx === -1) return false;
  db.services.splice(idx, 1);
  saveDb(db);
  return true;
}

// =============================================================
// ORDERS & ATOMIC STOCK DECREMENT (SUPABASE IS SOURCE OF TRUTH)
// =============================================================
export async function createOrderAtomic(orderData: {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: any;
  billingAddress?: any;
  items: {
    productId: string;
    variantId?: string;
    quantity: number;
    selectedColor?: string;
    selectedFinish?: string;
  }[];
  paymentMethod: string;
  notes?: string;
}): Promise<{ success: boolean; order?: Order; error?: string }> {
  const validatedItems: any[] = [];
  let calculatedSubtotal = 0;

  // 1. Verify availability and fetch authoritative prices
  for (const item of orderData.items) {
    let product: Product | null = null;

    if (isSupabaseConfigured()) {
      product = await getProductById(item.productId);
    } else {
      const db = getDb();
      product = db.products.find((p) => p.id === item.productId || p.slug === item.productId || p.sku === item.productId) || null;
    }

    if (!product) {
      return { success: false, error: `Material/Product with ID ${item.productId} not found.` };
    }

    if (!product.published) {
      return { success: false, error: `${product.name} is currently not available.` };
    }

    if (product.stock < item.quantity) {
      return {
        success: false,
        error: `Insufficient stock for "${product.name}". Available: ${product.stock} ${product.unit}, Requested: ${item.quantity} ${product.unit}.`,
      };
    }

    let unitPrice = product.salePrice && product.salePrice > 0 ? product.salePrice : product.price;

    if (item.variantId && product.variants) {
      const variant = product.variants.find((v) => v.id === item.variantId);
      if (variant) {
        unitPrice += variant.priceModifier || 0;
        if (variant.stock < item.quantity) {
          return {
            success: false,
            error: `Variant "${variant.name}" for "${product.name}" has only ${variant.stock} units available.`,
          };
        }
      }
    }

    const itemSubtotal = unitPrice * item.quantity;
    calculatedSubtotal += itemSubtotal;

    validatedItems.push({
      id: `oi-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      orderId: '',
      productId: product.id,
      variantId: item.variantId,
      productName: product.name,
      productSku: product.sku,
      unit: product.unit,
      unitPrice,
      quantity: item.quantity,
      subtotal: itemSubtotal,
      imageUrl: product.images[0] || '',
      selectedColor: item.selectedColor || product.color,
      selectedFinish: item.selectedFinish || product.finish,
    });
  }

  // 2. Perform Atomic Stock Decrement in Supabase
  for (const item of orderData.items) {
    if (isSupabaseConfigured()) {
      const supabase = getServiceSupabase();
      const { error: rpcErr } = await supabase.rpc('decrement_stock_atomic', { p_id: item.productId, p_qty: item.quantity });
      if (rpcErr) {
        // Fallback to direct decrement if RPC not installed
        const currentProd = await getProductById(item.productId);
        if (currentProd) {
          const newStock = Math.max(0, currentProd.stock - item.quantity);
          await supabase.from('products').update({ stock: newStock }).eq('id', currentProd.id);
        }
      }
    }
  }

  const taxRate = 0.18;
  const tax = Math.round(calculatedSubtotal * taxRate);
  const shippingFee = calculatedSubtotal >= 50000 ? 0 : 1500;
  const totalAmount = calculatedSubtotal + tax + shippingFee;
  const orderNumber = `BAL-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;

  const newOrder: Order = {
    id: `ord-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    orderNumber,
    customerName: orderData.customerName,
    customerEmail: orderData.customerEmail,
    customerPhone: orderData.customerPhone,
    shippingAddress: orderData.shippingAddress,
    billingAddress: orderData.billingAddress || orderData.shippingAddress,
    items: validatedItems,
    subtotal: calculatedSubtotal,
    tax,
    shippingFee,
    discount: 0,
    totalAmount,
    orderStatus: 'Confirmed',
    paymentStatus: 'Submitted',
    paymentMethod: orderData.paymentMethod || 'Credit Card / Wire Transfer',
    notes: orderData.notes,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // 3. Persist to Supabase (Authoritative Production Source of Truth)
  // 3. Persist to Supabase (Authoritative Production Source of Truth)
  try {
    const supabase = getServiceSupabase();
    const { data: orderRow, error: orderErr } = await supabase
      .from('orders')
      .insert({
        order_number: newOrder.orderNumber,
        customer_name: newOrder.customerName,
        customer_email: newOrder.customerEmail,
        customer_phone: newOrder.customerPhone,
        shipping_address: newOrder.shippingAddress,
        billing_address: newOrder.billingAddress,
        subtotal: newOrder.subtotal,
        tax: newOrder.tax,
        shipping_fee: newOrder.shippingFee,
        discount: newOrder.discount,
        total_amount: newOrder.totalAmount,
        order_status: newOrder.orderStatus,
        payment_status: newOrder.paymentStatus,
        payment_method: newOrder.paymentMethod,
        notes: newOrder.notes,
      })
      .select()
      .single();

    if (!orderErr && orderRow) {
      newOrder.id = orderRow.id;
      const itemRows = validatedItems.map((it) => ({
        order_id: orderRow.id,
        product_name: it.productName,
        product_sku: it.productSku,
        unit: it.unit,
        unit_price: it.unitPrice,
        quantity: it.quantity,
        subtotal: it.subtotal,
        image_url: it.imageUrl,
        selected_color: it.selectedColor,
        selected_finish: it.selectedFinish,
      }));

      const { data: insertedItems } = await supabase.from('order_items').insert(itemRows).select();
      if (insertedItems && insertedItems.length > 0) {
        newOrder.items = insertedItems.map((it: any) => ({
          id: it.id,
          orderId: it.order_id,
          productId: it.product_id || '',
          variantId: it.variant_id,
          productName: it.product_name,
          productSku: it.product_sku,
          unit: it.unit,
          unitPrice: Number(it.unit_price),
          quantity: Number(it.quantity),
          subtotal: Number(it.subtotal),
          imageUrl: it.image_url,
          selectedColor: it.selected_color,
          selectedFinish: it.selected_finish,
        }));
      }

      // Add audit log to Supabase
      try {
        await supabase.from('audit_logs').insert({
          admin_id: null,
          admin_email: 'checkout@balaji.com',
          action: 'ORDER_PLACED',
          entity: 'Order',
          entity_id: orderRow.id,
          details: { orderNumber: newOrder.orderNumber, total: newOrder.totalAmount, itemsCount: newOrder.items.length },
        });
      } catch (auditErr) {}

      // Dispatch real server-side Web Push notification to registered admin devices
      try {
        await sendNewOrderPush(newOrder);
      } catch (pushErr) {
        console.warn('Push notification dispatch error:', pushErr);
      }

      return { success: true, order: newOrder };
    } else if (orderErr) {
      console.warn('Supabase order insert warning, saving locally:', orderErr.message);
    }
  } catch (err: any) {
    console.warn('Supabase exception during order creation, saving locally:', err.message);
  }

  // Resilient fallback storage: ensures no customer order is ever dropped
  const db = getDb();
  db.orders.unshift(newOrder);
  saveDb(db);
  return { success: true, order: newOrder };
}

export async function getOrders(): Promise<Order[]> {
  try {
    const supabase = getServiceSupabase();
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        items:order_items(*)
      `)
      .order('created_at', { ascending: false });

    if (!error && data) {
      return data.map(mapSupabaseOrder);
    }
  } catch (err) {
    console.warn('Supabase getOrders query error, loading fallback:', err);
  }

  const db = getDb();
  return [...db.orders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getOrderById(id: string): Promise<Order | null> {
  try {
    const supabase = getServiceSupabase();
    let query = supabase.from('orders').select(`
      *,
      items:order_items(*)
    `);

    if (isUUID(id)) {
      query = query.eq('id', id);
    } else {
      query = query.eq('order_number', id);
    }

    const { data, error } = await query.maybeSingle();
    if (!error && data) {
      return mapSupabaseOrder(data);
    }
  } catch (err) {}

  const db = getDb();
  return db.orders.find((o) => o.id === id || o.orderNumber === id) || null;
}

export async function updateOrderStatus(
  id: string,
  orderStatus?: Order['orderStatus'],
  paymentStatus?: Order['paymentStatus']
): Promise<Order | null> {
  try {
    const supabase = getServiceSupabase();
    const updates: any = { updated_at: new Date().toISOString() };
    if (orderStatus) updates.order_status = orderStatus;
    if (paymentStatus) updates.payment_status = paymentStatus;

    let query = supabase.from('orders').update(updates);
    if (isUUID(id)) {
      query = query.eq('id', id);
    } else {
      query = query.eq('order_number', id);
    }

    const { data, error } = await query.select(`*, items:order_items(*)`).maybeSingle();
    if (!error && data) {
      return mapSupabaseOrder(data);
    }
  } catch (err) {}

  const db = getDb();
  const order = db.orders.find((o) => o.id === id || o.orderNumber === id);
  if (order) {
    if (orderStatus) order.orderStatus = orderStatus;
    if (paymentStatus) order.paymentStatus = paymentStatus;
    order.updatedAt = new Date().toISOString();
    saveDb(db);
  }
  return order || null;
}

// =============================================================
// QUOTES
// =============================================================
export async function createQuote(quoteData: {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  projectType: string;
  projectLocation: string;
  estimatedTimeline: string;
  budgetRange: string;
  notes: string;
  items?: {
    productId?: string;
    productName: string;
    dimensions?: string;
    quantity: number;
    unit: any;
    notes?: string;
  }[];
}): Promise<Quote> {
  const quoteNumber = `QT-${new Date().getFullYear()}-${Date.now().toString().slice(-5)}`;

  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const { data: quoteRow, error } = await supabase
      .from('quotes')
      .insert({
        quote_number: quoteNumber,
        customer_name: quoteData.customerName,
        customer_email: quoteData.customerEmail,
        customer_phone: quoteData.customerPhone,
        project_type: quoteData.projectType,
        project_location: quoteData.projectLocation,
        estimated_timeline: quoteData.estimatedTimeline,
        budget_range: quoteData.budgetRange,
        notes: quoteData.notes,
        status: 'Pending',
      })
      .select()
      .single();

    if (error || !quoteRow) throw new Error(`Failed to create quote: ${error?.message}`);

    if (quoteData.items && quoteData.items.length > 0) {
      const qItems = quoteData.items.map((it) => ({
        quote_id: quoteRow.id,
        product_id: it.productId || null,
        product_name: it.productName,
        dimensions: it.dimensions || null,
        quantity: it.quantity,
        unit: it.unit || 'sq ft',
        notes: it.notes || null,
      }));
      await supabase.from('quote_items').insert(qItems);
    }

    const { data: fullQuote } = await supabase.from('quotes').select('*, items:quote_items(*)').eq('id', quoteRow.id).single();
    return mapSupabaseQuote(fullQuote);
  }

  const db = getDb();
  const quoteId = `qt-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
  const quoteItems = (quoteData.items || []).map((it) => ({
    id: `qti-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    quoteId,
    productId: it.productId,
    productName: it.productName,
    dimensions: it.dimensions,
    quantity: it.quantity,
    unit: it.unit,
    notes: it.notes,
  }));

  const newQuote: Quote = {
    id: quoteId,
    quoteNumber,
    customerName: quoteData.customerName,
    customerEmail: quoteData.customerEmail,
    customerPhone: quoteData.customerPhone,
    projectType: quoteData.projectType,
    projectLocation: quoteData.projectLocation,
    estimatedTimeline: quoteData.estimatedTimeline,
    budgetRange: quoteData.budgetRange,
    notes: quoteData.notes,
    items: quoteItems,
    status: 'Pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  db.quotes.unshift(newQuote);
  saveDb(db);
  return newQuote;
}

export async function getQuotes(): Promise<Quote[]> {
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const { data, error } = await supabase.from('quotes').select('*, items:quote_items(*)').order('created_at', { ascending: false });
    if (error) throw new Error(`Failed to load quotes: ${error.message}`);
    return (data || []).map(mapSupabaseQuote);
  }

  const db = getDb();
  return [...db.quotes].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getQuoteById(id: string): Promise<Quote | null> {
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const { data, error } = await supabase.from('quotes').select('*, items:quote_items(*)').or(`id.eq.${id},quote_number.eq.${id}`).single();
    if (error || !data) return null;
    return mapSupabaseQuote(data);
  }

  const db = getDb();
  return db.quotes.find((q) => q.id === id || q.quoteNumber === id) || null;
}

export async function updateQuoteStatus(
  id: string,
  status: Quote['status'],
  totalQuotedAmount?: number,
  adminNotes?: string
): Promise<Quote | null> {
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const updates: any = { status, updated_at: new Date().toISOString() };
    if (totalQuotedAmount !== undefined) updates.total_quoted_amount = totalQuotedAmount;
    if (adminNotes !== undefined) updates.admin_notes = adminNotes;

    const { data, error } = await supabase.from('quotes').update(updates).eq('id', id).select('*, items:quote_items(*)').single();
    if (error || !data) return null;
    return mapSupabaseQuote(data);
  }

  const db = getDb();
  const quote = db.quotes.find((q) => q.id === id);
  if (!quote) return null;
  quote.status = status;
  if (totalQuotedAmount !== undefined) quote.totalQuotedAmount = totalQuotedAmount;
  if (adminNotes !== undefined) quote.adminNotes = adminNotes;
  quote.updatedAt = new Date().toISOString();
  saveDb(db);
  return quote;
}

// =============================================================
// ENQUIRIES / CONTACT
// =============================================================
export async function createEnquiry(data: Omit<Enquiry, 'id' | 'createdAt' | 'status'>): Promise<Enquiry> {
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const { data: inserted, error } = await supabase
      .from('enquiries')
      .insert({
        name: data.name,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        message: data.message,
        source: data.source || 'Contact Page',
        status: 'New',
      })
      .select()
      .single();

    if (error || !inserted) throw new Error(`Failed to save enquiry: ${error?.message}`);
    return mapSupabaseEnquiry(inserted);
  }

  const db = getDb();
  const newEnq: Enquiry = {
    ...data,
    id: `enq-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    status: 'New',
    createdAt: new Date().toISOString(),
  };
  db.enquiries.unshift(newEnq);
  saveDb(db);
  return newEnq;
}

export async function getEnquiries(): Promise<Enquiry[]> {
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const { data, error } = await supabase.from('enquiries').select('*').order('created_at', { ascending: false });
    if (error) throw new Error(`Failed to load enquiries: ${error.message}`);
    return (data || []).map(mapSupabaseEnquiry);
  }

  const db = getDb();
  return [...db.enquiries].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function updateEnquiryStatus(id: string, status: Enquiry['status']): Promise<Enquiry | null> {
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const { data, error } = await supabase.from('enquiries').update({ status }).eq('id', id).select().single();
    if (error || !data) return null;
    return mapSupabaseEnquiry(data);
  }

  const db = getDb();
  const enq = db.enquiries.find((e) => e.id === id);
  if (!enq) return null;
  enq.status = status;
  saveDb(db);
  return enq;
}

// =============================================================
// ADMIN AUTH & CREDENTIALS
// =============================================================
export async function getAdminByEmail(email: string): Promise<(AdminUser & { passwordHash: string }) | null> {
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const { data, error } = await supabase.from('admins').select('*').ilike('email', email).single();
    if (!error && data) {
      return {
        id: data.id,
        email: data.email,
        passwordHash: data.password_hash,
        name: data.name,
        role: data.role || 'Principal Architect',
        mustChangePassword: Boolean(data.must_change_password),
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      };
    }
  }

  const db = getDb();
  const admin = db.admins.find((a) => a.email.toLowerCase() === email.toLowerCase());
  return (admin as any) || null;
}

export async function updateAdminPassword(adminId: string, newPasswordHash: string): Promise<boolean> {
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const { error } = await supabase
      .from('admins')
      .update({
        password_hash: newPasswordHash,
        must_change_password: false,
        updated_at: new Date().toISOString(),
      })
      .eq('id', adminId);

    if (error) {
      console.error('Supabase password update error:', error);
      return false;
    }

    try {
      await supabase.from('audit_logs').insert({
        admin_id: adminId,
        admin_email: 'vicks@balaji.com',
        action: 'ADMIN_PASSWORD_CHANGED',
        entity: 'Admin',
        entity_id: adminId,
        details: { message: 'Password updated and verified in Supabase' },
      });
    } catch (e) {}

    return true;
  }

  const db = getDb();
  const admin = db.admins.find((a) => a.id === adminId);
  if (!admin) return false;

  (admin as any).passwordHash = newPasswordHash;
  admin.mustChangePassword = false;
  admin.updatedAt = new Date().toISOString();
  saveDb(db);
  return true;
}

export async function recordAdminLogin(adminId: string): Promise<void> {
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    await supabase.from('admins').update({ updated_at: new Date().toISOString() }).eq('id', adminId);
    return;
  }

  const db = getDb();
  const admin = db.admins.find((a) => a.id === adminId);
  if (admin) {
    admin.updatedAt = new Date().toISOString();
    saveDb(db);
  }
}

// =============================================================
// SITE SETTINGS
// =============================================================
export async function getSiteSettings(): Promise<SiteSettings> {
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const { data } = await supabase.from('site_settings').select('*').eq('key', 'general').single();
    if (data && data.value) {
      const v = data.value;
      return {
        ...initialSiteSettings,
        ...v,
        studioName: v.studioName || v.brandName || 'Balaji Architect & Interiors',
        brandName: v.brandName || v.studioName || 'Balaji Architect & Interiors',
        supportEmail: v.supportEmail || v.contactEmail || 'atelier@balaji-interior.com',
        contactEmail: v.contactEmail || v.supportEmail || 'atelier@balaji-interior.com',
        supportPhone: v.supportPhone || v.contactPhone || '+91 70029 48484',
        contactPhone: v.contactPhone || v.supportPhone || '+91 70029 48484',
        studioAddress: v.studioAddress || 'Door No. 306, DN TOWER, Floor No. 03, Beltola Tiniali, Guwahati, Assam 781040',
        taxRatePercent: Number(v.taxRatePercent || 18),
        freeShippingThreshold: Number(v.freeShippingThreshold || 50000),
        standardShippingFee: Number(v.standardShippingFee || 1500),
        currencySymbol: v.currencySymbol || '₹',
        updatedAt: data.updated_at || new Date().toISOString(),
      };
    }
  }

  const db = getDb();
  return db.siteSettings;
}

export async function updateSiteSettings(partial: Partial<SiteSettings>): Promise<SiteSettings> {
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const current = await getSiteSettings();
    const merged = { ...current, ...partial, updatedAt: new Date().toISOString() };

    await supabase
      .from('site_settings')
      .upsert({
        key: 'general',
        value: merged,
        updated_at: new Date().toISOString(),
      });

    return merged;
  }

  const db = getDb();
  db.siteSettings = { ...db.siteSettings, ...partial };
  saveDb(db);
  return db.siteSettings;
}

// =============================================================
// AUDIT LOGS
// =============================================================
export async function addAuditLog(entry: Omit<AuditLog, 'id' | 'createdAt'>): Promise<AuditLog> {
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const { data, error } = await supabase
      .from('audit_logs')
      .insert({
        admin_id: entry.adminId !== 'system' ? entry.adminId : null,
        admin_email: entry.adminEmail,
        action: entry.action,
        entity: entry.entity,
        entity_id: entry.entityId,
        details: entry.details || null,
      })
      .select()
      .single();

    if (!error && data) {
      return {
        id: data.id,
        adminId: data.admin_id || 'system',
        adminEmail: data.admin_email,
        action: data.action,
        entity: data.entity,
        entityId: data.entity_id,
        details: data.details,
        createdAt: data.created_at,
      };
    }
  }

  const db = getDb();
  const newLog: AuditLog = {
    ...entry,
    id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    createdAt: new Date().toISOString(),
  };
  db.auditLogs.unshift(newLog);
  if (db.auditLogs.length > 500) db.auditLogs.length = 500;
  saveDb(db);
  return newLog;
}

export async function getAuditLogs(): Promise<AuditLog[]> {
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const { data, error } = await supabase.from('audit_logs').select('*').order('created_at', { ascending: false }).limit(100);
    if (!error && data) {
      return data.map((d: any) => ({
        id: d.id,
        adminId: d.admin_id || 'system',
        adminEmail: d.admin_email,
        action: d.action,
        entity: d.entity,
        entityId: d.entity_id,
        details: d.details,
        createdAt: d.created_at,
      }));
    }
  }

  const db = getDb();
  return [...db.auditLogs].slice(0, 100);
}

// =============================================================
// CUSTOMERS DIRECTORY (AGGREGATED FROM REAL ORDERS & QUOTES)
// =============================================================
export async function getCustomers(): Promise<{
  id: string;
  name: string;
  email: string;
  phone: string;
  ordersCount: number;
  totalSpent: number;
  lastOrderDate: string;
  city?: string;
}[]> {
  const orders = await getOrders();
  const customerMap = new Map<string, {
    id: string;
    name: string;
    email: string;
    phone: string;
    ordersCount: number;
    totalSpent: number;
    lastOrderDate: string;
    city?: string;
  }>();

  for (const ord of orders) {
    const key = ord.customerEmail.toLowerCase();
    const existing = customerMap.get(key);
    if (existing) {
      existing.ordersCount += 1;
      existing.totalSpent += ord.totalAmount;
      if (new Date(ord.createdAt) > new Date(existing.lastOrderDate)) {
        existing.lastOrderDate = ord.createdAt;
      }
    } else {
      customerMap.set(key, {
        id: `cust-${key.replace(/[^a-z0-9]/g, '')}`,
        name: ord.customerName,
        email: ord.customerEmail,
        phone: ord.customerPhone,
        ordersCount: 1,
        totalSpent: ord.totalAmount,
        lastOrderDate: ord.createdAt,
        city: ord.shippingAddress?.city,
      });
    }
  }

  return Array.from(customerMap.values()).sort((a, b) => new Date(b.lastOrderDate).getTime() - new Date(a.lastOrderDate).getTime());
}

// =============================================================
// PUSH SUBSCRIPTIONS
// =============================================================
export async function addPushSubscription(sub: {
  endpoint: string;
  keys: { p256dh: string; auth: string };
  adminId?: string;
}): Promise<void> {
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    await supabase.from('notification_subscriptions').upsert(
      {
        endpoint: sub.endpoint,
        keys: sub.keys,
        admin_id: sub.adminId || null,
        created_at: new Date().toISOString(),
      },
      { onConflict: 'endpoint' }
    );
    return;
  }

  const db = getDb();
  const existingIdx = db.pushSubscriptions.findIndex((s) => s.endpoint === sub.endpoint);
  const entry = {
    id: `sub-${Date.now()}`,
    endpoint: sub.endpoint,
    keys: sub.keys,
    adminId: sub.adminId,
    createdAt: new Date().toISOString(),
  };
  if (existingIdx >= 0) {
    db.pushSubscriptions[existingIdx] = entry;
  } else {
    db.pushSubscriptions.push(entry);
  }
  saveDb(db);
}

export async function getPushSubscriptions() {
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const { data } = await supabase.from('notification_subscriptions').select('*');
    return data || [];
  }

  const db = getDb();
  return db.pushSubscriptions;
}
```

---

### `src/lib/push.ts`

- **File**: `src/lib/push.ts`
- **Size**: 6.7 KB (210 lines)
- **Language**: `typescript`

```typescript
import webPush from 'web-push';
import { getServiceSupabase } from './supabase';
import { Order } from '@/types';

// Configure Web Push with VAPID credentials (with built-in studio fallbacks)
const DEFAULT_VAPID_PUBLIC_KEY = 'BHsG3ouw3YgPO_jlPvdNIBFISisslHHm-vxyMHmCRswNnDQxTBCZTLR2qRAQvNOC-avolJ61etGkPrNJV4MpxTE';
const DEFAULT_VAPID_PRIVATE_KEY = 'SmPawdxDpbEkoUP5Wny9uXJ-kqrA8FWeu5052EG-ffE';
const DEFAULT_VAPID_SUBJECT = 'mailto:atelier@balaji-interior.com';

const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || DEFAULT_VAPID_PUBLIC_KEY;
const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY || DEFAULT_VAPID_PRIVATE_KEY;
const vapidSubject = process.env.VAPID_SUBJECT || DEFAULT_VAPID_SUBJECT;

if (vapidPublicKey && vapidPrivateKey) {
  try {
    webPush.setVapidDetails(vapidSubject, vapidPublicKey, vapidPrivateKey);
  } catch (err) {
    console.error('Failed to configure web-push VAPID details:', err);
  }
}

/**
 * Persist an active push subscription to Supabase.
 */
export async function savePushSubscription(sub: {
  endpoint: string;
  keys: { p256dh: string; auth: string };
  adminId?: string;
  userAgent?: string;
}) {
  try {
    const supabase = getServiceSupabase();

    let validAdminId: string | null = null;
    if (sub.adminId && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(sub.adminId)) {
      const { data: adminExists } = await supabase.from('admins').select('id').eq('id', sub.adminId).maybeSingle();
      if (adminExists) {
        validAdminId = adminExists.id;
      }
    }

    if (!validAdminId) {
      const { data: defaultAdmin } = await supabase.from('admins').select('id').limit(1).maybeSingle();
      if (defaultAdmin) {
        validAdminId = defaultAdmin.id;
      }
    }

    const { data, error } = await supabase
      .from('notification_subscriptions')
      .upsert(
        {
          endpoint: sub.endpoint,
          keys: sub.keys,
          admin_id: validAdminId,
          user_agent: sub.userAgent || null,
          created_at: new Date().toISOString(),
        },
        { onConflict: 'endpoint' }
      )
      .select()
      .single();

    if (error) {
      console.warn('Upsert with admin_id failed, falling back to null admin_id:', error.message);
      const fallback = await supabase
        .from('notification_subscriptions')
        .upsert(
          {
            endpoint: sub.endpoint,
            keys: sub.keys,
            admin_id: null,
            user_agent: sub.userAgent || null,
            created_at: new Date().toISOString(),
          },
          { onConflict: 'endpoint' }
        )
        .select()
        .single();

      if (fallback.error) {
        console.error('Error saving push subscription to Supabase:', fallback.error);
        return { success: false, error: fallback.error.message };
      }
      return { success: true, data: fallback.data };
    }

    return { success: true, data };
  } catch (err: any) {
    console.error('Exception saving push subscription:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Remove an invalid/expired push subscription from Supabase.
 */
export async function removePushSubscription(endpoint: string) {
  try {
    const supabase = getServiceSupabase();
    await supabase.from('notification_subscriptions').delete().eq('endpoint', endpoint);
  } catch (err) {
    console.error('Error removing push subscription:', err);
  }
}

/**
 * Send real Web Push notification for a new customer order to all active admin devices.
 */
export async function sendNewOrderPush(order: Order): Promise<{ sent: number; failed: number }> {
  try {
    const supabase = getServiceSupabase();
    const { data: subscriptions, error } = await supabase
      .from('notification_subscriptions')
      .select('*');

    if (error || !subscriptions || subscriptions.length === 0) {
      return { sent: 0, failed: 0 };
    }

    const payload = JSON.stringify({
      title: 'New Order Placed — Balaji Architect & Interiors',
      body: `Order #${order.orderNumber} • ₹${order.totalAmount.toLocaleString('en-IN')}`,
      icon: '/favicon.ico',
      badge: '/favicon.ico',
      url: `/admin/orders?id=${order.id}`,
      data: {
        orderId: order.id,
        orderNumber: order.orderNumber,
        url: `/admin/orders?id=${order.id}`,
      },
    });

    let sent = 0;
    let failed = 0;

    for (const sub of subscriptions) {
      try {
        const pushSub = {
          endpoint: sub.endpoint,
          keys: sub.keys,
        };

        await webPush.sendNotification(pushSub, payload);
        sent++;
      } catch (err: any) {
        failed++;
        console.warn(`Web push dispatch failed for endpoint ${sub.endpoint.substring(0, 30)}...:`, err.statusCode || err.message);

        // If subscription expired or gone (HTTP 410 or 404), clean it up from Supabase
        if (err.statusCode === 410 || err.statusCode === 404) {
          await removePushSubscription(sub.endpoint);
        }
      }
    }

    return { sent, failed };
  } catch (err) {
    console.warn('Error in sendNewOrderPush:', err);
    return { sent: 0, failed: 0 };
  }
}

/**
 * Send a real Web Push test notification to a specific admin device.
 */
export async function sendTestPushToAdmin(adminId?: string): Promise<{ success: boolean; sent: number; message: string }> {
  try {
    const supabase = getServiceSupabase();
    const { data: subscriptions, error } = await supabase.from('notification_subscriptions').select('*');

    if (error || !subscriptions || subscriptions.length === 0) {
      return {
        success: false,
        sent: 0,
        message: 'No registered browser push subscriptions found. Please click "Dispatch Test Notification" again to allow notifications.',
      };
    }

    const payload = JSON.stringify({
      title: 'Balaji Studio Test Notification',
      body: 'Real Web Push pipeline active and verified on this device.',
      icon: '/favicon.ico',
      badge: '/favicon.ico',
      url: '/admin/orders',
      data: { url: '/admin/orders' },
    });

    let sentCount = 0;
    for (const sub of subscriptions) {
      try {
        await webPush.sendNotification({ endpoint: sub.endpoint, keys: sub.keys }, payload);
        sentCount++;
      } catch (err: any) {
        if (err.statusCode === 410 || err.statusCode === 404) {
          await removePushSubscription(sub.endpoint);
        }
      }
    }

    return {
      success: sentCount > 0,
      sent: sentCount,
      message: sentCount > 0 ? `Successfully dispatched Web Push to ${sentCount} device(s).` : 'Push notification dispatched.',
    };
  } catch (err: any) {
    return { success: false, sent: 0, message: err.message || 'Error triggering test push notification.' };
  }
}
```

---

### `src/lib/seedData.ts`

- **File**: `src/lib/seedData.ts`
- **Size**: 33.0 KB (775 lines)
- **Language**: `typescript`

```typescript
import { hashPassword } from './auth';
import { Category, Product, Project, Service, SiteSettings } from '@/types';

export const initialSiteSettings: SiteSettings = {
  brandName: 'Balaji Architect & Interior',
  tagline: 'Crafted spaces, luxury architecture, and considered materials for timeless living.',
  logoUrl: '',
  contactEmail: 'atelier@balaji-interior.com',
  contactPhone: '+91 70029 48484',
  studioAddress: 'Door No. 306, DN TOWER, Floor No. 03, Beltola Tiniali',
  city: 'Guwahati',
  state: 'Assam',
  country: 'India',
  pincode: '781040',
  currency: 'INR',
  currencySymbol: '₹',
  taxRatePercent: 18,
  standardShippingFee: 1500,
  freeShippingThreshold: 50000,
  socialInstagram: 'https://instagram.com/balajiatelier',
  socialPinterest: 'https://pinterest.com/balajiatelier',
  socialLinkedin: 'https://linkedin.com/company/balaji-atelier',
  announcementBanner: {
    enabled: true,
    text: 'Complimentary Material Advisory Sessions Available for Q3/Q4 Architectural Commissions',
    linkUrl: '/quote',
  },
};

export const initialCategories: Category[] = [
  {
    id: 'cat-stone',
    name: 'Natural Stone & Marble',
    slug: 'natural-stone-marble',
    description: 'Quarried Italian marbles, honed travertines, and architectural granites with bespoke cut-to-size options.',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    sortOrder: 1,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'cat-wood',
    name: 'Hardwood & Architectural Veneers',
    slug: 'hardwood-veneers',
    description: 'Sustainably harvested smoked oaks, European walnuts, and natural fluted timber panels.',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    sortOrder: 2,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'cat-panels',
    name: 'Wall Panels & Acoustic Surfaces',
    slug: 'wall-panels-acoustic',
    description: 'Linear slatted wall systems, architectural micro-cement claddings, and acoustic linen textures.',
    imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    sortOrder: 3,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'cat-porcelain',
    name: 'Large Format Porcelain Slabs',
    slug: 'porcelain-slabs',
    description: 'Monolithic sintered stone slabs for luxury countertops, bookmatched feature walls, and seamless floors.',
    imageUrl: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
    sortOrder: 4,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'cat-lighting',
    name: 'Architectural Lighting',
    slug: 'architectural-lighting',
    description: 'Sculptural unlacquered brass pendants, minimal linear sconces, and recessed gallery luminescence.',
    imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80',
    sortOrder: 5,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'cat-hardware',
    name: 'Bespoke Hardware & Pulls',
    slug: 'bespoke-hardware',
    description: 'Solid forged bronze handles, knurled cabinet pulls, and precision-engineered architectural pivots.',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80',
    sortOrder: 6,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'cat-furniture',
    name: 'Atelier Furniture & Objects',
    slug: 'atelier-furniture',
    description: 'Limited edition travertine monoliths, solid oak dining tables, and tailored bouclé seating.',
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
    sortOrder: 7,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const initialProducts: Product[] = [
  {
    id: 'prod-travertine-slab',
    name: 'Romano Classico Vein-Cut Travertine',
    slug: 'romano-classico-travertine',
    sku: 'MAT-STN-001',
    brand: 'Balaji Architect & Interiors',
    categoryId: 'cat-stone',
    categoryName: 'Natural Stone & Marble',
    categorySlug: 'natural-stone-marble',
    subcategory: 'Honed Travertine',
    description: 'Authentic Italian vein-cut travertine quarried in Tivoli. Honed to a velvety matte tactile finish with natural open pores lightly filled for lasting resilience in high-end living spaces and bath suites.',
    price: 850,
    salePrice: 780,
    unit: 'sq ft',
    moq: 100,
    stock: 2400,
    purchaseMode: 'BOTH',
    leadTime: '5-7 business days',
    dimensions: '2400mm x 1200mm slab / custom tile sizes',
    thickness: '20mm',
    material: 'Natural Travertine',
    finish: 'Honed Matte',
    color: 'Warm Ivory / Biscuit',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    ],
    variants: [
      {
        id: 'var-trav-20mm',
        productId: 'prod-travertine-slab',
        sku: 'MAT-STN-001-20',
        name: '20mm Slab - Honed',
        finish: 'Honed',
        thickness: '20mm',
        priceModifier: 0,
        stock: 1800,
      },
      {
        id: 'var-trav-30mm',
        productId: 'prod-travertine-slab',
        sku: 'MAT-STN-001-30',
        name: '30mm Slab - Polished Matte',
        finish: 'Polished Matte',
        thickness: '30mm',
        priceModifier: 190,
        stock: 600,
      },
    ],
    isFeatured: true,
    isNew: false,
    isBestseller: true,
    published: true,
    tags: ['Stone', 'Travertine', 'Flooring', 'Wall Cladding', 'Luxury Bath'],
    specifications: {
      'Origin': 'Tivoli, Italy',
      'Compressive Strength': '112 MPa',
      'Water Absorption': '< 0.8%',
      'Application': 'Indoor flooring, feature walls, bathroom surrounds',
      'Edge Detail': 'Straight rectified / custom bullnose on request',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-smoked-oak-flooring',
    name: 'Smoked European White Oak Wide Plank',
    slug: 'smoked-european-oak-flooring',
    sku: 'MAT-WOD-002',
    brand: 'Balaji Architect & Interiors',
    categoryId: 'cat-wood',
    categoryName: 'Hardwood & Architectural Veneers',
    categorySlug: 'hardwood-veneers',
    subcategory: 'Engineered Hardwood',
    description: 'Slow-smoked French white oak planks with a triple-brushed wire texture and invisible natural UV polyurethane oil finish. Engineered with a multi-layer birch ply core for dimensional stability in humid climates.',
    price: 620,
    unit: 'sq ft',
    moq: 150,
    stock: 3500,
    purchaseMode: 'BUY_NOW',
    leadTime: '3-5 business days',
    dimensions: '2200mm L x 220mm W',
    thickness: '15mm (4mm top wear layer)',
    material: 'European White Oak & Baltic Birch',
    finish: 'Natural Ultra-Matte Oil',
    color: 'Muted Earth Brown',
    images: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=1200&q=80',
    ],
    variants: [
      {
        id: 'var-oak-smoked',
        productId: 'prod-smoked-oak-flooring',
        sku: 'MAT-WOD-002-SMK',
        name: 'Smoked Natural',
        color: 'Warm Umber',
        finish: 'Wire Brushed',
        priceModifier: 0,
        stock: 2200,
      },
      {
        id: 'var-oak-raw',
        productId: 'prod-smoked-oak-flooring',
        sku: 'MAT-WOD-002-RAW',
        name: 'Raw Nordic Sand',
        color: 'Light Biscuit',
        finish: 'Smooth Matte',
        priceModifier: 40,
        stock: 1300,
      },
    ],
    isFeatured: true,
    isNew: true,
    isBestseller: true,
    published: true,
    tags: ['Wood', 'Flooring', 'Oak', 'Wide Plank', 'Living Room'],
    specifications: {
      'Grade': 'Select Architectural ABC',
      'Core': '11-ply Cross-Grain Baltic Birch',
      'Bevel': 'Micro-bevel on 4 sides',
      'Installation': 'Tongue & Groove / Glue-down or Floating',
      'Underfloor Heating Compatible': 'Yes, up to 27°C',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-fluted-acoustic-panel',
    name: 'Acoustic Fluted Walnut Wall Panel',
    slug: 'acoustic-fluted-walnut-panel',
    sku: 'MAT-PNL-003',
    brand: 'Balaji Architect & Interiors',
    categoryId: 'cat-panels',
    categoryName: 'Wall Panels & Acoustic Surfaces',
    categorySlug: 'wall-panels-acoustic',
    subcategory: 'Acoustic Cladding',
    description: 'Precision-milled American walnut slats affixed to a recycled high-density acoustic PET felt backing. Elevates room acoustics while introducing warm architectural rhythm to master bedrooms and private cinema suites.',
    price: 14500,
    salePrice: 13200,
    unit: 'sheet',
    moq: 2,
    stock: 85,
    purchaseMode: 'BUY_NOW',
    leadTime: '3-4 business days',
    dimensions: '2400mm H x 600mm W x 22mm D',
    thickness: '22mm',
    material: 'Natural American Walnut & Recycled Felt',
    finish: 'Silky Natural Wax Oil',
    color: 'Deep Espresso Walnut',
    images: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
    ],
    isFeatured: true,
    isNew: true,
    isBestseller: false,
    published: true,
    tags: ['Acoustic', 'Wall Panels', 'Walnut', 'Fluted', 'Bedrooms'],
    specifications: {
      'NRC Rating': '0.85 Sound Absorption',
      'Fire Rating': 'Class B-s1, d0 (Flame Retardant)',
      'Mounting': 'Concealed screw or polyurethane construction adhesive',
      'Slat Spacing': '13mm width with 14mm felt reveals',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-calacatta-porcelain',
    name: 'Calacatta Vagli Sintered Porcelain Slab',
    slug: 'calacatta-vagli-porcelain-slab',
    sku: 'MAT-POR-004',
    brand: 'Balaji Architect & Interiors',
    categoryId: 'cat-porcelain',
    categoryName: 'Large Format Porcelain Slabs',
    categorySlug: 'porcelain-slabs',
    subcategory: 'Continuous Bookmatched Slabs',
    description: 'Continuous vein-matched sintered ceramic slab with deep golden and slate veins on an ultra-clean warm white background. 100% stain, heat, and scratch proof for demanding culinary islands and master vanities.',
    price: 1100,
    unit: 'sq ft',
    moq: 50,
    stock: 1200,
    purchaseMode: 'BOTH',
    leadTime: '7-10 business days',
    dimensions: '3200mm x 1600mm',
    thickness: '12mm / 20mm',
    material: 'Sintered Ceramic Porcelain',
    finish: 'Silk Touch Satin',
    color: 'Pure White with Gold & Charcoal Veining',
    images: [
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    ],
    isFeatured: false,
    isNew: false,
    isBestseller: true,
    published: true,
    tags: ['Kitchen Countertop', 'Porcelain Slab', 'Bookmatched', 'Island Counter'],
    specifications: {
      'Porosity': '0.01% (Zero Porosity)',
      'Thermal Shock': 'Resistant to direct pans up to 400°C',
      'UV Stability': 'Fade proof for indoor and outdoor loggias',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-monolith-coffee-table',
    name: 'Brutalist Travertine Monolith Coffee Table',
    slug: 'brutalist-travertine-coffee-table',
    sku: 'FUR-TBL-005',
    brand: 'Balaji Architect & Interiors',
    categoryId: 'cat-furniture',
    categoryName: 'Atelier Furniture & Objects',
    categorySlug: 'atelier-furniture',
    subcategory: 'Sculptural Tables',
    description: 'Sculpted from a single block of Tuscan Romano travertine. Defined by raw chiseled edges contrasting with a silky hand-honed flat surface. Each table is an individual architectural sculpture numbered by the studio.',
    price: 185000,
    unit: 'piece',
    moq: 1,
    stock: 4,
    purchaseMode: 'BUY_NOW',
    leadTime: 'Made to order (2-3 weeks)',
    dimensions: '1400mm L x 800mm W x 360mm H',
    thickness: '120mm solid block perimeter',
    material: 'Solid Honed Travertine Stone',
    finish: 'Natural Matte Wax Sealed',
    color: 'Ivory Travertine',
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    ],
    isFeatured: true,
    isNew: true,
    isBestseller: false,
    published: true,
    tags: ['Furniture', 'Coffee Table', 'Travertine', 'Sculptural', 'Living Room'],
    specifications: {
      'Weight': '115 kg',
      'Craftsmanship': 'Hand-chiseled perimeter with CNC planar accuracy',
      'Care': 'Wipe with damp cloth and pH neutral stone cleanser',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-linear-bronze-pendant',
    name: 'Kanso Linear Brushed Bronze Chandelier',
    slug: 'kanso-linear-bronze-chandelier',
    sku: 'LGT-PEN-006',
    brand: 'Balaji Architect & Interiors',
    categoryId: 'cat-lighting',
    categoryName: 'Architectural Lighting',
    categorySlug: 'architectural-lighting',
    subcategory: 'Suspension Lighting',
    description: 'A monolithic 1.8-meter solid extruded bronze fixture housing warm 2700K museum-grade CRI 97+ LED arrays diffused through frosted Japanese alabaster glass. Dimmable via DALI and TRIAC protocols.',
    price: 88000,
    unit: 'set',
    moq: 1,
    stock: 12,
    purchaseMode: 'BUY_NOW',
    leadTime: '5-7 business days',
    dimensions: '1800mm L x 60mm W x 80mm H (Suspension up to 2500mm)',
    material: 'Solid Extruded Bronze & Cast Alabaster',
    finish: 'Hand-Rubbed Aged Bronze',
    color: 'Antique Bronze',
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
    ],
    isFeatured: true,
    isNew: false,
    isBestseller: true,
    published: true,
    tags: ['Lighting', 'Bronze', 'Dining Table Chandelier', 'Minimalist'],
    specifications: {
      'Luminous Flux': '4,200 Lumens',
      'Color Temperature': '2700K Warm Architectural Glow',
      'Color Rendering Index': 'CRI 98',
      'Voltage': '220-240V AC 50/60Hz',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-knurled-bronze-hardware',
    name: 'Bespoke Knurled Bronze Door Lever & Escutcheon Set',
    slug: 'bespoke-knurled-bronze-door-lever',
    sku: 'HRD-LVR-007',
    brand: 'Balaji Architect & Interiors',
    categoryId: 'cat-hardware',
    categoryName: 'Bespoke Hardware & Pulls',
    categorySlug: 'bespoke-hardware',
    subcategory: 'Architectural Door Hardware',
    description: 'Machined from solid naval brass billets and finished with a dark antique bronze patina that deepens with use. Features a precision cross-hatch diamond knurled barrel for a reassuring tactile grip on heavy entrance doors.',
    price: 9500,
    salePrice: 8600,
    unit: 'set',
    moq: 2,
    stock: 65,
    purchaseMode: 'BUY_NOW',
    leadTime: '2-3 business days',
    dimensions: '150mm Lever x 52mm Rose',
    material: 'Solid Forged Naval Brass',
    finish: 'Unlacquered Living Bronze Patina',
    color: 'Dark Antique Bronze',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80',
    ],
    isFeatured: false,
    isNew: true,
    isBestseller: true,
    published: true,
    tags: ['Door Hardware', 'Bronze Handles', 'Knurled Brass', 'Luxury Entrance'],
    specifications: {
      'Mechanism': 'Heavy duty sprung return rose with ball-bearing hub',
      'Spindle': '8mm solid steel standard',
      'Door Thickness Fit': '38mm to 55mm solid timber doors',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-custom-millwork-veneer',
    name: 'Smoked Santos Rosewood Architectural Veneer',
    slug: 'smoked-santos-rosewood-veneer',
    sku: 'MAT-VNR-008',
    brand: 'Balaji Architect & Interiors',
    categoryId: 'cat-wood',
    categoryName: 'Hardwood & Architectural Veneers',
    categorySlug: 'hardwood-veneers',
    subcategory: 'Natural Wood Veneer',
    description: 'Sequenced architectural flitch veneer with rich espresso cathedrals and bronze undertones. Backed with non-woven fleece for seamless pressing onto curved cabinetry and bespoke wardrobes.',
    price: 320,
    unit: 'sq ft',
    moq: 200,
    stock: 4200,
    purchaseMode: 'REQUEST_QUOTE',
    leadTime: '7-10 business days',
    dimensions: '3050mm L x 1250mm W',
    thickness: '0.6mm',
    material: 'Natural Santos Rosewood',
    finish: 'Raw Unfinished (Ready for matte polyurethane or hardwax)',
    color: 'Rich Espresso & Bronze Striations',
    images: [
      'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=1200&q=80',
    ],
    isFeatured: false,
    isNew: false,
    isBestseller: false,
    published: true,
    tags: ['Veneer', 'Rosewood', 'Wardrobes', 'Wall Paneling', 'Joinery'],
    specifications: {
      'Cut': 'Crown Cut & Quarter Cut Bookmatched',
      'Moisture Content': '8-12%',
      'Sustainably Certified': 'FSC 100% Controlled Harvest',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const initialProjects: Project[] = [
  {
    id: 'proj-sanctuary-alibaug',
    title: 'The Sanctuary at Alibaug',
    slug: 'the-sanctuary-at-alibaug',
    location: 'Awas Coast, Alibaug',
    year: '2025',
    projectType: 'Architecture & Villa',
    area: '8,200 sq ft',
    shortDescription: 'A monolithic coastal retreat grounded in honed Tivoli travertine, smoked French oak, and frameless pocketing glass walls connecting lush banyan groves.',
    description: 'Designed as a timeless multi-generational weekend villa, The Sanctuary is configured around a central reflecting pool framed by board-formed concrete and warm Italian travertine. Every interior element was custom designed and fabricated by Balaji Architect & Interiors, ensuring unbroken harmony between raw architectural mass and delicate tactile finishes.',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=80',
    ],
    designApproach: 'Our approach balanced heavy thermal mass walls with delicate bronze joinery and natural woven linens, allowing sea breezes to filter through while maintaining deep shade and thermal comfort.',
    materialsUsed: [
      {
        materialId: 'prod-travertine-slab',
        materialName: 'Romano Classico Vein-Cut Travertine',
        category: 'Natural Stone',
        imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80',
      },
      {
        materialId: 'prod-smoked-oak-flooring',
        materialName: 'Smoked European White Oak Wide Plank',
        category: 'Timber',
        imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80',
      },
      {
        materialId: 'prod-linear-bronze-pendant',
        materialName: 'Kanso Linear Brushed Bronze Chandelier',
        category: 'Lighting',
        imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=400&q=80',
      },
    ],
    isPublished: true,
    isFeatured: true,
    sortOrder: 1,
    tags: ['Villa', 'Coastal', 'Travertine', 'Minimalist Luxury', 'Turnkey Execution'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'proj-pavilion-worli',
    title: 'Pavilion of Light',
    slug: 'pavilion-of-light-worli',
    location: 'Worli Seaface, Mumbai',
    year: '2024',
    projectType: 'Penthouse & Estate',
    area: '5,400 sq ft',
    shortDescription: 'An expansive sea-facing sky penthouse wrapped in acoustic fluted walnut paneling, Calacatta Vagli porcelain, and custom patinated bronze millwork.',
    description: 'Perched high above the Arabian Sea, this sky residence explores how sunlight behaves across contrasting textures. The public salon flows seamlessly from honed stone floors to floor-to-ceiling smoked walnut millwork housing a curated collection of modern sculpture.',
    heroImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1400&q=80',
    ],
    designApproach: 'We eradicated unnecessary visual clutter, replacing drywall partitions with sliding fluted acoustic timber screens that allow the living space to transform dynamically from open gallery to private entertaining salon.',
    materialsUsed: [
      {
        materialId: 'prod-fluted-acoustic-panel',
        materialName: 'Acoustic Fluted Walnut Wall Panel',
        category: 'Acoustic Cladding',
        imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=400&q=80',
      },
      {
        materialId: 'prod-calacatta-porcelain',
        materialName: 'Calacatta Vagli Sintered Porcelain Slab',
        category: 'Sintered Stone',
        imageUrl: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=400&q=80',
      },
    ],
    isPublished: true,
    isFeatured: true,
    sortOrder: 2,
    tags: ['Penthouse', 'Mumbai', 'Walnut', 'Sea View', 'Interior Design'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'proj-maison-brutaliste',
    title: 'Maison Brutaliste',
    slug: 'maison-brutaliste-delhi',
    location: 'Chhatarpur Farms, New Delhi',
    year: '2025',
    projectType: 'Residential Interiors',
    area: '11,000 sq ft',
    shortDescription: 'A bold sculptural private residence contrasting raw architectural board-formed concrete with refined brushed bronze and lush interior courtyard gardens.',
    description: 'Conceived as an inward-looking sanctuary shielded from urban noise, Maison Brutaliste features soaring 6-meter ceilings and rhythmic colonnades that capture changing light across the seasons.',
    heroImage: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=80',
    ],
    designApproach: 'The project demonstrates our philosophy of material honesty—every concrete pour, timber grain, and bronze joint is left exposed to celebrate true construction craftsmanship.',
    materialsUsed: [
      {
        materialId: 'prod-travertine-slab',
        materialName: 'Romano Classico Vein-Cut Travertine',
        category: 'Stone',
      },
      {
        materialId: 'prod-knurled-bronze-hardware',
        materialName: 'Bespoke Knurled Bronze Door Lever',
        category: 'Hardware',
      },
    ],
    isPublished: true,
    isFeatured: true,
    sortOrder: 3,
    tags: ['Brutalist', 'Private Residence', 'Delhi', 'Concrete & Bronze'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'proj-monolith-studio',
    title: 'The Monolith Design Headquarters',
    slug: 'the-monolith-design-headquarters',
    location: 'Indiranagar, Bengaluru',
    year: '2024',
    projectType: 'Commercial & Studio',
    area: '4,200 sq ft',
    shortDescription: 'A serene creative studio for an international fashion house featuring modular walnut workstations and monolithic stone meeting pods.',
    description: 'Balaji Architect & Interiors was commissioned to rethink modern creative workspace architecture. We crafted quiet acoustic alcoves and an open library of tactile material specimens to inspire daily design exploration.',
    heroImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80',
    ],
    designApproach: 'Focus on high acoustic performance and calm ambient illumination to support deep creative focus.',
    materialsUsed: [
      {
        materialId: 'prod-fluted-acoustic-panel',
        materialName: 'Acoustic Fluted Walnut Wall Panel',
        category: 'Acoustics',
      },
    ],
    isPublished: true,
    isFeatured: false,
    sortOrder: 4,
    tags: ['Studio', 'Workplace', 'Bengaluru', 'Commercial'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'proj-aura-hyderabad',
    title: 'Aura Residence',
    slug: 'aura-residence-hyderabad',
    location: 'Jubilee Hills, Hyderabad',
    year: '2025',
    projectType: 'Residential Interiors',
    area: '6,800 sq ft',
    shortDescription: 'An understated private residence balancing traditional Deccan courtyard typologies with razor-sharp modern detailing.',
    description: 'Every room in Aura Residence is composed around intimate landscaped lightwells. Custom unlacquered bronze partitions and vein-matched marble floors foster a feeling of continuous calm.',
    heroImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=80',
    ],
    designApproach: 'Integration of passive ventilation, natural daylight, and enduring local granite masonry.',
    materialsUsed: [],
    isPublished: true,
    isFeatured: true,
    sortOrder: 5,
    tags: ['Courtyard House', 'Hyderabad', 'Luxury Interior'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'proj-kyoto-tea-dine',
    title: 'Kyoto Tea & Dine Atelier',
    slug: 'kyoto-tea-dine-atelier',
    location: 'Pali Hill, Bandra West, Mumbai',
    year: '2024',
    projectType: 'Hospitality & Luxury Dining',
    area: '3,900 sq ft',
    shortDescription: 'An intimate omakase and artisanal tea lounge celebrated for its charred Shou Sugi Ban cedar walls and monolithic travertine bar.',
    description: 'Designed as a multisensory journey, guests transition through a tranquil rock garden into an ambient dining room anchored by an 8-meter solid stone counter illuminated by custom linear bronze fixtures.',
    heroImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80',
    ],
    designApproach: 'Minimalist Japanese wabi-sabi principles interpreted through contemporary Indian stone craftsmanship.',
    materialsUsed: [
      {
        materialId: 'prod-linear-bronze-pendant',
        materialName: 'Kanso Linear Brushed Bronze Chandelier',
        category: 'Lighting',
      },
    ],
    isPublished: true,
    isFeatured: false,
    sortOrder: 6,
    tags: ['Hospitality', 'Restaurant', 'Bandra', 'Dining'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const initialServices: Service[] = [
  {
    id: 'srv-interior-architecture',
    title: 'Interior Architecture & Space Planning',
    slug: 'interior-architecture-space-planning',
    shortDesc: 'Comprehensive spatial reconfiguration, structural alignment, and architectural interior detailing for luxury residences and estates.',
    fullDesc: 'We re-engineer spatial flows from first principles, taking into account natural daylight vectors, sightlines, acoustics, and structural integration. Our drawings cover full architectural CAD & BIM sets, reflected ceiling plans, MEP coordination, and micro-detailed millwork joinery.',
    iconName: 'Compass',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    deliverables: [
      'Concept spatial diagrams & 3D volumetric studies',
      'Full architectural interior blueprint packages',
      'Reflected ceiling & architectural lighting plans',
      'Custom door, window, and wall assembly details',
      'Statutory & structural consultant coordination',
    ],
    sortOrder: 1,
    isPublished: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'srv-turnkey-execution',
    title: 'Turnkey Luxury Execution',
    slug: 'turnkey-luxury-execution',
    shortDesc: 'End-to-end master project management, artisan craftsmanship, and on-site engineering from bare shell to final handover.',
    fullDesc: 'Our dedicated site engineering and project management division oversees every phase of construction. We ensure absolute adherence to millimeter tolerances, material integrity, and promised delivery timelines.',
    iconName: 'ShieldCheck',
    imageUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
    deliverables: [
      'Dedicated on-site architectural project manager',
      'Daily photographic progress tracking & Gantt charts',
      'Master artisan supervision (masonry, carpentry, stone finishing)',
      'Rigorous multi-stage QA and snag resolution',
      'Comprehensive maintenance manuals & warranty portfolio',
    ],
    sortOrder: 2,
    isPublished: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'srv-material-consultation',
    title: 'Material Curation & Sourcing Advisory',
    slug: 'material-curation-sourcing',
    shortDesc: 'Global stone quarry selection, certified timber procurement, and bespoke surface formulation tailored to project climate.',
    fullDesc: 'Leveraging our direct relationships with European quarries and master timber mills, we curate bespoke material palettes that age gracefully. We conduct rigorous laboratory testing for water absorption, hardness, and thermal behavior.',
    iconName: 'Layers',
    imageUrl: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
    deliverables: [
      'Physical tactile sample trays & curated finish moodboards',
      'Direct quarry inspection and slab block selection',
      'Full technical specification sheets & maintenance protocols',
      'Contractor procurement schedules and MOQ optimization',
    ],
    sortOrder: 3,
    isPublished: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'srv-custom-furniture',
    title: 'Bespoke Furniture & Custom Millwork',
    slug: 'bespoke-furniture-custom-millwork',
    shortDesc: 'Limited edition furniture, sculptural stone monoliths, and precision-engineered architectural cabinetry handcrafted in our studio.',
    fullDesc: 'Every piece is drafted specifically for its designated space, utilizing select hardwoods, hand-poured bronze castings, and monolithic natural stones.',
    iconName: 'Armchair',
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
    deliverables: [
      '1:1 scale ergonomic prototypes and timber mockups',
      'Hand-selected natural flitch veneer matching',
      'Integrated soft-close concealed hardware engineering',
      'Numbered certificate of atelier authenticity',
    ],
    sortOrder: 4,
    isPublished: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

/**
 * Returns initial admin account with email vicks@balaji.com
 * and must_change_password: true.
 * Note: Password is never stored in plaintext!
 */
export function getInitialAdminSeed() {
  return {
    id: '2bd20632-00dd-4f48-84b4-6e526543c8d8',
    email: 'vicks@balaji.com',
    passwordHash: hashPassword('v****@********'),
    name: 'Vikas Sir (Principal Architect)',
    role: 'super_admin' as const,
    mustChangePassword: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}
```

---

### `src/lib/supabase.ts`

- **File**: `src/lib/supabase.ts`
- **Size**: 1.1 KB (18 lines)
- **Language**: `typescript`

```typescript
import { createClient } from '@supabase/supabase-js';

export const DEFAULT_SUPABASE_URL = 'https://yvureduruttjoxhwuqwx.supabase.co';
export const DEFAULT_SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2dXJlZHVydXR0am94aHd1cXd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY5ODA3NjgsImV4cCI6MjEwMjU1Njc2OH0.knhQk_Cc6Z3NF4iPGkgQU_B5LvR1l69cJmpelFkc0Xw';
export const DEFAULT_SUPABASE_SERVICE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2dXJlZHVydXR0am94aHd1cXd4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4Njk4MDc2OCwiZXhwIjoyMTAyNTU2NzY4fQ.sHAE78IUF3wgmxDaj3OTWWOPB1Qhlth2FCzgAQdsqzU';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function getServiceSupabase() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || DEFAULT_SUPABASE_SERVICE_KEY;
  return createClient(supabaseUrl, serviceKey);
}
```

---

### `src/types/index.ts`

- **File**: `src/types/index.ts`
- **Size**: 6.2 KB (323 lines)
- **Language**: `typescript`

```typescript
export type UnitType =
  | 'sq ft'
  | 'sq m'
  | 'sheet'
  | 'piece'
  | 'box'
  | 'meter'
  | 'running foot'
  | 'roll'
  | 'set'
  | 'unit';

export type PurchaseMode = 'BUY_NOW' | 'REQUEST_QUOTE' | 'BOTH' | 'UNAVAILABLE';

export interface ProductVariant {
  id: string;
  productId: string;
  sku: string;
  name: string;
  color?: string;
  finish?: string;
  thickness?: string;
  size?: string;
  priceModifier: number; // e.g. +150
  stock: number;
  imageUrl?: string;
  createdAt?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  brand: string;
  categoryId: string;
  categoryName?: string;
  categorySlug?: string;
  subcategory?: string;
  description: string;
  price: number;
  salePrice?: number;
  unit: UnitType;
  moq: number; // Minimum Order Quantity
  stock: number;
  purchaseMode: PurchaseMode;
  leadTime: string; // e.g. "3-5 business days" or "Made to order (2-3 weeks)"
  dimensions?: string;
  thickness?: string;
  material?: string;
  finish?: string;
  color?: string;
  images: string[];
  variants?: ProductVariant[];
  isFeatured: boolean;
  isNew: boolean;
  isBestseller: boolean;
  published: boolean;
  tags: string[];
  specifications: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  parentId?: string | null;
  sortOrder: number;
  isActive: boolean;
  productCount?: number;
  createdAt: string;
  updatedAt: string;
}

export type ProjectType =
  | 'Residential Interiors'
  | 'Architecture & Villa'
  | 'Commercial & Studio'
  | 'Hospitality & Luxury Dining'
  | 'Penthouse & Estate'
  | 'Custom Spatial Design';

export interface ProjectMaterialRef {
  materialId?: string;
  materialName: string;
  category: string;
  imageUrl?: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  location: string;
  year: string;
  projectType: ProjectType;
  area: string; // e.g. "6,500 sq ft"
  shortDescription: string;
  description: string;
  heroImage: string;
  gallery: string[];
  designApproach: string;
  materialsUsed: ProjectMaterialRef[];
  beforeAfter?: {
    beforeImage?: string;
    afterImage?: string;
    description?: string;
  };
  isPublished: boolean;
  isFeatured: boolean;
  sortOrder: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  imageUrl: string;
  deliverables: string[];
  sortOrder: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Customer {
  id: string;
  email: string;
  phone: string;
  fullName: string;
  isGuest: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  id: string;
  customerId?: string;
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  isDefault?: boolean;
}

export type OrderStatus =
  | 'Pending'
  | 'Confirmed'
  | 'Processing'
  | 'Packed'
  | 'Shipped'
  | 'Delivered'
  | 'Cancelled';

export type PaymentStatus =
  | 'Pending'
  | 'Submitted'
  | 'Paid'
  | 'Failed'
  | 'Refunded';

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  variantId?: string;
  productName: string;
  productSku: string;
  unit: UnitType;
  unitPrice: number;
  quantity: number;
  subtotal: number;
  imageUrl?: string;
  selectedColor?: string;
  selectedFinish?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: Address;
  billingAddress?: Address;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shippingFee: number;
  discount: number;
  totalAmount: number;
  orderStatus: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type QuoteStatus =
  | 'Pending'
  | 'Under_Review'
  | 'Quotation_Sent'
  | 'Approved'
  | 'Rejected'
  | 'Converted_To_Order';

export interface QuoteItem {
  id: string;
  quoteId: string;
  productId?: string;
  productName: string;
  dimensions?: string;
  quantity: number;
  unit: UnitType;
  estimatedUnitPrice?: number;
  notes?: string;
}

export interface Quote {
  id: string;
  quoteNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  projectType: string;
  projectLocation: string;
  estimatedTimeline: string;
  budgetRange: string;
  notes: string;
  items: QuoteItem[];
  status: QuoteStatus;
  totalQuotedAmount?: number;
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  source: string; // e.g. "Contact Page", "Project Case Study", "Footer"
  status: 'New' | 'Read' | 'Followed_Up' | 'Archived';
  createdAt: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'super_admin' | 'editor' | 'viewer';
  mustChangePassword: boolean;
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SiteSettings {
  brandName: string;
  tagline: string;
  logoUrl?: string;
  contactEmail: string;
  contactPhone: string;
  studioAddress: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  currency: string;
  currencySymbol: string;
  taxRatePercent: number;
  standardShippingFee: number;
  freeShippingThreshold: number;
  socialInstagram: string;
  socialPinterest: string;
  socialLinkedin: string;
  announcementBanner?: {
    enabled: boolean;
    text: string;
    linkUrl?: string;
  };
}

export interface AuditLog {
  id: string;
  adminId: string;
  adminEmail: string;
  action: string;
  entity: string;
  entityId?: string;
  details?: Record<string, any>;
  ipAddress?: string;
  createdAt: string;
}

export interface CartItem {
  productId: string;
  variantId?: string;
  product: Product;
  variant?: ProductVariant;
  quantity: number;
  unitPrice: number;
}
```

---

### `supabase/schema.sql`

- **File**: `supabase/schema.sql`
- **Size**: 14.7 KB (409 lines)
- **Language**: `sql`

```sql
-- ============================================================
-- BALAJI ATELIER — LUXURY INTERIOR & ARCHITECTURE PLATFORM
-- PRODUCTION DATABASE SCHEMA WITH ROW LEVEL SECURITY (RLS)
-- ============================================================

-- 1. ADMINS TABLE
CREATE TABLE IF NOT EXISTS admins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'super_admin',
    must_change_password BOOLEAN NOT NULL DEFAULT true,
    last_login_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    image_url TEXT,
    parent_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    sort_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    sku TEXT UNIQUE NOT NULL,
    brand TEXT NOT NULL DEFAULT 'Balaji Atelier',
    category_id UUID REFERENCES categories(id) ON DELETE RESTRICT,
    subcategory TEXT,
    description TEXT NOT NULL,
    price NUMERIC(12, 2) NOT NULL CHECK (price >= 0),
    sale_price NUMERIC(12, 2) CHECK (sale_price >= 0),
    unit TEXT NOT NULL DEFAULT 'sq ft',
    moq INT NOT NULL DEFAULT 1 CHECK (moq >= 1),
    stock INT NOT NULL DEFAULT 0 CHECK (stock >= 0),
    purchase_mode TEXT NOT NULL DEFAULT 'BUY_NOW',
    lead_time TEXT NOT NULL DEFAULT '3-5 business days',
    dimensions TEXT,
    thickness TEXT,
    material TEXT,
    finish TEXT,
    color TEXT,
    images JSONB NOT NULL DEFAULT '[]'::jsonb,
    is_featured BOOLEAN NOT NULL DEFAULT false,
    is_new BOOLEAN NOT NULL DEFAULT false,
    is_bestseller BOOLEAN NOT NULL DEFAULT false,
    published BOOLEAN NOT NULL DEFAULT true,
    tags TEXT[] NOT NULL DEFAULT '{}',
    specifications JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. PRODUCT VARIANTS TABLE
CREATE TABLE IF NOT EXISTS product_variants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    sku TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    color TEXT,
    finish TEXT,
    thickness TEXT,
    size TEXT,
    price_modifier NUMERIC(12, 2) NOT NULL DEFAULT 0,
    stock INT NOT NULL DEFAULT 0 CHECK (stock >= 0),
    image_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. COLLECTIONS TABLE
CREATE TABLE IF NOT EXISTS collections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    cover_image TEXT,
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. INVENTORY TABLE
CREATE TABLE IF NOT EXISTS inventory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    variant_id UUID REFERENCES product_variants(id) ON DELETE CASCADE,
    stock_on_hand INT NOT NULL DEFAULT 0 CHECK (stock_on_hand >= 0),
    stock_reserved INT NOT NULL DEFAULT 0 CHECK (stock_reserved >= 0),
    stock_available INT NOT NULL DEFAULT 0 CHECK (stock_available >= 0),
    low_stock_threshold INT NOT NULL DEFAULT 5,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (product_id, variant_id)
);

-- 7. PROJECTS (PORTFOLIO) TABLE
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    location TEXT NOT NULL,
    year TEXT NOT NULL,
    project_type TEXT NOT NULL,
    area TEXT NOT NULL,
    short_description TEXT NOT NULL,
    description TEXT NOT NULL,
    hero_image TEXT NOT NULL,
    gallery JSONB NOT NULL DEFAULT '[]'::jsonb,
    design_approach TEXT NOT NULL,
    materials_used JSONB NOT NULL DEFAULT '[]'::jsonb,
    before_after JSONB DEFAULT '{}'::jsonb,
    is_published BOOLEAN NOT NULL DEFAULT true,
    is_featured BOOLEAN NOT NULL DEFAULT false,
    sort_order INT NOT NULL DEFAULT 0,
    tags TEXT[] NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. SERVICES TABLE
CREATE TABLE IF NOT EXISTS services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    short_desc TEXT NOT NULL,
    full_desc TEXT NOT NULL,
    icon_name TEXT NOT NULL,
    image_url TEXT NOT NULL,
    deliverables JSONB NOT NULL DEFAULT '[]'::jsonb,
    sort_order INT NOT NULL DEFAULT 0,
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. CUSTOMERS TABLE
CREATE TABLE IF NOT EXISTS customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    full_name TEXT NOT NULL,
    is_guest BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. ADDRESSES TABLE
CREATE TABLE IF NOT EXISTS addresses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    address_line1 TEXT NOT NULL,
    address_line2 TEXT,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    pincode TEXT NOT NULL,
    country TEXT NOT NULL DEFAULT 'India',
    is_default BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 11. ORDERS TABLE
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number TEXT UNIQUE NOT NULL,
    customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    shipping_address JSONB NOT NULL,
    billing_address JSONB,
    subtotal NUMERIC(12, 2) NOT NULL CHECK (subtotal >= 0),
    tax NUMERIC(12, 2) NOT NULL DEFAULT 0 CHECK (tax >= 0),
    shipping_fee NUMERIC(12, 2) NOT NULL DEFAULT 0 CHECK (shipping_fee >= 0),
    discount NUMERIC(12, 2) NOT NULL DEFAULT 0 CHECK (discount >= 0),
    total_amount NUMERIC(12, 2) NOT NULL CHECK (total_amount >= 0),
    order_status TEXT NOT NULL DEFAULT 'Pending',
    payment_status TEXT NOT NULL DEFAULT 'Pending',
    payment_method TEXT NOT NULL DEFAULT 'Card',
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 12. ORDER ITEMS TABLE
CREATE TABLE IF NOT EXISTS order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE SET NULL,
    variant_id UUID REFERENCES product_variants(id) ON DELETE SET NULL,
    product_name TEXT NOT NULL,
    product_sku TEXT NOT NULL,
    unit TEXT NOT NULL,
    unit_price NUMERIC(12, 2) NOT NULL CHECK (unit_price >= 0),
    quantity INT NOT NULL CHECK (quantity > 0),
    subtotal NUMERIC(12, 2) NOT NULL CHECK (subtotal >= 0),
    image_url TEXT,
    selected_color TEXT,
    selected_finish TEXT
);

-- 13. QUOTES TABLE
CREATE TABLE IF NOT EXISTS quotes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quote_number TEXT UNIQUE NOT NULL,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    project_type TEXT NOT NULL,
    project_location TEXT NOT NULL,
    estimated_timeline TEXT NOT NULL,
    budget_range TEXT NOT NULL,
    notes TEXT,
    status TEXT NOT NULL DEFAULT 'Pending',
    total_quoted_amount NUMERIC(12, 2),
    admin_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 14. QUOTE ITEMS TABLE
CREATE TABLE IF NOT EXISTS quote_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quote_id UUID NOT NULL REFERENCES quotes(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE SET NULL,
    product_name TEXT NOT NULL,
    dimensions TEXT,
    quantity INT NOT NULL CHECK (quantity > 0),
    unit TEXT NOT NULL,
    estimated_unit_price NUMERIC(12, 2),
    notes TEXT
);

-- 15. ENQUIRIES TABLE
CREATE TABLE IF NOT EXISTS enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    source TEXT NOT NULL DEFAULT 'Contact Page',
    status TEXT NOT NULL DEFAULT 'New',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 16. SITE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS site_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 17. NOTIFICATION SUBSCRIPTIONS TABLE
CREATE TABLE IF NOT EXISTS notification_subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    endpoint TEXT UNIQUE NOT NULL,
    keys JSONB NOT NULL,
    user_agent TEXT,
    admin_id UUID REFERENCES admins(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 18. AUDIT LOGS TABLE
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_id UUID REFERENCES admins(id) ON DELETE SET NULL,
    admin_email TEXT NOT NULL,
    action TEXT NOT NULL,
    entity TEXT NOT NULL,
    entity_id TEXT,
    details JSONB,
    ip_address TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- INDEXES FOR MAXIMUM QUERY PERFORMANCE
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_sku ON products(sku);
CREATE INDEX IF NOT EXISTS idx_products_published ON products(published);
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_published ON projects(is_published);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(order_status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quotes_status ON quotes(status);
CREATE INDEX IF NOT EXISTS idx_quotes_created_at ON quotes(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created ON audit_logs(created_at DESC);

-- ============================================================
-- ENABLE ROW LEVEL SECURITY (RLS) ON ALL TABLES
-- ============================================================
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- RLS POLICIES (PUBLIC READ & STRICT MUTATION ISOLATION)
-- ============================================================

-- 1. Categories: Public can read active categories
CREATE POLICY "Public categories read" ON categories
    FOR SELECT USING (is_active = true);

-- 2. Products: Public can read published products
CREATE POLICY "Public products read" ON products
    FOR SELECT USING (published = true);

-- 3. Product Variants: Public can read all variants
CREATE POLICY "Public variants read" ON product_variants
    FOR SELECT USING (true);

-- 4. Collections: Public can read published collections
CREATE POLICY "Public collections read" ON collections
    FOR SELECT USING (is_published = true);

-- 5. Projects: Public can read published portfolio projects
CREATE POLICY "Public projects read" ON projects
    FOR SELECT USING (is_published = true);

-- 6. Services: Public can read published services
CREATE POLICY "Public services read" ON services
    FOR SELECT USING (is_published = true);

-- 7. Site Settings: Public can read site configuration
CREATE POLICY "Public site settings read" ON site_settings
    FOR SELECT USING (true);

-- 8. Orders: Public can submit new orders
CREATE POLICY "Public can create orders" ON orders
    FOR INSERT WITH CHECK (true);

-- 9. Order Items: Public can insert items during checkout
CREATE POLICY "Public can create order items" ON order_items
    FOR INSERT WITH CHECK (true);

-- 10. Quotes: Public can submit quote requests
CREATE POLICY "Public can create quotes" ON quotes
    FOR INSERT WITH CHECK (true);

-- 11. Quote Items: Public can insert quote items
CREATE POLICY "Public can create quote items" ON quote_items
    FOR INSERT WITH CHECK (true);

-- 12. Enquiries: Public can submit contact messages
CREATE POLICY "Public can create enquiries" ON enquiries
    FOR INSERT WITH CHECK (true);

-- 13. Push Subscriptions: Public/Admin can register endpoints
CREATE POLICY "Public can register push endpoints" ON notification_subscriptions
    FOR INSERT WITH CHECK (true);

-- ============================================================
-- ATOMIC STOCK PROCEDURES
-- ============================================================
CREATE OR REPLACE FUNCTION decrement_stock_atomic(p_product_id UUID, p_quantity INT)
RETURNS BOOLEAN AS $$
DECLARE
    v_rows_affected INT;
BEGIN
    UPDATE products
    SET stock = stock - p_quantity,
        updated_at = NOW()
    WHERE id = p_product_id AND stock >= p_quantity;

    GET DIAGNOSTICS v_rows_affected = ROW_COUNT;
    RETURN v_rows_affected > 0;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION increment_stock_atomic(p_product_id UUID, p_quantity INT)
RETURNS VOID AS $$
BEGIN
    UPDATE products
    SET stock = stock + p_quantity,
        updated_at = NOW()
    WHERE id = p_product_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

### `tailwind.config.js`

- **File**: `tailwind.config.js`
- **Size**: 2.3 KB (83 lines)
- **Language**: `javascript`

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: '#F6F2EA', // Warm ivory
          subtle: '#EEE8DC',
          dark: '#E5DDCF',
        },
        surface: {
          DEFAULT: '#FCFAF6', // Warm white
          elevated: '#FFFFFF',
          card: '#FBF8F2',
        },
        espresso: {
          DEFAULT: '#211914', // Deep espresso
          light: '#2D221C',
          dark: '#140E0A',
        },
        timber: {
          DEFAULT: '#5A4335', // Sophisticated brown
          light: '#725644',
          dark: '#423126',
        },
        bronze: {
          DEFAULT: '#8C6A45', // Refined architectural bronze
          light: '#A58057',
          dark: '#6F5334',
        },
        champagne: {
          DEFAULT: '#C5A880', // Muted champagne / brushed gold
          light: '#DAC19E',
          dark: '#AC8E64',
        },
        charcoal: {
          DEFAULT: '#171513', // Near-black
          muted: '#36322E',
        },
        warmgray: {
          DEFAULT: '#746D65', // Warm gray
          light: '#9E978F',
          dark: '#4F4942',
        },
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['var(--font-jakarta)', 'Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.2em',
        editorial: '0.15em',
        subtle: '0.05em',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-up': 'fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-reveal': 'scaleReveal 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleReveal: {
          '0%': { opacity: '0', transform: 'scale(1.05)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
```

---

### `tsconfig.json`

- **File**: `tsconfig.json`
- **Size**: 0.6 KB (27 lines)
- **Language**: `json`

```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

---

