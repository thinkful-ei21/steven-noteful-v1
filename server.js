'use strict';

const express = require('express');
const morgan = require('morgan');

const app = express();
// modularized file for REST requests
const notesRouter = require('./routers/notesRouter');

const { PORT } = require('./config');

app.use(morgan(':date[web] :url :method :status'));

app.use(express.static('public'));

app.use(express.json());

app.use('/api/notes', notesRouter);

app.listen(PORT , function() {
	console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
	console.error(err);
});

console.log('Hello Noteful!');
