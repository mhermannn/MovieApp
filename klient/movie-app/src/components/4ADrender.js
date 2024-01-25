import React, { useState, useEffect } from 'react';

export default function RenderMovieAdmin4({ movie }) {
  const [komentarze, setKomentarze] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editedComment, setEditedComment] = useState('');
  const [editMode, setEditMode] = useState(null);

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

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    console.log('im in handlecomentRenderAdmin');
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
        // console.log('Comment posted successfully');
        fetchKomentarze();
        setNewComment('');
      } else {
        console.error('Failed to post comment');
      }
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await fetch(`http://localhost:4000/delete-comment/${commentId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setKomentarze((prevComments) => prevComments.filter((comment) => comment.idd !== commentId));
      } else {
        console.error('Failed to delete comment');
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const handleEditComment = (commentId) => {
    const commentToEdit = komentarze.find((comment) => comment.idd === commentId);
    setEditMode(commentId);
    setEditedComment(commentToEdit.text);
  };

  const handleSaveEdit = async (commentId) => {
    try {
      const response = await fetch(`http://localhost:4000/movie-comment/${commentId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: editedComment,
        }),
      });

      if (response.ok) {
        console.log('Comment edited successfully');
        fetchKomentarze();
        setEditedComment('');
        setEditMode(null);
      } else {
        console.error('Failed to edit comment');
      }
    } catch (error) {
      console.error('Error editing comment:', error);
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
              <li key={index}>
                {editMode === komentarz.idd ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSaveEdit(komentarz.idd);
                    }}
                  >
                    <input
                      type="text"
                      value={editedComment}
                      onChange={(e) => setEditedComment(e.target.value)}
                    />
                    <button type="submit">Submit Change</button>
                  </form>
                ) : (
                  <>
                    {komentarz.text}{' '}
                    <button onClick={() => handleDeleteComment(komentarz.idd)}>Delete Comment</button>
                    <button onClick={() => handleEditComment(komentarz.idd)}>Edit Comment</button>
                  </>
                )}
              </li>
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
