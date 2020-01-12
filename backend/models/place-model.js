const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const placeSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  address: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  creator: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const PlaceModel = mongoose.model('Place', placeSchema);

module.exports = PlaceModel;