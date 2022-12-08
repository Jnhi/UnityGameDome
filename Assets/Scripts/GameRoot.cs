using System.Threading.Tasks;
using FairyGUI;
using NiceTS;
using UnityEngine;

/// <summary>
/// 启动器
/// </summary>
public class GameRoot : MonoBehaviour {

    public HotUpdateView HotUpdateView;

    void Awake() {
        DontDestroyOnLoad(this);
    }

    // 热更结束后调用
    public void GameStart()
    {

#if UNITY_ANDROID  && !UNITY_EDITOR 
        Application.targetFrameRate = 60;
#else
        Application.targetFrameRate = 60;
#endif    
        GameObject.Destroy(HotUpdateView.gameObject);

        JsManager.Instance.StartGame();

        GRoot.inst.SetContentScaleFactor(720, 1280, UIContentScaler.ScreenMatchMode.MatchWidthOrHeight);
        UIPackage.unloadBundleByFGUI = false;

        //加载FairyGUI Package
        ResourceManager.init();
    }

    // Start is called before the first frame update
    async Task Start()
    {
        // 检查热更
        await HotUpdateView.ChickUpdate(GameStart);
    }

    // Update is called once per frame
    void Update()
    {
        JsManager.Instance.Update(Time.deltaTime);
    }
}
