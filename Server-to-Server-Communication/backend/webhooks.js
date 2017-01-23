var rp = require('request-promise');
var helpers = require('./helpers');

exports.events = function(req, res) {
  console.log('received event : ', req.body);
  return res.status(200).send({});
}
