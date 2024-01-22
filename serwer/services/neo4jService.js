const neo4j = require('neo4j-driver');
const dotenv = require('dotenv');
const Movie = require('../models/movieModel');

dotenv.config();

const URI = process.env.NEO4J_URI;
const USER = process.env.NEO4J_USERNAME;
const PASSWORD = process.env.NEO4J_PASSWORD;

const driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD));

const getAllMoviesAndGenres4 = async () => {
    const session = driver.session();
    try {
        const result = await session.run(`
            MATCH (m:Movie)-[:IN_GENRE]->(g:Genre)
            RETURN m, g
        `);
        const data = result.records.map(record => {
            const movieData = record.get('m').properties;
            const genre = record.get('g').properties;

            const movie = new Movie({
                id: movieData.id,
                title: movieData.title,
                releaseYear: movieData.releaseYear,
            });
            return { movie, genre };
        });
        return data;
    } finally {
        await session.close();
    }
};

const getMovieDetails4 = async (movieId) => {
    const session = driver.session();
    try {
        const result = await session.run(`
            MATCH (m:Movie)-[:IN_GENRE]->(g:Genre)
            OPTIONAL MATCH (m)<-[:ACTED_IN]-(a:Person:Actor)
            OPTIONAL MATCH (m)<-[:DIRECTED]-(d:Person:Director)
            WHERE m.id = $movieId
            RETURN m, g, COLLECT(DISTINCT a) AS actors, COLLECT(DISTINCT d) AS directors;
        `, { movieId });
        const data = result.records.map(record => {
            const movie = record.get('m').properties;
            const genre = record.get('g').properties;
            const actors = record.get('actors').map(actor => actor.properties);
            const directors = record.get('directors').map(director => director.properties);
            return { movie, genre, actors, directors };
        });
        return data;
    } finally {
        await session.close();
    }
};

const addMovie4 = async (body) => {
    console.log('im in addmovie4');
    const session = driver.session();

    try {
        const { title, overview, original_language, runtime, release_date, budget, director, actors } = body;

        const result = await session.run(
            `
            WITH apoc.create.uuid() AS generatedUUID
            CREATE (m:Movie {
                title: $title,
                overview: $overview,
                original_language: $original_language,
                runtime: $runtime,
                release_date: $release_date,
                budget: $budget,
                isMine: true,
                idd: toString(generatedUUID)

            })
            WITH m
                            
            MERGE (d:Person:Director { name: $director })
            MERGE (d)-[:DIRECTED]->(m)
            WITH m, d
                    
            UNWIND $actors AS actorName
            MERGE (a:Person:Actor { name: actorName })
            MERGE (a)-[:ACTED_IN]->(m)
                            
            RETURN m, d;            
            `,
            { title, overview, original_language, runtime, release_date, budget, director, actors }
        );      
        const createdMovie = result.records[0].get('m').properties;
        const createdDirector = result.records[0].get('d').properties;

        return { ...createdMovie, director: createdDirector };
    } finally {
        await session.close();
    }
};
const GetMine4 = async () => {
    console.log('im in getMine4');
    const session = driver.session();
    try {
      const result = await session.run(
        'MATCH (m:Movie {isMine: true}) RETURN m;'
      );
  
      const movies = result.records.map(record => record.get('m').properties);
      return movies;
    } finally {
      await session.close();
    }
  };
  
  const DeleteMovie4 = async (id) => {
    const session = driver.session();
    console.log('im in deletemovie4');
    try {
        const result = await session.run(
            'MATCH (m:Movie { idd: $id })-[r]-() DELETE m, r',
            { id: id }
        );
        
        if (result.summary) {
            console.log(`Deleted movie with ID ${id}`);
        } else {
            console.log(`Movie with ID ${id} not found or couldn't be deleted.`);
        }
    } catch (error) {
        console.error('Error deleting movie:', error);
    } finally {
        await session.close();
    }
};
const ChangeMovieDetails4 = async (id, body) => {
    const session = driver.session();
    console.log('im in changemovie4');
    
    try {
        const result = await session.run(
            `
            MATCH (m:Movie {idd: $id})
            SET m += $properties
            RETURN m;
            `,
            { id: id, properties: body }
        );

        if (result.records.length > 0) {
            const updatedMovie = result.records[0].get('m').properties;
            console.log(`Updated movie with ID ${id}:`, updatedMovie);
        } else {
            console.log(`Movie with ID ${id} not found.`);
        }
    } catch (error) {
        console.error('Error updating movie:', error);
    } finally {
        await session.close();
    }
};

