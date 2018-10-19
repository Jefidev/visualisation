import Vue from "vue";
import App from "./App.vue";

// Import the tailwind css
import '@/assets/css/tailwind.css'


Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
