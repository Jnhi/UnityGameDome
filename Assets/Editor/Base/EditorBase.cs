using UnityEditor;
using UnityEngine;

/// <summary>
/// 编辑器基础类
/// </summary>
/// <typeparam name="T"></typeparam>
public class EditorBase<T> : Editor where T : class
{
    public T tg;
    /// <summary>
    /// This function is called when the object becomes enabled and active.
    /// </summary>
    public void OnEnable()
    {
        FnInitTarget();
    }

    protected virtual void FnInitTarget()
    {
        tg = target as T;
    }

    protected void FnAddIndentLv(bool _isAddLv)
    {
        if (_isAddLv)
        {
            EditorGUI.indentLevel++;
        }
        else
        {
            EditorGUI.indentLevel--;
        }
    }

    // protected void FnBeginHorizontal()
    // {
    //     EditorGUILayout.BeginHorizontal();
    // }

    // protected void FnEndHoriztontal()
    // {
    //     EditorGUILayout.EndHorizontal();
    // }

    // protected void FnBeginVertical()
    // {
    //     EditorGUILayout.BeginVertical();
    // }

    // protected void FnEndVertical()
    // {
    //     EditorGUILayout.EndVertical();
    // }

    protected void FnAddSpaceVertical(float space)
    {
        EditorGUILayout.BeginVertical();
        GUILayout.Space(space);
        EditorGUILayout.EndVertical();
    }

    protected void FnAddSpace(float idx, float space = 10)
    {
        GUILayout.Space(space * idx);
    }

    protected bool FnAddButton(string _btnName, int _btnWidth)
    {
        return GUILayout.Button(_btnName, GUILayout.MaxWidth(_btnWidth));
    }

    public void FnAddLabel(string _labelName, int _labelWidth)
    {
        GUILayout.Label(_labelName, GUILayout.Width(_labelWidth));
    }

    public void FnAddLabel(string _labelName, string _toolTips, int _labelWidth)
    {
        FnAddLabel(new GUIContent(_labelName, _toolTips), _labelWidth);
    }

    public void FnAddLabel(GUIContent _content, int _labelWidth)
    {
        GUILayout.Label(_content, GUILayout.Width(_labelWidth));
    }

    protected string FnAddTextField(string _fieldName, int _fieldWidth)
    {
        _fieldName = EditorGUILayout.TextField(_fieldName, GUILayout.MaxWidth(_fieldWidth));
        return _fieldName;
    }

    protected string FnAddTextField(string _label, string _fieldName, int _labelWidth)
    {
        _fieldName = EditorGUILayout.TextField(_label, _fieldName, GUILayout.MaxWidth(_labelWidth));
        return _fieldName;
    }

    protected bool FnAddToggle(bool isToggleOpen, string _toggleName, int _width)
    {
        return GUILayout.Toggle(isToggleOpen, _toggleName, GUILayout.MaxWidth(_width));
    }

    protected bool FnAddToggle(bool isToggleOpen, string _toggleName, string toolTips, int _width)
    {
        GUIContent content = new GUIContent(_toggleName, toolTips);
        return GUILayout.Toggle(isToggleOpen, content, GUILayout.MaxWidth(_width));
    }

    protected bool FnDisplayDialog(string _title, string _content, string _ok, string _cancel = "")
    {
        return EditorUtility.DisplayDialog(_title, _content, _ok, _cancel);
    }

    public void FnBeginHorizontal(int _indent = 0)
    {
        EditorGUILayout.BeginHorizontal();
        FnAddSpace(_indent);
    }

    public void FnEndHorizontal()
    {
        EditorGUILayout.EndHorizontal();
    }

    protected void FnBeginVertical(float space = 0)
    {
        EditorGUILayout.BeginVertical();
        FnAddSpace(space);
    }

    protected void FnEndVeritical()
    {
        EditorGUILayout.EndVertical();
    }

    public string GetScriptContent(string _path)
    {
        // return EditorUtil.FnGetFileContent(_path);
        return " EditorUtil.FnGetFileContent(_path)";
    }
}
