const { addMovie4, ChangeMovieDetails4, DeleteComment4, 
    DeleteMovie4, PostComment4, GenSearch4, MovieSearch4,
     SortNew, SortOld, GetMine4, GetComment4, ChangeComment4,
      PostMovieRating4, GetMovieRatingCount4, GetMovieRatingAvg4,
    GetActors4, GetGenres4, GetDirector4, GetMovie4 } = require('../services/neo4jService');

const movieController = {
    PostMovieRating: async (req, res) => {
        const body = req.body;
        const id = req.params.id;
        // console.log('im in postrating');
        try {
            const result = await PostMovieRating4(id, body);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    GetMovieRatingCount: async (req, res) => {
        const id = req.params.id;
        try {
            // console.log("im in getmovieratingcount");
            const result = await GetMovieRatingCount4(id);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    GetMovieRatingAvg:async (req, res) => {
        const id = req.params.id;
        try {
            // console.log("im in getmovieratingavg");
            const result = await GetMovieRatingAvg4(id);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    addMovie: async (req, res) => {
        const body = req.body;
        // console.log(body);
        // console.log('im in addmovie');
        try {
            const result = await addMovie4(body);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }, 
    DeleteMovie: async (req, res) => {
        const id = req.params.id;
        // console.log('im in deletemovie');
        try {
            const result = await DeleteMovie4(id);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    ChangeMovie: async (req, res) => {
        const id = req.params.id;
        const body = req.body;
        // console.log('im in changemovie');
        try {
            const result = await ChangeMovieDetails4(id, body);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    DeleteComment: async (req, res) => {
        const id = req.params.id;
        // console.log("im in deletecomment");
        try {
            const result = await DeleteComment4(id);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }, 
    ChangeComment: async (req, res) => {
        const id = req.params.id;
        const body = req.body;
        // console.log("im in changecomment");
        try {
            const result = await ChangeComment4(id, body);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }, 
    CommentPost: async (req, res) => {
        const body = req.body;
        // console.log('im in postcomment');
        try {
            const result = await PostComment4(body);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    CommentGet: async (req, res) => {
        const id = req.params.id;
        try {
            // console.log("im in commentget");
            const result = await GetComment4(id);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    MovieGet: async (req, res) => {
        const id = req.params.id;
        try {
            // console.log("im in movieget");
            const result = await GetMovie4(id);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    GenSearchOld: async (req, res) => {
        const pattern = req.params.pattern;
        // console.log('im in gensearchold');
        try {
            const result = await GenSearch4(pattern).then(sortedMovies => SortOld(sortedMovies))
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
        
    },
    GenSearchNew: async (req, res) => {
        const pattern = req.params.pattern;
        // console.log('im in gensearchnew');
        try {
            const result = await GenSearch4(pattern).then(sortedMovies => SortNew(sortedMovies))
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    GenSearch: async (req, res) => {
        const pattern = req.params.pattern;
        // console.log('im in gensearch');
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
        // console.log('im in moviesearchold');
        try {
            const result = await MovieSearch4(pattern).then(sortedMovies => SortOld(sortedMovies))
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    MovieSearchNew: async (req, res) => {
        const pattern = req.params.pattern;
        // console.log('im in moviesearchnew');
        try {
            const result = await MovieSearch4(pattern).then(sortedMovies => SortNew(sortedMovies))
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    MovieSearch: async (req, res) => {
        const pattern = req.params.pattern;
        // console.log('im in moviesearch');
        try {
            const result = await MovieSearch4(pattern);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    GetMine: async (req, res) => {
        // console.log('im in GetMine');
        try {
            const result = await GetMine4();
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    GetActors: async (req, res) => {
        const id = req.params.id;
        try {
            // console.log("im in getactors");
            const result = await GetActors4(id);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    GetGenres: async (req, res) => {
        const id = req.params.id;
        try {
            // console.log("im in getmovies");
            const result = await GetGenres4(id);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    GetDirector: async (req, res) => {
        const id = req.params.id;
        try {
            // console.log("im in getdirector");
            const result = await GetDirector4(id);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};

module.exports = movieController;
