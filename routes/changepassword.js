const express = require('express');
const router = express.Router();

const loginController = require('../controller/loginController')

router.get('/', loginController.changePassword)
router.post('/', loginController.newPassword)



module.exports = router;