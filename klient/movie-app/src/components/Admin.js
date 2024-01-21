import React, { useState, useEffect } from 'react';
import AddMovie from './AddMovie';

const Admin = () => {
  const [movies, setMovies] = useState([]);
  const [comments, setComments] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    // Fetch movies and comments from the server when the component mounts
    fetchMovies();
    fetchComments();
  }, []);

  const fetchMovies = async () => {
    // Fetch movies from the server and update the state
    try {
      const response = await fetch('/api/movies'); // Adjust the API endpoint
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const fetchComments = async () => {
    // Fetch comments from the server and update the state
    try {
      const response = await fetch('/api/comments'); // Adjust the API endpoint
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleDeleteMovie = async (movieId) => {
    // Delete a movie from the server and update the state
    try {
      await fetch(`/api/movies/${movieId}`, {
        method: 'DELETE',
      });
      setMovies(movies.filter((movie) => movie.id !== movieId));
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  const handleEditMovie = (movie) => {
    // Set the selected movie for editing
    setSelectedMovie(movie);
  };

  const handleDeleteComment = async (commentId) => {
    // Delete a comment from the server and update the state
    try {
      await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE',
      });
      setComments(comments.filter((comment) => comment.id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <div>
      <h2>Admin Component</h2>

      <h3>Movies</h3>
      <h4>Add Movie</h4>
      <AddMovie/>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            {movie.title}
            <button onClick={() => handleEditMovie(movie)}>Edit</button>
            <button onClick={() => handleDeleteMovie(movie.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {selectedMovie && (
        <div>
          <h3>Edit Movie</h3>
          {/* Add a form for editing the selected movie */}
          {/* You can use the same form for adding a new movie */}
        </div>
      )}

      <h3>Comments</h3>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            {comment.text}
            <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
