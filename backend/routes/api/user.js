const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userControllers');

// console.log('user,pwd1')

router.post('/signin',userController.handleNewUser)
router.post('/login',userController.handleLogin)
router.get('/logout',userController.handleLogout)

module.exports = router;