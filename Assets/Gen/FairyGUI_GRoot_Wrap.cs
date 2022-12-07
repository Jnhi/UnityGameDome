
using System;
using Puerts;

namespace PuertsStaticWrap
{
    public static class FairyGUI_GRoot_Wrap 
    {
    
    
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8ConstructorCallback))]
        private static IntPtr Constructor(IntPtr isolate, IntPtr info, int paramLen, long data)
        {
            try
            {

    
            
                {
                
                
                    

                    {
                    
                        var result = new FairyGUI.GRoot();

                    

                    
                        return Puerts.Utils.GetObjectPtr((int)data, typeof(FairyGUI.GRoot), result);
                    
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
        private static void M_Dispose(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.GRoot;
        
        
                if (paramLen == 0)
            
                {
            
                
                
                    
                    {
                    

                        obj.Dispose ();

                    
                        
                        
                        return;
                    }
                
                }
            
        
                Puerts.PuertsDLL.ThrowException(isolate, "invalid arguments to Dispose");
        
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
    
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void M_SetContentScaleFactor(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.GRoot;
        
        
                if (paramLen == 2)
            
                {
            
                
                    IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                    object argobj0 = null;
                    JsValueType argType0 = JsValueType.Invalid;
                
                    IntPtr v8Value1 = PuertsDLL.GetArgumentValue(info, 1);
                    object argobj1 = null;
                    JsValueType argType1 = JsValueType.Invalid;
                
                
                    
                    if (ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.Number, typeof(int), false, false, v8Value0, ref argobj0, ref argType0) && ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.Number, typeof(int), false, false, v8Value1, ref argobj1, ref argType1))
                    
                    {
                    
                        int arg0 = (int)PuertsDLL.GetNumberFromValue(isolate, v8Value0, false);
                    
                        int arg1 = (int)PuertsDLL.GetNumberFromValue(isolate, v8Value1, false);
                    

                        obj.SetContentScaleFactor (arg0, arg1);

                    
                        
                    
                        
                    
                        
                        
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
                
                
                    
                    if (ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.Number, typeof(int), false, false, v8Value0, ref argobj0, ref argType0) && ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.Number, typeof(int), false, false, v8Value1, ref argobj1, ref argType1) && ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.Number, typeof(FairyGUI.UIContentScaler.ScreenMatchMode), false, false, v8Value2, ref argobj2, ref argType2))
                    
                    {
                    
                        int arg0 = (int)PuertsDLL.GetNumberFromValue(isolate, v8Value0, false);
                    
                        int arg1 = (int)PuertsDLL.GetNumberFromValue(isolate, v8Value1, false);
                    
                        FairyGUI.UIContentScaler.ScreenMatchMode arg2 = (FairyGUI.UIContentScaler.ScreenMatchMode)StaticTranslate<int>.Get((int)data, isolate, Puerts.NativeValueApi.GetValueFromArgument, v8Value2, false);
                    

                        obj.SetContentScaleFactor (arg0, arg1, arg2);

                    
                        
                    
                        
                    
                        
                    
                        
                        
                        return;
                    }
                
                }
            
                if (paramLen == 1)
            
                {
            
                
                    IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                    object argobj0 = null;
                    JsValueType argType0 = JsValueType.Invalid;
                
                
                    
                    if (ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.Number, typeof(float), false, false, v8Value0, ref argobj0, ref argType0))
                    
                    {
                    
                        float arg0 = (float)PuertsDLL.GetNumberFromValue(isolate, v8Value0, false);
                    

                        obj.SetContentScaleFactor (arg0);

                    
                        
                    
                        
                        
                        return;
                    }
                
                }
            
        
                Puerts.PuertsDLL.ThrowException(isolate, "invalid arguments to SetContentScaleFactor");
        
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
    
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void M_ApplyContentScaleFactor(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.GRoot;
        
        
                {
            
                
                
                    
                    {
                    

                        obj.ApplyContentScaleFactor ();

                    
                        
                        
                        
                    }
                
                }
            
        
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
    
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void M_ShowWindow(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.GRoot;
        
        
                {
            
                
                    IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                    object argobj0 = null;
                    JsValueType argType0 = JsValueType.Invalid;
                
                
                    
                    {
                    
                        argobj0 = argobj0 != null ? argobj0 : StaticTranslate<FairyGUI.Window>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value0, false); FairyGUI.Window arg0 = (FairyGUI.Window)argobj0;
                    

                        obj.ShowWindow (arg0);

                    
                        
                    
                        
                        
                        
                    }
                
                }
            
        
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
    
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void M_HideWindow(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.GRoot;
        
        
                {
            
                
                    IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                    object argobj0 = null;
                    JsValueType argType0 = JsValueType.Invalid;
                
                
                    
                    {
                    
                        argobj0 = argobj0 != null ? argobj0 : StaticTranslate<FairyGUI.Window>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value0, false); FairyGUI.Window arg0 = (FairyGUI.Window)argobj0;
                    

                        obj.HideWindow (arg0);

                    
                        
                    
                        
                        
                        
                    }
                
                }
            
        
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
    
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void M_HideWindowImmediately(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.GRoot;
        
        
                if (paramLen == 1)
            
                {
            
                
                    IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                    object argobj0 = null;
                    JsValueType argType0 = JsValueType.Invalid;
                
                
                    
                    if (ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.NullOrUndefined | Puerts.JsValueType.NativeObject, typeof(FairyGUI.Window), false, false, v8Value0, ref argobj0, ref argType0))
                    
                    {
                    
                        argobj0 = argobj0 != null ? argobj0 : StaticTranslate<FairyGUI.Window>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value0, false); FairyGUI.Window arg0 = (FairyGUI.Window)argobj0;
                    

                        obj.HideWindowImmediately (arg0);

                    
                        
                    
                        
                        
                        return;
                    }
                
                }
            
                if (paramLen == 2)
            
                {
            
                
                    IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                    object argobj0 = null;
                    JsValueType argType0 = JsValueType.Invalid;
                
                    IntPtr v8Value1 = PuertsDLL.GetArgumentValue(info, 1);
                    object argobj1 = null;
                    JsValueType argType1 = JsValueType.Invalid;
                
                
                    
                    if (ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.NullOrUndefined | Puerts.JsValueType.NativeObject, typeof(FairyGUI.Window), false, false, v8Value0, ref argobj0, ref argType0) && ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.Boolean, typeof(bool), false, false, v8Value1, ref argobj1, ref argType1))
                    
                    {
                    
                        argobj0 = argobj0 != null ? argobj0 : StaticTranslate<FairyGUI.Window>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value0, false); FairyGUI.Window arg0 = (FairyGUI.Window)argobj0;
                    
                        bool arg1 = (bool)PuertsDLL.GetBooleanFromValue(isolate, v8Value1, false);
                    

                        obj.HideWindowImmediately (arg0, arg1);

                    
                        
                    
                        
                    
                        
                        
                        return;
                    }
                
                }
            
        
                Puerts.PuertsDLL.ThrowException(isolate, "invalid arguments to HideWindowImmediately");
        
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
    
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void M_BringToFront(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.GRoot;
        
        
                {
            
                
                    IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                    object argobj0 = null;
                    JsValueType argType0 = JsValueType.Invalid;
                
                
                    
                    {
                    
                        argobj0 = argobj0 != null ? argobj0 : StaticTranslate<FairyGUI.Window>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value0, false); FairyGUI.Window arg0 = (FairyGUI.Window)argobj0;
                    

                        obj.BringToFront (arg0);

                    
                        
                    
                        
                        
                        
                    }
                
                }
            
        
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
    
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void M_ShowModalWait(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.GRoot;
        
        
                {
            
                
                
                    
                    {
                    

                        obj.ShowModalWait ();

                    
                        
                        
                        
                    }
                
                }
            
        
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
    
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void M_CloseModalWait(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.GRoot;
        
        
                {
            
                
                
                    
                    {
                    

                        obj.CloseModalWait ();

                    
                        
                        
                        
                    }
                
                }
            
        
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
    
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void M_CloseAllExceptModals(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.GRoot;
        
        
                {
            
                
                
                    
                    {
                    

                        obj.CloseAllExceptModals ();

                    
                        
                        
                        
                    }
                
                }
            
        
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
    
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void M_CloseAllWindows(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.GRoot;
        
        
                {
            
                
                
                    
                    {
                    

                        obj.CloseAllWindows ();

                    
                        
                        
                        
                    }
                
                }
            
        
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
    
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void M_GetTopWindow(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.GRoot;
        
        
                {
            
                
                
                    
                    {
                    

                        var result = obj.GetTopWindow ();

                    
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
        private static void M_DisplayObjectToGObject(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.GRoot;
        
        
                {
            
                
                    IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                    object argobj0 = null;
                    JsValueType argType0 = JsValueType.Invalid;
                
                
                    
                    {
                    
                        argobj0 = argobj0 != null ? argobj0 : StaticTranslate<FairyGUI.DisplayObject>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value0, false); FairyGUI.DisplayObject arg0 = (FairyGUI.DisplayObject)argobj0;
                    

                        var result = obj.DisplayObjectToGObject (arg0);

                    
                        
                    
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
        private static void M_ShowPopup(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.GRoot;
        
        
                if (paramLen == 1)
            
                {
            
                
                    IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                    object argobj0 = null;
                    JsValueType argType0 = JsValueType.Invalid;
                
                
                    
                    if (ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.NullOrUndefined | Puerts.JsValueType.NativeObject, typeof(FairyGUI.GObject), false, false, v8Value0, ref argobj0, ref argType0))
                    
                    {
                    
                        argobj0 = argobj0 != null ? argobj0 : StaticTranslate<FairyGUI.GObject>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value0, false); FairyGUI.GObject arg0 = (FairyGUI.GObject)argobj0;
                    

                        obj.ShowPopup (arg0);

                    
                        
                    
                        
                        
                        return;
                    }
                
                }
            
                if (paramLen == 2)
            
                {
            
                
                    IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                    object argobj0 = null;
                    JsValueType argType0 = JsValueType.Invalid;
                
                    IntPtr v8Value1 = PuertsDLL.GetArgumentValue(info, 1);
                    object argobj1 = null;
                    JsValueType argType1 = JsValueType.Invalid;
                
                
                    
                    if (ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.NullOrUndefined | Puerts.JsValueType.NativeObject, typeof(FairyGUI.GObject), false, false, v8Value0, ref argobj0, ref argType0) && ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.NullOrUndefined | Puerts.JsValueType.NativeObject, typeof(FairyGUI.GObject), false, false, v8Value1, ref argobj1, ref argType1))
                    
                    {
                    
                        argobj0 = argobj0 != null ? argobj0 : StaticTranslate<FairyGUI.GObject>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value0, false); FairyGUI.GObject arg0 = (FairyGUI.GObject)argobj0;
                    
                        argobj1 = argobj1 != null ? argobj1 : StaticTranslate<FairyGUI.GObject>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value1, false); FairyGUI.GObject arg1 = (FairyGUI.GObject)argobj1;
                    

                        obj.ShowPopup (arg0, arg1);

                    
                        
                    
                        
                    
                        
                        
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
                
                
                    
                    if (ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.NullOrUndefined | Puerts.JsValueType.NativeObject, typeof(FairyGUI.GObject), false, false, v8Value0, ref argobj0, ref argType0) && ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.NullOrUndefined | Puerts.JsValueType.NativeObject, typeof(FairyGUI.GObject), false, false, v8Value1, ref argobj1, ref argType1) && ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.Number, typeof(FairyGUI.PopupDirection), false, false, v8Value2, ref argobj2, ref argType2))
                    
                    {
                    
                        argobj0 = argobj0 != null ? argobj0 : StaticTranslate<FairyGUI.GObject>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value0, false); FairyGUI.GObject arg0 = (FairyGUI.GObject)argobj0;
                    
                        argobj1 = argobj1 != null ? argobj1 : StaticTranslate<FairyGUI.GObject>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value1, false); FairyGUI.GObject arg1 = (FairyGUI.GObject)argobj1;
                    
                        FairyGUI.PopupDirection arg2 = (FairyGUI.PopupDirection)StaticTranslate<int>.Get((int)data, isolate, Puerts.NativeValueApi.GetValueFromArgument, v8Value2, false);
                    

                        obj.ShowPopup (arg0, arg1, arg2);

                    
                        
                    
                        
                    
                        
                    
                        
                        
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
                
                
                    
                    if (ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.NullOrUndefined | Puerts.JsValueType.NativeObject, typeof(FairyGUI.GObject), false, false, v8Value0, ref argobj0, ref argType0) && ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.NullOrUndefined | Puerts.JsValueType.NativeObject, typeof(FairyGUI.GObject), false, false, v8Value1, ref argobj1, ref argType1) && ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.Number, typeof(FairyGUI.PopupDirection), false, false, v8Value2, ref argobj2, ref argType2) && ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.Boolean, typeof(bool), false, false, v8Value3, ref argobj3, ref argType3))
                    
                    {
                    
                        argobj0 = argobj0 != null ? argobj0 : StaticTranslate<FairyGUI.GObject>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value0, false); FairyGUI.GObject arg0 = (FairyGUI.GObject)argobj0;
                    
                        argobj1 = argobj1 != null ? argobj1 : StaticTranslate<FairyGUI.GObject>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value1, false); FairyGUI.GObject arg1 = (FairyGUI.GObject)argobj1;
                    
                        FairyGUI.PopupDirection arg2 = (FairyGUI.PopupDirection)StaticTranslate<int>.Get((int)data, isolate, Puerts.NativeValueApi.GetValueFromArgument, v8Value2, false);
                    
                        bool arg3 = (bool)PuertsDLL.GetBooleanFromValue(isolate, v8Value3, false);
                    

                        obj.ShowPopup (arg0, arg1, arg2, arg3);

                    
                        
                    
                        
                    
                        
                    
                        
                    
                        
                        
                        return;
                    }
                
                }
            
        
                Puerts.PuertsDLL.ThrowException(isolate, "invalid arguments to ShowPopup");
        
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
    
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void M_GetPoupPosition(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.GRoot;
        
        
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
                    
                        argobj0 = argobj0 != null ? argobj0 : StaticTranslate<FairyGUI.GObject>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value0, false); FairyGUI.GObject arg0 = (FairyGUI.GObject)argobj0;
                    
                        argobj1 = argobj1 != null ? argobj1 : StaticTranslate<FairyGUI.GObject>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value1, false); FairyGUI.GObject arg1 = (FairyGUI.GObject)argobj1;
                    
                        FairyGUI.PopupDirection arg2 = (FairyGUI.PopupDirection)StaticTranslate<int>.Get((int)data, isolate, Puerts.NativeValueApi.GetValueFromArgument, v8Value2, false);
                    

                        var result = obj.GetPoupPosition (arg0, arg1, arg2);

                    
                        
                    
                        
                    
                        
                    
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
        private static void M_TogglePopup(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.GRoot;
        
        
                if (paramLen == 1)
            
                {
            
                
                    IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                    object argobj0 = null;
                    JsValueType argType0 = JsValueType.Invalid;
                
                
                    
                    if (ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.NullOrUndefined | Puerts.JsValueType.NativeObject, typeof(FairyGUI.GObject), false, false, v8Value0, ref argobj0, ref argType0))
                    
                    {
                    
                        argobj0 = argobj0 != null ? argobj0 : StaticTranslate<FairyGUI.GObject>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value0, false); FairyGUI.GObject arg0 = (FairyGUI.GObject)argobj0;
                    

                        obj.TogglePopup (arg0);

                    
                        
                    
                        
                        
                        return;
                    }
                
                }
            
                if (paramLen == 2)
            
                {
            
                
                    IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                    object argobj0 = null;
                    JsValueType argType0 = JsValueType.Invalid;
                
                    IntPtr v8Value1 = PuertsDLL.GetArgumentValue(info, 1);
                    object argobj1 = null;
                    JsValueType argType1 = JsValueType.Invalid;
                
                
                    
                    if (ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.NullOrUndefined | Puerts.JsValueType.NativeObject, typeof(FairyGUI.GObject), false, false, v8Value0, ref argobj0, ref argType0) && ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.NullOrUndefined | Puerts.JsValueType.NativeObject, typeof(FairyGUI.GObject), false, false, v8Value1, ref argobj1, ref argType1))
                    
                    {
                    
                        argobj0 = argobj0 != null ? argobj0 : StaticTranslate<FairyGUI.GObject>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value0, false); FairyGUI.GObject arg0 = (FairyGUI.GObject)argobj0;
                    
                        argobj1 = argobj1 != null ? argobj1 : StaticTranslate<FairyGUI.GObject>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value1, false); FairyGUI.GObject arg1 = (FairyGUI.GObject)argobj1;
                    

                        obj.TogglePopup (arg0, arg1);

                    
                        
                    
                        
                    
                        
                        
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
                
                
                    
                    if (ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.NullOrUndefined | Puerts.JsValueType.NativeObject, typeof(FairyGUI.GObject), false, false, v8Value0, ref argobj0, ref argType0) && ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.NullOrUndefined | Puerts.JsValueType.NativeObject, typeof(FairyGUI.GObject), false, false, v8Value1, ref argobj1, ref argType1) && ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.Number, typeof(FairyGUI.PopupDirection), false, false, v8Value2, ref argobj2, ref argType2))
                    
                    {
                    
                        argobj0 = argobj0 != null ? argobj0 : StaticTranslate<FairyGUI.GObject>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value0, false); FairyGUI.GObject arg0 = (FairyGUI.GObject)argobj0;
                    
                        argobj1 = argobj1 != null ? argobj1 : StaticTranslate<FairyGUI.GObject>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value1, false); FairyGUI.GObject arg1 = (FairyGUI.GObject)argobj1;
                    
                        FairyGUI.PopupDirection arg2 = (FairyGUI.PopupDirection)StaticTranslate<int>.Get((int)data, isolate, Puerts.NativeValueApi.GetValueFromArgument, v8Value2, false);
                    

                        obj.TogglePopup (arg0, arg1, arg2);

                    
                        
                    
                        
                    
                        
                    
                        
                        
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
                
                
                    
                    if (ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.NullOrUndefined | Puerts.JsValueType.NativeObject, typeof(FairyGUI.GObject), false, false, v8Value0, ref argobj0, ref argType0) && ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.NullOrUndefined | Puerts.JsValueType.NativeObject, typeof(FairyGUI.GObject), false, false, v8Value1, ref argobj1, ref argType1) && ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.Number, typeof(FairyGUI.PopupDirection), false, false, v8Value2, ref argobj2, ref argType2) && ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.Boolean, typeof(bool), false, false, v8Value3, ref argobj3, ref argType3))
                    
                    {
                    
                        argobj0 = argobj0 != null ? argobj0 : StaticTranslate<FairyGUI.GObject>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value0, false); FairyGUI.GObject arg0 = (FairyGUI.GObject)argobj0;
                    
                        argobj1 = argobj1 != null ? argobj1 : StaticTranslate<FairyGUI.GObject>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value1, false); FairyGUI.GObject arg1 = (FairyGUI.GObject)argobj1;
                    
                        FairyGUI.PopupDirection arg2 = (FairyGUI.PopupDirection)StaticTranslate<int>.Get((int)data, isolate, Puerts.NativeValueApi.GetValueFromArgument, v8Value2, false);
                    
                        bool arg3 = (bool)PuertsDLL.GetBooleanFromValue(isolate, v8Value3, false);
                    

                        obj.TogglePopup (arg0, arg1, arg2, arg3);

                    
                        
                    
                        
                    
                        
                    
                        
                    
                        
                        
                        return;
                    }
                
                }
            
        
                Puerts.PuertsDLL.ThrowException(isolate, "invalid arguments to TogglePopup");
        
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
    
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void M_HidePopup(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.GRoot;
        
        
                if (paramLen == 0)
            
                {
            
                
                
                    
                    {
                    

                        obj.HidePopup ();

                    
                        
                        
                        return;
                    }
                
                }
            
                if (paramLen == 1)
            
                {
            
                
                    IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                    object argobj0 = null;
                    JsValueType argType0 = JsValueType.Invalid;
                
                
                    
                    if (ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.NullOrUndefined | Puerts.JsValueType.NativeObject, typeof(FairyGUI.GObject), false, false, v8Value0, ref argobj0, ref argType0))
                    
                    {
                    
                        argobj0 = argobj0 != null ? argobj0 : StaticTranslate<FairyGUI.GObject>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value0, false); FairyGUI.GObject arg0 = (FairyGUI.GObject)argobj0;
                    

                        obj.HidePopup (arg0);

                    
                        
                    
                        
                        
                        return;
                    }
                
                }
            
        
                Puerts.PuertsDLL.ThrowException(isolate, "invalid arguments to HidePopup");
        
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
    
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void M_ShowTooltips(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.GRoot;
        
        
                if (paramLen == 1)
            
                {
            
                
                    IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                    object argobj0 = null;
                    JsValueType argType0 = JsValueType.Invalid;
                
                
                    
                    if (ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.NullOrUndefined | Puerts.JsValueType.String, typeof(string), false, false, v8Value0, ref argobj0, ref argType0))
                    
                    {
                    
                        string arg0 = (string)PuertsDLL.GetStringFromValue(isolate, v8Value0, false);
                    

                        obj.ShowTooltips (arg0);

                    
                        
                    
                        
                        
                        return;
                    }
                
                }
            
                if (paramLen == 2)
            
                {
            
                
                    IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                    object argobj0 = null;
                    JsValueType argType0 = JsValueType.Invalid;
                
                    IntPtr v8Value1 = PuertsDLL.GetArgumentValue(info, 1);
                    object argobj1 = null;
                    JsValueType argType1 = JsValueType.Invalid;
                
                
                    
                    if (ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.NullOrUndefined | Puerts.JsValueType.String, typeof(string), false, false, v8Value0, ref argobj0, ref argType0) && ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.Number, typeof(float), false, false, v8Value1, ref argobj1, ref argType1))
                    
                    {
                    
                        string arg0 = (string)PuertsDLL.GetStringFromValue(isolate, v8Value0, false);
                    
                        float arg1 = (float)PuertsDLL.GetNumberFromValue(isolate, v8Value1, false);
                    

                        obj.ShowTooltips (arg0, arg1);

                    
                        
                    
                        
                    
                        
                        
                        return;
                    }
                
                }
            
        
                Puerts.PuertsDLL.ThrowException(isolate, "invalid arguments to ShowTooltips");
        
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
    
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void M_ShowTooltipsWin(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.GRoot;
        
        
                if (paramLen == 1)
            
                {
            
                
                    IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                    object argobj0 = null;
                    JsValueType argType0 = JsValueType.Invalid;
                
                
                    
                    if (ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.NullOrUndefined | Puerts.JsValueType.NativeObject, typeof(FairyGUI.GObject), false, false, v8Value0, ref argobj0, ref argType0))
                    
                    {
                    
                        argobj0 = argobj0 != null ? argobj0 : StaticTranslate<FairyGUI.GObject>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value0, false); FairyGUI.GObject arg0 = (FairyGUI.GObject)argobj0;
                    

                        obj.ShowTooltipsWin (arg0);

                    
                        
                    
                        
                        
                        return;
                    }
                
                }
            
                if (paramLen == 2)
            
                {
            
                
                    IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                    object argobj0 = null;
                    JsValueType argType0 = JsValueType.Invalid;
                
                    IntPtr v8Value1 = PuertsDLL.GetArgumentValue(info, 1);
                    object argobj1 = null;
                    JsValueType argType1 = JsValueType.Invalid;
                
                
                    
                    if (ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.NullOrUndefined | Puerts.JsValueType.NativeObject, typeof(FairyGUI.GObject), false, false, v8Value0, ref argobj0, ref argType0) && ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.Number, typeof(float), false, false, v8Value1, ref argobj1, ref argType1))
                    
                    {
                    
                        argobj0 = argobj0 != null ? argobj0 : StaticTranslate<FairyGUI.GObject>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value0, false); FairyGUI.GObject arg0 = (FairyGUI.GObject)argobj0;
                    
                        float arg1 = (float)PuertsDLL.GetNumberFromValue(isolate, v8Value1, false);
                    

                        obj.ShowTooltipsWin (arg0, arg1);

                    
                        
                    
                        
                    
                        
                        
                        return;
                    }
                
                }
            
        
                Puerts.PuertsDLL.ThrowException(isolate, "invalid arguments to ShowTooltipsWin");
        
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
    
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void M_HideTooltips(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.GRoot;
        
        
                {
            
                
                
                    
                    {
                    

                        obj.HideTooltips ();

                    
                        
                        
                        
                    }
                
                }
            
        
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
    
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void M_EnableSound(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.GRoot;
        
        
                {
            
                
                
                    
                    {
                    

                        obj.EnableSound ();

                    
                        
                        
                        
                    }
                
                }
            
        
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
    
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void M_DisableSound(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.GRoot;
        
        
                {
            
                
                
                    
                    {
                    

                        obj.DisableSound ();

                    
                        
                        
                        
                    }
                
                }
            
        
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
    
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void M_PlayOneShotSound(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.GRoot;
        
        
                if (paramLen == 2)
            
                {
            
                
                    IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                    object argobj0 = null;
                    JsValueType argType0 = JsValueType.Invalid;
                
                    IntPtr v8Value1 = PuertsDLL.GetArgumentValue(info, 1);
                    object argobj1 = null;
                    JsValueType argType1 = JsValueType.Invalid;
                
                
                    
                    if (ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.NullOrUndefined | Puerts.JsValueType.NativeObject, typeof(UnityEngine.AudioClip), false, false, v8Value0, ref argobj0, ref argType0) && ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.Number, typeof(float), false, false, v8Value1, ref argobj1, ref argType1))
                    
                    {
                    
                        argobj0 = argobj0 != null ? argobj0 : StaticTranslate<UnityEngine.AudioClip>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value0, false); UnityEngine.AudioClip arg0 = (UnityEngine.AudioClip)argobj0;
                    
                        float arg1 = (float)PuertsDLL.GetNumberFromValue(isolate, v8Value1, false);
                    

                        obj.PlayOneShotSound (arg0, arg1);

                    
                        
                    
                        
                    
                        
                        
                        return;
                    }
                
                }
            
                if (paramLen == 1)
            
                {
            
                
                    IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                    object argobj0 = null;
                    JsValueType argType0 = JsValueType.Invalid;
                
                
                    
                    if (ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.NullOrUndefined | Puerts.JsValueType.NativeObject, typeof(UnityEngine.AudioClip), false, false, v8Value0, ref argobj0, ref argType0))
                    
                    {
                    
                        argobj0 = argobj0 != null ? argobj0 : StaticTranslate<UnityEngine.AudioClip>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value0, false); UnityEngine.AudioClip arg0 = (UnityEngine.AudioClip)argobj0;
                    

                        obj.PlayOneShotSound (arg0);

                    
                        
                    
                        
                        
                        return;
                    }
                
                }
            
        
                Puerts.PuertsDLL.ThrowException(isolate, "invalid arguments to PlayOneShotSound");
        
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
    
    // ==================== methods end ====================

    // ==================== properties start ====================
    
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void G_contentScaleFactor(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                
                var result = FairyGUI.GRoot.contentScaleFactor;
                Puerts.PuertsDLL.ReturnNumber(isolate, info, result);
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
            
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void G_contentScaleLevel(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                
                var result = FairyGUI.GRoot.contentScaleLevel;
                Puerts.PuertsDLL.ReturnNumber(isolate, info, result);
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
            
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void G_inst(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                
                var result = FairyGUI.GRoot.inst;
                Puerts.ResultHelper.Set((int)data, isolate, info, result);
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
            
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void G_modalLayer(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.GRoot;
                var result = obj.modalLayer;
                Puerts.ResultHelper.Set((int)data, isolate, info, result);
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
            
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void G_hasModalWindow(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.GRoot;
                var result = obj.hasModalWindow;
                Puerts.PuertsDLL.ReturnBoolean(isolate, info, result);
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
            
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void G_modalWaiting(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.GRoot;
                var result = obj.modalWaiting;
                Puerts.PuertsDLL.ReturnBoolean(isolate, info, result);
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
            
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void G_touchTarget(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.GRoot;
                var result = obj.touchTarget;
                Puerts.ResultHelper.Set((int)data, isolate, info, result);
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
            
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void G_hasAnyPopup(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.GRoot;
                var result = obj.hasAnyPopup;
                Puerts.PuertsDLL.ReturnBoolean(isolate, info, result);
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
            
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void G_focus(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.GRoot;
                var result = obj.focus;
                Puerts.ResultHelper.Set((int)data, isolate, info, result);
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
            
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void S_focus(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.GRoot;
                IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                object argobj0 = null;
                argobj0 = argobj0 != null ? argobj0 : StaticTranslate<FairyGUI.GObject>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value0, false); FairyGUI.GObject arg0 = (FairyGUI.GObject)argobj0;
                obj.focus = arg0;
                
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
            
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void G_soundVolume(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.GRoot;
                var result = obj.soundVolume;
                Puerts.PuertsDLL.ReturnNumber(isolate, info, result);
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
            
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void S_soundVolume(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.GRoot;
                IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                object argobj0 = null;
                float arg0 = (float)PuertsDLL.GetNumberFromValue(isolate, v8Value0, false);
                obj.soundVolume = arg0;
                
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
                    { new Puerts.MethodKey { Name = "Dispose", IsStatic = false}, M_Dispose },
                    { new Puerts.MethodKey { Name = "SetContentScaleFactor", IsStatic = false}, M_SetContentScaleFactor },
                    { new Puerts.MethodKey { Name = "ApplyContentScaleFactor", IsStatic = false}, M_ApplyContentScaleFactor },
                    { new Puerts.MethodKey { Name = "ShowWindow", IsStatic = false}, M_ShowWindow },
                    { new Puerts.MethodKey { Name = "HideWindow", IsStatic = false}, M_HideWindow },
                    { new Puerts.MethodKey { Name = "HideWindowImmediately", IsStatic = false}, M_HideWindowImmediately },
                    { new Puerts.MethodKey { Name = "BringToFront", IsStatic = false}, M_BringToFront },
                    { new Puerts.MethodKey { Name = "ShowModalWait", IsStatic = false}, M_ShowModalWait },
                    { new Puerts.MethodKey { Name = "CloseModalWait", IsStatic = false}, M_CloseModalWait },
                    { new Puerts.MethodKey { Name = "CloseAllExceptModals", IsStatic = false}, M_CloseAllExceptModals },
                    { new Puerts.MethodKey { Name = "CloseAllWindows", IsStatic = false}, M_CloseAllWindows },
                    { new Puerts.MethodKey { Name = "GetTopWindow", IsStatic = false}, M_GetTopWindow },
                    { new Puerts.MethodKey { Name = "DisplayObjectToGObject", IsStatic = false}, M_DisplayObjectToGObject },
                    { new Puerts.MethodKey { Name = "ShowPopup", IsStatic = false}, M_ShowPopup },
                    { new Puerts.MethodKey { Name = "GetPoupPosition", IsStatic = false}, M_GetPoupPosition },
                    { new Puerts.MethodKey { Name = "TogglePopup", IsStatic = false}, M_TogglePopup },
                    { new Puerts.MethodKey { Name = "HidePopup", IsStatic = false}, M_HidePopup },
                    { new Puerts.MethodKey { Name = "ShowTooltips", IsStatic = false}, M_ShowTooltips },
                    { new Puerts.MethodKey { Name = "ShowTooltipsWin", IsStatic = false}, M_ShowTooltipsWin },
                    { new Puerts.MethodKey { Name = "HideTooltips", IsStatic = false}, M_HideTooltips },
                    { new Puerts.MethodKey { Name = "EnableSound", IsStatic = false}, M_EnableSound },
                    { new Puerts.MethodKey { Name = "DisableSound", IsStatic = false}, M_DisableSound },
                    { new Puerts.MethodKey { Name = "PlayOneShotSound", IsStatic = false}, M_PlayOneShotSound }
                },
                Properties = new System.Collections.Generic.Dictionary<string, Puerts.PropertyRegisterInfo>()
                {
                    
                    {"contentScaleFactor", new Puerts.PropertyRegisterInfo(){ IsStatic = true, Getter = G_contentScaleFactor, Setter = null} },

                    {"contentScaleLevel", new Puerts.PropertyRegisterInfo(){ IsStatic = true, Getter = G_contentScaleLevel, Setter = null} },

                    {"inst", new Puerts.PropertyRegisterInfo(){ IsStatic = true, Getter = G_inst, Setter = null} },

                    {"modalLayer", new Puerts.PropertyRegisterInfo(){ IsStatic = false, Getter = G_modalLayer, Setter = null} },

                    {"hasModalWindow", new Puerts.PropertyRegisterInfo(){ IsStatic = false, Getter = G_hasModalWindow, Setter = null} },

                    {"modalWaiting", new Puerts.PropertyRegisterInfo(){ IsStatic = false, Getter = G_modalWaiting, Setter = null} },

                    {"touchTarget", new Puerts.PropertyRegisterInfo(){ IsStatic = false, Getter = G_touchTarget, Setter = null} },

                    {"hasAnyPopup", new Puerts.PropertyRegisterInfo(){ IsStatic = false, Getter = G_hasAnyPopup, Setter = null} },

                    {"focus", new Puerts.PropertyRegisterInfo(){ IsStatic = false, Getter = G_focus, Setter = S_focus} },

                    {"soundVolume", new Puerts.PropertyRegisterInfo(){ IsStatic = false, Getter = G_soundVolume, Setter = S_soundVolume} }
                },
                LazyMembers = new System.Collections.Generic.List<Puerts.LazyMemberRegisterInfo>()
                {   
                }
            };
        }
    
    }
}
