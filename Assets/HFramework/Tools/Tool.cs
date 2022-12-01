using UnityEngine;
using UnityEngine.Events;
using UnityEngine.EventSystems;

namespace HFramework
{
    public static class Tool
    {

        /// <summary>
        /// 给物体添加点击事件
        /// </summary>
        /// <param name="gameObject"></param>
        /// <param name="triggerType"></param>
        /// <param name="action"></param>
        public static void AddEventTriggerListener(this GameObject gameObject, EventTriggerType triggerType, UnityAction<BaseEventData> action)
        {
            EventTrigger eventTrigger = gameObject.GetComponent<EventTrigger>();
            if (eventTrigger == null)
            {
                eventTrigger = gameObject.AddComponent<EventTrigger>();
            }

            EventTrigger.Entry entry = eventTrigger.triggers.Find((trigger) => trigger.eventID == triggerType);
            if (entry == null)
            {
                entry = new EventTrigger.Entry() { eventID = triggerType };
                eventTrigger.triggers.Add(entry);
            }
            entry.callback.AddListener(action);
        }

    }
}

