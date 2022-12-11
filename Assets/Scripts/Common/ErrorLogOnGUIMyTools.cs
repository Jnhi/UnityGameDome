using System.Collections.Generic;
using UnityEngine;
 
public class ErrorLogOnGUIMyTools : MonoBehaviour
{
    private List<string> m_logEntries = new List<string>();
 
    private bool m_IsVisible = false;
 
    private Rect m_WindowRect = new Rect(0, 0, Screen.width, Screen.height);
 
    private Vector2 m_scrollPositionText = Vector2.zero;
 
    private void Start()
    {
        Application.logMessageReceived += (string condition, string stackTrace, LogType type) =>
        {
            if (type == LogType.Exception || type == LogType.Error)
            {
                if (!m_IsVisible)
                {
                    m_IsVisible = true;
                }
                m_logEntries.Add(string.Format("{0}\n{1}", condition, stackTrace));
            }
        };
 
        // for (int i = 0; i < 30; i++)
        // {
        //     Debug.LogError("test error!");
        // }
    }
 
    void ConsoleWindow(int windowID)
    {
        GUILayout.BeginHorizontal();
        if (GUILayout.Button("Clear", GUILayout.MaxWidth(200), GUILayout.MaxHeight(100)))
        {
            m_logEntries.Clear();
        }
        if (GUILayout.Button("Close", GUILayout.MaxWidth(200), GUILayout.MaxHeight(100)))
        {
            m_IsVisible = false;
        }
        GUILayout.EndHorizontal();
 
        m_scrollPositionText = GUILayout.BeginScrollView(m_scrollPositionText);
 
        foreach (var entry in m_logEntries)
        {
            Color color = GUI.contentColor;
            GUI.contentColor = Color.red;
            GUILayout.TextArea(entry);
            GUI.contentColor = color;
        }
        GUILayout.EndScrollView();
    }
 
    private void OnGUI()
    {
        if (m_IsVisible)
        {
            m_WindowRect = GUILayout.Window(0, m_WindowRect, ConsoleWindow, "Console");
        }
    }
}