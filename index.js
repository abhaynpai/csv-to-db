const http = require('http');
const server = http.createServer();
const controller = require('./controller/service');
const db = require('./models/db');
const yargs = require('yargs');
const config = require('./config/index');

var arguments = yargs.argv;

db.passData(arguments);

controller.addDetailstoDb(arguments);

server.listen(config.port, () => {

    console.log(`App listening at http://localhost:${config.port}`)

});

