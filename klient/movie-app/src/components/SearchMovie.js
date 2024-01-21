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
      const response = await fetch(`/movie-details/${movieId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const movieDetails = await response.json();
      setMovieDetails((prevDetails) => ({
        ...prevDetails,
        [movieId]: movieDetails,
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
      const response = await fetch(`/movie-images/${movieId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const imagesData = await response.json();
      setMovieImages((prevImages) => ({ ...prevImages, [movieId]: imagesData }));
    } catch (error) {
      console.error('Error fetching movie images:', error);
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
      const response = await fetch(`/search-movie?query=${searchText}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const searchData = await response.json();
      setShowSearch(searchData);
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
              <option value="default">słowo kluczowe</option>
              <option value="gatunek">gatunek</option>
            </select>
            <select name="lista">
            <option value="nosort">brak sortowania</option>
              <option value="yearnew">rok (od najnowszego)</option>
              <option value="yearold">rok (od najstarszego)</option>
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
