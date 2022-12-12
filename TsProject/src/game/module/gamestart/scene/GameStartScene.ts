import { GameStartUI } from "../../../../data/ui/GameStart";
import { BaseScene } from "../../../../framework/scene/BaseScene";
import { S } from "../../../../global/GameConfig";


export class GameStartScene extends BaseScene{

    constructor(){
        super();

        
    }

    public onEnter() {
    }

    public onComplete() {
        S.UIManager.openPageInScene(
            GameStartUI.PackageName,
            GameStartUI.UIStartView,
        );
    }

    public onLeave() {
        
    }



}