var express = require('express');
var Minimax = require("./Minimax");
var Evaluador = require("./Evaluador");
var EvaluadorDinamico = require("./EvaluadorDinamico");

var app = express();

app.get('/', function (req, res) {
    //1 -> blanco (Jugador 1) -> 2    - 1    
    //0 -> negro  (Jugador 2) -> 1    - 2 
    //2 -> espacio blanco     -> 0       
    console.log(req.url);
    let url = req.url.toString().substring(2,req.url.length);
    let partes = url.split('&');
    let turno = partes[0].substring(6,partes[0].length);
    let estado = partes[1].substring(7,partes[1].length);

    if(turno == '1'){
        turnoN = 1;
    }else{
        turnoN = 2;
    }
    let posicion = 0;
    let tablero=[];
    for(let i = 0; i<8; i++){
        let fila = [];
        for(let j = 0; j<8; j++){
            if(estado[posicion] == '1'){
                fila.push(1);
            }else if(estado[posicion]=='2'){
                fila.push(0);
            }else{
                fila.push(2);
            }
            posicion++;
        }
        tablero.push(fila);
    }
    let minimax = new Minimax.Minimax();

    evaluador = new EvaluadorDinamico.EvaluadorDinamico();

    let respuesta = minimax.resolver(tablero,turnoN,6,evaluador);
    console.log(turno);
    console.log(tablero);
    console.log(respuesta.x+','+respuesta.y);
    res.send(respuesta.x+''+respuesta.y);
})

app.get('/informacion', function (req, res) {
  res.send('Abner Fernando Cardona Ramirez - 201603095');
  console.log("Informacion");
})

app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running..."));