# Movie App

## Table of Contents
1. [Description](#description)
2. [Concepts Used](#concepts-used)
3. [Walkthrough](#walkthrough)
4. [Setup](#setup)

## Description
**Movie App** is a full-stack web application that allows users to search, view, and manage movies. The frontend is built using **React**, while the backend is powered by **Express.js** and **Neo4j** for database management. The application provides features like movie search, pagination, sorting, and filtering, as well as admin functionalities for adding, editing, and deleting movies.

The project integrates with **The Movie Database (TMDb) API** to fetch trending movies, top actors, and movie details such as trailers, genres, directors, and actors. Users can also add custom movies to the database, rate movies, and leave comments.

## Concepts Used
In this project, I use concepts and technologies such as:
- **Pagination**: Allows users to navigate through movie lists efficiently.
- **Sorting & Filtering**: Enhances movie searchability with sorting options (e.g., by release date) and filtering by genre.
- **State Management**: Utilizes React's useState and useReducer hooks for managing component state.
- **Form Handling**: Implements dynamic forms for adding and editing movies using Formik and Yup for validation.
- **API Integration**: Fetches data from TMDb API for trending movies, top actors, and movie details.
- **Neo4j Database**: Manages movie data, including relationships between movies, genres, actors, and directors. keeping users on the same page.
- **Error Handling**: Ensures data integrity and user guidance with proper error messages.
- **Responsive Design**: Provides a seamless experience across different devices.

## Walkthrough with Images
 coming soon
## Setup

### Backend Setup:
#### 1.Install Dependencies
Navigate to the `server` folder and run :
```bash
npm install
```
#### 2.Set Up Neo4j:
Create a Neo4j Instance and update the `.env` file:
```env
NEO4J_URI=neo4j+s://your_dbid.databases.neo4j.io
NEO4J_USERNAME=your_username
NEO4J_PASSWORD=your_password
PORT=4000
```
Populate the Neo4j database with movie data using the following queries. You will need an API key from The Movie Database (TMDb). Replace your_key with your own API key.
Notice that in the fist query i use UNWIND in range(x,y). you can start by 1,5 then 6,11 etc. I would advise to be carefull with the amount of movies you add as it may make collecting data much more time consuming. 

```cypher
// Load top-rated movies from TMDb
UNWIND range(11, 16) AS x
CALL apoc.load.json('https://api.themoviedb.org/3/movie/top_rated?api_key=your_key&page=' + x) YIELD value
WITH value.results AS movies
UNWIND movies AS movieData
MERGE (m:Movie {id: movieData.id})
SET m.backdrop_path = movieData.backdrop_path,
    m.original_language = movieData.original_language,
    m.original_title = movieData.original_title,
    m.poster_path = movieData.poster_path,
    m.release_date = movieData.release_date,
    m.title = movieData.title,
    m.overview = movieData.overview
FOREACH (genreId IN movieData.genre_ids |
  MERGE (g:Genre {id: genreId})
  MERGE (m)-[:IN_GENRE]->(g)
);

// Load actors for each movie
CALL apoc.periodic.iterate(
  'MATCH (m:Movie) RETURN m',
  'CALL apoc.load.json("https://api.themoviedb.org/3/movie/" + m.id + "?api_key=your_key&append_to_response=credits") YIELD value
   WITH value.credits.cast AS cast, m
   UNWIND cast AS actorData
   WITH actorData, m
   LIMIT 15
   MERGE (a:Person:Actor {id: actorData.id})
   ON CREATE SET a.name = actorData.name, a.profile_path = actorData.profile_path
   MERGE (m)<-[r:ACTED_IN]-(a)
   ON CREATE SET r.character = actorData.character',
  { batchSize: 1, iterateList: true, parallel: false }
);

// Load directors for each movie
CALL apoc.periodic.iterate(
  'MATCH (m:Movie) WHERE m.id >= 40000 RETURN m',
  'CALL apoc.load.json("https://api.themoviedb.org/3/movie/" + m.id + "?api_key=" + "your_key" + "&append_to_response=credits") YIELD value
   WITH value.credits.crew AS crew, m
   WHERE crew IS NOT NULL
   WITH [person IN crew WHERE person.job = "Director" | person] AS directors, m
   UNWIND directors AS director
   MERGE (p:Person:Director {id: director.id})
   ON CREATE SET p.name = director.name, p.profile_path = director.profile_path
   MERGE (m)<-[:DIRECTED]-(p)',
  { batchSize: 1, iterateList: true, parallel: false }
);

// Load additional movie details (trailers, images, budget, runtime, etc.)
MATCH (m:Movie)
WITH m
CALL apoc.load.json("https://api.themoviedb.org/3/movie/" + m.id + "?api_key=your_key&append_to_response=videos,images") YIELD value
SET m.images = [backdrop IN value.images.backdrops | backdrop.file_path]
SET m.trailers = [video IN value.videos.results WHERE video.site = "YouTube" AND video.type = "Trailer" | video.key]
SET m.budget = value.budget,
    m.runtime = value.runtime,
    m.tagline = value.tagline;
```
#### 3.Run the backend server
Start the backend server by 
```bash
node app.js
```

### Frontend Setup:

#### 1.Install Dependencies
Navigate to the `client` folder, then `movie-app` folder and run :
```bash
npm install
```

#### 2.Run the Frontend Server:
Start the frontend server by running:
```bash
npm start
```
### Access the Application:
Open your browser and navigate to **http://localhost:3000** to view the application.


---

Thank you for reading to the end! 😊
