
const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const app = express();
const logger = require('node-color-log');
require('dotenv').config()

app.use(cors());
app.use(bodyParser.json());

app.use(express.static('client/build'));
app.get('/index.html', function (req, res) {
  res.sendFile( __dirname + "/" + "index.html" );
})

app.get('/api_test', function (req, res) {
  res.send("Api is working fine");
})

const server = require('http').createServer(app);
const port = process.env.PORT || 8080;

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }
    const bind = 'Port ' + port;

    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
}

function onListening() {
    logger.info('Listening on port: ' + port);
}

module.exports = {
  server, app
};