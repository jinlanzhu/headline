import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/css/style.css'

// 导入自己的图标样式
import '@/assets/fonts/iconfont.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import axios from 'axios'
Vue.prototype.$axios = axios
Vue.prototype.$bus = new Vue()


Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
