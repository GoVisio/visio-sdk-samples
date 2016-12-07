var Q = require('Q');
var jwt = require('jsonwebtoken');
var moment = require('moment');

const VISIO_APIKEY = 'YOURKEY';
const VISIO_SECRET = 'YOURSECRET';
const VISIO_JWT_ENCODING_SECRET = 'VISIO_ENCODING_SECRET';

exports.signJWTToken = function () {
  var deferred = Q.defer();

  const timestamp = (moment.unix(new Date()) + 86400000000) / 1000000;
  jwt.sign(JSON.stringify({
    "apikey": VISIO_APIKEY,
    "secret": VISIO_SECRET,
    "exp": timestamp
  }), VISIO_JWT_ENCODING_SECRET, {algorithm: 'HS256'}, function (err, token) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve(token);
    }
  });
  return deferred.promise;
};
