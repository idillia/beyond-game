let interval;

const getApiAndEmit = ( socket, topic) => {
    const response = new Date();
    socket.emit(topic, response);
    console.log(`Emitting on ${topic} topic`)
};

module.exports = io => {
    io.on('connect', (socket) => {
        console.log('User connected')

        // onEmitWithInterval(socket, 'ranking', '', 1000)
        // onEmit(socket, 'news', 'hello')

        onReceive(socket)
        onDisconnect(socket)
    })
}

function onReceive(socket){
    socket.on('mes', (msg) => {
        console.log('message from client: ' + msg);
    })
}

function onEmitWithInterval(socket, topic, message, interval) {
    if (interval) {
        clearInterval(interval);
    }
    interval = setInterval(() => getApiAndEmit(socket, topic), interval);
}

function onEmit(socket, topic, message) {
    socket.emit(topic, {
        message: message
    })
}

function onDisconnect(socket) {
    socket.on('disconnect', () => {
        console.log('user disconnected');
        clearInterval(interval);
    })
}