
using UnityEngine;
using TMPro;

public class DebugManager:MonoBehaviour
{
    private TMP_Text txtInfo;
    private float _Interval = 0.5f;
    private int _FrameCount = 0;
    private float _TimeCount = 0;
    private float _FrameRate = 0;
 
    void Awake()
    {
        this.txtInfo = this.transform.Find("txtInfo").GetComponent<TMP_Text>();
    }

    void Start()
    {
        
    }
    void Update()
    {
        _FrameCount++;
        _TimeCount += Time.unscaledDeltaTime;
        if (_TimeCount >= _Interval)
        {
            _FrameRate = _FrameCount / _TimeCount;
            _FrameCount = 0;
            _TimeCount -= _Interval;
        }
        txtInfo.text = string.Format("FPS:{0:F1}", _FrameRate);
    }
}
