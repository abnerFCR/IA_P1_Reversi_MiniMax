var express = require('express');

var app = express();

app.get('/', function (req, res) {
    const {
        turno, estado
    }=req.path;

    console.log('Turno: ', turno);
    console.log('Estado: ', estado);
    res.send('11');
})

app.get('/informacion', function (req, res) {
  res.send('Abner Fernando Cardona Ramirez - 201603095');
  console.log("Informacion");
})

app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running..."));