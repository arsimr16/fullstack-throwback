function assert (actual, expected) {
  if ( expected !== actual ) {
    throw new Error(`Assertion Failed!\nExpected: ${expected}\nActual: ${actual}`)
  }
}

//
// Exercise #1: Network Simulation
//
// Using the DataAPI.Callback "Easy API" (in data.js),
// implement playerStats to run the `callback` parameter with the following type:
//
// Array({ playerId: Number, playerName: String, winCount: Number })
//
// NOTE: See data.js for the actual data you are working with.
// HINT: Feel free to copy/paste any functions you used in Core 4 Exercise!
//

/*
console.log("[Async Exercise #1]")

function playerStats (callback) {
  var API = DataAPI.Callback;

  API.getAllPlayers(function (players) {
    // TODO: Implement the rest of this function
    callback('TODO')
  });
}

//
// Tests
//
playerStats(function (stats) {
  assert( stats.length, 4 );

  assert( stats.find( s => s.playerId === 10 ).playerName, "Alice" );
  assert( stats.find( s => s.playerId === 10 ).winCount, 6 );

  assert( stats.find( s => s.playerId === 11 ).playerName, "Bob" );
  assert( stats.find( s => s.playerId === 11 ).winCount, 10 );

  assert( stats.find( s => s.playerId === 12 ).playerName, "Carly" );
  assert( stats.find( s => s.playerId === 12 ).winCount, 12 );

  assert( stats.find( s => s.playerId === 13 ).playerName, "Dan" );
  assert( stats.find( s => s.playerId === 13 ).winCount, 13 );
  console.log("[Async Exercise #1] All good!");
});
*/

//
// Exercise #2: Hard mode
//
// Using the DataAPI.Callback "Realistic API", re-implement the same functionality
// from Exercise #1, without using any of the "Easy API".
//
// Use DataAPI.Promise instead of DataAPI.Callback. Example difference:
//
//    DataAPI.Callback.getPlayerById( player.id, function (player) {
//      // etc.
//    })
//
// --- VS ---
//
//    DataAPI.Promise.getPlayerById( player.id )
//      .then(function (player) {
//        // etc.
//      })
//
// The main benefit you would gain from using the DataAPI.Promise is
// the ability to take advantage of Promise.all.
//
// NOTE: Completing this exercise with DataAPI.Callback is extra credit.
//

console.log("[Async Exercise #2]");

function playerStats2 (playerIds, callback) {
  var API = DataAPI.Promise;

  Promise.all(
    playerIds.map(playerId => {
      API.getPlayerGames(playerId)
        .then(games => {
          playerWins = games.filter(game => {
            const winnerId = game.player1_score === 100 ? game.player1_id : game.player2_id;
            return playerId === winnerId;
          });
          return [playerId, playerWins.length];
        })
        .then(results => {
          API.getPlayerById(results[0]).then(player => {
            console.log({playerId: player.id, playerName: player.name, winCount: results[1]});
          });
        });
    }))
    .then(results => console.log(results));
}

playerStats2([10,11,12,13], function (stats) {
  assert( stats.length, 4 );

  assert( stats.find( s => s.playerId === 10 ).playerName, "Alice" );
  assert( stats.find( s => s.playerId === 10 ).winCount, 6 );

  assert( stats.find( s => s.playerId === 11 ).playerName, "Bob" );
  assert( stats.find( s => s.playerId === 11 ).winCount, 10 );

  assert( stats.find( s => s.playerId === 12 ).playerName, "Carly" );
  assert( stats.find( s => s.playerId === 12 ).winCount, 12 );

  assert( stats.find( s => s.playerId === 13 ).playerName, "Dan" );
  assert( stats.find( s => s.playerId === 13 ).winCount, 13 );
  console.log("[Async Exercise #2] All good!");
});
