import Vue from 'vue'
import App from './App.vue'
import router from './router/main.js';
import store from './store/main';

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
