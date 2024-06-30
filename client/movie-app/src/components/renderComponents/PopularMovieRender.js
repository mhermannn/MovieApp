import React, { useState} from 'react';
import ReactPlayer from 'react-player';
import RatingStars from 'react-rating-stars-component';
import '../stylowanie/Render.css';
export default function RenderMoviePopular({movie, movieDetails, selectedTrailer, selectedGallery, movieImages, handleShowGallery, handleShowTrailer,}) {
  const [userRating, setUserRating] = useState(0);
  const handleRateMovie = async (rating) => {
    try {
      const Key = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNDdiOWY4YTljMzM4MmRjZjUyMjA1YTAzOGY4YTFmZCIsInN1YiI6IjY1OTZlMWZjZWQ5NmJjMDIxNmY3NWMwZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.787RWQjWc8Tnp3jWSuRt1u5lw5MZbF43E0AAvYPRl_k';
      const response = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/rating`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Key}`,
        },
        body: JSON.stringify({
          value: rating,
        }),
      });
  
      if (response.ok) {
        console.log(`Successfully rated movie ${movie.title} with ${rating} stars`);
        setUserRating(rating);
      } else {
        console.error(`Failed to rate movie ${movie.id}`);
      }
    } catch (error) {
      console.error('Error rating movie:', error);
    }
  };
  
  return (
      <li key={movie.id}>
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
            <div><strong>Reżyser:</strong> {movieDetails[movie.id]?.directors}</div> 
            <div><strong>Aktorzy:</strong> {movieDetails[movie.id]?.actors.split(', ').slice(0, 5).join(', ')}</div>
            <div><strong>Średnia ocena filmu:</strong> {movie.vote_average}</div>
            <div><strong>Ilość ocen:</strong> {movie.vote_count}</div>
            <div><strong>Data wydania:</strong> {movie.release_date}</div>
            <div><strong>Gatunki:</strong> {movieDetails[movie.id]?.genres}</div>
          </div>
        </div>
      </div>
      <div className='next'>
      <div className="rating-section">
        <h4>Oceń Film:</h4>
        <RatingStars
          count={5}
          onChange={(newValue) => handleRateMovie(newValue)}
          size={24}
          value={userRating}
          activeColor="#f39c12"
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
      </div>
      
      <div className="dane">{movie.overview}</div>
      {selectedTrailer === movie.id && (
        <div className='trailer-video'>
          <ReactPlayer url={movieDetails[movie.id]?.trailerUrl} controls width="300px" height="auto"/>
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
