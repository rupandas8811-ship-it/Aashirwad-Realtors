import { drizzle } from 'drizzle-orm/node-postgres';
import pkg from 'pg';
const { Pool } = pkg;
import * as schema from './schema.js';
import 'dotenv/config';

const connectionStr = process.env.POSTGRES_URL || process.env.DATABASE_URL || '';
// The connection string is provided securely by the runtime environment
const pool = new Pool({
  connectionString: connectionStr.split('?')[0],
  ssl: {
    rejectUnauthorized: false
  }
});

export const db = drizzle(pool, { schema });
