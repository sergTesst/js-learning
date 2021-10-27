let http = require("http");
let static = require("node-static");
let fileServer = new static.Server(".");
let path = require("path");
let fs = require("fs");
// let debug = require("debug")("example:resume-upload");

let debug = (...args) => {
  console.log(...args);
};
let uploads = Object.create(null);

function onUpload(req, res) {
  let fileId = req.headers["x-file-id"];
  let startByte = Number(req.headers["x-start-byte"]);

  if (!fileId) {
    res.writeHead(400, "No file id");
    res.end();
  }
  //save file into nothing
  // let filePath = '/dev/null';
  let filePath = path.join(__dirname, "/tmp", `${fileId}`);

  debug(`file path ${filePath}`);
  debug("onUpload fileId:", fileId);

  if (!uploads[fileId]) uploads[fileId] = {};
  let upload = uploads[fileId];

  debug("bytesReceived: " + upload.bytesReceived + " startByte: " + startByte);

  let fileStream;
  //if start byte 0 or not defined - create new file
  //otherwise check size and add data to the current file
  if (!startByte) {
    upload.bytesReceived = 0;
    fileStream = fs.createWriteStream(filePath, {
      flags: "w",
    });
    debug("New file created: " + filePath);
  } else {
    // we can check on-disk file size as well to be sure
    if (upload.bytesReceived != startByte) {
      res.writeHead(400, "Wrong start byte");
      res.end(upload.bytesReceived);
      return;
    }
    // add to present file
    fileStream = fs.createWriteStream(filePath, {
      flags: "a",
    });
    debug("File reopened: " + filePath);
  }

	let dataBinary;
  req.on("data ", (data) => {
    debug("bytes received ", upload.bytesReceived);
    upload.bytesReceived += data.lenght;
		dataBinary +=data;
		// fs.appendFile(filePath, dataBinary, function(){
		// 	res.end();
		// })
  });

  //save body of the request into file
  req.pipe(fileStream);

  //when request process is finished and all data written
  fileStream.on("close", () => {
    if (upload.bytesReceived == req.headers["x-file-size"]) {
      debug("upload finished");
      delete uploads[fileId];

      res.end("Success " + upload.bytesReceived);
    } else {
      //connection is lost, unfinished loadings are present
      debug("File unfinished, stopped at " + upload.bytesReceived);
      res.end();
    }
  });

  //if we have input/output error we finish request process
  fileStream.on("error", (err) => {
    debug("fileStream error", err);
    res.setHeader(500, "File error");
    res.end();
  });
}

function onStatus(req, res) {
  let fileId = req.headers["x-file-id"];
  let upload = uploads[fileId];
  debug("onStatus file:", fileId, " upload: ", upload);
  if (!upload) {
    res.end("0");
  } else {
    res.end(String(upload.bytesReceived));
  }
}

function accept(req, res) {
  const headers = {
    "Access-Control-Allow-Origin": "http://localhost:3000",
    "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
    "Access-Control-Allow-Headers": "X-File-Id, X-Start-Byte",
    "Access-Control-Max-Age": 2592000, // 30 days

    /** add other headers as per requirement */
  };

  if (req.method === "OPTIONS") {
    res.writeHead(204, headers);
    res.end();
    return;
  }

  if (req.url === "/workingserver") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.writeHead(200, headers);
    res.end("server working \n");
  } else if (req.url == "/status") {
    res.writeHead(200, headers);
    onStatus(req, res);
  } else if (req.url == "/upload" && req.method == "POST") {
    res.writeHead(200, headers);
    onUpload(req, res);
  } else {
    res.writeHead(200, headers);

    fileServer.serve(req, res);
  }
}
// const hostname = "127.0.0.1";
const hostname = "localhost";
const port = 3002;
http.createServer(accept).listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/workingserver`);
});
