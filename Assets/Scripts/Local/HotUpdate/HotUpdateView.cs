using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using TMPro;
using UnityEngine;
using UnityEngine.AddressableAssets;
using UnityEngine.UI;
using System.IO;
using System.Collections;
using UnityEngine.ResourceManagement.AsyncOperations;
using UnityEngine.AddressableAssets.ResourceLocators;
using static UnityEngine.AddressableAssets.Addressables;

public class HotUpdateView : MonoBehaviour {
    private Button btnSure;
    private Button btnCanel;
    private TMP_Text txtInfo;
    private Slider prgLoading;

    void Awake() {
        btnSure = this.transform.Find("btnSure").GetComponent<Button>();
        btnCanel = this.transform.Find("btnCanel").GetComponent<Button>();
        txtInfo = this.transform.Find("txtInfo").GetComponent<TMP_Text>();
        prgLoading = this.transform.Find("prgLoading").GetComponent<Slider>();
        prgLoading.value = 0;
        btnSure.gameObject.SetActive(false);
        btnCanel.gameObject.SetActive(false);
    }
    void Start()
    {
        StartCoroutine(DoUpdateAddressadble());
    }

    // async Task Start()
    // {
    //     await CheckUpdate();
    // }
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
            List<IResourceLocator> locators = await Addressables.UpdateCatalogs(catalogs, false).Task;
            foreach (var v in locators)
            {
                List<object> keys = new List<object>();
                keys.AddRange(v.Keys);
                Debug.Log(v);
                var size = await Addressables.GetDownloadSizeAsync(keys).Task;
                Debug.Log($"download size:{size/Math.Pow(1024,2)}");
                txtInfo.text = $"本次更新大小：{size}MB";
                // btnSure.gameObject.SetActive(true);
                // btnCanel.gameObject.SetActive(true);
                // btnSure.onClick.AddListener(()=>{
                //     btnSure.gameObject.SetActive(false);
                //     btnCanel.gameObject.SetActive(false);

                // });
                var downloadHandle = Addressables.DownloadDependenciesAsync(keys,MergeMode.Union,false);
                while (!downloadHandle.IsDone)
                {
                    float percentage = downloadHandle.PercentComplete;
                    Debug.Log($"download pregress: {percentage}");
                    // prgLoading.value = percentage * 100;

                }
                Addressables.Release(downloadHandle);
            }
            UpdateFinish();
            
            Addressables.Release(locators);

            Addressables.Release(catalogs);
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

    IEnumerator DoUpdateAddressadble()
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

        AsyncOperationHandle<IResourceLocator> initHandle = Addressables.InitializeAsync();
        yield return initHandle;

        // 检测更新
        var checkHandle = Addressables.CheckForCatalogUpdates(false);
        yield return checkHandle;
        if (checkHandle.Status != AsyncOperationStatus.Succeeded)
        {
            Debug.Log("CheckForCatalogUpdates Error\n" +  checkHandle.OperationException.ToString());
            yield break;
        }

        if (checkHandle.Result.Count > 0)
        {
            var updateHandle = Addressables.UpdateCatalogs(checkHandle.Result, false);
            yield return updateHandle;

            if (updateHandle.Status != AsyncOperationStatus.Succeeded)
            {
                Debug.Log("UpdateCatalogs Error\n" + updateHandle.OperationException.ToString());
                yield break;
            }

            // 更新列表迭代器
            List<IResourceLocator> locators = updateHandle.Result;
            foreach (var locator in locators)
            {
                List<object> keys = new List<object>();
                keys.AddRange(locator.Keys);
                // 获取待下载的文件总大小
                var sizeHandle = Addressables.GetDownloadSizeAsync(keys);
                yield return sizeHandle;
                if (sizeHandle.Status != AsyncOperationStatus.Succeeded)
                {
                    Debug.Log("GetDownloadSizeAsync Error\n" + sizeHandle.OperationException.ToString());
                    yield break;
                }

                long totalDownloadSize = sizeHandle.Result;
                Debug.Log($"download size:{totalDownloadSize/Math.Pow(1024,2)}");
                if (totalDownloadSize > 0)
                {
                    // 下载
                    var downloadHandle = Addressables.DownloadDependenciesAsync(keys,MergeMode.Union,false);
                    while (!downloadHandle.IsDone)
                    {
                        if (downloadHandle.Status == AsyncOperationStatus.Failed)
                        {
                            Debug.Log("DownloadDependenciesAsync Error\n"  + downloadHandle.OperationException.ToString());
                            yield break;
                        }
                        // 下载进度
                        float percentage = downloadHandle.PercentComplete;
                        prgLoading.value = percentage * 100;
                        Debug.Log($"已下载: {percentage}");
                        txtInfo.text = $"\n已下载: {percentage}";
                        yield return null;
                    }
                    if (downloadHandle.Status == AsyncOperationStatus.Succeeded)
                    {
                        Debug.Log("下载完毕!");
                        txtInfo.text = "下载完毕";
                        UpdateFinish();
                    }
                }
            }
        }
        else
        {
            txtInfo.text = txtInfo.text + "\n没有检测到更新";
        }

        // 进入游戏
        StartGame();
    }

    void StartGame()
    {
        txtInfo.text = "正在进入游戏...";
        Debug.Log("进入游戏");
    }

    void UpdateFinish()
    {
        prgLoading.value = 100;
        txtInfo.text = "正在准备资源...";
        Debug.Log("更新结束");
        // JsManager.Instance.Restart();

    }

}
