export abstract class BasePanel {
    /**
     * 打开界面
     * @param arg 
     */
    public abstract OnEnter(arg?:any):void;
    /**
     * 暂停界面
     */
    public abstract OnPause():void;
    /**
     * 重启界面
     */
    public abstract OnResume():void;
    /**
     * 退出界面
     */
    public abstract OnExit():void;

}