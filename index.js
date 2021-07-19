const express = require('express');
const controller = require('./controller/service');
const db = require('./models/db');
const app = express();
const port = 3000;

var arguments = process.argv;
// controller.test(arguments);
db.passData(arguments);

controller.addDetailstoDb(arguments);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
});

