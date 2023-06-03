const express = require('express');
const router = express.Router();
const { fileUpload, getAllImage } = require('../Controller/file.controller');

router.post('/upload', fileUpload)
router.get('/getall', getAllImage)

module.exports = router;