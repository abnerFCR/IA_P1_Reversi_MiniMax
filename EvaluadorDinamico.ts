import { AyudanteTablero } from "./AyudanteTablero";
import { Evaluador, FaseJuego } from "./Evaluador";
import { EvaluadorEstatico } from "./EvaluadorEstatico";

export class EvaluadorDinamico implements Evaluador{

    ayudanteTablero = new AyudanteTablero();
    evaluadorEstatico = new EvaluadorEstatico();
    EvaluadorDinamico(){

    }

    evaluar(tablero: number[][], jugador: number): number {
        //terminal
        if(this.ayudanteTablero.finalizoElJuego(tablero)){
            return 1000 * this.evaluadorEstatico.evaluarDiferenciaPiezas(tablero, jugador);
        }

        //semi-terminal
        switch (this.obtenerNombreFase(tablero)){
            case FaseJuego.INICIO:
                return 1000*this.evaluadorEstatico.evaluarEsquina(tablero,jugador) + 50*this.evaluadorEstatico.evaluarMovilidad(tablero,jugador);
            case FaseJuego.MEDIO:
                return 1000*this.evaluadorEstatico.evaluarEsquina(tablero,jugador) + 20*this.evaluadorEstatico.evaluarMovilidad(tablero,jugador) + 10*this.evaluadorEstatico.evaluarDiferenciaPiezas(tablero, jugador) + 100*this.evaluadorEstatico.evaluadorParidad(tablero);
            case FaseJuego.FINAL:
            default:
                return 1000*this.evaluadorEstatico.evaluarEsquina(tablero,jugador) + 100*this.evaluadorEstatico.evaluarMovilidad(tablero,jugador) + 500*this.evaluadorEstatico.evaluarDiferenciaPiezas(tablero, jugador) + 500*this.evaluadorEstatico.evaluadorParidad(tablero);
        }
    }

    

    private obtenerNombreFase(tablero:number[][]):FaseJuego{
        let sc:number = this.ayudanteTablero.obtenerTotalPiezas(tablero);
        if(sc<20) return FaseJuego.INICIO;
        else if(sc<=58) return FaseJuego.MEDIO;
        else return FaseJuego.FINAL;
    }
}