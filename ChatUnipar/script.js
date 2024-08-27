var stompClient = null;
var username = null;

document.getElementById("welcome-form").style.display = "block";

function enterChatRoom() {

    username = document.getElementById("username").value.trim();

    if(username){
        document.getElementById("welcome-form").style.display = "none";
        document.getElementById("chat-room").style.display = "block";
        connect();
    }else{
        alert("Por favor, inserir um nickname");
    }
}

    function connect() {

        var socket = new SockJS('https://9e7df17fa210.ngrok.app/chat-websocket', {
            headers: {
                'ngrok-skip-browser-warning': 'true'
            }
        });
        stompClient = Stomp.over(socket);

        stompClient.connect({}, function (frame){
            console.log('conectando...'+ frame);

            stompClient.subscribe('/topic/public', function(messageOutput) {
                showMessage(JSON.parse(messageOutput.body));
            });

            stompClient.send("/app/addUser", {}, JSON.stringify({
                sender: username,
                type :'JOIN'
            }));
        });
    }
    function showMessage(message){
        var messageElement = document.createElement('div');

        if(message.type === 'JOIN'){
            messageElement.innerText = message.sender + " entrou na sala ";
        }else if(message.type === 'LEAVE') {
            messageElement.innerText = message.sender + " saiu da sala ";
        }else {
            messageElement.innerText = message.sender + " disse: " + message.content;
        }    
     
     document.getElementById('messages').appendChild(messageElement);
    }

    function sendMessage(){
        var messageContent = document.getElementById("messageInput").value.trim();

        if(messageContent && stompClient){
            var chatMessage = {
                sender: username,
                content: messageContent,
                type: 'CHAT'
            };
            stompClient.send('/app/sendMessage',{},JSON.stringify(chatMessage));
            document.getElementById("messageInput").value = '';
        }
    }
    function leaveChat() {
        if (stompClient) {
            stompClient.send("/app/addUser", {}, JSON.stringify({
                sender: username,
                type: 'LEAVE'
            }));
            stompClient.disconnect(function () {
                console.log('Desconectado');
                document.getElementById("welcome-form").style.display = "block";
                document.getElementById("chat-room").style.display = "none";
            });
        }
    }