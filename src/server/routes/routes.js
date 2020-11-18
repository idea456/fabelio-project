/**
 * @author Adrienne Rio Wongso Atmojo
 */

const express = require('express');
const router = express.Router();
const controllers = require('../controllers/controllers');


// define the API routes

/**
 * A GET request that loads the data from the CSV into the database 
 */
router.get('/load-data', controllers.loadData);
/**
 * A GET request that gets the next product with the highest similarity
 */
router.get('/next-product', controllers.nextProduct);
/**
 * A GET request that gets the current ranking of the similar product
 */
router.get('/get-ranking', controllers.getRanking);


module.exports = router;