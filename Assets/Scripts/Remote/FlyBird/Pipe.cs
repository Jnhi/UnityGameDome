// using HFramework;
// using UnityEngine;

// public class Pipe : MonoBehaviour
// {
//     /// <summary>
//     /// 管道中间的空隙高度的一半
//     /// </summary>
//     public float spacing = 260;
//     private RectTransform Up;
//     private RectTransform Down;
//     private bool isAddScore = true;

//     private FlyBirdView FlyBirdView;

//     void Awake() {
//         this.Up = this.transform.Find("Up").GetComponent<RectTransform>();
//         this.Down = this.transform.Find("Down").GetComponent<RectTransform>();
//         FlyBirdView = GameObject.Find("FlyBirdView").GetComponent<FlyBirdView>();
//     }
//     void Update() {
//         if (this.transform.localPosition.x <= 0 && isAddScore)
//         {
//             AudioManager.Instance.Play("FlyBird/Music/getScore.wav");
//             FlyBirdView.score ++;
//             FlyBirdView.upDataScore(FlyBirdView.score);
//             isAddScore = false;
//         }
//     }
//     public void refresh(float spacing,float y)
//     {
//         this.spacing = spacing;
//         this.Up.localPosition = new Vector3(0,spacing,0);
//         this.Down.localPosition = new Vector3(0,-spacing,0);
//         this.transform.localPosition = new Vector3(780,y,0);
//     }
// }
