const express = require('express');
const router = express.Router();

const loginController= require('../controller/loginController')

router.get('/', loginController.register)
router.post('/', loginController.addRegister)

module.exports = router;