"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AyudanteTablero_1 = require("./AyudanteTablero");
var EvaluadorEstatico = /** @class */ (function () {
    function EvaluadorEstatico() {
        this.ayudanteTablero = new AyudanteTablero_1.AyudanteTablero();
    }
    EvaluadorEstatico.prototype.evaluar = function (tablero, jugador) {
        var mob = this.evaluarMovilidad(tablero, jugador);
        var sc = this.evaluarDiferenciaPiezas(tablero, jugador);
        return 2 * mob + sc + 1000 * this.evaluarEsquina(tablero, jugador);
    };
    EvaluadorEstatico.prototype.evaluarDiferenciaPiezas = function (tablero, jugador) {
        var oJugador = (jugador == 1) ? 2 : 1;
        var mySC = this.ayudanteTablero.obtenerTotalPiezasJugador(tablero, jugador);
        var opSC = this.ayudanteTablero.obtenerTotalPiezasJugador(tablero, oJugador);
        return 100 * (mySC - opSC) / (mySC + opSC);
    };
    EvaluadorEstatico.prototype.evaluarMovilidad = function (tablero, jugador) {
        var oJugador = (jugador == 1) ? 2 : 1;
        var myMoveCount = this.ayudanteTablero.obtenerPosiblesMovimientos(tablero, jugador).length;
        var opMoveCount = this.ayudanteTablero.obtenerPosiblesMovimientos(tablero, oJugador).length;
        return 100 * (myMoveCount - opMoveCount) / (myMoveCount + opMoveCount + 1);
    };
    EvaluadorEstatico.prototype.evaluarEsquina = function (tablero, jugador) {
        var oJugador = (jugador == 1) ? 2 : 1;
        var myCorners = 0;
        var opCorners = 0;
        if (tablero[0][0] == jugador)
            myCorners++;
        if (tablero[7][0] == jugador)
            myCorners++;
        if (tablero[0][7] == jugador)
            myCorners++;
        if (tablero[7][7] == jugador)
            myCorners++;
        if (tablero[0][0] == oJugador)
            opCorners++;
        if (tablero[7][0] == oJugador)
            opCorners++;
        if (tablero[0][7] == oJugador)
            opCorners++;
        if (tablero[7][7] == oJugador)
            opCorners++;
        return 100 * (myCorners - opCorners) / (myCorners + opCorners + 1);
    };
    EvaluadorEstatico.prototype.evaluadorParidad = function (tablero) {
        var remDiscs = 64 - this.ayudanteTablero.obtenerTotalPiezas(tablero);
        return remDiscs % 2 == 0 ? -1 : 1;
    };
    return EvaluadorEstatico;
}());
exports.EvaluadorEstatico = EvaluadorEstatico;
