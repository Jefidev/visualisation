
<template>
  <div>
    <div id="map"></div>

    <div
      id="typing"
      class="absolute pin-l pin-b m-4 mb-16 w-1/4 text-green-dark uppercase text-xs leading-loose grayscale font-semibold"
    ></div>

    <div
      class="absolute pin-r pin-b m-4 mr-32 mb-16 text-white uppercase text-lg leading-loose grayscale font-semibold"
    >
      <controls @play="play()" @pause="pause()" @faster="faster()" @slower="slower()"></controls>
    </div>

    <div
      class="absolute pin-r pin-b m-4 mr-32 mb-32 text-white uppercase text-lg leading-loose grayscale font-semibold"
    >{{ timeAsText }}</div>

    <div class="absolute pin-b pin-l w-full flex justify-center mb-4">
      <router-link to="/about">
        <div
          class="bg-white text-xs uppercase rounded px-6 py-4 font-bold cursor-pointer"
        >En savoir plus</div>
      </router-link>
    </div>
  </div>
</template>

<script>
const ACCESS_TOKEN =
  "pk.eyJ1Ijoic2ltb25nZW5pbiIsImEiOiJjam5meDY4ZncwMmd0M3FxaTdmc2FqNzRiIn0.vlyNxz2sNsmEI4hAVQ-S5Q";
const MAP_STYLE = "mapbox://styles/simongenin/cjng1f51h34vo2sqyl01e0ffl";
const CENTER = [-98.585522, 39.8333333];
const ZOOM = 4;

import VueTimers from "vue-timers/mixin";
import moment from "moment";
import Vue from "vue";

import mapboxgl from "mapbox-gl";

import TypeIt from "typeit";
import axios from "axios";

import fs from "fs";

import Controls from "./Controls.vue";

import { Howl, Howler } from "howler";

export default {
  components: {
    Controls
  },

  mixins: [VueTimers],

  props: {
    ufos: {
      required: true
    },
    startDate: {
      // YYYY-MM-DD
      default: () => moment("1950-01-01")
    }
  },

  timers: {
    addMonth: { time: 1000, autostart: false, repeat: true },
    changeText: { time: 5000, autostart: true, repeat: true }
  },

  data() {
    return {
      accessToken: ACCESS_TOKEN,
      mapStyle: MAP_STYLE,
      center: CENTER,
      zoom: ZOOM,

      map: null,
      icon: null,

      lastTime: this.startDate,
      currentTime: moment(this.startDate).add(1, "month"),
      time: 100,
      timeToShow: 500,
      timeAsText: "",

      currentText: "",
      typing: null,

      delay: 200,

      refsOnPause: [],
      isPaused: false
    };
  },

  methods: {
    display(onPause = false) {
      let ufosToDisplay = this.ufos.filter(
        element =>
          element.date.isAfter(this.lastTime) &&
          element.date.isBefore(this.currentTime)
      );

      ufosToDisplay.forEach(element => {
        let icon = document.createElement("div");
        icon.innerHTML = `<div class="marker">
                  <img src="saucer.png" alt="">
                </div>`;
        icon = icon.children[0];

        let marker = new mapboxgl.Marker({ element: icon });

        marker.setLngLat([element.long, element.lat]);

        marker.addTo(this.map);

        if (onPause) this.refsOnPause.push(marker);

        if (!onPause) {
          setInterval(() => {
            marker.remove();
          }, this.timers.addMonth.time + this.delay);
        }
      });
    },

    addMonth() {
      this.lastTime = this.lastTime.add(1, "month");
      this.currentTime = this.currentTime.add(1, "month");
      this.timeAsText = this.currentTime.format("MMMM, YYYY");

      this.display();
    },

    changeText() {
      if (this.ufos) {
        const index = Math.floor(Math.random() * this.ufos.length);
        let text = this.ufos[index].comment.replace(";", ",");

        this.typing.delete().type(text);
      }
    },

    pause() {
      this.isPaused = true
      this.$timer.stop("addMonth");
      this.display(true);
    },

    play() {
      this.isPaused = false
      this.refsOnPause.forEach( (e) => { e.remove() } )
      this.refsOnPause = []
      this.$timer.start("addMonth");
    },

    faster() {
      this.$timer.stop("addMonth");
      this.timers.addMonth.time = this.timers.addMonth.time / 2;

      if (!this.isPaused)
        this.$timer.start("addMonth");
    },

    slower() {
      this.$timer.stop("addMonth");
      this.timers.addMonth.time =
        this.timers.addMonth.time * 2;
      if (!this.isPaused)
  this.$timer.start("addMonth");
    }

    /*
    launchMusic() {

      
      var sound = new Howl({
        urls: ['http://localhost:8080/musics/who.mp3'],
        autoplay: true,
        loop: true,
        volume: 0.5,
        onend: function() {
          alert('Finished!');
        }
      });
      */

    /*
      axios
        .get("http://localhost:8080/musics/who.mp3")
        .then(response => {
          console.log("Music received");
          console.log(response);
         
          
          const outputFilename = '/file.mp3';
          fs.writeFileSync(outputFilename, response.data);
          
          
          var sound = new Howl({
          urls: ['file.mp3']
          }).play();
          


        })
        .catch((err, response) => {
          console.log("An error occured during music loading:");
          console.log(err);
        });
  } */
  },

  mounted() {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoic2ltb25nZW5pbiIsImEiOiJjam5meDY4ZncwMmd0M3FxaTdmc2FqNzRiIn0.vlyNxz2sNsmEI4hAVQ-S5Q";

    this.map = new mapboxgl.Map({
      container: "map",
      style: this.mapStyle,
      center: this.center,
      zoom: this.zoom,
      interactive: true
    });

    this.timers.addMonth.time = this.time;
    this.$timer.start("addMonth");

    this.typing = new TypeIt("#typing", {
      strings: "",
      speed: 20,
      deleteSpeed: 5,
      autoStart: false
    });

    // this.launchMusic()
  }
};

function animateMarker(timestamp, marker) {
  // Update the data to a new position based on the animation timestamp. The
  // divisor in the expression `timestamp / 1000` controls the animation speed.

  let ll = marker.getLngLat().toArray();
  let lat = ll[1];
  let lng = ll[0];

  // const randomA = Math.floor((Math.random() * 5) - 1.5) / 100;
  // const randomB = Math.floor((Math.random() * 5) - 1.5) / 100;

  // const randomA = Math.floor((Math.random() * 75)) / 100;
  // const randomB = Math.floor((Math.random() * 75)) / 100;

  const newLat = lat + 0.01 * lat;
  let newLng = 0;

  if (Math.round(Math.random())) newLng = lng + 0.003 * lng;
  else newLng = lng - 0.003 * lng;

  try {
    marker.setLngLat([newLng, newLat]);
  } catch (err) {
    marker.remove();
  }

  requestAnimationFrame(function(timestamp) {
    animateMarker(timestamp, marker);
  });
}
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

.text-vs {
  font-size: 0.5rem;
}
</style>
