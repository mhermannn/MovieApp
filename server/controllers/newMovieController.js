const {
    GenSearchPaged4, MovieSearchPaged4, MovieCountPaged4, GenCountPaged4
} = require('../services/newNeo4j');

const newMovieController = {
    MovieSearchPaged: async (req, res) => {
        const pattern = req.params.pattern;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const sort = req.query.sort || 'new';
        try {
            const movies = await MovieSearchPaged4(pattern, page, limit, sort);
            res.json({ results: movies });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    GenSearchPaged: async (req, res) => {
        const pattern = req.params.pattern;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const sort = req.query.sort || 'new';
        try {
            const movies = await GenSearchPaged4(pattern, page, limit, sort);
            res.json({ results: movies });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    MovieCountPaged: async (req, res) => {
        const pattern = req.params.pattern;
        try {
            const total = await MovieCountPaged4(pattern);
            res.json({ total });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    GenCountPaged: async (req, res) => {
        const pattern = req.params.pattern;
        try {
            const total = await GenCountPaged4(pattern);
            res.json({ total });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};

module.exports = newMovieController;
