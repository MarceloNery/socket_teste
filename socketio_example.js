/**
 * Função que irá ser chamada a cada conexão com o node.js
 * @param {ServerRequest} request Instância do request da requisição
 * @param {ServerResponse} response Instância do response da requisição
 */
var onRequest = function (request, response) {
    // Informando o tipo do cabeçalho da página
    response.writeHead(200, {'Content-Type': 'text/html'});
   
    // Mensagem exibida no console há cada requisição
    console.log('Usuário conectado no Server!!!');
 
    // Encerrando o response
  response.end();
};
 
// Requisitando os módulos
var http = require('http').createServer(onRequest),
    io = require('socket.io').listen(http);
 
// Informando a porta para ser monitorada pelo Server
http.listen(8088, '127.0.0.1');
 
/**
 * Evento "connection" que ocorre quando um usuário conecta no socket.io
 * @param {SocketObject} socket Objeto do socket conectado
 */
io.sockets.on('connection', function(socket){
    /**
     * Evento "userconected" que ocorre quando a página é carregada.
     */
    socket.on('userconected', function(){
        // Enviando a mensagem só para o socket atual
        socket.emit('showmessage', 'Usuário conectado no socket!!!');
 
        // Servidor responde o mesmo resultado via broadcast.
        socket.broadcast.emit('showmessage', 'Outro usuário foi conectado');
    });
 
   /**
    * Evento "disconnect" emitido quando o usuário recarregar ou sair da página
    */
   socket.on('disconnect', function(){
      // Resposta do servidor via broadcast.
      socket.broadcast.emit('showmessage', 'Um usuário saiu ou recarregou à página!!!');
   });
});