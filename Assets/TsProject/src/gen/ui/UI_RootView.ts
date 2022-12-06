import { UnityEngine } from "csharp";
import { BasePanel } from "../../hframework/ui/BasePanel";

export default class UI_RootView extends BasePanel {

    public m_btnFlyBird: UnityEngine.UI.Button;
    
    protected static perfabUrl = "Root/Fabs/RootView.prefab"

    override OnBinding() {
		this.m_btnFlyBird = this.ui.transform.Find("btnFlyBird").GetComponent(puer.$typeof(UnityEngine.UI.Button)) as UnityEngine.UI.Button;
	}
}