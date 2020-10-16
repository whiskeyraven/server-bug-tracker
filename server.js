/* eslint-disable no-console */
const util = require('util');
const http = require('http');
const app = require('./app');

const debug = util.debuglog('node-angular');

const normalizePort = (val) => {
  const port = parseInt(val, 10);

  // eslint-disable-next-line no-restricted-globals
  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
const restarted = new Date().toISOString().replace('T', ' ').substr(0, 19);

const server = http.createServer(app);

const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${port}`;
  if (error.code === 'EACCES') {
    console.error(`${bind} requires elevated privileges`);
    process.exit(1);
  } else if (error.code === 'EADDRINUSE') {
    console.error(`${bind} is already in use`);
    process.exit(1);
  } else {
    throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${port}`;
  debug(`Listening on ${bind}`);
  console.log(`Server running on port ${port}.\n${restarted}`);
};

server.on('error', onError);
server.on('listening', onListening);
server.listen(port);

const shutdown = (err, message) => {
  console.log(message);
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
};

process.on('unhandledRejection', (err) => {
  const message = 'UNHANDLED REJECTION!';
  shutdown(err, message);
});

process.on('uncaughtException', (err) => {
  const message = 'UNCAUGHT EXCEPTION!';
  shutdown(err, message);
});
