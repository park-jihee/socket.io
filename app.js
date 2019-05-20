//채팅창 구현을 위한 모듈 불러오기
const express = require('express')
const socket = require('socket.io')
const http = require('http')
const app = express()
const server = http.createServer(app)
const io = socket(server)
const fs = require('fs')//파일접근모듈

app.use('/css', express.static('./static/css'))
app.use('/js', express.static('./static/js'))

app.get('/', function(request, response) {
    fs.readFile('./static/index.html', function(err,data){
        if(err){
            response.send('에러가 발생하였습니다.')
        }else{
            response.writeHead(200, {'Content-type':'text/html'})
            response.write(data)
            response.end()
        }
        
    })
})

io.sockets.on('connection', function(socket){

    socket.on('newUser', function(name){

        console.log(name + "님이 접속하였습니다.")

        socket.name = name
        // io.sockets.emit('update', {type:'connect', name:'SERVER', message:name+'님 접속!'})
    })

    socket.on('message', function(data){    
        data.name = socket.name
        socket.broadcast.emit('update', data)
    })
})



server.listen(3000, function(){
  console.log('서버기동중...')  
})









