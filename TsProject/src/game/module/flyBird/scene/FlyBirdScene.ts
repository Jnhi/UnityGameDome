// import { homeUI } from "../../../../data/ui/home";
import { FlyBirdUI } from "../../../../data/ui/FlyBird";
import { BaseScene } from "../../../../framework/scene/BaseScene";
import { S } from "../../../../global/GameConfig";


export class FlyBirdScene extends BaseScene{

    constructor(){
        super();
    }

    public onEnter() {

    }

    public onComplete() {

        S.UIManager.openPageInScene(
            FlyBirdUI.PackageName,
            FlyBirdUI.UIMainVIew,
        );
    }

    public onLeave() {
        
    }



}