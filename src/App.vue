<template>
  <div id="app">
   
    <router-link v-bind:to="{ name: 'SearchPage'}" id="title">
    weather
    <br />app
    </router-link>
    
    <router-view />
    
<v-btn-toggle class="units-toggle" v-model="toggle_exclusive" mandatory>
<v-btn @click="isCelsius=true">
&deg;C
</v-btn>
<v-btn @click="isCelsius=false">
&deg;F
</v-btn>
</v-btn-toggle>
  </div>
</template>

<script>
import Vue from "vue";
import VTooltip from "v-tooltip";
import modal from "@/components/modal.vue";

Vue.use(VTooltip);
Vue.use(modal);

export default {
  name: "app",
  components: {
  },
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
}
#title {
  margin-top: 5px;
  color: rgb(255, 255, 255);
  font-weight: bold;
  font-size: 2em;
  text-align: left;
  text-decoration: none;
  position: absolute;
  left: 12px;
  top: 0;
  z-index: 9997;
}

.units-toggle {
  text-decoration: none;
  background: none;
  overflow: auto;
  position: absolute;
  bottom: 0;
}

.v-btn {
  color:rgb(26, 105, 119);
}

.v-btn-toggle > .v-btn.v-btn--active {
  font-weight: bold;
  color:rgb(26, 105, 119);
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
  color: rgb(114, 114, 114);
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