import { db } from './src/db/index.js';
import { sql } from 'drizzle-orm';
async function run() {
  try {
    const res = await db.execute(sql`SELECT * FROM staff LIMIT 1;`);
    console.log(res.rows);
  } catch(e) {
    console.error(e);
  }
}
run();
