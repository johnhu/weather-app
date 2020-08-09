<template>
  <div>
      <!--         
      <transition-group name="fade" tag="div" appear>-->
      <ul v-if="weatherData" class="forecast">
        <li v-for="forecast in weatherData.list" v-bind:key="forecast.dt">
          <h3>{{ forecast.dt|formatDate }}</h3>
          <weather-data v-bind:weatherData="forecast.main"></weather-data>
        </li>
      </ul>
      <!-- </transition-group> -->
    <spinner v-if="showLoading"></spinner>
  </div>
</template>

<script>
import { API } from "@/common/api";
import WeatherData from "@/components/WeatherData";
// import Spinner from '@/components/Spinner';

export default {
  name: "Forecast",
  components: {
    "weather-data": WeatherData,
    // 'load-spinner': Spinner
  },
  data () {
    return {
      weatherData: null,
      messages: [],
      query: '',
      showLoading: false,
    }
  },
  props: {
    foreCast: Object,
  },
  created() {
    this.showLoading = true;

    let cacheLabel = "forecast_" + this.$route.params.cityId;
    let cacheExpiry = 15 * 60 * 1000; // 15 minutes

    if (this.$ls.get(cacheLabel)) {
      console.log("Cached query detected.");
      this.results = this.$ls.get(cacheLabel);
      this.showLoading = false;
    } else {
      console.log("No cache detected. Making API request.");
      API.get("forecast", {
        params: {
          id: this.$route.params.cityId,
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
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
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


