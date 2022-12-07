
using System;
using Puerts;

namespace PuertsStaticWrap
{
    public static class FairyGUI_EaseManager_Wrap 
    {
    
    
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8ConstructorCallback))]
        private static IntPtr Constructor(IntPtr isolate, IntPtr info, int paramLen, long data)
        {
            try
            {


                Puerts.PuertsDLL.ThrowException(isolate, "invalid arguments to " + typeof(FairyGUI.EaseManager).GetFriendlyName() + " constructor");

            } catch (Exception e) {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
            return IntPtr.Zero;
        }
    // ==================== constructor end ====================

    // ==================== methods start ====================

        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void F_Evaluate(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                
        
        
                if (paramLen == 6)
            
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
                
                    IntPtr v8Value3 = PuertsDLL.GetArgumentValue(info, 3);
                    object argobj3 = null;
                    JsValueType argType3 = JsValueType.Invalid;
                
                    IntPtr v8Value4 = PuertsDLL.GetArgumentValue(info, 4);
                    object argobj4 = null;
                    JsValueType argType4 = JsValueType.Invalid;
                
                    IntPtr v8Value5 = PuertsDLL.GetArgumentValue(info, 5);
                    object argobj5 = null;
                    JsValueType argType5 = JsValueType.Invalid;
                
                
                    
                    if (ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.Number, typeof(FairyGUI.EaseType), false, false, v8Value0, ref argobj0, ref argType0) && ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.Number, typeof(float), false, false, v8Value1, ref argobj1, ref argType1) && ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.Number, typeof(float), false, false, v8Value2, ref argobj2, ref argType2) && ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.Number, typeof(float), false, false, v8Value3, ref argobj3, ref argType3) && ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.Number, typeof(float), false, false, v8Value4, ref argobj4, ref argType4) && ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.NullOrUndefined | Puerts.JsValueType.NativeObject, typeof(FairyGUI.CustomEase), false, false, v8Value5, ref argobj5, ref argType5))
                    
                    {
                    
                        FairyGUI.EaseType arg0 = (FairyGUI.EaseType)StaticTranslate<int>.Get((int)data, isolate, Puerts.NativeValueApi.GetValueFromArgument, v8Value0, false);
                    
                        float arg1 = (float)PuertsDLL.GetNumberFromValue(isolate, v8Value1, false);
                    
                        float arg2 = (float)PuertsDLL.GetNumberFromValue(isolate, v8Value2, false);
                    
                        float arg3 = (float)PuertsDLL.GetNumberFromValue(isolate, v8Value3, false);
                    
                        float arg4 = (float)PuertsDLL.GetNumberFromValue(isolate, v8Value4, false);
                    
                        argobj5 = argobj5 != null ? argobj5 : StaticTranslate<FairyGUI.CustomEase>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value5, false); FairyGUI.CustomEase arg5 = (FairyGUI.CustomEase)argobj5;
                    

                        var result = FairyGUI.EaseManager.Evaluate (arg0, arg1, arg2, arg3, arg4, arg5);

                    
                        
                    
                        
                    
                        
                    
                        
                    
                        
                    
                        
                    
                        Puerts.PuertsDLL.ReturnNumber(isolate, info, result);
                        
                        return;
                    }
                
                }
            
                if (paramLen == 5)
            
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
                
                    IntPtr v8Value3 = PuertsDLL.GetArgumentValue(info, 3);
                    object argobj3 = null;
                    JsValueType argType3 = JsValueType.Invalid;
                
                    IntPtr v8Value4 = PuertsDLL.GetArgumentValue(info, 4);
                    object argobj4 = null;
                    JsValueType argType4 = JsValueType.Invalid;
                
                
                    
                    if (ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.Number, typeof(FairyGUI.EaseType), false, false, v8Value0, ref argobj0, ref argType0) && ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.Number, typeof(float), false, false, v8Value1, ref argobj1, ref argType1) && ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.Number, typeof(float), false, false, v8Value2, ref argobj2, ref argType2) && ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.Number, typeof(float), false, false, v8Value3, ref argobj3, ref argType3) && ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.Number, typeof(float), false, false, v8Value4, ref argobj4, ref argType4))
                    
                    {
                    
                        FairyGUI.EaseType arg0 = (FairyGUI.EaseType)StaticTranslate<int>.Get((int)data, isolate, Puerts.NativeValueApi.GetValueFromArgument, v8Value0, false);
                    
                        float arg1 = (float)PuertsDLL.GetNumberFromValue(isolate, v8Value1, false);
                    
                        float arg2 = (float)PuertsDLL.GetNumberFromValue(isolate, v8Value2, false);
                    
                        float arg3 = (float)PuertsDLL.GetNumberFromValue(isolate, v8Value3, false);
                    
                        float arg4 = (float)PuertsDLL.GetNumberFromValue(isolate, v8Value4, false);
                    

                        var result = FairyGUI.EaseManager.Evaluate (arg0, arg1, arg2, arg3, arg4, default(FairyGUI.CustomEase));

                    
                        
                    
                        
                    
                        
                    
                        
                    
                        
                    
                        Puerts.PuertsDLL.ReturnNumber(isolate, info, result);
                        
                        return;
                    }
                
                }
            
                if (paramLen == 4)
            
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
                
                    IntPtr v8Value3 = PuertsDLL.GetArgumentValue(info, 3);
                    object argobj3 = null;
                    JsValueType argType3 = JsValueType.Invalid;
                
                
                    
                    if (ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.Number, typeof(FairyGUI.EaseType), false, false, v8Value0, ref argobj0, ref argType0) && ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.Number, typeof(float), false, false, v8Value1, ref argobj1, ref argType1) && ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.Number, typeof(float), false, false, v8Value2, ref argobj2, ref argType2) && ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.Number, typeof(float), false, false, v8Value3, ref argobj3, ref argType3))
                    
                    {
                    
                        FairyGUI.EaseType arg0 = (FairyGUI.EaseType)StaticTranslate<int>.Get((int)data, isolate, Puerts.NativeValueApi.GetValueFromArgument, v8Value0, false);
                    
                        float arg1 = (float)PuertsDLL.GetNumberFromValue(isolate, v8Value1, false);
                    
                        float arg2 = (float)PuertsDLL.GetNumberFromValue(isolate, v8Value2, false);
                    
                        float arg3 = (float)PuertsDLL.GetNumberFromValue(isolate, v8Value3, false);
                    

                        var result = FairyGUI.EaseManager.Evaluate (arg0, arg1, arg2, arg3, 0f, default(FairyGUI.CustomEase));

                    
                        
                    
                        
                    
                        
                    
                        
                    
                        Puerts.PuertsDLL.ReturnNumber(isolate, info, result);
                        
                        return;
                    }
                
                }
            
                if (paramLen == 3)
            
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
                
                
                    
                    if (ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.Number, typeof(FairyGUI.EaseType), false, false, v8Value0, ref argobj0, ref argType0) && ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.Number, typeof(float), false, false, v8Value1, ref argobj1, ref argType1) && ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.Number, typeof(float), false, false, v8Value2, ref argobj2, ref argType2))
                    
                    {
                    
                        FairyGUI.EaseType arg0 = (FairyGUI.EaseType)StaticTranslate<int>.Get((int)data, isolate, Puerts.NativeValueApi.GetValueFromArgument, v8Value0, false);
                    
                        float arg1 = (float)PuertsDLL.GetNumberFromValue(isolate, v8Value1, false);
                    
                        float arg2 = (float)PuertsDLL.GetNumberFromValue(isolate, v8Value2, false);
                    

                        var result = FairyGUI.EaseManager.Evaluate (arg0, arg1, arg2, 1.70158f, 0f, default(FairyGUI.CustomEase));

                    
                        
                    
                        
                    
                        
                    
                        Puerts.PuertsDLL.ReturnNumber(isolate, info, result);
                        
                        return;
                    }
                
                }
            
        
                Puerts.PuertsDLL.ThrowException(isolate, "invalid arguments to Evaluate");
        
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
                    { new Puerts.MethodKey { Name = "Evaluate", IsStatic = true}, F_Evaluate }
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
