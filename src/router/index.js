import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  //{path: '/', components: () => import('@/views/index')},
  {
    path: '/',
    component: Layout,
    redirect:'',
    children:[
      {
        path:'',
        component: () => import('@/views/index')
      },
      {
        path:'/house',
        component: () => import('@/views/house/index'),
        name:"house"
      },
      {
        path:'/immigrant',
        component: () => import('@/views/immigrant/index'),
        name:"immigrant"
      },
      {
        path:'/immigrant/detail',
        component: () => import('@/views/immigrant/detail/index')
      },

      {
        path:'/house/detail',
        component: () => import('@/views/house/detail/index')
      },
      {
        path:'/forget',
        component: () => import('@/views/forget/index')
      },
      {
        path:"/news/(\hot[0-9]{0,2}\)/detail",
        //path:"/news/:tagid/detail",
        component: () => import('@/views/news/detail/index')
      },
      {
        path:'/news',
        component: () => import('@/views/news/index'),
        redirect:"hot2",
        children:[
          {
            path:'',
            redirect:"hot2"
          },
          {
            path:"(\hot[0-9]{0,2}\)",
            component: () => import('@/views/news/list/index'),
          }
        ]
      },

      {
        path:'/news/detail',
        component: () => import('@/views/news/detail/index')
      },
      {
        path:'/activity',
        component: () => import('@/views/activity/index')
      },
      {
        path:'/activity/detail',
        component: () => import('@/views/activity/detail/index')
      },
      {
        path:'/user',
        component: () => import('@/views/user/index'),
        children:[
          {
            path:'/',
            redirect:"profile"
          },
          {
            path:'profile',
            component: () => import('@/views/user/profile')
          },
          {
            path:'order',
            component: () => import('@/views/user/order')
          },
          {
            path:'loan',
            component: () => import('@/views/user/loan')
          },
          {
            path:'collect',
            component: () => import('@/views/user/collect')
          },
          {
            path:'assess',
            component: () => import('@/views/user/assess')
          },
          {
            path:'vip',
            component: () => import('@/views/user/vip')
          },
          {
            path:'invite',
            component: () => import('@/views/user/invite')
          }
        ]
      },

      {
        path:'/about',
        component: () => import('@/views/about/index'),
        children:[
          {
            path:'/',
            component: () => import('@/views/about/introduction')
          },
          {
            path:'concact',
            component: () => import('@/views/about/concact')
          },
          {
            path:'joinus',
            component: () => import('@/views/about/joinus')
          },
          {
            path:'privacy',
            component: () => import('@/views/about/privacy')
          },
        ]
      }
    ]
  },

  {path: '/404', component: () => import('@/views/404')},
  {path: '/500', component: () => import('@/views/500')},

  {path: '*', redirect: '/404', hidden: true}
]

export default new Router({
  mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap,

})

