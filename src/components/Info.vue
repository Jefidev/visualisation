<template >
<div>

  <div class="container mx-auto py-8 m-0">
    <div class="font-sans text-lg">
      <h1 class="text-center py-4">UFO Nation: Ils sont déjà la !</h1>
      <br>

      <router-link
        to="/"
        class="block bg-blue-light px-6 py-3 mb-6 w-3/4 m-auto text-center text-xs uppercase text-white font-bold no-underline rounded cursor-pointer"
      >Retourner à la map intéractive</router-link>

      <br>

      <p>
        Depuis plus de 80 ans, des phénomènes ont été enregistrés et analysés. Cela ne fait plus aucun doutes pour les experts.
        Le phénomène OVNI est non seulement présent mais il prend de l'ampleur. Jusqu'ou allons nous laisser faire cela ?
      </p>
    </div>

    <br>
    <br>

    <div class="font-sans text-lg border-gray-lighter border-4 rounded p-4">
      <h2 class="text-center text-grey-dark mb-4">De plus en plus nombreux</h2>

      <vue-c3 :handler="frenquency" class="text-center"></vue-c3>
    </div>

    <br>
    <br>

    <div class="font-sans text-lg border-gray-lighter border-4 rounded p-4">
      <h2 class="text-center text-grey-dark mb-4">De très longues visites</h2>

      <vue-c3 :handler="time" class="text-center"></vue-c3>
    </div>
  </div>
  </div>
</template>


<script>
import Vue from "vue";
import VueC3 from "vue-c3";
import moment from "moment";

export default {
  name: "Hello",
  props: {
    ufos: {
      required: true
    }
  },
  components: {
    VueC3
  },
  data() {
    return {
      frenquency: new Vue(),
      time: new Vue()
    };
  },
  methods: {
    draw_frequency_graph() {
      var x = ["x"];
      var nbr = ["observations cumulée sur une année"];

      var tmp = {};

      this.ufos.forEach(item => {
        var year = item.date.year();

        if (year in tmp) {
          tmp[year] += 1;
        } else {
          tmp[year] = 1;
        }
      });

      for (var key in tmp) {
        x.push(key);
        nbr.push(tmp[key]);
      }

      var data = {
        data: {
          x: "x",
          columns: [x, nbr],
          type: "bar"
        },
        size: {
          height: 300,
          width: 1000
        }
      };

      this.frenquency.$emit("init", data);
    },

    draw_time_graph() {
      var x = ["x"];
      var time = ["Temps moyen d'observation en heure"];
      const average = arr => arr.reduce((p, c) => p + c, 0) / arr.length;

      var tmp = {};

      this.ufos.forEach(item => {
        if (item.duration < 86400) {
          var year = item.date.year();

          if (year in tmp) {
            tmp[year].push(item.duration / 60);
          } else {
            tmp[year] = [item.duration / 60];
          }
        }
      });

      for (var key in tmp) {
        x.push(key);
        time.push(average(tmp[key]) / 60);
      }

      var data = {
        data: {
          x: "x",
          columns: [x, time],
          type: "bar"
        },
        size: {
          height: 300,
          width: 1000
        }
      };

      this.time.$emit("init", data);
    }
  },
  mounted() {
    console.log("mounted");

    this.draw_frequency_graph();
    this.draw_time_graph();
    // Generer les graphs
  },
  watch: {
    ufos: function(newVal, oldVal) {
      // watch it
      this.draw_frequency_graph();
      this.draw_time_graph();
    }
  }
};
</script>
