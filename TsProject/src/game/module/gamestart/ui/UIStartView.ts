import { UIPage } from "../../../../framework/ui/UIPage";
import { binder } from "../../../../framework/common/NiceDecorator";
import { FairyGUI } from "csharp";
import { LoginAPI } from "../../../api/LoginAPI";
import { Opcode } from "../../../../data/pb/Opcode";
import { nice_ts } from "../../../../data/pb/gen/pb";
import { S } from "../../../../global/GameConfig";
import { Logger } from "../../../../framework/logger/Logger";
import { SceneDef } from "../../../../framework/scene/SceneDef";
import { VoGameStart } from "../vo/VoGameStart";



export class UIStartView extends UIPage{

    @binder("btn_start")
    public btn_start:FairyGUI.GButton;
    // @binder("bagBtn")
    // public m_bagBtn:FairyGUI.GButton;
    // @binder("shopBtn")
    // public m_shopBtn:FairyGUI.GButton;
    // @binder("levelBtn")
    // public m_levelBtn:FairyGUI.GButton;

    // @binder("nameTxt")
    // public m_nameLbl:FairyGUI.GLabel;
    // @binder("hpTxt")
    // public m_hpLbl:FairyGUI.GLabel;
    // @binder("mpTxt")
    // public m_mpLbl:FairyGUI.GLabel;
    // @binder("moneyTxt")
    // public m_moneyLbl:FairyGUI.GLabel;


    public onAwake():void{
        super.onAwake();
        console.log("开始界面")
        this.btn_start.onClick.Add(()=>{
            console.log("2333");
            this.click_btn_start();
        });
    }

    
    public onShow(vo:VoGameStart):void{
        super.onShow(vo);

        // S.GameSession.listen(Opcode.MSG_GS2C_Test,function(msg:nice_ts.GS2C_Test){
        //     Logger.log("收到服务器下发的消息。。。。"+msg.testResponse)
        // })
    }
    public onClose(arg:any):void{
        super.onClose(arg);
    }

    public async click_btn_start(){
        await S.SceneManager.loadScene(SceneDef.FlyBird);
    }
}