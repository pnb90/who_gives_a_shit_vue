import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios";
import * as VueGoogleMaps from "vue2-google-maps";


axios.defaults.baseURL = 
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : "/";

Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyAqGKR2Lko32__2NFQdV6Z2ql8FO5NJPbM",
    libraries: "places" // necessary for places input
  }
});

new Vue({
  router,
  el: "#app",
  components: { App },
  template: "<App/>",
  render: h => h(App)
}).$mount('#app')
