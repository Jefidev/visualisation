<template>

  <div id="app">

    <div>

     <world-map :ufos="ufos"></world-map>

    </div>
  
  </div>

</template>

<script>
import WorldMap from "./components/WorldMap.vue";
import axios from "axios"

export default {
  name: "app",

  data() { 
    
    return {

      ufos: []

    }
  },

  components: {
    WorldMap
  },

  created() {

    this.getData()

  },

  methods: {

    getData() {

      axios.get('http://localhost:8080/datasets/ufo_500.json')
      .then(response => {
        console.log("Data received")
        response.data.forEach( (item, i) => {
          this.$set(this.ufos, i, item)
        }
      )})
      .catch((err, response) => {
        console.log("An error occured during data loading:")
        console.log(err)
        this.ufos.splice(0)
      })

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
