import { query } from '../src/server/db/mysql';

async function inspect() {
  const products: any[] = await query('SELECT id, name, images, category_id FROM products LIMIT 20');
  console.log(`Found ${products.length} products:`);
  for (const p of products) {
    console.log(`Product: "${p.name}" (ID: ${p.id})`);
    console.log(`  Raw images:`, p.images);
    try {
      const parsed = typeof p.images === 'string' ? JSON.parse(p.images) : p.images;
      console.log(`  Parsed images:`, JSON.stringify(parsed));
    } catch (e: any) {
      console.log(`  JSON parse error:`, e.message);
    }
  }
  process.exit(0);
}

inspect().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
