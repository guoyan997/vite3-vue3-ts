/*
 * @Description: 工作使我快乐，我爱生活，更爱工作！
 * @Version: 1.0
 * @Autor: GY
 * @Date: 2022-03-10 09:58:56
 * @LastEditors: GY
 * @LastEditTime: 2022-03-11 14:09:27
 */
import type { ECharts } from 'echarts'
import type { Ref } from 'vue'
import { tryOnUnmounted, useDebounceFn } from '@vueuse/core'
import { unref, nextTick, watch, computed, ref } from 'vue'
import { useEventListener } from '@/hooks/useEventListener'
import { init, registerMap } from 'echarts'

interface EventListener {
  (evt: Event): void;
}

export function useECharts(
  elRef: Ref<HTMLDivElement>,
  theme: 'light' | 'dark' | 'default' = 'default', mapName = '', mapGeoJson:any = ''
) {
  let chartInstance: ECharts | null = null
  let resizeFn: EventListener = resize
  const cacheOptions = ref({})
  let removeResizeFn: Function = () => {}

  resizeFn = useDebounceFn(resize, 200)

  const getOptions = computed(() => cacheOptions.value)

  function initCharts(t = theme) {
    const el = unref(elRef)
    if (!el || !unref(el)) {
      return
    }
    chartInstance = init(el, t)
    if (mapName) { 
      registerMap(mapName, mapGeoJson)
    }
    const { removeEvent } = useEventListener({
      el: window,
      name: 'resize',
      listener: resizeFn
    })
    removeResizeFn = removeEvent
  }

  function setOptions(options: any, clear = true) {
    cacheOptions.value = options
    // if (unref(elRef)?.offsetHeight === 0) {
    //   setTimeout(() => {
    //     setOptions(unref(getOptions))
    //   }, 30)
    //   return
    // }
    nextTick(() => {
      setTimeout(() => {
        if (!chartInstance) {
          initCharts('default')
          if (!chartInstance) return
        }
        clear && chartInstance?.clear()
        chartInstance?.setOption(unref(getOptions))
      }, 30)
    })
  }

  function resize() {
    chartInstance?.resize()
  }

  watch(
    () => theme,
    (newData) => {
      if (chartInstance) {
        chartInstance.dispose()
        initCharts(newData as 'default')
        setOptions(cacheOptions.value)
      }
    }
  )

  tryOnUnmounted(() => {
    if (!chartInstance) return
    removeResizeFn()
    console.log('**********销毁echarts实例')
    chartInstance.dispose()
    chartInstance = null
  })

  function getInstance(): ECharts | null {
    if (!chartInstance) {
      initCharts('default')
    }
    return chartInstance
  }

  return {
    setOptions,
    resize,
    getInstance
  }
}
