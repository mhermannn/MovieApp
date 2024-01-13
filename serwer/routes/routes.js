const express = require('express');
const router = express.Router();
const neo4j = require('neo4j-driver');
const dotenv = require('dotenv');

dotenv.config({ path: '../.env' });

const URI = process.env.NEO4J_URI;
const USER = process.env.NEO4J_USERNAME;
const PASSWORD = process.env.NEO4J_PASSWORD;

const driver = neo4j.driver(URI, neo4j.auth.basic(USER,PASSWORD));

const session = driver.session();

// Endpoint zwracający wszystkie wierzchołki z bazy danych
router.get('/nodes', async (req, res) => {
    try {
        const result = await session.run('MATCH (n) RETURN n');
        const nodes = result.records.map(record => record.get('n').properties);
        res.json(nodes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;