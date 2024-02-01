import React, { useState } from 'react';
import SearchRenderMovie from '../renderComponents/SearchedMovieRender'; 
import RenderMovie4 from '../renderComponents/MyMovieRender';
import '../stylowanie/SearchBar.css'
 
const SearchMovie = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedList1, setSelectedList1] = useState('default');
  const [selectedList2, setSelectedList2] = useState('nosort');
  const [showSearch, setShowSearch] = useState([]);
  const [selectedTrailer, setSelectedTrailer] = useState(null);
  const [selectedGallery, setSelectedGallery] = useState(null);

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };
  const handleShowTrailer = (movieId) => {
    setSelectedTrailer((prevSelectedTrailer) => (prevSelectedTrailer === movieId ? null : movieId));
  };

  const handleShowGallery = async (movieId) => {
    setSelectedGallery((prevSelectedGallery) => (prevSelectedGallery === movieId ? null : movieId));
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      let apiUrl = `/movie-search/${searchText}`;

      if (selectedList1 === 'gatunek') {
        apiUrl = `/genre-search/${searchText}`;
      }
      if (selectedList2 === 'yearnew') {
        apiUrl += '/new';
      } else if (selectedList2 === 'yearold') {
        apiUrl += '/old';
      }

      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const searchData = await response.json();
      setShowSearch(searchData);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div className="search">
      <div className="szukamy">
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="What are you looking for?"
            value={searchText}
            onChange={handleInputChange}
          />
          <div>
            <select name="lista1" value={selectedList1} onChange={(e) => setSelectedList1(e.target.value)}>
              <option value="default">słowo kluczowe</option>
              <option value="gatunek">gatunek</option>
            </select>
            <select name="lista2" value={selectedList2} onChange={(e) => setSelectedList2(e.target.value)}>
              <option value="nosort">brak sortowania</option>
              <option value="yearnew">rok (od najnowszego)</option>
              <option value="yearold">rok (od najstarszego)</option>
            </select>
            <button type="submit">Search</button>
          </div>
        </form>
      </div>
      <div className="znajdujemy">
        <ul>
        {showSearch?.map((movie) =>
          movie.isMine ? (
            <RenderMovie4 key={movie.id} movie={movie} />
          ) : (
            <SearchRenderMovie
              key={movie.id}
              movie={movie}
              selectedTrailer={selectedTrailer}
              selectedGallery={selectedGallery}
              handleShowGallery={handleShowGallery}
              handleShowTrailer={handleShowTrailer}
            />
          )
        )}
        </ul>
      </div>
    </div>
  );
};

export default SearchMovie;
