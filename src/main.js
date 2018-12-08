import Vue from "vue";
import App from "./App.vue";
import router from './router'

// Import the tailwind css
import '@/assets/css/tailwind.css'


Vue.config.productionTip = false;


// Mapbox 
import VueMapbox from 'vue-mapbox'
import Mapbox from 'mapbox-gl'
Vue.use(VueMapbox, { mapboxgl: Mapbox })


new Vue({
  render: h => h(App),
  router
}).$mount("#app");
