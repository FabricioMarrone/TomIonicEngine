import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TomCanvasComp } from '../../app/Tom/tom.canvas';
import { TomGame } from '../../app/Tom/Tom.Game';
import { GrayCircleScreen } from './screens/grayCircle.screen';
import { UserTouchInfo } from '../../app/Tom/tom.input';

@Component({
  selector: 'page-game',
  templateUrl: 'game.html'
})
export class GameComp {

  @ViewChild(TomCanvasComp) tomCanvas:TomCanvasComp;
  game: TomGame;
  
  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad()
  {  
    this.tomCanvas.initialiseCanvas();
    this.game = new TomGame(this.tomCanvas);

    this.game.addState(new GrayCircleScreen());

    this.game.start();
  }

  handleUserTouch(userTouch: UserTouchInfo): void {
    this.game.input.onUserTouch(userTouch);
  }
}
