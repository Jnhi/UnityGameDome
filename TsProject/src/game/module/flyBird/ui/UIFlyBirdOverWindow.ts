import { UIPage } from "../../../../framework/ui/UIPage";
import { binder } from "../../../../framework/common/NiceDecorator";
import { FairyGUI, UnityEngine } from "csharp";
import { VoOverWindow } from "../../gamestart/vo/VoOverWindow";
import { UIWindow } from "../../../../framework/ui/UIWindow";

export class UIFlyBirdOverWindow extends UIWindow{

    @binder("load_medal")
    public load_medal:FairyGUI.GLoader;

    @binder("txt_Score")
    public txt_Score:FairyGUI.GLabel;

    @binder("txt_BestScore")
    public txt_BestScore:FairyGUI.GLabel;

    @binder("btn_reStart")
    public btn_reStart:FairyGUI.GButton;


    private reStartFunc:Function;
     
    public onAwake():void{
        this.btn_reStart.onClick.Set(()=>{
            this.click_btn_reStart()
        })
    }

    public onShow(vo:VoOverWindow):void{
        this.txt_BestScore.text = vo.bestScore.toString();
        this.txt_Score.text = vo.score.toString();
        this.reStartFunc = vo.reStartFunc
        let medalPath:string
        if (vo.score <= 3){
            medalPath = "ui://FlyBird/medals_1";
        }else if(vo.score <= 8){
            medalPath = "ui://FlyBird/medals_2";
        }else if(vo.score <= 15){
            medalPath = "ui://FlyBird/medals_3";
        }else{
            medalPath = "ui://FlyBird/medals_4";
        }
        this.load_medal.url = medalPath
        
        // this.load_medal.rotationY = v;
        
        // FairyGUI.GTween.To(0, 180, 0.8).SetTarget(this.load_medal).SetEase(FairyGUI.EaseType.QuadOut).OnUpdate((tweener)=>{
        //     this.TurnInTween(tweener)
        // });
    }
    public onClose(arg:any):void{
    }
    public async click_btn_reStart(){
        this.close()
        this.reStartFunc()
    }

    public TurnInTween(tweener:FairyGUI.GTweener)
    {
        console.log(tweener)
        if (tweener) {
            let v = tweener.value.x;
        }
    }

}