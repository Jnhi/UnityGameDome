import { GameStartUI } from "../../../../data/ui/GameStart";
import { BaseScene } from "../../../../framework/scene/BaseScene";
import { S } from "../../../../global/GameConfig";
import { VoGameStart } from "../vo/VoGameStart";


export class GameStartScene extends BaseScene{

    constructor(){
        super();

        
    }

    public onEnter() {
        console.log("进入开始场景")
    }

    public onComplete() {

        let vo:VoGameStart = new VoGameStart();

        console.log("进入开始场景结束")

        S.UIManager.openPageInScene(
            GameStartUI.PackageName,
            GameStartUI.UIStartView,
            vo);
    }

    public onLeave() {
        
    }



}