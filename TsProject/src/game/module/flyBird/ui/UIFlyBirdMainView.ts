import { UIPage } from "../../../../framework/ui/UIPage";
import { binder } from "../../../../framework/common/NiceDecorator";
import { FairyGUI, UnityEngine } from "csharp";
import { Logger } from "../../../../framework/logger/Logger";
import { S } from "../../../../global/GameConfig";
import { FlyBirdUI } from "../../../../data/ui/FlyBird";
import { VoOverWindow } from "../../gamestart/vo/VoOverWindow";
import { List } from "../../../../framework/common/List";
import { Pipe } from "../item/pipe";
import { Random } from "../../../../framework/common/Random";
import { Bird } from "../item/Bird";



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
    
    public bird:Bird;

    @binder("gBirdAndPipe")
    public gBirdAndPipe:FairyGUI.GComponent;
    
    private curPipes:List<Pipe> = new List<Pipe>()
    private needDestory:List<Pipe> = new List<Pipe>()

    /**地板速度 */
    private groundSpeed:number = 46;
    
    /**背景速度速度 */
    private skySpeed:number = 36;

    /**游戏是否开始 */
    private isStart:boolean = false;


    /**得分 */
    private score:number = 0;

    /**水管创建间隔 */
    private pipeIntervalTime:number = 4;

    /**水管时间 */
    private pipeTime:number = 0;


    public onUpdate(dt:number):void{

        if (this.bird && this.isStart)
        {
            this.list_ground.scrollPane.posX = this.list_ground.scrollPane.posX + dt*this.groundSpeed
            this.list_bg.scrollPane.posX = this.list_bg.scrollPane.posX + dt*this.skySpeed
            
            this.bird.fly(dt)

            // 删除屏幕外的水管
            for (let i = 0; i < this.needDestory.count; i++) {
                this.curPipes.remove(this.needDestory[i]);
                this.needDestory[i].Dispose()
            }
            this.needDestory.clear();

            // 水管的移动
            for (let i = 0; i < this.curPipes.count; i++) {
                const element = this.curPipes[i];
                element.move(dt)
                if (element.objPipe.x <= -700) {
                    this.needDestory.add(this.curPipes[i]);
                }
                if (element.objPipe.x <= 0 && element.canAddScore) {
                    S.AudioManager.Play("FlyBird/Music/getScore.wav")
                    this.score ++
                    element.canAddScore = false
                    this.upDataScore(this.score)
                }
            }

            // 检测小鸟是否碰撞水管以及地面
            if (this.bird.isCrashGround() || this.isCrash())
            {
                this.GameOver();
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

    private isCrash():boolean
    {

        for (const iterator of this.curPipes) {
            if (iterator.isCrashBird(this.bird.objBird)) {
                return true
            }
        }

        return false;
    }

    public onAwake():void{
        super.onAwake();
        this.fui.MakeFullScreen();

        this.list_bg.SetVirtualAndLoop();
        this.list_bg.itemRenderer = (index:number, obj:FairyGUI.GObject)=>{
        };
        this.list_bg.numItems = 3;

        this.list_ground.SetVirtualAndLoop();
        this.list_ground.itemRenderer = (index:number, obj:FairyGUI.GObject)=>{
        };
        this.list_ground.numItems = 3;

        this.txt_Score.visible = false;

        this.bird = new Bird()
        this.gBirdAndPipe.AddChild(this.bird.objBird)
        
        this.btn_start.onClick.Set(()=>{
            this.onClickStart()
        })

        this.list_bg.onClick.Set(()=>{
            this.bird.flyUp()
        })
    }

    /**游戏开始 */
    private GameStart():void
    {
        this.isStart = true;
        this.txt_Score.visible = true;
        this.startPanel.visible = false;
        this.upDataScore(0);
    }

    /**重新开始 */
    private reGameStart():void{
        this.bird.reGameStart();
        this.bird.objBird.y = 0;
        // bird.GetComponent<SpriteAnimation>().Play("fly");
        // 删除屏幕外的水管
        for (const iterator of this.needDestory) {
            iterator.Dispose()
        }
        this.needDestory.clear();
        for (const iterator of this.curPipes) {
            iterator.Dispose()
        }
        this.curPipes.clear();

        this.score = 0;

        this.GameStart();
    }

    /**更新分数 */
    public upDataScore(score:number):void
    {
        this.txt_Score.text = score.toString();
    }

    /**游戏结束 */
    private GameOver():void
    {
        S.AudioManager.Play("FlyBird/Music/crash.wav")
        this.isStart = false;
        this.bird.GameOver()
        
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
        vo.reStartFunc = ()=>{
            this.reGameStart()
        }
        S.UIManager.openWindow(
            FlyBirdUI.PackageName,
            FlyBirdUI.UIOverWindow,
            vo
        );
    }

    /**创建水管 */
    private createPipe():void{
        let pipe = new Pipe(Random.random(150,200),Random.random(-300,200))
        this.curPipes.add(pipe);
        this.gBirdAndPipe.AddChild(pipe.objPipe)
        pipe.objPipe.x = 1000
    }

    private onClickStart():void{
        this.GameStart()
    }
    public onShow(vo):void{
        super.onShow(vo);
    }
    public onClose(arg:any):void{
        super.onClose(arg);
    }
    public async click_btn_start(){
        Logger.log("on chat...");
    }


}