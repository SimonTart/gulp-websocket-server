const through = require('through2');
const gutil = require('gulp-util');
const WebSocket = require('ws');
const PLUGIN_NAME = 'gulp-websocket';
const defaultServerConfig = {
    port: 8000,
    path: '/livereload'
}

function gulpErr(err) {
    return new gutil.PluginError(`${PLUGIN_NAME}:`, err);
}

function log(...args) {
    return gutil.log(`${PLUGIN_NAME}:`, ...args);
}

function broadcast(wss, message) {
    log(`send a message: ${message}`)
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
}

function livereload(wss, message = 'file change'){
    return through.obj((chunk, enc, callback) => {
        callback(null, chunk);
        broadcast(wss, message);
    });
}

function send(wss, message = 'file change') {
    broadcast(wss, message);
};

function gulpWss(serverConfig) {
    serverConfig = Object.assign(defaultServerConfig, serverConfig);
    let wss = new WebSocket.Server(serverConfig, () => {
        log(`had listen on ws://localhost:${serverConfig.port}${serverConfig.path}`);
    });
    wss.on('connection', ws => {
        log('build a connection');
    });
    wss.on('error', err => {
        throw gulpErr(err);
    });
    wss.livereload = livereload.bind(wss, wss);
    wss.send = send.bind(wss,wss);
    return wss;
}

module.exports = exports = gulpWss;