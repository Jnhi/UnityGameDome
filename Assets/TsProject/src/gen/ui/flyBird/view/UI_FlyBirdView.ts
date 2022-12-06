import { UnityEngine } from "csharp";
import { BasePanel } from "../../../../hframework/ui/BasePanel";

export default class UI_FlyBirdView extends BasePanel {

    public m_btnFlyBird: UnityEngine.UI.Button;
    
    protected static perfabUrl = "FlyBird/Fabs/FlyBirdView.prefab"
    ground: UnityEngine.UI.RawImage;
    sky: UnityEngine.UI.RawImage;

    override OnBinding() {
      this.ground = this.ui.transform.Find("imgGround").GetComponent(puer.$typeof(UnityEngine.UI.RawImage)) as UnityEngine.UI.RawImage;
      this.sky = this.ui.transform.Find("imgSky").GetComponent(puer.$typeof(UnityEngine.UI.RawImage)) as UnityEngine.UI.RawImage;
      // this.txtScore = this.transform.Find("txtScore").GetComponent<TMP_Text>();
      // this.startPanel = this.transform.Find("StartPanel").GetComponent<CanvasGroup>();
      // this.btnStart = startPanel.transform.Find("btnStart").GetComponent<Button>();

      // this.overPanel = this.transform.Find("OverPanel").GetComponent<CanvasGroup>();
      // this.btnReStart = overPanel.transform.Find("btnReStart").GetComponent<Button>();
      // this.txtOverScore = overPanel.transform.Find("txtOverScore").GetComponent<TMP_Text>();
      // this.txtBestScore = overPanel.transform.Find("txtBestScore").GetComponent<TMP_Text>();
      // this.imgMedal = overPanel.transform.Find("imgMedal").GetComponent<Image>();

      // this.BirdAndPipe = this.transform.Find("BirdAndPipe").GetComponent<Transform>();
      // this.bird = BirdAndPipe.Find("Bird").GetComponent<Image>();
	  }
}