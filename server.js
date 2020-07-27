//Imports the module (express) that I'm using
    //The variable express stores the function call (the library 'express' is pretty much a function) to make an express framework
var express = require('express');

//The express() function makes an object that we call app that lets us use
//the express library (function) 
var app = express();

//Creates a variable called server at port 3000 using the express framework
    //Obviously this variable server represents the server variable
var server = app.listen(3000);

//Tells the express framkework to host the files in public on the server
    //The word "static" hosts static files that do not change from the directory public
    //This line is what makes the server at port 3000 have the code in frogger.js that we want people to play on
app.use(express.static('public'));


console.log("My socket server is running");

//Basically an import statement for socket.io
//Makes the socket variable a function || the library socket.io exists as a big function
var socket = require('socket.io');

//The io variable handles input outputs
    //Made by calling the socket function (which is instantiated above) with the server variable
var io = socket(server);

//Connects to the sockets on the io variable (the io variable pretty much represents the server)
    //Tells the sockets part of the server to listen for a new connection
    //Maybe tells the newConnection function to run continuously (turn on) when a connection is made
io.sockets.on('connection', newConnection);

//Every new socket connection to a server gets automatically assigned an id number
function newConnection(socket) {
    console.log('new connection: ' + socket.id);

    /*
    *Tells the socket to listen for the 'mouse' message
    *triggers the function mouseMsg if there is a message called 'mouse' form the socket
        *For some reason you don't need to tell the socket.on function that the name 'mouse' has data sent with it
        *For some reason that data is automatically passed into the mouseMsg function?
        *Maybe that is just a thing the socket.io library does, it automatically passes the data associated with a
        *  name into the function we make for the name
    */
    socket.on('mouse', mouseMsg);

    function mouseMsg(data) {
        //Includes all the sockets on the server except the socket sending the server.
        socket.broadcast.emit('mouse', data);

        //Includes all the sockets on the server including the client that sent the message
        //io.sockets.emit('mouse', data);
        
        console.log(data);
    }
    
}