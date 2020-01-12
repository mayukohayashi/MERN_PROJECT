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
const getPlaceById = async (req, res, next) => {
  const placeId = req.params.pid; // { pid: 'p1' }

  let place;

  try {
    place = await PlaceModel.findById(placeId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a place❗',
      500
    );

    return next(error);
  }

  if (!place) {
    const error = new HttpError(
      'Could not find a place for the provided ID❗',
      404
    );

    return next(error);
  }

  res.json({ place: place.toObject({ getters: true }) }); // => { place } => { place: place }
};

// GET /api/places/users/:uid
const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  let places;
  try {
    places = await PlaceModel.find({ creator: userId });
  } catch (err) {
    const error = new HttpError(
      'Fetching places failed, please try again❗',
      500
    );

    return next(error);
  }

  if (!places || places.length === 0) {
    const error = new HttpError(
      'Could not find places for the provided user ID❗',
      404
    );

    return next(error);
  }

  res.json({ places: places.map(place => place.toObject({ getters: true })) });
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
const updatePlace = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);
    throw new HttpError('Invalid inputs passed, please check your data', 422);
  }

  const { title, description } = req.body;
  const placeId = req.params.pid;

  let place;

  try {
    place = await PlaceModel.findById(placeId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update place❗',
      500
    );

    return next(error);
  }

  place.title = title;
  place.description = description;

  try {
    await place.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update place...❗',
      500
    );

    return next(error);
  }

  res.status(200).json({ place: place.toObject({ getters: true }) });
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
