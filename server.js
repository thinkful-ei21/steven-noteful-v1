'use strict';

const express = require('express');
// Load array of notes
const data = require('./db/notes');

const app = express();

// ADD STATIC SERVER HERE

app.listen(8080, function() {
	console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
	console.error(err);
});

app.get('/api/notes', (req, res) => {
	res.json(data);
});

const findNote = function(id) {
	console.log(`the ID being "found": ${id}, and typeof: ${typeof id}`);
	for(let i=0; i<data.length; i++) {
		console.log(`"data" note ID: ${data[i].id}, and typeof: ${typeof data[i].id}`);
		if(id == data[i].id) {
			return data[i];
		}
	}
	return {error: "ID not found"};
};

app.get('/api/notes/:id', (req, res) => {
	// console.log(1002 == req.params.id);
	res.json(findNote(req.params.id));
});

console.log('Hello Noteful!');

// INSERT EXPRESS APP CODE HERE...
