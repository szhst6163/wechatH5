import Vuex from 'vuex'
import Vue from 'vue'
import formatDate from "../lib/formatDate";
import clone from "../lib/json/clone";
// import VConsole from 'vconsole/dist/vconsole.min.js'
// if (process.env.NODE_ENV = == 'development') {
//   let vConsole = new VConsole();
// }
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    startDate: '',
    endDate: '',
    repairInfo: {},
  },
  getters: {
    startDate: state => state.startDate,
    endDate: state => state.endDate,
    repairInfo: state => state.repairInfo,
  },
  mutations: {
    setRepairInfo(state, evt) {
      state.repairInfo[evt.name] = evt.data
    },
    setDealScene(state, evt) {
      state.repairInfo.dealScene[evt.name] = evt.data
    },
    clearRepairInfo(state, evt) {
      state.repairInfo = {}
    },
  },
  actions: {}
})
