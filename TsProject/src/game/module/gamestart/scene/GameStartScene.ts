import { GameStartUI } from "../../../../data/ui/GameStart";
import { BaseScene } from "../../../../framework/scene/BaseScene";
import { S } from "../../../../global/GameConfig";
import { VoHome } from "../vo/VoHome";


export class GameStart extends BaseScene{

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
            GameStartUI.PackageName,
            GameStartUI.UIStartView,
            vo);
    }

    public onLeave() {
        
    }



}