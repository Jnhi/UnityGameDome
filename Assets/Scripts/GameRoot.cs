using System.Threading.Tasks;
using HFramework;
using UnityEngine;
using UnityEngine.AddressableAssets;

/// <summary>
/// 作为UI启动器
/// </summary>
public class GameRoot : MonoBehaviour {

    void Awake() {
        DontDestroyOnLoad(this);
        ResManager.Instance.Init();
        CameraManager.Instance.Init();
        AudioManager.Instance.Init();
        UIManager.Instance.Init();
    }

    // Start is called before the first frame update
    void Start()
    {
#if UNITY_ANDROID  && !UNITY_EDITOR 
        Application.targetFrameRate = 60;
#else
        Application.targetFrameRate = 60;
#endif
        ResManager.Instance.Start();
        CameraManager.Instance.Start();
        UIManager.Instance.Start();
        AudioManager.Instance.Start();      
        // await ResManager.Instance.Initialize();
        UIManager.Instance.PushPanel(UIPanelType.RootView);

        // var op = Addressables.LoadAssetAsync<GameObject>("Root/Fabs/RootView.prefab");
        // GameObject go = op.WaitForCompletion();
        // GameObject.Instantiate(go);
        // GameObject.Instantiate(ResManager.Instance.Load<GameObject>("Root/Fabs/RootView.prefab"));
        // 1，直接加到GRoot显示出来
        // GRoot.inst.AddChild(view);

        // Sprite prefabObj = await Addressables.LoadAssetAsync<Sprite>("Assets/GameRes/FlyBird/Bird1.png").Task;
		// // 实例化
		// Sprite cubeObj = Instantiate(prefabObj);

        // Addressables.LoadAssetAsync<GameObject>("Root/Fabs/RootView.prefab").Completed += (obj) =>
        // {
        //     Instantiate(obj.Result);
        // };

        // Addressables.InstantiateAsync("FlyBird/Fabs/PinkBird.prefab",new Vector3(2,0,0),Quaternion.identity).Completed += (handle) =>
        // {
        //     // 已实例化的物体
        //     GameObject cubeObj = handle.Result;
        // };
    }

    // Update is called once per frame
    void Update()
    {
        CameraManager.Instance.Update();
        AudioManager.Instance.Update();  
    }
}
