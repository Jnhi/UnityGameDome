using System;

namespace PuertsStaticWrap
{
    public static class AutoStaticCodeRegister
    {
        public static void Register(Puerts.JsEnv jsEnv)
        {
            jsEnv.AddLazyStaticWrapLoader(typeof(UnityEngine.Debug), UnityEngine_Debug_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(UnityEngine.Vector3), UnityEngine_Vector3_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(UnityEngine.Vector2), UnityEngine_Vector2_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(System.Collections.Generic.List<int>), System_Collections_Generic_List_1_System_Int32__Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(UnityEngine.Time), UnityEngine_Time_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(UnityEngine.Transform), UnityEngine_Transform_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(UnityEngine.Component), UnityEngine_Component_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(UnityEngine.GameObject), UnityEngine_GameObject_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(UnityEngine.Object), UnityEngine_Object_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(System.Delegate), System_Delegate_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(System.Object), System_Object_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(UnityEngine.ParticleSystem), UnityEngine_ParticleSystem_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(UnityEngine.Canvas), UnityEngine_Canvas_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(UnityEngine.Behaviour), UnityEngine_Behaviour_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(UnityEngine.MonoBehaviour), UnityEngine_MonoBehaviour_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(UnityEngine.EventSystems.UIBehaviour), UnityEngine_EventSystems_UIBehaviour_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(UnityEngine.UI.Selectable), UnityEngine_UI_Selectable_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(UnityEngine.UI.RawImage), UnityEngine_UI_RawImage_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(UnityEngine.UI.Button), UnityEngine_UI_Button_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(UnityEngine.UI.Button.ButtonClickedEvent), UnityEngine_UI_Button_ButtonClickedEvent_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(UnityEngine.Events.UnityEvent), UnityEngine_Events_UnityEvent_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(UnityEngine.UI.InputField), UnityEngine_UI_InputField_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(UnityEngine.UI.Toggle), UnityEngine_UI_Toggle_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(UnityEngine.UI.Toggle.ToggleEvent), UnityEngine_UI_Toggle_ToggleEvent_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(UnityEngine.Events.UnityEvent<bool>), UnityEngine_Events_UnityEvent_1_System_Boolean__Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(UnityEngine.Application), UnityEngine_Application_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(UnityEngine.TextAsset), UnityEngine_TextAsset_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(UnityEngine.SceneManagement.SceneManager), UnityEngine_SceneManagement_SceneManager_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(UnityEngine.SceneManagement.Scene), UnityEngine_SceneManagement_Scene_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(UnityEngine.ResourceManagement.ResourceProviders.SceneInstance), UnityEngine_ResourceManagement_ResourceProviders_SceneInstance_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(UnityEngine.AsyncOperation), UnityEngine_AsyncOperation_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(HFramework.ResManager), HFramework_ResManager_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(JsManager), JsManager_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(MonoSingleton<JsManager>), MonoSingleton_1_JsManager__Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.BlendModeUtils), FairyGUI_BlendModeUtils_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.CaptureCamera), FairyGUI_CaptureCamera_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.Container), FairyGUI_Container_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.DisplayObject), FairyGUI_DisplayObject_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.DisplayObjectInfo), FairyGUI_DisplayObjectInfo_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.GoWrapper), FairyGUI_GoWrapper_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.ColliderHitTest), FairyGUI_ColliderHitTest_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.HitTestContext), FairyGUI_HitTestContext_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.IHitTest), FairyGUI_IHitTest_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.MeshColliderHitTest), FairyGUI_MeshColliderHitTest_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.PixelHitTestData), FairyGUI_PixelHitTestData_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.PixelHitTest), FairyGUI_PixelHitTest_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.RectHitTest), FairyGUI_RectHitTest_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.ShapeHitTest), FairyGUI_ShapeHitTest_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.Image), FairyGUI_Image_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.MaterialManager), FairyGUI_MaterialManager_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.CompositeMesh), FairyGUI_CompositeMesh_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.EllipseMesh), FairyGUI_EllipseMesh_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.FillMesh), FairyGUI_FillMesh_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.LineMesh), FairyGUI_LineMesh_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.IMeshFactory), FairyGUI_IMeshFactory_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.PlaneMesh), FairyGUI_PlaneMesh_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.PolygonMesh), FairyGUI_PolygonMesh_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.RectMesh), FairyGUI_RectMesh_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.RegularPolygonMesh), FairyGUI_RegularPolygonMesh_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.RoundedRectMesh), FairyGUI_RoundedRectMesh_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.StraightLineMesh), FairyGUI_StraightLineMesh_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.VertexBuffer), FairyGUI_VertexBuffer_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.MovieClip), FairyGUI_MovieClip_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.NAudioClip), FairyGUI_NAudioClip_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.NGraphics), FairyGUI_NGraphics_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.NTexture), FairyGUI_NTexture_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.ShaderConfig), FairyGUI_ShaderConfig_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.Shape), FairyGUI_Shape_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.Stage), FairyGUI_Stage_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.StageCamera), FairyGUI_StageCamera_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.StageEngine), FairyGUI_StageEngine_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.Stats), FairyGUI_Stats_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.BaseFont), FairyGUI_BaseFont_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.BitmapFont), FairyGUI_BitmapFont_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.DynamicFont), FairyGUI_DynamicFont_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.Emoji), FairyGUI_Emoji_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.FontManager), FairyGUI_FontManager_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.IKeyboard), FairyGUI_IKeyboard_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.InputTextField), FairyGUI_InputTextField_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.RichTextField), FairyGUI_RichTextField_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.RTLSupport), FairyGUI_RTLSupport_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.SelectionShape), FairyGUI_SelectionShape_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.TextField), FairyGUI_TextField_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.TextFormat), FairyGUI_TextFormat_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.TouchScreenKeyboard), FairyGUI_TouchScreenKeyboard_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.TypingEffect), FairyGUI_TypingEffect_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.UpdateContext), FairyGUI_UpdateContext_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.EventContext), FairyGUI_EventContext_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.EventDispatcher), FairyGUI_EventDispatcher_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.EventListener), FairyGUI_EventListener_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.IEventDispatcher), FairyGUI_IEventDispatcher_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.InputEvent), FairyGUI_InputEvent_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.BlurFilter), FairyGUI_BlurFilter_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.ColorFilter), FairyGUI_ColorFilter_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.IFilter), FairyGUI_IFilter_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.LongPressGesture), FairyGUI_LongPressGesture_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.PinchGesture), FairyGUI_PinchGesture_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.RotationGesture), FairyGUI_RotationGesture_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.SwipeGesture), FairyGUI_SwipeGesture_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.EaseManager), FairyGUI_EaseManager_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.CustomEase), FairyGUI_CustomEase_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.GPathPoint), FairyGUI_GPathPoint_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.GPath), FairyGUI_GPath_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.GTween), FairyGUI_GTween_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.ITweenListener), FairyGUI_ITweenListener_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.GTweener), FairyGUI_GTweener_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.TweenValue), FairyGUI_TweenValue_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.ChangePageAction), FairyGUI_ChangePageAction_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.ControllerAction), FairyGUI_ControllerAction_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.PlayTransitionAction), FairyGUI_PlayTransitionAction_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.AsyncCreationHelper), FairyGUI_AsyncCreationHelper_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.Controller), FairyGUI_Controller_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.DragDropManager), FairyGUI_DragDropManager_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.EMRenderTarget), FairyGUI_EMRenderTarget_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.EMRenderSupport), FairyGUI_EMRenderSupport_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.GButton), FairyGUI_GButton_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.GComboBox), FairyGUI_GComboBox_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.GComponent), FairyGUI_GComponent_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.GearAnimation), FairyGUI_GearAnimation_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.GearBase), FairyGUI_GearBase_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.GearTweenConfig), FairyGUI_GearTweenConfig_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.GearColor), FairyGUI_GearColor_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.GearDisplay), FairyGUI_GearDisplay_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.GearDisplay2), FairyGUI_GearDisplay2_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.GearFontSize), FairyGUI_GearFontSize_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.GearIcon), FairyGUI_GearIcon_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.GearLook), FairyGUI_GearLook_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.GearSize), FairyGUI_GearSize_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.GearText), FairyGUI_GearText_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.GearXY), FairyGUI_GearXY_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.IAnimationGear), FairyGUI_IAnimationGear_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.IColorGear), FairyGUI_IColorGear_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.ITextColorGear), FairyGUI_ITextColorGear_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.GGraph), FairyGUI_GGraph_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.GGroup), FairyGUI_GGroup_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.GImage), FairyGUI_GImage_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.GLabel), FairyGUI_GLabel_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.GList), FairyGUI_GList_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.GLoader), FairyGUI_GLoader_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.GLoader3D), FairyGUI_GLoader3D_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.GMovieClip), FairyGUI_GMovieClip_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.GObject), FairyGUI_GObject_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.GObjectPool), FairyGUI_GObjectPool_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.GProgressBar), FairyGUI_GProgressBar_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.GRichTextField), FairyGUI_GRichTextField_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.GRoot), FairyGUI_GRoot_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.GScrollBar), FairyGUI_GScrollBar_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.GSlider), FairyGUI_GSlider_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.GTextField), FairyGUI_GTextField_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.GTextInput), FairyGUI_GTextInput_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.GTree), FairyGUI_GTree_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.GTreeNode), FairyGUI_GTreeNode_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.IUISource), FairyGUI_IUISource_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.Margin), FairyGUI_Margin_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.PackageItem), FairyGUI_PackageItem_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.PopupMenu), FairyGUI_PopupMenu_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.Relations), FairyGUI_Relations_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.ScrollPane), FairyGUI_ScrollPane_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.Transition), FairyGUI_Transition_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.TranslationHelper), FairyGUI_TranslationHelper_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.TreeNode), FairyGUI_TreeNode_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.TreeView), FairyGUI_TreeView_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.UIConfig), FairyGUI_UIConfig_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.UIContentScaler), FairyGUI_UIContentScaler_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.UIObjectFactory), FairyGUI_UIObjectFactory_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.UIPackage), FairyGUI_UIPackage_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.UIPainter), FairyGUI_UIPainter_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.UIPanel), FairyGUI_UIPanel_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.Window), FairyGUI_Window_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.Timers), FairyGUI_Timers_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.Utils.ByteBuffer), FairyGUI_Utils_ByteBuffer_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.Utils.HtmlButton), FairyGUI_Utils_HtmlButton_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.Utils.HtmlElement), FairyGUI_Utils_HtmlElement_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.Utils.HtmlImage), FairyGUI_Utils_HtmlImage_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.Utils.HtmlInput), FairyGUI_Utils_HtmlInput_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.Utils.HtmlLink), FairyGUI_Utils_HtmlLink_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.Utils.HtmlPageContext), FairyGUI_Utils_HtmlPageContext_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.Utils.HtmlParseOptions), FairyGUI_Utils_HtmlParseOptions_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.Utils.HtmlParser), FairyGUI_Utils_HtmlParser_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.Utils.HtmlSelect), FairyGUI_Utils_HtmlSelect_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.Utils.IHtmlObject), FairyGUI_Utils_IHtmlObject_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.Utils.IHtmlPageContext), FairyGUI_Utils_IHtmlPageContext_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.Utils.ToolSet), FairyGUI_Utils_ToolSet_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.Utils.UBBParser), FairyGUI_Utils_UBBParser_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.Utils.XML), FairyGUI_Utils_XML_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.Utils.XMLIterator), FairyGUI_Utils_XMLIterator_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.Utils.XMLList), FairyGUI_Utils_XMLList_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.Utils.XMLUtils), FairyGUI_Utils_XMLUtils_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.Utils.ZipReader), FairyGUI_Utils_ZipReader_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.BlendModeUtils.BlendFactor), FairyGUI_BlendModeUtils_BlendFactor_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.MovieClip.Frame), FairyGUI_MovieClip_Frame_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.NGraphics.VertexMatrix), FairyGUI_NGraphics_VertexMatrix_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.BitmapFont.BMGlyph), FairyGUI_BitmapFont_BMGlyph_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.TextField.LineInfo), FairyGUI_TextField_LineInfo_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.TextField.LineCharInfo), FairyGUI_TextField_LineCharInfo_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.TextField.CharPosition), FairyGUI_TextField_CharPosition_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.UpdateContext.ClipInfo), FairyGUI_UpdateContext_ClipInfo_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.UIConfig.ConfigValue), FairyGUI_UIConfig_ConfigValue_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.Utils.XMLList.Enumerator), FairyGUI_Utils_XMLList_Enumerator_Wrap.GetRegisterInfo);
                
                
            jsEnv.AddLazyStaticWrapLoader(typeof(FairyGUI.Utils.ZipReader.ZipEntry), FairyGUI_Utils_ZipReader_ZipEntry_Wrap.GetRegisterInfo);
                
                
        }
    }
}