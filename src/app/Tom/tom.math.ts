import { Rectangle } from "./Tom.Entities";

export class GameMath {
    constructor() { }

    static Sin(x: number): number {
        return Math.sin(x);
    }

    static Random(min: number, max: number): number {
        return (min + (Math.random() * (max - min)));
    }

    static RandomInt(min: number, max: number): number {
        return Math.round(GameMath.Random(min, max));
    }

    static RandomChoice(choices: Array<any>): any {
        return choices[GameMath.RandomInt(0, choices.length - 1)];
    }

    static RandomBoolean(): boolean {
        return GameMath.RandomChoice([true, false]);
    }

    static Limit(x: number, min: number, max: number): number {
        return Math.max(min, Math.min(max, x));
    }

    static IsBetween(n: number, min: number, max: number): boolean {
        return ((n >= min) && (n <= max));
    }

    static Accelerate(v: number, accel: number, dt: number): number {
        return v + (accel * dt);
    }

    static Lerp(n: number, dn: number, dt: number): number {   //Linear interpolation
        return n + (dn * dt);
    }

    //--- Easing Equations
    static Interpolate(a: number, b: number, percent: number): number {
        return a + (b - a) * percent;
    }

    static EaseIn(a: number, b: number, percent: number): number {
        return a + (b - a) * Math.pow(percent, 2);
    }

    static EaseOut(a: number, b: number, percent: number): number {
        return a + (b - a) * (1 - Math.pow(1 - percent, 2));
    }

    static EaseInOut(a: number, b: number, percent: number): number {
        return a + (b - a) * ((-Math.cos(percent * Math.PI) / 2) + 0.5);
    }

    //--- Color Manipulation
    static Brighten(colorHex: string, percent: number): string {
        var a = Math.round(255 * percent / 100),
            r = a + parseInt(colorHex.substr(1, 2), 16),
            g = a + parseInt(colorHex.substr(3, 2), 16),
            b = a + parseInt(colorHex.substr(5, 2), 16);

        r = r < 255 ? (r < 1 ? 0 : r) : 255;
        g = g < 255 ? (g < 1 ? 0 : g) : 255;
        b = b < 255 ? (b < 1 ? 0 : b) : 255;

        return '#' + (0x1000000 + (r * 0x10000) + (g * 0x100) + b).toString(16).slice(1);
    }

    static Darken(colorHex: string, percent: number): string {
        return GameMath.Brighten(colorHex, -percent);
    }

    //--- Collision Detection
    static Overlap(box1: Rectangle, box2: Rectangle): boolean {
        return !((box1.Right() < box2.x) || (box1.x > box2.Right()) || (box1.y > box2.Bottom()) || (box1.Bottom() < box2.y));
    }

    static LineIntercept(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number, d: number): any {
        let denom = ((y4 - y3) * (x2 - x1)) - ((x4 - x3) * (y2 - y1));
        if (denom != 0) {
            let ua = (((x4 - x3) * (y1 - y3)) - ((y4 - y3) * (x1 - x3))) / denom;
            if ((ua >= 0) && (ua <= 1)) {
                let ub = (((x2 - x1) * (y1 - y3)) - ((y2 - y1) * (x1 - x3))) / denom;
                if ((ub >= 0) && (ub <= 1)) {
                    var x = x1 + (ua * (x2 - x1));
                    var y = y1 + (ua * (y2 - y1));
                    return { x: x, y: y, d: d };
                }
            }
        }
        return null;
    }

    static Contains(rect: Rectangle, pointX: number, pointY: number): boolean {
        return (GameMath.IsBetween(pointX, rect.x, rect.Right()) && GameMath.IsBetween(pointY, rect.y, rect.Bottom()))
    }
}