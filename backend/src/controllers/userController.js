exports.getUsers = (req, res) => {
    const { connection } = req;
    const query = `
        SELECT User.username, User.name, User.surname, User.user_type, Director.nation, Director.platform_id
        FROM User
        LEFT JOIN Director ON User.username = Director.username
    `;

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error executing the query: ', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        res.json(results);
    });
};

exports.loginUser = (req, res) => {
    const { connection } = req;
    const { username, password } = req.body;

    const query = 'SELECT * FROM User WHERE username = ? AND password = ?';
    const values = [username, password];

    connection.query(query, values, (err, results) => {
        if (err) {
            console.error('Error executing the query: ', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        if (results.length === 0) {
            res.status(401).send('Invalid credentials');
            return;
        }

        res.json(results);
    });
};

exports.createItem = (req, res) => {
    const { connection } = req;
    const { username, password, name, surname, user_type, nation, platform_id } = req.body;
    const userQuery = 'INSERT INTO User (username, password, name, surname, user_type) VALUES (?, ?, ?, ?, ?)';
    const userValues = [username, password, name, surname, user_type];

    connection.query(userQuery, userValues, (err, result) => {
        if (err) {
            console.error('Error executing the query: ', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        if (user_type === 'director') {
            const directorQuery = 'INSERT INTO Director (username, nation, platform_id) VALUES (?, ?, ?)';
            const directorValues = [username, nation, platform_id];

            connection.query(directorQuery, directorValues, (directorErr, directorResult) => {
                if (directorErr) {
                    console.error('Error creating director: ', directorErr);
                    res.status(500).send('Internal Server Error');
                    return;
                }

                console.log('New director created!');
                res.send('Director created successfully!');
            });
        } else {
            console.log('New user inserted!');
            res.send('User inserted successfully!');
        }
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
