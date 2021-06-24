import { Point } from "./Point";

export class AyudanteTablero{

    AyudanteTablero(){

    }

    public finalizoElJuego(tablero:number[][]):boolean{
        return !(this.hayAlgunMovimiento(tablero,1) || this.hayAlgunMovimiento(tablero,2));
    }

    public hayAlgunMovimiento(tablero:number[][], jugador:number):boolean{
        return this.obtenerPosiblesMovimientos(tablero,jugador).length > 0; 
    }

    public obtenerPosiblesMovimientos(tablero:number[][], jugador:number):Point[]{
        
        let resultado:Point[] = [];
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if(this.puedeJugar(tablero,jugador,i,j)){
                    let nuevo:Point ={x: i, y: j};
                    resultado.push(nuevo);
                }
            }
        }
        return resultado;
    }

    public puedeJugar(tablero:number[][],jugador:number,i:number,j:number):boolean{

        if(tablero[i][j] != 0) return false;

        let mi:number , mj:number, c:number;
        let oJugador:number = ((jugador == 1) ? 2 : 1);

        //move up
        mi = i - 1;
        mj = j;
        c = 0;
        while(mi>0 && tablero[mi][mj] == oJugador){
            mi--;
            c++;
        }
        if(mi>=0 && tablero[mi][mj] == jugador && c>0) return true;


        //move down
        mi = i + 1;
        mj = j;
        c = 0;
        while(mi<7 && tablero[mi][mj] == oJugador){
            mi++;
            c++;
        }
        if(mi<=7 && tablero[mi][mj] == jugador && c>0) return true;

        //move left
        mi = i;
        mj = j - 1;
        c = 0;
        while(mj>0 && tablero[mi][mj] == oJugador){
            mj--;
            c++;
        }
        if(mj>=0 && tablero[mi][mj] == jugador && c>0) return true;

        //move right
        mi = i;
        mj = j + 1;
        c = 0;
        while(mj<7 && tablero[mi][mj] == oJugador){
            mj++;
            c++;
        }
        if(mj<=7 && tablero[mi][mj] == jugador && c>0) return true;

        //move up left
        mi = i - 1;
        mj = j - 1;
        c = 0;
        while(mi>0 && mj>0 && tablero[mi][mj] == oJugador){
            mi--;
            mj--;
            c++;
        }
        if(mi>=0 && mj>=0 && tablero[mi][mj] == jugador && c>0) return true;

        //move up right
        mi = i - 1;
        mj = j + 1;
        c = 0;
        while(mi>0 && mj<7 && tablero[mi][mj] == oJugador){
            mi--;
            mj++;
            c++;
        }
        if(mi>=0 && mj<=7 && tablero[mi][mj] == jugador && c>0) return true;

        //move down left
        mi = i + 1;
        mj = j - 1;
        c = 0;
        while(mi<7 && mj>0 && tablero[mi][mj] == oJugador){
            mi++;
            mj--;
            c++;
        }
        if(mi<=7 && mj>=0 && tablero[mi][mj] == jugador && c>0) return true;

        //move down right
        mi = i + 1;
        mj = j + 1;
        c = 0;
        while(mi<7 && mj<7 && tablero[mi][mj] == oJugador){
            mi++;
            mj++;
            c++;
        }
        if(mi<=7 && mj<=7 && tablero[mi][mj] == jugador && c>0) return true;

        //when all hopes fade away
        return false;
    }

    //PUEDE SER QUE ACA FALLE POR LAS VARIABLES EN CASO DE QUE FALLE VOLVER A TRASFORMAR ESTE CODIGO
    public obtenerPuntosInversos(tablero:number[][], jugador:number, i:number, j:number):Point[]{

        let todosPuntosInversos:Point[] = [];

        let mi:number , mj:number , c:number;
        let oJugador:number = ((jugador == 1) ? 2 : 1);

        //move up
        let mupts:Point[] = [];
        mi = i - 1;
        mj = j;
        while(mi>0 && tablero[mi][mj] == oJugador){
            let nuevo:Point = {x:mi,y:mj};
            mupts.push(nuevo);
            mi--;
        }
        if(mi>=0 && tablero[mi][mj] == jugador && mupts.length >0){
            for(let ii = 0 ;ii < mupts.length ; ii++){
                todosPuntosInversos.push(mupts[ii]);
            }
        }


        //move down
        let mdpts:Point[] = [];
        mi = i + 1;
        mj = j;
        while(mi<7 && tablero[mi][mj] == oJugador){
            let nuevo:Point = {x:mi,y:mj};
            mdpts.push(nuevo);
            mi++;
        }
        if(mi<=7 && tablero[mi][mj] == jugador && mdpts.length>0){
            for(let ii = 0 ;ii < mdpts.length ; ii++){
                todosPuntosInversos.push(mdpts[ii]);
            }
        }

        //move left
        let mlpts:Point[] = [];
        mi = i;
        mj = j - 1;
        while(mj>0 && tablero[mi][mj] == oJugador){
            let nuevo:Point = {x:mi,y:mj};
            mlpts.push(nuevo);
            mj--;
        }
        if(mj>=0 && tablero[mi][mj] == jugador && mlpts.length>0){
            for(let ii = 0 ;ii < mlpts.length ; ii++){
                todosPuntosInversos.push(mlpts[ii]);
            }
        }

        //move right
        let mrpts:Point[] = [];
        mi = i;
        mj = j + 1;
        while(mj<7 && tablero[mi][mj] == oJugador){
            let nuevo:Point = {x: mi, y: mj};
            mrpts.push(nuevo);
            mj++;
        }
        if(mj<=7 && tablero[mi][mj] == jugador && mrpts.length>0){
            for(let ii = 0 ;ii < mrpts.length ; ii++){
                todosPuntosInversos.push(mrpts[ii]);
            }
        }

        //move up left
        let mulpts:Point[] = [];
        mi = i - 1;
        mj = j - 1;
        while(mi>0 && mj>0 && tablero[mi][mj] == oJugador){
            let nuevo:Point = {x:mi,y:mj};
            mulpts.push(nuevo);
            mi--;
            mj--;
        }
        if(mi>=0 && mj>=0 && tablero[mi][mj] == jugador && mulpts.length>0){
            for(let ii = 0 ;ii < mulpts.length ; ii++){
                todosPuntosInversos.push(mulpts[ii]);
            }
        }

        //move up right
        let murpts:Point[] = [];
        mi = i - 1;
        mj = j + 1;
        while(mi>0 && mj<7 && tablero[mi][mj] == oJugador){
            let nuevo:Point = {x:mi,y:mj};
            murpts.push(nuevo);
            mi--;
            mj++;
        }
        if(mi>=0 && mj<=7 && tablero[mi][mj] == jugador && murpts.length>0){
            for(let ii = 0 ;ii < murpts.length ; ii++){
                todosPuntosInversos.push(murpts[ii]);
            }
        }

        //move down left
        let mdlpts:Point[] = [];
        mi = i + 1;
        mj = j - 1;
        while(mi<7 && mj>0 && tablero[mi][mj] == oJugador){
            let nuevo:Point = {x:mi,y:mj};
            mdlpts.push(nuevo);
            mi++;
            mj--;
        }
        if(mi<=7 && mj>=0 && tablero[mi][mj] == jugador && mdlpts.length>0){
            for(let ii = 0 ;ii < mdlpts.length ; ii++){
                todosPuntosInversos.push(mdlpts[ii]);
            }
        }

        //move down right
        let mdrpts:Point[] = [];
        mi = i + 1;
        mj = j + 1;
        while(mi<7 && mj<7 && tablero[mi][mj] == oJugador){
            let nuevo:Point = {x:mi,y:mj};
            mdrpts.push(nuevo);
            mi++;
            mj++;
        }
        if(mi<=7 && mj<=7 && tablero[mi][mj] == jugador && mdrpts.length>0){
            for(let ii = 0 ;ii < mdrpts.length ; ii++){
                todosPuntosInversos.push(mdrpts[ii]);
            }
        }

        return todosPuntosInversos;
    }

    public obtenerNuevoTableroDespuesDeMover(tablero:number[][], movimiento:Point, jugador:number):number[][]{
        //get clone of old board
        let nuevoTablero:number[][] = [[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]];
        for (let k = 0; k < 8; k++) {
            for (let l = 0; l < 8; l++) {
                nuevoTablero[k][l] = tablero[k][l];
            }
        }

        //place piece
        nuevoTablero[movimiento.x][movimiento.y] = jugador;
        //reverse pieces
        let rev:Point[] = this.obtenerPuntosInversos(nuevoTablero,jugador,movimiento.x,movimiento.y);
        
        for(let indice = 0 ; indice < rev.length; indice++){
            nuevoTablero[rev[indice].x][rev[indice].y] = jugador;
        }

        return nuevoTablero;
    }

    public obtenerTotalPiezas(tablero:number[][]):number{
        let c = 0;
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if(tablero[i][j] != 0) c++;
            }
        }
        return c;
    }

    public obtenerTotalPiezasJugador(tablero:number[][], jugador:number):number{
        let score = 0;
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if(tablero[i][j] == jugador) score++;
            }
        }
        return score;
    }
}