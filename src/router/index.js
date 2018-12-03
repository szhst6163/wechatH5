import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import tvList from '@/pages/tvList'
import shop from '@/pages/shop'
import my from '@/pages/my'
import shopDetail from '@/pages/shopDetail'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'index',
      component: index,
      meta: {}
    },
    {
      path: '/tvList',
      name: '/tvList',
      component: tvList,
      meta: {}
    },
    {
      path: '/shopDetail',
      name: '/shopDetail',
      component: shopDetail,
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
