import { HFramework, UnityEngine } from "csharp";
import { RootView } from "./game/module/root/view/RootView";
import { TTest } from "./hframework/TTest";
import { UIManager } from "./hframework/ui/UIManager";

class GameMain{

    public start():void{
        UnityEngine.Debug.Log('Hellp Word!222222')
        TTest.test("测试输出哈哈哈哈2")
        UIManager.Instance(UIManager).init()
        UIManager.Instance(UIManager).PushPanel(RootView)
    };
}

new GameMain().start();

