const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

// Create MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'test'
});

// Connect to MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL');
    }
});

// Create Express app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    req.connection = connection;
    next();
});

// Routes
// const indexRouter = require('./routes/index');
const usersRouter = require('./routes/user');
// const itemsRouter = require('./routes/items');

// app.use('/', indexRouter);
app.use('/users', usersRouter);
// app.use('/items', itemsRouter);

const port = 9000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
