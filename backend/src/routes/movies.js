const express = require('express');
const router = express.Router();

// Importing the example controller
const moviesController = require('../controllers/moviesController');

// Define routes
router.get('/', moviesController.getMovies);
router.post('/create', moviesController.createItem);
router.get('/:id', moviesController.getItem);
router.put('/:id', moviesController.updateItem);
router.delete('/:id', moviesController.deleteItem);

module.exports = router;
