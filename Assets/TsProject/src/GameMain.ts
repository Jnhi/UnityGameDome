import { JsManager, UnityEngine } from "csharp";
import { commonUI } from "./data/ui/common";
import { Logger } from "./framework/logger/Logger";
import { S } from "./global/GameConfig";
import { UnitTest } from "./unittest/UnitTest";

class GameMain{

    constructor() {
        JsManager.Instance.JsOnApplicationQuit = () => this.onApplicationQuit();
        JsManager.Instance.JsOnDispose = () => this.onDispose();
    }
    
    public async start(){
        UnityEngine.Debug.Log('Hellp Word!222222')
        //加载通用FairyGUI资源
        await S.ResManager.loadFairyGUIPackage(commonUI.PackageName);

        //do Unit Test
        UnitTest.doTest();

        //进入登录模块
        // await S.SceneManager.loadScene(SceneDef.LoginScene);
    };

    public onApplicationQuit():void {
        S.GameObjectPool.cleanup(true);
        Logger.log("Game onApplicationQuit in JS....");
    }
    
    public onDispose():void {
        Logger.log("Game onDispose in JS....");
    }
}



new GameMain().start();

