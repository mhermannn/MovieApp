const { getAllMoviesAndGenres4, getMovieDetails4, 
    addMovie4, ChangeMovieDetails4, DeleteComment4, 
    DeleteMovie4, TMDBratingSend, MovieRate4, PostComment4, 
    GenSearch4, MovieSearch4, SortNew, SortOld } = require('../services/neo4jService');

const movieController = {
    getAllMoviesAndGenres: async (req, res) => {
        try {
            const result = await getAllMoviesAndGenres4();
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getMovieDetails: async (req, res) => {
        const movieId = req.params.movieId;
        try {
            const result = await getMovieDetails4(movieId);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    addMovie: async (req, res) => {
        const body = req.body;
        try {
            const result = await addMovie4(body);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    ChangeMovie: async (req, res) => {
        const id = req.params.movie.id;
        const body = req.body;
        try {
            const result = await ChangeMovieDetails4(id, body);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    DeleteMovie: async (req, res) => {
        const id = req.params.id;
        try {
            const result = await DeleteMovie4(id);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    

    DeleteComment: async (req, res) => {
        const id = req.params.id;
        try {
            const result = await DeleteComment4(id);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    TMDBrating: async (req, res) => {
        const id = req.params.id;
        const body = req.body;
        try {
            const result = await TMDBratingSend(id,body);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    MovieRating: async (req, res) => {
        const id = req.params.id;
        const body = req.body;
        try {
            const result = await MovieRate4(id,body);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    CommentPost: async (req, res) => {
        const id = req.params.id;
        const body = req.body;
        try {
            const result = await PostComment4(id);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    GenSearchOld: async (req, res) => {
        const pattern = req.params.pattern;
        try {
            const result = await GenSearch4(pattern).then(res=> SortOld(res))
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
        
    },

    GenSearchNew: async (req, res) => {
        const pattern = req.params.pattern;
        try {
            const result = await GenSearch4(pattern).then(res=> SortNew(res))
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    GenSearch: async (req, res) => {
        const pattern = req.params.pattern;
        try {
            const result = await GenSearch4(pattern);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    MovieSearchOld: async (req, res) => {
        const pattern = req.params.pattern;
        try {
            const result = await GenSearch4(pattern).then(res=> SortOld(res))
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    MovieSearchNew: async (req, res) => {
        const pattern = req.params.pattern;
        try {
            const result = await MovieSearch4(pattern).then(res=> SortNew(res))
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    MovieSearch: async (req, res) => {
        const pattern = req.params.pattern;
        try {
            const result = await MovieSearch4(pattern);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    
};

module.exports = movieController;
