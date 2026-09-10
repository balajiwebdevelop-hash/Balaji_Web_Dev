import { query } from '../src/server/db/mysql';

async function checkDb() {
  const tables: any[] = await query('SHOW TABLES');
  console.log('Tables:', tables.map(t => Object.values(t)[0]));

  const maxPacket: any[] = await query("SHOW VARIABLES LIKE 'max_allowed_packet'");
  console.log('max_allowed_packet:', maxPacket);

  process.exit(0);
}

checkDb().catch(err => {
  console.error(err);
  process.exit(1);
});
