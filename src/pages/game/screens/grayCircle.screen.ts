import { GameState } from "../../../app/Tom/Tom.Game";
import { Rectangle } from "../../../app/Tom/Tom.Entities";
import { Simple2DRender } from "../../../app/Tom/Tom.Render";
import { GameMath } from "../../../app/Tom/Tom.Math";
import { Screens } from "./screens";

export class GrayCircleScreen extends GameState {

    btnEmpezarPosX: number;
    btnEmpezarPosY: number;
    btnEmpezarArea: Rectangle;

    constructor() {
        super();
    }

    init(): void {
        this.btnEmpezarPosX = 100;
        this.btnEmpezarPosY = 350;
        this.btnEmpezarArea = new Rectangle(this.btnEmpezarPosX, this.btnEmpezarPosY, 135, 35);
    }

    update(delta: number): void {

        // let click: MouseClick = this.game.input.MouseTouched();
        // if (click) {
        //     if (GameMath.Contains(this.btnEmpezarArea, click.x, click.y)) {
        //         this.game.setCurrentState(Screens.Gameplay);
        //     }
        // }
    }

    draw(render: Simple2DRender): void {
        //background
        render.drawFilledRect(0, 0, this.game.canvas.getWidth(), this.game.canvas.getHeight(), "#346ac1");

        render.drawText(50, 50, "GrayCircleScreen!! :)");
        
        render.drawCircle(200, 200, 80, "#ffffff", 1);

    }

    onEnter(): void {
        
    }
    onExit(): void {
        
    }
}