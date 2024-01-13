import React, { useState, useEffect } from 'react';
import RenderMovie from './renderMovie';
import '../stylowanie/Search.css';

export default function SearchMovie() {
  const [searchText, setSearchText] = useState('');
  const [showSearch, setShowSearch] = useState([]);
  const [movieDetails, setMovieDetails] = useState({});
  const [selectedTrailer, setSelectedTrailer] = useState(null);
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [movieImages, setMovieImages] = useState([]);

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
      const backdrops = imagesData?.backdrops?.map((backdrop) => `https://image.tmdb.org/t/p/w500${backdrop.file_path}`) || [];
      setMovieImages((prevImages) => ({ ...prevImages, [movieId]: backdrops }));
    } catch (error) {
      console.error('Error fetching movie posters:', error);
      setMovieImages((prevImages) => ({ ...prevImages, [movieId]: [] }));
    }
  };

  const fetchMovieDetails = async () => {
    await Promise.all(showSearch.map(async (movie) => {
      await getMovieDetails(movie.id);
    }));
  };

  const searchHandler = async (searchText) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=f47b9f8a9c3382dcf52205a038f8a1fd&query=${searchText}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const searchData = await response.json();
      setShowSearch(searchData.results);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
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

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    if (showSearch.length > 0) {
      fetchMovieDetails();
    }
  }, [showSearch]);

  useEffect(() => {
    searchHandler(searchText);
  }, [searchText]);

  return (
    <div className="search">
      <div className="szukamy">
        <input
          type="text"
          placeholder="Wpisz tytuł filmu"
          value={searchText}
          onChange={handleInputChange}
        />
        <form action="typeSearch">
          <div>
            <select name="lista">
              <option value="default">default</option>
              <option value="gatunek">gatunek</option>
              <option value="rezyser">reżyser</option>
              <option value="aktor">aktor</option>
            </select>
          </div>
      </form>
      </div>
      <div className="znajdujemy">
        <ul>
          {showSearch.map((movie) => (
            <RenderMovie
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
    </div>
  );
}
