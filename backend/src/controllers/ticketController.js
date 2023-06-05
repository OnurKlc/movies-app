exports.getItems = (req, res) => {
    const { connection } = req;

    connection.query('SELECT * FROM Theatre', (err, results) => {
        if (err) {
            console.error('Error executing the query: ', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        res.json(results);
    });
};


exports.buyTicket = (req, res) => {
    const { connection } = req;
    const { username, movie_id } = req.body;

    // Check if the user has watched all predecessor movies
    const checkQuery = `
        SELECT COUNT(*) AS missing_predecessors
        FROM Movie
        LEFT JOIN Audience_Movie ON Movie.predecessor_id = Audience_Movie.movie_id
        WHERE Movie.movie_id = ? AND (Movie.predecessor_id IS NULL OR Audience_Movie.username = ?)
    `;

    // Insert the ticket purchase record
    const insertQuery = `
        INSERT INTO Audience_Movie (username, movie_id)
        VALUES (?, ?)
    `;
    const values = [username, movie_id, movie_id, username, movie_id];

    connection.beginTransaction((err) => {
        if (err) {
            console.error('Error starting database transaction: ', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        connection.query(checkQuery, [movie_id, username], (err, results) => {
            if (err) {
                console.error('Error executing the query: ', err);
                connection.rollback(() => {
                    res.status(500).send('Internal Server Error');
                });
                return;
            }

            const missingPredecessors = results[0].missing_predecessors;
            if (missingPredecessors > 0) {
                connection.rollback(() => {
                    res.status(400).send('You must watch all predecessor movies before purchasing this ticket.');
                });
                return;
            }

            connection.query(insertQuery, [username, movie_id], (err, results) => {
                if (err) {
                    console.error('Error executing the query: ', err);
                    connection.rollback(() => {
                        res.status(500).send('Internal Server Error');
                    });
                    return;
                }

                connection.commit((err) => {
                    if (err) {
                        console.error('Error committing the transaction: ', err);
                        connection.rollback(() => {
                            res.status(500).send('Internal Server Error');
                        });
                        return;
                    }

                    res.status(200).send('Ticket purchased successfully.');
                });
            });
        });
    });
};
