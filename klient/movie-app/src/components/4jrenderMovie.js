import React, { useState} from 'react';
import ReactPlayer from 'react-player';
import RatingStars from 'react-rating-stars-component';
import '../stylowanie/Render.css';
export default function RenderMovie({
  movie,
  // comments, 
  // setComments,
  movieDetails,
  selectedTrailer,
  selectedGallery,
  movieImages,
  handleShowGallery,
  handleShowTrailer,
})
 {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [userRating, setUserRating] = useState(0);
  const handleRateMovie = (rating) => {
    setUserRating(rating);
  };
  const handleAddComment = () => {
    setComments([...comments, { text: newComment, rating: userRating }]);
    setNewComment('');
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
            <div>Reżyser: {movieDetails[movie.id]?.directors}</div>
            <div>Aktorzy: {movieDetails[movie.id]?.actors.split(', ').slice(0, 5).join(', ')}</div>
            <div>Średnia ocena filmu: {movie.vote_average}</div>
            <div>Ilość ocen: {movie.vote_count}</div>
            <div>Data wydania: {movie.release_date}</div>
            <div>Gatunki: {movieDetails[movie.id]?.genres}</div>
          </div>
        </div>
      </div>
      <div className="rating-section">
        <h4>Oceń Film:</h4>
        <RatingStars
          count={5}
          onChange={handleRateMovie}
          size={24}
          value={userRating}
        />
      </div>
      <div className="comments-section">
        <h4>Komentarze:</h4>
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
        <div>
          <input
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button onClick={handleAddComment}>Dodaj Komentarz</button>
        </div>
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