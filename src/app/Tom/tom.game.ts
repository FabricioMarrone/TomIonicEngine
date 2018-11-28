import { Rectangle } from "./Tom.Entities";
//import { SimpleInputManager } from "./Tom.Input";
import { Simple2DRender } from "./Tom.Render";
import { TomCanvasComp } from "./tom.canvas";
//import { FPSMeter } from "./Tom.FPSMeter";
//import { SimpleAudio, MusicData, SoundData, AudioFX } from "./Tom.Audio";
//import { AssetManager } from "./Tom.Assets";

export class TomGame {
    title: string;
    canvas: TomCanvasComp;
    render: Simple2DRender;
    states: Array<GameState>;
    private currentStateId: number = 0;

    private now: number;
    private then: number;
    delta: number;
    maxDelta: number = 1 / 60;

    // public input: SimpleInputManager;
    // public audio: SimpleAudio;
    // public assets: AssetManager;

    //private fpsMeter: FPSMeter;
    showFPS: boolean = true;

    //private requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.mozRequestAnimationFrame;

    constructor(canvas: TomCanvasComp) {

        this.canvas = canvas;
        //this.title = options.title;
        this.states = new Array<GameState>();
        this.then = this.getTimeStamp();
        //this.fpsMeter = new FPSMeter();

        // if (options.resizable) {
        //     window.addEventListener('resize', this.resizeCanvas, false);
        //     window.addEventListener('orientationchange', this.resizeCanvas, false);
        // }

        this.render = new Simple2DRender(this.canvas);

        //Initialize input
        //this.input = new SimpleInputManager();

        //Initialize audio
        //this.audio = new SimpleAudio();

        //Initialize assets
        //this.assets = new AssetManager(this.audio);
    }

    addState(state: GameState): void {
        this.states.push(state);
        state.game = this;
        state.init();
    }

    setCurrentState(stateId: number, initAgain: boolean = false): void {
        if (stateId != this.currentStateId) this.states[this.currentStateId].onExit();

        if (initAgain) {
            this.states[stateId].init();
        } else {
            this.states[stateId].onEnter();
        }

        this.currentStateId = stateId;
    }

    getTimeStamp(): number {
        return window.performance && window.performance.now ? window.performance.now() : Date.now();
    }

    start(startingStateId: number = 0): void {
        this.setCurrentState(startingStateId);
        this.mainLoop();
        // this.assets.downloadAll(() => {
        //     this.setCurrentState(startingStateId);
        //     this.mainLoop();
        // });
    }

    mainLoop(): void {
        //Calculate delta since last frame
        this.now = this.getTimeStamp();
        this.delta = Math.min(this.maxDelta, (this.now - this.then) / 1000);

        this.render.clearScreen();

        this.states[this.currentStateId].update(this.delta);
        this.states[this.currentStateId].draw(this.render);

        this.then = this.now;

        if (this.showFPS) {
            //this.fpsMeter.update(this.delta);
            //this.fpsMeter.draw(this.render);
        }

        //Request next frame
        requestAnimationFrame(() => { this.mainLoop(); });
    }

    resizeCanvas(): void {
        //this.canvas.width = window.innerWidth;
        //this.canvas.height = window.innerHeight;
    }
}

export abstract class GameState {
    game: TomGame;

    constructor() { }

    init(): void { };
    update(delta: number): void { };
    draw(batch: Simple2DRender): void { };
    onEnter(): void { };
    onExit(): void { };
}

//TODO:
//-Mejorar precisión de los clicks
//-Mejorar teclas ignoradas

//-Evaluar fullscreen:
//function goFullScreen() {
//    var canvas = document.getElementById("screen");
//    if (canvas.requestFullScreen)
//        canvas.requestFullScreen();
//    else if (canvas.webkitRequestFullScreen)
//        canvas.webkitRequestFullScreen();
//    else if (canvas.mozRequestFullScreen)
//        canvas.mozRequestFullScreen();
//}
