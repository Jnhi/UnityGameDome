using System.Collections.Generic;
using UnityEngine;

public class MyDebug : MonoBehaviour
{
    private Vector2 ScrollPos;
    public static List<string> messages = new List<string>();
    public static List<string> names = new List<string>();
    public static bool isShow = false;
 
    void OnGUI()
    {
        if (!isShow) return;
        //gUIStyle.stretchWidth = 20;
        ScrollPos = GUI.BeginScrollView(new Rect(0, 30, 600 * (Screen.width / 720), Screen.height),
            ScrollPos, new Rect(0, 0, 100000000, 100000000));
 
        //ScrollPos = GUI.BeginScrollView(new Rect(10, 10, 400, 400), ScrollPos, new Rect(10, 10, 770, 600));
 
        float posY = 0;
        for (int i = 0; i < names.Count; i++)
        {
            GUIContent tempContent = new GUIContent();
            tempContent.text = names[i] + " : " + messages[i];
            GUIStyle bb = new GUIStyle();
            bb.fixedWidth = 600 * (Screen.width / 720);
            bb.wordWrap = true;
            bb.fontSize = 40 * (Screen.width / 720);
            float H = bb.CalcHeight(tempContent, 600 * (Screen.width / 720));
            GUI.Label(new Rect(0, posY, 600 * (Screen.width / 720), H), tempContent, bb);
            posY += H;
            //GUILayout.Space(10);
        }
 
        GUI.EndScrollView();
 
    }
 
    public static void Add(string name, string message)
    {
        if (names.Contains(name) == false)
        {
            names.Add(name);
            messages.Add(message);
        }
        else
        {
            for (int i = 0; i < names.Count; i++)
            {
                if (names[i] == name)
                {
                    messages[i] = message;
                    break;
                }
            }
        }
    }
}