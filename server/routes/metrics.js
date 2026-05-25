const router = require('express').Router();
const ctrl = require('../controllers/metrics.controller');


router.get('/country/:country', ctrl.countryMetrics);

router.get('/country/:country/title/:title', ctrl.avgByCountryAndTitle);

module.exports = router;