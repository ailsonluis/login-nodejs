const express = require('express');
const router = express.Router();

const loginController= require('../controller/loginController')

router.get('/', loginController.getLogin)
router.post('/', loginController.signin)
router.get('/logout', loginController.logout)
module.exports = router;
