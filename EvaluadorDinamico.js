"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AyudanteTablero_1 = require("./AyudanteTablero");
var Evaluador_1 = require("./Evaluador");
var EvaluadorEstatico_1 = require("./EvaluadorEstatico");
var EvaluadorDinamico = /** @class */ (function () {
    function EvaluadorDinamico() {
        this.ayudanteTablero = new AyudanteTablero_1.AyudanteTablero();
        this.evaluadorEstatico = new EvaluadorEstatico_1.EvaluadorEstatico();
    }
    EvaluadorDinamico.prototype.EvaluadorDinamico = function () {
    };
    EvaluadorDinamico.prototype.evaluar = function (tablero, jugador) {
        //terminal
        if (this.ayudanteTablero.finalizoElJuego(tablero)) {
            return 1000 * this.evaluadorEstatico.evaluarDiferenciaPiezas(tablero, jugador);
        }
        //semi-terminal
        switch (this.obtenerNombreFase(tablero)) {
            case Evaluador_1.FaseJuego.INICIO:
                return 1000 * this.evaluadorEstatico.evaluarEsquina(tablero, jugador) + 50 * this.evaluadorEstatico.evaluarMovilidad(tablero, jugador);
            case Evaluador_1.FaseJuego.MEDIO:
                return 1000 * this.evaluadorEstatico.evaluarEsquina(tablero, jugador) + 20 * this.evaluadorEstatico.evaluarMovilidad(tablero, jugador) + 10 * this.evaluadorEstatico.evaluarDiferenciaPiezas(tablero, jugador) + 100 * this.evaluadorEstatico.evaluadorParidad(tablero);
            case Evaluador_1.FaseJuego.FINAL:
            default:
                return 1000 * this.evaluadorEstatico.evaluarEsquina(tablero, jugador) + 100 * this.evaluadorEstatico.evaluarMovilidad(tablero, jugador) + 500 * this.evaluadorEstatico.evaluarDiferenciaPiezas(tablero, jugador) + 500 * this.evaluadorEstatico.evaluadorParidad(tablero);
        }
    };
    EvaluadorDinamico.prototype.obtenerNombreFase = function (tablero) {
        var sc = this.ayudanteTablero.obtenerTotalPiezas(tablero);
        if (sc < 20)
            return Evaluador_1.FaseJuego.INICIO;
        else if (sc <= 58)
            return Evaluador_1.FaseJuego.MEDIO;
        else
            return Evaluador_1.FaseJuego.FINAL;
    };
    return EvaluadorDinamico;
}());
exports.EvaluadorDinamico = EvaluadorDinamico;
