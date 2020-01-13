const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const UserModel = require('../models/user-model.js');

const getUsers = async (req, res, next) => {
  let users;

  try {
    users = await UserModel.find({}, '-password');
  } catch (err) {
    const error = new HttpError(
      'Fetching users failed, please try again later',
      500
    );
    return next(error);
  }

  res.json({ users: users.map(user => user.toObject({ getters: true })) });
};

const signUp = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      HttpError('Invalid inputs passed, please check your data', 422)
    );
  }

  const { name, email, password } = req.body;

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
    places: []
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError('Signing up failed❗', 500);
    return next(error);
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const logIn = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await UserModel.findOne({ email: email });
  } catch (err) {
    const error = new HttpError('Logging in failed, please try again❗', 500);

    return next(error);
  }

  if (!existingUser || existingUser.password !== password) {
    const error = new HttpError(
      'Invalid credentials, could not log you in❗',
      401
    );

    return next(error);
  }

  res.json({
    message: 'Logged IN!',
    user: existingUser.toObject({ getters: true })
  });
};

exports.getUsers = getUsers;
exports.signUp = signUp;
exports.logIn = logIn;
