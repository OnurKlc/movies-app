exports.getMovies = (req, res) => {
    const { connection } = req;

    connection.query('SELECT * FROM movies', (err, results) => {
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
    const { movie_id, movie_name, director, theatreId, timeSlot, duration, date }  = req.body;
    const query = 'INSERT INTO Movie (movie_id, movie_name, director, theatreId, timeSlot, duration, date) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [movie_id, movie_name, director, theatreId, timeSlot, duration, date];

    connection.query(query, values, (err, result) => {
        if (err) {
            console.error('Error executing the query: ', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        console.log('New movie inserted!');
        res.send('Movie inserted successfully!');
    })
};

exports.getItem = (req, res) => {

};

exports.updateItem = (req, res) => {

};

exports.deleteItem = (req, res) => {

};
