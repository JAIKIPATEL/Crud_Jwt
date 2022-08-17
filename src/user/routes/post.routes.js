const express = require('express');
const router = express.Router();

const postController = require('../controller/post.controller');


// Create a new user
router.post('/', postController.create);

// retreive all post
router.get('/', postController.getAll);

// Retrieve a single post with id
router.get('/:id', postController.getById);

// Update a post with id using put
router.put('/:id', postController.update);

// Update a post with id using patch
router.patch('/:id', postController.update);

// Delete a user with id
router.delete('/:id', postController.delete);


module.exports = router; 