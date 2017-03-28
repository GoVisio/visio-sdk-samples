var socket = io.connect();

socket.on('event', function (data) {
    console.log(data);
});
