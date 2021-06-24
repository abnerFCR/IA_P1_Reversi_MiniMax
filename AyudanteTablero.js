"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AyudanteTablero = /** @class */ (function () {
    function AyudanteTablero() {
    }
    AyudanteTablero.prototype.AyudanteTablero = function () {
    };
    AyudanteTablero.prototype.finalizoElJuego = function (tablero) {
        return !(this.hayAlgunMovimiento(tablero, 1) || this.hayAlgunMovimiento(tablero, 2));
    };
    AyudanteTablero.prototype.hayAlgunMovimiento = function (tablero, jugador) {
        return this.obtenerPosiblesMovimientos(tablero, jugador).length > 0;
    };
    AyudanteTablero.prototype.obtenerPosiblesMovimientos = function (tablero, jugador) {
        var resultado = [];
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                if (this.puedeJugar(tablero, jugador, i, j)) {
                    var nuevo = { x: i, y: j };
                    resultado.push(nuevo);
                }
            }
        }
        return resultado;
    };
    AyudanteTablero.prototype.puedeJugar = function (tablero, jugador, i, j) {
        if (tablero[i][j] != 0)
            return false;
        var mi, mj, c;
        var oJugador = ((jugador == 1) ? 2 : 1);
        //move up
        mi = i - 1;
        mj = j;
        c = 0;
        while (mi > 0 && tablero[mi][mj] == oJugador) {
            mi--;
            c++;
        }
        if (mi >= 0 && tablero[mi][mj] == jugador && c > 0)
            return true;
        //move down
        mi = i + 1;
        mj = j;
        c = 0;
        while (mi < 7 && tablero[mi][mj] == oJugador) {
            mi++;
            c++;
        }
        if (mi <= 7 && tablero[mi][mj] == jugador && c > 0)
            return true;
        //move left
        mi = i;
        mj = j - 1;
        c = 0;
        while (mj > 0 && tablero[mi][mj] == oJugador) {
            mj--;
            c++;
        }
        if (mj >= 0 && tablero[mi][mj] == jugador && c > 0)
            return true;
        //move right
        mi = i;
        mj = j + 1;
        c = 0;
        while (mj < 7 && tablero[mi][mj] == oJugador) {
            mj++;
            c++;
        }
        if (mj <= 7 && tablero[mi][mj] == jugador && c > 0)
            return true;
        //move up left
        mi = i - 1;
        mj = j - 1;
        c = 0;
        while (mi > 0 && mj > 0 && tablero[mi][mj] == oJugador) {
            mi--;
            mj--;
            c++;
        }
        if (mi >= 0 && mj >= 0 && tablero[mi][mj] == jugador && c > 0)
            return true;
        //move up right
        mi = i - 1;
        mj = j + 1;
        c = 0;
        while (mi > 0 && mj < 7 && tablero[mi][mj] == oJugador) {
            mi--;
            mj++;
            c++;
        }
        if (mi >= 0 && mj <= 7 && tablero[mi][mj] == jugador && c > 0)
            return true;
        //move down left
        mi = i + 1;
        mj = j - 1;
        c = 0;
        while (mi < 7 && mj > 0 && tablero[mi][mj] == oJugador) {
            mi++;
            mj--;
            c++;
        }
        if (mi <= 7 && mj >= 0 && tablero[mi][mj] == jugador && c > 0)
            return true;
        //move down right
        mi = i + 1;
        mj = j + 1;
        c = 0;
        while (mi < 7 && mj < 7 && tablero[mi][mj] == oJugador) {
            mi++;
            mj++;
            c++;
        }
        if (mi <= 7 && mj <= 7 && tablero[mi][mj] == jugador && c > 0)
            return true;
        //when all hopes fade away
        return false;
    };
    //PUEDE SER QUE ACA FALLE POR LAS VARIABLES EN CASO DE QUE FALLE VOLVER A TRASFORMAR ESTE CODIGO
    AyudanteTablero.prototype.obtenerPuntosInversos = function (tablero, jugador, i, j) {
        var todosPuntosInversos = [];
        var mi, mj, c;
        var oJugador = ((jugador == 1) ? 2 : 1);
        //move up
        var mupts = [];
        mi = i - 1;
        mj = j;
        while (mi > 0 && tablero[mi][mj] == oJugador) {
            var nuevo = { x: mi, y: mj };
            mupts.push(nuevo);
            mi--;
        }
        if (mi >= 0 && tablero[mi][mj] == jugador && mupts.length > 0) {
            for (var ii = 0; ii < mupts.length; ii++) {
                todosPuntosInversos.push(mupts[ii]);
            }
        }
        //move down
        var mdpts = [];
        mi = i + 1;
        mj = j;
        while (mi < 7 && tablero[mi][mj] == oJugador) {
            var nuevo = { x: mi, y: mj };
            mdpts.push(nuevo);
            mi++;
        }
        if (mi <= 7 && tablero[mi][mj] == jugador && mdpts.length > 0) {
            for (var ii = 0; ii < mdpts.length; ii++) {
                todosPuntosInversos.push(mdpts[ii]);
            }
        }
        //move left
        var mlpts = [];
        mi = i;
        mj = j - 1;
        while (mj > 0 && tablero[mi][mj] == oJugador) {
            var nuevo = { x: mi, y: mj };
            mlpts.push(nuevo);
            mj--;
        }
        if (mj >= 0 && tablero[mi][mj] == jugador && mlpts.length > 0) {
            for (var ii = 0; ii < mlpts.length; ii++) {
                todosPuntosInversos.push(mlpts[ii]);
            }
        }
        //move right
        var mrpts = [];
        mi = i;
        mj = j + 1;
        while (mj < 7 && tablero[mi][mj] == oJugador) {
            var nuevo = { x: mi, y: mj };
            mrpts.push(nuevo);
            mj++;
        }
        if (mj <= 7 && tablero[mi][mj] == jugador && mrpts.length > 0) {
            for (var ii = 0; ii < mrpts.length; ii++) {
                todosPuntosInversos.push(mrpts[ii]);
            }
        }
        //move up left
        var mulpts = [];
        mi = i - 1;
        mj = j - 1;
        while (mi > 0 && mj > 0 && tablero[mi][mj] == oJugador) {
            var nuevo = { x: mi, y: mj };
            mulpts.push(nuevo);
            mi--;
            mj--;
        }
        if (mi >= 0 && mj >= 0 && tablero[mi][mj] == jugador && mulpts.length > 0) {
            for (var ii = 0; ii < mulpts.length; ii++) {
                todosPuntosInversos.push(mulpts[ii]);
            }
        }
        //move up right
        var murpts = [];
        mi = i - 1;
        mj = j + 1;
        while (mi > 0 && mj < 7 && tablero[mi][mj] == oJugador) {
            var nuevo = { x: mi, y: mj };
            murpts.push(nuevo);
            mi--;
            mj++;
        }
        if (mi >= 0 && mj <= 7 && tablero[mi][mj] == jugador && murpts.length > 0) {
            for (var ii = 0; ii < murpts.length; ii++) {
                todosPuntosInversos.push(murpts[ii]);
            }
        }
        //move down left
        var mdlpts = [];
        mi = i + 1;
        mj = j - 1;
        while (mi < 7 && mj > 0 && tablero[mi][mj] == oJugador) {
            var nuevo = { x: mi, y: mj };
            mdlpts.push(nuevo);
            mi++;
            mj--;
        }
        if (mi <= 7 && mj >= 0 && tablero[mi][mj] == jugador && mdlpts.length > 0) {
            for (var ii = 0; ii < mdlpts.length; ii++) {
                todosPuntosInversos.push(mdlpts[ii]);
            }
        }
        //move down right
        var mdrpts = [];
        mi = i + 1;
        mj = j + 1;
        while (mi < 7 && mj < 7 && tablero[mi][mj] == oJugador) {
            var nuevo = { x: mi, y: mj };
            mdrpts.push(nuevo);
            mi++;
            mj++;
        }
        if (mi <= 7 && mj <= 7 && tablero[mi][mj] == jugador && mdrpts.length > 0) {
            for (var ii = 0; ii < mdrpts.length; ii++) {
                todosPuntosInversos.push(mdrpts[ii]);
            }
        }
        return todosPuntosInversos;
    };
    AyudanteTablero.prototype.obtenerNuevoTableroDespuesDeMover = function (tablero, movimiento, jugador) {
        //get clone of old board
        var nuevoTablero = [[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]];
        for (var k = 0; k < 8; k++) {
            for (var l = 0; l < 8; l++) {
                nuevoTablero[k][l] = tablero[k][l];
            }
        }
        //place piece
        nuevoTablero[movimiento.x][movimiento.y] = jugador;
        //reverse pieces
        var rev = this.obtenerPuntosInversos(nuevoTablero, jugador, movimiento.x, movimiento.y);
        for (var indice = 0; indice < rev.length; indice++) {
            nuevoTablero[rev[indice].x][rev[indice].y] = jugador;
        }
        return nuevoTablero;
    };
    return AyudanteTablero;
}());
exports.AyudanteTablero = AyudanteTablero;
