﻿using HFramework;
using Puerts;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using UnityEngine;
using UnityEngine.SceneManagement;

public class JsManager:Singleton<JsManager>
{
    JsEnv jsEnv = null;
    public Dictionary<string, string> jscache = new Dictionary<string, string>();

    public Action JsOnApplicationQuit;
    public Action JsOnDispose;

    public JsEnv GetJsEnv()
    {
        return jsEnv;
    }

    public void Update()
    {
        if (jsEnv != null)
        {
            jsEnv.Tick();
        }
    }

    async Task InitJsEnv()
    {
        //预加载JS ，在JSEnv初始化前调用
        await ResManager.PreloadJS("JS");

        //调试端口：8080
        jsEnv = new JsEnv(new JsLoader(), 8080);
        // jsEnv.ExecuteFile("puerts/flatbuffers.js");
        if (jsEnv == null)
        {
            Debug.Log("InitJsEnv null!!!");
        }
       
        //声明Action： 值类型才需要这样添加
        jsEnv.UsingAction<float>();
        jsEnv.UsingAction<float, float>();
        jsEnv.UsingAction<string, byte[]>();
        jsEnv.UsingAction<Scene, LoadSceneMode>();

    }

    public async void StartGame()
    {
        await InitJsEnv();

        if (jsEnv != null)
        {
            try
            {
                jsEnv.Eval(@"require('bundle.mjs')");

            }catch(Exception e)
            {
                Debug.Log(e.ToString());
            }
            
        }
    }

    public async void Restart()
    {
        Dispose();

        await InitJsEnv();
        StartGame();
    }

    private void OnApplicationQuit()
    {
        if (jsEnv != null)
        {
            JsOnApplicationQuit?.Invoke();
        }
    }

    public void Dispose()
    {
        JsOnDispose?.Invoke();

        if (jsEnv != null){
            try
            {
                jsEnv.Dispose();
                jsEnv = null;
            }catch(Exception ex)
            {
                string msg = string.Format("js exception : {0}\n {1}", ex.Message, ex.StackTrace);
                Debug.Log(msg);
            }
        }
    }
}

