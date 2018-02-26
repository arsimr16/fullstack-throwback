var express = require('express');
var dogs = require('./helpers/dogs.js');

/*
Your server here! If you need help getting started,
check out the express hello world documentation.
https://expressjs.com/en/starter/hello-world.html
*/

const app = express();

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(3000, () => console.log('Example app listening on port 3000!'));

app.get('/api/dogs', (req, res) => {
  dogs.getAll(results => {
  	console.log(results);
  	// res.json(results);
  	// res.type('application/json');
  	res.set('content-type', 'application/json');
  	res.send(results);
  });
});