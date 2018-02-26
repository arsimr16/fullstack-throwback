## Q1. Why do the functions in helpers need to take a callback?

Once we get the result, we need to do something with that result.

## Q2. How did you test the getAll function in `helpers/dogs.js`?

I couldn't run the file with node, so the only way to test it I could think of was to implement a route that called that function on the server and test that route with a Postman request.

## Q3. How did you test the addOne function in `helpers/dogs.js`?

I added an endpoint on the server and hardcoded the arguments for the addOne function.

## Q4. What are the four non-pending tests in `spec/serverSpec.js` testing?

They are testing that endpoints on the server are returning the correct status codes and responses

## Q5. Why do we need to set headers on a response? 

To indicate what type of data the response contains

## Q6. Will the tests make requests to the literal url '/api/dogs/:id', or will it look slightly different? If different, how?

The ':id' part is a variable and it will include the id of a dog.

## Q7. How can you tell when a request is made to /api/dogs/:id instead of /api/dogs, and how will you access the id? 

I can use a regular expression to see if there is anything after '/api/dogs/' and if there is, I can capture that in a variable.

## Q8. What should you expect to be on the request body for a POST To /api/dogs? How do you access the request body in bare node?

There should be a JSON object with a name and breed property.  To access the request body, you need to turn the buffer into a string.

## Q9. Do you need to write your own headers for this route? Why or why not?

The default content type is text so it needs to be changed to application/json

## Q10. Is there an easier way to handle the :id in express? (hint: look up route parameters)

Yes, the built-in req.params is able to recognize anything in the url that starts with : as a variable.

# Q11. How do you think the body-parser module works? 

It allows express to parse the body of an HTTP request.  I assume it works like a JSON parser.  It knows that the body starts after a blank line.

# Q12. Which body-parser method did you use? Why are there different types of body-parsers? 

I used the body-parser json method because I knew that the body contained JSON data.  There are different types of body-parsers to use when you expect the data on the req body to have different types.

# Q13. What major differences do you see between bare node and express? Which do you prefer and why?

Express is an abstraction layer on top of bare node.  They basically do all the same things, but express hides a lot of the boiler plate code.  Express is to node as jQuery is to manipulating the DOM with vanilla JS.  I prefer Express because it's easier to use and requires a lot less code (less chances to mess something up).

# Q14. When do you need to use req.on('data') and why?

req.on('data') is an event handler and triggers some action after some asynchronous code has returned results.

# Q15. What happens if the client (or the test or postman) doesn't get a response to a request?

There is a request timeout after some amount of time (2000 milliseconds for the tests).

# Q16. What's the difference between res.end, res.send, and res.json?

res.end in bare node signifies the end of a server handling a request.  You can write the response beforehand or as an argument to res.end.  res.send the equivalent used in express.  res.json is like res.send, but it automatically sets the content-type to application/json.

# Q17. We didn't handle static file serving in the bare minimum requirements. What's an example of a static file, and what does it mean to "serve" it?

static files or static assets are files like the index.html or style.css.  Serving them means sending them in a response to a GET request so that they can be parsed and displayed in the browser.


