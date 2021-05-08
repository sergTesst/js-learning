var connect = require('connect');
var serveStatic = require('serve-static');
const port = 8090;

connect()
    .use(serveStatic("./app"))
    .listen(port, () => console.log(`Server running on ${port}...`));