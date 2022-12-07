
using System;
using Puerts;

namespace PuertsStaticWrap
{
    public static class FairyGUI_NGraphics_Wrap 
    {
    
    
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8ConstructorCallback))]
        private static IntPtr Constructor(IntPtr isolate, IntPtr info, int paramLen, long data)
        {
            try
            {

    
            
                {
                
                    IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                    object argobj0 = null;
                    JsValueType argType0 = JsValueType.Invalid;
                
                
                    

                    {
                    
                        argobj0 = argobj0 != null ? argobj0 : StaticTranslate<UnityEngine.GameObject>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value0, false); UnityEngine.GameObject arg0 = (UnityEngine.GameObject)argobj0;
                    
                        var result = new FairyGUI.NGraphics(arg0);

                    

                    
                        return Puerts.Utils.GetObjectPtr((int)data, typeof(FairyGUI.NGraphics), result);
                    
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
        private static void M_SetShaderAndTexture(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.NGraphics;
        
        
                {
            
                
                    IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                    object argobj0 = null;
                    JsValueType argType0 = JsValueType.Invalid;
                
                    IntPtr v8Value1 = PuertsDLL.GetArgumentValue(info, 1);
                    object argobj1 = null;
                    JsValueType argType1 = JsValueType.Invalid;
                
                
                    
                    {
                    
                        string arg0 = (string)PuertsDLL.GetStringFromValue(isolate, v8Value0, false);
                    
                        argobj1 = argobj1 != null ? argobj1 : StaticTranslate<FairyGUI.NTexture>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value1, false); FairyGUI.NTexture arg1 = (FairyGUI.NTexture)argobj1;
                    

                        obj.SetShaderAndTexture (arg0, arg1);

                    
                        
                    
                        
                    
                        
                        
                        
                    }
                
                }
            
        
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
    
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void M_SetMaterial(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.NGraphics;
        
        
                {
            
                
                    IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                    object argobj0 = null;
                    JsValueType argType0 = JsValueType.Invalid;
                
                
                    
                    {
                    
                        argobj0 = argobj0 != null ? argobj0 : StaticTranslate<UnityEngine.Material>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value0, false); UnityEngine.Material arg0 = (UnityEngine.Material)argobj0;
                    

                        obj.SetMaterial (arg0);

                    
                        
                    
                        
                        
                        
                    }
                
                }
            
        
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
    
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void M_ToggleKeyword(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.NGraphics;
        
        
                {
            
                
                    IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                    object argobj0 = null;
                    JsValueType argType0 = JsValueType.Invalid;
                
                    IntPtr v8Value1 = PuertsDLL.GetArgumentValue(info, 1);
                    object argobj1 = null;
                    JsValueType argType1 = JsValueType.Invalid;
                
                
                    
                    {
                    
                        string arg0 = (string)PuertsDLL.GetStringFromValue(isolate, v8Value0, false);
                    
                        bool arg1 = (bool)PuertsDLL.GetBooleanFromValue(isolate, v8Value1, false);
                    

                        obj.ToggleKeyword (arg0, arg1);

                    
                        
                    
                        
                    
                        
                        
                        
                    }
                
                }
            
        
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
    
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void M_Tint(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.NGraphics;
        
        
                {
            
                
                
                    
                    {
                    

                        obj.Tint ();

                    
                        
                        
                        
                    }
                
                }
            
        
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
    
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void M_SetMeshDirty(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.NGraphics;
        
        
                {
            
                
                
                    
                    {
                    

                        obj.SetMeshDirty ();

                    
                        
                        
                        
                    }
                
                }
            
        
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
    
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void M_UpdateMesh(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.NGraphics;
        
        
                {
            
                
                
                    
                    {
                    

                        var result = obj.UpdateMesh ();

                    
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
        private static void M_Dispose(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.NGraphics;
        
        
                {
            
                
                
                    
                    {
                    

                        obj.Dispose ();

                    
                        
                        
                        
                    }
                
                }
            
        
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
    
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void M_Update(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.NGraphics;
        
        
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
                    
                        argobj0 = argobj0 != null ? argobj0 : StaticTranslate<FairyGUI.UpdateContext>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value0, false); FairyGUI.UpdateContext arg0 = (FairyGUI.UpdateContext)argobj0;
                    
                        float arg1 = (float)PuertsDLL.GetNumberFromValue(isolate, v8Value1, false);
                    
                        bool arg2 = (bool)PuertsDLL.GetBooleanFromValue(isolate, v8Value2, false);
                    

                        obj.Update (arg0, arg1, arg2);

                    
                        
                    
                        
                    
                        
                    
                        
                        
                        
                    }
                
                }
            
        
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
    
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void M_OnPopulateMesh(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.NGraphics;
        
        
                {
            
                
                    IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                    object argobj0 = null;
                    JsValueType argType0 = JsValueType.Invalid;
                
                
                    
                    {
                    
                        argobj0 = argobj0 != null ? argobj0 : StaticTranslate<FairyGUI.VertexBuffer>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value0, false); FairyGUI.VertexBuffer arg0 = (FairyGUI.VertexBuffer)argobj0;
                    

                        obj.OnPopulateMesh (arg0);

                    
                        
                    
                        
                        
                        
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
        private static void G_gameObject(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.NGraphics;
                var result = obj.gameObject;
                Puerts.ResultHelper.Set((int)data, isolate, info, result);
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
            
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void G_meshFilter(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.NGraphics;
                var result = obj.meshFilter;
                Puerts.ResultHelper.Set((int)data, isolate, info, result);
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
            
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void G_meshRenderer(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.NGraphics;
                var result = obj.meshRenderer;
                Puerts.ResultHelper.Set((int)data, isolate, info, result);
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
            
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void G_mesh(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.NGraphics;
                var result = obj.mesh;
                Puerts.ResultHelper.Set((int)data, isolate, info, result);
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
            
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void G_meshFactory(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.NGraphics;
                var result = obj.meshFactory;
                Puerts.ResultHelper.Set((int)data, isolate, info, result);
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
            
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void S_meshFactory(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.NGraphics;
                IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                object argobj0 = null;
                argobj0 = argobj0 != null ? argobj0 : StaticTranslate<FairyGUI.IMeshFactory>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value0, false); FairyGUI.IMeshFactory arg0 = (FairyGUI.IMeshFactory)argobj0;
                obj.meshFactory = arg0;
                
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
            
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void G_contentRect(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.NGraphics;
                var result = obj.contentRect;
                Puerts.ResultHelper.Set((int)data, isolate, info, result);
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
            
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void S_contentRect(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.NGraphics;
                IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                object argobj0 = null;
                argobj0 = argobj0 != null ? argobj0 : StaticTranslate<UnityEngine.Rect>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value0, false); UnityEngine.Rect arg0 = (UnityEngine.Rect)argobj0;
                obj.contentRect = arg0;
                
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
            
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void G_flip(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.NGraphics;
                var result = obj.flip;
                Puerts.PuertsDLL.ReturnNumber(isolate, info, (int)result);
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
            
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void S_flip(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.NGraphics;
                IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                object argobj0 = null;
                FairyGUI.FlipType arg0 = (FairyGUI.FlipType)StaticTranslate<int>.Get((int)data, isolate, Puerts.NativeValueApi.GetValueFromArgument, v8Value0, false);
                obj.flip = arg0;
                
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
            
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void G_texture(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.NGraphics;
                var result = obj.texture;
                Puerts.ResultHelper.Set((int)data, isolate, info, result);
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
            
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void S_texture(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.NGraphics;
                IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                object argobj0 = null;
                argobj0 = argobj0 != null ? argobj0 : StaticTranslate<FairyGUI.NTexture>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value0, false); FairyGUI.NTexture arg0 = (FairyGUI.NTexture)argobj0;
                obj.texture = arg0;
                
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
            
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void G_shader(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.NGraphics;
                var result = obj.shader;
                Puerts.PuertsDLL.ReturnString(isolate, info, result);
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
            
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void S_shader(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.NGraphics;
                IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                object argobj0 = null;
                string arg0 = (string)PuertsDLL.GetStringFromValue(isolate, v8Value0, false);
                obj.shader = arg0;
                
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
            
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void G_material(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.NGraphics;
                var result = obj.material;
                Puerts.ResultHelper.Set((int)data, isolate, info, result);
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
            
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void S_material(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.NGraphics;
                IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                object argobj0 = null;
                argobj0 = argobj0 != null ? argobj0 : StaticTranslate<UnityEngine.Material>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value0, false); UnityEngine.Material arg0 = (UnityEngine.Material)argobj0;
                obj.material = arg0;
                
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
            
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void G_materialKeywords(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.NGraphics;
                var result = obj.materialKeywords;
                Puerts.ResultHelper.Set((int)data, isolate, info, result);
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
            
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void S_materialKeywords(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.NGraphics;
                IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                object argobj0 = null;
                argobj0 = argobj0 != null ? argobj0 : StaticTranslate<string[]>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value0, false); string[] arg0 = (string[])argobj0;
                obj.materialKeywords = arg0;
                
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
            
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void G_enabled(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.NGraphics;
                var result = obj.enabled;
                Puerts.PuertsDLL.ReturnBoolean(isolate, info, result);
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
            
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void S_enabled(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.NGraphics;
                IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                object argobj0 = null;
                bool arg0 = (bool)PuertsDLL.GetBooleanFromValue(isolate, v8Value0, false);
                obj.enabled = arg0;
                
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
            
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void G_sortingOrder(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.NGraphics;
                var result = obj.sortingOrder;
                Puerts.PuertsDLL.ReturnNumber(isolate, info, result);
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
            
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void S_sortingOrder(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.NGraphics;
                IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                object argobj0 = null;
                int arg0 = (int)PuertsDLL.GetNumberFromValue(isolate, v8Value0, false);
                obj.sortingOrder = arg0;
                
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
            
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void G_color(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.NGraphics;
                var result = obj.color;
                Puerts.ResultHelper.Set((int)data, isolate, info, result);
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
            
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void S_color(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.NGraphics;
                IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                object argobj0 = null;
                argobj0 = argobj0 != null ? argobj0 : StaticTranslate<UnityEngine.Color>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value0, false); UnityEngine.Color arg0 = (UnityEngine.Color)argobj0;
                obj.color = arg0;
                
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
            
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void G_vertexMatrix(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.NGraphics;
                var result = obj.vertexMatrix;
                Puerts.ResultHelper.Set((int)data, isolate, info, result);
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
            
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void S_vertexMatrix(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.NGraphics;
                IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                object argobj0 = null;
                argobj0 = argobj0 != null ? argobj0 : StaticTranslate<FairyGUI.NGraphics.VertexMatrix>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value0, false); FairyGUI.NGraphics.VertexMatrix arg0 = (FairyGUI.NGraphics.VertexMatrix)argobj0;
                obj.vertexMatrix = arg0;
                
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
            
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void G_materialPropertyBlock(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.NGraphics;
                var result = obj.materialPropertyBlock;
                Puerts.ResultHelper.Set((int)data, isolate, info, result);
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
            
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void G_blendMode(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.NGraphics;
                var result = obj.blendMode;
                Puerts.PuertsDLL.ReturnNumber(isolate, info, (int)result);
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
            
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void S_blendMode(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.NGraphics;
                IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                object argobj0 = null;
                FairyGUI.BlendMode arg0 = (FairyGUI.BlendMode)StaticTranslate<int>.Get((int)data, isolate, Puerts.NativeValueApi.GetValueFromArgument, v8Value0, false);
                obj.blendMode = arg0;
                
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
            
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void G_dontClip(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.NGraphics;
                var result = obj.dontClip;
                Puerts.PuertsDLL.ReturnBoolean(isolate, info, result);
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
            
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void S_dontClip(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.NGraphics;
                IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                object argobj0 = null;
                bool arg0 = (bool)PuertsDLL.GetBooleanFromValue(isolate, v8Value0, false);
                obj.dontClip = arg0;
                
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
        private static void A_meshModifier(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.NGraphics;
                IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                object argobj0 = null;
                argobj0 = argobj0 != null ? argobj0 : StaticTranslate<System.Action>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value0, false); System.Action arg0 = (System.Action)argobj0;
                obj.meshModifier += arg0;
            }
            catch (Exception e)
            {
                Puerts.PuertsDLL.ThrowException(isolate, "c# exception:" + e.Message + ",stack:" + e.StackTrace);
            }
        }
            
        [Puerts.MonoPInvokeCallback(typeof(Puerts.V8FunctionCallback))]
        private static void R_meshModifier(IntPtr isolate, IntPtr info, IntPtr self, int paramLen, long data)
        {
            try
            {
                var obj = Puerts.Utils.GetSelf((int)data, self) as FairyGUI.NGraphics;
                IntPtr v8Value0 = PuertsDLL.GetArgumentValue(info, 0);
                object argobj0 = null;
                argobj0 = argobj0 != null ? argobj0 : StaticTranslate<System.Action>.Get((int)data, isolate, NativeValueApi.GetValueFromArgument, v8Value0, false); System.Action arg0 = (System.Action)argobj0;
                obj.meshModifier -= arg0;
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
                    { new Puerts.MethodKey { Name = "SetShaderAndTexture", IsStatic = false}, M_SetShaderAndTexture },
                    { new Puerts.MethodKey { Name = "SetMaterial", IsStatic = false}, M_SetMaterial },
                    { new Puerts.MethodKey { Name = "ToggleKeyword", IsStatic = false}, M_ToggleKeyword },
                    { new Puerts.MethodKey { Name = "Tint", IsStatic = false}, M_Tint },
                    { new Puerts.MethodKey { Name = "SetMeshDirty", IsStatic = false}, M_SetMeshDirty },
                    { new Puerts.MethodKey { Name = "UpdateMesh", IsStatic = false}, M_UpdateMesh },
                    { new Puerts.MethodKey { Name = "Dispose", IsStatic = false}, M_Dispose },
                    { new Puerts.MethodKey { Name = "Update", IsStatic = false}, M_Update },
                    { new Puerts.MethodKey { Name = "OnPopulateMesh", IsStatic = false}, M_OnPopulateMesh },

                    { new Puerts.MethodKey { Name = "add_meshModifier", IsStatic = false}, A_meshModifier },
                    { new Puerts.MethodKey { Name = "remove_meshModifier", IsStatic = false},  R_meshModifier }
                },
                Properties = new System.Collections.Generic.Dictionary<string, Puerts.PropertyRegisterInfo>()
                {
                    
                    {"gameObject", new Puerts.PropertyRegisterInfo(){ IsStatic = false, Getter = G_gameObject, Setter = null} },

                    {"meshFilter", new Puerts.PropertyRegisterInfo(){ IsStatic = false, Getter = G_meshFilter, Setter = null} },

                    {"meshRenderer", new Puerts.PropertyRegisterInfo(){ IsStatic = false, Getter = G_meshRenderer, Setter = null} },

                    {"mesh", new Puerts.PropertyRegisterInfo(){ IsStatic = false, Getter = G_mesh, Setter = null} },

                    {"meshFactory", new Puerts.PropertyRegisterInfo(){ IsStatic = false, Getter = G_meshFactory, Setter = S_meshFactory} },

                    {"contentRect", new Puerts.PropertyRegisterInfo(){ IsStatic = false, Getter = G_contentRect, Setter = S_contentRect} },

                    {"flip", new Puerts.PropertyRegisterInfo(){ IsStatic = false, Getter = G_flip, Setter = S_flip} },

                    {"texture", new Puerts.PropertyRegisterInfo(){ IsStatic = false, Getter = G_texture, Setter = S_texture} },

                    {"shader", new Puerts.PropertyRegisterInfo(){ IsStatic = false, Getter = G_shader, Setter = S_shader} },

                    {"material", new Puerts.PropertyRegisterInfo(){ IsStatic = false, Getter = G_material, Setter = S_material} },

                    {"materialKeywords", new Puerts.PropertyRegisterInfo(){ IsStatic = false, Getter = G_materialKeywords, Setter = S_materialKeywords} },

                    {"enabled", new Puerts.PropertyRegisterInfo(){ IsStatic = false, Getter = G_enabled, Setter = S_enabled} },

                    {"sortingOrder", new Puerts.PropertyRegisterInfo(){ IsStatic = false, Getter = G_sortingOrder, Setter = S_sortingOrder} },

                    {"color", new Puerts.PropertyRegisterInfo(){ IsStatic = false, Getter = G_color, Setter = S_color} },

                    {"vertexMatrix", new Puerts.PropertyRegisterInfo(){ IsStatic = false, Getter = G_vertexMatrix, Setter = S_vertexMatrix} },

                    {"materialPropertyBlock", new Puerts.PropertyRegisterInfo(){ IsStatic = false, Getter = G_materialPropertyBlock, Setter = null} },

                    {"blendMode", new Puerts.PropertyRegisterInfo(){ IsStatic = false, Getter = G_blendMode, Setter = S_blendMode} },

                    {"dontClip", new Puerts.PropertyRegisterInfo(){ IsStatic = false, Getter = G_dontClip, Setter = S_dontClip} }
                },
                LazyMembers = new System.Collections.Generic.List<Puerts.LazyMemberRegisterInfo>()
                {   
                }
            };
        }
    
    }
}
