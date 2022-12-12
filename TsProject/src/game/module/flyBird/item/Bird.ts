import { FairyGUI } from "csharp";
import { FlyBirdUI } from "../../../../data/ui/FlyBird";
import { GameStartUI } from "../../../../data/ui/GameStart";
import { List } from "../../../../framework/common/List";
import { S } from "../../../../global/GameConfig";


export class Bird{

    objBird:FairyGUI.GComponent

    /**小鸟状态 */
    private isUp:boolean = false;
    /**点击后弹起时间 */
    private upTime:number = 0.3;

    /**点击后弹起速度 */
    private upSpeed:number = -400;

    /**下落速度 */
    private downSpeed:number = 300;

    private birdTween:List<FairyGUI.GTweener> = new List<FairyGUI.GTweener>()

    constructor(){
        this.objBird = FairyGUI.UIPackage.CreateObject(FlyBirdUI.PackageName,FlyBirdUI.UIBird).asCom;
        this.objBird.touchable = false
    }

    public Dispose():void{
        this.objBird.Dispose()
    }

    public flyUp():void{
        S.AudioManager.Play("FlyBird/Music/fly.wav")
        this.isUp = true;

        this.birdTween.forEach(element => {
            element.Kill(false)
        });
        this.birdTween.clear()
        let tw1 = this.objBird.TweenRotate(-30,0.2)
        this.birdTween.add(tw1)

        let tw2 = FairyGUI.GTween.DelayedCall(this.upTime).SetTarget(this.objBird).OnComplete(() =>
        {
            this.isUp = false;
            let tw3 = this.objBird.TweenRotate(30,0.2)
            this.birdTween.add(tw3)
        });
        this.birdTween.add(tw2)
    }

    public fly(dt:number):void{
        this.objBird.y = Math.min(500,Math.max(-800,this.objBird.y+(this.isUp?this.upSpeed:this.downSpeed)*dt) )
    }

    public isCrashGround():boolean{
        // 小鸟碰撞地面
        if (this.objBird.y >= 450)
        {
            return true
        }
        return false
    }

    public reGameStart():void{
        this.objBird.rotation = 0
        this.objBird.y = 0
        this.objBird.GetChild("anim_bird").asMovieClip.playing = true
    }

    public GameOver(){
        this.isUp = false;
        this.birdTween.forEach(element => {
            element.Kill(false)
        });
        this.birdTween.clear()
        this.objBird.GetChild("anim_bird").asMovieClip.playing = false
    }

}