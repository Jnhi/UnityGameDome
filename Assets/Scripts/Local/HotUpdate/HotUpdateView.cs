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
using UnityEngine.ResourceManagement.Exceptions;

public class HotUpdateView : MonoBehaviour {
    private GameObject noticePanel;
    private TMP_Text txtInfo;
    private Slider prgLoading;
    private TMP_Text txtMsg;
    private TMP_Text txtTitle;
    private Button btn1;
    private Button btn2;

    private Action GameStart;
    void Awake() {
        txtInfo = this.transform.Find("txtInfo").GetComponent<TMP_Text>();
        prgLoading = this.transform.Find("prgLoading").GetComponent<Slider>();

        noticePanel = this.transform.Find("noticePanel").gameObject;
        btn1 = noticePanel.transform.Find("btn1").GetComponent<Button>();
        btn2 = noticePanel.transform.Find("btn2").GetComponent<Button>();
        txtMsg = noticePanel.transform.Find("txtMsg").GetComponent<TMP_Text>();
        txtTitle = noticePanel.transform.Find("txtTitle").GetComponent<TMP_Text>();
        
        noticePanel.SetActive(false);
        prgLoading.value = 0;
        txtInfo.text = "检查更新";
    }


    private async Task InitAsync()
    {   
        string _catalogPath = Application.persistentDataPath +"/com.unity.addressables";
        if(Directory.Exists(_catalogPath))
        {
            try
            {
                Directory.Delete(_catalogPath,true);
                Debug.Log("删除本地 catalog");
            }
            catch(Exception e)
            {
                Debug.LogError(e.ToString());
            }
        }
        await Addressables.InitializeAsync().Task;
        Debug.Log("Addressables 初始化结束");      
    }

    public async Task ChickUpdate(Action GameStart)
    {
        this.GameStart = GameStart;
        await InitAsync();

        // 检测更新
        try
        {
            var checkHandle = await Addressables.CheckForCatalogUpdates(false).Task;
            if (checkHandle.Count > 0)
            {
                var updateHandle = await Addressables.UpdateCatalogs(checkHandle, false).Task;
                // 更新列表迭代器
                List<IResourceLocator> locators = updateHandle;
                foreach (var locator in locators)
                {
                    // 获取待下载的文件总大小
                    var sizeHandle = await Addressables.GetDownloadSizeAsync(locator.Keys).Task;
                    long totalDownloadSize = sizeHandle;
                    Debug.Log($"download size:{totalDownloadSize / Math.Pow(1024, 2)}MB");
                    if (totalDownloadSize > 0)
                    {
                        noticePanel.SetActive(true);
                        txtMsg.text =  string.Format("本次下载大小:{0:F2}MB,是否确定下载？",totalDownloadSize / Math.Pow(1024, 2));
                        btn1.onClick.AddListener(()=>{
                            noticePanel.SetActive(false);
                            // 下载
                            StartCoroutine(DownLoad(locator.Keys));
                        });
                        btn2.onClick.AddListener(()=>{
                            Debug.Log("退出游戏");
                        });
                    }else{
                        StartGame();
                    }
                }
            }
            else
            {
                txtInfo.text = "无需更新";
                StartGame();
            }
        }
        catch (OperationException ex)
        {
            Debug.Log("[ChickUpdate] Error\n" + ex.ToString());
        }

    }

    IEnumerator DownLoad(IEnumerable keys)
    {
        var downloadHandle = Addressables.DownloadDependenciesAsync(keys, MergeMode.Union, false);
        while (!downloadHandle.IsDone)
        {
            if (downloadHandle.Status == AsyncOperationStatus.Failed)
            {
                Debug.Log("[DownloadDependenciesAsync] Error\n" + downloadHandle.OperationException.ToString());
                yield break;
            }
            // 下载进度
            float percentage = downloadHandle.PercentComplete;
            prgLoading.value = percentage * 100;
            txtInfo.text = $"已下载: {percentage}";
            yield return null;
        }
        if (downloadHandle.Status == AsyncOperationStatus.Succeeded)
        {
            Debug.Log("下载完毕!");
            txtInfo.text = "下载完毕";
            StartGame();
        }
    }

    void StartGame()
    {
        prgLoading.value = 100;
        txtInfo.text = "正在进入游戏...";
        GameStart?.Invoke();
    }

}
