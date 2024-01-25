import React, { useState, useEffect } from 'react';
import AddMovie from './AddMovie';
import EditMovie from './EditMovie';
import RenderMovieAdmin4 from './4ADrender';

const Admin = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovieEdit, setSelectedMovieEdit] = useState(null);
  const [moviesUpdated, setMoviesUpdated] = useState(false);
  const [showAddMovie, setShowAddMovie] = useState(false);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch(`http://localhost:4000/get-Mine`);
      const data = await response.json();
      console.log(data);
      setMovies(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching movies:', error);
      setMovies([]);
    }
  };

  const handleEditMovie = (movie) => {
    setSelectedMovieEdit(movie);
    setShowAddMovie(false);
  };

  const handleDeleteMovie = async (movie) => {
    try {
      console.log(`Deleting movie with ID: ${movie.idd}`);
      const response = await fetch(`http://localhost:4000/delete-movie/${movie.idd}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
  
      console.log(`Server response: ${data.message}`);
      console.log('Before setMovies');
      setMovies((prevmovies) => prevmovies.filter((m) => m.idd !== movie.idd));
      console.log('After setMovies');
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };
  
  
  
  const handleToggleAddMovie = () => {
    setShowAddMovie((prevShowAddMovie) => !prevShowAddMovie);
  };
  const handleFormSubmit = (formData) => {
    console.log('sending from admin to edit', formData);
    fetchMovies();
  };

  const handleGoBack = () => {
    setSelectedMovieEdit(null);
    setShowAddMovie(false);
  };

  return (
    <div>
      <h2>Admin Component</h2>
      <h3>Movies</h3>
      <button onClick={handleToggleAddMovie}>
        {showAddMovie ? 'Hide Add Movie' : 'Show Add Movie'}
      </button>
      {showAddMovie && <AddMovie />}
      <ul>
        {movies.map((movie) => (
          <li key={movie.idd}>
            <RenderMovieAdmin4 movie={movie} />
            {selectedMovieEdit === movie ? (
              <div>
                <EditMovie onSubmit={handleFormSubmit} initialData={movie} />
                <button onClick={handleGoBack}>Go Back</button>
              </div>
            ) : (
              <>
                <button onClick={() => handleEditMovie(movie)}>Edit Movie Data</button>
                <button onClick={() => handleDeleteMovie(movie)}>Delete Movie from database</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
  
};

export default Admin;
