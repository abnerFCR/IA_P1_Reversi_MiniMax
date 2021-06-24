"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AyudanteTablero_1 = require("./AyudanteTablero");
var Minimax = /** @class */ (function () {
    function Minimax() {
        this.nodosExplorados = 0;
        this.ayudanteTablero = new AyudanteTablero_1.AyudanteTablero();
    }
    Minimax.prototype.Minimax = function () {
    };
    //returns max score move
    Minimax.prototype.resolver = function (tablero, jugador, profundidad, e) {
        this.nodosExplorados = 0;
        var mejorPuntuacion = -2147483648;
        var mejorMovimiento = null; //point
        var posiblesMovimientos = this.ayudanteTablero.obtenerPosiblesMovimientos(tablero, jugador);
        for (var indice = 0; indice < posiblesMovimientos.length; indice++) {
            var movimiento = posiblesMovimientos[indice];
            //for(let movimiento:Point of posiblesPuntos){
            //create new node
            var nuevoNodo = this.ayudanteTablero.obtenerNuevoTableroDespuesDeMover(tablero, movimiento, jugador);
            //recursive call
            var puntuacionHijo = this.MMAB(nuevoNodo, jugador, profundidad - 1, false, -2147483648, 2147483647, e);
            if (puntuacionHijo > mejorPuntuacion) {
                mejorPuntuacion = puntuacionHijo;
                mejorMovimiento = movimiento;
            }
        }
        console.log("Nodos Explorados : " + this.nodosExplorados);
        return mejorMovimiento;
    };
    //returns minimax value for a given node with A/B pruning
    Minimax.prototype.MMAB = function (nodo, jugador, profundidad, max, alpha, beta, e) {
        this.nodosExplorados++;
        //if terminal reached or depth limit reached evaluate
        if (profundidad == 0 || this.ayudanteTablero.finalizoElJuego(nodo)) {
            //BoardPrinter bpe = new BoardPrinter(node,"Depth : " + depth);
            return e.evaluar(nodo, jugador);
        }
        var oJugador = (jugador == 1) ? 2 : 1;
        //if no moves available then forfeit turn
        if ((max && !this.ayudanteTablero.hayAlgunMovimiento(nodo, jugador)) || (!max && !this.ayudanteTablero.hayAlgunMovimiento(nodo, oJugador))) {
            //System.out.println("Forfeit State Reached !");
            return this.MMAB(nodo, jugador, profundidad - 1, !max, alpha, beta, e);
        }
        var puntuacion;
        if (max) {
            //maximizing
            puntuacion = -2147483648;
            var posiblesMovimientos = this.ayudanteTablero.obtenerPosiblesMovimientos(nodo, jugador);
            for (var indice = 0; indice < posiblesMovimientos.length; indice++) {
                var movimiento = posiblesMovimientos[indice];
                //for(let movimiento:Point in this.ayudanteTablero.obtenerPosiblesMovimientos(nodo,jugador)){ //my turn
                //create new node
                var nuevoNodo = this.ayudanteTablero.obtenerNuevoTableroDespuesDeMover(nodo, movimiento, jugador);
                //recursive call
                var puntuacionHijo = this.MMAB(nuevoNodo, jugador, profundidad - 1, false, alpha, beta, e);
                if (puntuacionHijo > puntuacion)
                    puntuacion = puntuacionHijo;
                //update alpha
                if (puntuacion > alpha)
                    alpha = puntuacion;
                if (beta <= alpha)
                    break; //Beta Cutoff
            }
        }
        else {
            //minimizing
            puntuacion = 2147483647;
            var posiblesMovimientos = this.ayudanteTablero.obtenerPosiblesMovimientos(nodo, oJugador);
            for (var indice = 0; indice < posiblesMovimientos.length; indice++) {
                var movimiento = posiblesMovimientos[indice];
                //for(let movimiento:Point in this.ayudanteTablero.obtenerPosiblesMovimientos(nodo,oJugador)){ //opponent turn
                //create new node
                var nuevoNodo = this.ayudanteTablero.obtenerNuevoTableroDespuesDeMover(nodo, movimiento, oJugador);
                //recursive call
                var puntuacionHijo = this.MMAB(nuevoNodo, jugador, profundidad - 1, true, alpha, beta, e);
                if (puntuacionHijo < puntuacion)
                    puntuacion = puntuacionHijo;
                //update beta
                if (puntuacion < beta)
                    beta = puntuacion;
                if (beta <= alpha)
                    break; //Alpha Cutoff
            }
        }
        return puntuacion;
    };
    return Minimax;
}());
exports.Minimax = Minimax;
