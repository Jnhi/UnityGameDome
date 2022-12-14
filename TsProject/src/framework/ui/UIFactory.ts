
import { UIPanel } from "./UIPanel";
import { UILoading } from "./UILib/UILoading";
import { Logger } from "../logger/Logger";
import { CommonUI } from "../../data/ui/common";
import { FlyBirdUI } from "../../data/ui/FlyBird";
import { GameStartUI } from "../../data/ui/GameStart";
import { UIStartView } from "../../game/module/gamestart/ui/UIStartView";
import { UIFlyBirdMainView } from "../../game/module/flybird/ui/UIFlyBirdMainView";
import { UIFlyBirdOverWindow } from "../../game/module/flyBird/ui/UIFlyBirdOverWindow";



const CS = require('csharp');


export class UIFactory{

    public static uiCache:Map<string,UIPanel> = new Map<string,UIPanel>();

    public static createUI(pkg:string, name:string){
        Logger.log(`create UI: ${pkg}:${name}`)
        let comp = CS.FairyGUI.UIPackage.CreateObject(pkg, name).asCom
        
        let ui:UIPanel = this.uiCache.get(name);

        if(!ui){

            switch(pkg){
                case CommonUI.PackageName:
                    switch (name){
                        case CommonUI.UILoadingView:
                            ui = new UILoading();
                            break;
                    }
                    break
                case FlyBirdUI.PackageName:
                    switch (name){
                        case FlyBirdUI.UIMainVIew:
                            ui = new UIFlyBirdMainView();
                            break;
                        case FlyBirdUI.UIOverWindow:
                            ui = new UIFlyBirdOverWindow();
                            break;
                    }
                    break
                case GameStartUI.PackageName:
                    switch (name){
                        case GameStartUI.UIStartView:
                            ui = new UIStartView();
                            break;
                    }
                    break
            }

            this.uiCache.set(name, ui);
        }
        
        if(ui!=null){
            ui.fui = comp;
            ui.name = name;
            ui.pkgName = pkg;

            //??????FairyGUI??????
            ui.bindAll(ui);
            ui.awake();
        
        }else{
            Logger.error(`not create ui: ${pkg}-${name}`);
        }

        return ui;
    }



}