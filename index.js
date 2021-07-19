const http = require('http');
const server = http.createServer();
const controller = require('./controller/service');
const db = require('./models/db');
const yargs = require('yargs');
const port = 3001;

var arguments = yargs.argv;
// controller.test(arguments);
db.passData(arguments);

controller.addDetailstoDb(arguments);

server.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
});

