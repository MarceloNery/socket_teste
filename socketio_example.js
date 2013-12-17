/**
 * Fun��o que ir� ser chamada a cada conex�o com o node.js
 * @param {ServerRequest} request Inst�ncia do request da requisi��o
 * @param {ServerResponse} response Inst�ncia do response da requisi��o
 */
var onRequest = function (request, response) {
    // Informando o tipo do cabe�alho da p�gina
    response.writeHead(200, {'Content-Type': 'text/html'});
   
    // Mensagem exibida no console h� cada requisi��o
    console.log('Usu�rio conectado no Server!!!');
 
    // Encerrando o response
  response.end();
};
 
// Requisitando os m�dulos
var http = require('http').createServer(onRequest),
    io = require('socket.io').listen(http);
 
// Informando a porta para ser monitorada pelo Server
http.listen(8088, '127.0.0.1');
 
/**
 * Evento "connection" que ocorre quando um usu�rio conecta no socket.io
 * @param {SocketObject} socket Objeto do socket conectado
 */
io.sockets.on('connection', function(socket){
    /**
     * Evento "userconected" que ocorre quando a p�gina � carregada.
     */
    socket.on('userconected', function(){
        // Enviando a mensagem s� para o socket atual
        socket.emit('showmessage', 'Usu�rio conectado no socket!!!');
 
        // Servidor responde o mesmo resultado via broadcast.
        socket.broadcast.emit('showmessage', 'Outro usu�rio foi conectado');
    });
 
   /**
    * Evento "disconnect" emitido quando o usu�rio recarregar ou sair da p�gina
    */
   socket.on('disconnect', function(){
      // Resposta do servidor via broadcast.
      socket.broadcast.emit('showmessage', 'Um usu�rio saiu ou recarregou � p�gina!!!');
   });
});