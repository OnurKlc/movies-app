const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

// Create MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'moviesdb'
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
const usersRouter = require('./routes/user');
const moviesRouter = require('./routes/movies');
const platformsRouter = require('./routes/platforms');
const genreRouter = require('./routes/genre');
const theatreRouter = require('./routes/theatre');
const ratingRouter = require('./routes/rating');
const ticketsRouter = require('./routes/tickets');

app.use('/users', usersRouter);
app.use('/movies', moviesRouter);
app.use('/platforms', platformsRouter);
app.use('/genre', genreRouter);
app.use('/theatres', theatreRouter);
app.use('/rating', ratingRouter);
app.use('/tickets', ticketsRouter);

const port = 9000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
