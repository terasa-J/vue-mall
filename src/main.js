import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Toast from 'components/common/toast'
import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'

// Toast自定义插件---安装插件
Vue.use(Toast)

// FastClick
// 1. 移动端浏览器在派发点击事件的时候，通常会出现300ms左右的延迟
// 2. 原因: 移动端的双击会缩放导致click判断延迟
FastClick.attach(document.body)

// VueLazyload
const loadimage = require('./assets/img/common/placeholder.png')
Vue.use(VueLazyload,{
  loading:loadimage
})


Vue.config.productionTip = false
// 事件总线
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')