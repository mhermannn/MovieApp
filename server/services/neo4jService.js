const neo4j = require('neo4j-driver');
const dotenv = require('dotenv');

dotenv.config();

const URI = process.env.NEO4J_URI;
const USER = process.env.NEO4J_USERNAME;
const PASSWORD = process.env.NEO4J_PASSWORD;

const driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD));

const addMovie4 = async (body) => {
    // console.log('im in addmovie4');
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
    // console.log('im in getMine4');
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
const GetMovie4 = async (id) => {
    // console.log('im in getMovie4');
    const session = driver.session();
    try {
      const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
      const result = await session.run(
        'MATCH (m:Movie) WHERE (m.id IS NOT NULL AND m.id = $numericId) OR (m.idd IS NOT NULL AND m.idd = $id) RETURN m;'
        ,{id, numericId}
      );
      const movies = result.records.map(record => record.get('m').properties);
      return movies;
    } finally {
      await session.close();
    }
  };
  
const DeleteMovie4 = async (id) => {
    const session = driver.session();
    // console.log('im in deletemovie4');
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
    // console.log('im in changemovie4');
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
    // console.log('im in postcomment4');
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
    // console.log('im in deleteComment4');
    try {
        const result = await session.run(
            'MATCH (c:Comment { idd: $id })-[r]-() DELETE c, r',
            { id: id }
        );
          console.log(`Deleted Comment with ID ${id}`);
          return { success: true, message: `Deleted Comment with ID ${id}` };
    } catch (error) {
        console.error('Error deleting comment:', error);
        return { success: false, message: 'Internal Server Error' };
    } finally {
        await session.close();
    }
};

const ChangeComment4 = async (id, body) => {
    const session = driver.session();
    // console.log('im in changeComment4');
    try {
        const result = await session.run(
            'MATCH (c:Comment { idd: $id }) SET c += $properties RETURN c',
            { id: id, properties: body }
        );
        if (result.records.length > 0) {
            const updatedComment = result.records[0].get('c').properties;
            console.log(`Updated Comment with ID ${id}:`, updatedComment);
            return { success: true, message: `Updated Comment with ID ${id}`, comment: updatedComment };
        } else {
            console.log(`Comment with ID ${id} not found.`);
            return { success: false, message: `Comment with ID ${id} not found or couldn't be updated.` };
        }
    } catch (error) {
        console.error('Error updating comment:', error);
        return { success: false, message: 'Internal Server Error' };
    } finally {
        await session.close();
    }
};

const GetComment4 = async (id) => {
    const session = driver.session();
    // console.log('im in getcomment4');
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

const PostMovieRating4 = async (id, body) => {
    const session = driver.session();
    // console.log('im in postmovierating4');
    try {
      const { value } = body;
      const result = await session.run(
        `
        WITH apoc.create.uuid() AS generatedUUID
        MATCH (m:Movie { idd: $id })
        CREATE (r:Rating { value: $value, idd: toString(generatedUUID) })
        MERGE (r)-[:RATED]->(m)
        RETURN r;
        `,
        { id, value }
      );
      if (result.records.length > 0) {
        const createdRating = result.records[0].get('r').properties;
        console.log('Created rating:', createdRating);
        return createdRating;
      } else {
        console.log('Failed to create rating.');
        return null;
      }
    } catch (error) {
      console.error('Error creating rating:', error);
    } finally {
      await session.close();
    }
  };
  
const GetMovieRatingCount4 = async (id) => {
    const session = driver.session();
    // console.log('im in getmovieratingcount4');
    try {
      const result = await session.run(
        `
        MATCH (m:Movie { idd: $id })<-[:RATED]-(r:Rating)
        RETURN COUNT(r) AS ratingCount;
        `,
        { id }
      );
      const ratingCount = result.records[0].get('ratingCount').toNumber();
      console.log('Rating Count:', ratingCount);
      return ratingCount;
    } catch (error) {
      console.error('Error fetching rating count:', error);
      return 0;
    } finally {
      await session.close();
    }
  };
  
const GetMovieRatingAvg4 = async (id) => {
    const session = driver.session();
    // console.log('im in getmovieratingavg4');
    try {
      const result = await session.run(
        `
        MATCH (m:Movie { idd: $id })<-[:RATED]-(r:Rating)
        RETURN AVG(r.value) AS avgRating;
        `,
        { id }
      );
      const avgRating = result.records[0].get('avgRating');
      const roundedAvgRating = avgRating !== null ? parseFloat(avgRating.toFixed(2)) : null;
      console.log('Average Rating:', roundedAvgRating);
      return roundedAvgRating;
    } catch (error) {
      console.error('Error fetching average rating:', error);
      return 0;
    } finally {
      await session.close();
    }
  };
  
const GenSearch4 = async (pattern) => {
    const session = driver.session();
    // console.log('im in gensearch4');
    try {
        const result = await session.run(
            `
            MATCH (m:Movie)-[:IN_GENRE]->(g:Genre)
            WHERE toLower(g.name) CONTAINS toLower($pattern)
            RETURN m;
            `,
            { pattern }
        );
        const movies = result.records.map((record) => record.get('m').properties);
        return movies;
    } finally {
        await session.close();
    }
};

const MovieSearch4 = async (pattern) => {
    const session = driver.session();
    // console.log('im in moviesearch4');
    try {
        const result = await session.run(
            `
            MATCH (m:Movie)
            WHERE toLower(m.title) CONTAINS toLower($pattern)
            RETURN m;
            `,
            { pattern }
        );
        const movies = result.records.map((record) => record.get('m').properties);
        return movies;
    } finally {
        await session.close();
    }
};

const SortNew= async (movies) => {
    // console.log('im in sortnew');
    movies.sort((a, b) => {
        const dateA = new Date(a.release_date);
        const dateB = new Date(b.release_date);
        return dateB - dateA;
    });
    return movies;
};

const SortOld = async (movies) => {
    // console.log('im in sortold');
    movies.sort((a, b) => {
        const dateA = new Date(a.release_date);
        const dateB = new Date(b.release_date);
        return dateA - dateB;
    });

    return movies;
};

const GetGenres4 = async (id) => {
  const session = driver.session();
  // console.log('im in getgenres4');
  try {
    const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
    const result = await session.run(
      `
      MATCH (m:Movie)
      WHERE (m.id IS NOT NULL AND m.id = $numericId) OR (m.idd IS NOT NULL AND m.idd = $id)
      MATCH (m)-[:IN_GENRE]->(c:Genre)
      RETURN c;
      `,
      { id, numericId }
    );

    const genres = result.records.map((record) => record.get('c').properties);
    console.log('Genres', genres);
    return genres;
  } catch (error) {
    console.error('Error fetching comments:', error);
    return [];
  } finally {
    await session.close();
  }
};
const GetActors4 = async (id) => {
  const session = driver.session();
  // console.log('im in getactors4 ');
  try {
    const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
    const result = await session.run(
      `
      MATCH (m:Movie)
      WHERE (m.id IS NOT NULL AND m.id = $numericId) OR (m.idd IS NOT NULL AND m.idd = $id)
      MATCH (m)<-[:ACTED_IN]-(c:Actor)
      RETURN c;
      `,
      { id, numericId }
    );
    const actors = result.records.map((record) => record.get('c').properties);
    console.log('Actors', actors);
    return actors;
  } catch (error) {
    console.error('Error fetching actors:', error);
    return [];
  } finally {
    await session.close();
  }
};
const GetDirector4 = async (id) => {
  const session = driver.session();
  // console.log('im in getDirector4');
  try {
    const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
    const result = await session.run(
      `
      MATCH (m:Movie)
      WHERE (m.id IS NOT NULL AND m.id = $numericId) OR (m.idd IS NOT NULL AND m.idd = $id)
      MATCH (m)<-[:DIRECTED]-(c:Director)
      RETURN c;
      `,
      { id, numericId }
    );
    const director = result.records.map((record) => record.get('c').properties);
    console.log('Director:', director);
    return director;
  } catch (error) {
    console.error('Error fetching actors:', error);
    return [];
  } finally {
    await session.close();
  }
};
module.exports = {addMovie4, ChangeMovieDetails4, DeleteComment4, 
    DeleteMovie4, PostComment4, GetMovieRatingCount4, GetMovieRatingAvg4, PostMovieRating4,
    GenSearch4, MovieSearch4, SortNew, SortOld, GetMine4, GetComment4, ChangeComment4, GetActors4, GetGenres4, GetDirector4, GetMovie4 };
