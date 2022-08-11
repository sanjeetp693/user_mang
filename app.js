require('dotenv').config()
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
 var logger = require('morgan');
const connection = require("./connection/connect");
var http = require('http');
var debug = require('debug')('mmnt:server');
let Response = require('./utility/response')
const config = require('config')
var v1Routes = require('./v1/routes')
let constant = require('./messages/messages')
const https = require('https');
const fs = require('fs');
const postmanToSwagger = require('postman-to-swagger')
const swaggerUi = require('swagger-ui-express')
const mockCollection = require('./swagger/UserManagementTask.postman_collection.json');
var app = express();
app.use((req, res, next) => {
  res.append('Access-Control-Expose-Headers', 'x-total, x-total-pages');
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res, next) {
  if (req.headers && req.headers.lang && req.headers.lang == 'ar') {
    process.lang = constant.MESSAGES.arr;
  } else {
    process.lang = constant.MESSAGES.en;
  }
  next();
});
app.use('/api/v1', v1Routes);
// app.get('/swagger', swaggerUi.setup(postmanToSwagger(mockCollection)));
// // Static stuff
// app.use('/', swaggerUi.serve, (req, res) => res.status(404).end());
app.use('/',(req,res)=>{
  res.send({
    message:"Website is working....."
  })
})
app.use(function (err, req, res, next) {
  console.error(err);
  const status = err.status || 400;
  if (err.message == "jwt expired" || err.message == "Authentication error") { res.status(401).send({ status: 401, message: err }) }
  if (typeof err == typeof "") { Response.sendFailResponse(req, res, status, err) }
  else if (err.Error) res.status(status).send({ status: status, message: err.Error });
  else if (err.message) res.status(status).send({ status: status, message: err.message });
  else res.status(status).send({ status: status, message: err.message });
});
// app.use('/', function (req, res) {
//   res.status(400).send({ code: 400, status: "success", message: "Parcel Pending API", data: {} })
// });
var port = 8071
// var port = normalizePort(process.env.PORT || '8071');
var port = normalizePort(port);

app.set('port', port);

var server
  server = http.createServer(app);
  console.log(`Running on HTTP`);
server.listen(port, async () => {
  console.log(`Running on port: ${port}.`);
  await connection.mongoDbconnection();
});
server.on('error', onError);
server.on('listening', onListening);
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
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

/**
 * Event listener for HTTP server "listening" event.
 */
//"url": "mongodb://localhost:27017/userManagement"
function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
