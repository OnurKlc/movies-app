exports.getRating = (req, res) => {
    const { connection } = req;
    const { movie_id, username } = req.params;

    const query = `
        SELECT *
        FROM Rating
        WHERE movie_id = ? AND username = ?
    `;
    const values = [movie_id, username];

    connection.query(query, values, (err, results) => {
        if (err) {
            console.error('Error executing the query: ', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        if (results.length === 0) {
            res.status(200).send('Rating not found');
            return;
        }

        res.json(results);
    });
};


exports.rateMovie = (req, res) => {
    const { connection } = req;
    const { rating_value, movie_id, username } = req.body;

    // Check if the user has already rated the movie
    const checkQuery = `
        SELECT *
        FROM Rating
        WHERE movie_id = ? AND username = ?
    `;
    const checkValues = [movie_id, username];

    connection.query(checkQuery, checkValues, (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            if (results.length > 0) {
                // User has already rated the movie
                res.status(400).json({ error: 'User has already rated the movie' });
            } else {
                // Insert the new rating
                const insertQuery = `
                    INSERT INTO Rating (rating_value, movie_id, username)
                    VALUES (?, ?, ?)
                `;
                const insertValues = [rating_value, movie_id, username];

                connection.query(insertQuery, insertValues, (error, results) => {
                    if (error) {
                        console.error('Error executing query:', error);
                        res.status(500).json({ error: 'Internal Server Error' });
                    } else {
                        // Update the average rating in the Movie table
                        const updateQuery = `
                            UPDATE Movie AS m
                            SET avg_rating = (
                                SELECT AVG(rating_value)
                                FROM Rating
                                WHERE movie_id = ?
                            )
                            WHERE m.movie_id = ?
                        `;
                        const updateValues = [movie_id, movie_id];

                        connection.query(updateQuery, updateValues, (error) => {
                            if (error) {
                                console.error('Error updating average rating:', error);
                                res.status(500).json({ error: 'Internal Server Error' });
                            } else {
                                res.json({ message: 'Rating submitted successfully' });
                            }
                        });
                    }
                });
            }
        }
    });
};

