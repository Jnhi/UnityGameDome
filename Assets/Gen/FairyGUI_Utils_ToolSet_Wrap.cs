
using System;
using Puerts;

namespace PuertsStaticWrap
{
    public static class FairyGUI_Utils_ToolSet_Wrap 
    {
    
    
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8ConstructorCallback))]
        private static IntPtr Constructor(IntPtr isolate, IntPtr info, int paramLen, long data)
        {
            try
            {


                Puerts.PuertsDLL.ThrowException(isolate, "invalid arguments to " + typeof(FairyGUI.Utils.ToolSet).GetFriendlyName() + " constructor");

            } catch (Exception e) {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
            return IntPtr.Zero;
        }
    // ==================== constructor end ====================

    // ==================== methods start ====================

        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void F_ConvertFromHtmlColor(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                
        
        
                {
            
                
                    IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                    object argobj0 = null;
                    JsValueType argType0 = JsValueType.Invalid;
                
                
                    
                    {
                    
                        string arg0 = (string)PuertsDLL.GetStringFromValue(isolate, v8Value0, false);
                    

                        var result = FairyGUI.Utils.ToolSet.ConvertFromHtmlColor (arg0);

                    
                        
                    
                        Puerts.ResultHelper.Set((int)data, isolate, info, result);
                        
                        
                    }
                
                }
            
        
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
    
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void F_ColorFromRGB(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                
        
        
                {
            
                
                    IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                    object argobj0 = null;
                    JsValueType argType0 = JsValueType.Invalid;
                
                
                    
                    {
                    
                        int arg0 = (int)PuertsDLL.GetNumberFromValue(isolate, v8Value0, false);
                    

                        var result = FairyGUI.Utils.ToolSet.ColorFromRGB (arg0);

                    
                        
                    
                        Puerts.ResultHelper.Set((int)data, isolate, info, result);
                        
                        
                    }
                
                }
            
        
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
    
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void F_ColorFromRGBA(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                
        
        
                {
            
                
                    IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                    object argobj0 = null;
                    JsValueType argType0 = JsValueType.Invalid;
                
                
                    
                    {
                    
                        uint arg0 = (uint)PuertsDLL.GetNumberFromValue(isolate, v8Value0, false);
                    

                        var result = FairyGUI.Utils.ToolSet.ColorFromRGBA (arg0);

                    
                        
                    
                        Puerts.ResultHelper.Set((int)data, isolate, info, result);
                        
                        
                    }
                
                }
            
        
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
    
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void F_CharToHex(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                
        
        
                {
            
                
                    IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                    object argobj0 = null;
                    JsValueType argType0 = JsValueType.Invalid;
                
                
                    
                    {
                    
                        argobj0 = argobj0 != null ? argobj0 : StaticTranslate<System.Char>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value0, false); System.Char arg0 = (System.Char)argobj0;
                    

                        var result = FairyGUI.Utils.ToolSet.CharToHex (arg0);

                    
                        
                    
                        Puerts.PuertsDLL.ReturnNumber(isolate, info, result);
                        
                        
                    }
                
                }
            
        
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
    
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void F_Intersection(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
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
                    
                        argobj0 = argobj0 != null ? argobj0 : StaticTranslate<UnityEngine.Rect>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value0, true); UnityEngine.Rect arg0 = (UnityEngine.Rect)argobj0;
                    
                        argobj1 = argobj1 != null ? argobj1 : StaticTranslate<UnityEngine.Rect>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value1, true); UnityEngine.Rect arg1 = (UnityEngine.Rect)argobj1;
                    

                        var result = FairyGUI.Utils.ToolSet.Intersection (ref arg0, ref arg1);

                    
                        
                        StaticTranslate<UnityEngine.Rect>.Set((int)data, isolate, Puerts.NativeValueApi.SetValueToByRefArgument, v8Value0, arg0);
                        
                    
                        
                        StaticTranslate<UnityEngine.Rect>.Set((int)data, isolate, Puerts.NativeValueApi.SetValueToByRefArgument, v8Value1, arg1);
                        
                    
                        Puerts.ResultHelper.Set((int)data, isolate, info, result);
                        
                        
                    }
                
                }
            
        
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
    
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void F_Union(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
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
                    
                        argobj0 = argobj0 != null ? argobj0 : StaticTranslate<UnityEngine.Rect>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value0, true); UnityEngine.Rect arg0 = (UnityEngine.Rect)argobj0;
                    
                        argobj1 = argobj1 != null ? argobj1 : StaticTranslate<UnityEngine.Rect>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value1, true); UnityEngine.Rect arg1 = (UnityEngine.Rect)argobj1;
                    

                        var result = FairyGUI.Utils.ToolSet.Union (ref arg0, ref arg1);

                    
                        
                        StaticTranslate<UnityEngine.Rect>.Set((int)data, isolate, Puerts.NativeValueApi.SetValueToByRefArgument, v8Value0, arg0);
                        
                    
                        
                        StaticTranslate<UnityEngine.Rect>.Set((int)data, isolate, Puerts.NativeValueApi.SetValueToByRefArgument, v8Value1, arg1);
                        
                    
                        Puerts.ResultHelper.Set((int)data, isolate, info, result);
                        
                        
                    }
                
                }
            
        
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
    
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void F_SkewMatrix(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
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
                
                    IntPtr v8Value2 = PuertsDLL.GetArgumentValue(info, 2);
                    object argobj2 = null;
                    JsValueType argType2 = JsValueType.Invalid;
                
                
                    
                    {
                    
                        argobj0 = argobj0 != null ? argobj0 : StaticTranslate<UnityEngine.Matrix4x4>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value0, true); UnityEngine.Matrix4x4 arg0 = (UnityEngine.Matrix4x4)argobj0;
                    
                        float arg1 = (float)PuertsDLL.GetNumberFromValue(isolate, v8Value1, false);
                    
                        float arg2 = (float)PuertsDLL.GetNumberFromValue(isolate, v8Value2, false);
                    

                        FairyGUI.Utils.ToolSet.SkewMatrix (ref arg0, arg1, arg2);

                    
                        
                        StaticTranslate<UnityEngine.Matrix4x4>.Set((int)data, isolate, Puerts.NativeValueApi.SetValueToByRefArgument, v8Value0, arg0);
                        
                    
                        
                    
                        
                    
                        
                        
                        
                    }
                
                }
            
        
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
    
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void F_RotateUV(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
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
                    
                        argobj0 = argobj0 != null ? argobj0 : StaticTranslate<UnityEngine.Vector2[]>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value0, false); UnityEngine.Vector2[] arg0 = (UnityEngine.Vector2[])argobj0;
                    
                        argobj1 = argobj1 != null ? argobj1 : StaticTranslate<UnityEngine.Rect>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value1, true); UnityEngine.Rect arg1 = (UnityEngine.Rect)argobj1;
                    

                        FairyGUI.Utils.ToolSet.RotateUV (arg0, ref arg1);

                    
                        
                    
                        
                        StaticTranslate<UnityEngine.Rect>.Set((int)data, isolate, Puerts.NativeValueApi.SetValueToByRefArgument, v8Value1, arg1);
                        
                    
                        
                        
                        
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
                    { new Puerts.MethodKey { Name = "ConvertFromHtmlColor", IsStatic = true}, F_ConvertFromHtmlColor },
                    { new Puerts.MethodKey { Name = "ColorFromRGB", IsStatic = true}, F_ColorFromRGB },
                    { new Puerts.MethodKey { Name = "ColorFromRGBA", IsStatic = true}, F_ColorFromRGBA },
                    { new Puerts.MethodKey { Name = "CharToHex", IsStatic = true}, F_CharToHex },
                    { new Puerts.MethodKey { Name = "Intersection", IsStatic = true}, F_Intersection },
                    { new Puerts.MethodKey { Name = "Union", IsStatic = true}, F_Union },
                    { new Puerts.MethodKey { Name = "SkewMatrix", IsStatic = true}, F_SkewMatrix },
                    { new Puerts.MethodKey { Name = "RotateUV", IsStatic = true}, F_RotateUV }
                },
                Properties = new System.Collections.Generic.Dictionary<string, Puerts.PropertyRegisterInfo>()
                {
                    
                },
                LazyMembers = new System.Collections.Generic.List<Puerts.LazyMemberRegisterInfo>()
                {   
                }
            };
        }
    
    }
}
