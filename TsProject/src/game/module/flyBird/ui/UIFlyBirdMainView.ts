import { UIPage } from "../../../../framework/ui/UIPage";
import { binder } from "../../../../framework/common/NiceDecorator";
import { FairyGUI, UnityEngine } from "csharp";
import { Logger } from "../../../../framework/logger/Logger";



export class UIFlyBirdMainView extends UIPage{

    @binder("list_bg")
    public list_bg:FairyGUI.GList;

    public onUpdate():void{
    }

    public onAwake():void{
        super.onAwake();
        console.log("开始界面3")
        this.list_bg.SetVirtualAndLoop();
        this.list_bg.itemRenderer = (index:number, obj:FairyGUI.GObject)=>{
            // this.renderServerListItem(index, obj);
        };
        this.list_bg.numItems = 3;
    }
    public onShow(vo):void{
        super.onShow(vo);

        // this.m_nameLbl.text = vo.name;
        // this.m_mpLbl.text = vo.mp.toString();
        // this.m_hpLbl.text = vo.hp.toString();
        // this.m_moneyLbl.text = vo.money.toString();

        // S.GameSession.listen(Opcode.MSG_GS2C_Test,function(msg:nice_ts.GS2C_Test){
        //     Logger.log("收到服务器下发的消息。。。。"+msg.testResponse)
        // })
    }
    public onClose(arg:any):void{
        super.onClose(arg);
    }
    public async click_btn_start(){
        Logger.log("on chat...");
    }


}