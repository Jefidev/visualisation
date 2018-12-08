<template>

  <div id="app" class="bg-grey-darkest">

    <div>

     <router-view :ufos="ufos"></router-view>

    </div>
  
  </div>

</template>

<script>
import WorldMap from "./components/WorldMap.vue";
import axios from "axios";
import moment from "moment";

export default {
  name: "app",

  data() {
    return {
      ufos: []
    };
  },

  components: {
    WorldMap
  },

  created() {
    this.getData();
  },

  methods: {
    getData() {
      axios
        .get("http://localhost:8080/datasets/ufo_3000.json")
        .then(response => {
          console.log("Data received");
          response.data.forEach((item, i) => {
            // 10/10/1970 16:00
            this.$set(this.ufos, i, {
              date: moment(item.datetime, "MM/DD/YYYY hh:mm"),
              lat: item.latitude,
              long: item.longitude,
              comment: item.comments,
              duration: item["duration (seconds)"]
            });
          });
          
          this.ufos.sort(function(a, b) {
            return a.date - b.date;
          });

        })
        .catch((err, response) => {
          console.log("An error occured during data loading:");
          console.log(err);
          this.ufos.splice(0);
        });
    }
  }
};
</script>

<style>
.w-960 {
  width: 960px;
  height: 600px;
  margin: auto;
}
</style>
