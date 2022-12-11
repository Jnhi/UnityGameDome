import { FairyGUI } from "csharp";
import { FlyBirdUI } from "../../../../data/ui/FlyBird";
import { GameStartUI } from "../../../../data/ui/GameStart";
import { S } from "../../../../global/GameConfig";


export class Pipe{

    objPipe:FairyGUI.GComponent
    img_Up:FairyGUI.GImage
    img_Down:FairyGUI.GImage
    pipeSpeed: number = 200
    spacing:number
    carshDis:number = 30
    canAddScore:boolean = true
    constructor(spacing:number,y:number){
        this.spacing = spacing
        this.objPipe = FairyGUI.UIPackage.CreateObject(FlyBirdUI.PackageName,FlyBirdUI.UIPipe).asCom;
        this.img_Up = this.objPipe.GetChild("img_Up").asImage;
        this.img_Down = this.objPipe.GetChild("img_Down").asImage;

        this.img_Up.y = -spacing
        this.img_Down.y = spacing
        this.objPipe.y = y
    }

    public Dispose():void{
        this.objPipe.Dispose()
    }

    public move(dt:number):void{
        this.objPipe.x = this.objPipe.x - dt*this.pipeSpeed
    }

    public isCrashBird(bird:FairyGUI.GObject):boolean{
        let disX = Math.abs(bird.x-this.objPipe.x);
        if (disX <= 116)
        {
            let disY = Math.abs(bird.y-this.objPipe.y);
            if (disY + this.carshDis >= this.spacing)
            {
                return true;
            }
        }
        return false
    }
}