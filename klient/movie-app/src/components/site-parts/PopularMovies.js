import React, { useState, useEffect } from 'react';
import RenderMoviePopular from '../renderComponents/PopularMovieRender';
import '../stylowanie/PopularMovie.css';

export default function PopularMovies() {
  const [popular, setPopular] = useState([]);
  const [movieDetails, setMovieDetails] = useState({});
  const [selectedTrailer, setSelectedTrailer] = useState(null);
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [movieImages, setMovieImages] = useState([]);

  const getTrending = () => {
    fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=f47b9f8a9c3382dcf52205a038f8a1fd')
      .then((res) => res.json())
      .then((json) => setPopular(json.results))
      .catch((error) => console.error('Error fetching trending movies:', error));
  };

  const getMovieDetails = async (movieId) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=f47b9f8a9c3382dcf52205a038f8a1fd&append_to_response=videos`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const movieDetails = await response.json();
      const videos = movieDetails.videos.results;
      const trailer = videos.find((video) => video.type === 'Trailer');
      const trailerKey = trailer?.key;
      const trailerUrl = trailerKey ? `https://www.youtube.com/watch?v=${trailerKey}` : '';

      const creditsResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=f47b9f8a9c3382dcf52205a038f8a1fd`);
      if (!creditsResponse.ok) {
        throw new Error('Network response was not ok');
      }
      const credits = await creditsResponse.json();
      const directors = credits.crew.filter((person) => person.job === 'Director').map((person) => person.name);
      const actors = credits.cast.map((person) => person.name);

      setMovieDetails((prevDetails) => ({
        ...prevDetails,
        [movieId]: {
          genres: movieDetails.genres.map((el) => el.name).join(', '),
          directors: directors.join(', '),
          actors: actors.join(', '),
          trailerUrl: trailerUrl,
        },
      }));
    } catch (error) {
      console.error('Error fetching movie details:', error);
      setMovieDetails((prevDetails) => ({
        ...prevDetails,
        [movieId]: { genres: 'N/A', directors: 'N/A', actors: 'N/A', trailerUrl: '' },
      }));
    }
  };
  const getMovieImages = async (movieId) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/images?api_key=f47b9f8a9c3382dcf52205a038f8a1fd`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const imagesData = await response.json();
      // console.log('imagesData:', imagesData);
      const backdrops = imagesData?.backdrops?.map((backdrop) => `https://image.tmdb.org/t/p/w500${backdrop.file_path}`) || [];
      // console.log('posters:', backdrops); 
      setMovieImages((prevImages) => ({ ...prevImages, [movieId]: backdrops }));
    } catch (error) {
      console.error('Error fetching movie posters:', error);
      setMovieImages((prevImages) => ({ ...prevImages, [movieId]: [] }));
    }
  };
  const fetchMovieDetails = async () => {
    await Promise.all(popular.map(async (movie) => {
      await getMovieDetails(movie.id);
    }));
  };

  const handleShowTrailer = (movieId) => {
    setSelectedTrailer((prevSelectedTrailer) => (prevSelectedTrailer === movieId ? null : movieId));
  };

  const handleShowGallery = async (movieId) => {
    setSelectedGallery((prevSelectedGallery) => (prevSelectedGallery === movieId ? null : movieId));
    if (!movieImages[movieId]) {
      try {
        await getMovieImages(movieId);
      } catch (error) {
        console.error('Error fetching movie images:', error);
      }
    }
  };

  useEffect(() => {
    getTrending();
  }, []);

  
  useEffect(() => {
    fetchMovieDetails();
  }, [popular]);

  return (
    <div className="trend">
      <h2>Trending Movies</h2>
      <ul>
        {popular.map((movie) => (
          <RenderMoviePopular
          key={movie.id}
          movie={movie}
          movieDetails={movieDetails}
          selectedTrailer={selectedTrailer}
          selectedGallery={selectedGallery}
          movieImages={movieImages}
          handleShowGallery={handleShowGallery}
          handleShowTrailer={handleShowTrailer}
          />
        ))}
      </ul>
    </div>
  );
};