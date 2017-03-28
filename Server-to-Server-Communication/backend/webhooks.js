var rp = require('request-promise');
var helpers = require('./helpers');
var app = require('../server.js')

exports.events = function(req, res) {
  console.log('received event : ', req.body);

  app.io.sockets.emit('event', req.body );

  return res.status(200).send({});
}
