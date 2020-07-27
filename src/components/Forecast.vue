<template>
  <div>
    <h2>
      Five Day Hourly Forecast
      <span v-if="weatherData">for {{ weatherData.city.name }}, {{weatherData.city.country }}</span>
    </h2>
    <message-container v-bind:messages="messages"></message-container>
    <p>
      <router-link v-bind:to="{ name: 'CurrentWeather', params: { cityId: $route.params.cityId } }">
        Current Weather
        <span v-if="weatherData">for {{ weatherData.city.name }}, {{weatherData.city.country }}</span>
      </router-link>
    </p>

    <ul v-if="weatherData" class="forecast">
      <transition-group name="fade" tag="div" appear>
        <li v-for="forecast in weatherData.list" v-bind:key="forecast.dt">
          <h3>{{ forecast.dt|formatDate }}</h3>
          <weather-summary v-bind:weatherData="forecast.weather"></weather-summary>
          <weather-data v-bind:weatherData="forecast.main"></weather-data>
        </li>
      </transition-group>
    </ul>
    <load-spinner v-if="showLoading"></load-spinner>
  </div>
</template>

<script>
import WeatherData from '@/components/WeatherData';
import Spinner from '@/components/Spinner';
import MessageContainer from '@/components/MessageContainer';

export default {
  name: 'Forecast',
  components: {
    'weather-data': WeatherData,
    'message-container': MessageContainer,
    'spinner': Spinner
  },
  data () {
    return {
      weatherData: null,
      messages: [],
      query: '',
      showLoading: false,
    }
  },
  created () {
    this.showLoading = true;

      let cacheLabel = 'forecast_' + this.$route.params.cityId;
      let cacheExpiry = 15 * 60 * 1000; // 15 minutes

if (this.$ls.get(cacheLabel)){
      console.log('Cached query detected.');
      this.results = this.$ls.get(cacheLabel);
      this.showLoading = false;
    } else {
    console.log('No cache detected. Making API request.');
    }
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
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
  width: 200px;
  min-height: 300px;
  border: solid 1px #e8e8e8;
  padding: 10px;
  margin: 5px;
}

a {
  color: #42b983;
}
</style>


