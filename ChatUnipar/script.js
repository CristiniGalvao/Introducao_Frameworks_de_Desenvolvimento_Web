var stompCliente = null;
var username = null;

document.getElementById("welcome-form").style.display = "block";

function enterChatRoom(){
    username = document.getElementById("username").value.trim();

    if(username){
        document.getElementById("welcome-from").style.display = "none";
        document.getElementById("chat-room").style.display = "block";
        connect();
    }else{
        alert("Por favor, insira um nickname!");
    }
}

function connect() {
    var socket = new SockJS('https://164c-177-91-39-198.ngrok-free.app/chat-websockt', {
        headers: {
            'ngrok-skip-browser-warning': 'true'
        }
    });
    stompClient = Stomp.over(socket);

    stompCliente.connect({},function(frame){
        console.log('Conectando ....'+frame)

        stompCliente.subscribe('/topic/public',function(messageOutput){
        showMenssage(JSON.parse(menssageOutput.body));
        });
        stompCliente.send("app/addUser", {},JSON.stringify({
            sender: username,
            type: 'JOIN'
        }));
    })
}

function sendMessage(){
    var messageContent = document.getElementById("menssageInput").value.trim();

    if(messageContet && stompCliente){
        var chatMessage = {
            sender: username,
            content: messageContent,
            type:'CHAT'
        };
        stompCliente.send(/app/sendMessage)
    }
}

function showMenssage(message){
    var messageElement = document.createElement('div');

    if(message.type == 'JOIN'){
        menssageElement.innerText = message.sender + "entrou na sala.";
    }else if(messageElement.type == 'LEAVE'){
        messageElement.innerText = message.sender + "saiu da sala";
    }else{
        messageElement.innerText = message.sender + "disse: "+message.content;
    }
    document.getElementById("messages").appendChild(messageElement);
}
