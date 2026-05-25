const Employee = require('../models/employees');

exports.findEmployeeById = async (req, res) => {
    try {
        const emp = await Employee.findById(req.params.id);
        if (!emp) return res.status(404).json({ error: 'Not found' });
        res.json(emp);
    } catch (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.createEmployee = async (req, res) => {
    try {
        const body = req.body;
        if (!body.full_name || !body.job_title || !body.country || !body.salary) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const created = await Employee.create(body);
        res.status(201).json(created);

    } catch (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}


exports.deleteEmployee = async (req, res) => {
    try {
        const ok = await Employee.delete(req.params.id);
        if (!ok) return res.status(404).json({ error: 'Not found' });
        res.status(204).end();
    } catch (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}