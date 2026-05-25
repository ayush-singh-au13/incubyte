const express = require('express');
const cors = require('cors');
const { init } = require('./config/db');
const employeesRouter = require('./routes/employees');
const metricsRouter = require('./routes/metrics');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/employees', employeesRouter);
app.use('/metrics', metricsRouter);

async function startServer() {
  await init();
  const port = process.env.PORT || 4000;
  app.listen(port, () => console.log(`Server listening on ${port}`));
}

startServer().catch(err => {
  console.error('Failed to initialize database:', err);
  process.exit(1);
});

module.exports = app;
