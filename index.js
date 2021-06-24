var express = require('express');

var app = express();

app.get('/', function (req, res) {
    console.log(req.url);
    console.log(req.url.turno)
    console.log(req.url.estado)
    res.send('14');
})

app.get('/informacion', function (req, res) {
  res.send('Abner Fernando Cardona Ramirez - 201603095');
  console.log("Informacion");
})

app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running..."));