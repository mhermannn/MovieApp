import React, { useState, useEffect } from 'react';
import '../stylowanie/AdminRender.css'

export default function RenderMovieAdmin4({ movie }) {
  const [komentarze, setKomentarze] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editedComment, setEditedComment] = useState('');
  const [editMode, setEditMode] = useState(null);
  const [actors,setActors] = useState([]);
  const [director,setDirector] = useState([]);

  const fetchDirector = async () => {
    try {
      const response = await fetch(`/director/${movie.idd}`);
      if (!response.ok) {
        throw new Error('Failed to fetch director');
      }
      const data = await response.json();
      console.log("Director data:", data);
      setDirector(data);
    } catch (error) {
      console.error('Error fetching director:', error);
    }
  };
  const fetchActors = async () => {
    try {
      const response = await fetch(`/actors/${movie.idd}`);
      if (!response.ok) {
        throw new Error('Failed to fetch actors');
      }
      const data = await response.json();
      console.log("Actor data:", data);
      setActors(data);
    } catch (error) {
      console.error('Error fetching actors:', error);
    }
  };

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
    const fetchData = async () => {
      try {
        await Promise.all([fetchKomentarze(), fetchDirector(), fetchActors()]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className='adrender'>
    <h3>{movie.title}</h3>
      <div>
      <div>
        <strong>Reżyser:</strong> {director && director.length > 0 ? director.map((dir, index) => <span key={index}>{dir.name}</span>) : "Brak danych"}</div>
      <div>
        <strong>Aktorzy:</strong> {actors && actors.length > 0 ? actors.map((act, index) => <span key={index}>{act.name},</span>) : "Brak danych"}</div>   
      <div>
        <strong>Opis:</strong> {movie.overview} <br />
      </div>
      <div>
        <strong>Czas trwania:</strong> {movie.runtime} <br />
      </div>
      <div>
        <strong>Data premiery:</strong> {movie.release_date} <br />
      </div>
      <div>
        <strong>Budżet:</strong> {movie.budget} <br />
      </div>
      <div><strong>Tagline:</strong> {movie.tagline}</div>

    </div>
    <div className='compart'>
    <div className='compart'>
        <strong>Komentarze:</strong>
        {komentarze.length > 0 ? (
          <ul>
            {komentarze.map((komentarz, index) => (
              <li className="kom" key={index}>
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
                  <div className='widok'>
                    {komentarz.text}{' '}
                    <div className='guz'>
                    <button onClick={() => handleDeleteComment(komentarz.idd)}>Delete Comment</button>
                    <button onClick={() => handleEditComment(komentarz.idd)}>Edit Comment</button>
                    </div>
                  </div>
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
            <input
              type="text"
              value={newComment}
              placeholder='Dodaj komentarz'
              onChange={(e) => setNewComment(e.target.value)}
            />
          </label>
          <button type="submit">Dodaj</button>
        </form>
      </div>
    </div>
      
    </div>
  );
}
