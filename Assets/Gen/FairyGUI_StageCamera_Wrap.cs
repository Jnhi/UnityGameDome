
using System;
using Puerts;

namespace PuertsStaticWrap
{
    public static class FairyGUI_StageCamera_Wrap 
    {
    
    
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8ConstructorCallback))]
        private static IntPtr Constructor(IntPtr isolate, IntPtr info, int paramLen, long data)
        {
            try
            {

    
            
                {
                
                
                    

                    {
                    
                        var result = new FairyGUI.StageCamera();

                    

                    
                        return Puerts.Utils.GetObjectPtr((int)data, typeof(FairyGUI.StageCamera), result);
                    
                    }
                    
                }
        


            } catch (Exception e) {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
            return IntPtr.Zero;
        }
    // ==================== constructor end ====================

    // ==================== methods start ====================

        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void M_ApplyModifiedProperties(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.StageCamera;
        
        
                {
            
                
                
                    
                    {
                    

                        obj.ApplyModifiedProperties ();

                    
                        
                        
                        
                    }
                
                }
            
        
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
    
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void F_CheckMainCamera(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                
        
        
                {
            
                
                
                    
                    {
                    

                        FairyGUI.StageCamera.CheckMainCamera ();

                    
                        
                        
                        
                    }
                
                }
            
        
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
    
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void F_CheckCaptureCamera(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                
        
        
                {
            
                
                
                    
                    {
                    

                        FairyGUI.StageCamera.CheckCaptureCamera ();

                    
                        
                        
                        
                    }
                
                }
            
        
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
    
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void F_CreateCamera(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                
        
        
                {
            
                
                    IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                    object argobj0 = null;
                    JsValueType argType0 = JsValueType.Invalid;
                
                    IntPtr v8Value1 = PuertsDLL.GetArgumentValue(info, 1);
                    object argobj1 = null;
                    JsValueType argType1 = JsValueType.Invalid;
                
                
                    
                    {
                    
                        string arg0 = (string)PuertsDLL.GetStringFromValue(isolate, v8Value0, false);
                    
                        int arg1 = (int)PuertsDLL.GetNumberFromValue(isolate, v8Value1, false);
                    

                        var result = FairyGUI.StageCamera.CreateCamera (arg0, arg1);

                    
                        
                    
                        
                    
                        Puerts.ResultHelper.Set((int)data, isolate, info, result);
                        
                        
                    }
                
                }
            
        
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
    
    // ==================== methods end ====================

    // ==================== properties start ====================
    
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void G_constantSize(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.StageCamera;
                var result = obj.constantSize;
                Puerts.PuertsDLL.ReturnBoolean(isolate, info, result);
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
            
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void S_constantSize(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.StageCamera;
                IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                object argobj0 = null;
                bool arg0 = (bool)PuertsDLL.GetBooleanFromValue(isolate, v8Value0, false);
                obj.constantSize = arg0;
                
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
            
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void G_unitsPerPixel(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.StageCamera;
                var result = obj.unitsPerPixel;
                Puerts.PuertsDLL.ReturnNumber(isolate, info, result);
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
            
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void S_unitsPerPixel(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.StageCamera;
                IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                object argobj0 = null;
                float arg0 = (float)PuertsDLL.GetNumberFromValue(isolate, v8Value0, false);
                obj.unitsPerPixel = arg0;
                
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
            
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void G_cachedTransform(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.StageCamera;
                var result = obj.cachedTransform;
                Puerts.ResultHelper.Set((int)data, isolate, info, result);
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
            
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void S_cachedTransform(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.StageCamera;
                IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                object argobj0 = null;
                argobj0 = argobj0 != null ? argobj0 : StaticTranslate<UnityEngine.Transform>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value0, false); UnityEngine.Transform arg0 = (UnityEngine.Transform)argobj0;
                obj.cachedTransform = arg0;
                
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
            
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void G_cachedCamera(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.StageCamera;
                var result = obj.cachedCamera;
                Puerts.ResultHelper.Set((int)data, isolate, info, result);
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
            
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void S_cachedCamera(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.StageCamera;
                IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                object argobj0 = null;
                argobj0 = argobj0 != null ? argobj0 : StaticTranslate<UnityEngine.Camera>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value0, false); UnityEngine.Camera arg0 = (UnityEngine.Camera)argobj0;
                obj.cachedCamera = arg0;
                
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
            
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void G_main(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                
                var result = FairyGUI.StageCamera.main;
                Puerts.ResultHelper.Set((int)data, isolate, info, result);
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
            
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void S_main(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                
                IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                object argobj0 = null;
                argobj0 = argobj0 != null ? argobj0 : StaticTranslate<UnityEngine.Camera>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value0, false); UnityEngine.Camera arg0 = (UnityEngine.Camera)argobj0;
                FairyGUI.StageCamera.main = arg0;
                
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
            
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void G_screenSizeVer(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                
                var result = FairyGUI.StageCamera.screenSizeVer;
                Puerts.PuertsDLL.ReturnNumber(isolate, info, result);
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
            
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void S_screenSizeVer(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                
                IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                object argobj0 = null;
                int arg0 = (int)PuertsDLL.GetNumberFromValue(isolate, v8Value0, false);
                FairyGUI.StageCamera.screenSizeVer = arg0;
                
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
            
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void G_Name(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                
                var result = FairyGUI.StageCamera.Name;
                Puerts.PuertsDLL.ReturnString(isolate, info, result);
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
            
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void G_LayerName(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                
                var result = FairyGUI.StageCamera.LayerName;
                Puerts.PuertsDLL.ReturnString(isolate, info, result);
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
            
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void G_DefaultCameraSize(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                
                var result = FairyGUI.StageCamera.DefaultCameraSize;
                Puerts.PuertsDLL.ReturnNumber(isolate, info, result);
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
            
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void S_DefaultCameraSize(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                
                IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                object argobj0 = null;
                float arg0 = (float)PuertsDLL.GetNumberFromValue(isolate, v8Value0, false);
                FairyGUI.StageCamera.DefaultCameraSize = arg0;
                
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
            
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void G_DefaultUnitsPerPixel(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                
                var result = FairyGUI.StageCamera.DefaultUnitsPerPixel;
                Puerts.PuertsDLL.ReturnNumber(isolate, info, result);
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
            
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void S_DefaultUnitsPerPixel(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                
                IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                object argobj0 = null;
                float arg0 = (float)PuertsDLL.GetNumberFromValue(isolate, v8Value0, false);
                FairyGUI.StageCamera.DefaultUnitsPerPixel = arg0;
                
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
            
    // ==================== properties end ====================
    // ==================== array item get/set start ====================
    
    
    // ==================== array item get/set end ====================
    // ==================== operator start ====================
    
    // ==================== operator end ====================
    // ==================== events start ====================
    
    // ==================== events end ====================

        public static Puerts.TypeRegisterInfo GetRegisterInfo()
        {
            return new Puerts.TypeRegisterInfo()
            {
                BlittableCopy = false,
                Constructor = Constructor,
                Methods = new System.Collections.Generic.Dictionary<Puerts.MethodKey, Puerts.V8FunctionCallback>()
                {   
                    { new Puerts.MethodKey { Name = "ApplyModifiedProperties", IsStatic = false}, M_ApplyModifiedProperties },
                    { new Puerts.MethodKey { Name = "CheckMainCamera", IsStatic = true}, F_CheckMainCamera },
                    { new Puerts.MethodKey { Name = "CheckCaptureCamera", IsStatic = true}, F_CheckCaptureCamera },
                    { new Puerts.MethodKey { Name = "CreateCamera", IsStatic = true}, F_CreateCamera }
                },
                Properties = new System.Collections.Generic.Dictionary<string, Puerts.PropertyRegisterInfo>()
                {
                    
                    {"constantSize", new Puerts.PropertyRegisterInfo(){ IsStatic = false, Getter = G_constantSize, Setter = S_constantSize} },

                    {"unitsPerPixel", new Puerts.PropertyRegisterInfo(){ IsStatic = false, Getter = G_unitsPerPixel, Setter = S_unitsPerPixel} },

                    {"cachedTransform", new Puerts.PropertyRegisterInfo(){ IsStatic = false, Getter = G_cachedTransform, Setter = S_cachedTransform} },

                    {"cachedCamera", new Puerts.PropertyRegisterInfo(){ IsStatic = false, Getter = G_cachedCamera, Setter = S_cachedCamera} },

                    {"main", new Puerts.PropertyRegisterInfo(){ IsStatic = true, Getter = G_main, Setter = S_main} },

                    {"screenSizeVer", new Puerts.PropertyRegisterInfo(){ IsStatic = true, Getter = G_screenSizeVer, Setter = S_screenSizeVer} },

                    {"Name", new Puerts.PropertyRegisterInfo(){ IsStatic = true, Getter = G_Name, Setter = null} },

                    {"LayerName", new Puerts.PropertyRegisterInfo(){ IsStatic = true, Getter = G_LayerName, Setter = null} },

                    {"DefaultCameraSize", new Puerts.PropertyRegisterInfo(){ IsStatic = true, Getter = G_DefaultCameraSize, Setter = S_DefaultCameraSize} },

                    {"DefaultUnitsPerPixel", new Puerts.PropertyRegisterInfo(){ IsStatic = true, Getter = G_DefaultUnitsPerPixel, Setter = S_DefaultUnitsPerPixel} }
                },
                LazyMembers = new System.Collections.Generic.List<Puerts.LazyMemberRegisterInfo>()
                {   
                }
            };
        }
    
    }
}
