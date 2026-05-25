const { getDb, init } = require('../db');

function pgRow(result) {
  return result.rows[0];
}

function pgRows(result) {
  return result.rows;
}

module.exports = {
  async create(employee) {
    await init();
    const db = getDb();
    const result = await db.query(`
      INSERT INTO employees (full_name, job_title, country, salary, email)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `, [employee.full_name, employee.job_title, employee.country, employee.salary, employee.email]);
    return pgRow(result);
  },

  async update(id, employee) {
    await init();
    const db = getDb();
    await db.query(`
      UPDATE employees SET full_name=$1, job_title=$2, country=$3, salary=$4, email=$5
      WHERE id=$6
    `, [employee.full_name, employee.job_title, employee.country, employee.salary, employee.email, id]);
    return this.findById(id);
  },

  async delete(id) {
    await init();
    const db = getDb();
    const result = await db.query('DELETE FROM employees WHERE id = $1', [id]);
    return result.rowCount > 0;
  },

  async findById(id) {
    await init();
    const db = getDb();
    const result = await db.query('SELECT * FROM employees WHERE id = $1', [id]);
    return pgRow(result);
  },

  async findAll({ limit = 50, offset = 0 } = {}) {
    await init();
    const db = getDb();
    const result = await db.query('SELECT * FROM employees ORDER BY id LIMIT $1 OFFSET $2', [limit, offset]);
    return pgRows(result);
  },

  async count() {
    await init();
    const db = getDb();
    const result = await db.query('SELECT COUNT(*)::int as count FROM employees');
    return result.rows[0].count;
  },

  async metricsByCountry(country) {
    await init();
    const db = getDb();
    const result = await db.query(`
      SELECT MIN(salary) as min, MAX(salary) as max, AVG(salary) as avg, COUNT(*)::int as count
      FROM employees WHERE country = $1
    `, [country]);
    return pgRow(result);
  },

  async avgByCountryAndTitle(country, title) {
    await init();
    const db = getDb();
    const result = await db.query(`
      SELECT AVG(salary) as avg, COUNT(*)::int as count
      FROM employees WHERE country = $1 AND job_title = $2
    `, [country, title]);
    return pgRow(result);
  }
};
