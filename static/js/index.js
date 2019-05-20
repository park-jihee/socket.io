var socket = io()

socket.on('connect', function(){
    
    var name = prompt('반갑습니다.', '')
    if(!name){
        name = '사용자'
    }
    socket.emit('newUser', name)
})

//(서버로부터) 메세지 주고받기
socket.on('update', function(data){
    
    console.log(data)
    
    var chat = document.getElementById('chat');
    
    var message = document.createElement('div');
    
    //확인해야함
    var node = document.createTextNode(`${data.name}: ${data.message}`)
    var className = ''
    
    switch(data.type){
        case 'message' :
            className='other'
            break
        case 'connect' :
            className='connect'
            break
        case 'disconnet' :
            className='disconnect'
            break
    }
    
    message.classList.add(className)
    message.appendChild(node)
    chat.appendChild(message)
})

//전송을 위한 함수
function send(){

    //입력값가져오기
    var message = document.getElementById('test').value

    //초기화
    document.getElementById('test').value = ''
    
    var chat = document.getElementById('chat')
    var msg = document.createElement('div')
    var node = document.createTextNode(message)
    
    msg.classList.add('me')
    msg.appendChild(node)
    chat.appendChild(msg)
    
    //서버로 전달
    socket.emit('message', {type:'message', message : message})
}

//엔터키 입력시 입력값 전송.
function event_enterKey(){
    //입력값가져오기
    if(event.keyCode == 13){
        send();
    }
}










