using System.Threading.Tasks;
using UnityEngine;
using UnityEngine.AddressableAssets;
using UnityEngine.Events;
using UnityEngine.ResourceManagement.AsyncOperations;

namespace HFramework
{
    public class ResManager:Singleton<ResManager>{
        public void Init()
        {
        }

        // Start is called before the first frame update
        public void Start()
        {
        }

        // Update is called once per frame
        public void Update()
        {
        }
        /// <summary>
        /// 同步加载资源
        /// </summary>
        /// <typeparam name="T">加载资源类型</typeparam>
        /// <param name="resPath">资源路径</param>
        /// <returns></returns>
        public T Load<T>(string resPath)where T:Object
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
        public AsyncOperationHandle<T> LoadAsync<T>(string resPath)where T:Object
        {
            return Addressables.LoadAssetAsync<T>(resPath);
        }

        public async Task<T> LoadAssetAsync<T>(string resPath) where T : Object
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
        public void LoadAsync<T>(string resPath,UnityAction<T> action)where T:Object
        {
            Addressables.LoadAssetAsync<T>(resPath).Completed += (obj) =>
            {
                action(obj.Result);
            };
        }
    }
}
