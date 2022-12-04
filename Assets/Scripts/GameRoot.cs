using System.Threading.Tasks;
using HFramework;
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
        ResManager.Instance.Init();
        CameraManager.Instance.Init();
        AudioManager.Instance.Init();
        UIManager.Instance.Init();
#if UNITY_ANDROID  && !UNITY_EDITOR 
        Application.targetFrameRate = 60;
#else
        Application.targetFrameRate = 60;
#endif    
        UIManager.Instance.PushPanel(UIPanelType.RootView);
        GameObject.Destroy(HotUpdateView.gameObject);

        JsManager.Instance.StartGame();
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
        JsManager.Instance.Update();
    }
}
