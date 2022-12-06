import UI_RootView from "../../../../gen/ui/UI_RootView";

export class RootView extends UI_RootView{

    public OnEnter(arg?: any): void {
        this.m_btnFlyBird.onClick.AddListener(()=>{
            console.log("2333");
        })
    }
    public OnPause(): void {
    }
    public OnResume(): void {
    }
    public OnExit(): void {
    }
    
}