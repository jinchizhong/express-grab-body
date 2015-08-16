var express = require('express');
var bodyGrab = require('..');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyGrab.init());
app.use(bodyParser.json());
app.use(bodyGrab.grab());

app.all('/', function(req, res) {
  console.log(req.body);
  console.log(req.rawBody);

  res.send(req.rawBody);
});

app.listen(3000);
