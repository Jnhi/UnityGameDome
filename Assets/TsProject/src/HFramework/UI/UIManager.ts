import { Singleton } from "HFramework/Common/Singleton";
import { UnityEngine,HFramework } from "csharp";
import { UIPanelType } from "./UIPanelType";
import { BasePanel } from "./BasePanel";

export class UIManager extends Singleton<UIManager>{
    private CanvasTransform :UnityEngine.Transform

    private panelDict:Map<string,BasePanel>;

    private panelStack:Array<BasePanel>;

    public init():void{

    }

    /**
     * 
     * @param panelType UI类型
     */
    public PushPanel(panelType:string):void{
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
        BasePanel panel = GetPanel(panelType);
        panel.OnEnter();
        panelStack.Push(panel);
    }

    /// <summary>
    /// 根据面板类型，得到实例化的面板
    /// </summary>
    /// <returns></returns>
    public GetPanel(panelType:string):BasePanel
    {
        if (this.panelDict==null)
        {
            this.panelDict = new Map<string,BasePanel>();
        }

        //从字典中读取BasePanel类型储存到panel。如果还没有实例化则panel为Null。
        let panel = this.panelDict.get(panelType)
        //如果panel为空，那么就找这个面板的prefab的路径，然后去根据prefab去实例化面板
        if (panel == null)
        {
            //先得到路径存入path
            let path:string = UIPanelType[panelType];
            HFramework.ResManager.Instance.Load
            //实例化
            let instansPanel:UnityEngine.GameObject = UnityEngine.GameObject.Instantiate( HFramework.ResManager.Instance.Load<GameObject>(path)) as UnityEngine.GameObject;

            instansPanel.transform.SetParent(CanvasTransform,false);
            instansPanel.name = panelType.ToString();
            //存入字典
            panelDict.Add(panelType, instansPanel.GetComponent<BasePanel>());

            return instansPanel.GetComponent<BasePanel>();
        }
        else
        {
            return panel;
        }
    }

}