import { db } from './src/db/index.js';
import { sql } from 'drizzle-orm';
import fs from 'fs';
async function run() {
  try {
    const query = fs.readFileSync('sql_fix_2.sql', 'utf8');
    await db.execute(sql.raw(query));
    console.log("SQL 2 executed successfully.");
  } catch(e) {
    console.error(e);
  }
}
run();
