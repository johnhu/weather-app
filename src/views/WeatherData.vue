<template>
  <div>
    <h2>
      The weather in
      <span v-if="weatherData"> {{ weatherData.name }}, {{weatherData.sys.country }}</span>
    </h2>
    <message-container v-bind:messages="messages"></message-container>
    <p>
      
    <spinner v-if="showLoading"></spinner>
    <h3>Currently</h3>
    <div v-if="weatherData">
      <weather-main v-bind:weatherMain="weatherData"></weather-main>
      <weather-data v-bind:weatherData="weatherData.main"></weather-data>
    </div>
    <div v-if="weatherData">
      <forecast v-bind:foreCast="foreCast"></forecast>
      </div>
  </div>
</template>

<script>
import {API} from '@/common/api';
import WeatherData from '@/components/WeatherData';
import WeatherMain from '@/components/WeatherMain';
import MessageContainer from '@/components/MessageContainer';
import Forecast from '@/components/Forecast';

export default {
  name: 'WeatherData',
  components: {
    // 'weather-summary': WeatherSummary,
    'forecast': Forecast,
    'weather-data': WeatherData,
    'weather-main': WeatherMain,
    'message-container': MessageContainer
  },
  data () {
    return {
      weatherData: null,
      foreCast: null,
      messages: [],
      query: '',
      showLoading: false
    }
  },
  created () {
    this.showLoading = true;
      let cacheLabel = 'currentWeather_' + this.$route.params.cityId;
      let cacheExpiry = 15 * 60 * 1000; // 15 minutes

    if (this.$ls.get(cacheLabel)){
      console.log('Cached query detected.');
      this.weatherData = this.$ls.get(cacheLabel);
      this.showLoading = false;
    } else {
    console.log('No cache detected. Making API request.');
    API.get('weather', {
      params: {
          id: this.$route.params.cityId
      }
    })
    .then(response => {
      this.$ls.set(cacheLabel, response.data, cacheExpiry);
      this.showLoading = false;
      this.weatherData = response.data;
    })
    .catch(error => {
      this.showLoading = false;
      this.messages.push({
        type: 'error',
        text: error.message
      });
    });
  }
}
}
</script>

<style scoped>
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