const express = require('express');
const movieController = require('../controllers/movieController');

const router = express.Router();

router.get('/', movieController.getAllMovies);
router.get('/new', movieController.showCreateForm);
router.get('/table', movieController.getMovieTable);
router.post('/', movieController.createMovie);
router.get('/:id/edit', movieController.showEditForm);
router.post('/:id', movieController.updateMovie);
router.post('/:id/delete', movieController.deleteMovie);
router.get('/:id', movieController.getMovieById);

module.exports = router;
