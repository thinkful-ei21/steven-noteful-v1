const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const data = require('../db/notes');
const simDB = require('../db/simDB');
const notes = simDB.initialize(data);

router.get('/', (req, res) => {
	res.json(notes.data);
});

router.get('/:id', (req, res, next) => {
  const theId = req.params.id;
	notes.find(theId)
    .then(item => {
      if(item) {
        res.json(item);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
});

// Post (insert) an item
router.post('/', (req, res, next) => {
  const { title, content } = req.body;

  const newItem = { title, content };
  /***** Never trust users - validate input *****/
  if (!newItem.title) {
    const err = new Error('Missing `title` in request body');
    err.status = 400;
    next(err);
  }

  notes.create(newItem, (err, item) => {
    if (err) {
      return next(err);
    }
    if (item) {
      res.location(`http://${req.headers.host}/notes/${item.id}`).status(201).json(item);
    } else {
      next();
    }
  });
});

const exists = function(id) {
	for(let i=0; i<data.length; i++) {
		if(data[i] === id) {
			return true;
		}
	}
	return false;
}

router.delete('/:id', (req, res) => {
	notes.delete(req.params.id, (err) => {
    if(err) {
      return next(err);
    }
    res.sendStatus(204);
	});
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