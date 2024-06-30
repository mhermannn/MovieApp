const neo4j = require('neo4j-driver');
const dotenv = require('dotenv');

dotenv.config();

const URI = process.env.NEO4J_URI;
const USER = process.env.NEO4J_USERNAME;
const PASSWORD = process.env.NEO4J_PASSWORD;

const driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD));

const MovieSearchPaged4 = async (pattern, page, limit, sort) => {
    const session = driver.session();
    try {
        const skip = (page - 1) * limit;
        const orderBy = sort === 'new' ? 'm.release_date DESC' : 'm.release_date ASC';
        
        const result = await session.run(
            `
            MATCH (m:Movie)
            WHERE toLower(m.title) CONTAINS toLower($pattern)
            RETURN m
            ORDER BY ${orderBy}
            SKIP $skip LIMIT $limit;
            `,
            { pattern, skip: neo4j.int(skip), limit: neo4j.int(limit) }
        );

        const movies = result.records.map((record) => record.get('m').properties);
        return movies;
    } finally {
        await session.close();
    }
};

const GenSearchPaged4 = async (pattern, page, limit, sort) => {
    const session = driver.session();
    try {
        const skip = (page - 1) * limit;
        const orderBy = sort === 'new' ? 'm.release_date DESC' : 'm.release_date ASC';
        
        const result = await session.run(
            `
            MATCH (m:Movie)-[:IN_GENRE]->(g:Genre)
            WHERE toLower(g.name) CONTAINS toLower($pattern)
            RETURN m
            ORDER BY ${orderBy}
            SKIP $skip LIMIT $limit;
            `,
            { pattern, skip: neo4j.int(skip), limit: neo4j.int(limit) }
        );

        const movies = result.records.map((record) => record.get('m').properties);
        return movies;
    } finally {
        await session.close();
    }
};

const MovieCountPaged4 = async (pattern) => {
    const session = driver.session();
    try {
        const countResult = await session.run(
            `
            MATCH (m:Movie)
            WHERE toLower(m.title) CONTAINS toLower($pattern)
            RETURN count(m) AS total;
            `,
            { pattern }
        );

        const total = countResult.records[0].get('total').toNumber();
        return total;
    } finally {
        await session.close();
    }
};

const GenCountPaged4 = async (pattern) => {
    const session = driver.session();
    try {
        const countResult = await session.run(
            `
            MATCH (m:Movie)-[:IN_GENRE]->(g:Genre)
            WHERE toLower(g.name) CONTAINS toLower($pattern)
            RETURN count(m) AS total;
            `,
            { pattern }
        );

        const total = countResult.records[0].get('total').toNumber();
        return total;
    } finally {
        await session.close();
    }
};

module.exports = {
  GenSearchPaged4, MovieSearchPaged4, MovieCountPaged4, GenCountPaged4
};
