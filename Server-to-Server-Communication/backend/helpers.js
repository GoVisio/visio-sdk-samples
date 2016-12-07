var Q = require('Q');
var jwt = require('jsonwebtoken');
var moment = require('moment');

const VISIO_APIKEY = 'MrD(Y]X87P=]6vL}yk.QdRmaF)xqX>';
const VISIO_SECRET = '[c0wj8W>[M7{f>5}o=Nd(yAxL6J4(WzZQmMxF@)]';
const VISIO_JWT_ENCODING_SECRET = '4MW)c2]f{2qaFm^3f[C36]>7c5rV9!x-9zNNR{V>';

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
