
using System;
using Puerts;

namespace PuertsStaticWrap
{
    public static class FairyGUI_BitmapFont_Wrap 
    {
    
    
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8ConstructorCallback))]
        private static IntPtr Constructor(IntPtr isolate, IntPtr info, int paramLen, long data)
        {
            try
            {

    
            
                {
                
                
                    

                    {
                    
                        var result = new FairyGUI.BitmapFont();

                    

                    
                        return Puerts.Utils.GetObjectPtr((int)data, typeof(FairyGUI.BitmapFont), result);
                    
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
        private static void M_AddChar(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.BitmapFont;
        
        
                {
            
                
                    IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                    object argobj0 = null;
                    JsValueType argType0 = JsValueType.Invalid;
                
                    IntPtr v8Value1 = PuertsDLL.GetArgumentValue(info, 1);
                    object argobj1 = null;
                    JsValueType argType1 = JsValueType.Invalid;
                
                
                    
                    {
                    
                        argobj0 = argobj0 != null ? argobj0 : StaticTranslate<System.Char>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value0, false); System.Char arg0 = (System.Char)argobj0;
                    
                        argobj1 = argobj1 != null ? argobj1 : StaticTranslate<FairyGUI.BitmapFont.BMGlyph>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value1, false); FairyGUI.BitmapFont.BMGlyph arg1 = (FairyGUI.BitmapFont.BMGlyph)argobj1;
                    

                        obj.AddChar (arg0, arg1);

                    
                        
                    
                        
                    
                        
                        
                        
                    }
                
                }
            
        
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
    
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void M_SetFormat(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.BitmapFont;
        
        
                {
            
                
                    IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                    object argobj0 = null;
                    JsValueType argType0 = JsValueType.Invalid;
                
                    IntPtr v8Value1 = PuertsDLL.GetArgumentValue(info, 1);
                    object argobj1 = null;
                    JsValueType argType1 = JsValueType.Invalid;
                
                
                    
                    {
                    
                        argobj0 = argobj0 != null ? argobj0 : StaticTranslate<FairyGUI.TextFormat>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value0, false); FairyGUI.TextFormat arg0 = (FairyGUI.TextFormat)argobj0;
                    
                        float arg1 = (float)PuertsDLL.GetNumberFromValue(isolate, v8Value1, false);
                    

                        obj.SetFormat (arg0, arg1);

                    
                        
                    
                        
                    
                        
                        
                        
                    }
                
                }
            
        
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
    
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void M_GetGlyph(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.BitmapFont;
        
        
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
                
                
                    
                    {
                    
                        argobj0 = argobj0 != null ? argobj0 : StaticTranslate<System.Char>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value0, false); System.Char arg0 = (System.Char)argobj0;
                    
                        float arg1 = (float)PuertsDLL.GetNumberFromValue(isolate, v8Value1, true);
                    
                        float arg2 = (float)PuertsDLL.GetNumberFromValue(isolate, v8Value2, true);
                    
                        float arg3 = (float)PuertsDLL.GetNumberFromValue(isolate, v8Value3, true);
                    

                        var result = obj.GetGlyph (arg0, out arg1, out arg2, out arg3);

                    
                        
                    
                        
                        StaticTranslate<float>.Set((int)data, isolate, Puerts.NativeValueApi.SetValueToByRefArgument, v8Value1, arg1);
                        
                    
                        
                        StaticTranslate<float>.Set((int)data, isolate, Puerts.NativeValueApi.SetValueToByRefArgument, v8Value2, arg2);
                        
                    
                        
                        StaticTranslate<float>.Set((int)data, isolate, Puerts.NativeValueApi.SetValueToByRefArgument, v8Value3, arg3);
                        
                    
                        Puerts.PuertsDLL.ReturnBoolean(isolate, info, result);
                        
                        
                    }
                
                }
            
        
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
    
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void M_DrawGlyph(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.BitmapFont;
        
        
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
                
                
                    
                    {
                    
                        float arg0 = (float)PuertsDLL.GetNumberFromValue(isolate, v8Value0, false);
                    
                        float arg1 = (float)PuertsDLL.GetNumberFromValue(isolate, v8Value1, false);
                    
                        argobj2 = argobj2 != null ? argobj2 : StaticTranslate<System.Collections.Generic.List<UnityEngine.Vector3>>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value2, false); System.Collections.Generic.List<UnityEngine.Vector3> arg2 = (System.Collections.Generic.List<UnityEngine.Vector3>)argobj2;
                    
                        argobj3 = argobj3 != null ? argobj3 : StaticTranslate<System.Collections.Generic.List<UnityEngine.Vector2>>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value3, false); System.Collections.Generic.List<UnityEngine.Vector2> arg3 = (System.Collections.Generic.List<UnityEngine.Vector2>)argobj3;
                    
                        argobj4 = argobj4 != null ? argobj4 : StaticTranslate<System.Collections.Generic.List<UnityEngine.Vector2>>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value4, false); System.Collections.Generic.List<UnityEngine.Vector2> arg4 = (System.Collections.Generic.List<UnityEngine.Vector2>)argobj4;
                    
                        argobj5 = argobj5 != null ? argobj5 : StaticTranslate<System.Collections.Generic.List<UnityEngine.Color32>>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value5, false); System.Collections.Generic.List<UnityEngine.Color32> arg5 = (System.Collections.Generic.List<UnityEngine.Color32>)argobj5;
                    

                        var result = obj.DrawGlyph (arg0, arg1, arg2, arg3, arg4, arg5);

                    
                        
                    
                        
                    
                        
                    
                        
                    
                        
                    
                        
                    
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
        private static void M_HasCharacter(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.BitmapFont;
        
        
                {
            
                
                    IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                    object argobj0 = null;
                    JsValueType argType0 = JsValueType.Invalid;
                
                
                    
                    {
                    
                        argobj0 = argobj0 != null ? argobj0 : StaticTranslate<System.Char>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value0, false); System.Char arg0 = (System.Char)argobj0;
                    

                        var result = obj.HasCharacter (arg0);

                    
                        
                    
                        Puerts.PuertsDLL.ReturnBoolean(isolate, info, result);
                        
                        
                    }
                
                }
            
        
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
    
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void M_GetLineHeight(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.BitmapFont;
        
        
                {
            
                
                    IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                    object argobj0 = null;
                    JsValueType argType0 = JsValueType.Invalid;
                
                
                    
                    {
                    
                        int arg0 = (int)PuertsDLL.GetNumberFromValue(isolate, v8Value0, false);
                    

                        var result = obj.GetLineHeight (arg0);

                    
                        
                    
                        Puerts.PuertsDLL.ReturnNumber(isolate, info, result);
                        
                        
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
        private static void G_size(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.BitmapFont;
                var result = obj.size;
                Puerts.PuertsDLL.ReturnNumber(isolate, info, result);
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
            
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void S_size(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.BitmapFont;
                IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                object argobj0 = null;
                int arg0 = (int)PuertsDLL.GetNumberFromValue(isolate, v8Value0, false);
                obj.size = arg0;
                
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
            
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void G_resizable(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.BitmapFont;
                var result = obj.resizable;
                Puerts.PuertsDLL.ReturnBoolean(isolate, info, result);
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
            
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void S_resizable(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.BitmapFont;
                IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                object argobj0 = null;
                bool arg0 = (bool)PuertsDLL.GetBooleanFromValue(isolate, v8Value0, false);
                obj.resizable = arg0;
                
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
            
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void G_hasChannel(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.BitmapFont;
                var result = obj.hasChannel;
                Puerts.PuertsDLL.ReturnBoolean(isolate, info, result);
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
            
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void S_hasChannel(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.BitmapFont;
                IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                object argobj0 = null;
                bool arg0 = (bool)PuertsDLL.GetBooleanFromValue(isolate, v8Value0, false);
                obj.hasChannel = arg0;
                
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
                    { new Puerts.MethodKey { Name = "AddChar", IsStatic = false}, M_AddChar },
                    { new Puerts.MethodKey { Name = "SetFormat", IsStatic = false}, M_SetFormat },
                    { new Puerts.MethodKey { Name = "GetGlyph", IsStatic = false}, M_GetGlyph },
                    { new Puerts.MethodKey { Name = "DrawGlyph", IsStatic = false}, M_DrawGlyph },
                    { new Puerts.MethodKey { Name = "HasCharacter", IsStatic = false}, M_HasCharacter },
                    { new Puerts.MethodKey { Name = "GetLineHeight", IsStatic = false}, M_GetLineHeight }
                },
                Properties = new System.Collections.Generic.Dictionary<string, Puerts.PropertyRegisterInfo>()
                {
                    
                    {"size", new Puerts.PropertyRegisterInfo(){ IsStatic = false, Getter = G_size, Setter = S_size} },

                    {"resizable", new Puerts.PropertyRegisterInfo(){ IsStatic = false, Getter = G_resizable, Setter = S_resizable} },

                    {"hasChannel", new Puerts.PropertyRegisterInfo(){ IsStatic = false, Getter = G_hasChannel, Setter = S_hasChannel} }
                },
                LazyMembers = new System.Collections.Generic.List<Puerts.LazyMemberRegisterInfo>()
                {   
                }
            };
        }
    
    }
}
