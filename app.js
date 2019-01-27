const bodyParser = require('body-parser')
const express = require('express');
const app = express();
const ShowHelper = require('./ShowHelper');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.post("/", (req, res, next) => {
    let showHelper = new ShowHelper();
    let filteredAndFormattedShows = showHelper.getFilteredAndFormattedShows(req.body);
    res.status(200).send(filteredAndFormattedShows);
});

module.exports = app;