const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  year: {
    type: Number,
    required: [true, 'Year is required'],
    min: [1888, 'Year must be 1888 or later'],
    max: [new Date().getFullYear() + 10, 'Year is too far in the future']
  },
  genre: {
    type: String,
    required: [true, 'Genre is required'],
    trim: true
  },
  rating: {
    type: Number,
    min: [0, 'Rating cannot be below 0'],
    max: [10, 'Rating cannot exceed 10']
  },
  description: {
    type: String,
    trim: true
  },
  posterUrl: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Movie', movieSchema);
