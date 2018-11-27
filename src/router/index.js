import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import mapPage from '@/pages/mapPage'
import maintenanceRegistration from '@/pages/maintenanceRegistration'
import workTime from '@/pages/workTime'
import my from '@/pages/my'
import changePassword from '@/pages/changePassword'
import extraCharge from '@/pages/extraCharge'
import installationKit from '@/pages/installationKit'
import workDetail from '@/pages/workDetail'
import evaluate from '@/pages/evaluate'
import goTelephone from '@/pages/goTelephone'
import dealScene from '@/pages/dealScene'
import detailTable from '@/pages/detailTable'
import repairItem from '@/pages/repairItem'
import privacyStatement from '@/pages/privacyStatement'
import calendar from '@/pages/calendar'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'index',
      component: index,
      meta: {}
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: calendar,
      meta: {
        noCache: true
      }
    },
    {
      path: '/mapPage',
      name: 'mapPage',
      component: mapPage,
      meta: {
        noCache: true
      }
    },
    {
      path: '/maintenanceRegistration',
      name: 'maintenanceRegistration',
      component: maintenanceRegistration,
      meta: {}
    },
    {
      path: '/workTime',
      name: 'workTime',
      component: workTime,
      meta: {}
    },
    {
      path: '/my',
      name: 'my',
      component: my,
      meta: {}
    },
    {
      path: '/changePassword',
      name: 'changePassword',
      component: changePassword,
      meta: {}
    },
    {
      path: '/workDetail',
      name: 'workDetail',
      component: workDetail
    },
    {
      path: '/extraCharge',
      name: 'extraCharge',
      component: extraCharge,
      meta: {}
    },
    {
      path: '/installationKit',
      name: 'installationKit',
      component: installationKit,
      meta: {},
    },
    {
      path: '/r',
      name: 'evaluate',
      component: evaluate,
      meta: {},
    },
    {
      path: '/goTelephone',
      name: 'goTelephone',
      component: goTelephone,
      meta: {
        noCache: true
      },
    },
    {
      path: '/dealScene',
      name: 'dealScene',
      component: dealScene,
      meta: {},
    },
    {
      path: '/repairItem',
      name: 'repairItem',
      component: repairItem,
      meta: {},
    },
    {
      path: '/detailTable',
      name: 'detailTable',
      component: detailTable,
      meta: {},
    },
    {
      path: '/privacyStatement',
      name: 'privacyStatement',
      component: privacyStatement,
      meta: {},
    }
  ]
})
