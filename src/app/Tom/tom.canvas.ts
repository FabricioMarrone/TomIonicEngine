import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
    selector: "tom-canvas",
    templateUrl: 'tom.canvas.html'
})
export class TomCanvasComp {

    /**
     * 'plug into' DOM canvas element using @ViewChild
     */
    @ViewChild('canvas') canvasEl : ElementRef;

    private _CANVAS  : any;
    private _CONTEXT : any;
    
    private posX: number;
    lastX: number;
    lastY: number;

    currentX: number;
    currentY: number;

    constructor(public navCtrl: NavController, 
        public navParams: NavParams) {

    }

    ionViewDidLoad()
    {
        this.initialiseCanvas();
    }

    initialiseCanvas()
    {
        this._CANVAS 	    = this.canvasEl.nativeElement;
        //this._CANVAS.width  	= 500;
        //this._CANVAS.height 	= 500;
        this._CANVAS.width = window.innerWidth;
        this._CANVAS.height = window.innerHeight;

        this._CONTEXT = this._CANVAS.getContext("2d");
        
        this.posX = 250;
    }

    handleClick(ev){
 
        //this.lastX = ev.touches[0].pageX;
        //this.lastY = ev.touches[0].pageY;
        
        //Layer gets the coords relatives to the canvas element
        this.lastX = ev.layerX;
        this.lastY = ev.layerY;
    }

    mouseMove(ev){
        this.currentX = ev.layerX;
        this.currentY = ev.layerY;
    }

    getContext(): any{
        return this._CONTEXT;
    }

    getWidth(): number{
        return this._CANVAS.width;
    }

    getHeight(): number{
        return this._CANVAS.height;
    }

    // fullscreen(){
    //     if(this._CANVAS.webkitRequestFullScreen) {
    //         this._CANVAS.webkitRequestFullScreen();
    //     }
    //     else {
    //         this._CANVAS.mozRequestFullScreen();
    //     }          
    // }
}