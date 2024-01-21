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

const addMovie4= async (body) => {
    const session = driver.session();
    try {

    } finally {
        await session.close();
    }
};

const ChangeMovieDetails4= async (id,body) => {
    const session = driver.session();
    try {

    } finally {
        await session.close();
    }
};

const DeleteComment4= async (id) => {
    const session = driver.session();
    try {

    } finally {
        await session.close();
    }
};

const DeleteMovie4= async (id) => {
    const session = driver.session();
    try {

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

const PostComment4= async (id,body) => {
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
    GenSearch4, MovieSearch4, SortNew, SortOld };
