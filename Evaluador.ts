export interface Evaluador{
    evaluar(tablero:number[][],jugador:number):number;
}
export enum FaseJuego {
    INICIO,
    MEDIO,
    FINAL
}