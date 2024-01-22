import React, { useState, useEffect } from 'react';

export default function RenderMovieAdmin4({ movie }) {
  const [komentarze, setKomentarze] = useState([]);

  const fetchKomentarze = async () => {
    try {
      const response = await fetch(`http://localhost:4000/movie-comment/${movie.idd}`);
      const data = await response.json();

      if (Array.isArray(data)) {
        setKomentarze(data);
      } else {
        console.error('Invalid response format for comments');
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  useEffect(() => {
    fetchKomentarze();
  }, []);

  return (
    <>
      <div>
        Tytuł: {movie.title} <br />
        Opis: {movie.overview} <br />
        Czas trwania: {movie.runtime} <br />
        Data premiery: {movie.release_date} <br />
        Budżet: {movie.budget} <br />
      </div>
      <div>
        <strong>Komentarze:</strong>
        {komentarze.length > 0 ? (
          <ul>
            {komentarze.map((komentarz, index) => (
              <li key={index}>{komentarz.text}</li>
            ))}
          </ul>
        ) : (
          <p>Brak komentarzy.</p>
        )}
      </div>
    </>
  );
}
