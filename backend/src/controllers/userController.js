exports.getUsers = (req, res) => {
    const { connection } = req;
    const query = `
        SELECT User.username, User.name, User.surname, User.user_type, Director.nation, Director.platform_id, GROUP_CONCAT(Audience_Platform.platform_id) AS platform_ids
        FROM User
        LEFT JOIN Director ON User.username = Director.username
        LEFT JOIN Audience_Platform ON User.username = Audience_Platform.username
        GROUP BY User.username, User.name, User.surname, User.user_type, Director.nation, Director.platform_id
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

    const query = `
        SELECT User.username, User.name, User.surname, User.user_type, Director.nation, Director.platform_id
        FROM User
        LEFT JOIN Director ON User.username = Director.username
        WHERE User.username = ?
    `;

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
    const { username } = req.params;
    const { platform_id } = req.body;

    const query = 'UPDATE Director SET platform_id = ? WHERE username = ?';
    const values = [platform_id, username];

    connection.query(query, values, (err, result) => {
        if (err) {
            console.error('Error updating director: ', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        if (result.affectedRows === 0) {
            res.status(404).send('User not found');
            return;
        }

        res.send('Director updated successfully!');
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

exports.subscribeToPlatform = (req, res) => {
    const { connection } = req;
    let { username, platform_id } = req.body;

    const deleteQuery = 'DELETE FROM Audience_Platform WHERE username = ?';
    const deleteValues = [username];

    connection.query(deleteQuery, deleteValues, (error) => {
        if (error) {
            console.error('Error:', error);
            return res.status(500).json({ message: 'Fail' });
        }

        const queries = platform_id.map((platform_id) => [
            'INSERT INTO Audience_Platform (username, platform_id) VALUES (?, ?)',
            [username, platform_id],
        ]);

        const executeQueries = () => {
            if (queries.length === 0) {
                return res.status(200).json({ message: 'Success' });
            }

            const [query, values] = queries.shift();
            connection.query(query, values, (error) => {
                if (error) {
                    console.error('Error:', error);
                    return res.status(500).json({ message: 'Fail' });
                }

                executeQueries();
            });
        };

        executeQueries();
    })
};
