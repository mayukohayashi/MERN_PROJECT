const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const getCordsForAddress = require('../utils/locations');

const PlaceModel = require('../models/place-model');

let DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world',
    location: {
      lat: 40.7484474,
      lng: -73.9871516
    },
    address: '20 W 34th St, New York, 10001',
    creator: 'u1'
  }
];

// GET /api/places/:pid
// function getPlaceById() {...}
// const getPlaceById = function() {...}
const getPlaceById = (req, res, next) => {
  const placeId = req.params.pid; // { pid: 'p1' }

  const place = DUMMY_PLACES.find(p => {
    return p.id === placeId;
  });

  if (!place) {
    throw new HttpError('Could not find a place for the provided ID❗', 404);
  }

  res.json({ place }); // => { place } => { place: place }
};

// GET /api/places/users/:uid
const getPlacesByUserId = (req, res, next) => {
  const userId = req.params.uid;

  const places = DUMMY_PLACES.filter(p => {
    return p.creator === userId;
  });

  if (!places || places.length === 0) {
    return next(
      new HttpError('Could not find places for the provided user ID❗', 404)
    );
  }

  res.json({ places });
};

// POST /api/places
const createPlace = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);
    next(new HttpError('Invalid inputs passed, please check your data', 422));
  }

  const { title, description, address, creator, createdAt } = req.body;

  let coordinates;
  try {
    coordinates = await getCordsForAddress(address);
  } catch (error) {
    return next(error);
  }

  const createdPlace = new PlaceModel({
    title,
    description,
    address,
    location: coordinates,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/d/d9/Nakagin_Capsule_Tower_03.jpg',
    creator,
    createdAt
  });

  try {
    await createdPlace.save();
  } catch (err) {
    const error = new HttpError('Creating place failed❗', 500);
    return next(error);
  }

  res.status(201).json({ place: createdPlace });
};

// PATCH /api/places/:pid
const updatePlace = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);
    throw new HttpError('Invalid inputs passed, please check your data', 422);
  }

  const { title, description } = req.body;
  const placeId = req.params.pid;

  const updatedPlace = { ...DUMMY_PLACES.find(p => p.id === placeId) };
  const placeIndex = DUMMY_PLACES.findIndex(p => p.id === placeId);
  updatedPlace.title = title;
  updatedPlace.description = description;

  DUMMY_PLACES[placeIndex] = updatedPlace;

  res.status(200).json({ place: updatedPlace });
};

// DELETE /api/places/:pid
const deletePlace = (req, res, next) => {
  const placeId = req.params.pid;

  if (!DUMMY_PLACES.find(p => p.id === placeId)) {
    throw new HttpError('Could not find a place for that ID.', 404);
  }

  DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== placeId);
  res.status(200).json({ message: 'Deleted place.' });
};

// export multiple functions
exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
