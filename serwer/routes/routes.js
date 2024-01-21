const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

router.get('/movies-and-genres', movieController.getAllMoviesAndGenres);
router.get('/movie-details/:movieId', movieController.getMovieDetails);

//search part
router.get('/movie-search/:pattern', movieController.MovieSearch)
router.get('/movie-search/new/:pattern', movieController.MovieSearchNew)
router.get('/movie-search/old/:pattern', movieController.MovieSearchOld)
router.get('/genre-search/:pattern', movieController.GenSearch)
router.get('/genre-search/new/:pattern', movieController.GenSearchNew)
router.get('/genre-search/old/:pattern', movieController.GenSearchOld)

//comments
router.post('/movie-comment/id', movieController.CommentPost)

//ratings
router.post('/movie-rating/:id', movieController.MovieRating)
router.post('/tmdb-rating/:id', movieController.TMDBrating)

//add movie part
router.post('/add-movie', movieController.addMovie);

//admin part
router.delete('/delete-movie/:id', movieController.DeleteMovie)
router.delete('/delete-comment/:id', movieController.DeleteComment)
router.patch('/patch-movie/:id', movieController.ChangeMovie)
router.post('/add-movie', movieController.addMovie)

module.exports = router;