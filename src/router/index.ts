/*
 * @Description: 工作使我快乐，我爱生活，更爱工作！
 * @Version: 1.0
 * @Autor: GY
 * @Date: 2022-02-21 17:02:43
 * @LastEditors: GY
 * @LastEditTime: 2022-04-13 11:17:47
 */
/*
 * :Date: 2022-02-21 17:02:43
 * :LastEditTime: 2022-02-21 17:19:42
 * :Description: created by GY
 * :LastEditors: gy
 */
import { createRouter, RouteRecordRaw, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'HelloWorld',
    component: Home
  },
  {
    path: '/user',
    name: 'User',
    // route level code-splitting
    // this generates a separate chunk (user.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "User" */ '../views/user/index.vue')
  },
  {
    path: '/pageView',
    name: 'pageView',
    // route level code-splitting
    // this generates a separate chunk (user.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "User" */ '../views/pageView/index.vue')
  },
  {
    path: '/charts',
    name: 'charts',
    // route level code-splitting
    // this generates a separate chunk (user.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "User" */ '../views/charts/index.vue')
  },
  {
    path: '/sky',
    name: 'sky',
    // route level code-splitting
    // this generates a separate chunk (user.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "User" */ '../views/bg/skyBg.vue')
  },
  {
    path: '/rem',
    name: 'rem',
    // route level code-splitting
    // this generates a separate chunk (user.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "User" */ '../views/rem/index.vue')
  },
  {
    path: '/404',
    name: 'notFound',
    component: () => import(/* webpackChunkName: "notFind" */ '../views/error/notFind.vue')
  },
  {
    path: '/:pathMatch(.*)', // 此处需特别注意置于最底部,vue-router4 要这样写，之前低版本用*
    redirect: '/404'
  }  
]

const router = createRouter({
  // v3Test 与打包后放到服务器容器的文件夹名称一致
  history: createWebHistory('v3Test'),
  routes
})
router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})
  
router.afterEach(() => {
  NProgress.done()
})
export default router