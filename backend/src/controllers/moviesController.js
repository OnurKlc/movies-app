exports.getMovies = (req, res) => {
    const { connection } = req;

    const query = `SELECT * FROM Movie`;

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error executing the query: ', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        res.json(results);
    });
};

exports.createItem = (req, res) => {
    const { connection } = req;
    const { director, movie_name, duration, theatre_id, avg_rating, predecessor_id, genres, timeslot, date } = req.body;

    const movieQuery = 'INSERT INTO Movie (director, movie_name, duration, theatre_id, avg_rating, predecessor_id, timeslot, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    connection.query(movieQuery, [director, movie_name, duration, theatre_id, avg_rating, predecessor_id, timeslot, date], (error, results) => {
        if (error) {
            console.error('Error creating movie:', error);
            return res.status(500).json({ message: 'Failed to create movie' });
        }

        const movieId = results.insertId;
        const genreQueries = genres.map((genre_id) => [
            'INSERT INTO Movie_Genre (genre_id, movie_id) VALUES (?, ?)',
            [genre_id, movieId],
        ]);

        const executeGenreQueries = () => {
            if (genreQueries.length === 0) {
                return res.status(200).json({ message: 'Movie created successfully' });
            }

            const [genreQuery, genreValues] = genreQueries.shift();
            connection.query(genreQuery, genreValues, (error) => {
                if (error) {
                    console.error('Error creating movie genres:', error);
                    return res.status(500).json({ message: 'Failed to create movie genres' });
                }

                executeGenreQueries();
            });
        };

        executeGenreQueries();
    });
};

exports.getItem = (req, res) => {
    const { connection } = req;
    const { id } = req.params;

    const query = `
        SELECT Movie.*, Genre.*
        FROM Movie
        INNER JOIN Movie_Genre ON Movie.movie_id = Movie_Genre.movie_id
        INNER JOIN Genre ON Movie_Genre.genre_id = Genre.genre_id
        WHERE Movie.movie_id = ?
    `;
    const values = [id];

    connection.query(query, values, (err, results) => {
        if (err) {
            console.error('Error executing the query: ', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        if (results.length === 0) {
            res.status(404).send('Movie not found');
            return;
        }

        const movie = results[0]
        movie.genres = results.map((row) => row.genre_id)

        res.json(movie);
    });
};

exports.updateItem = (req, res) => {
    const { connection } = req;
    const { id } = req.params;
    const { director, movie_name, duration, theatre_id, avg_rating, predecessor_id, genres, timeslot, date } = req.body;

    const movieQuery = 'UPDATE Movie SET director = ?, movie_name = ?, duration = ?, theatre_id = ?, avg_rating = ?, predecessor_id = ?, timeslot = ?, date = ? WHERE movie_id = ?';
    connection.query(movieQuery, [director, movie_name, duration, theatre_id, avg_rating, predecessor_id, timeslot, date, id], (error, results) => {
        if (error) {
            console.error('Error creating movie:', error);
            return res.status(500).json({ message: 'Failed to create movie' });
        }

        const deleteGenresQuery = 'DELETE FROM Movie_Genre WHERE movie_id = ?';
        const deleteGenresValues = [id];

        connection.query(deleteGenresQuery, deleteGenresValues, (error) => {
            if (error) {
                console.error('Error deleting movie-genre associations:', error);
                return res.status(500).json({ message: 'Failed to update the movie genres' });
            }

            const genreQueries = genres.map((genre_id) => [
                'INSERT INTO Movie_Genre (genre_id, movie_id) VALUES (?, ?)',
                [genre_id, id],
            ]);

            const executeGenreQueries = () => {
                if (genreQueries.length === 0) {
                    return res.status(200).json({ message: 'Movie created successfully' });
                }

                const [genreQuery, genreValues] = genreQueries.shift();
                connection.query(genreQuery, genreValues, (error) => {
                    if (error) {
                        console.error('Error creating movie genres:', error);
                        return res.status(500).json({ message: 'Failed to create movie genres' });
                    }

                    executeGenreQueries();
                });
            };

            executeGenreQueries();
        })
    });
};

exports.deleteItem = (req, res) => {
    const { connection } = req;
    const { id } = req.params;

    const query = 'DELETE FROM Movie WHERE movie_id = ?';
    const values = [id];

    connection.query(query, values, (err, result) => {
        if (err) {
            console.error('Error executing the query: ', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        if (result.affectedRows === 0) {
            res.status(404).send('Movie not found');
            return;
        }

        console.log('Movie deleted!');
        res.send('Movie deleted successfully!');
    });
};
