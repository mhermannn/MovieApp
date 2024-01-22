// AddMovie.js
import React, { useState } from 'react';

const AddMovie = () => {
  const [movieData, setMovieData] = useState({
    title: '',
    overview: '',
    original_language: '',
    runtime: '',
    release_date: '',
    tagline: '',
    budget: '',
    director: '',
    actors: ['']
  });

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (name === 'actors') {
      // Update the actors array based on the index
      const updatedActors = [...movieData.actors];
      updatedActors[index] = value;
      
      setMovieData({
        ...movieData,
        actors: updatedActors
      });
    } else {
      // Update other input fields
      setMovieData({
        ...movieData,
        [name]: value
      });
  };
}
  const handleAddActor = () => {
    // Add a new empty string to the actors array
    setMovieData({
      ...movieData,
      actors: [...movieData.actors, '']
    });
  };
  const handleRemoveActor = (index) => {
    // Remove an actor from the array based on the index
    const updatedActors = [...movieData.actors];
    updatedActors.splice(index, 1);
    
    setMovieData({
      ...movieData,
      actors: updatedActors
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/add-movie', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(movieData),
        credentials: 'include',
      });
  
      if (!response.ok) {
        throw new Error('Failed to add the movie');
      }
  
      // Handle success, maybe redirect or update state as needed
      console.log('im in handlesubmit');
    } catch (error) {
      console.error('Error adding movie:', error.message);
      // Handle error, display an error message or update state as needed
    }
  };
  

  return (
    <div>
      <h2>Add Movie</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" name="title" value={movieData.title} onChange={handleChange} />
        </label>
        <br />
        <label>
          Overview:
          <textarea name="overview" value={movieData.overview} onChange={handleChange} />
        </label>
        <br />
        <label>
          Original Language:
          <input type="text" name="original_language" value={movieData.original_language} onChange={handleChange} />
        </label>
        <br />
        <label>
          Runtime:
          <input type="text" name="runtime" value={movieData.runtime} onChange={handleChange} />
        </label>
        <br />
        <label>
          Release Date:
          <input type="date" name="release_date" value={movieData.release_date} onChange={handleChange} />
        </label>
        <br />
        <label>
          Tagline:
          <input type="text" name="tagline" value={movieData.tagline} onChange={handleChange} />
        </label>
        <br />
        <label>
          Budget:
          <input type="text" name="budget" value={movieData.budget} onChange={handleChange} />
        </label>
        <label>
          Director:
          <input type="text" name="director" value={movieData.director} onChange={(e) => handleChange(e)} />
        </label>
        <br />
        <label>
          Actors:
          {movieData.actors.map((actor, index) => (
            <div key={index}>
              <input
                type="text"
                name="actors"
                value={actor}
                onChange={(e) => handleChange(e, index)}
              />
              {index > 0 && (
                <button type="button" onClick={() => handleRemoveActor(index)}>
                  Remove Actor
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={handleAddActor}>
            Add Actor
          </button>
        </label>

        <br />
        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
};


export default AddMovie;
