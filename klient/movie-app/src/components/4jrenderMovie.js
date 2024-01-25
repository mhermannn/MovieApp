import React, { useState, useEffect } from 'react';

export default function RenderMovie4({ movie }) {
  const [komentarze, setKomentarze] = useState([]);
  const [newComment, setNewComment] = useState('');

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

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    console.log("im in handlecomentRender")
    try {
      const response = await fetch(`http://localhost:4000/movie-comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          movieId: movie.idd,
          text: newComment,
        }),
      });

      if (response.ok) {
        console.log('Comment posted successfully');
        fetchKomentarze();
        setNewComment('');
      } else {
        console.error('Failed to post comment');
      }
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

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
      <div>
        <form onSubmit={handleCommentSubmit}>
          <label>
            Dodaj komentarz:
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
          </label>
          <button type="submit">Dodaj</button>
        </form>
      </div>
    </>
  );
}
