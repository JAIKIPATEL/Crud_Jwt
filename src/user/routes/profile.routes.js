const express = require('express');
const router = express.Router();

const userController = require('../controller/profile.controller');
const auth = require('../../../middleware/Token_validation');


// User forgotPassword:
// router.put('/forgotPassword/:id', userController.forgotPassword);

// User resetPassword:
router.post('/resetPassword/:id', userController.resetPassword);

// User Logout:
router.put('/logout', userController.logout);

// Secret Routes
router.get('/verify', auth, (req, res, next) => {
    console.log("Token Verification");
});


module.exports = router; 