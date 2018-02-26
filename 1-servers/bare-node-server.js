var http = require('http');
var dogs = require('./helpers/dogs.js');
var fs = require('fs');

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

		if (method === 'GET' && /\/api\/dogs\/[^/]+$/.test(url)) {
			response.writeHead(200, {'content-type': 'application/json'});
			const id = url.match(/[^/]+$/)[0];
			dogs.getOneById(id, results => response.end(results));

		} else if (method === 'GET' && url.includes('/api/dogs')) {
			response.writeHead(200, {'content-type': 'application/json'});
			dogs.getAll(results => response.end(results));

		} else if (method === 'POST' && url.includes('/api/dogs')) {
			response.writeHead(201, {'content-type': 'application/json'});
			body = JSON.parse(body);
			const {name, breed} = body;
			response.end(dogs.addOne(name, breed, result => callback(result)));

		// } else if (method === 'GET' && url.includes('/style.css')) {
		// 	fs.readFile('index.html', function (err, data) {
	 //      response.writeHead(200, {'Content-Type': 'text/css'});
	 //      response.write(data);
	 //      response.end();
	 //   	});

		// } else if (method === 'GET' && url === '/') {
		// 	fs.readFile('style.css', function (err, data) {
	 //      response.writeHead(200, {'Content-Type': 'text/html'});
	 //      response.write(data);
	 //      response.end();
	 //   	});

		} else {
			response.statusCode = 404;
			response.end();
		}
	})
});

server.listen(3000, function() {
  console.log('bare node server listening on port 3000!')
})
