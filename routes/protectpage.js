const express = require('express');
const router = express.Router();

const protectController = require('../controller/protectpageController')

router.get('/', protectController.getPage)



module.exports = router;