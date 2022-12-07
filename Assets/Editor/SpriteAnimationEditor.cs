// using System;
// using System.Collections.Generic;
// using HFramework;
// using UnityEditor;
// using UnityEngine;

// [CustomEditor(typeof(SpriteAnimation))]
// public class SpriteAnimationEditor : EditorBase<SpriteAnimation>
// {
//     enum EnuAddMode
//     {
//         CoronaAdd,
//         CoronaRebuild,
//         NormalAddSpriteSheet,
//         NormalAdd
//     }

//     protected override void FnInitTarget()
//     {
//         base.FnInitTarget();
//         curAnim = null;
//         spAllAnims = serializedObject.FindProperty("listAllAnims");
//         spAutoPlay = serializedObject.FindProperty("AutoPlay");
//         size = spAllAnims.arraySize;
//         EditorApplication.update -= FnOnUpdate;
//         EditorApplication.update += FnOnUpdate;
//         // Debug.Log("set anim null " + (curAnim == null));
//     }

//     public override void OnInspectorGUI()
//     {
//         // base.OnInspectorGUI();
//         serializedObject.Update();
//         if (tg.listAllAnims.Count == 0)
//         {
//             FnShowAddAnim();
//         }
//         else
//         {
//             FnShowAnim();
//         }
//         serializedObject.ApplyModifiedProperties();
//     }

//     #region  Add Animation
//     private Texture2D tex2D;
//     private bool isRebuildTex;
//     private string pathNewTex = "";
//     private void FnShowAddAnim()
//     {
//         FnShowAddAnim("Unity Add SpriteSheet", "正常根据Unity spriteSheet 生成", EnuAddMode.NormalAddSpriteSheet);
//         // FnShowAddAnim("Corona Add SpriteSheet", "直接从Lua文件读取sprite信息生成spriteSheet", EnuAddMode.CoronaAdd);
//         // FnShowAddAnim("Corona Rebuild SpriteSheet", "读取Lua文件重新生成spriteSheet,通常在源文件的png不为2的幂次时使用", EnuAddMode.CoronaRebuild);
//         if (FnAddButton("普通添加", 100))
//         {
//             AnimInfo info = new AnimInfo();
//             tg.listAllAnims.Add(info);
//             EditorUtility.SetDirty(tg.gameObject);
//             size = tg.listAllAnims.Count;
//         }
//     }

//     private void FnShowAddAnim(string _name, string _toolTips, EnuAddMode _mode)
//     {
//         FnBeginHorizontal();
//         EditorGUI.BeginChangeCheck();
//         tex2D = EditorGUILayout.ObjectField(new GUIContent(_name, _toolTips), tex2D, typeof(Texture2D), true) as Texture2D;
//         string texPath = AssetDatabase.GetAssetPath(tex2D);
//         if (EditorGUI.EndChangeCheck())
//         {
//             if (tex2D != null)
//             {
//                 switch (_mode)
//                 {
//                     // case EnuAddMode.CoronaAdd:
//                     //     SpriteSheetCreator.FnGenSpriteSheetFromLua(tex2D, () => { FnAddAnim(texPath); });
//                     //     break;
//                     // case EnuAddMode.CoronaRebuild:
//                     //     SpriteSheetCreator.FnReGenSpriteSheetFromLua(tex2D, false, (x) => { pathNewTex = x; });
//                     //     break;
//                     case EnuAddMode.NormalAddSpriteSheet:
//                         FnAddAnim(texPath);
//                         break;
//                 }
//             }
//         }
//         if (!string.IsNullOrEmpty(pathNewTex))
//         {
//             // FnAddAnim(EditorUtil.FnGetRelativeAssetsPath(pathNewTex));
//             pathNewTex = "";

//         }
//         FnEndHorizontal();
//     }

//     private void FnAddAnim(string _path)
//     {
//         var obj = AssetDatabase.LoadAllAssetsAtPath(_path);
//         List<Sprite> listSprites = new List<Sprite>();
//         for (int i = 0; i < obj.Length; i++)
//         {
//             if (obj[i].GetType().Equals(typeof(Sprite)))
//             {
//                 listSprites.Add(obj[i] as Sprite);
//             }
//         }

//         if (listSprites.Count > 0)
//         {
//             tg.img.sprite = listSprites[0];
//             // tg.img.SetNativeSize();

//             AnimInfo info = new AnimInfo();
//             info.sprites = listSprites.ToArray();
//             tg.listAllAnims.Add(info);

//             EditorUtility.SetDirty(tg.gameObject);
//             size = tg.listAllAnims.Count;

//         }

//         tex2D = null;
//     }
//     #endregion

//     #region  Show Animation
//     private List<string> listAnimNames = new List<string>();
//     private int size;
//     SerializedProperty spAllAnims;
//     SerializedProperty spAutoPlay;
//     SerializedProperty spUnit;
//     private bool isShowAddAnim;
//     private void FnShowAnim()
//     {
//         EditorGUILayout.PropertyField(spAutoPlay);
//         FnBeginHorizontal();
//         listAnimNames.Clear();
//         for (int i = 0; i < tg.listAllAnims.Count; i++)
//         {
//             listAnimNames.Add(string.IsNullOrEmpty(tg.listAllAnims[i].name) ? i.ToString() : tg.listAllAnims[i].name);
//         }
//         EditorGUI.BeginChangeCheck();
//         tg.defaultAnim = EditorGUILayout.Popup(new GUIContent("defaultAnim", "默认播放动画索引"), tg.defaultAnim, listAnimNames.ToArray(), GUILayout.Width(200));
//         if (EditorGUI.EndChangeCheck())
//         {
//             EditorUtility.SetDirty(tg.gameObject);
//         }
//         FnEndHorizontal();

