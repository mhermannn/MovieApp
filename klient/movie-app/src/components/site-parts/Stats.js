import React, { useState, useLayoutEffect } from 'react';
import '../stylowanie/Stats.css';

const Stats = () => {
  const [topActors, setTopActors] = useState([]);
  const [topMovies, setTopMovies] = useState([]);

  useLayoutEffect(() => {
    fetchTopActors();
    fetchTopMovies();
  }, []);

  const fetchTopActors = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/person/popular?api_key=f47b9f8a9c3382dcf52205a038f8a1fd`
      );
      const data = await response.json();
      const actorsWithImages = data.results.slice(0, 6).map(actor => {
        return {
          id: actor.id,
          name: actor.name,
          profile_path: actor.profile_path,
          profile_image: actor.profile_path
            ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
            : null,
        };
      });
  
      setTopActors(actorsWithImages);
    } catch (error) {
      console.error('Error fetching top actors:', error);
    }
  };
  

  const fetchTopMovies = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=f47b9f8a9c3382dcf52205a038f8a1fd`
      );
      const data = await response.json();
      setTopMovies(data.results.slice(0, 6));
    } catch (error) {
      console.error('Error fetching top movies:', error);
    }
  };

  return (
    <div className='Stats'>

      <h2>Top 6 Actors</h2>
      <ul>
        {topActors.map((actor, idd) => (
          <li key={actor.id}>
            <a
              href={`https://www.themoviedb.org/person/${actor.id}`}
              target="_blank"
              rel="noopener noreferrer"
              data-name={actor.name}
            >
              {actor.profile_image && (
                <img src={actor.profile_image} alt={`${actor.name} profile`} />
              )}
            </a>
          </li>
        ))}
      </ul>

      <h2>Top 6 Movies</h2>
      <ul>
        {topMovies.map((movie, idd) => (
          <li key={movie.id}>
            <a
              href={`https://www.themoviedb.org/movie/${movie.id}`}
              target="_blank"
              rel="noopener noreferrer"
              data-name={movie.title}
            >
              {movie.poster_path && (
                <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={`${movie.title} poster`} />
              )}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Stats;