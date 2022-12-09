// import { homeUI } from "../../../../data/ui/home";
import { FlyBirdUI } from "../../../../data/ui/FlyBird";
import { BaseScene } from "../../../../framework/scene/BaseScene";
import { S } from "../../../../global/GameConfig";
import { VoHome } from "../../home/vo/VoHome";


export class FlyBirdScene extends BaseScene{

    constructor(){
        super();
    }

    public onEnter() {

    }

    public onComplete() {

        let vo:VoHome = new VoHome();
        vo.name = "Justin";
        vo.hp = 1200;
        vo.mp = 3300;
        vo.money = 666;

        S.UIManager.openPageInScene(
            FlyBirdUI.PackageName,
            FlyBirdUI.UIMainVIew,
            vo);
    }

    public onLeave() {
        
    }



}