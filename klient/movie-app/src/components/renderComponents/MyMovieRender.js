import React, { useState, useEffect } from 'react';
import RatingStars from 'react-rating-stars-component';
import '../stylowanie/MyMovieStyle.css';
export default function RenderMovie4({ movie }) {
  const [komentarze, setKomentarze] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [voteavg, setVoteavg] = useState(0); 
  const [votecount, setVotecount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [userRating, setUserRating] = useState(0);
  const [actors,setActors] = useState([]);
  const [director,setDirector] = useState([]);
  const handleRateMovie = async (rating) => {
    try {
      const response = await fetch(`http://localhost:4000/movie-rating/${movie.idd}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          value: parseInt(rating),
        }),
      });
  
      if (response.ok) {
        console.log(`Successfully rated movie ${movie.title} with ${rating} stars`);
        setUserRating(rating);
        fetchReviewAvg()
        fetchReviewCount()
      } else {
        console.error(`Failed to rate movie ${movie.idd}`);
      }
    } catch (error) {
      console.error('Error rating movie:', error);
    }
  };

  const fetchKomentarze = async () => {
    try {
      const response = await fetch(`http://localhost:4000/movie-comment/${movie.idd}`);
      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }
      const data = await response.json();
      setKomentarze(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviewCount = async () => {
    try {
      const response = await fetch(`http://localhost:4000/movie-rating-amount/${movie.idd}`);
      if (!response.ok) {
        throw new Error('Failed to fetch review count');
      }
      const data = await response.json();
      setVotecount(data || 0);
    } catch (error) {
      console.error('Error fetching review count:', error);
    }
  };

  const fetchReviewAvg = async () => {
    try {
      console.log('Fetching review average for movie ID:', movie.idd);
      const response = await fetch(`http://localhost:4000/movie-rating-avg/${movie.idd}`);
      if (!response.ok) {
        throw new Error('Failed to fetch review average');
      }
      const data = await response.json();
      console.log('Review average data:', data);
      setVoteavg(data || 0);
    } catch (error) {
      console.error('Error fetching review average:', error);
    }
  };
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
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([fetchKomentarze(), fetchReviewAvg(), fetchReviewCount(), fetchDirector(), fetchActors()]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
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

  if (loading || voteavg === null || votecount === null) { 
    return <div>Loading...</div>;
  }

  return (
    <>
    <li key={movie.id}>
      <div className="nazwa">{movie.title}</div>
      <div className="multimedia">
        <div className="bok">
          <div className="dane">
            <div><strong>Reżyser:</strong> {director && director.length > 0 ? director.map((dir, index) => <span key={index}>{dir.name}</span>) : "Brak danych"}</div>
            <div><strong>Aktorzy:</strong> {actors && actors.length > 0 ? actors.map((act, index) => <span key={index}>{act.name}</span>) : "Brak danych"}</div>
            <div><strong>Ilość ocen:</strong> {votecount}</div>
            <div><strong>Średnia ocen</strong> {voteavg}</div>
            <div><strong>Data wydania:</strong> {movie.release_date}</div>
            <div><strong>Czas trwania:</strong> {movie.runtime}</div>
            <div><strong>Budżet:</strong> {movie.budget}</div>
            
          </div>
        </div>
      </div>
      <div className="rating-section">
        <h4>Oceń Film:</h4>
        <RatingStars
          count={5}
          onChange={(newValue) => handleRateMovie(newValue)}
          size={24}
          activeColor="#f39c12"
          value={userRating}
        />
      </div>
      <div className="dane">{movie.overview}</div>
      <div className='komentarze'>
        <strong>Komentarze:</strong>
        {komentarze.length > 0 ? (
          <ul>
            {komentarze?.map((komentarz, index) => (
              <li key={index}>{komentarz.text}</li>
            ))}
          </ul>
        ) : (
          <p>Brak komentarzy.</p>
        )}
      </div>
      <div className='dod'>
        <form onSubmit={handleCommentSubmit}>
          <label>
            <input
              type="text"
              value={newComment}
              placeholder="Dodaj komentarz:"
              onChange={(e) => setNewComment(e.target.value)}
            />
          </label>
          <button type="submit">Dodaj</button>
        </form>
      </div>
    </li>
    </>
  );
}
