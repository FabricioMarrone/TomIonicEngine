import { GameState } from "../../../app/Tom/Tom.Game";
import { Rectangle } from "../../../app/Tom/Tom.Entities";
import { Simple2DRender } from "../../../app/Tom/Tom.Render";
import { GameMath } from "../../../app/Tom/Tom.Math";
import { Screens } from "./screens";
import { UserTouchInfo } from "../../../app/Tom/tom.input";

export class GrayCircleScreen extends GameState {

    private circleRenderPosX: number;
    private circleRenderPosY: number;

    constructor() {
        super();
    }

    init(): void {
        this.circleRenderPosX = 100;
        this.circleRenderPosY = 100;
    }

    update(delta: number): void {

        if(this.game.input.screenTouched){
            let touch: UserTouchInfo = this.game.input.lastTouch;
            if(touch){
                this.circleRenderPosX = touch.x;
                this.circleRenderPosY = touch.y;
            }
        }
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
        
        render.drawCircle(this.circleRenderPosX, this.circleRenderPosY, 80, "#ffffff", 1);

    }

    onEnter(): void {
        
    }
    onExit(): void {
        
    }
}