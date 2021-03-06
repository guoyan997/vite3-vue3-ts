/* eslint-disable */
/**
 * @description 根据屏幕宽度动态设置根字体大小
 */
// import { weapon } from './weapon/index.js'
// const { isAndroid } = weapon

function isAndroid() {
    return window.navigator.appVersion.match(/android/gi)
}

const LIB:any = {}
const DESIGN_WIDTH = 1920
const DESIGN_HEIGHT = 1080
let rem2px: { (arg0: any): string; (d: any): any }
let px2rem: { (arg0: any): any; (d: any): any }
let vh2px: (value:number)=>number
let px2vh: (value:number)=>number
let px2px: (value:number)=>number
let winHeight = 0
let winWidth = 0
let dpr = 1

// 视窗高度
if (window.innerHeight) {
    winHeight = window.innerHeight
} else if ((document.body) && (document.body.clientHeight)) {
    winHeight = document.body.clientHeight
}

try {
    const doc = window.document // 文档对象
    const docEl = doc.documentElement // 文档对象元素
    let metaEl = doc.querySelector('meta[name="viewport"]') // viewport 属性设置
    dpr = window.devicePixelRatio || 1 // 屏幕dpr
    let scale = 1 / dpr // viewport 缩放
    let tid: number | undefined // 定时器句柄
    /* viewport 属性设置不存在 */
    if (!metaEl) {
        metaEl = doc.createElement('meta')
        metaEl.setAttribute('name', 'viewport')
        if (docEl.firstElementChild) {
            docEl.firstElementChild.appendChild(metaEl)
        } else {
            let wrap = doc.createElement('div')
            wrap.appendChild(metaEl)
            doc.write(wrap.innerHTML)
        }
    }
    // 安卓手机bug，viewport缩放有问题
    if (isAndroid()) {
        scale = 1
    }
    // 设置viewport
    metaEl.setAttribute('content', 'width=device-width, initial-scale=1,maximum-scale=1, minimum-scale=1,user-scalable=no')
    // 设置data-dpr属性，留作的css hack之用
    docEl.setAttribute('data-dpr', dpr.toString())

    // 设置根字体大小
    const refreshRem = () => {
        winWidth = docEl.getBoundingClientRect().width
        const rem = winWidth / 10
        docEl.style.fontSize = rem + 'px'
        if (window.innerHeight) {
            winHeight = window.innerHeight
        } else if ((document.body) && (document.body.clientHeight)) {
            winHeight = document.body.clientHeight
        }
        LIB.rem = rem
        LIB.winHeight = winHeight
        LIB.winWidth = winWidth
    }
    // 首次加载设置根字体模块
    refreshRem()

    // 监听resize事件，设置根字体大小
    window.addEventListener('resize', () => {
        window.clearTimeout(tid)
        tid = window.setTimeout(refreshRem, 300)
    })

    // 监听页面刷新时间，设置根字体大小
    window.addEventListener('pageshow', (e) => {
        if (e.persisted) { // 如果从缓存读取页面则设置根字体大小
            window.clearTimeout(tid)
            tid = window.setTimeout(refreshRem, 300)
        }
    })

    /* 设置body字体大小为12px */
    if (doc.readyState === 'complete') {
        doc.body.style.fontSize = 12 * dpr + 'px'
    } else {
        doc.addEventListener('DOMContentLoaded', function (e) {
            doc.body.style.fontSize = 12 * dpr + 'px'
        }, false)
    }

    /* rem转换成px */
    rem2px = LIB.rem2px = (d: any) => {
        if (isNaN(d)) {
            return d
        }
        return parseFloat(d) * LIB.rem
    }

    /* px转换成rem */
    px2rem = LIB.px2rem = (d: any) => {
        if (isNaN(d)) {
            return d
        }
        return parseFloat(d) / DESIGN_WIDTH * 10
    }

    /* vh转换成px */
    vh2px = LIB.vh2px = (d: any) => {
        if (isNaN(d)) {
            return d
        }
        return parseFloat(d) / 100 * winHeight
    }

    /* px转换成vh */
    px2vh = LIB.px2vh = (d: any) => {
        if (isNaN(d)) {
            return d
        }
        return parseFloat(d) / DESIGN_HEIGHT * 100
    }
    px2px = LIB.px2px = (d: number) => {
        if (isNaN(d)) {
            return d
        }
        return parseFloat(rem2px(px2rem(d)))
    }
} catch (error) {
    console.error('设置根字体失败：', error)
}

export default LIB
export { rem2px, px2rem, vh2px, px2vh, px2px, winWidth, winHeight }
