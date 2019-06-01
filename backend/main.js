var app = require('express')();
var Room = require('./room');

/* var allowedOrigins = "http://localhost:* http://127.0.0.1:*";
var path ='/stomp'; // you need this if you want to connect to something other than the default socket.io path
 */
const port = 5000;

// Running array of all open rooms
let rooms = [];

var server = app.listen(port, () => {
    console.log('Server running on port: ' + port);
    var room = new Room('1', server);
    rooms.push(room);
});

/***************************************
* Takes in ID for room number and checks
* if room exists. If not respond with error
* if not. Frontend should send user back
* to main menu and/or prompt to log in
***************************************/
app.get('/checkExists/:id', function(req, res) {
  if ( checkAvailable(req.params.id)) {
    res.send('!exists');
  } else {
    res.send('exists');
  }
});

/***************************************
* Creates a new room and returns info
* about the room including the room's id 
***************************************/
app.get('/createRoom/:id', function(req,res) {
  // If id is available create room
  if ( checkAvailable(req.params.id)) {
    var room = new Room(req.params.id, server);
    rooms.push(room);
  } else {
    res.send('Error: Room ID not available');
  }
});

// TODO: Set up call that removes room
app.get('/removeRoom/:id', function(req,res) {

});

/************************************** 
* Iterates through all of the rooms open
* and checks that ID is available.
**************************************/
function checkAvailable(id) {
  rooms.forEach((room) => {
    if ( room.getId() == id) {
      return false;
    }
  })
  return true;
}