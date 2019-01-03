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
    tvInfo: {
      info:{},
      sign_id:null
    },
    headerImg:null
  },
  getters: {
    getHeaderImg: state => state.headerImg,
  },
  mutations: {
    setTvInfo(state, evt) {
      state.tvInfo[evt.name] = evt.data
    },
    clearRepairInfo(state, evt) {
      state.tvInfo = {info:{}}
    },
    setHeaderImg(state, evt) {
      state.headerImg = evt
    },
  },
  actions: {}
})
