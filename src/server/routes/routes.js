const express = require('express');
const router = express.Router();
const controllers = require('../controllers/controllers');

router.get('/print-hello', controllers.printHello);


module.exports = router;