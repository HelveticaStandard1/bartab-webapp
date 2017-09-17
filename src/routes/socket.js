module.exports = function (io) {

    var clients = [];

    io.on('connection', function (connectSocket) {
        clients.push(connectSocket.id);
        console.log('a user connected with socketId ' + connectSocket.id);
        console.log(clients);

        connectSocket.on('disconnect', function () {
            var client = clients.indexOf(connectSocket.id);
            clients.splice(client, 1);
            console.log('a user disconnected with socketId ' + connectSocket.id);
            console.log(clients);
        });

        connectSocket.on('link tab', function(barInfo) {
            io.to(clients[0]).emit('test event', barInfo);
        });

        io.emit('test event', {test: 'Test Message'});
    });
};