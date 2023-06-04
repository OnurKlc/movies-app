const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/', userController.getUsers);
router.post('/login', userController.loginUser);
router.post('/create', userController.createItem);
router.get('/:username', userController.getItem);
router.put('/:id', userController.updateItem);
router.delete('/:username', userController.deleteItem);

module.exports = router;
