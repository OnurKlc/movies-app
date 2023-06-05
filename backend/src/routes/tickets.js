const express = require('express');
const router = express.Router();

const ticketController = require('../controllers/ticketController');

router.get('/', ticketController.getItems);
router.post('/buy', ticketController.buyTicket);

module.exports = router;
