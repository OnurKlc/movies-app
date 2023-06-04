exports.getItems = (req, res) => {
    const { connection } = req;

    connection.query('SELECT * FROM Genre', (err, results) => {
        if (err) {
            console.error('Error executing the query: ', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        res.json(results);
    });
};
