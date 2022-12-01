using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using HFramework;
using TMPro;
using UnityEngine;
using UnityEngine.AddressableAssets;
using UnityEngine.UI;
using UnityEngine.ResourceManagement.ResourceLocations;
using System.IO;

public class HotUpdateView : MonoBehaviour {
    private Button btnSure;
    private Button btnCanel;
    private TMP_Text txtInfo;
    private TMP_Text txtLoading;
    private Slider prgLoading;
    void Awake() {
        btnSure = this.transform.Find("btnSure").GetComponent<Button>();
        btnCanel = this.transform.Find("btnCanel").GetComponent<Button>();
        txtInfo = this.transform.Find("txtInfo").GetComponent<TMP_Text>();
        txtLoading = this.transform.Find("txtLoading").GetComponent<TMP_Text>();
        prgLoading = this.transform.Find("prgLoading").GetComponent<Slider>();
        prgLoading.value = 0;
        btnSure.gameObject.SetActive(false);
        btnCanel.gameObject.SetActive(false);
    }
    async void Start(){
        await CheckUpdate();
    }

    public async Task CheckUpdate()
    {
        var start = DateTime.Now;

        txtInfo.text = "正在检查资源更新...";

        await InitAsync();

        var catalogs = await Addressables.CheckForCatalogUpdates(false).Task;
        Debug.Log(string.Format("CheckIfNeededUpdate use {0}ms", (DateTime.Now - start).Milliseconds));
        Debug.Log($"catalog count: {catalogs.Count}");
        if (catalogs != null && catalogs.Count > 0)
        {
            txtInfo.text = "正在更新资源...";
            start = DateTime.Now;
            Debug.Log("2222");
            var locators = await Addressables.UpdateCatalogs(catalogs, false).Task;
            Debug.Log("333");
            foreach (var locator in locators)
            {
                Debug.Log(locator);
                var size = await Addressables.GetDownloadSizeAsync(locator.Keys).Task;
                Debug.Log($"download size:{size}");
                txtInfo.text = $"本次更新大小：{size}";
                // btnSure.gameObject.SetActive(true);
                // btnCanel.gameObject.SetActive(true);
                // btnSure.onClick.AddListener(()=>{
                //     btnSure.gameObject.SetActive(false);
                //     btnCanel.gameObject.SetActive(false);

                // });
                var downloadHandle = Addressables.DownloadDependenciesAsync(locator.Keys, Addressables.MergeMode.Union);
                while (!downloadHandle.IsDone)
                {
                    float percentage = downloadHandle.PercentComplete;
                    Debug.Log($"download pregress: {percentage}");
                    prgLoading.value = percentage * 100;

                }
                Addressables.Release(downloadHandle);
            }
            UpdateFinish();
            
            // Addressables.Release(locators);

            // Addressables.Release(catalogs);
        }
        

        StartGame();
    }

    public async Task InitAsync()
    {   
        string _catalogPath = Application.persistentDataPath +"/com.unity.addressables";
        if(Directory.Exists(_catalogPath))
        {
            try
            {
                Directory.Delete(_catalogPath,true);
                Debug.Log("delete catalog cache done!");
            }
            catch(Exception e)
            {
                Debug.LogError(e.ToString());
            }
        }
        await Addressables.InitializeAsync().Task;
        Debug.Log("AssetManager init done");      
    }

    void StartGame()
    {
        txtInfo.text = "正在进入游戏...";
        Debug.Log("进入游戏");
        // JsManager.Instance.StartGame();

    }

    void UpdateFinish()
    {
        prgLoading.value = 100;
        txtInfo.text = "正在准备资源...";
        Debug.Log("更新结束");
        // JsManager.Instance.Restart();

    }

}
