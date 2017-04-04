var ws = new WebSocket('ws://localhost:4000/ws');

ws.addEventListener('open', function () {
    console.log('websocket connection had build');
});

ws.addEventListener('close', function () {
    console.log('websocket connection had closed');
});

ws.addEventListener('error', function (err) {
    console.error('webscoket encounter error', err);
});


ws.addEventListener('message', function (event) {
    console.log('receive message: ' + event.data + ', reload');
    window.location.reload();
})