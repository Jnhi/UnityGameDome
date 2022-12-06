
export interface UIClass<T extends BasePanel>{
    new():T
    getUrl():string;
}

export abstract class BasePanel {

    public ui:any
    
    protected static perfabUrl

    protected static perfabName
    private _timer: any;

    public static getUrl():string{
        return this.perfabUrl
    }

    public static getName():string{
        return this.perfabName
    }

    public startTimer(){
        if(!this._timer)
            this._timer = setInterval(this.Update.bind(this))
    }

    public Update():void{

    }
    /**
     * 绑定界面中的组件
     * @param arg 
     */
    public OnBinding(arg?:any):void{

    }

    /**
     * 打开界面
     * @param arg 
     */
    public OnEnter(arg?:any):void{

    }
    /**
     * 暂停界面
     */
    public OnPause():void{

    }
    /**
     * 重启界面
     */
    public OnResume():void{

    }
    /**
     * 退出界面
     */
    public OnExit():void{

    }

}