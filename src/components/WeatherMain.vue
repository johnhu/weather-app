<template>
  <div class="container">
    <img
      v-bind:src="'http://openweathermap.org/img/w/' + weatherMain.current.weather[0].icon + '.png'"
      v-bind:alt="weatherMain.current.weather[0].main"
      width="30%"
    />
    <h4>{{weatherMain.current.weather[0].main}}</h4>
  </div>
</template>

<script>
export default {
  name: "WeatherMain",
  data() {
    return {};
  },
  props: {
    weatherMain: Object,
  },
};
</script>

<style scoped>
.container {
  text-align: center;
}

h4 {
  font-size: 18px;
}
</style>