const http = require('http');
const url = require('url');
let querystring = require('querystring');
let static = require('node-static');
const fileServer = new static.Server('.');

const headers = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Methods": "OPTIONS, POST, GET",
	"Access-Control-Max-Age": 2592000, // 30 days
};

const log = (...args) => console.log(...args);

function accept(req, res){
	log('accepting request...', req.method);

	if (req.url === "/workingserver") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.writeHead(200, headers);
    res.end("server working \n");
		return;
  }
	
	if(req.url === '/digits'){
		onDigits(req, res);
		return;
	}

	fileServer.serve(req, res);
}


function onDigits(req, res){

  res.setHeader("Content-Type", `text/event-stream; charset=utf-8`);
  res.setHeader("Cache-Control", `no-cache`);
	res.writeHead(200, headers);

	let i = 0;

	let timer = setInterval(write, 1000);

	write();

	function write(){
		i++;

		if(i === 4 ){
			res.write(`event: bye\ndata: bye-bye\n\n`);
			clearInterval(timer);
			res.end();
			return;
		}

		res.write(`data: ${i} \n\n`);
	}

}


const hostname = "localhost";
const port = 3005;
http.createServer(accept).listen(port, hostname, () => {
  log(`Server running at http://${hostname}:${port}`);
});


