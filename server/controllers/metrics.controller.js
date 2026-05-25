const Employee = require('../models/employees');
exports.countryMetrics = async (req, res) => {
    try {
        const m = await Employee.metricsByCountry(req.params.country);
        res.json(m);
    } catch (err) {
        console.log("err", err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}


exports.avgByCountryAndTitle = async (req, res) => {
    try {
        const m = await Employee.avgByCountryAndTitle(req.params.country, req.params.title);
        res.json(m);
    } catch (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
