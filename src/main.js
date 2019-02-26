import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios";
import * as VueGoogleMaps from "vue2-google-maps";


axios.defaults.baseURL = 
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : "/";

var jwt = localStorage.getItem("jwt");
if (jwt) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;
}


Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyB8DaIKUE_m5rzpLjbTkXk0z5g2ERIfA-g",
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
