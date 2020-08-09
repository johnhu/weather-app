<template>
  <div class="container">
      <img src="https://via.placeholder.com/150" />
      <h4>{{weatherMain.weather[0].main}}</h4>
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
h4 {
  font-size: 18px;
}
</style>