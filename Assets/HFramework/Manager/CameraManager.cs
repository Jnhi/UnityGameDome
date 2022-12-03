using UnityEngine;
namespace HFramework
{
    public class CameraManager:Singleton<CameraManager>
    {
        public Camera camera;
        public void Init()
        {
            camera = GameObject.Find("UICamera").GetComponent<Camera>();
            float designWidth = 720f;//开发中分辨率的宽度
            float designHeight = 1280f;//开发中分辨率的高度 
            float designOrthographicSize = designWidth/designHeight;//开发时正交摄像机的大小，6.4*100*2=1280；×100是因为Unity中的pixels per unit是100，×2是因为想设置成屏幕的一半
            // Debug.Log(designOrthographicSize);
            float designScale = designWidth / designHeight;
            float scaleRate = (float)Screen.width / (float)Screen.height;
            // Debug.Log(Screen.width + "|" + Screen.height);
            // Debug.Log(designScale);
            // Debug.Log(scaleRate);
            if(scaleRate < designScale)//判断我们设计的比例跟实际比例是否一致，若我们设置的大则进入自适应设置，小的话他会自动自适应
            {
                float scale = scaleRate / designScale;
                camera.orthographicSize = designOrthographicSize / scale ;
            }
            else
            {
                camera.orthographicSize = designOrthographicSize;
            }
        }

        // Start is called before the first frame update
        public void Start()
        {

        }

        // Update is called once per frame
        public void Update()
        {
        }
    }
}