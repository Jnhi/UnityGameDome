import UI_RootView from "../../../../gen/ui/root/view/UI_RootView";
import { UIManager } from "../../../../hframework/ui/UIManager";
import { FlyBirdView } from "../../flybird/FlyBirdView";

export class RootView extends UI_RootView{

    public OnEnter(arg?: any): void {
        this.m_btnFlyBird.onClick.AddListener(()=>{
            UIManager.Instance(UIManager).PushPanel(FlyBirdView)
        })
    }
    public OnPause(): void {
    }
    public OnResume(): void {
    }
    public OnExit(): void {
    }
    
}