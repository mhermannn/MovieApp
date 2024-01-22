import React, { useState, useEffect } from 'react';

const EditMovie = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    title: '',
    overview: '',
    original_language: '',
    runtime: '',
    release_date: '',
    tagline: '',
    budget: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        overview: initialData.overview || '',
        original_language: initialData.original_language || '',
        runtime: initialData.runtime || '',
        release_date: initialData.release_date || '',
        tagline: initialData.tagline || '',
        budget: initialData.budget || '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdateMovie = async () => {
    const payload = {
      title: formData.title,
      overview: formData.overview,
      original_language: formData.original_language,
      runtime: formData.runtime,
      release_date: formData.release_date,
      tagline: formData.tagline,
      budget: formData.budget,
    };
    try {
      console.log('im in editsubmit');
      const response = await fetch(`http://localhost:4000/patch-movie/${initialData.idd}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log('Movie updated successfully');
      } else {
        console.error('Failed to update movie');
      }
    } catch (error) {
      console.error('Error while updating movie:', error);
    }
  };

  return (
    <div>
      <h2>{initialData ? 'Edit Movie' : 'Add Movie'}</h2>
      <form>
        <label>
          Title:
          <input type="text" name="title" value={formData.title} onChange={(e) => handleChange(e)} />
        </label>
        <br />
        <label>
          Overview:
          <textarea name="overview" value={formData.overview} onChange={(e) => handleChange(e)} />
        </label>
        <br />
        <label>
          Original Language:
          <input
            type="text"
            name="original_language"
            value={formData.original_language}
            onChange={(e) => handleChange(e)}
          />
        </label>
        <br />
        <label>
          Runtime:
          <input type="text" name="runtime" value={formData.runtime} onChange={(e) => handleChange(e)} />
        </label>
        <br />
        <label>
          Release Date:
          <input
            type="date"
            name="release_date"
            value={formData.release_date}
            onChange={(e) => handleChange(e)}
          />
        </label>
        <br />
        <label>
          Tagline:
          <input type="text" name="tagline" value={formData.tagline} onChange={(e) => handleChange(e)} />
        </label>
        <br />
        <label>
          Budget:
          <input type="text" name="budget" value={formData.budget} onChange={(e) => handleChange(e)} />
        </label>
        <br />
        <button type="button" onClick={handleUpdateMovie}>
          Update Movie
        </button>
      </form>
    </div>
  );
};

export default EditMovie;
