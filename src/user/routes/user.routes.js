const express = require('express');
const router = express.Router();

const userController = require('../controller/user.controller');
const { checkToken } = require('../../../middleware/Token_validation');
const auth = require('../../../middleware/Token_validation');


// Signup a new user
router.post('/', userController.create);

// Login a user
router.post('/login', userController.login);

////////////////////////////////////////////////////////

// Retrieve a user
router.get('/', userController.getAll);

// Retrieve a single user with id
router.get('/:id', userController.getById);

// Update a user by put
router.put('/:id', userController.update);

// Update a user by patch
router.patch('/:id', userController.update);

// Delete a user
router.delete('/:id', userController.delete);

////////////////////////////////////////////////////////

// Secret Routes
router.get('/verify', auth, (req, res, next) => {
    console.log("Token Verification");
});



// Admin Access
// Show all post: through Admin Access
router.get('/admin/getAll', userController.adminAccess);

// Show post ById: through Admin Access
router.get('/admin/:id', userController.adminGetById);

// Update post: through Admin Access
router.put('/adminUpdate/:id', userController.adminPostUpdate);

// Delete post ById: through Admin Access
router.delete('/adminDelete/:id', userController.adminPostDelete);

module.exports = router; 