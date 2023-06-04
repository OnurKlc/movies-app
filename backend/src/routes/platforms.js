const express = require('express');
const router = express.Router();

const platformController = require('../controllers/platformController');

router.get('/', platformController.getPlatforms);
// router.post('/create', platformController.createItem);
// router.get('/:id', platformController.getItem);
// router.put('/:id', platformController.updateItem);
// router.delete('/:id', platformController.deleteItem);

module.exports = router;
