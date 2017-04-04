
### gulp-websocket-server
[English](./README.md) | [中文](./zh.md)

The main purpose of this plugn is to open a websocket service in gulp, and then send the message to the client who has already created the link when the file changes.

#### Install
```
npm install --save-dev gulp-websocket-server
```
#### Usage
##### How use in gulp
```js
const gulp = require('gulp');
const gulpWss = require('gulp-websocket-server');
const serverConfig = {
    port: 4000,
    path: '/ws'
};
//build a websocket server in gulp
let wss = gulpWss(serverConfig);

//
gulp.task('js',() => {
    return gulp.src('./*.js')
                .pipe(wss.liverealod('relaod'));//use method livereload send message: 'reload'
});
gulp.task('send',() => {
    wss.send('reload');//use method send to send message:'reload'
});
```
websocket server's creation configuration refer to [ws](https://github.com/websockets/ws/blob/master/doc/ws.md).

Webscoket server's instance has `livereload` and `send` methods,they all can send message to client.`livereload`only can be used in gulp's pipe.`send`can be use directly.They both has only one parameter that is message needed to be sent.The default value for this parameter `file change`

##### How to use in client
You can build link like above and wait for message and then do what you want do.
```js
const ws = new WebScoket('ws://localhost:yourport/yourpath');
ws.addEventListener('error', err => {
    console.log('encounter some error');
});
ws.addEventListener('message',event =>{
    if(event.data === 'message'){
        //do what you want
    }
});
```