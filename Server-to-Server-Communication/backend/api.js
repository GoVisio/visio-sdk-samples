var rp = require('request-promise');
var helpers = require('./helpers');
var config = require('../config.js');

exports.delete_user = function (req, res) {
  helpers.signJWTToken().then(function(jwt) {

    var options = {
      uri: config.base_url+'/users/'+req.params.user_id,
      method: 'DELETE',
      headers: {
        'authorization': 'JWT '+jwt

      },
      json: true // Automatically parses the JSON string in the response
    };

    rp(options)
    .then(function (visio_users) {
      return res.status(200).send(visio_users);
    })
    .catch(function (err) {
      return res.status(500).send(err.message);
    });

  }).catch(function(error) {
    console.log(error);
  });
};

exports.post_users = function(req, res) {
  helpers.signJWTToken().then(function(jwt) {

    var options = {
      uri: config.base_url+'/users/',
      method: 'POST',
      headers: {
        'authorization': 'JWT '+jwt
      },
      body: Object.assign(req.body, {language: 'en_GB'}),
      json: true // Automatically parses the JSON string in the response
    };

    rp(options)
    .then(function (visio_users) {
      return res.status(200).send(visio_users);
    })
    .catch(function (err) {
      return res.status(500).send(err.message);
    });

  }).catch(function(error) {
    console.log(error);
  });
}

exports.user = function (req, res) {
  helpers.signJWTToken().then(function(jwt) {

    var options = {
      uri: config.base_url+'/users/'+req.params.user_id,
      headers: {
        'authorization': 'JWT '+jwt

      },
      json: true // Automatically parses the JSON string in the response
    };

    rp(options)
    .then(function (visio_users) {
      return res.status(200).send(visio_users);
    })
    .catch(function (err) {
      return res.status(500).send(err.message);
    });

  }).catch(function(error) {
    console.log(error);
  });
};

exports.users = function(req, res) {
  helpers.signJWTToken().then(function(jwt) {

    var options = {
      uri: config.base_url+'/users',
      headers: {
        'authorization': 'JWT '+jwt

      },
      json: true // Automatically parses the JSON string in the response
    };

    rp(options)
    .then(function (visio_users) {
      return res.status(200).send(visio_users);
    })
    .catch(function (err) {
      return res.status(err.statusCode).send(err.message);
    });

  }).catch(function(error) {
    console.log(error);
  });
};

exports.log_users = function(req, res) {
  var options = {
    uri: config.base_url+'/users/login',
    method: 'POST',
    headers: {
      'authorization': 'JWT '+req.body.JWT

    },
    json: true // Automatically parses the JSON string in the response
  };

  rp(options)
  .then(function (visio_user) {
    return res.status(200).send(visio_user);
  })
  .catch(function (err) {
    return res.status(500).send(err.message);
  });
};

exports.search = function(req, res) {
  helpers.signJWTToken().then(function(jwt) {
    var options = {
      uri: config.base_url+'/users/search',
      method: 'POST',
      headers: {
        'authorization': 'JWT '+jwt

      },
      body: Object.assign(req.body),
      json: true // Automatically parses the JSON string in the response
    };

    rp(options)
    .then(function (visio_user) {
      return res.status(200).send(visio_user);
    })
    .catch(function (err) {
      return res.status(500).send(err.message);
    });

  }).catch(function(error) {
    console.log(error);
  });
}
