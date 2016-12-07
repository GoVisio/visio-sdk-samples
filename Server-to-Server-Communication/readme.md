# visio-sdk-samples
Example applications that use the Vis.io SDK : [visio.readme.io](https://visio.readme.io)

## 11.Server-to-Server-Communication

### Overview

Sample application built with [Vue.js](https://vuejs.org/) + [Node/Express](http://expressjs.com/)
to demonstrate usage of [Vis.io](https://www.vis.io/) public APIs

In this sample we create & delete visio users, and log them in programmatically using our API key + secret

### Quick Start Install
```
$ npm install
$ node server.js
```
The project will be available at [localhost:8080](http://localhost:8080/)

### Create a Visio company

You can create a Visio company, and get a public key & a secret API key [here](https://admin.vis.io/)

Once created, copy your key + secret in backend/helpers.js, the keys will be used to generate a [Json Web token (JWT)](https://jwt.io/) to authenticate your company

### API documentation

The documentation for the APIs & the client-side SDK can be found at [docs.vis.io](http://docs.vis.io/)

### Code recipes

In backend/helpers.js, you can find a sample on how to generate a JWT from your public and private API keys, using [jsonwebtoken package](https://www.npmjs.com/package/jsonwebtoken) from [Auth0 organisation](https://github.com/auth0)
