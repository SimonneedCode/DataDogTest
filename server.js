var express = require('express');
var app = express();
var http = require('http').Server(app);

var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

//Connection to server

io.on('connection', function(socket){
    console.log('New user connected.');
    
socket.on('disconnect', function(socket){
    console.log('User left...');
});
    
//Data from user
    
    socket.on('message', function(data){
        io.to(data.to).emit('message', {
            data: data.data,
            type: data.type,
            from: data.from,
            to: data.to
  
        });
        console.log('Message: ' + data.data +' '+ 'Topic: ' + data.type +' '+'From: ' + data.from + ' To: ' + data.to);
    });
//Sending data to user
    
    socket.on('login', function(data){
            io.emit('login', data);
            socket.join(data);
            console.log(data + " loged in.");
    
});
    
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});