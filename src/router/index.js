import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import tvList from '@/pages/tvList'
import shop from '@/pages/shop'
import my from '@/pages/my'
import shopDetail from '@/pages/shopDetail'
import tvDetail from '@/pages/tvDetail'
import tvcloums from '@/pages/tvcloums'
import emcee from '@/pages/emcee'
import myCollect from '@/pages/myCollect'
import myOrder from '@/pages/myOrder'
import myApply from '@/pages/myApply'
import applyPage1 from '@/pages/applyPage1'
import applyPage2 from '@/pages/applyPage2'
import login from '@/pages/login'
import register from '@/pages/register'
import userIndex from '@/pages/userIndex'
import getChance from '@/pages/getChance'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/index',
      name: 'index',
      component: index,
      meta: {}
    },
    {
      path: '/',
      name: '/userIndex',
      component: userIndex,
      meta: {}
    },
    {
      path: '/register',
      name: '/register',
      component: register,
      meta: {}
    },
    {
      path: '/getChance',
      name: '/getChance',
      component: getChance,
      meta: {}
    },
    {
      path: '/tvList',
      name: '/tvList',
      component: tvList,
      meta: {}
    },
    {
      path: '/login',
      name: '/login',
      component: login,
      meta: {}
    },
    {
      path: '/applyPage1',
      name: '/applyPage1',
      component: applyPage1,
      meta: {}
    },
    {
      path: '/applyPage2',
      name: '/applyPage2',
      component: applyPage2,
      meta: {}
    },
    {
      path: '/myApply',
      name: '/myApply',
      component: myApply,
      meta: {}
    },
    {
      path: '/myOrder',
      name: '/myOrder',
      component: myOrder,
      meta: {}
    },
    {
      path: '/myCollect',
      name: '/myCollect',
      component: myCollect,
      meta: {}
    },
    {
      path: '/tvcloums',
      name: '/tvcloums',
      component: tvcloums,
      meta: {}
    },
    {
      path: '/emcee',
      name: '/emcee',
      component: emcee,
      meta: {}
    },
    {
      path: '/shopDetail',
      name: '/shopDetail',
      component: shopDetail,
      meta: {}
    },
    {
      path: '/tvDetail',
      name: '/tvDetail',
      component: tvDetail,
      meta: {}
    },
    {
      path: '/shop',
      name: '/shop',
      component: shop,
      meta: {}
    },
    {
      path: '/my',
      name: '/my',
      component: my,
      meta: {}
    }
  ]
})
