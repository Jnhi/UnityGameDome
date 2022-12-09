import { BaseScene } from "./BaseScene";
import { PveScene } from "../../game/module/pve/scene/PveScene";
import { HomeScene } from "../../game/module/home/scene/HomeScene";
// import { LoginScene } from "../../game/module/login/scene/LoginScene";
import { SceneDef } from "./SceneDef";
import { GameStartScene } from "../../game/module/gamestart/scene/GameStartScene";
import { FlyBirdScene } from "../../game/module/flybird/scene/FlyBirdScene";



export class SceneFactory{


    public static createScene(sceneName:string):BaseScene{

        let scene:BaseScene = null;

        switch (sceneName){
            case SceneDef.GameStart:
                scene = new GameStartScene();
                break;
            case SceneDef.FlyBird:
                scene = new FlyBirdScene();
                break;
            case SceneDef.HomeScene:
                scene = new HomeScene();
                break;
            case SceneDef.PveScene:
                scene = new PveScene();
                break;
        }

        return scene;
    }
}