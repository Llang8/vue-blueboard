import Vue from 'vue'
import App from './App.vue'
import router from './router/main.js';
import store from './store/main';
/* import VueSession from 'vue-session';

Vue.use(VueSession, {
  persist: true
});
 */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
