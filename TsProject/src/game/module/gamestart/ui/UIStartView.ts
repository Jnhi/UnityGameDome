import { UIPage } from "../../../../framework/ui/UIPage";
import { binder } from "../../../../framework/common/NiceDecorator";
import { FairyGUI } from "csharp";
import { S } from "../../../../global/GameConfig";
import { SceneDef } from "../../../../framework/scene/SceneDef";



export class UIStartView extends UIPage{

    @binder("btn_start")
    public btn_start:FairyGUI.GButton;

    public onAwake():void{
        super.onAwake();
        console.log("开始界面333")
        this.fui.MakeFullScreen();

        this.btn_start.onClick.Add(()=>{
            this.click_btn_start();
        });
    }

    public onShow():void{
        super.onShow();
    }
    public onClose(arg:any):void{
        super.onClose(arg);
    }

    public async click_btn_start(){
        await S.SceneManager.loadScene(SceneDef.FlyBird);
    }
}