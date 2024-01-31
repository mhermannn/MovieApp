import React, { useState, useEffect } from 'react';
import RatingStars from 'react-rating-stars-component';

export default function RenderMovie4({ movie }) {
  const [komentarze, setKomentarze] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [voteavg, setVoteavg] = useState(0); 
  const [votecount, setVotecount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [userRating, setUserRating] = useState(0);
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
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([fetchKomentarze(), fetchReviewAvg(), fetchReviewCount()]);
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
      <div>
        Tytuł: {movie.title} <br />
        Opis: {movie.overview} <br />
        Czas trwania: {movie.runtime} <br />
        Data premiery: {movie.release_date} <br />
        Budżet: {movie.budget} <br />
        Rating Count: {votecount} <br />
        Rating Average: {voteavg} <br />
      </div>
      <div className="rating-section">
        <h4>Oceń Film:</h4>
        <RatingStars
          count={5}
          onChange={(newValue) => handleRateMovie(newValue)}
          size={24}
          value={userRating}
        />
        </div>
      <div>
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
