<template>
  <div id="app">
    <router-link v-bind:to="{ name: 'SearchPage'}" id="title">weather <br>app</router-link>
    <router-view />
  </div>
</template>

<script>import Vue from 'vue'
import VTooltip from 'v-tooltip'

Vue.use(VTooltip)
export default {
  name: "app",
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
  color:#2c3e50;
  font-weight: bold;
  font-size: 2em;
  text-align: left;
  text-decoration: none;
  position: absolute;
  left: 12px;
  top: 0;
}

#title:hover {
  color:rgb(114, 114, 114);
}
</style>