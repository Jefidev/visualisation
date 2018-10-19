
<template>
<div>
  <mgl-map
    :accessToken="accessToken"
    :mapStyle.sync="mapStyle"
  >
    <mgl-navigation-control position="top-right"/>
    <mgl-geolocate-control position="top-right" />
    <mgl-popup :coordinates="popupCoordinates">
      <span>Hello world!</span>
    </mgl-popup>

  </mgl-map>
  </div>
</template>

<script>
import {
  MglMap,
  MglNavigationControl,
  MglGeolocateControl,
  MglPopup
} from "vue-mapbox";

const ACCESS_TOKEN =
  "pk.eyJ1Ijoic2ltb25nZW5pbiIsImEiOiJjam5meDY4ZncwMmd0M3FxaTdmc2FqNzRiIn0.vlyNxz2sNsmEI4hAVQ-S5Q";
const MAP_STYLE = "mapbox://styles/simongenin/cjnfy4lvp09y22rpaxkocopks";

export default {
  components: {
    MglMap,
    MglNavigationControl,
    MglGeolocateControl,
    MglPopup
  },
  data() {
    return {
      accessToken: ACCESS_TOKEN,
      mapStyle: MAP_STYLE,
      popupCoordinates: [10, 10]
    };
  }
};
</script>

<style>
.mapboxgl-map {
	width: 100%;
	height: 100vh;
}
</style>
