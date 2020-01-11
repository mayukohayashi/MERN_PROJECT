const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const usersRoutes = require('./routes/users-routes');
const placesRoutes = require('./routes/places-routes');

const HttpError = require('./models/http-error');

dotenv.config({ path: './config.env' });
const app = express();

app.use(bodyParser.json());

app.use('/api/users', usersRoutes);
app.use('/api/places', placesRoutes); // => /api/places/...

app.use((req, res, next) => {
  const error = new HttpError('Could not find this routes', 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred👎' });
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
