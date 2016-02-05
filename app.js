
var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')

var welcome = require('./routes/welcome'); // first-run screen
var index = require('./routes/index'); // main screen
var suggest = require('./routes/suggest'); // alternative main screen
var settings = require('./routes/settings'); // toggle options
var history = require('./routes/history'); // past meals
var popup = require('./routes/popup'); // temporary screen
var menu = require('./routes/menu'); // full screen (for now)
var logout = require('./routes/logout'); // needs more options

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/welcome', welcome.view);
app.get('/', index.view);
app.get('/suggest', suggest.view);
app.get('/settings', settings.view);
app.get('/history', history.view);
app.get('/popup', popup.show);
app.get('/menu', menu.view);
app.get('/logout', logout.view);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