const PostComment4 = async ( body ) => {
    const session = driver.session();
    console.log('im in postcomment4');
  
    try {
        const { movieId, text } = body;
        const result = await session.run(
          `
          WITH apoc.create.uuid() AS generatedUUID
          MATCH (m:Movie { idd: $movieId })
          CREATE (c:Comment { text: $text, idd: toString(generatedUUID) })
          MERGE (c)-[:COMMENTED_ON]->(m)
          RETURN c;
          `,
          { movieId, text }
        );
        
  
      if (result.records.length > 0) {
        const createdComment = result.records[0].get('c').properties;
        console.log('Created comment:', createdComment);
        return createdComment;
      } else {
        console.log('Failed to create comment.');
        return null;
      }
    } catch (error) {
      console.error('Error creating comment:', error);
    } finally {
      await session.close();
    }
};  
const DeleteComment4 = async (id) => {
    const session = driver.session();
    console.log('im in deleteComment4');
    try {
        const result = await session.run(
            'MATCH (c:Comment { idd: $id })-[r]-() DELETE c, r',
            { id: id }
        );
        
        if (result.summary) {
            console.log(`Deleted Comment with ID ${id}`);
            return { success: true, message: `Deleted Comment with ID ${id}` };
        } else {
            console.log(`Comment with ID ${id} not found or couldn't be deleted.`);
            return { success: false, message: `Comment with ID ${id} not found or couldn't be deleted.` };
        }
    } catch (error) {
        console.error('Error deleting comment:', error);
        return { success: false, message: 'Internal Server Error' };
    } finally {
        await session.close();
    }
};


const GetComment4 = async (id) => {
    const session = driver.session();
    console.log('im in getcomment4');
  
    try {
      const result = await session.run(
        `
        MATCH (m:Movie { idd: $id })<-[:COMMENTED_ON]-(c:Comment)
        RETURN c;
        `,
        { id }
      );
  
      const comments = result.records.map((record) => record.get('c').properties);
      console.log('Comments:', comments);
      return comments;
    } catch (error) {
      console.error('Error fetching comments:', error);
      return [];
    } finally {
      await session.close();
    }
  };

const TMDBratingSend= async (id,body) => {
    const session = driver.session();
    try {

    } finally {
        await session.close();
    }
};

const MovieRate4= async (id,body) => {
    const session = driver.session();
    try {

    } finally {
        await session.close();
    }
};

const GenSearch4= async (pattern) => {
    const session = driver.session();
    try {

    } finally {
        await session.close();
    }
};

const MovieSearch4= async (pattern) => {
    const session = driver.session();
    try {

    } finally {
        await session.close();
    }
};

const SortNew= async (res) => {
    const session = driver.session();
    try {

    } finally {
        await session.close();
    }
};

const SortOld= async (res) => {
    const session = driver.session();
    try {

    } finally {
        await session.close();
    }
};

module.exports = { getAllMoviesAndGenres4, getMovieDetails4, 
    addMovie4, ChangeMovieDetails4, DeleteComment4, 
    DeleteMovie4, TMDBratingSend, MovieRate4, PostComment4, 
    GenSearch4, MovieSearch4, SortNew, SortOld, GetMine4, GetComment4 };
