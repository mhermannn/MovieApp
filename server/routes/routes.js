const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const newMovieController = require('../controllers/newMovieController');
//search part
router.get('/movies/searchPaged/:pattern', newMovieController.MovieSearchPaged);
router.get('/genres/searchPaged/:pattern', newMovieController.GenSearchPaged);
router.get('/movies/countPaged/:pattern', newMovieController.MovieCountPaged);
router.get('/genres/countPaged/:pattern', newMovieController.GenCountPaged);

//comments
router.post('/movie-comment', movieController.CommentPost); //
router.get('/movie-comment/:id', movieController.CommentGet); //
router.patch('/movie-comment/:id', movieController.ChangeComment);//
//ratings
router.post('/movie-rating/:id', movieController.PostMovieRating);//
router.get('/movie-rating-amount/:id', movieController.GetMovieRatingCount);//
router.get('/movie-rating-avg/:id', movieController.GetMovieRatingAvg);//

//add movie part
router.post('/add-movie', movieController.addMovie); //

//admin part
router.get('/get-Mine', movieController.GetMine); //
router.delete('/delete-movie/:id', movieController.DeleteMovie); //
router.delete('/delete-comment/:id', movieController.DeleteComment);//
router.patch('/patch-movie/:id', movieController.ChangeMovie);//

//render part
router.get('/actors/:id', movieController.GetActors);//
router.get('/genres/:id', movieController.GetGenres);//
router.get('/director/:id', movieController.GetDirector);//
router.get('/movie/:id', movieController.MovieGet);//
module.exports = router; 

// router.get('/movie-search/:pattern', movieController.MovieSearch);//
// router.get('/movie-search/:pattern/new', movieController.MovieSearchNew);//
// router.get('/movie-search/:pattern/old', movieController.MovieSearchOld);//
// router.get('/genre-search/:pattern', movieController.GenSearch);//
// router.get('/genre-search/:pattern/new', movieController.GenSearchNew);//
// router.get('/genre-search/:pattern/old', movieController.GenSearchOld);//