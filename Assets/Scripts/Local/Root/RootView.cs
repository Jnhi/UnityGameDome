using HFramework;
using UnityEngine.UI;

public class RootView : BasePanel
{
    private Button btnFlyBird;

    void Awake() {
        btnFlyBird = this.transform.Find("btnFlyBird").GetComponent<Button>();
    }
    void Start(){
        btnFlyBird.onClick.AddListener(()=>{
            UIManager.Instance.PushPanel(UIPanelType.FlyBirdView);
        });
    }
    void Update(){
        
    }
}
