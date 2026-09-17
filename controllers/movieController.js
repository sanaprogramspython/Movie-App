const mongoose = require('mongoose');
const Movie = require('../models/Movie');

function getErrorMessage(error) {
  if (error.name === 'ValidationError') {
    return Object.values(error.errors).map((item) => item.message).join('. ');
  }
  return 'Something went wrong. Please try again.';
}

function getMovieData(body) {
  return {
    title: body.title,
    year: body.year,
    genre: body.genre,
    rating: body.rating || null,
    description: body.description,
    posterUrl: body.posterUrl
  };
}

async function getAllMovies(req, res) {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    res.render('index', { title: 'Movie Library', movies });
  } catch (error) {
    console.error(error);
    res.status(500).render('index', {
      title: 'Movie Library',
      movies: [],
      error: 'Unable to load movies right now.'
    });
  }
}

async function getMovieTable(req, res) {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    res.render('movieTable', { title: 'Movie Data', movies });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', {
      title: 'Error',
      message: 'Unable to load the movie data table.'
    });
  }
}

async function getMovieById(req, res) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).render('error', { title: 'Movie Not Found', message: 'That movie could not be found.' });
    }
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).render('error', { title: 'Movie Not Found', message: 'That movie could not be found.' });
    }
    res.render('movieDetail', { title: movie.title, movie });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { title: 'Error', message: 'Unable to load that movie.' });
  }
}

function showCreateForm(req, res) {
  res.render('movieForm', { title: 'Add Movie', movie: {}, isEditing: false });
}

async function createMovie(req, res) {
  try {
    await Movie.create(getMovieData(req.body));
    res.redirect('/movies?message=Movie added successfully');
  } catch (error) {
    console.error(error);
    res.status(400).render('movieForm', {
      title: 'Add Movie',
      movie: req.body,
      isEditing: false,
      error: getErrorMessage(error)
    });
  }
}

async function showEditForm(req, res) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).render('error', { title: 'Movie Not Found', message: 'That movie could not be found.' });
    }
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).render('error', { title: 'Movie Not Found', message: 'That movie could not be found.' });
    }
    res.render('movieForm', { title: `Edit ${movie.title}`, movie, isEditing: true });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { title: 'Error', message: 'Unable to load the edit form.' });
  }
}

async function updateMovie(req, res) {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, getMovieData(req.body), {
      new: true,
      runValidators: true
    });
    if (!movie) {
      return res.status(404).render('error', { title: 'Movie Not Found', message: 'That movie could not be found.' });
    }
    res.redirect(`/movies/${movie._id}?message=Movie updated successfully`);
  } catch (error) {
    console.error(error);
    res.status(400).render('movieForm', {
      title: 'Edit Movie',
      movie: { ...req.body, _id: req.params.id },
      isEditing: true,
      error: getErrorMessage(error)
    });
  }
}

async function deleteMovie(req, res) {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      return res.status(404).render('error', { title: 'Movie Not Found', message: 'That movie could not be found.' });
    }
    res.redirect('/movies?message=Movie deleted successfully');
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { title: 'Error', message: 'Unable to delete that movie.' });
  }
}

module.exports = {
  getAllMovies,
  getMovieTable,
  getMovieById,
  showCreateForm,
  createMovie,
  showEditForm,
  updateMovie,
  deleteMovie
};
