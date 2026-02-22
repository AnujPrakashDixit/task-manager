const express = require('express');
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const authValidator = require('../validators/auth.validator');


const router = express.Router();

router.post('/register', authValidator.registerValidator, authValidator.validate, authController.registerUser);
router.post('/login', authController.loginUser);
router.post('/logout', authMiddleware.authUser, authController.logoutUser);


module.exports = router;
