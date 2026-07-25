import { db } from './src/db/index.js';
import { sql } from 'drizzle-orm';
async function run() {
  try {
    const res = await db.execute(sql`SELECT pol.polname, tab.relname, pol.polcmd FROM pg_policy pol JOIN pg_class tab ON pol.polrelid = tab.oid WHERE tab.relname IN ('readiness_tests', 'consultations');`);
    console.log(res.rows);
  } catch(e) {
    console.error(e);
  }
}
run();
