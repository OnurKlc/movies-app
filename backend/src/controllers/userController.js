exports.getUsers = (req, res) => {
    const { connection } = req;

    connection.query('SELECT * FROM User', (err, results) => {
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
    const { username, password, name, surname, user_type } = req.body;
    const query = 'INSERT INTO User (username, password, name, surname, user_type) VALUES (?, ?, ?, ?, ?)';
    const values = [username, password, name, surname, user_type];

    connection.query(query, values, (err, result) => {
        if (err) {
            console.error('Error executing the query: ', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        console.log('New user inserted!');
        res.send('User inserted successfully!');
    });
};

exports.getItem = (req, res) => {
    const { connection } = req;
    const { username } = req.params;

    const query = 'SELECT * FROM User WHERE username = ?';
    const values = [username];

    connection.query(query, values, (err, results) => {
        if (err) {
            console.error('Error executing the query: ', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        if (results.length === 0) {
            res.status(404).send('User not found');
            return;
        }

        res.json(results[0]);
    });
};

exports.updateItem = (req, res) => {
    const { connection } = req;
    const { id } = req.params;
    const { username, password, name, surname, user_type } = req.body;

    const query = 'UPDATE User SET username = ?, password = ?, name = ?, surname = ?, user_type = ? WHERE id = ?';
    const values = [username, password, name, surname, user_type, id];

    connection.query(query, values, (err, result) => {
        if (err) {
            console.error('Error executing the query: ', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        if (result.affectedRows === 0) {
            res.status(404).send('User not found');
            return;
        }

        console.log('User updated!');
        res.send('User updated successfully!');
    });
};

exports.deleteItem = (req, res) => {
    const { connection } = req;
    const { username } = req.params;

    const query = 'DELETE FROM User WHERE username = ?';
    const values = [username];

    connection.query(query, values, (err, result) => {
        if (err) {
            console.error('Error executing the query: ', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        if (result.affectedRows === 0) {
            res.status(404).send('User not found');
            return;
        }

        console.log('User deleted!');
        res.send('User deleted successfully!');
    });
};
