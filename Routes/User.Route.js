const express = require('express');
const { createUser, getUser, loginUser, getSingleUser, updateUser } = require('../Controllers/User.Controller');
const router = express.Router();

router.get('/', getUser);
router.post('/signup', createUser)
router.post('/login', loginUser)
router.get('/:id', getSingleUser)
router.patch('/:email', updateUser)

module.exports = router;