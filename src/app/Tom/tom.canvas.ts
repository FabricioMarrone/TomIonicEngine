import { Component, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserTouchInfo } from './tom.input';

@Component({
    selector: "tom-canvas",
    templateUrl: 'tom.canvas.html'
})
export class TomCanvasComp {

    /**
     * 'plug into' DOM canvas element using @ViewChild
     */
    @ViewChild('canvas') canvasEl : ElementRef;

    @Output() userTouch: EventEmitter<UserTouchInfo> = new EventEmitter();

    private _CANVAS  : any;
    private _CONTEXT : any;
    
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
    }

    handleClick(ev) : void {
        //Layer gets the coords relatives to the canvas element
        this.lastX = ev.layerX;
        this.lastY = ev.layerY;

        this.userTouch.emit({
            event: ev, 
            x: ev.layerX, 
            y: ev.layerY
        });
    }

    handleTouch(ev) : void {
        ev.preventDefault();

        let canvasCoords: any = ev.target.getBoundingClientRect();

        let touch = ev.touches[0];
        this.lastX = touch.clientX - canvasCoords.left;
        this.lastY = touch.clientY - canvasCoords.top;

        this.userTouch.emit({
            event: ev, 
            x: touch.clientX - canvasCoords.left, 
            y: touch.clientY - canvasCoords.top
        });

        //this.handleClick(ev);
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