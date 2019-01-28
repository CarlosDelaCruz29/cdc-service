const bodyParser = require('body-parser')
const express = require('express');
const app = express();
const ShowHelper = require('./src/ShowHelper');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

// Handle the POST request sent to this service
app.post("/", (req, res, next) => {
    
    // initialize ShowHelper
    let showHelper = new ShowHelper();

    // get a filtered and formatted array of the shows
    let filteredAndFormattedShows = showHelper.getFilteredAndFormattedShows(req.body);

    // return the array if it exists (no errors in JSON)
    if (filteredAndFormattedShows) {
        res.status(200).send({
            response: filteredAndFormattedShows
        });
    } else {
        next();
    }
});

// catches the errors that go past POST
app.use((req, res, next) => {
    const error = new Error();

    // set the status to 400 (Bad Requests)
    error.status = 400;
    next(error);
});

// handles the errors and returns error data
app.use((error, req, res, next) => {
    // error message to be sent
    let errorMessage = "Could not decode request: JSON parsing failed";
    res.status(error.status);
    res.json({
        error: errorMessage
    });
});

module.exports = app;