import { UIPage } from "../../../../framework/ui/UIPage";
import { binder } from "../../../../framework/common/NiceDecorator";
import { FairyGUI, UnityEngine } from "csharp";
import { VoOverWindow } from "../../gamestart/vo/VoOverWindow";



export class UIFlyBirdOverWindow extends UIPage{

    @binder("load_medal")
    public load_medal:FairyGUI.GLoader;

    @binder("txt_Score")
    public txt_Score:FairyGUI.GLabel;

    @binder("txt_BestScore")
    public txt_BestScore:FairyGUI.GLabel;

    @binder("btn_reStart")
    public btn_reStart:FairyGUI.GButton;

    public onAwake():void{
        super.onAwake();
    }

    public onShow(vo:VoOverWindow):void{
        super.onShow(vo);


    }
    public onClose(arg:any):void{
        super.onClose(arg);
    }
    public async click_btn_start(){
    }

}