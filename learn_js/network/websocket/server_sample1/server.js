const http = require('http');
const ws = require('ws');

//this server
//https://javascript.info/article/websocket/demo/server.js

//websocket repo
//https://github.com/websockets/ws

//https://www.tabnine.com/code/javascript/functions/ws/Server/handleUpgrade
//https://github.com/bkwebeagle/websocket-server-nodejs/blob/main/server.js

const wss = new ws.Server({noServer: true});

function accept(req, res){
	console.log('accepting request...');
	
	//all incoming requests must be websockets
	if(!req.headers.upgrade || req.headers.upgrade.toLowerCase() != 'websocket'){
		res.end();
		return;
	}

	//can be Connection: keep-alive, Upgrade
	if(!req.headers.connection.match(/\bupgrade\b/i)){
		res.end();
		return;
	}

	wss.handleUpgrade(req, req.socket, Buffer.alloc(0), onConnect);
}

function onConnect(ws){

	ws.on('message', function(message){

		let decodedName = new TextDecoder().decode(message);
		let name = decodedName.match(/([\p{Alpha}\p{M}\p{Nd}\p{Pc}\p{Pc}\p{Join_C}]+)$/gu) || 'Guest';

		ws.send(`Hello from server, ${name}!`);

		setTimeout(()=> ws.close(1000, 'Bye!'), 5000);
	});

}


const hostname = "localhost";
const port = 3002;
http.createServer(accept).listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});

// http.createServer(accept).listen(port);