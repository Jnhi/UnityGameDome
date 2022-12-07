
using System;
using Puerts;

namespace PuertsStaticWrap
{
    public static class FairyGUI_UIPackage_Wrap 
    {
    
    
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8ConstructorCallback))]
        private static IntPtr Constructor(IntPtr isolate, IntPtr info, int paramLen, long data)
        {
            try
            {

    
            
                {
                
                
                    

                    {
                    
                        var result = new FairyGUI.UIPackage();

                    

                    
                        return Puerts.Utils.GetObjectPtr((int)data, typeof(FairyGUI.UIPackage), result);
                    
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
        private static void F_GetVar(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                
        
        
                {
            
                
                    IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                    object argobj0 = null;
                    JsValueType argType0 = JsValueType.Invalid;
                
                
                    
                    {
                    
                        string arg0 = (string)PuertsDLL.GetStringFromValue(isolate, v8Value0, false);
                    

                        var result = FairyGUI.UIPackage.GetVar (arg0);

                    
                        
                    
                        Puerts.PuertsDLL.ReturnString(isolate, info, result);
                        
                        
                    }
                
                }
            
        
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
    
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void F_SetVar(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
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
                    
                        string arg1 = (string)PuertsDLL.GetStringFromValue(isolate, v8Value1, false);
                    

                        FairyGUI.UIPackage.SetVar (arg0, arg1);

                    
                        
                    
                        
                    
                        
                        
                        
                    }
                
                }
            
        
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
    
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void F_GetById(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                
        
        
                {
            
                
                    IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                    object argobj0 = null;
                    JsValueType argType0 = JsValueType.Invalid;
                
                
                    
                    {
                    
                        string arg0 = (string)PuertsDLL.GetStringFromValue(isolate, v8Value0, false);
                    

                        var result = FairyGUI.UIPackage.GetById (arg0);

                    
                        
                    
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
        private static void F_GetByName(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                
        
        
                {
            
                
                    IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                    object argobj0 = null;
                    JsValueType argType0 = JsValueType.Invalid;
                
                
                    
                    {
                    
                        string arg0 = (string)PuertsDLL.GetStringFromValue(isolate, v8Value0, false);
                    

                        var result = FairyGUI.UIPackage.GetByName (arg0);

                    
                        
                    
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
        private static void F_AddPackage(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                
        
        
                if (paramLen == 1)
            
                {
            
                
                    IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                    object argobj0 = null;
                    JsValueType argType0 = JsValueType.Invalid;
                
                
                    
                    if (ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.NullOrUndefined | Puerts.JsValueType.NativeObject, typeof(UnityEngine.AssetBundle), false, false, v8Value0, ref argobj0, ref argType0))
                    
                    {
                    
                        argobj0 = argobj0 != null ? argobj0 : StaticTranslate<UnityEngine.AssetBundle>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value0, false); UnityEngine.AssetBundle arg0 = (UnityEngine.AssetBundle)argobj0;
                    

                        var result = FairyGUI.UIPackage.AddPackage (arg0);

                    
                        
                    
                        Puerts.ResultHelper.Set((int)data, isolate, info, result);
                        
                        return;
                    }
                
                    
                    if (ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.NullOrUndefined | Puerts.JsValueType.String, typeof(string), false, false, v8Value0, ref argobj0, ref argType0))
                    
                    {
                    
                        string arg0 = (string)PuertsDLL.GetStringFromValue(isolate, v8Value0, false);
                    

                        var result = FairyGUI.UIPackage.AddPackage (arg0);

                    
                        
                    
                        Puerts.ResultHelper.Set((int)data, isolate, info, result);
                        
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
                
                
                    
                    if (ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.NullOrUndefined | Puerts.JsValueType.NativeObject, typeof(UnityEngine.AssetBundle), false, false, v8Value0, ref argobj0, ref argType0) && ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.NullOrUndefined | Puerts.JsValueType.NativeObject, typeof(UnityEngine.AssetBundle), false, false, v8Value1, ref argobj1, ref argType1))
                    
                    {
                    
                        argobj0 = argobj0 != null ? argobj0 : StaticTranslate<UnityEngine.AssetBundle>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value0, false); UnityEngine.AssetBundle arg0 = (UnityEngine.AssetBundle)argobj0;
                    
                        argobj1 = argobj1 != null ? argobj1 : StaticTranslate<UnityEngine.AssetBundle>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value1, false); UnityEngine.AssetBundle arg1 = (UnityEngine.AssetBundle)argobj1;
                    

                        var result = FairyGUI.UIPackage.AddPackage (arg0, arg1);

                    
                        
                    
                        
                    
                        Puerts.ResultHelper.Set((int)data, isolate, info, result);
                        
                        return;
                    }
                
                    
                    if (ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.NullOrUndefined | Puerts.JsValueType.String, typeof(string), false, false, v8Value0, ref argobj0, ref argType0) && ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.NullOrUndefined | Puerts.JsValueType.NativeObject | Puerts.JsValueType.Function, typeof(FairyGUI.UIPackage.LoadResource), false, false, v8Value1, ref argobj1, ref argType1))
                    
                    {
                    
                        string arg0 = (string)PuertsDLL.GetStringFromValue(isolate, v8Value0, false);
                    
                        argobj1 = argobj1 != null ? argobj1 : StaticTranslate<FairyGUI.UIPackage.LoadResource>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value1, false); FairyGUI.UIPackage.LoadResource arg1 = (FairyGUI.UIPackage.LoadResource)argobj1;
                    

                        var result = FairyGUI.UIPackage.AddPackage (arg0, arg1);

                    
                        
                    
                        
                    
                        Puerts.ResultHelper.Set((int)data, isolate, info, result);
                        
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
                
                
                    
                    if (ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.NullOrUndefined | Puerts.JsValueType.NativeObject, typeof(UnityEngine.AssetBundle), false, false, v8Value0, ref argobj0, ref argType0) && ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.NullOrUndefined | Puerts.JsValueType.NativeObject, typeof(UnityEngine.AssetBundle), false, false, v8Value1, ref argobj1, ref argType1) && ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.NullOrUndefined | Puerts.JsValueType.String, typeof(string), false, false, v8Value2, ref argobj2, ref argType2))
                    
                    {
                    
                        argobj0 = argobj0 != null ? argobj0 : StaticTranslate<UnityEngine.AssetBundle>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value0, false); UnityEngine.AssetBundle arg0 = (UnityEngine.AssetBundle)argobj0;
                    
                        argobj1 = argobj1 != null ? argobj1 : StaticTranslate<UnityEngine.AssetBundle>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value1, false); UnityEngine.AssetBundle arg1 = (UnityEngine.AssetBundle)argobj1;
                    
                        string arg2 = (string)PuertsDLL.GetStringFromValue(isolate, v8Value2, false);
                    

                        var result = FairyGUI.UIPackage.AddPackage (arg0, arg1, arg2);

                    
                        
                    
                        
                    
                        
                    
                        Puerts.ResultHelper.Set((int)data, isolate, info, result);
                        
                        return;
                    }
                
                    
                    if (ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.NullOrUndefined | Puerts.JsValueType.NativeObject, typeof(byte[]), false, false, v8Value0, ref argobj0, ref argType0) && ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.NullOrUndefined | Puerts.JsValueType.String, typeof(string), false, false, v8Value1, ref argobj1, ref argType1) && ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.NullOrUndefined | Puerts.JsValueType.NativeObject | Puerts.JsValueType.Function, typeof(FairyGUI.UIPackage.LoadResource), false, false, v8Value2, ref argobj2, ref argType2))
                    
                    {
                    
                        argobj0 = argobj0 != null ? argobj0 : StaticTranslate<byte[]>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value0, false); byte[] arg0 = (byte[])argobj0;
                    
                        string arg1 = (string)PuertsDLL.GetStringFromValue(isolate, v8Value1, false);
                    
                        argobj2 = argobj2 != null ? argobj2 : StaticTranslate<FairyGUI.UIPackage.LoadResource>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value2, false); FairyGUI.UIPackage.LoadResource arg2 = (FairyGUI.UIPackage.LoadResource)argobj2;
                    

                        var result = FairyGUI.UIPackage.AddPackage (arg0, arg1, arg2);

                    
                        
                    
                        
                    
                        
                    
                        Puerts.ResultHelper.Set((int)data, isolate, info, result);
                        
                        return;
                    }
                
                    
                    if (ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.NullOrUndefined | Puerts.JsValueType.NativeObject, typeof(byte[]), false, false, v8Value0, ref argobj0, ref argType0) && ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.NullOrUndefined | Puerts.JsValueType.String, typeof(string), false, false, v8Value1, ref argobj1, ref argType1) && ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.NullOrUndefined | Puerts.JsValueType.NativeObject | Puerts.JsValueType.Function, typeof(FairyGUI.UIPackage.LoadResourceAsync), false, false, v8Value2, ref argobj2, ref argType2))
                    
                    {
                    
                        argobj0 = argobj0 != null ? argobj0 : StaticTranslate<byte[]>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value0, false); byte[] arg0 = (byte[])argobj0;
                    
                        string arg1 = (string)PuertsDLL.GetStringFromValue(isolate, v8Value1, false);
                    
                        argobj2 = argobj2 != null ? argobj2 : StaticTranslate<FairyGUI.UIPackage.LoadResourceAsync>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value2, false); FairyGUI.UIPackage.LoadResourceAsync arg2 = (FairyGUI.UIPackage.LoadResourceAsync)argobj2;
                    

                        var result = FairyGUI.UIPackage.AddPackage (arg0, arg1, arg2);

                    
                        
                    
                        
                    
                        
                    
                        Puerts.ResultHelper.Set((int)data, isolate, info, result);
                        
                        return;
                    }
                
                }
            
        
                Puerts.PuertsDLL.ThrowException(isolate, "invalid arguments to AddPackage");
        
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
    
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void F_RemovePackage(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                
        
        
                {
            
                
                    IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                    object argobj0 = null;
                    JsValueType argType0 = JsValueType.Invalid;
                
                
                    
                    {
                    
                        string arg0 = (string)PuertsDLL.GetStringFromValue(isolate, v8Value0, false);
                    

                        FairyGUI.UIPackage.RemovePackage (arg0);

                    
                        
                    
                        
                        
                        
                    }
                
                }
            
        
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
    
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void F_RemoveAllPackages(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                
        
        
                {
            
                
                
                    
                    {
                    

                        FairyGUI.UIPackage.RemoveAllPackages ();

                    
                        
                        
                        
                    }
                
                }
            
        
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
    
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void F_GetPackages(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                
        
        
                {
            
                
                
                    
                    {
                    

                        var result = FairyGUI.UIPackage.GetPackages ();

                    
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
        private static void F_CreateObject(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                
        
        
                if (paramLen == 2)
            
                {
            
                
                    IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                    object argobj0 = null;
                    JsValueType argType0 = JsValueType.Invalid;
                
                    IntPtr v8Value1 = PuertsDLL.GetArgumentValue(info, 1);
                    object argobj1 = null;
                    JsValueType argType1 = JsValueType.Invalid;
                
                
                    
                    if (ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.NullOrUndefined | Puerts.JsValueType.String, typeof(string), false, false, v8Value0, ref argobj0, ref argType0) && ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.NullOrUndefined | Puerts.JsValueType.String, typeof(string), false, false, v8Value1, ref argobj1, ref argType1))
                    
                    {
                    
                        string arg0 = (string)PuertsDLL.GetStringFromValue(isolate, v8Value0, false);
                    
                        string arg1 = (string)PuertsDLL.GetStringFromValue(isolate, v8Value1, false);
                    

                        var result = FairyGUI.UIPackage.CreateObject (arg0, arg1);

                    
                        
                    
                        
                    
                        Puerts.ResultHelper.Set((int)data, isolate, info, result);
                        
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
                
                
                    
                    if (ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.NullOrUndefined | Puerts.JsValueType.String, typeof(string), false, false, v8Value0, ref argobj0, ref argType0) && ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.NullOrUndefined | Puerts.JsValueType.String, typeof(string), false, false, v8Value1, ref argobj1, ref argType1) && ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.NullOrUndefined | Puerts.JsValueType.NativeObject, typeof(System.Type), false, false, v8Value2, ref argobj2, ref argType2))
                    
                    {
                    
                        string arg0 = (string)PuertsDLL.GetStringFromValue(isolate, v8Value0, false);
                    
                        string arg1 = (string)PuertsDLL.GetStringFromValue(isolate, v8Value1, false);
                    
                        argobj2 = argobj2 != null ? argobj2 : StaticTranslate<System.Type>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value2, false); System.Type arg2 = (System.Type)argobj2;
                    

                        var result = FairyGUI.UIPackage.CreateObject (arg0, arg1, arg2);

                    
                        
                    
                        
                    
                        
                    
                        Puerts.ResultHelper.Set((int)data, isolate, info, result);
                        
                        return;
                    }
                
                }
            
        
                Puerts.PuertsDLL.ThrowException(isolate, "invalid arguments to CreateObject");
        
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
    
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void F_CreateObjectFromURL(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                
        
        
                if (paramLen == 1)
            
                {
            
                
                    IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                    object argobj0 = null;
                    JsValueType argType0 = JsValueType.Invalid;
                
                
                    
                    if (ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.NullOrUndefined | Puerts.JsValueType.String, typeof(string), false, false, v8Value0, ref argobj0, ref argType0))
                    
                    {
                    
                        string arg0 = (string)PuertsDLL.GetStringFromValue(isolate, v8Value0, false);
                    

                        var result = FairyGUI.UIPackage.CreateObjectFromURL (arg0);

                    
                        
                    
                        Puerts.ResultHelper.Set((int)data, isolate, info, result);
                        
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
                
                
                    
                    if (ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.NullOrUndefined | Puerts.JsValueType.String, typeof(string), false, false, v8Value0, ref argobj0, ref argType0) && ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.NullOrUndefined | Puerts.JsValueType.NativeObject, typeof(System.Type), false, false, v8Value1, ref argobj1, ref argType1))
                    
                    {
                    
                        string arg0 = (string)PuertsDLL.GetStringFromValue(isolate, v8Value0, false);
                    
                        argobj1 = argobj1 != null ? argobj1 : StaticTranslate<System.Type>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value1, false); System.Type arg1 = (System.Type)argobj1;
                    

                        var result = FairyGUI.UIPackage.CreateObjectFromURL (arg0, arg1);

                    
                        
                    
                        
                    
                        Puerts.ResultHelper.Set((int)data, isolate, info, result);
                        
                        return;
                    }
                
                    
                    if (ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.NullOrUndefined | Puerts.JsValueType.String, typeof(string), false, false, v8Value0, ref argobj0, ref argType0) && ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.NullOrUndefined | Puerts.JsValueType.NativeObject | Puerts.JsValueType.Function, typeof(FairyGUI.UIPackage.CreateObjectCallback), false, false, v8Value1, ref argobj1, ref argType1))
                    
                    {
                    
                        string arg0 = (string)PuertsDLL.GetStringFromValue(isolate, v8Value0, false);
                    
                        argobj1 = argobj1 != null ? argobj1 : StaticTranslate<FairyGUI.UIPackage.CreateObjectCallback>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value1, false); FairyGUI.UIPackage.CreateObjectCallback arg1 = (FairyGUI.UIPackage.CreateObjectCallback)argobj1;
                    

                        FairyGUI.UIPackage.CreateObjectFromURL (arg0, arg1);

                    
                        
                    
                        
                    
                        
                        
                        return;
                    }
                
                }
            
        
                Puerts.PuertsDLL.ThrowException(isolate, "invalid arguments to CreateObjectFromURL");
        
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
    
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void F_CreateObjectAsync(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
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
                    
                        string arg0 = (string)PuertsDLL.GetStringFromValue(isolate, v8Value0, false);
                    
                        string arg1 = (string)PuertsDLL.GetStringFromValue(isolate, v8Value1, false);
                    
                        argobj2 = argobj2 != null ? argobj2 : StaticTranslate<FairyGUI.UIPackage.CreateObjectCallback>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value2, false); FairyGUI.UIPackage.CreateObjectCallback arg2 = (FairyGUI.UIPackage.CreateObjectCallback)argobj2;
                    

                        FairyGUI.UIPackage.CreateObjectAsync (arg0, arg1, arg2);

                    
                        
                    
                        
                    
                        
                    
                        
                        
                        
                    }
                
                }
            
        
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
    
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void F_GetItemAsset(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
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
                    
                        string arg1 = (string)PuertsDLL.GetStringFromValue(isolate, v8Value1, false);
                    

                        var result = FairyGUI.UIPackage.GetItemAsset (arg0, arg1);

                    
                        
                    
                        
                    
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
        private static void F_GetItemAssetByURL(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                
        
        
                {
            
                
                    IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                    object argobj0 = null;
                    JsValueType argType0 = JsValueType.Invalid;
                
                
                    
                    {
                    
                        string arg0 = (string)PuertsDLL.GetStringFromValue(isolate, v8Value0, false);
                    

                        var result = FairyGUI.UIPackage.GetItemAssetByURL (arg0);

                    
                        
                    
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
        private static void F_GetItemURL(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
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
                    
                        string arg1 = (string)PuertsDLL.GetStringFromValue(isolate, v8Value1, false);
                    

                        var result = FairyGUI.UIPackage.GetItemURL (arg0, arg1);

                    
                        
                    
                        
                    
                        Puerts.PuertsDLL.ReturnString(isolate, info, result);
                        
                        
                    }
                
                }
            
        
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
    
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void F_GetItemByURL(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                
        
        
                {
            
                
                    IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                    object argobj0 = null;
                    JsValueType argType0 = JsValueType.Invalid;
                
                
                    
                    {
                    
                        string arg0 = (string)PuertsDLL.GetStringFromValue(isolate, v8Value0, false);
                    

                        var result = FairyGUI.UIPackage.GetItemByURL (arg0);

                    
                        
                    
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
        private static void F_NormalizeURL(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                
        
        
                {
            
                
                    IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                    object argobj0 = null;
                    JsValueType argType0 = JsValueType.Invalid;
                
                
                    
                    {
                    
                        string arg0 = (string)PuertsDLL.GetStringFromValue(isolate, v8Value0, false);
                    

                        var result = FairyGUI.UIPackage.NormalizeURL (arg0);

                    
                        
                    
                        Puerts.PuertsDLL.ReturnString(isolate, info, result);
                        
                        
                    }
                
                }
            
        
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
    
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void F_SetStringsSource(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                
        
        
                {
            
                
                    IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                    object argobj0 = null;
                    JsValueType argType0 = JsValueType.Invalid;
                
                
                    
                    {
                    
                        argobj0 = argobj0 != null ? argobj0 : StaticTranslate<FairyGUI.Utils.XML>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value0, false); FairyGUI.Utils.XML arg0 = (FairyGUI.Utils.XML)argobj0;
                    

                        FairyGUI.UIPackage.SetStringsSource (arg0);

                    
                        
                    
                        
                        
                        
                    }
                
                }
            
        
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
    
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void M_LoadAllAssets(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.UIPackage;
        
        
                {
            
                
                
                    
                    {
                    

                        obj.LoadAllAssets ();

                    
                        
                        
                        
                    }
                
                }
            
        
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
    
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void M_UnloadAssets(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.UIPackage;
        
        
                {
            
                
                
                    
                    {
                    

                        obj.UnloadAssets ();

                    
                        
                        
                        
                    }
                
                }
            
        
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
    
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void M_ReloadAssets(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.UIPackage;
        
        
                if (paramLen == 0)
            
                {
            
                
                
                    
                    {
                    

                        obj.ReloadAssets ();

                    
                        
                        
                        return;
                    }
                
                }
            
                if (paramLen == 1)
            
                {
            
                
                    IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                    object argobj0 = null;
                    JsValueType argType0 = JsValueType.Invalid;
                
                
                    
                    if (ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.NullOrUndefined | Puerts.JsValueType.NativeObject, typeof(UnityEngine.AssetBundle), false, false, v8Value0, ref argobj0, ref argType0))
                    
                    {
                    
                        argobj0 = argobj0 != null ? argobj0 : StaticTranslate<UnityEngine.AssetBundle>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value0, false); UnityEngine.AssetBundle arg0 = (UnityEngine.AssetBundle)argobj0;
                    

                        obj.ReloadAssets (arg0);

                    
                        
                    
                        
                        
                        return;
                    }
                
                }
            
        
                Puerts.PuertsDLL.ThrowException(isolate, "invalid arguments to ReloadAssets");
        
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
    
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void M_CreateObject(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.UIPackage;
        
        
                if (paramLen == 1)
            
                {
            
                
                    IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                    object argobj0 = null;
                    JsValueType argType0 = JsValueType.Invalid;
                
                
                    
                    if (ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.NullOrUndefined | Puerts.JsValueType.String, typeof(string), false, false, v8Value0, ref argobj0, ref argType0))
                    
                    {
                    
                        string arg0 = (string)PuertsDLL.GetStringFromValue(isolate, v8Value0, false);
                    

                        var result = obj.CreateObject (arg0);

                    
                        
                    
                        Puerts.ResultHelper.Set((int)data, isolate, info, result);
                        
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
                
                
                    
                    if (ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.NullOrUndefined | Puerts.JsValueType.String, typeof(string), false, false, v8Value0, ref argobj0, ref argType0) && ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.NullOrUndefined | Puerts.JsValueType.NativeObject, typeof(System.Type), false, false, v8Value1, ref argobj1, ref argType1))
                    
                    {
                    
                        string arg0 = (string)PuertsDLL.GetStringFromValue(isolate, v8Value0, false);
                    
                        argobj1 = argobj1 != null ? argobj1 : StaticTranslate<System.Type>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value1, false); System.Type arg1 = (System.Type)argobj1;
                    

                        var result = obj.CreateObject (arg0, arg1);

                    
                        
                    
                        
                    
                        Puerts.ResultHelper.Set((int)data, isolate, info, result);
                        
                        return;
                    }
                
                }
            
        
                Puerts.PuertsDLL.ThrowException(isolate, "invalid arguments to CreateObject");
        
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
    
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void M_CreateObjectAsync(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.UIPackage;
        
        
                {
            
                
                    IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                    object argobj0 = null;
                    JsValueType argType0 = JsValueType.Invalid;
                
                    IntPtr v8Value1 = PuertsDLL.GetArgumentValue(info, 1);
                    object argobj1 = null;
                    JsValueType argType1 = JsValueType.Invalid;
                
                
                    
                    {
                    
                        string arg0 = (string)PuertsDLL.GetStringFromValue(isolate, v8Value0, false);
                    
                        argobj1 = argobj1 != null ? argobj1 : StaticTranslate<FairyGUI.UIPackage.CreateObjectCallback>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value1, false); FairyGUI.UIPackage.CreateObjectCallback arg1 = (FairyGUI.UIPackage.CreateObjectCallback)argobj1;
                    

                        obj.CreateObjectAsync (arg0, arg1);

                    
                        
                    
                        
                    
                        
                        
                        
                    }
                
                }
            
        
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
    
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void M_GetItemAsset(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.UIPackage;
        
        
                if (paramLen == 1)
            
                {
            
                
                    IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                    object argobj0 = null;
                    JsValueType argType0 = JsValueType.Invalid;
                
                
                    
                    if (ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.NullOrUndefined | Puerts.JsValueType.String, typeof(string), false, false, v8Value0, ref argobj0, ref argType0))
                    
                    {
                    
                        string arg0 = (string)PuertsDLL.GetStringFromValue(isolate, v8Value0, false);
                    

                        var result = obj.GetItemAsset (arg0);

                    
                        
                    
                        Puerts.ResultHelper.Set((int)data, isolate, info, result);
                        
                        return;
                    }
                
                    
                    if (ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.NullOrUndefined | Puerts.JsValueType.NativeObject, typeof(FairyGUI.PackageItem), false, false, v8Value0, ref argobj0, ref argType0))
                    
                    {
                    
                        argobj0 = argobj0 != null ? argobj0 : StaticTranslate<FairyGUI.PackageItem>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value0, false); FairyGUI.PackageItem arg0 = (FairyGUI.PackageItem)argobj0;
                    

                        var result = obj.GetItemAsset (arg0);

                    
                        
                    
                        Puerts.ResultHelper.Set((int)data, isolate, info, result);
                        
                        return;
                    }
                
                }
            
        
                Puerts.PuertsDLL.ThrowException(isolate, "invalid arguments to GetItemAsset");
        
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
    
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void M_GetItems(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.UIPackage;
        
        
                {
            
                
                
                    
                    {
                    

                        var result = obj.GetItems ();

                    
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
        private static void M_GetItem(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.UIPackage;
        
        
                {
            
                
                    IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                    object argobj0 = null;
                    JsValueType argType0 = JsValueType.Invalid;
                
                
                    
                    {
                    
                        string arg0 = (string)PuertsDLL.GetStringFromValue(isolate, v8Value0, false);
                    

                        var result = obj.GetItem (arg0);

                    
                        
                    
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
        private static void M_GetItemByName(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.UIPackage;
        
        
                {
            
                
                    IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                    object argobj0 = null;
                    JsValueType argType0 = JsValueType.Invalid;
                
                
                    
                    {
                    
                        string arg0 = (string)PuertsDLL.GetStringFromValue(isolate, v8Value0, false);
                    

                        var result = obj.GetItemByName (arg0);

                    
                        
                    
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
        private static void M_SetItemAsset(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.UIPackage;
        
        
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
                    
                        argobj0 = argobj0 != null ? argobj0 : StaticTranslate<FairyGUI.PackageItem>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value0, false); FairyGUI.PackageItem arg0 = (FairyGUI.PackageItem)argobj0;
                    
                        argobj1 = argobj1 != null ? argobj1 : StaticTranslate<System.Object>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value1, false); System.Object arg1 = (System.Object)argobj1;
                    
                        FairyGUI.DestroyMethod arg2 = (FairyGUI.DestroyMethod)StaticTranslate<int>.Get((int)data, isolate, Puerts.NativeValueApi.GetValueFromArgument, v8Value2, false);
                    

                        obj.SetItemAsset (arg0, arg1, arg2);

                    
                        
                    
                        
                    
                        
                    
                        
                        
                        
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
        private static void G_id(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.UIPackage;
                var result = obj.id;
                Puerts.PuertsDLL.ReturnString(isolate, info, result);
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
            
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void G_name(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.UIPackage;
                var result = obj.name;
                Puerts.PuertsDLL.ReturnString(isolate, info, result);
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
            
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void G_branch(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                
                var result = FairyGUI.UIPackage.branch;
                Puerts.PuertsDLL.ReturnString(isolate, info, result);
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
            
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void S_branch(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                
                IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                object argobj0 = null;
                string arg0 = (string)PuertsDLL.GetStringFromValue(isolate, v8Value0, false);
                FairyGUI.UIPackage.branch = arg0;
                
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
            
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void G_assetPath(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.UIPackage;
                var result = obj.assetPath;
                Puerts.PuertsDLL.ReturnString(isolate, info, result);
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
            
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void G_customId(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.UIPackage;
                var result = obj.customId;
                Puerts.PuertsDLL.ReturnString(isolate, info, result);
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
            
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void S_customId(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.UIPackage;
                IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                object argobj0 = null;
                string arg0 = (string)PuertsDLL.GetStringFromValue(isolate, v8Value0, false);
                obj.customId = arg0;
                
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
            
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void G_resBundle(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.UIPackage;
                var result = obj.resBundle;
                Puerts.ResultHelper.Set((int)data, isolate, info, result);
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
            
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void G_dependencies(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.UIPackage;
                var result = obj.dependencies;
                Puerts.ResultHelper.Set((int)data, isolate, info, result);
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
            
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void G_unloadBundleByFGUI(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                
                var result = FairyGUI.UIPackage.unloadBundleByFGUI;
                Puerts.PuertsDLL.ReturnBoolean(isolate, info, result);
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
            
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void S_unloadBundleByFGUI(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                
                IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                object argobj0 = null;
                bool arg0 = (bool)PuertsDLL.GetBooleanFromValue(isolate, v8Value0, false);
                FairyGUI.UIPackage.unloadBundleByFGUI = arg0;
                
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
            
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void G_URL_PREFIX(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                
                var result = FairyGUI.UIPackage.URL_PREFIX;
                Puerts.PuertsDLL.ReturnString(isolate, info, result);
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
    
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void A_onReleaseResource(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                
                IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                object argobj0 = null;
                argobj0 = argobj0 != null ? argobj0 : StaticTranslate<System.Action<FairyGUI.PackageItem>>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value0, false); System.Action<FairyGUI.PackageItem> arg0 = (System.Action<FairyGUI.PackageItem>)argobj0;
                FairyGUI.UIPackage.onReleaseResource += arg0;
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
            
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void R_onReleaseResource(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                
                IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                object argobj0 = null;
                argobj0 = argobj0 != null ? argobj0 : StaticTranslate<System.Action<FairyGUI.PackageItem>>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value0, false); System.Action<FairyGUI.PackageItem> arg0 = (System.Action<FairyGUI.PackageItem>)argobj0;
                FairyGUI.UIPackage.onReleaseResource -= arg0;
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
            
    // ==================== events end ====================

        public static Puerts.TypeRegisterInfo GetRegisterInfo()
        {
            return new Puerts.TypeRegisterInfo()
            {
                BlittableCopy = false,
                Constructor = Constructor,
                Methods = new System.Collections.Generic.Dictionary<Puerts.MethodKey, Puerts.V8FunctionCallback>()
                {   
                    { new Puerts.MethodKey { Name = "GetVar", IsStatic = true}, F_GetVar },
                    { new Puerts.MethodKey { Name = "SetVar", IsStatic = true}, F_SetVar },
                    { new Puerts.MethodKey { Name = "GetById", IsStatic = true}, F_GetById },
                    { new Puerts.MethodKey { Name = "GetByName", IsStatic = true}, F_GetByName },
                    { new Puerts.MethodKey { Name = "AddPackage", IsStatic = true}, F_AddPackage },
                    { new Puerts.MethodKey { Name = "RemovePackage", IsStatic = true}, F_RemovePackage },
                    { new Puerts.MethodKey { Name = "RemoveAllPackages", IsStatic = true}, F_RemoveAllPackages },
                    { new Puerts.MethodKey { Name = "GetPackages", IsStatic = true}, F_GetPackages },
                    { new Puerts.MethodKey { Name = "CreateObject", IsStatic = true}, F_CreateObject },
                    { new Puerts.MethodKey { Name = "CreateObjectFromURL", IsStatic = true}, F_CreateObjectFromURL },
                    { new Puerts.MethodKey { Name = "CreateObjectAsync", IsStatic = true}, F_CreateObjectAsync },
                    { new Puerts.MethodKey { Name = "GetItemAsset", IsStatic = true}, F_GetItemAsset },
                    { new Puerts.MethodKey { Name = "GetItemAssetByURL", IsStatic = true}, F_GetItemAssetByURL },
                    { new Puerts.MethodKey { Name = "GetItemURL", IsStatic = true}, F_GetItemURL },
                    { new Puerts.MethodKey { Name = "GetItemByURL", IsStatic = true}, F_GetItemByURL },
                    { new Puerts.MethodKey { Name = "NormalizeURL", IsStatic = true}, F_NormalizeURL },
                    { new Puerts.MethodKey { Name = "SetStringsSource", IsStatic = true}, F_SetStringsSource },
                    { new Puerts.MethodKey { Name = "LoadAllAssets", IsStatic = false}, M_LoadAllAssets },
                    { new Puerts.MethodKey { Name = "UnloadAssets", IsStatic = false}, M_UnloadAssets },
                    { new Puerts.MethodKey { Name = "ReloadAssets", IsStatic = false}, M_ReloadAssets },
                    { new Puerts.MethodKey { Name = "CreateObject", IsStatic = false}, M_CreateObject },
                    { new Puerts.MethodKey { Name = "CreateObjectAsync", IsStatic = false}, M_CreateObjectAsync },
                    { new Puerts.MethodKey { Name = "GetItemAsset", IsStatic = false}, M_GetItemAsset },
                    { new Puerts.MethodKey { Name = "GetItems", IsStatic = false}, M_GetItems },
                    { new Puerts.MethodKey { Name = "GetItem", IsStatic = false}, M_GetItem },
                    { new Puerts.MethodKey { Name = "GetItemByName", IsStatic = false}, M_GetItemByName },
                    { new Puerts.MethodKey { Name = "SetItemAsset", IsStatic = false}, M_SetItemAsset },

                    { new Puerts.MethodKey { Name = "add_onReleaseResource", IsStatic = true}, A_onReleaseResource },
                    { new Puerts.MethodKey { Name = "remove_onReleaseResource", IsStatic = true},  R_onReleaseResource }
                },
                Properties = new System.Collections.Generic.Dictionary<string, Puerts.PropertyRegisterInfo>()
                {
                    
                    {"id", new Puerts.PropertyRegisterInfo(){ IsStatic = false, Getter = G_id, Setter = null} },

                    {"name", new Puerts.PropertyRegisterInfo(){ IsStatic = false, Getter = G_name, Setter = null} },

                    {"branch", new Puerts.PropertyRegisterInfo(){ IsStatic = true, Getter = G_branch, Setter = S_branch} },

                    {"assetPath", new Puerts.PropertyRegisterInfo(){ IsStatic = false, Getter = G_assetPath, Setter = null} },

                    {"customId", new Puerts.PropertyRegisterInfo(){ IsStatic = false, Getter = G_customId, Setter = S_customId} },

                    {"resBundle", new Puerts.PropertyRegisterInfo(){ IsStatic = false, Getter = G_resBundle, Setter = null} },

                    {"dependencies", new Puerts.PropertyRegisterInfo(){ IsStatic = false, Getter = G_dependencies, Setter = null} },

                    {"unloadBundleByFGUI", new Puerts.PropertyRegisterInfo(){ IsStatic = true, Getter = G_unloadBundleByFGUI, Setter = S_unloadBundleByFGUI} },

                    {"URL_PREFIX", new Puerts.PropertyRegisterInfo(){ IsStatic = true, Getter = G_URL_PREFIX, Setter = null} }
                },
                LazyMembers = new System.Collections.Generic.List<Puerts.LazyMemberRegisterInfo>()
                {   
                }
            };
        }
    
    }
}
