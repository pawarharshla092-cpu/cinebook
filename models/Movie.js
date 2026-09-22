const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true, trim: true },
    genre: { type: String, required: true, trim: true },
    duration: { type: String, required: true },
    rating: { type: Number, required: true, min: 0, max: 10 },
    price: { type: Number, required: true, min: 0 },
    description: { type: String, required: true },
    poster: { type: String, default: '' },
    isNowShowing: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Movie', movieSchema);
