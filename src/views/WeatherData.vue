<template>
  <div>
    <h2>
      The Weather In
      <span v-if="weatherData">for {{ weatherData.name }}, {{weatherData.sys.country }}</span>
    </h2>
    <message-container v-bind:messages="messages"></message-container>
    <p>
      
    <spinner v-if="showLoading"></spinner>
    <div v-if="weatherData">
      <weather-summary v-bind:weatherData="weatherData.weather"></weather-summary>

      <weather-data v-bind:weatherData="weatherData.main"></weather-data>
    </div>
  </div>
</template>

<script>
import WeatherData from '@/components/WeatherData';
import MessageContainer from '@/components/MessageContainer';

export default {
  name: 'WeatherData',
  components: {
    'weather-summary': WeatherSummary,
    'weather-data': WeatherData,
    'message-container': MessageContainer
  },
  data () {
    return {
      weatherData: null,
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