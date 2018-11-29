export class UserTouchInfo {
    event: any;
    x: number;
    y: number;
}

export class SimpleInputManager{

    private touchs: Array<UserTouchInfo>;

    constructor(){
        this.touchs = new Array<UserTouchInfo>();
    }

    onUserTouch(userTouch: UserTouchInfo) : void {
        this.touchs.push(userTouch);
    }

    get screenTouched(): boolean{
        return this.touchs.length > 0;
    }

    get lastTouch(): UserTouchInfo{
        return this.screenTouched ? this.touchs.pop() : null;
    }

    get Touchs(): Array<UserTouchInfo>{
        return this.touchs;
    }
}