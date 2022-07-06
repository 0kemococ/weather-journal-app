// Setting up empty JS object to act as endpoint for all routes
projectData = {};

// Express to run server and routes
const express = require('express');

// Starting up an instance of app
const app = express();

/* Dependencies */
const cors = require('cors');
const bodyParser = require('body-parser');

/* Middleware*/
//Configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initializing the main project folder
app.use(express.static('website'));

// Spinning up the server and callback to debug
const port = 3000;
const server = app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

// Initializing all route with a callback function to complete GET '/all'
app.get('/all', (req, res) => {
    res.send(projectData);
    projectData = {};
});

// Post Route
app.post('/add', (req, res) => {
    console.log(req.body);
    projectData['date'] = req.body.date;
    projectData['temp'] = req.body.temp;
    projectData['content'] = req.body.content;
    res.send(projectData);
});