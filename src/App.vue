<template>
  <div id="app">
    <v-btn-toggle class="units-toggle" v-model="toggle_exclusive" mandatory>
    <v-btn @click="isCelsius=true">
    &deg;C
    </v-btn>
    <v-btn @click="isCelsius=false">
    &deg;F
    </v-btn>
    </v-btn-toggle>
    <router-link v-bind:to="{ name: 'SearchPage'}" id="title">
    weather
    <br />app
    </router-link>
    <router-view />
    
  </div>
</template>

<script>
import Vue from "vue";
import VTooltip from "v-tooltip";
import modal from "@/components/modal.vue";
import VueTemperatureFilter from 'vue-temperature-filter';

Vue.use(VTooltip);
Vue.use(modal);
Vue.use(VueTemperatureFilter); 

export default {
  name: "app",
  data() {
    return {
      isCelsius: Boolean
    };
  },
  methods: {
    
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#title {
  margin-top: 5px;
  color: #2c3e50;
  font-weight: bold;
  font-size: 2em;
  text-align: left;
  text-decoration: none;
  position: absolute;
  left: 12px;
  top: 0;
  z-index: 9998;
}

.v-btn{
  font-weight: bold;
}

.v-btn-toggle > .v-btn.v-btn--active {
    font-weight: bold;
}
.v-btn-toggle:not(.v-btn-toggle--dense) .v-btn.v-btn.v-size--default{
  border-radius: 50px;
}

.theme--light.v-btn-toggle:not(.v-btn-toggle--group) {
  background: none !important;
}

.theme--light.v-btn-toggle:not(.v-btn-toggle--group):not(.v-btn--active) .v-btn.v-btn.v-btn {
  border-color: transparent !important;
}

.theme--light.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
    background-color: transparent !important;
}

.units-toggle {
  text-decoration: none;
  background: none;
  position: fixed;
  top: -50px;
  z-index: 9997;
  overflow: auto;
}

#title:hover {
  color: rgb(114, 114, 114);
}
</style>