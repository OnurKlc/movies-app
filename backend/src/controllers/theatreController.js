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


exports.createItem = (req, res) => {
    const { connection } = req;
    const { name, capacity, district } = req.body;

    const query = `
        INSERT INTO Theatre (name, capacity, district)
        VALUES (?, ?, ?)
    `;
    const values = [name, capacity, district];

    // Execute the query
    connection.query(query, values, (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json({ message: 'Theater created successfully' });
        }
    });
};
