var express        = require('express'),
    bodyParser     = require('body-parser'),
    methodOverride = require('method-override'),
    errorHandler   = require('errorhandler'),
    morgan         = require('morgan'),
    routes         = require('./backend'),
    api            = require('./backend/api');
    webhooks       = require('./backend/webhooks');
    http           = require('http');

var app = module.exports = express();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(__dirname + '/'));
app.use('/build', express.static('public'));

var env = process.env.NODE_ENV;
if ('development' == env) {
  app.use(errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
}

if ('production' == app.get('env')) {
  app.use(errorHandler());
}

app.get('/', routes.index);
app.get('/api/users', api.users);

app.post('/api/users/search', api.search);
app.post('/api/users', api.post_users);
app.post('/api/users/login', api.log_users);

app.post('/webhooks', webhooks.events);

app.delete('/api/users/:user_id', api.delete_user);

var server = http.createServer(app).listen(8080);

var io = require('socket.io')(server)

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
});

exports.io = io;
console.log('server running on port 8080');
