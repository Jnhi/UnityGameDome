import { UnityEngine,HFramework } from "csharp";
import { UIPanelType } from "./UIPanelType";
import { BasePanel, UIClass } from "./BasePanel";
import { Singleton } from "../common/Singleton";


export class UIManager extends Singleton<UIManager>{
    private CanvasTransform :UnityEngine.Transform

    private panelStack:Array<BasePanel>;

    public init():void{
        this.CanvasTransform = UnityEngine.GameObject.Find("Canvas").GetComponent(puer.$typeof(UnityEngine.Transform)) as UnityEngine.Transform
    }

    /**
     * 
     * @param panelType UI类型
     */
    public PushPanel<T extends BasePanel>(uiClass: UIClass<T>){
        if (this.panelStack==null)
        {
            this.panelStack = new Array<BasePanel>();
        }
        //加页面之前先判断一下栈里面是否已经有面板，如果有面板，原面板暂停交互
        if (this.panelStack.length>0)
        {
            let topPanel:BasePanel = this.panelStack.pop();
            topPanel.OnPause();
        }
        //显示新面板
        let panel:BasePanel = this.GetPanel(uiClass);
        panel.OnEnter();
        this.panelStack.push(panel);
    }

    /// <summary>
    /// 根据面板类型，得到实例化的面板
    /// </summary>
    /// <returns></returns>
    public GetPanel<T extends BasePanel>(uiClass: UIClass<T>):BasePanel
    {
        //实例化
        let instansPanel:UnityEngine.GameObject = UnityEngine.GameObject.Instantiate( HFramework.ResManager.LoadPrefab(uiClass.getUrl())) as UnityEngine.GameObject;

        instansPanel.transform.SetParent(this.CanvasTransform,false);
        
        let _uiClass = new uiClass()
        _uiClass.ui = instansPanel;
        _uiClass.OnBinding()
        return _uiClass;
    }

}