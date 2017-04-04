### gulp-websocket-server
主要目的是在gulp中开启一个websocket的服务，然后文件改变时发送消息给已经建立链接的客户端。

#### 安装
```
npm install --save-dev gulp-websocket-server
```
#### 使用
##### 在gulp中使用
```js
const gulp = require('gulp');
const gulpWss = require('gulp-websocket-server');
const serverConfig = {
    port: 4000,
    path: '/ws'
};
//建立一个websocket server
let wss = gulpWss(serverConfig);

gulp.task('js',() => {
    return gulp.src('./*.js')
                .pipe(wss.liverealod('relaod'));//livereaod 发送给消息给客户端
});
```
websocket服务创建的配置请参考[ws](https://github.com/websockets/ws/blob/master/doc/ws.md)中的serverCofig。

创建的webscoket server上有`livereload`方法,可以给客户端发送消息。

##### 在浏览器中建立链接
可以在浏览器中通过下面的方面建立链接，并且接收websocket server发送的消息。
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