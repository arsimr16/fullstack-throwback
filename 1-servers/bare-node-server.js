var http = require('http');
var dogs = require('./helpers/dogs.js');

/*
Your server here! If you need help getting started,
check out the node anatomy of an http transaction documentation.
https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/
*/

var server = http.createServer(function(request, response) {
	const {method, url} = request;
	let body = [];
	request.on('error', (err) => {
		console.log(err);
	}).on('data', chunk => {
		body.push(chunk);
	}).on('end', () => {
		body = Buffer.concat(body).toString();

		response.on('error', (err) => {
			console.log(err);
		});

		if (method === 'GET' && url === '/api/dogs') {
			response.writeHead(200, {'content-type': 'application/json'});
			dogs.getAll(results => response.end(results));

		} else if (method === 'GET' && url === '/api/dogs/:id') {
			response.writeHead(200, {'content-type': 'application/json'});
			// TODO: get id from GET request url
			const id = 'r1-s1Q7rNA';
			response.end(dogs.getOneById(id, results => console.log(results)));

		} else if (method === 'POST' && url === '/api/dogs') {
			response.writeHead(201, {'content-type': 'application/json'});
			// TODO: get name and breed from POST request body
			const name = 'newDog';
			const breed = 'newBreed';
			response.end(dogs.addOne(name, breed, result => callback(result)));

		} else {
			const responseBody = {method, url, body};
			response.end(JSON.stringify(responseBody));
		}
	})
});

server.listen(3000, function() {
  console.log('bare node server listening on port 3000!')
})
