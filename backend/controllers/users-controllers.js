const uuid = require('uuid/v4');

const HttpError = require('../models/http-error');

const DUMMY_USERS = [
  {
    id: 'u1',
    name: 'Mayuko Hayashi',
    email: 'test@test.com',
    password: 'password'
  }
];

const getUsers = (req, res, next) => {
  // const userId = req.params.uid;

  // const users = DUMMY_USERS.filter(u => {
  //   return u.name === userId;
  // });

  // if (!users || users.length === 0) {
  //   return next(new HttpError('Could not find users', 404));
  // }

  res.json({ users: DUMMY_USERS });
};

const signUp = (req, res, next) => {
  const { name, email, password } = req.body;

  const hasUser = DUMMY_USERS.find(u => u.email === email);
  if (hasUser) {
    throw new HttpError('Could not create user, email already exists❗', 422);
  }

  const createdUser = {
    id: uuid(),
    name, // name: name
    email,
    password
  };

  DUMMY_USERS.push(createdUser);

  res.status(201).json({ user: createdUser });
};

const logIn = (req, res, next) => {
  const { email, password } = req.body;

  const identifiedUser = DUMMY_USERS.find(u => u.email === email);
  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError(
      'Could not identify user, credentials seem to be wrong😢',
      401
    );
  }

  res.json({ message: 'Logged IN!' });
};

exports.getUsers = getUsers;
exports.signUp = signUp;
exports.logIn = logIn;
