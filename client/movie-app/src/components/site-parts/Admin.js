import React, { useState, useEffect, useMemo } from 'react';
import AddMovie from './AddMovie';
import EditMovie from './EditMovie';
import RenderMovieAdmin4 from '../renderComponents/AdminMovieRender';
import '../stylowanie/Admin.css';

const Admin = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovieEdit, setSelectedMovieEdit] = useState(null);
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
      setMovies((prevMovies) => prevMovies.filter((m) => m.idd !== movie.idd));
      console.log('After setMovies');
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  const handleToggleAddMovie = () => {
    setShowAddMovie((prevShowAddMovie) => !prevShowAddMovie);
  };

  const handleFormSubmit = async (formData) => {
    try {
      console.log('sending from admin to edit', formData);
      setShowAddMovie(false);
      fetchMovies();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleGoBack = () => {
    setSelectedMovieEdit(null);
    setShowAddMovie(false);
  };

  const handleUpdateMovie = async (formData, movieId) => {
    try {
      console.log('sending from admin to edit', formData);
      setShowAddMovie(false);
      const response = await fetch(`http://localhost:4000/patch-movie/${movieId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        console.log('Movie updated successfully');
        fetchMovies();
      } else {
        console.error('Failed to update movie');
      }
    } catch (error) {
      console.error('Error updating movie:', error);
    }
  };
  

  const renderedMovies = useMemo(() => {
    return movies.map((movie) => (
      <li key={movie.idd}>
        <RenderMovieAdmin4 movie={movie} />
        {selectedMovieEdit === movie ? (
          <div>
            <EditMovie onSubmit={handleFormSubmit} initialData={movie} handleUpdateMovie={(formData) => handleUpdateMovie(formData, movie.idd)} />
            <button onClick={handleGoBack}>Go Back</button>
          </div>
        ) : (
          <div className='g'>
            <button onClick={() => handleDeleteMovie(movie)}>Delete Movie</button>
            <button onClick={() => handleEditMovie(movie)}>Edit Movie Data</button>
          </div>
        )}
      </li>
    ));
  }, [movies, selectedMovieEdit]);

  return (
    <div className='admin'>
      <h2>Admin Component</h2>
      <h3>Movies</h3>
      <div className='add-movie'>
        <button onClick={handleToggleAddMovie}>{showAddMovie ? 'Hide Add Movie' : 'Show Add Movie'}</button>
        {showAddMovie && <AddMovie onSubmit={handleFormSubmit} />}
      </div>

      <ul>{renderedMovies}</ul>
    </div>
  );
};

export default Admin;
