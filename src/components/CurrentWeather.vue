<template>
  <div class="container">
      <v-tooltip right>
        <template v-slot:activator="{ attrs, on }">
          <h3 class="temp" v-bind="attrs" v-on="on">{{ currentWeather.current.temp|round }}&deg;</h3>
              </template>
       
      <span><dt>Feels Like</dt>
        <dd>{{ currentWeather.current.feels_like|round }}&deg;</dd>
        <dt>Wind</dt>
        <dd>{{ currentWeather.current.wind_speed }} mph</dd>
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
    return {
    }; //returns currentWeather object when needed
  },
  props: {
    currentWeather: Object,
  },
  filters: {
  round: function (value, decimals) {
      if (!value) {
        value = 0;
      }

      if (!decimals) {
        decimals = 0;
      }

      value =
        Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
      return value;
    }
}
}

</script>

<style scoped>
dl {
  padding: 5px;
  background: #e8e8e8;
}
dt {
  float: left;
  text-align: left;
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
  font-size: 3.2em;
  font-weight: normal;
}
h4 {
  font-weight: normal;
}

.temp:hover {
  color: rgb(224, 224, 224);
}

</style>