# Salary Management Tool

Minimal salary management backend (Express + PostgreSQL) with seed script and tests.

Run server:

```bash
cd server
npm install
set DATABASE_URL=postgres://<user>:<password>@localhost:5432/incubyte
npm run seed    # seeds 10k employees (default)
npm start
```

Run client (from project root):

```bash
cd client
npm install
npm run dev
```

Run tests:

```bash
export DATABASE_URL="postgres://user:password@localhost:5432/incubyte"
npm test
```
