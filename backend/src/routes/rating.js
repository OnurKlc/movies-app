const express = require('express');
const router = express.Router();

const ratingController = require('../controllers/ratingController');

router.get('/:movie_id/:username', ratingController.getRating);
router.post('/rate', ratingController.rateMovie);

module.exports = router;
