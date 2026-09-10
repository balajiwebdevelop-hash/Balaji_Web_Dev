import { execute, query } from '../src/server/db/mysql';

async function setupMediaTable() {
  console.log('Creating media_storage table in Hostinger MySQL...');
  await execute(`
    CREATE TABLE IF NOT EXISTS media_storage (
      id VARCHAR(128) PRIMARY KEY,
      filename VARCHAR(255) NOT NULL UNIQUE,
      mime_type VARCHAR(100) NOT NULL,
      size INT NOT NULL,
      data LONGBLOB NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_filename (filename)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  const cols = await query('DESCRIBE media_storage');
  console.log('✅ media_storage table ready:', cols);
  process.exit(0);
}

setupMediaTable().catch((err) => {
  console.error('Error creating media_storage table:', err);
  process.exit(1);
});
