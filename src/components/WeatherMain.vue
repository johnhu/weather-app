<template>
  <div class="container">
      <img src="https://via.placeholder.com/150" />
      <h2>{{weatherMain.weather[0].main}}</h2>
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
dl {
  padding: 5px;
  background: #e8e8e8;
}
dt {
  float: left;
  clear: left;
  width: 120px;
  text-align: right;
  font-weight: bold;
  color: blue;
}
dd {
  margin: 0 0 0 130px;
  padding: 0 0 0.5em 0;
}
dt::after {
  content: ":";
}
</style>