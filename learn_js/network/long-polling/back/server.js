let http = require("http");
let url = require("url");
let querystring = require("querystring");
let static = require("node-static");

let fileServer = new static.Server(".");
let subscribers = Object.create(null);

function onSubscribe(req, res) {
  let id = Math.random();

  res.setHeader("Content-Type", "text/plain");
  res.setHeader("Cache-Control", "no-cache, must-revalidate");
	res.writeHead(200, headers);

  subscribers[id] = res;

  req.on("close", function () {
    delete subscribers[id];
  });
}

function publish(message) {
  for (let id in subscribers) {
    let res = subscribers[id];
    res.end(message);
  }

  subscribers = Object.create(null);
}

const headers = {
	"Access-Control-Allow-Origin": "http://localhost:3000",
	"Access-Control-Allow-Methods": "OPTIONS, POST, GET",
	"Access-Control-Max-Age": 2592000, // 30 days
};


function accept(req, res) {

  if (req.url === "/workingserver") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.writeHead(200, headers);
    res.end("server working \n");
		return;
  }

  if (req.method === "OPTIONS") {
    res.writeHead(204, headers);
    res.end();
    return;
  }

  let urlParsed = url.parse(req.url, true);

  //new client wants to get messages
  if (urlParsed.pathname === "/subscribe") {

    onSubscribe(req, res);
    return;
  }

  //sending a message
  if (urlParsed.pathname === "/publish" && req.method === "POST") {
    res.writeHead(200, headers);

    //accept POST

    req.setEncoding("utf8");
    let message = "";
    req
      .on("data", function (chunk) {
        message += chunk;
      })
      .on("end", function () {
        publish(message);
        res.end("ok");
      });

    return;
  }

  //serve static

  fileServer.serve(req, res);
}

function close() {
  for (let id in subscribers) {
    let res = subscribers[id];
    res.end();
  }
}

// if(!module.parent){

const hostname = "localhost";
const port = 3002;
http.createServer(accept).listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/workingserver`);
});

// }else{
// exports.accept = accept;

if (process.send) {
  process.on("message", (msg) => {
    if (msg === "shutdown") {
      close();
    }
  });
}

process.on("SIGINT", close);
// }
