using System;
using UnityEngine;
using UnityEngine.UI;
using DG.Tweening;
using UnityEngine.EventSystems;
using UnityEngine.AddressableAssets;
using System.Collections.Generic;
using TMPro;
using HFramework;

public class FlyBirdView : BasePanel
{
    private RawImage ground;
    private RawImage sky;
    private Button btnStart;
    private Button btnReStart;
    private Image bird;
    private CanvasGroup startPanel;
    private TMP_Text txtScore;
    private TMP_Text txtOverScore;
    private TMP_Text txtBestScore;
    private Image imgMedal;
    private CanvasGroup overPanel;
    private Transform BirdAndPipe;
    private GameObject pipePerfab;
    private List<GameObject> curPipes = new List<GameObject>();
    private List<GameObject> needDestory = new List<GameObject>();
    private Tween t;
    
    private float bgSpeed = 0.18f;
    private float groundSpeed = 0.23f;
    private float upSpeed = -1000;
    private float downSpeed = 700;
    private float pipeSpeed = 300;
    private float pipeIntervalTime = 3f;
    private bool isUp = false;

    /// <summary>
    /// 游戏是否开始
    /// </summary>
    private bool isStart = false;
    /// <summary>
    /// 点击后弹起时间
    /// </summary>
    private float upTime = 0.3f;

    /// <summary>
    /// 鸟的碰撞距离
    /// </summary>
    private float carshDis = 30;

    float pipeTime = 0;

    public int score = 0;

    // Start is called before the first frame update
    void Awake() {
        ground = this.transform.Find("imgGround").GetComponent<RawImage>();
        sky = this.transform.Find("imgSky").GetComponent<RawImage>();
        txtScore = this.transform.Find("txtScore").GetComponent<TMP_Text>();
        startPanel = this.transform.Find("StartPanel").GetComponent<CanvasGroup>();
        btnStart = startPanel.transform.Find("btnStart").GetComponent<Button>();

        overPanel = this.transform.Find("OverPanel").GetComponent<CanvasGroup>();
        btnReStart = overPanel.transform.Find("btnReStart").GetComponent<Button>();
        txtOverScore = overPanel.transform.Find("txtOverScore").GetComponent<TMP_Text>();
        txtBestScore = overPanel.transform.Find("txtBestScore").GetComponent<TMP_Text>();
        imgMedal = overPanel.transform.Find("imgMedal").GetComponent<Image>();

        BirdAndPipe = this.transform.Find("BirdAndPipe").GetComponent<Transform>();
        bird = BirdAndPipe.Find("Bird").GetComponent<Image>();
        Addressables.LoadAssetAsync<GameObject>("FlyBird/Fabs/Pipe.prefab").Completed += (obj) =>
        {
            pipePerfab = obj.Result;
        };
    }
    void Start()
    {
        btnStart.onClick.AddListener(()=>{
            GameStart();
        });
        btnReStart.onClick.AddListener(()=>{
            overPanel.gameObject.SetActive(false);
            ReGame();
        });
        sky.gameObject.AddEventTriggerListener(EventTriggerType.PointerDown,(data)=>{
            AudioManager.Instance.Play("FlyBird/Music/fly.wav");
            isUp = true;
            float timerr = 0;
            bird.transform.DORotate(new Vector3(0,0,30),0.2f);
            t.Kill();
            t = DOTween.To(() => timerr, x => timerr = x, 1, upTime).OnStepComplete(()=>{
                isUp = false;
                bird.transform.DORotate(new Vector3(0,0,-30),0.2f);
            }).SetLoops(1);
        });
    }

    public void upDataScore(int score)
    {
        txtScore.text = score.ToString();
    }

    private void GameStart()
    {
        isStart = true;
        isUp = false;
        txtScore.gameObject.SetActive(true);
        startPanel.gameObject.SetActive(false);
        overPanel.gameObject.SetActive(false);
        bird.transform.DORotate(new Vector3(0,0,-30),0.3f);
    }

