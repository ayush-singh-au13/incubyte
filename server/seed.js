const fs = require('fs');
const path = require('path');
const { getDb, init } = require('./db');

function readLines(file) {
  return fs.readFileSync(path.join(__dirname, file), 'utf8')
    .split(/\r?\n/)
    .map(s => s.trim())
    .filter(Boolean);
}

async function seed(count = 10000) {
  await init();
  const db = getDb();
  const first = readLines('first_names.txt');
  const last = readLines('last_names.txt');
  const titles = ['Software Engineer','Senior Engineer','Manager','Director','QA Engineer','HR Specialist','Sales Associate'];
  const countries = ['USA','India','UK','Germany','France','Canada','Australia'];

  const batchSize = 1000;
  for (let i = 0; i < count; i += batchSize) {
    const placeholders = [];
    const values = [];
    const limit = Math.min(batchSize, count - i);

    for (let j = 0; j < limit; j++) {
      const idx = i + j;
      const fn = first[idx % first.length];
      const ln = last[Math.floor(Math.random() * last.length)];
      const full = `${fn} ${ln}`;
      const title = titles[Math.floor(Math.random() * titles.length)];
      const country = countries[Math.floor(Math.random() * countries.length)];
      const salary = Math.round((30000 + Math.random() * 150000) * 100) / 100;
      const email = `${fn.toLowerCase()}.${ln.toLowerCase()}${idx}@example.com`;
      values.push(full, title, country, salary, email);
      placeholders.push(`($${values.length - 4}, $${values.length - 3}, $${values.length - 2}, $${values.length - 1}, $${values.length})`);
    }

    await db.query(`INSERT INTO employees (full_name, job_title, country, salary, email) VALUES ${placeholders.join(',')}`, values);
    console.log(`Inserted ${i + limit} rows`);
  }

  console.log('Seeding complete');
}

if (require.main === module) {
  const n = parseInt(process.argv[2]) || 10000;
  seed(n).catch(err => { console.error(err); process.exit(1); });
}
