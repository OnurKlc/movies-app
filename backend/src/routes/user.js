const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/', userController.getUsers);
router.get('/:username', userController.getItem);
router.post('/login', userController.loginUser);
router.post('/create', userController.createItem);
router.post('/subscribe', userController.subscribeToPlatform);
router.put('/:username', userController.updateItem);
router.delete('/:username', userController.deleteItem);

module.exports = router;
