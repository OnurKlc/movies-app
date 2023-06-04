const express = require('express');
const router = express.Router();

const theatreController = require('../controllers/theatreController');

router.get('/', theatreController.getItems);
router.post('/create', theatreController.createItem);

module.exports = router;
