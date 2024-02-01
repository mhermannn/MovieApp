import React, { useState } from 'react';
import '../stylowanie/AddMovie.css'

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
      const updatedActors = [...movieData.actors];
      updatedActors[index] = value;
      
      setMovieData({
        ...movieData,
        actors: updatedActors
      });
    } else {
      setMovieData({
        ...movieData,
        [name]: value
      });
  };
}
  const handleAddActor = () => {
    setMovieData({
      ...movieData,
      actors: [...movieData.actors, '']
    });
  };
  const handleRemoveActor = (index) => {
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
      // console.log('im in handlesubmit');
    } catch (error) {
      console.error('Error adding movie:', error.message);
    }
  };
  

  return (
    <div className='addmovie'>
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
