
using System;
using Puerts;

namespace PuertsStaticWrap
{
    public static class FairyGUI_Utils_XMLList_Enumerator_Wrap 
    {
    
    
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8ConstructorCallback))]
        private static IntPtr Constructor(IntPtr isolate, IntPtr info, int paramLen, long data)
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
                
                
                    
                    if (ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.NullOrUndefined | Puerts.JsValueType.NativeObject, typeof(System.Collections.Generic.List<FairyGUI.Utils.XML>), false, false, v8Value0, ref argobj0, ref argType0) && ArgHelper.IsMatch((int)data, isolate, Puerts.JsValueType.NullOrUndefined | Puerts.JsValueType.String, typeof(string), false, false, v8Value1, ref argobj1, ref argType1))
                    

                    {
                    
                        argobj0 = argobj0 != null ? argobj0 : StaticTranslate<System.Collections.Generic.List<FairyGUI.Utils.XML>>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value0, false); System.Collections.Generic.List<FairyGUI.Utils.XML> arg0 = (System.Collections.Generic.List<FairyGUI.Utils.XML>)argobj0;
                    
                        string arg1 = (string)PuertsDLL.GetStringFromValue(isolate, v8Value1, false);
                    
                        var result = new FairyGUI.Utils.XMLList.Enumerator(arg0, arg1);

                    

                    
                        return Puerts.Utils.GetObjectPtr((int)data, typeof(FairyGUI.Utils.XMLList.Enumerator), result);
                    
                    }
                    
                }
        
            
                if (paramLen == 0)
            
                {
                
                
                    

                    {
                    
                        var result = new FairyGUI.Utils.XMLList.Enumerator();

                    

                    
                        return Puerts.Utils.GetObjectPtr((int)data, typeof(FairyGUI.Utils.XMLList.Enumerator), result);
                    
                    }
                    
                }
        


                Puerts.PuertsDLL.ThrowException(isolate, "invalid arguments to " + typeof(FairyGUI.Utils.XMLList.Enumerator).GetFriendlyName() + " constructor");

            } catch (Exception e) {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
            return IntPtr.Zero;
        }
    // ==================== constructor end ====================

    // ==================== methods start ====================

        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void M_MoveNext(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = (FairyGUI.Utils.XMLList.Enumerator)Puerts.Utils.GetSelf((int)data, self);
        
        
                {
            
                
                
                    
                    {
                    

                        var result = obj.MoveNext ();

                    
                        Puerts.PuertsDLL.ReturnBoolean(isolate, info, result);
                        Puerts.Utils.SetSelf((int)data, self, obj);
                        
                    }
                
                }
            
        
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
    
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void M_Erase(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = (FairyGUI.Utils.XMLList.Enumerator)Puerts.Utils.GetSelf((int)data, self);
        
        
                {
            
                
                
                    
                    {
                    

                        obj.Erase ();

                    
                        
                        Puerts.Utils.SetSelf((int)data, self, obj);
                        
                    }
                
                }
            
        
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
    
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void M_Reset(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = (FairyGUI.Utils.XMLList.Enumerator)Puerts.Utils.GetSelf((int)data, self);
        
        
                {
            
                
                
                    
                    {
                    

                        obj.Reset ();

                    
                        
                        Puerts.Utils.SetSelf((int)data, self, obj);
                        
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
        private static void G_Current(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = (FairyGUI.Utils.XMLList.Enumerator)Puerts.Utils.GetSelf((int)data, self);
                var result = obj.Current;
                Puerts.ResultHelper.Set((int)data, isolate, info, result);
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
                    { new Puerts.MethodKey { Name = "MoveNext", IsStatic = false}, M_MoveNext },
                    { new Puerts.MethodKey { Name = "Erase", IsStatic = false}, M_Erase },
                    { new Puerts.MethodKey { Name = "Reset", IsStatic = false}, M_Reset }
                },
                Properties = new System.Collections.Generic.Dictionary<string, Puerts.PropertyRegisterInfo>()
                {
                    
                    {"Current", new Puerts.PropertyRegisterInfo(){ IsStatic = false, Getter = G_Current, Setter = null} }
                },
                LazyMembers = new System.Collections.Generic.List<Puerts.LazyMemberRegisterInfo>()
                {   
                }
            };
        }
    
    }
}
