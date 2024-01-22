const express = require('express');
const cors = require('cors');
const routes = require('./routes/routes');
const app = express();

app.use(express.json());

const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:3000/add-movie', 'http://localhost:3000/admin', 'http://localhost:3000/delete-movie/:id','http://localhost:3000/patch-movie/:id]', 'http://localhost:3000/delete-comment/:id', 'http://localhost:3000/movie-comment/:id', 'http://localhost:3000/movie-comment'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use('/', routes);

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
