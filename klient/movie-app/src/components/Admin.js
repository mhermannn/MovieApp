import React, { useState, useEffect } from 'react';
import AddMovie from './AddMovie';
import EditMovie from './EditMovie';
import RenderMovieAdmin4 from './4ADrender';

const Admin = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovieEdit, setSelectedMovieEdit] = useState(null);
  const [selectedMovieDelete, setSelectedMovieDelete] = useState(null);
  const [showDeleteMessage, setShowDeleteMessage] = useState(false);
  const [moviesUpdated, setMoviesUpdated] = useState(false);
  const [showAddMovie, setShowAddMovie] = useState(false);

  useEffect(() => {
    fetchMovies();
  }, [moviesUpdated]);

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
    setSelectedMovieDelete(null); 
    setShowDeleteMessage(false); 
    setShowAddMovie(false);
  };

  const handleFinishEdit = () => {
    setSelectedMovieEdit(null);
  };

  const handleDeleteMovie = (movie) => {
    setSelectedMovieDelete(movie);
    setShowDeleteMessage(true);
    console.log(`Deleting movie with ID: ${movie.idd}`);
    // Send DELETE request to the server
    fetch(`http://localhost:4000/delete-movie/${movie.idd}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        console.log(`Server response: ${data.message}`);
        // Update the movies list in the state immediately
        setMoviesUpdated(prevMovies => prevMovies.filter(m => m.idd !== movie.idd));
        // Hide the delete message
        setShowDeleteMessage(false);
      })
      .catch(error => console.error('Error deleting movie:', error));
  };
  const handleToggleAddMovie = () => {
    setShowAddMovie((prevShowAddMovie) => !prevShowAddMovie);
  };
  const handleFormSubmit = (formData) => {
    // Perform actions like sending the formData to the server
    console.log('sending from admin to edit', formData);
  };

  const handleGoBack = () => {
    setSelectedMovieEdit(null);
    setSelectedMovieDelete(null);
    setShowDeleteMessage(false);
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
                <button onClick={() => handleEditMovie(movie)}>Edit</button>
                <button onClick={() => handleDeleteMovie(movie)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
      <h3>Comments</h3>
    </div>
  );
  
};

export default Admin;
