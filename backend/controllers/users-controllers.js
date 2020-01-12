const uuid = require('uuid/v4');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const UserModel = require('../models/user-model.js');

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

const signUp = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      HttpError('Invalid inputs passed, please check your data', 422)
    );
  }

  const { name, email, password, places } = req.body;

  let existingUser;
  try {
    existingUser = await UserModel.findOne({ email: email });
  } catch (err) {
    const error = new HttpError('Signing up failed, please try again❗', 500);

    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      'User exists already, please login instead',
      422
    );

    return next(error);
  }

  const createdUser = new UserModel({
    name,
    email,
    image: 'https://image.flaticon.com/icons/png/512/64/64572.png',
    password,
    places
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError('Signing up failed❗', 500);
    return next(error);
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
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
