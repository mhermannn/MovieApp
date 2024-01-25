import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import RatingStars from 'react-rating-stars-component';
import '../stylowanie/Render.css';

export default function SearchRenderMovie({
  movie,
  selectedTrailer,
  selectedGallery,
  movieImages,
  handleShowGallery,
  handleShowTrailer,
  handleRateMovie,
}) {
const [userRating, setUserRating] = useState(0);
const [actors, setActors] = useState([]);
const [genres, setGenres] = useState([]);
const [director, setDirector] = useState([]);

const CorrectId = movie.isMine ? movie.idd : movie.id;



useEffect(() => {
    fetchActors(CorrectId);
    fetchDirector(CorrectId);
    fetchGenres(CorrectId);
  }, [CorrectId]);

const fetchActors = async (CorrectId) => {
    try {
      const response = await fetch(`/actors/${CorrectId}`);
      const data = await response.json();
      setActors(data.actors);
    } catch (error) {
      console.error('Error fetching actors:', error);
    }
  };

  const fetchGenres = async (CorrectId) => {
    try {
      const response = await fetch(`/genres/${CorrectId}`);
      const data = await response.json();
      setGenres(data.genres);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  const fetchDirector = async (CorrectId) => {
    try {
      const response = await fetch(`/director/${CorrectId}`);
      const data = await response.json();
      setDirector(data.genres);
    } catch (error) {
      console.error('Error fetching director:', error);
    }
  };
return (
    <li key={CorrectId}>
      <div className="nazwa">{movie.title}</div>
      <div className='odnosnik'>
        <a className="odnosnik_link" href={`https://www.themoviedb.org/movie/${movie.id}`} target="_blank" rel="noopener noreferrer">
          Odnośnik do moviedb
        </a>
      </div>
      <div className="multimedia">
        <div className="zdjecie">
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}?api_key=f47b9f8a9c3382dcf52205a038f8a1fd`} alt="Movie Poster" />
        </div>
        <div className="bok">
          <div className="dane">
            {director.length > 1 ? (
              <div>Reżyserzy: {director.join(', ')}</div>
            ) : (
              <div>Reżyser: {director[0]}</div>
            )}
            {actors.length > 1 ? (
              <div>Aktorzy: {actors.slice(0, 5).join(', ')}</div>
            ) : (
              <div>Aktor: {actors[0]}</div>
            )}
            <div>Średnia ocena filmu: {movie.vote_average}</div>
            <div>Ilość ocen: {movie.vote_count}</div>
            <div>Data wydania: {movie.release_date}</div>
            {genres.length > 1 ? (
              <div>Gatunki: {genres.join(', ')}</div>
            ) : (
              <div>Gatunek: {genres[0]}</div>
            )}
          </div>
        </div>
      </div>
      <div className="rating-section">
        <h4>Oceń Film:</h4>
        <RatingStars
          count={5}
          onChange={(newValue) => handleRateMovie(movie.id, newValue)}
          size={24}
          value={userRating}
        />
      </div>
      <div className="guziki">
        <button className="galeria" onClick={() => handleShowGallery(movie.id)}>
          {selectedGallery === movie.id ? 'Schowaj galerie' : 'Pokaż galerię'}
        </button>
        <button className="zwiastun" onClick={() => handleShowTrailer(movie.id)}>
          {selectedTrailer === movie.id ? 'Schowaj zwiastun' : 'Pokaż zwiastun'}
        </button>
      </div>
      <div className="dane">{movie.overview}</div>
      {selectedTrailer === movie.id && (
        <div className='trailer-video'>
          <ReactPlayer url={movie.trailerUrl} controls width="300px" height="auto"/>
        </div>
      )}
      {selectedGallery === movie.id && movieImages[movie.id] && (
        <div className="galeria-section">
          {movieImages[movie.id].map((image, index) => (
            <img key={index} src={image} alt={`Movie Still ${index + 1}`} />
          ))}
        </div>
      )}
    </li>
  );
}
