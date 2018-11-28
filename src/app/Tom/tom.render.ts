import { TomCanvasComp } from "./tom.canvas";

export class Simple2DRender {
    public ctx: CanvasRenderingContext2D;
    public defaultColor = "white";
    public defaultFont = "12px Arial";
    public defaultLineWidth = 2;

    constructor(canvas: TomCanvasComp) {
        this.ctx = canvas.getContext();
    }

    clearScreen(): void {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }

    drawText(x: number, y: number, text: string, font: string = this.defaultFont, color: string = this.defaultColor): void {
        this.ctx.font = font;
        this.ctx.fillStyle = color;
        this.ctx.fillText(text, x, y);
    }

    drawFilledRect(x: number, y: number, width: number, height: number, color: string = this.defaultColor): void {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, width, height);
    }

    drawRect(x: number, y: number, width: number, height: number, color: string = this.defaultColor, lineWidth: number = this.defaultLineWidth): void {
        this.ctx.beginPath();
        this.ctx.lineWidth = lineWidth;
        this.ctx.strokeStyle = color;
        this.ctx.rect(x, y, width, height);
        this.ctx.stroke();
    }

    drawCircle(x: number, y: number, radius: number, color: string = this.defaultColor, lineWidth: number = this.defaultLineWidth): void {
        this.ctx.beginPath();
        this.ctx.lineWidth = lineWidth;
        this.ctx.strokeStyle = color;
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
        this.ctx.stroke();
    }

    drawImage(x: number, y: number, img: HTMLImageElement, color: string = this.defaultColor): void {
        this.ctx.fillStyle = color;
        this.ctx.drawImage(img, x, y, img.width, img.height);
    }

    drawImageRotated(x: number, y: number, img: HTMLImageElement, angleInRadians: number, color: string = this.defaultColor): void {
        let canvasRotationX = x + (img.width / 2);
        let canvasRotationY = y + (img.height / 2);
        let width = img.width;
        let height = img.height;

        this.ctx.translate(canvasRotationX, canvasRotationY);
        this.ctx.rotate(angleInRadians);
        this.drawImage(x, y, img, color);
        this.ctx.rotate(-angleInRadians);
        this.ctx.translate(-canvasRotationX, -canvasRotationY);

        //Codigo original de stackoverflow:
        //var x = canvas.width / 2;
        //var y = canvas.height / 2;
        //var width = image.width;
        //var height = image.height;

        //context.translate(x, y);
        //context.rotate(angleInRadians);
        //context.drawImage(image, -width / 2, -height / 2, width, height);
        //context.rotate(-angleInRadians);
        //context.translate(-x, -y);
    }
}
