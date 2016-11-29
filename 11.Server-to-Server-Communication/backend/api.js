var rp = require('request-promise');
var helpers = require('./helpers');

const BASE_URL = 'http://localhost:3003/admin'

exports.delete_user = function (req, res) {
  helpers.signJWTToken().then(function(jwt) {

    var options = {
      uri: BASE_URL+'/users/'+req.params.user_id,
      method: 'DELETE',
      headers: {
        'authorization': 'JWT '+jwt

      },
      json: true // Automatically parses the JSON string in the response
    };

    rp(options)
    .then(function (visio_users) {
      res.status(200).send(visio_users);
    })
    .catch(function (err) {
      console.log(err.message);
    });

  }).catch(function(error) {
    console.log(error);
  });
};

exports.post_users = function(req, res) {
  helpers.signJWTToken().then(function(jwt) {

    var options = {
      uri: BASE_URL+'/users/',
      method: 'POST',
      headers: {
        'authorization': 'JWT '+jwt
      },
      body: {
        email: req.body.email,
        firstname: req.body.firstName,
        lastname: req.body.lastName,
        language: 'en_GB'
      },
      json: true // Automatically parses the JSON string in the response
    };

    rp(options)
    .then(function (visio_users) {
      res.status(200).send(visio_users);
    })
    .catch(function (err) {
      console.log(err.message);
    });

  }).catch(function(error) {
    console.log(error);
  });
}

exports.user = function (req, res) {
  helpers.signJWTToken().then(function(jwt) {

    var options = {
      uri: BASE_URL+'/users/'+req.params.user_id,
      headers: {
        'authorization': 'JWT '+jwt

      },
      json: true // Automatically parses the JSON string in the response
    };

    rp(options)
    .then(function (visio_users) {
      res.status(200).send(visio_users);
    })
    .catch(function (err) {
      console.log(err.message);
    });

  }).catch(function(error) {
    console.log(error);
  });
};

exports.users = function(req, res) {
  helpers.signJWTToken().then(function(jwt) {

    var options = {
      uri: BASE_URL+'/users',
      headers: {
        'authorization': 'JWT '+jwt

      },
      json: true // Automatically parses the JSON string in the response
    };

    rp(options)
    .then(function (visio_users) {
      res.status(200).send(visio_users);
    })
    .catch(function (err) {
      console.log(err.message);
    });

  }).catch(function(error) {
    console.log(error);
  });
};

exports.log_users = function(req, res) {
  var options = {
    uri: BASE_URL+'/users/login',
    method: 'POST',
    headers: {
      'authorization': 'JWT '+req.body.JWT

    },
    json: true // Automatically parses the JSON string in the response
  };

  rp(options)
  .then(function (visio_users) {
    res.status(200).send(visio_users);
  })
  .catch(function (err) {
    console.log(err.message);
  });
};

exports.search = function(req, res) {
  helpers.signJWTToken().then(function(jwt) {
    var options = {
      uri: BASE_URL+'/users/search',
      method: 'POST',
      headers: {
        'authorization': 'JWT '+jwt

      },
      body: {
        email: req.body.email,
      },
      json: true // Automatically parses the JSON string in the response
    };

    rp(options)
    .then(function (visio_user) {
      res.status(200).send(visio_user);
    })
    .catch(function (err) {
      console.log(err.message);
    });

  }).catch(function(error) {
    console.log(error);
  });
}