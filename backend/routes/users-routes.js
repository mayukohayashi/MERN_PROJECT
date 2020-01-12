const express = require('express');
const { check } = require('express-validator');

const usersControllers = require('../controllers/users-controllers');

const router = express.Router();

router.get('/', usersControllers.getUsers);

router.post(
  '/signup',
  [
    check('name')
      .not()
      .isEmpty(),
    check('email')
      .normalizeEmail() // TEST@test.com => test@test.com
      .isEmail(),
    check('password').isLength({ min: 6 })
  ],
  usersControllers.signUp
);
router.post('/login', usersControllers.logIn);

module.exports = router;
