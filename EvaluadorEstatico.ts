import { AyudanteTablero } from "./AyudanteTablero";
import { Evaluador } from "./Evaluador";

export class EvaluadorEstatico implements Evaluador{

    ayudanteTablero = new AyudanteTablero();

    evaluar(tablero: number[][], jugador: number): number {
        let mob = this.evaluarMovilidad(tablero,jugador);
        let sc = this.evaluarDiferenciaPiezas(tablero,jugador);
        return 2*mob + sc + 1000*this.evaluarEsquina(tablero,jugador);
    }


    public evaluarDiferenciaPiezas(tablero:number[][], jugador:number):number{
        let oJugador:number = (jugador==1) ? 2 : 1;

        let mySC:number = this.ayudanteTablero.obtenerTotalPiezasJugador(tablero,jugador);
        let opSC:number = this.ayudanteTablero.obtenerTotalPiezasJugador(tablero,oJugador);

        return 100 * (mySC - opSC) / (mySC + opSC);
    }

    public evaluarMovilidad(tablero:number[][], jugador:number):number{
        let oJugador:number = (jugador==1) ? 2 : 1;

        let myMoveCount:number = this.ayudanteTablero.obtenerPosiblesMovimientos(tablero,jugador).length;
        let opMoveCount:number = this.ayudanteTablero.obtenerPosiblesMovimientos(tablero,oJugador).length;

        return 100 * (myMoveCount - opMoveCount) / (myMoveCount + opMoveCount + 1);
    }

    public evaluarEsquina(tablero:number[][], jugador:number):number{
        let oJugador:number = (jugador==1) ? 2 : 1;

        let myCorners:number = 0;
        let opCorners:number = 0;

        if(tablero[0][0]==jugador) myCorners++;
        if(tablero[7][0]==jugador) myCorners++;
        if(tablero[0][7]==jugador) myCorners++;
        if(tablero[7][7]==jugador) myCorners++;

        if(tablero[0][0]==oJugador) opCorners++;
        if(tablero[7][0]==oJugador) opCorners++;
        if(tablero[0][7]==oJugador) opCorners++;
        if(tablero[7][7]==oJugador) opCorners++;

        return 100 * (myCorners - opCorners) / (myCorners + opCorners + 1);
    }
    public evaluadorParidad(tablero:number[][]):number{
        let remDiscs = 64 - this.ayudanteTablero.obtenerTotalPiezas(tablero);
        return remDiscs % 2 == 0 ? -1 : 1;
    }
}