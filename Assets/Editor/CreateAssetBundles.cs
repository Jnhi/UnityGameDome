using System.Collections.Generic;
using System.IO;
using UnityEditor;
using UnityEngine;

public class CreateAssetBundles
{
    [MenuItem("Assets/Build AssetBundles")]
    static void BuildAllAssetBundles()
    {
        string assetBundleDirectory = "Assets/AssetBundles";
        if(!Directory.Exists(assetBundleDirectory))
        {
            Directory.CreateDirectory(assetBundleDirectory);
        }
        List<AssetBundleBuild> buildMap = new List<AssetBundleBuild>();

 #if UNITY_ANDROID//安卓端
        Debug.Log("安卓平台打包成功");
        BuildPipeline.BuildAssetBundles(Application.streamingAssetsPath,
        buildMap.ToArray(),
        BuildAssetBundleOptions.UncompressedAssetBundle,
        BuildTarget.Android);
#elif UNITY_IPHONE//IOS
        Debug.Log("IOS平台打包成功");
        BulidPipeline.BuildAssetBundles(Application.streamingAssetsPath,
        buildMap.ToArray(),
        BuildAssetBundleOptions.UncompressedAssetBundle,
        BuildTarget.iOS);
#elif UNITY_STANDALONE_WIN||UNITY_EDITOR//PC或则编辑器
        Debug.Log("PC平台打包成功");
        BuildPipeline.BuildAssetBundles(Application.streamingAssetsPath,
        buildMap.ToArray(),
        BuildAssetBundleOptions.UncompressedAssetBundle,
        BuildTarget.StandaloneWindows
        );
#endif
    }
}
