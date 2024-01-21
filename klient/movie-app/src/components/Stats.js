import React, { useState, useEffect } from 'react';

const Stats = () => {
  const [topActors, setTopActors] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [topDirectors, setTopDirectors] = useState([]);

  useEffect(() => {
    // Fetch data for top actors, movies, and director when the component mounts
    fetchTopActors();
    fetchTopMovies();
    fetchTopDirectors();
  }, []);

  const fetchTopActors = async () => {
    try {
      // Fetch top actors from TMDb API
      const response = await fetch(
        `https://api.themoviedb.org/3/person/popular?api_key=f47b9f8a9c3382dcf52205a038f8a1fd`
      );
      const data = await response.json();
  
      // Map the results to include profile image URLs
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
      // Fetch top movies from TMDb API
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=f47b9f8a9c3382dcf52205a038f8a1fd`
      );
      const data = await response.json();
      setTopMovies(data.results.slice(0, 6));
    } catch (error) {
      console.error('Error fetching top movies:', error);
    }
  };

  const fetchTopDirectors = async () => {
    try {
      // Fetch popular persons from TMDb API with the job of 'Director'
      const response = await fetch(
        `https://api.themoviedb.org/3/person/popular?api_key=f47b9f8a9c3382dcf52205a038f8a1fd`
      );
      const data = await response.json();
  
      // // Filter persons with the job of 'Director'
      // const directors = data.results.filter(person =>
      //   person.known_for_department === 'Directing'
      // );
  
      setTopDirectors(data.slice(0, 6));
    } catch (error) {
      console.error('Error fetching top directors:', error);
      // setTopDirectors([]); // Set topDirectors to an empty array in case of an error
    }
  };
  

  return (
    <div>
      <h2>Stats Component</h2>

      <h3>Top 6 Actors</h3>
      <ul>
        {topActors.map((actor, idd) => (
          <li key={actor.id}>
          <a
            href={`https://www.themoviedb.org/person/${actor.id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {actor.name}
            {actor.profile_image && (
              <img src={actor.profile_image} alt={`${actor.name} profile`} />
            )}
          </a>
        </li>
        ))}
      </ul>

      <h3>Top 6 Movies</h3>
      <ul>
        {topMovies.map((movie, idd) => (
          <li key={movie.id}>
          <a
            href={`https://www.themoviedb.org/movie/${movie.id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {movie.title}
            {movie.poster_path && (
              <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={`${movie.title} poster`} />
            )}
          </a>
        </li>
        ))}
      </ul>

      <h3>Top 6 Directors</h3>
      <ul>
      {topDirectors.map((dir) => (
          <li key={dir.id}>{dir.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Stats;
