using UnityEngine;

namespace HFramework
{
    /// <summary>
    /// 依赖于Unity Mono的单例，其需要和Unity的一些物体做交互。例如对象池模块和音频管理模块。
    /// </summary>
    public class MonoSingleton<T> : MonoBehaviour where T : Component
    {
        private static T _instance = null;

        public static T Instance
        {
            get
            {
                if (_instance == null)
                {
                    _instance = FindObjectOfType<T>();
                    if (_instance == null)
                    {
                        GameObject obj = new GameObject(typeof(T).Name, new[] { typeof(T) });
                        DontDestroyOnLoad(obj);
                        _instance = obj.GetComponent<T>();
                    }
                    else
                    {
                        Debug.LogWarning("Instance is already exist!");
                    }
                }

                return _instance;
            }
        }

        /// <summary>
        /// 继承Mono单例的类如果写了Awake方法，需要在Awake方法最开始的地方调用一次base.Awake()，来给_instance赋值
        /// </summary>
        public void Awake()
        {
            _instance = this as T;
            DontDestroyOnLoad(this);
        }
    }
}

