var express = require('express');

var app = express();

app.get('/', function (req, res) {
    console.log(req.url);
    let url = req.url.toString().substring(2,req.url.length);
    let partes = url.split('&');
    let turno = partes[0].substring(6,partes[0].length);
    let estado = partes[1].substring(7,partes[1].length);
    console.log('turno:', turno);
    console.log('estado:', estado);
    res.send('15');
})

app.get('/informacion', function (req, res) {
  res.send('Abner Fernando Cardona Ramirez - 201603095');
  console.log("Informacion");
})

app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running..."));