//         size = EditorGUILayout.IntField("Size", size);
//         Event e = Event.current;
//         if (e.keyCode == KeyCode.Return || e.keyCode == KeyCode.KeypadEnter)
//         {
//             if (size != spAllAnims.arraySize)
//                 spAllAnims.arraySize = size;
//         }
//         for (int i = 0; i < spAllAnims.arraySize; i++)
//         {
//             spUnit = spAllAnims.GetArrayElementAtIndex(i);
//             FnBeginHorizontal(1);
//             EditorGUILayout.PropertyField(spUnit.FindPropertyRelative("name"), new GUIContent(i + "_Name", "动画名,为空时则为动画索引值"));
//             FnEndHorizontal();

//             FnBeginHorizontal(3);
//             EditorGUILayout.PropertyField(spUnit.FindPropertyRelative("loopCycles"), new GUIContent("LoopCycles", "播放次数，-1时无限循环播放"));
//             FnEndHorizontal();
//             FnBeginHorizontal(3);
//             EditorGUI.BeginChangeCheck();
//             EditorGUILayout.PropertyField(spUnit.FindPropertyRelative("animTime"), new GUIContent("AnimTime", "动画播放总时间"));
//             if (EditorGUI.EndChangeCheck())
//             {
//                 FnCalculateTimeGap();
//             }
//             FnEndHorizontal();
//             FnBeginHorizontal(3);
//             EditorGUILayout.PropertyField(spUnit.FindPropertyRelative("isRealTime"), new GUIContent("IsRealTime", "是否为RealTime,不勾选时会受TimeScale 影响"));
//             FnEndHorizontal();
//             FnBeginHorizontal(3);
//             EditorGUILayout.PropertyField(spUnit.FindPropertyRelative("sprites"), new GUIContent("Sprites", "动画帧"));
//             FnEndHorizontal();
//             FnBeginHorizontal(3);
//             EditorGUILayout.PropertyField(spUnit.FindPropertyRelative("onAnimEnd"), new GUIContent("onAnimEnd", "动画播放结束后操作"));
//             FnEndHorizontal();
//             FnBeginHorizontal(3);
//             if (curAnim != null && curAnim.Equals(tg.listAllAnims[i]))
//             {
//                 if (FnAddButton("暂停", 50))
//                 {
//                     tg.img.sprite = defaultSpr;
//                     isPlayingAnim = false;
//                     curAnim = null;
//                 }
//             }
//             else
//             {
//                 if (FnAddButton("播放", 50))
//                 {
//                     isPlayingAnim = true;
//                     curAnim = tg.listAllAnims[i];
//                     if (curAnim.sprites.Length >= 2)
//                     {
//                         defaultSpr = tg.img.sprite;
//                         curTime = 0;
//                         frameIndex = 0;
//                         FnCalculateTimeGap();
//                         FnPlayFirstFrame();
//                     }
//                     else
//                     {
//                         curAnim = null;
//                     }
//                 }
//             }

//             FnEndHorizontal();
//         }

//         isShowAddAnim = EditorGUILayout.BeginFoldoutHeaderGroup(isShowAddAnim, "显示添加动画:");
//         if (isShowAddAnim)
//         {
//             FnShowAddAnim();
//         }
//     }
//     #endregion

//     #region Play Animation
//     private bool isPlayingAnim = false;
//     private AnimInfo curAnim = null;
//     private int frameIndex;
//     private float timeGap;
//     private float curTime;
//     private Sprite defaultSpr;
//     private float lastRealTime;
//     private void FnOnUpdate()
//     {
//         if (!Application.isPlaying)
//         {
//             if (isPlayingAnim && curAnim != null)
//             {
//                 // Debug.Log("anim is not null ..." + isPlayingAnim);
//                 curTime += (Time.realtimeSinceStartup - lastRealTime);//Time.deltaTime;
//                 lastRealTime = Time.realtimeSinceStartup;
//                 if (curTime >= timeGap)
//                 {
//                     curTime = curTime - timeGap;
//                     if (frameIndex < curAnim.sprites.Length - 1)
//                     {
//                         frameIndex++;
//                         FnShowSprite(frameIndex);
//                     }
//                     else
//                     {
//                         FnPlayFirstFrame();
//                     }
//                 }
//             }
//         }
//     }

//     private void FnPlayFirstFrame()
//     {
//         lastRealTime = Time.realtimeSinceStartup;
//         curTime = 0;
//         frameIndex = 0;
//         FnCalculateTimeGap();
//         FnShowSprite(0);
//     }

//     private void FnShowSprite(int _idx)
//     {
//         tg.img.sprite = curAnim.sprites[_idx];
//         EditorUtility.SetDirty(tg.gameObject);
//         // tg.img.SetNativeSize();
//     }

//     private void FnCalculateTimeGap()
//     {
//         if (curAnim != null)
//         {
//             timeGap = curAnim.animTime / curAnim.sprites.Length;
//         }
//     }
//     #endregion

//     /// <summary>
//     /// This function is called when the behaviour becomes disabled or inactive.
//     /// </summary>
//     void OnDisable()
//     {
//         if (!Application.isPlaying)
//         {
//             // Debug.Log("On disable .....");
//             if (isPlayingAnim)
//             {
//                 tg.img.sprite = defaultSpr;
//                 // tg.img.SetNativeSize();
//                 isPlayingAnim = false;
//                 curAnim = null;
//             }
//         }
//     }
// }
