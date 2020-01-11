const express = require('express');

const usersControllers = require('../controllers/users-controllers');

const router = express.Router();

router.get('/', usersControllers.getUsers);
router.post('/signup', usersControllers.signUp);
router.post('/login', usersControllers.logIn);

module.exports = router;
