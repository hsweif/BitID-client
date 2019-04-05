// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import iview from 'iview'
import 'iview/dist/styles/iview.css'
import cascaderMulti from 'cascader-multi'
import iviewArea from 'iview-area'
import custom_form from './components/custom_form'
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import axios from 'axios';
import VueAxios from 'vue-axios';
import Qs from "qs";

Vue.config.productionTip = false
Vue.use(iview)
Vue.use(cascaderMulti)
Vue.use(custom_form)
Vue.use(iviewArea)
Vue.use(ElementUI);
// axios.defaults.baseURL="http://localhost:80"
Vue.prototype.axios = axios;
// Vue.use(VueAxios,axios);
Vue.prototype.qs = Qs;
// axios.defaults.baseURL = '/apis';
Vue.prototype.$http = axios

/* eslint-disable no-new */
const server = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
