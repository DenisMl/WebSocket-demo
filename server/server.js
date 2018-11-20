let http = require('http');
let Static = require('node-static');
let WebSocketServer = new require('ws');
// connected clients
let clients = {};
// WebSocket-server on port 8080
let webSocketServer = new WebSocketServer.Server({port: 8080});
webSocketServer.on('connection', function(ws) {
  let id = Math.random();
  clients[id] = ws;
  console.log("New client connection: " + id);
  ws.on('message', function(message) {
    console.log('Message received: ' + message);
    for (let key in clients) {
      clients[key].send(message);
    }
  });
  ws.on('close', function() {
    console.log('Connection closed on client:' + id);
    delete clients[id];
  });
});

// static server on port 8081
// let fileServer = new Static.Server('.');
// http.createServer(function(req, res) {
//   fileServer.serve(req, res);
// }).listen(8081);

console.log("server started on port: 8080");