    private void GameOver()
    {
        AudioManager.Instance.Play("FlyBird/Music/crash.wav");
        isStart = false;
        bird.gameObject.GetComponent<SpriteAnimation>().Stop();
        t.Kill();
        txtOverScore.text = this.score.ToString();
        if (PlayerPrefs.HasKey("Bird_BestScore"))
        {
            int saveBastScore = PlayerPrefs.GetInt("Bird_BestScore");
            if (saveBastScore < this.score)
            {
                PlayerPrefs.SetInt("Bird_BestScore",this.score);
            }
            
        }else
        {
            PlayerPrefs.SetInt("Bird_BestScore",this.score);
        }
        txtBestScore.text = PlayerPrefs.GetInt("Bird_BestScore").ToString();

        string medalPath = "";
        if (this.score <= 3){
            medalPath = "FlyBird/Image/medals_1.png";
        }else if(this.score <= 8){
            medalPath = "FlyBird/Image/medals_2.png";
        }else if(this.score <= 15){
            medalPath = "FlyBird/Image/medals_3.png";
        }else{
            medalPath = "FlyBird/Image/medals_4.png";
        }
        Addressables.LoadAssetAsync<Sprite>(medalPath).Completed += (obj) =>
        {
            imgMedal.sprite = obj.Result;
            overPanel.gameObject.SetActive(true);
        };
    }

    private void ReGame()
    {
        bird.transform.localPosition = Vector3.zero;
        bird.GetComponent<SpriteAnimation>().Play("fly");
        // 删除屏幕外的水管
        for (int i = 0; i < needDestory.Count; i++)
        {
            Destroy(needDestory[i]);
        }
        needDestory.Clear();

        for (int i = 0; i < curPipes.Count; i++)
        {
            Destroy(curPipes[i]);
        }
        curPipes.Clear();
        bird.transform.rotation = Quaternion.identity;
        score = 0;
        upDataScore(this.score);

        GameStart();
    }

    private bool isCrash(Image bird,GameObject pipe)
    {
        float disX = System.Math.Abs(bird.transform.localPosition.x-pipe.transform.localPosition.x);
        if (disX <= 170)
        {
            float disY = System.Math.Abs(bird.transform.localPosition.y-pipe.transform.localPosition.y);
            if (disY + carshDis >= pipe.GetComponent<Pipe>().spacing)
            {
                return true;
            }
        }
        return false;
    }

    /// <summary>
    /// 创建水管
    /// </summary>
    /// <returns></returns>
    private GameObject createPipe()
    {
        GameObject pipeObj = Instantiate(pipePerfab,BirdAndPipe);
        pipeObj.GetComponent<Pipe>().refresh(UnityEngine.Random.Range(250,300), UnityEngine.Random.Range(-300,550));
        curPipes.Add(pipeObj);
        return pipeObj;
    }
    // Update is called once per frame
    void Update()
    {


        if (bird && isStart)
        {
            ground.uvRect = new Rect( ground.uvRect.xMin + Time.deltaTime*groundSpeed,0,1,1);
            sky.uvRect = new Rect(sky.uvRect.xMin + Time.deltaTime*bgSpeed,0,1,1);

            bird.transform.localPosition = new Vector3(
                bird.transform.localPosition.x,
                Math.Min(930,bird.transform.localPosition.y-(isUp?upSpeed:downSpeed)*Time.deltaTime),
                bird.transform.localPosition.z
            );
            
            // 小鸟碰撞地面
            if (bird.transform.localPosition.y < -600)
            {
                GameOver();
            }
            
            // 删除屏幕外的水管
            for (int i = 0; i < needDestory.Count; i++)
            {
                curPipes.Remove(needDestory[i]);
                Destroy(needDestory[i]);
            }
            needDestory.Clear();

            // 水管的移动
            for (int i = 0; i < curPipes.Count; i++)
            {
                curPipes[i].transform.localPosition = new Vector3(
                    curPipes[i].transform.localPosition.x - Time.deltaTime*pipeSpeed,
                    curPipes[i].transform.localPosition.y,
                    curPipes[i].transform.localPosition.z 
                );

                if (curPipes[i].transform.localPosition.x <= -700)
                {
                    needDestory.Add(curPipes[i]);
                }
                // 检测小鸟是否碰撞水管
                if (isCrash(bird,curPipes[i]))
                {
                    GameOver();
                }
            }

            
            
            pipeTime += Time.deltaTime;
            // 水管定时创建
            if (pipeTime >= pipeIntervalTime)
            {
                pipeTime = 0;
                createPipe();
            }
        }
    }
}
