const http = require('http');
const ws = require('ws');

const headers = {
	"Access-Control-Allow-Origin": "http://localhost:3000",
	"Access-Control-Allow-Methods": "OPTIONS, POST, GET",
	"Access-Control-Max-Age": 2592000, // 30 days
};

const log = (...args) => console.log(...args);

const wss = new ws.Server({noServer: true});
const clients = new Set();

const sessionData = [];

function accept(req, res){
	log('accepting request...', req.method);

	if (req.url === "/workingserver") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.writeHead(200, headers);
    res.end("server working \n");
		return;
  }
	
	//all incoming requests must be websockets
	if(!req.headers.upgrade || req.headers.upgrade.toLowerCase() !== 'websocket'){
		res.end();
		return;
	}

	//can be Connection: keep-alive, Upgrade
	if(!req.headers.connection.match(/\bupgrade\b/i)){
		res.end();
		return;
	}

	if(req.url === '/ws'){
		wss.handleUpgrade(req, req.socket, Buffer.alloc(0), onConnect);
		return;
	}

	res.writeHead(404);
	res.end();
}

function restorePreviousSessionData(ws){
	if(sessionData.length>0){
		for(let data of sessionData){
			sendMessageToAllClients(clients, data);
		}
	}
}

function sendMessageToAllClients(clients, data){

	for(let client of clients){
		let jsonData = JSON.stringify(data);
		let encodedData = new TextEncoder().encode(jsonData);
		client.send( encodedData );
	}
}

function onConnect(ws){

	clients.add(ws);
	log('new connection');
	// const maxMessageLength = 50;
	restorePreviousSessionData(ws);

	ws.on('message', function(message){

		log(`message received: ${message}`);

		let decodedMessageJson = new TextDecoder().decode(message);
		const action = JSON.parse(decodedMessageJson);
		// message = message.slice(0, maxMessageLength);

		try{	
			switch(action.type){
				case 'sendMessage':
					sessionData.push(action.payload);

					sendMessageToAllClients(clients, action.payload);

				break;

				case 'PING':
					setTimeout(()=>{
						for(let client of clients){
							client.send('PONG');
						}
					},2000)
				break;

				default:
					log('unknown action');
				break;
			}


		} catch(err){
			log('error occured', err);
		}

	});

	ws.on('close', function(){
		log('connection closed');
		clients.delete(ws);
	})

}

const hostname = "localhost";
const port = 3005;
http.createServer(accept).listen(port, hostname, () => {
  log(`Server running at http://${hostname}:${port}`);
});


