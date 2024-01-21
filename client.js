const socket = io('http://localhost:8000');
//get dom elements in js variables
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageinp')
const messageContainer = document.querySelector(".container")
var audio = new Audio('aud.mp3');
// append event info to the container
const append = (message, position) => {
    const messageElement = document.createElement("div");
    messageElement.innerText = message;
    messageElement.classList.add("message");
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='left'){
    audio.play();}
  };
// if form gets submitted , send server the message
  form.addEventListener('submit', (e) => {
   e.preventDefault();
   const message = messageInput.value;
   append(`You: ${message}`, 'right');
   socket.emit('send', message);
   messageInput.value = '';
  });

 const name = prompt("Enter your name to join:");
 socket.emit('new-user-joined',name);

 socket.on('user-joined',name =>{
    append(`${name} joined the chat`,'right'); //receive event from server if new user joins
 });

 socket.on('receive', data => {
   append(`${data.name}: ${data.message}`, 'left'); //if server sends a message receive it
   

});
socket.on('left', name => { // if user leaves , append the info to container
   append(`${name} left the chat`, 'left');
   

});

