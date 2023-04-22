const express = require('express');
const router = express.Router();
const userController = require('../controller/userController.js');
const validation = require('../middleware/validation.js');
const { uploadFile } = require('../middleware/fileUpload.js');


router.get('/', userController.getUser);
router.post('/create', uploadFile, validation.customCreateValidation, userController.createUser);

module.exports = router;