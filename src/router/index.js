import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import calendar from '@/pages/calendar'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'index',
      component: index,
      meta: {}
    }
  ]
})
