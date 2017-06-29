var socket = io();

//Sending data to server

$(function(){
    $("#sendMsg").click(function(){
        socket.emit('message', {
            data: $("#msg").val(),
            type: $("#topic").val(),
            from: $("#name").val(),
            to: $('#userList').val()
        });
    });

//Loggin to server
    
    $("#login").click(function(){
        socket.emit('login', $('#name').val());
        $('#loginSection').hide();
        $("#container").show();
        $('#userName').show();
        $('#userName').append($("#name").val());
    });

    $(document).ready(function(){
           $("#container").hide();
    });
    
//Clear chat window
    $("#clearChat").click(function(){
        $("#messages").empty();
        $("#sender").empty();
        
    });
    
//Sending data to choosen user
    socket.on('message', function(data){
        $('#sender').append("<p>New message from: " + data.from + "</p>");
        $('#topicBox').append('<p>Topic: ' + data.type +'</p><br>');
        $('#messagedata').append('<p>' + data.data + '</p>');
    });

});