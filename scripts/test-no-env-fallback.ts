// Ensure all DB env vars are absent
delete process.env.DB_HOST;
delete process.env.DB_USER;
delete process.env.DB_PASSWORD;
delete process.env.DB_NAME;
delete process.env.DB_PORT;
delete process.env.MYSQL_HOST;
delete process.env.MYSQL_USER;
delete process.env.MYSQL_PASSWORD;
delete process.env.MYSQL_DATABASE;
delete process.env.MYSQL_PORT;
delete process.env.MYSQLHOST;
delete process.env.MYSQLUSER;
delete process.env.MYSQLPASSWORD;
delete process.env.MYSQLDATABASE;
delete process.env.MYSQLPORT;
delete process.env.DATABASE_URL;

(process.env as any).NODE_ENV = 'production';

async function verify() {
  const { getDbCredentials, isMySQLConfigured, testMySQLConnection } = await import('../src/server/db/mysql');
  const { getSiteSettings, updateSiteSettings } = await import('../src/server/db/repositories/settings');

  console.log('Testing without any DB environment variables...');
  const creds = getDbCredentials();
  console.log('Resolved credentials host:', creds.host, 'user:', creds.user, 'db:', creds.database);
  console.log('isMySQLConfigured():', isMySQLConfigured());

  const connTest = await testMySQLConnection();
  console.log('MySQL Connection Test Result:', connTest);
  if (!connTest.success) {
    throw new Error('MySQL connection failed without env vars: ' + connTest.error);
  }

  const settings = await getSiteSettings();
  console.log('Successfully read site settings brandName:', settings.brandName);

  const updated = await updateSiteSettings({
    brandName: settings.brandName,
  });
  console.log('Successfully executed updateSiteSettings without safety violation:', updated.brandName);

  console.log('\n🎉 ALL ZERO-ENV TESTS PASSED!');
  process.exit(0);
}

verify().catch((err) => {
  console.error('❌ Failed:', err);
  process.exit(1);
});
