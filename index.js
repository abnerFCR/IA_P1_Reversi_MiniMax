var express = require('express');

var app = express();

app.get('/', function (req, res) {
    console.log(req);
    console.log(res);
    res.send('11');
})

app.get('/informacion', function (req, res) {
  res.send('Abner Fernando Cardona Ramirez - 201603095');
  console.log("Informacion");
})

app.listen(3001);