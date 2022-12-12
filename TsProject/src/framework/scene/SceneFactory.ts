import { BaseScene } from "./BaseScene";
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
        }

        return scene;
    }
}