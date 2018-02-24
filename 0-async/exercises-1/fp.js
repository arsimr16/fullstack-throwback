function assert (actual, expected) {
  if ( expected !== actual ) {
    throw new Error(`Assertion Failed!\nExpected: ${expected}\nActual: ${actual}`)
  }
}

// Exercise #1
//
// Use find, filter, and map to abstract away all the
// tedious `for` loops in the following code.
//
// NOTE: See data.js for the actual data you are working with.

console.log("[Exercise #1]")

// Finds all games by alice that were won by 50 points or more.
function findDominatingAliceGameScores () {

  // First find alice
  var alice = Data.players.find(function hasNameAlice(person){
     return person.name === 'Alice';
  });

  // Next, find all games where Alice won
  var aliceGames = Data.games.filter(game => {
    return game.player1_id === alice.id && game.player1_score === 100 ||
      game.player2_id === alice.id && game.player2_score === 100;
  });

  // Next, filter for dominating games and add differences
  var dominating = aliceGames.map(game => {
    var difference = Math.abs(game.player1_score - game.player2_score);
    return difference;
  }).filter(difference => {
    return difference >= 50;
  });

  return dominating.sort()
}



// Tests
var testRun = findDominatingAliceGameScores();
assert( testRun.length, 2 );
assert( testRun[0], 57 );
assert( testRun[1], 97 );
console.log("All good!");


// Exercise #2
//
// 1. Copy/paste your function down here and name it findDominatingAliceGameScores2.
// 2. Extract the callbacks you pass into map and filter into their own functions.
//    You'll find a couple written for you.
//    NOTE: The functions below should RETURN FUNCTIONS that will be used as callbacks.
// 3. Refactor your findDominatingAliceGameScores2 to use your new functions.
// 4. Rename `hasName` to `propEq` and refactor it to be more flexible. Example use:
//
//      var hasNameAlice = propEq('name', 'Alice')
//      hasNameAlice({ id: 10, name: 'Alice' }) //=> true
//      hasNameAlice({ id: 11, name: 'Bob'   }) //=> false

function findDominatingAliceGameScores2 () {

  var alice = Data.players.find(propEq('name', 'Alice'));

  var aliceGames = Data.games.filter(isWinningGameFor(alice.id));

  var dominating = aliceGames
    .map(game => toPlayerScoreDifference(game))
    .filter(amount => greaterThanOrEqualTo(amount));

  return dominating.sort()
}

function propEq (prop, val) {
  return function (person) {
    return person[prop] === val;
  };
}

function isWinningGameFor (playerId) {
  return function (game) {
    return game.player1_id === playerId && game.player1_score === 100
        || game.player2_id === playerId && game.player2_score === 100;
  };
}

function toPlayerScoreDifference (game) {
  return Math.abs(game.player1_score - game.player2_score);
}

function greaterThanOrEqualTo (amount) {
  return amount >= 50;
}

console.log("[Exercise #2]")

// Tests
var testRun2 = findDominatingAliceGameScores2();
assert( testRun2.length, 2 );
assert( testRun2[0], 57 );
assert( testRun2[1], 97 );
console.log("All good!");

// Exercise #3
//
// WARNING: THIS IS A DIFFICULT TASK
//
// Write a function that returns the following type for a given clan id:
//
//   { clanId: Number, winCount: Number, strongWinCount: Number }
//
// where strongWinCount is any winning clan game with a point difference greater than 35.
//
// You should only calculate games that are against other clans,
// i.e. games that are not between two members of the given clan.
// Hint: Array.prototype.some might be useful in your solution :)

function clanStats (clanName) {
  var clan = Data.clans.find(propEq('name', clanName));
  var clanId = clan.id;

  var clanWins = Data.games.filter(game => {
    var winner = game.player1_score === 100 ? game.player1_id : game.player2_id;
    var loser = game.player1_score !== 100 ? game.player1_id : game.player2_id;
    return isMemberOfClan(winner, clanId) && !isMemberOfClan(loser, clanId);
  });

  var strongWins = clanWins
    .map(game => toPlayerScoreDifference(game))
    .filter(amount => amount >= 35);

  var winCount = clanWins.length;
  var strongWinCount = strongWins.length;
  
  return {clanId, winCount, strongWinCount};
}

// Helper function
function isMemberOfClan (playerId, clanId) {
  return !! Data.memberships.find(mem => {
    return mem.player_id === playerId && mem.clan_id === clanId;
  });
}

// function isMemberOfClan (clanId) {
//   return function (playerId) {
//     return !! Data.memberships.find( mem =>
//       mem.player_id === playerId && mem.clan_id === clanId
//     );
//   }
// }

console.log("[Exercise #3]");

// Tests
var testRun3 = clanStats('Iron Rockstars');
assert( testRun3.clanId, 20 );
assert( testRun3.winCount, 15 );
assert( testRun3.strongWinCount, 11 );

var testRun4 = clanStats('24k Ninjas');
assert( testRun4.clanId, 21 );
assert( testRun4.winCount, 17 );
assert( testRun4.strongWinCount, 12 );
console.log("All good!");
