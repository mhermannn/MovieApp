import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import RatingStars from 'react-rating-stars-component';
import '../stylowanie/Render.css';
 
export default function SearchRenderMovie({
  movie,
  selectedTrailer,
  selectedGallery,
  handleShowGallery,
  handleShowTrailer,
}) {
  const [userRating, setUserRating] = useState(0);
  const [actors, setActors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [director, setDirector] = useState([]);
  const [loading, setLoading] = useState(true);
  const [votavg, setVotavg] = useState(0);
  const [votcount, setVotcount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [actorsData, directorData, genresData] = await Promise.all([
          fetchActors(getMovieId(movie)),
          fetchDirector(getMovieId(movie)),
          fetchGenres(getMovieId(movie)),
          getMovieRatings(movie)
        ]);
        setActors(actorsData);
        setDirector(directorData);
        setGenres(genresData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [movie]);

  const getMovieId = (movie) => {
    return movie.id.low !== 0 ? movie.id.low : movie.id.high;
  };

  const formatUrl = (movie) => {
    // console.log(movie.trailers)
    return `https://www.youtube.com/watch?v=${movie.trailers}`
  };
  

  const fetchActors = async (CorrectId) => {
    const response = await fetch(`/actors/${CorrectId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch actors');
    }
    const data = await response.json();
    // console.log("Actors data:", data); // Log the response data
    return data || [];
  };

  const fetchGenres = async (CorrectId) => {
    const response = await fetch(`/genres/${CorrectId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch genres');
    }
    const data = await response.json();
    return data || [];
  };

  const fetchDirector = async (CorrectId) => {
    const response = await fetch(`/director/${CorrectId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch director');
    }
    const data = await response.json();
    return data || [];
  };

  const getMovieRatings = async (movie) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${getMovieId(movie)}?api_key=f47b9f8a9c3382dcf52205a038f8a1fd&append_to_response=videos`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const movieDetails = await response.json();
      const { vote_average, vote_count } = movieDetails;
      setVotavg(vote_average);
      setVotcount(vote_count);
    } catch (error) {
      console.error('Error fetching movie ratings:', error);
    }
  };
  

  const handleRateMovie = async (rating) => {
    try {
      const Key = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNDdiOWY4YTljMzM4MmRjZjUyMjA1YTAzOGY4YTFmZCIsInN1YiI6IjY1OTZlMWZjZWQ5NmJjMDIxNmY3NWMwZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.787RWQjWc8Tnp3jWSuRt1u5lw5MZbF43E0AAvYPRl_k';
      const response = await fetch(`https://api.themoviedb.org/3/movie/${getMovieId(movie)}/rating`, {
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
        // getMovieRatings(movie);
      } else {
        console.error(`Failed to rate movie ${getMovieId(movie)}`);
      }
    } catch (error) {
      console.error('Error rating movie:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <li key={movie.id}>
      <div className="nazwa">{movie.title}</div>
      <div className='odnosnik'>
        <a className="odnosnik_link" href={`https://www.themoviedb.org/movie/${getMovieId(movie)}`} target="_blank" rel="noopener noreferrer">
          Odnośnik do moviedb 
        </a>
      </div>
      <div className="multimedia">
        <div className="zdjecie">
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}?api_key=f47b9f8a9c3382dcf52205a038f8a1fd`} alt="Movie Poster" />
        </div>
      <div className="bok">
        <div className="dane">
          {/* Director */}
          {director.length > 0 ? (
            <>
              {director.length > 1 ? (
                <div> <strong>Reżyserzy:</strong> {director.map(dir => dir.name).join(', ')}</div>
              ) : (
                <div><strong>Reżyser:</strong> {director[0].name}</div>
              )}
            </>
          ) : (
            <div>Brak informacji o reżyserze</div>
          )}
          {/* Actors */}
          {actors.length > 0 ? (
            <>
              {actors.length > 1 ? (
                <div><strong>Aktorzy:</strong> {actors.map(actor => actor.name).join(', ')}</div>
              ) : (
                <div><strong>Aktor:</strong> {actors[0].name}</div>
              )}
            </>
          ) : (
            <div>Brak informacji o aktorach</div>
          )}
          {/* Genres */}
          {genres.length > 0 ? (
            <>
              {genres.length > 1 ? (
                <div><strong>Gatunki:</strong> {genres.map(genre => genre.name).join(', ')}</div>
              ) : (
                <div><strong>Gatunek:</strong> {genres[0].name}</div>
              )}
            </>
          ) : (
            <div>Brak informacji o gatunkach</div>
          )}
          <div><strong>Średnia ocena filmu:</strong> {votavg}</div>
          <div><strong>Ilość ocen:</strong> {votcount}</div>
          <div><strong>Data wydania:</strong> {movie.release_date}</div>
        </div>
      </div>
      </div>
      <div className='next'>
      <div className="rating-section">
        <h4>Oceń Film:</h4>
        <RatingStars
          count={5}
          onChange={(newValue) => handleRateMovie( newValue)}
          size={24}
          activeColor="#f39c12"
          value={userRating}
        />
      </div>
      <div className="guziki">
        <button className="galeria" onClick={() => handleShowGallery(getMovieId(movie))}>
          {selectedGallery ===getMovieId(movie) ? 'Schowaj galerie' : 'Pokaż galerię'}
        </button>
        <button className="zwiastun" onClick={() => handleShowTrailer(getMovieId(movie))}>
          {selectedTrailer === getMovieId(movie) ? 'Schowaj zwiastun' : 'Pokaż zwiastun'}
        </button>
      </div>
      </div>
      
      <div className="dane">{movie.overview}</div>
      {selectedTrailer === getMovieId(movie) && (
        <div className='trailer-video'>
          <ReactPlayer url={formatUrl(movie)} controls width="300px" height="auto"/>
        </div>
      )}
      {selectedGallery === getMovieId(movie) && (
        <div className="galeria-section">
          {(movie.images).map((image, index) => (
            <img key={index} src={`https://image.tmdb.org/t/p/w500/${image}`} alt={`Movie Still ${index + 1}`} />
          ))}
        </div>
      )}
    </li>
  );
}