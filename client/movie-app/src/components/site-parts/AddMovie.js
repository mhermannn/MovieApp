import React, { useReducer } from 'react';
import '../stylowanie/AddMovie.css';

const initialState = {
  title: '',
  overview: '',
  original_language: '',
  runtime: '',
  release_date: '',
  tagline: '',
  budget: '',
  director: '',
  actors: [''],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'ADD_ACTOR':
      return { ...state, actors: [...state.actors, ''] };
    case 'REMOVE_ACTOR':
      const updatedActors = [...state.actors];
      updatedActors.splice(action.index, 1);
      return { ...state, actors: updatedActors };
    default:
      return state;
  }
};

const AddMovie = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (name === 'actors') {
      dispatch({ type: 'SET_FIELD', field: name, value: state.actors.map((actor, i) => (i === index ? value : actor)) });
    } else {
      dispatch({ type: 'SET_FIELD', field: name, value });
    }
  };

  const handleAddActor = () => {
    dispatch({ type: 'ADD_ACTOR' });
  };

  const handleRemoveActor = (index) => {
    dispatch({ type: 'REMOVE_ACTOR', index });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/add-movie', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(state),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to add the movie');
      }
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
          <input type="text" name="title" value={state.title} onChange={(e) => handleChange(e)} required />
        </label>
        <br />
        <label>
          Overview:
          <textarea name="overview" value={state.overview} onChange={(e) => handleChange(e)} required />
        </label>
        <br />
        <label>
          Original Language:
          <input type="text" name="original_language" value={state.original_language} onChange={(e) => handleChange(e)} required />
        </label>
        <br />
        <label>
          Runtime:
          <input type="text" name="runtime" value={state.runtime} onChange={(e) => handleChange(e)} required />
        </label>
        <br />
        <label>
          Release Date:
          <input type="date" name="release_date" value={state.release_date} onChange={(e) => handleChange(e)} required />
        </label>
        <br />
        <label>
          Tagline:
          <input type="text" name="tagline" value={state.tagline} onChange={(e) => handleChange(e)} required />
        </label>
        <br />
        <label>
          Budget:
          <input type="text" name="budget" value={state.budget} onChange={(e) => handleChange(e)} required />
        </label>
        <br />
        <label>
          Director:
          <input type="text" name="director" value={state.director} onChange={(e) => handleChange(e)} required />
        </label>
        <br />
        <label>
          Actors:
          {state.actors.map((actor, index) => (
            <div key={index}>
              <input
                type="text"
                name="actors"
                value={actor}
                onChange={(e) => handleChange(e, index)}
                required
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
