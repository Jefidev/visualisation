<template>

  <div id="app">

    <div class="">

     <world-map></world-map>

    </div>
  
  </div>

</template>

<script>
import WorldMap from "./components/WorldMap.vue";

export default {
  name: "app",
  components: {
    WorldMap
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
