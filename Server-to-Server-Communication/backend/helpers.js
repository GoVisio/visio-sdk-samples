var Q = require('Q');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var config = require('../config.js');

exports.signJWTToken = function () {
  var deferred = Q.defer();

  const timestamp = (moment.unix(new Date()) + 86400000000) / 1000000;
  jwt.sign(JSON.stringify({
    "apikey": config.visio_apikey,
    "secret": config.visio_secret,
    "exp": timestamp
  }), config.visio_jwt_encoding_secret, {algorithm: 'HS256'}, function (err, token) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve(token);
    }
  });
  return deferred.promise;
};
