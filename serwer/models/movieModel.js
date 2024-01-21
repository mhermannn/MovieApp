class Movie {
    constructor({ id, title, poster_path, releaseYear, genres, actors, directors, images, overview, count, avg, amountOfRatings, isMine = false, comments, gallery, trailer, poster_path="" }) {
        this.id = id;
        this.title = title;
        this.releaseYear = releaseYear;
        this.genres = genres || [];
        this.actors = actors || [];
        this.directors = directors || [];
        this.images = images || [];
        this.overview = overview || '';
        this.vote_count = count || 0;
        this.vote_average = avg || 0;
        this.amountOfRatings = amountOfRatings || 0;
        this.isMine = isMine;
        this.comments = isMine ? [] : comments;
        this.gallery = isMine ? [] : gallery;
        this.trailer = isMine ? "" : trailer;
        this.poster_path = isMine ? '' : `https://image.tmdb.org/t/p/w500${poster_path}?api_key=f47b9f8a9c3382dcf52205a038f8a1fd`
        this.link = isMine ? '' : `https://www.themoviedb.org/movie/${id}`;
    }   
}

module.exports = Movie;