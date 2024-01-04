import React, { useState, useEffect } from 'react';
import '../stylowanie/PopularMovie.css';
const PopularMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const placeholderMovies = [
        {
            "adult": false,
            "backdrop_path": "/sRLC052ieEzkQs9dEtPMfFxYkej.jpg",
            "genre_ids": [
                878
            ],
            "id": 848326,
            "original_language": "en",
            "original_title": "Rebel Moon - Part One: A Child of Fire",
            "overview": "When a peaceful colony on the edge of the galaxy finds itself threatened by the armies of the tyrannical Regent Balisarius, they dispatch Kora, a young woman with a mysterious past, to seek out warriors from neighboring planets to help them take a stand.",
            "popularity": 2998.858,
            "poster_path": "/ui4DrH1cKk2vkHshcUcGt2lKxCm.jpg",
            "release_date": "2023-12-15",
            "title": "Rebel Moon - Part One: A Child of Fire",
            "video": false,
            "vote_average": 6.463,
            "vote_count": 964
        },
        {
            "adult": false,
            "backdrop_path": "/5a4JdoFwll5DRtKMe7JLuGQ9yJm.jpg",
            "genre_ids": [
                18,
                878,
                28
            ],
            "id": 695721,
            "original_language": "en",
            "original_title": "The Hunger Games: The Ballad of Songbirds & Snakes",
            "overview": "64 years before he becomes the tyrannical president of Panem, Coriolanus Snow sees a chance for a change in fortunes when he mentors Lucy Gray Baird, the female tribute from District 12.",
            "popularity": 2750.026,
            "poster_path": "/mBaXZ95R2OxueZhvQbcEWy2DqyO.jpg",
            "release_date": "2023-11-15",
            "title": "The Hunger Games: The Ballad of Songbirds & Snakes",
            "video": false,
            "vote_average": 7.243,
            "vote_count": 1297
        },
        {
            "adult": false,
            "backdrop_path": "/jXJxMcVoEuXzym3vFnjqDW4ifo6.jpg",
            "genre_ids": [
                28,
                12,
                14
            ],
            "id": 572802,
            "original_language": "en",
            "original_title": "Aquaman and the Lost Kingdom",
            "overview": "Black Manta, still driven by the need to avenge his father's death and wielding the power of the mythic Black Trident, will stop at nothing to take Aquaman down once and for all. To defeat him, Aquaman must turn to his imprisoned brother Orm, the former King of Atlantis, to forge an unlikely alliance in order to save the world from irreversible destruction.",
            "popularity": 1542.493,
            "poster_path": "/8xV47NDrjdZDpkVcCFqkdHa3T0C.jpg",
            "release_date": "2023-12-20",
            "title": "Aquaman and the Lost Kingdom",
            "video": false,
            "vote_average": 6.5,
            "vote_count": 360
        },
        {
            "adult": false,
            "backdrop_path": "/r9bIkU9nXZUWSlDUgDMUcDrlK0A.jpg",
            "genre_ids": [
                28,
                35
            ],
            "id": 1029575,
            "original_language": "en",
            "original_title": "The Family Plan",
            "overview": "Dan Morgan is many things: a devoted husband, a loving father, a celebrated car salesman. He's also a former assassin. And when his past catches up to his present, he's forced to take his unsuspecting family on a road trip unlike any other.",
            "popularity": 2069.624,
            "poster_path": "/jLLtx3nTRSLGPAKl4RoIv1FbEBr.jpg",
            "release_date": "2023-12-14",
            "title": "The Family Plan",
            "video": false,
            "vote_average": 7.381,
            "vote_count": 550
        },
        {
            "adult": false,
            "backdrop_path": "/gg4zZoTggZmpAQ32qIrP5dtnkEZ.jpg",
            "genre_ids": [
                28,
                80
            ],
            "id": 891699,
            "original_language": "en",
            "original_title": "Silent Night",
            "overview": "A tormented father witnesses his young son die when caught in a gang's crossfire on Christmas Eve. While recovering from a wound that costs him his voice, he makes vengeance his life's mission and embarks on a punishing training regimen in order to avenge his son's death.",
            "popularity": 1797.04,
            "poster_path": "/tlcuhdNMKNGEVpGqBZrAaOOf1A6.jpg",
            "release_date": "2023-11-30",
            "title": "Silent Night",
            "video": false,
            "vote_average": 5.838,
            "vote_count": 225
        },
        {
            "adult": false,
            "backdrop_path": "/t5zCBSB5xMDKcDqe91qahCOUYVV.jpg",
            "genre_ids": [
                27,
                9648
            ],
            "id": 507089,
            "original_language": "en",
            "original_title": "Five Nights at Freddy's",
            "overview": "Recently fired and desperate for work, a troubled young man named Mike agrees to take a position as a night security guard at an abandoned theme restaurant: Freddy Fazbear's Pizzeria. But he soon discovers that nothing at Freddy's is what it seems.",
            "popularity": 1078.27,
            "poster_path": "/7BpNtNfxuocYEVREzVMO75hso1l.jpg",
            "release_date": "2023-10-25",
            "title": "Five Nights at Freddy's",
            "video": false,
            "vote_average": 7.76,
            "vote_count": 3058
        },
        {
            "adult": false,
            "backdrop_path": "/zIYROrkHJPYB3VTiW1L9QVgaQO.jpg",
            "genre_ids": [
                28,
                35
            ],
            "id": 897087,
            "original_language": "en",
            "original_title": "Freelance",
            "overview": "An ex-special forces operative takes a job to provide security for a journalist as she interviews a dictator, but a military coup breaks out in the middle of the interview, they are forced to escape into the jungle where they must survive.",
            "popularity": 1044.989,
            "poster_path": "/7Bd4EUOqQDKZXA6Od5gkfzRNb0.jpg",
            "release_date": "2023-10-05",
            "title": "Freelance",
            "video": false,
            "vote_average": 6.5,
            "vote_count": 426
        },
        {
            "adult": false,
            "backdrop_path": "/rLb2cwF3Pazuxaj0sRXQ037tGI1.jpg",
            "genre_ids": [
                18,
                36
            ],
            "id": 872585,
            "original_language": "en",
            "original_title": "Oppenheimer",
            "overview": "The story of J. Robert Oppenheimer's role in the development of the atomic bomb during World War II.",
            "popularity": 889.087,
            "poster_path": "/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
            "release_date": "2023-07-19",
            "title": "Oppenheimer",
            "video": false,
            "vote_average": 8.118,
            "vote_count": 5857
        },
    ];
    setMovies(placeholderMovies);
  }, []);

  return (
    <div class="trend">
      <h2>Trending Movies</h2>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
                <div class="nazwa">{movie.title}</div>
                <div class="multimedia">
                    <div class="zdjecie">
                        <img src={movie.poster_path}/>
                    </div>
                    <div class="bok">
                        <div class="dane">
                            <div>Reżyser: </div>
                            <div>Aktorzy: </div>
                            <div>Średnia ocena filmu: {movie.vote_average}</div>
                            <div>Ilość ocen: {movie.vote_count}</div>
                            <div>Data wydania: {movie.release_date}</div>
                            <div>Gatunki {movie.genre_ids}</div>
                        </div>
                    </div>

                    
                </div>
                <div class="guziki">
                        <button class="galeria">galeria</button>
                        <button class="zwiastun">zwiastun</button>
                        <button class="odnosnik">odnośnik do strony</button> {/*movie.backdrop_path*/}
                </div>
                <div class="dane">
                    {movie.overview}
                </div>
            </li>
        ))}
      </ul>
    </div>
  );
};

export default PopularMovies;
