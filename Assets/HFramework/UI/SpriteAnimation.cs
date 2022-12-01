using UnityEngine;
using UnityEngine.UI;
using System.Collections.Generic;
using System;

namespace HFramework
{
    /// <summary>
    /// 播放结束后枚举
    /// </summary>
    public enum OnAnimEnd
    {
        /// <summary>
        /// 释放该物体
        /// </summary>
        destroy,
        /// <summary>
        /// 回到第一帧
        /// </summary>
        playFirstFrame,
        /// <summary>
        /// 回到最后一帧
        /// </summary>
        playLastFrame
    }
    /// <summary>
    /// 序列帧动画组件
    /// </summary>
    [RequireComponent(typeof(Image))]
    public class SpriteAnimation : MonoBehaviour
    {
        #region Variable region
        /// <summary>
        /// 是否自动播放
        /// </summary>
        public bool AutoPlay = true;
        public int defaultAnim = 0;

        private Image mImg;
        public Image img
        {
            get
            {
                if (mImg == null)
                    mImg = GetComponent<Image>();
                return mImg;
            }
        }
        private bool isPlayingAnim;
        private int curAnimIndex;
        private float realTimeSinceStart;
        private float timeGap;
        private float curTime;
        private int loopCycle = 1;
        private bool isRealTime;
        public List<AnimInfo> listAllAnims = new List<AnimInfo>();
        private AnimInfo curAnim = new AnimInfo();

        #endregion

        // Use this for initialization
        void OnEnable()
        {
            if (AutoPlay)
            {
                if (defaultAnim < listAllAnims.Count)
                    Play(defaultAnim, null);
            }
        }

        // Update is called once per frame
        void Update()
        {
            if (isPlayingAnim)
            {
                if (isRealTime)
                {
                    StepAnim(Time.realtimeSinceStartup - realTimeSinceStart);
                    realTimeSinceStart = Time.realtimeSinceStartup;
                }
                else
                {
                    StepAnim(Time.deltaTime);
                }
            }
        }
        public void Stop()
        {
            isPlayingAnim = false;
        }


        public void Play(int idx, Action _action = null)
        {
            if (idx < listAllAnims.Count)
            {
                curAnim = listAllAnims[idx];

                if (curAnim.sprites.Length > 0 && curAnim.loopCycles != 0)
                {
                    if (_action != null)
                    {
                        curAnim.actOnAnimEnd = _action;
                    }
                    curAnimIndex = 0;
                    loopCycle = curAnim.loopCycles;
                    loopCycle--;
                    realTimeSinceStart = Time.realtimeSinceStartup;           
                    curTime = 0;                                              
                    timeGap = curAnim.animTime / curAnim.sprites.Length;      
                    isRealTime = curAnim.isRealTime;                          
                    ShowSprite(0);                                            
                    isPlayingAnim = true;                                     
                }
                else
                {
                    Debug.LogError("动画帧数为0 或是动画播放次数为0");
                }
            }
        }

        public void Play(string _animationName, Action _action = null)
        {
            int idx = -1;
            for (int i = 0; i < listAllAnims.Count; i++)
            {
                if (listAllAnims[i].name.Equals(_animationName))
                {
                    idx = i;
                    break;
                }
            }
            if (idx >= 0)
                Play(idx, _action);
            else
                Debug.LogWarning("Exception for not such animation name : " + _animationName);
        }

        void StepAnim(float time)
        {
            curTime += time;
            if (curTime >= timeGap)
            {
                curTime = curTime - timeGap;
                if (curAnimIndex < curAnim.sprites.Length - 1)
                {
                    curAnimIndex++;
                    ShowSprite(curAnimIndex);
                }
                else
                {
                    if (loopCycle != 0)
                    {
                        if (loopCycle > 0)
                        {
                            loopCycle--;
                        }
                        curAnimIndex = 0;
                        ShowSprite(curAnimIndex);
                    }
                    else
                    {
                        isPlayingAnim = false;
                        if (curAnim.actOnAnimEnd != null)
                        {
                            curAnim.actOnAnimEnd();
                        }
                        switch (curAnim.onAnimEnd)
                        {
                            case OnAnimEnd.playFirstFrame:
                                ShowSprite(0);
                                break;
                            case OnAnimEnd.playLastFrame:
                                ShowSprite(curAnim.sprites.Length - 1);
                                break;
                            case OnAnimEnd.destroy:
                                Destroy(gameObject);
                                break;
                        }
                    }
                }
            }
        }

        void ShowSprite(int idx)
        {
            if (idx < curAnim.sprites.Length)
            {
                img.sprite = curAnim.sprites[idx];
                // img.SetNativeSize();
            }
        }
    }

    [System.Serializable]
    public class AnimInfo{
    /// <summary>
    /// Name of the animation.
    /// </summary>
    public string name;
    /// <summary>
    /// Loop cycles. 
    /// See loopCycles member of <see cref="UVAnimation"/>.
    /// </summary>
    public int loopCycles = -1;
    /// <summary>
    /// The framerate at which the animation should play in frames per second.
    /// </summary>
    public float animTime = 1;// The Time play all the sprite ..
    public bool isRealTime = false;
    public Sprite[] sprites;
    public OnAnimEnd onAnimEnd = OnAnimEnd.destroy;
    public Action actOnAnimEnd;
}
}

