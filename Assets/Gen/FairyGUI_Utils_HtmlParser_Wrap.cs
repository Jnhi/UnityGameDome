
using System;
using Puerts;

namespace PuertsStaticWrap
{
    public static class FairyGUI_Utils_HtmlParser_Wrap 
    {
    
    
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8ConstructorCallback))]
        private static IntPtr Constructor(IntPtr isolate, IntPtr info, int paramLen, long data)
        {
            try
            {

    
            
                {
                
                
                    

                    {
                    
                        var result = new FairyGUI.Utils.HtmlParser();

                    

                    
                        return Puerts.Utils.GetObjectPtr((int)data, typeof(FairyGUI.Utils.HtmlParser), result);
                    
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
        private static void M_Parse(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.Utils.HtmlParser;
        
        
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
                    
                        string arg0 = (string)PuertsDLL.GetStringFromValue(isolate, v8Value0, false);
                    
                        argobj1 = argobj1 != null ? argobj1 : StaticTranslate<FairyGUI.TextFormat>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value1, false); FairyGUI.TextFormat arg1 = (FairyGUI.TextFormat)argobj1;
                    
                        argobj2 = argobj2 != null ? argobj2 : StaticTranslate<System.Collections.Generic.List<FairyGUI.Utils.HtmlElement>>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value2, false); System.Collections.Generic.List<FairyGUI.Utils.HtmlElement> arg2 = (System.Collections.Generic.List<FairyGUI.Utils.HtmlElement>)argobj2;
                    
                        argobj3 = argobj3 != null ? argobj3 : StaticTranslate<FairyGUI.Utils.HtmlParseOptions>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value3, false); FairyGUI.Utils.HtmlParseOptions arg3 = (FairyGUI.Utils.HtmlParseOptions)argobj3;
                    

                        obj.Parse (arg0, arg1, arg2, arg3);

                    
                        
                    
                        
                    
                        
                    
                        
                    
                        
                        
                        
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
        private static void G_inst(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                
                var result = FairyGUI.Utils.HtmlParser.inst;
                Puerts.ResultHelper.Set((int)data, isolate, info, result);
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
            
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void S_inst(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                
                IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                object argobj0 = null;
                argobj0 = argobj0 != null ? argobj0 : StaticTranslate<FairyGUI.Utils.HtmlParser>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value0, false); FairyGUI.Utils.HtmlParser arg0 = (FairyGUI.Utils.HtmlParser)argobj0;
                FairyGUI.Utils.HtmlParser.inst = arg0;
                
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
                    { new Puerts.MethodKey { Name = "Parse", IsStatic = false}, M_Parse }
                },
                Properties = new System.Collections.Generic.Dictionary<string, Puerts.PropertyRegisterInfo>()
                {
                    
                    {"inst", new Puerts.PropertyRegisterInfo(){ IsStatic = true, Getter = G_inst, Setter = S_inst} }
                },
                LazyMembers = new System.Collections.Generic.List<Puerts.LazyMemberRegisterInfo>()
                {   
                }
            };
        }
    
    }
}
