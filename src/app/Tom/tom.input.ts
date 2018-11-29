export class UserClickInfo {
    event: any;
    x: number;
    y: number;
}

export class SimpleInputManager{

    private clicks: Array<UserClickInfo>;

    constructor(){
        this.clicks = new Array<UserClickInfo>();
    }

    onUserClick(userClick: UserClickInfo) : void {
        this.clicks.push(userClick);
    }

    get screenClicked(): boolean{
        return this.clicks.length > 0;
    }

    get lastClick(): UserClickInfo{
        return this.screenClicked ? this.clicks.pop() : null;
    }
}