<template>
  <div id="app">
   
    <router-link v-bind:to="{ name: 'Search'}" id="title">
    weather
    <br />app
    </router-link>
    <router-view />
    
<div class="units-toggle">
<v-btn-toggle v-model="toggle_exclusive" mandatory>
<v-btn @click="isCelsius=true">
&deg;C
</v-btn>
<v-btn @click="isCelsius=false">
&deg;F
</v-btn>
</v-btn-toggle></div>
  </div>
</template>

<script>
import Vue from "vue";
import VTooltip from "v-tooltip";
import modal from "@/components/modal.vue";
import axios from "axios";

Vue.use(VTooltip);
Vue.use(modal);
Vue.use(axios);

export default {
  name: "app",
  components: {
  },
  data() {
    return {
      isCelsius: Boolean,
   
    };
  },
};
</script>

<style>
#app {
  
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#title {
  padding: 8px;
  color: rgb(255, 255, 255);
  font-weight: bold;
  font-size: 2em;
  text-align: left;
  text-decoration: none;
  position: fixed;
  left: 12px;
  top: 0;
  z-index: 9997;
}

.units-toggle {
  padding: 8px;
  text-decoration: none;
  background: none;
  overflow: auto;
  position: fixed;
  bottom: 0;
}

span.v-btn__content{
  color:rgb(255, 255, 255);
}

.v-btn-toggle > .v-btn.v-btn--active {
  font-weight: bold;
  color:rgb(255, 255, 255);
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


#title:hover {
  color: rgba(240, 240, 240, 0.8);
}


@media only screen and (max-width: 980px) {
  v-main {
    position: absolute;
    top: 20%;
    left: 10%;
  }
}

@media only screen and (max-width: 425px) {
    .units-toggle {
  margin-top: 50px;
}
  h4.slide-main {
    font-size:10px;
  }
}

</style>