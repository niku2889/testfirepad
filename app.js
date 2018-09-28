var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var publicIp = require('public-ip');
var myPublicIp;
var http = require('http');
var fs = require('fs');
var index = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {

  res.locals.myPublicIp = myPublicIp || '(Public IP has not been found)';

  if (!myPublicIp) {
    getPublicIp();
  }

  next();
});

app.use('/', index);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


function getPublicIp() {

  publicIp.v4().then(ip => {
    console.log(ip);
    myPublicIp = ip;
  });

}
var server = http.createServer(function (req, resp) {
  //3.
  if (req.url === "/firepad/userlist") {
    fs.readFile("routes/examples/userlist.html", function (error, pgResp) {
      if (error) {
        resp.writeHead(404);
        resp.write('Contents you are looking are Not Found');
      } else {
        resp.writeHead(200, { 'Content-Type': 'text/html' });
        resp.write(pgResp);
      }

      resp.end();
    });
  } else if (req.url === "/firepad/richtext") {
    fs.readFile("routes/examples/richtext.html", function (error, pgResp) {
      if (error) {
        resp.writeHead(404);
        resp.write('Contents you are looking are Not Found');
      } else {
        resp.writeHead(200, { 'Content-Type': 'text/html' });
        resp.write(pgResp);
      }

      resp.end();
    });
  } else if (req.url === "/firepad/richtextsimple") {
    fs.readFile("routes/examples/richtext-simple.html", function (error, pgResp) {
      if (error) {
        resp.writeHead(404);
        resp.write('Contents you are looking are Not Found');
      } else {
        resp.writeHead(200, { 'Content-Type': 'text/html' });
        resp.write(pgResp);
      }

      resp.end();
    });
  } else {
    //4.
    resp.writeHead(200, { 'Content-Type': 'text/html' });
    resp.write('<h1>Product Manaager</h1><br /><br />To create product please enter: ' + req.url);
    resp.end();
  }
});
//5.
server.listen(5050);

getPublicIp();

module.exports = app;
