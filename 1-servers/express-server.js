var express = require('express');
var dogs = require('./helpers/dogs.js');
var bodyParser = require('body-parser');

/*
Your server here! If you need help getting started,
check out the express hello world documentation.
https://expressjs.com/en/starter/hello-world.html
*/

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(3000, () => console.log('Example app listening on port 3000!'));

app.get('/api/dogs', (req, res) => {
  dogs.getAll(results => {
  	// console.log(results);
  	// res.json(results);
  	// res.type('application/json');
  	res.set('content-type', 'application/json');
  	res.send(results);
  });
});

app.get('/api/dogs/:id', (req, res) => {
	dogs.getOneById(req.params.id, result => res.send(result));
});

app.post('/api/dogs', (req, res) => {
	dogs.addOne(req.body.name, req.body.breed, () => res.sendStatus(201));
});