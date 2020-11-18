const express = require('express');
const router = express.Router();
const controllers = require('../controllers/controllers');

router.get('/load-data', controllers.loadData);
router.get('/next-product', controllers.nextProduct);


module.exports = router;