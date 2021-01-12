import Vue from 'vue'
import App from './App.vue'


import vuetify from './plugins/vuetify';
import vuemeta from './plugins/vuemeta';
import axios from './plugins/axios';
import filter from './plugins/filter';
import router from './plugins/router'
import store from './plugins/store'

import VueTelInput from 'vue-tel-input'

import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = false

Vue.use(VueTelInput)


var app = new Vue({
  axios,
  vuemeta,
  filter,
  store,
  router,
  vuetify,
  render: h => h(App)
})

app.$mount('#app')
