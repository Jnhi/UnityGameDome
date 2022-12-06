using System.Threading.Tasks;
using UnityEngine;
using UnityEngine.AddressableAssets;
using UnityEngine.Events;
using UnityEngine.ResourceManagement.AsyncOperations;

namespace HFramework
{
    public class ResManager{
        /// <summary>
        /// 同步加载资源
        /// </summary>
        /// <typeparam name="T">加载资源类型</typeparam>
        /// <param name="resPath">资源路径</param>
        /// <returns></returns>
        public static T Load<T>(string resPath)where T:Object
        {
            var op = Addressables.LoadAssetAsync<T>(resPath);
            T obj = op.WaitForCompletion() as T;
            // Addressables.Release(op);
            return obj;
        }

        /// <summary>
        /// 异步加载资源
        /// </summary>
        /// <typeparam name="T">加载资源类型</typeparam>
        /// <param name="resPath">资源路径</param>
        /// <returns></returns>
        public static AsyncOperationHandle<T> LoadAsync<T>(string resPath)where T:Object
        {
            return Addressables.LoadAssetAsync<T>(resPath);
        }

        public static async Task<T> LoadAssetAsync<T>(string resPath) where T : Object
        {
            var handle = Addressables.LoadAssetAsync<T>(resPath);
            await handle.Task;
            if (handle.Status == UnityEngine.ResourceManagement.AsyncOperations.AsyncOperationStatus.Succeeded)
            {
                return handle.Result;
            }
            return null;
        }

        /// <summary>
        /// 异步加载资源
        /// </summary>
        /// <typeparam name="T">加载资源类型</typeparam>
        /// <param name="resPath">资源路径</param>
        /// <returns></returns>
        public static void LoadAsync<T>(string resPath,UnityAction<T> action)where T:Object
        {
            Addressables.LoadAssetAsync<T>(resPath).Completed += (obj) =>
            {
                action(obj.Result);
            };
        }


        public static GameObject LoadPrefab(string address)
        {
            var res = Addressables.LoadAssetAsync<GameObject>(address).WaitForCompletion();
            return res;
        }

        public static async Task<GameObject> LoadPrefabAsync(string address)
        {
            var res = await Addressables.LoadAssetAsync<GameObject>(address).Task;
            return res;
        }

        public static async Task<TextAsset> LoadTextAssetAsync(string address)
        {
            var res = await Addressables.LoadAssetAsync<TextAsset>(address).Task;
            return res;
        }


        public static async Task<Sprite> LoadSpriteAsync(string address)
        {
            var res = await Addressables.LoadAssetAsync<Sprite>(address).Task;
            return res;
        }

        /// <summary>
        /// 加载JS代码
        /// </summary>
        /// <param name="jsLabel"></param>
        /// <returns></returns>
        public static async Task<bool> PreloadJS(string jsLabel)
        {
            var list = await Addressables.LoadAssetsAsync<TextAsset>(jsLabel, null).Task;
            if (list != null)
            {
                JsManager.Instance.jscache.Clear();
                foreach (var txt in list)
                {
                    JsManager.Instance.jscache.Add($"{txt.name}.js", txt.text);
                }
                return true;
            }
            else
            {
                Debug.Log("加载JS失败......");
                return false;
            }
        }
    }
}
