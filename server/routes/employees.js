const express = require("express");
const router = express.Router();
const ctrl = require('../controllers/employee.controller');

router.get('/', async (req, res) => {
  const limit = parseInt(req.query.limit) || 50;
  const offset = parseInt(req.query.offset) || 0;
  const rows = await Employee.findAll({ limit, offset });
  res.json(rows);
});

router.get("/:id", ctrl.findEmployeeById);

router.post('/',ctrl.createEmployee);

router.put("/:id", ctrl.updateEmployee);

router.delete("/:id", ctrl.deleteEmployee);

router.delete('/:id', async (req, res) => {
  const ok = await Employee.delete(req.params.id);
  if (!ok) return res.status(404).json({ error: 'Not found' });
  res.status(204).end();
});

module.exports = router;

