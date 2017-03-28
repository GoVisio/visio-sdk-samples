var rp = require('request-promise');
var helpers = require('./helpers');

exports.events = function(req, res) {
  console.log('received event : ', req.body);

  exports.io.sockets.emit('news', { hello: 'world' });

  return res.status(200).send({});
}
