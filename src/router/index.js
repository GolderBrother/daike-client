import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const importViews = file => () => import(`@/views/${file}/index`)
const importComponent = file => () => import(`@/components/${file}/index`)
const constantRouterMap = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: importViews('login')
  },{
    path:'/changePwd',
    name:'changePwd',
    component: importViews('changePwd')
  },
  {
    path:'/404',
    name:'404',
    component: importComponent('NotFound')
  },
  {
    path: '*',
    redirect: '/404'
  },
  {
    path: '/home',
    name: 'home',
    component: importViews('home'),
    children: [
      {
        path: '/home',
        redirect: '/home/mine'
      },
      {
        path: '/home/substitute',
        name: 'substitute',
        component: importViews('substitute'),
      },
      {
        path: '/home/publish',
        name: 'publish',
        component: importViews('publish'),
      },
      {
        path: '/home/course',
        name: 'course',
        component: importViews('course'),
      },
      {
        path: '/home/mine',
        name: 'mine',
        component: importViews('mine'),
      }
    ]
  }, 
]
const router = new Router({
  routes : constantRouterMap
})

export default router
