
//Library Imports
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let Logger = require('./services/logger');
let mongoose = require('mongoose');
const cors = require('cors');
var http = require('http');
var fs = require('fs');

let app = express();

app.use(Logger.morgan);

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

//CORS
app.use(cors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Origin', ' X-Requested-With', ' Content-Type', ' Accept ', ' Authorization'],
    credentials: true
}));

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

console.log('Server Started listening on 5050');
//Routes Config
let index = require('./routes/index');
app.use('/', index);
app.use(express.static(path.join(__dirname, 'upload')));
module.exports = app;
