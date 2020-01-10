const express = require('express');
const bodyParser = require('body-parser');

const placesRoutes = require('./routes/places-routes');

const app = express();

// => /api/places/...
app.use('/api/places', placesRoutes);

app.listen(6200);
