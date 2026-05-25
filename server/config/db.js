const path = require('path');
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname,"..", '.env') });

console.log('Initializing database connection...', process.env.DATABASE_URL);

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL must be set for PostgreSQL database access. Example: postgres://user:pass@localhost:5432/incubyte');
}

const db = new Pool({ connectionString: process.env.DATABASE_URL, max: 10 });

async function init() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS employees (
        id SERIAL PRIMARY KEY,
        full_name TEXT NOT NULL,
        job_title TEXT NOT NULL,
        country TEXT NOT NULL,
        salary NUMERIC NOT NULL,
        email TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
  } catch (err) {
    if (err.code === '28P01') {
      throw new Error('PostgreSQL authentication failed. Check DATABASE_URL in server/.env or your environment variables.');
    }
    throw err;
  }
}

function getDb() {
  return db;
}

module.exports = { getDb, init };
