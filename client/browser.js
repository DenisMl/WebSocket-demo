if (!window.WebSocket) {
  document.body.innerHTML = 'WebSocket is not supported';
}
// create connection
let socket = new WebSocket("ws://localhost:8080");
// send message from publish form
document.forms.publish.onsubmit = function() {
  let outgoingMessage = this.message.value;
  socket.send(outgoingMessage);
  return false;
};
// incoming messages handler
socket.onmessage = function(event) {
  let incomingMessage = event.data;
  showMessage(incomingMessage);
};
// show messages in div#subscribe
function showMessage(message) {
  let messageElem = document.createElement('div');
  messageElem.appendChild(document.createTextNode(message));
  document.getElementById('subscribe').appendChild(messageElem);
}
