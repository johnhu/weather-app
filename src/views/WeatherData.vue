<template>
<body>
  <h2>
    The weather in
    <span v-if="weatherData">{{ this.$route.params.cityName }}, {{ this.$route.params.cityCountry }}</span>
  </h2>
  <message-container v-bind:messages="messages"></message-container>
  <spinner v-if="showLoading"></spinner>
  <div class="body">
    <h3>Currently</h3>
    <div v-if="weatherData" class="main-weather">
      <div class="weather-image">
        <weather-main v-bind:weatherMain="weatherData"></weather-main>
      </div>
      <div class="weather-info">
        <weather-info v-bind:currentWeather="weatherData"></weather-info>
      </div>
    </div>
    <div v-if="weatherData" class="forecast">
      <ul class="forecast">
        <li v-for="forecast in weatherData.daily" v-bind:key="forecast.dt">
          <h3>{{ forecast.dt|formatDate }}</h3>
          <img v-bind:src="'http://openweathermap.org/img/w/' + forecast.weather[0].icon + '.png'" v-bind:alt="forecast.weather[0].main">
          <h4>{{forecast.weather[0].main}}</h4>
        </li>
      </ul>
      <!-- <forecast v-bind:foreCast="foreCast"></forecast> -->
    </div>
  </div>
  </body>
</template>

<script>
import {API} from '@/common/api';
import WeatherMain from "@/components/WeatherMain";
import CurrentWeather from "@/components/CurrentWeather";
// import Forecast from "@/components/Forecast";

export default {
  name: "WeatherData",
  components: {
    // "forecast": Forecast,
    "weather-info": CurrentWeather,
    "weather-main": WeatherMain,
  },
  data() {
    return {
      weatherData: null,
      foreCast: null,
      messages: [],
      query: "",
      showLoading: false,
    };
  },
  created() {
    this.showLoading = true;
    let cacheLabel = "currentWeather_" + this.$route.params.cityId;
    let cacheExpiry = 15 * 60 * 1000; // 15 minutes

    if (this.$ls.get(cacheLabel)) {
      console.log("Cached query detected.");
      this.weatherData = this.$ls.get(cacheLabel);
      this.showLoading = false;
    } else {
      console.log("No cache detected. Making API request.");
       API.get('onecall', {
        params: {
          lat: this.$route.params.cityLat,
          lon: this.$route.params.cityLon,
          appid: 'cadb942492f5c2c67512076c9cd5e63d'
        },
      })
        .then((response) => {
          this.$ls.set(cacheLabel, response.data, cacheExpiry);
          this.showLoading = false;
          this.weatherData = response.data;
        })
        .catch((error) => {
          this.showLoading = false;
          this.messages.push({
            type: "error",
            text: error.message,
          });
        });
    }
  },
  filters: {
    formatDate: function (timestamp) {
      let date = new Date(timestamp * 1000);
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "June",
        "July",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
      ];
      let daynum = date.getDate();
      let month = date.getMonth();

      //let year = date.getFullYear();
      return `${months[month]} ${daynum}`;
    },
  },
};
</script>

<style scoped>
body {
  max-width: 500px;
  margin: auto;
}
.main-weather {
  margin: auto;
  padding: 10px;
  display: flex;
}
.weather-image {
  width: 50%;
}

.weather-info {
  text-align: center;
  width: 50%;
}

.errors li {
  color: red;
  border: solid red 1px;
  padding: 5px;
}
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  width: 300px;
  min-height: 300px;
  border: solid 1px #e8e8e8;
  padding: 10px;
}
a {
  color: #42b983;
}
</style>