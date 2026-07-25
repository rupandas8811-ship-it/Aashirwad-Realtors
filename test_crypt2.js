import { db } from './src/db/index.js';
import { sql } from 'drizzle-orm';
async function run() {
  try {
    const res = await db.execute(sql`SELECT crypt('admin123', replace('$2b$10$OHWn8chjYNyXFngMlQBIeeWkXLxJhuT4gHrGT2e1LSiKlXbxbVE2e', '$2b$', '$2a$')) = replace('$2b$10$OHWn8chjYNyXFngMlQBIeeWkXLxJhuT4gHrGT2e1LSiKlXbxbVE2e', '$2b$', '$2a$') as is_match;`);
    console.log(res.rows);
  } catch(e) {
    console.error(e);
  }
}
run();
