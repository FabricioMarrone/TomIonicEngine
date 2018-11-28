import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TomCanvasComp } from '../../app/Tom.Canvas/tom.canvas';

@Component({
  selector: 'page-game',
  templateUrl: 'game.html'
})
export class GameComp {

  @ViewChild(TomCanvasComp) tomCanvas:TomCanvasComp;

  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad()
  {
      this.tomCanvas.initialiseCanvas();
  }

}
