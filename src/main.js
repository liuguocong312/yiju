import Vue from 'vue'
import 'normalize.css/normalize.css'// A modern alternative to CSS resets
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import '@/styles/index.scss' // global css
import App from './App'
import router from './router'



import store from './store'
import './permission'
import 'babel-polyfill';
//import i18n from './lang';
import VueAwesomeSwiper from 'vue-awesome-swiper';
// require styles
import 'swiper/dist/css/swiper.css';

require('babel-polyfill');
//require('vue-swipe/dist/vue-swipe.css');

import  VueQuillEditor from 'vue-quill-editor'
// require styles 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

//公用过滤
import vueFilter from '@/utils/filter'
for (let key in vueFilter){
  Vue.filter(key,vueFilter[key])
}

Vue.use(VueQuillEditor)

//Vue.use(ElementUI, { locale });
Vue.use(ElementUI);

Vue.use(VueAwesomeSwiper);

Vue.config.productionTip = false;

Vue.prototype.IMG_URL="https://img2.migrantju.com";
// Vue.prototype.IMG_URL=" https://img.migrantju.com";

new Vue({
  el: '#app',
  router,
  store,
  //i18n,
  render: h => h(App),
  mounted () {
    document.dispatchEvent(new Event('render-event'))
  }
});
