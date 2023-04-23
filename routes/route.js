const express = require('express');
const router = express.Router();
const userController = require('../controller/userController.js');
const validation = require('../middleware/validation.js');
const { uploadFile, updateFile } = require('../middleware/fileUpload.js');


router.get('/', userController.getUser);
router.post('/create', uploadFile, validation.customCreateValidation, userController.createUser);
router.get('/edit/:id', userController.editUser);
router.post('/update', updateFile, userController.updateUser);
router.post('/delete/:id', userController.deleteUser);

module.exports = router;