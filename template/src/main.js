{{#if_eq build "standalone"}}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
{{/if_eq}}
import Vue from 'vue'
import App from './App'
{{#router}}
import router from './router'
{{/router}}


import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import Icon from 'vue-svg-icon/Icon.vue'
import {XHeader,Group, Grid, Cell,GridItem, GroupTitle, ViewBox ,XButton,Toast,ToastPlugin,LoadingPlugin} from 'vux'

Vue.use(Vuex)
Vue.component('icon', Icon)
Vue.component('x-header', XHeader)
Vue.component('group', Group)
Vue.component('cell', Cell)
Vue.component('grid', Grid)
Vue.component('grid-item', GridItem)
Vue.component('group-title', GroupTitle)
Vue.component('view-box', ViewBox)
Vue.component('x-button', XButton)
Vue.component('toast', Toast)
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)

/** i18n vuex设置部分 **/
import vuexI18n from 'vuex-i18n'

let store = new Vuex.Store({
  modules: {
    i18n: vuexI18n.store
  },
  state: {    
    isLoading: false,
    isLogin:false,
    status:status,    
    tab_select:0,
    notice:false,
    connect:false,
  },
  mutations: {
    changeStatus (state, payload ) {      
      state.status_now = payload      
    },
    setLogin (state, payload ) {      
      state.isLogin = payload      
    },
    changeConnect (state, payload ) {      
      state.connect = payload      
    },
    changeSelect (state, payload ) {      
      state.tab_select = payload      
    },
    changeNotice (state,payload) {
      state.notice = payload
    },    
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    },    
  },
  actions: {
    
  }
})

Vue.use(vuexI18n.plugin, store)

const translationsEn = {
	"应用名称": "App Name"
};


Vue.i18n.add('en', translationsEn);
Vue.i18n.set('en');

store.registerModule('vux', {})





Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  {{#router}}
  router,
  {{/router}}
  store,
  {{#if_eq build "runtime"}}
  render: h => h(App)
  {{/if_eq}}
  {{#if_eq build "standalone"}}
  components: { App },
  template: '<App/>'
  {{/if_eq}}
})
