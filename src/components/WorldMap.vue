
<template>
<div>


  <mgl-map
    :accessToken="accessToken"
    :mapStyle.sync="mapStyle"
    :center="center"
    :zoom="zoom"
    :interactive="false"
  >
    
        <mgl-marker ref="marker" :coordinates="[-90.585522, 41.8333333]">
          <div slot="marker">
            <div class="marker">
              <img src="../assets/images/saucer.png" alt="">
            </div>
            </div> 
        </mgl-marker>

       
  </mgl-map>

  <div class="bg-white p-6 absolute pin-t pin-l m-8 w-1/2 rounded text-xs">

    {{ Date.parse(ufos[12].datetime) }}        
   

  </div>

  </div>
</template>

<script>

import {
  MglMap,
  MglNavigationControl,
  MglGeolocateControl,
  MglPopup,
  MglMarker
} from "vue-mapbox";

const ACCESS_TOKEN =
  "pk.eyJ1Ijoic2ltb25nZW5pbiIsImEiOiJjam5meDY4ZncwMmd0M3FxaTdmc2FqNzRiIn0.vlyNxz2sNsmEI4hAVQ-S5Q";
const MAP_STYLE = "mapbox://styles/simongenin/cjng1f51h34vo2sqyl01e0ffl";
const CENTER = [-98.585522, 39.8333333]
const ZOOM = 4

import VueTimers from 'vue-timers/mixin'

export default {
  components: {
    MglMap,
    MglNavigationControl,
    MglGeolocateControl,
    MglPopup,
    MglMarker
  },

  mixins: [VueTimers],

  props: ['ufos'],

  timers: {
    addMonth: { time: 1000, autostart: true, repeat: true },
  },

  data() {
    return {
      accessToken: ACCESS_TOKEN,
      mapStyle: MAP_STYLE,
      center: CENTER, 
      zoom: ZOOM,

      currentSimUnit: 0
      
    }
  },

  methods: {

    addMonth () {

      this.currentSimUnit++

    }

  },

  mounted() {


  }

};
</script>

<style>
.mapboxgl-map {
	width: 100%;
	height: 100vh;
}

.marker {
  height: 24px;
  width: 24px;
  z-index: 10;
}
</style>
