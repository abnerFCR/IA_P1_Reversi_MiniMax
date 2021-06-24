import { AyudanteTablero } from "./AyudanteTablero";
import { Evaluador } from "./Evaluador";
import { Point } from "./Point";


export class Minimax {

    nodosExplorados:number = 0;
    ayudanteTablero:AyudanteTablero= new AyudanteTablero();
    Minimax(){

    }

    //returns max score move
    public resolver(tablero:number[][], jugador:number,profundidad:number, e:Evaluador):Point{
        this.nodosExplorados = 0;
        let mejorPuntuacion = -2147483648;
        let mejorMovimiento:any = null;  //point
    
        let posiblesMovimientos = this.ayudanteTablero.obtenerPosiblesMovimientos(tablero,jugador);
        for(let indice = 0 ; indice < posiblesMovimientos.length ; indice++){
            let movimiento:Point = posiblesMovimientos[indice];
        //for(let movimiento:Point of posiblesPuntos){
            //create new node
            let nuevoNodo:number[][] = this.ayudanteTablero.obtenerNuevoTableroDespuesDeMover(tablero,movimiento,jugador);
            //recursive call
            let puntuacionHijo:number = this.MMAB(nuevoNodo,jugador,profundidad-1,false,-2147483648,2147483647,e);
            if(puntuacionHijo > mejorPuntuacion) {
                mejorPuntuacion = puntuacionHijo;
                mejorMovimiento = movimiento;
            }
        }
        console.log("Nodos Explorados : " + this.nodosExplorados);
        return mejorMovimiento;
    }

    //returns minimax value for a given node with A/B pruning
    public MMAB(nodo:number[][],jugador:number,profundidad:number,max:boolean,alpha:number,beta:number,e:Evaluador):number{
        this.nodosExplorados++;
        //if terminal reached or depth limit reached evaluate
        if(profundidad == 0 || this.ayudanteTablero.finalizoElJuego(nodo)){
            //BoardPrinter bpe = new BoardPrinter(node,"Depth : " + depth);
            return e.evaluar(nodo,jugador);
        }
        let oJugador:number = (jugador==1) ? 2 : 1;
        //if no moves available then forfeit turn
        if((max && !this.ayudanteTablero.hayAlgunMovimiento(nodo,jugador)) || (!max && !this.ayudanteTablero.hayAlgunMovimiento(nodo,oJugador))){
            //System.out.println("Forfeit State Reached !");
            return this.MMAB(nodo,jugador,profundidad-1,!max,alpha,beta,e);
        }
        let puntuacion:number;
        if(max){
            //maximizing
            puntuacion = -2147483648;
            let posiblesMovimientos = this.ayudanteTablero.obtenerPosiblesMovimientos(nodo,jugador);
            for(let indice = 0 ; indice < posiblesMovimientos.length ; indice++){
                let movimiento:Point = posiblesMovimientos[indice];
            //for(let movimiento:Point in this.ayudanteTablero.obtenerPosiblesMovimientos(nodo,jugador)){ //my turn
                //create new node
                let nuevoNodo:number[][] = this.ayudanteTablero.obtenerNuevoTableroDespuesDeMover(nodo,movimiento,jugador);
                //recursive call
                let puntuacionHijo:number = this.MMAB(nuevoNodo,jugador,profundidad-1,false,alpha,beta,e);
                
                if(puntuacionHijo > puntuacion) puntuacion = puntuacionHijo;
                //update alpha
                if(puntuacion > alpha) alpha = puntuacion;
                if(beta <= alpha) break; //Beta Cutoff
            }
        }else{
            //minimizing
            puntuacion = 2147483647;
            let posiblesMovimientos = this.ayudanteTablero.obtenerPosiblesMovimientos(nodo,oJugador);
            for(let indice = 0 ; indice < posiblesMovimientos.length ; indice++){
                let movimiento:Point = posiblesMovimientos[indice];
            //for(let movimiento:Point in this.ayudanteTablero.obtenerPosiblesMovimientos(nodo,oJugador)){ //opponent turn
                //create new node
                let nuevoNodo:number[][] = this.ayudanteTablero.obtenerNuevoTableroDespuesDeMover(nodo,movimiento,oJugador);
                //recursive call
                let puntuacionHijo:number = this.MMAB(nuevoNodo,jugador,profundidad-1,true,alpha,beta,e);
                if(puntuacionHijo < puntuacion) puntuacion = puntuacionHijo;
                //update beta
                if(puntuacion < beta) beta = puntuacion;
                if(beta <= alpha) break; //Alpha Cutoff
            }
        }
        return puntuacion;
    }

}