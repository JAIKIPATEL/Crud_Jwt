const express = require('express');
const router = express.Router();

const userController = require('../controller/profile.controller');
const auth = require('../../../middleware/Token_validation');


// User forgotPassword:
router.put('/forgotPassword/:id', auth, userController.forgotPassword);

// User resetPassword:
router.put('/resetPassword/:id', auth, userController.resetPassword);

// User Logout:
router.get('/logout/:id', auth, userController.logout);

// Secret Routes
router.get('/verify', auth, (req, res, next) => {
    console.log("Token Verification");
});



module.exports = router; 