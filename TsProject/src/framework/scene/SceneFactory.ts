import { BaseScene } from "./BaseScene";
import { PveScene } from "../../game/module/pve/scene/PveScene";
import { HomeScene } from "../../game/module/home/scene/HomeScene";
// import { LoginScene } from "../../game/module/login/scene/LoginScene";
import { SceneDef } from "./SceneDef";
import { GameStart } from "../../game/module/gamestart/scene/GameStartScene";



export class SceneFactory{


    public static createScene(sceneName:string):BaseScene{

        let scene:BaseScene = null;

        switch (sceneName){
            case SceneDef.GameStart:
                scene = new GameStart();
                break;
            // case SceneDef.LoginScene:
            //     scene = new LoginScene();
            //     break;
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