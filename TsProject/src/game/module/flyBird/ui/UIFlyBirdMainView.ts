import { UIPage } from "../../../../framework/ui/UIPage";
import { binder } from "../../../../framework/common/NiceDecorator";
import { FairyGUI, UnityEngine } from "csharp";
import { Logger } from "../../../../framework/logger/Logger";
import { S } from "../../../../global/GameConfig";
import { FlyBirdUI } from "../../../../data/ui/FlyBird";
import { VoOverWindow } from "../../gamestart/vo/VoOverWindow";
import { List } from "../../../../framework/common/List";



export class UIFlyBirdMainView extends UIPage{

    @binder("list_bg")
    public list_bg:FairyGUI.GList;

    @binder("list_ground")
    public list_ground:FairyGUI.GList;

    @binder("btn_start")
    public btn_start:FairyGUI.GButton;

    @binder("txt_Score")
    public txt_Score:FairyGUI.GLabel;

    @binder("startPanel")
    public startPanel:FairyGUI.GComponent;
    
    @binder("anim_bird")
    public bird:FairyGUI.GMovieClip;

    private curPipes:List<FairyGUI.GComponent> = new List<FairyGUI.GComponent>()
    private needDestory:List<FairyGUI.GComponent> = new List<FairyGUI.GComponent>()

    /**地板速度 */
    private groundSpeed:number = 23;
    
    /**背景速度速度 */
    private skySpeed:number = 18;

    /**游戏是否开始 */
    private isStart:boolean = false;

    /**点击后弹起时间 */
    private upTime:number = 0.3;

    /**点击后弹起速度 */
    private upSpeed:number = -1000;

    /**下落速度 */
    private downSpeed:number = 70;

    /**鸟的碰撞距离 */
    private carshDis:number = 30;

    /**得分 */
    private score:number = 30;

    /**水管创建间隔 */
    private pipeIntervalTime:number = 3;

    /**水管时间 */
    private pipeTime:number = 0;

    /**水管速度 */
    private pipeSpeed:number = 300;

    /**小鸟状态 */
    private isUp:boolean = false;
    
    public onUpdate(dt:number):void{
        // console.log(dt)

        if (this.bird && this.isStart)
        {
            this.list_ground.scrollPane.posX = this.list_ground.scrollPane.posX + dt*this.groundSpeed
            this.list_bg.scrollPane.posX = this.list_bg.scrollPane.posX + dt*this.skySpeed
            this.bird.y = Math.min(930,this.bird.y+(this.isUp?this.upSpeed:this.downSpeed)*dt)
            
            // 小鸟碰撞地面
            if (this.bird.y < -600)
            {
                this.GameOver();
            }
            
            // 删除屏幕外的水管
            for (let i = 0; i < this.needDestory.count; i++) {
                this.curPipes.remove(this.needDestory[i]);
                this.needDestory[i].Dispose()
            }
            this.needDestory.clear();

            // 水管的移动
            for (let i = 0; i < this.curPipes.count; i++) {
                const element = this.curPipes[i];
                element.x = element.x - dt*this.pipeSpeed
                if (element.x <= -700) {
                    this.needDestory.add(this.curPipes[i]);
                }
                // // 检测小鸟是否碰撞水管
                // if (isCrash(bird,curPipes[i]))
                // {
                //     GameOver();
                // }
            }

            this.pipeTime += dt;
            // 水管定时创建
            if (this.pipeTime >= this.pipeIntervalTime)
            {
                this.pipeTime = 0;
                this.createPipe();
            }
        }
    }

    public onAwake():void{
        super.onAwake();
        console.log("开始界面3")
        this.list_bg.SetVirtualAndLoop();
        this.list_bg.itemRenderer = (index:number, obj:FairyGUI.GObject)=>{
        };
        this.list_bg.numItems = 3;

        this.list_ground.SetVirtualAndLoop();
        this.list_ground.itemRenderer = (index:number, obj:FairyGUI.GObject)=>{
        };
        this.list_ground.numItems = 3;


        this.txt_Score.visible = false;
        this.btn_start.onClick.Set(()=>{
            this.onClickStart()
        })
        this.list_bg.onClick.Set(()=>{
            this.isUp = true;
            let timerr = 0;
            this.bird.TweenRotate(30,0.2)
            // this.bird.transform.DORotate(new Vector3(0,0,30),0.2f);
            // t.Kill();
            // t = DOTween.To(() => timerr, x => timerr = x, 1, this.upTime).OnStepComplete(()=>{
            //     this.isUp = false;
            //     this.bird.transform.DORotate(new Vector3(0,0,-30),0.2f);
            // }).SetLoops(1);
        })
    }


    /**游戏开始 */
    private GameStart():void
    {
        this.isStart = true;
        this.isUp = false;
        this.txt_Score.visible = true;
        this.startPanel.visible = false;
    }

    /**游戏结束 */
    private GameOver():void
    {
        this.isStart = false;
        
        if (UnityEngine.PlayerPrefs.HasKey("Bird_BestScore"))
        {
            let saveBastScore = UnityEngine.PlayerPrefs.GetInt("Bird_BestScore");
            if (saveBastScore < this.score)
            {
                UnityEngine.PlayerPrefs.SetInt("Bird_BestScore",this.score);
            }
            
        }else
        {
            UnityEngine.PlayerPrefs.SetInt("Bird_BestScore",this.score);
        }
        let vo = new VoOverWindow() 
        vo.bestScore = UnityEngine.PlayerPrefs.GetInt("Bird_BestScore");
        vo.score = this.score;

        S.UIManager.openWindow(
            FlyBirdUI.PackageName,
            FlyBirdUI.UIOverWindow,
            vo
        );
    }

    /**创建水管 */
    private createPipe():FairyGUI.GComponent{
        let objPipe:FairyGUI.GComponent = FairyGUI.UIPackage.CreateObject(FlyBirdUI.PackageName,FlyBirdUI.UIPipe).asCom;
        this.curPipes.add(objPipe);
        return objPipe;
    }

    private onClickStart():void{
        this.GameStart()
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