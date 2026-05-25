const express = require("express");
const router = express.Router();
const ctrl = require('../controllers/employee.controller');

router.get('/', ctrl.getAllEmployees);

router.get("/:id", ctrl.findEmployeeById);

router.post('/',ctrl.createEmployee);

router.put("/:id", ctrl.updateEmployee);

router.delete("/:id", ctrl.deleteEmployee);


module.exports = router;

