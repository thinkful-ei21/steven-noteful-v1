const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const data = require('../db/notes');

router.get('/', (req, res) => {
	res.json(data);
});

const findNote = function(id) {
	// console.log(`the ID being "found": ${id}, and typeof: ${typeof id}`);
	for(let i=0; i<data.length; i++) {
		// console.log(`"data" note ID: ${data[i].id}, and typeof: ${typeof data[i].id}`);
		if(id == data[i].id) {
			return data[i];
		}
	}
	return {error: "ID not found"};
};

router.get('/:id', (req, res) => {
	res.json(findNote(req.params.id));
});

router.get('/boom', (req, res, next) => {
  throw new Error('Boom!!');
});

router.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.status(404).json({ message: 'Not Found' });
});

router.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

module.exports = router;