const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error.js');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // Authorization: 'Bearer TOKEN'
    if (!token) {
      throw new Error('Authentication failed!');
    }

    const decodedToken = jwt.verify(token, 'secret_not_to_share');
    req.userData = { userId: decodedToken.userId };

    next();
  } catch (err) {
    const error = new HttpError('Authentication Failed❗', 401);
    return next(error);
  }
};
