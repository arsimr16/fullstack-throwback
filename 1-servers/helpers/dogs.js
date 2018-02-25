var fs = require('fs'); // NOTE: You may NOT use any of the SYNC versions of fs.s
var shortid = require('shortid');
var dogDataFile = __dirname + '/../data/dogs.txt';

var getAll = function(callback) {
  fs.readFile(dogDataFile, (err, data) => {
    if (err) throw err;
    data = data.toString().split('\n');
    data.pop();
    data = data.map(dog => {
      dog = dog.split(', ');
      return {name: dog[0], breed: dog[1], id: dog[2]};
    });
    callback(JSON.stringify(data));
  });
}


var getOneById = function(id, callback) {
  fs.readFile(dogDataFile, (err, data) => {
    if (err) throw err;
    data = data.toString().split('\n');
    let dog = data.find(result => result.includes(id));
    dog = dog.split(', ');
    callback(JSON.stringify({name: dog[0], breed: dog[1], id: dog[2]}));
  });
}

var addOne = function(name, breed, callback) {
  const dog = `${name}, ${breed}, ${shortid.generate()}\n`
  fs.open(dogDataFile, 'a', (err, fd) => {
    if (err) throw err;
    fs.write(fd, dog, err => {
      if (err) throw err;
      fs.close(fd, () => console.log('successfully wrote to file'));
    });
  });
}

module.exports.getAll = getAll;
module.exports.getOneById = getOneById;
module.exports.addOne = addOne;
