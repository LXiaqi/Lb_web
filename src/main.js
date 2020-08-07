// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from 'vant';
import Axios from 'axios'

import AMap from 'vue-amap';
Vue.use(AMap)
AMap.initAMapApiLoader({
  key: '5c0b3892a34a5ae36b247a2fced4cca5',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView','AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor','AMap.CircleEditor', 'AMap.Geolocation'],
  v: '1.3'
});

import 'vant/lib/index.css';
import 'amfe-flexible'
Vue.use(Vant);
Vue.config.productionTip = false
Vue.prototype.$http = Axios
Vue.http = Axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
window.API_ROOT =  process.env.API_ROOT;
