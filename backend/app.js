const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

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

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB connection successful!'))
  .catch(err => {
    console.log(err);
  });

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
