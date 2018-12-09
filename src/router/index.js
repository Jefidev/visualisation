import Vue from 'vue'
import Router from 'vue-router'
import WorldMap from "@/components/WorldMap.vue"; 
import Info from "@/components/Info.vue"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Map',
      component: WorldMap
    },
    {
      path: '/about',
      name: 'Info',
      component: Info
    }
  ]
})