import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import VueLocalStorage from 'vue-ls';
import vuetify from './plugins/vuetify';
import 'vuetify/dist/vuetify.css'
import VueTemperatureFilter from 'vue-temperature-filter';

// let options = {
//   namespace: 'weather__'
// };

// Vue.use(VueLocalStorage, options);
Vue.use(VueTemperatureFilter); 
Vue.use(VueTemperatureFilter, {
  fromFahrenheit: true,
  showText: true
});

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')