<template >
  <div class="container mx-auto">

    <nav class="flex items-center justify-between flex-wrap bg-grey-darkest p-6">
      <div class="flex items-center flex-no-shrink text-white mr-6">
        <span class="font-semibold text-xl tracking-tight">UFO nation</span>
      </div>
      <div class="block lg:hidden">
        <button class="flex items-center px-3 py-2 border rounded text-teal-lighter border-teal-light hover:text-white hover:border-white">
          <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
        </button>
      </div>
      <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div class="text-sm lg:flex-grow">
          <router-link to="/" class="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mr-4">
            Map
          </router-link>
        </div>
      </div>
    </nav>


    <div class='font-sans text-lg text-white text-center'>
      <h1>Ils sont déjà la</h1>
      <br>
      <p>Depuis plus de 80 ans, des phénomènes ont été enregistrés et analysés. Cela ne fait plus aucun doutes pour les experts.
      Le phénomène OVNI est non seulement présent mais il prend de l'ampleur. Jusqu'ou allons nous laisser faire cela ?</p>
    </div>

    <br>
    <br>
    <div class='font-sans text-lg text-white'>
      <h2>De plus en plus nombreux </h2>

      <vue-c3 :handler="frenquency" class="text-center"></vue-c3>
    </div>

    <br>
    <br>
    <div class='font-sans text-lg text-white'>
      <h2>Des visites très longue</h2>
      <p>Les extra terrestre ne prennent plus la peine de se cacher. Ils restent visibles plusieurs heures chez plusieurs observateurs</p>
      <vue-c3 :handler="time" class="text-center"></vue-c3>
    </div>
    
  </div>
</template>


<script>
  import Vue from 'vue'
  import VueC3 from 'vue-c3'
  import moment from 'moment'

  export default{
    name: 'Hello',
    props:{
      ufos: {
        required: true
      },
    },
    components: {
      VueC3
    },
    data(){
      return {
        frenquency: new Vue,
        time: new Vue
      }
    },
    methods:{
      draw_frequency_graph(){
        var x = ['x']
        var nbr = ['observations cumulée sur une année']

        var tmp = {}
        
        this.ufos.forEach((item) => {

          var year = item.date.year()

          if(year in tmp){
            tmp[year] += 1
          }
          else{
            tmp[year] = 1
          }
        })

        for(var key in tmp){
          x.push(key)
          nbr.push(tmp[key])
        }

        var data = {
          data: {
            x: 'x',
            columns:[x, nbr],
            type: 'bar'
          },
          size: {
              height: 300,
              width: 1000
          }
        }

        this.frenquency.$emit('init', data)
      },

      draw_time_graph(){
        var x = ["x"]
        var time = ["Temps moyen d'observation en heure"]
        const average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;

        var tmp = {}

        this.ufos.forEach((item) => {
          if(item.duration < 86400){
            var year = item.date.year()

            if(year in tmp){
              tmp[year].push(item.duration/60)
            }
            else{
              tmp[year] = [item.duration/60]
            }
          }
          
        })


        for(var key in tmp){
          x.push(key)
          time.push(average(tmp[key])/60)
        }

        var data = {
          data: {
            x: 'x',
            columns:[x, time],
            type: 'bar'
          },
          size: {
              height: 300,
              width: 1000
          }
        }

        this.time.$emit('init', data)
      }
    },
    mounted(){
      console.log("mounted")

      this.draw_frequency_graph()
      this.draw_time_graph()
      // Generer les graphs
    },
    watch: { 
      ufos: function(newVal, oldVal) { // watch it
        this.draw_frequency_graph()
        this.draw_time_graph()
      }
    }
  }
</script>