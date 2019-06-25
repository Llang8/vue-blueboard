var app = require('express')();
var Room = require('./room');

/* var allowedOrigins = "http://localhost:* http://127.0.0.1:*";
var path ='/stomp'; // you need this if you want to connect to something other than the default socket.io path
 */
const port = 5550;

// Running array of all open rooms
let rooms = [];

// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Pass to next layer of middleware
  next();
});

var server = app.listen(process.env.PORT || 5000, () => {
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
  if ( checkExists(req.params.id)) {
    console.log('exists')
    res.send('exists');

  } else {
    console.log('!exists')
    res.send('!exists');
  }
});

/***************************************
* Creates a new room and returns info
* about the room including the room's id 
***************************************/
app.get('/createRoom/:id', function(req,res) {
  // If id is available create room

  console.log(rooms);
  if ( !checkExists(req.params.id)) {
    var room = new Room(req.params.id, server);
    rooms.push(room);
    res.send('Room created');
  } else {
    res.send('Error: Room ID not available');
  }
});

// TODO: Set up call that removes room
app.get('/removeRoom/:id', function(req,res) {

});

/************************************** 
* Iterates through all of the rooms open
* and checks if ID already exists
**************************************/
function checkExists(id) {
  for( var i = 0; i < rooms.length; i++ ){
    if(rooms[i].getId() == id) {
      return true;
    }
  }
  return false;
}