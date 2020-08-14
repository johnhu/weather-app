<template>
  <div class="container">
      <v-tooltip right>
        <template v-slot:activator="{ attrs, on }">
          <h3 class="temp" v-bind="attrs" v-on="on">{{ currentWeather.current.temp }}&deg;F</h3>
              </template>
       
      <span><dt>Feels Like</dt>
        <dd>{{ currentWeather.current.feels_like }}&deg;F</dd>
        <dt>Wind</dt>
        <dd>{{ currentWeather.current.wind_speed }} km/h</dd>
        <dt>UV Index</dt>
        <dd>{{ currentWeather.current.uvi }}</dd>
        </span>       
      </v-tooltip>
      <h4>{{ currentWeather.current.humidity }}% humidity</h4>
  </div>
</template>

<script>

export default {
  name: "CurrentWeather",
  data() {
    return {}; //returns currentWeather object when needed
  },
  props: {
    currentWeather: Object,
  },
}

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
  color: #ffffff;
}
dd {
  margin: 0 0 0 130px;
  padding: 0 0 0.5em 0;
}
dt::after {
  content: ":";
}
.v-tooltip {
  display:unset;
}

.temp {
  font-size: 2.2em;
  font-weight: normal;
}
h4 {
  font-weight: normal;
}

.temp:hover {
  color: grey;
}

</style>