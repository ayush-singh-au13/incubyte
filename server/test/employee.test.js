const request = require('supertest');
const fs = require('fs');
const path = require('path');

// Ensure a clean DB for tests
const dbPath = path.join(__dirname, '..', 'data.db');
if (fs.existsSync(dbPath)) fs.unlinkSync(dbPath);

const app = require('../index');

describe('Employee API', () => {
  let createdId;

  test('create employee', async () => {
    const res = await request(app).post('/employees').send({
      full_name: 'Test User', job_title: 'Engineer', country: 'USA', salary: 50000, email: 't@example.com'
    });
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    createdId = res.body.id;
  });

  test('get employee', async () => {
    const res = await request(app).get(`/employees/${createdId}`);
    expect(res.status).toBe(200);
    expect(res.body.full_name).toBe('Test User');
  });

  test('metrics by country', async () => {
    const res = await request(app).get('/metrics/country/USA');
    expect(res.status).toBe(200);
    expect(res.body.count).toBeGreaterThanOrEqual(1);
  });

  test('update employee', async () => {
    const res = await request(app).put(`/employees/${createdId}`).send({ full_name: 'Updated', job_title: 'Engineer', country: 'USA', salary: 60000 });
    expect(res.status).toBe(200);
    expect(res.body.full_name).toBe('Updated');
  });

  test('delete employee', async () => {
    const res = await request(app).delete(`/employees/${createdId}`);
    expect(res.status).toBe(204);
  });
});
