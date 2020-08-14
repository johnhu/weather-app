<template>
<body>
  <h2>
    The weather in
    <span v-if="currentCity">{{ this.currentCity.name }}, {{ this.currentCity.sys.country }}</span>
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
      <vueper-slides
        class="no-shadow"
        :visible-slides="3"
        :slide-ratio="1 / 4"
        :dragging-distance="70"
      >
        <vueper-slide v-for="(forecast,i) in weatherData.daily" :key="i">
          <template v-slot:content>
            <div class="slide" @click="showModal = true, addToModal(i);">
              <h3>{{forecast.dt|formatDate}}</h3>
              <img
                v-bind:src="'http://openweathermap.org/img/w/' + forecast.weather[0].icon + '.png'"
                v-bind:alt="forecast.weather[0].main"
              />
              <h4>{{forecast.weather[0].main}}</h4>
            </div>
          </template>
        </vueper-slide>
      </vueper-slides>
      <!-- use the modal component, pass in the prop -->
      <modal v-if="showModal" @close="showModal = false" :data="modalData" :avgTemp="avgTemp"></modal>
    </div>
  </div>
</body>
</template>

<script>
import { API } from "@/common/api";
import WeatherMain from "@/components/WeatherMain";
import CurrentWeather from "@/components/CurrentWeather";
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";
import modal from "@/components/modal.vue";

export default {
  name: "CurrentCity",
  components: {
    VueperSlides,
    VueperSlide,
    "weather-info": CurrentWeather,
    "weather-main": WeatherMain,
    modal,
  },
  data: () => ({
    userLat: null,
    userLon: null,
    currentCity: null,
    modalData: null,
    tempValues: null, //only used for calculating avgTemp
    avgTemp: null,
    weatherData: null,
    showModal: false,
    query: "",
    // showLoading: false,
  }),
  created() {
    console.log("setGPSdata-Location");
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((location) => {
        this.userLat = location.coords.latitude;
        this.userLon = location.coords.longitude;
        this.fetchByLocation(this.userLat, this.userLon);
        this.fetchOneCall(this.userLat, this.userLon);
      });
    }

    this.showLoading = true;
    // let cacheLabel = "currentWeather_" + this.$route.params.cityId;
    // let cacheExpiry = 15 * 60 * 1000; // 15 minutes

    // if (this.$ls.get(cacheLabel)) {
    //   console.log("Cached query detected.");
    //   this.weatherData = this.$ls.get(cacheLabel);
    //   this.showLoading = false;
    // } else {
    //   console.log("No cache detected. Making API request.");
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

      return `${months[month]} ${daynum}`;
    },
  },
  methods: {
    addToModal(i) {
      this.modalData = this.weatherData.daily[i];
      this.getAvgTemp(this.modalData);
    },
    getAvgTemp(modalData) {
      this.tempValues = Object.values(modalData.temp); //turns modaldata.temp object into array
      let sum = this.tempValues.reduce(
        (previous, current) => (current += previous)
      );
      let avg = sum / this.tempValues.length;
      this.avgTemp = avg;
    },
    fetchByLocation(lat, lon) {
      API.get("weather", {
        params: {
          lat,
          lon,
          appid: "cadb942492f5c2c67512076c9cd5e63d",
        },
      })
        .then((response) => {
          this.currentCity = response.data;
          this.showLoading = false;
        })
        .catch((error) => {
          this.messages.push({
            type: "error",
            text: error.message,
          });
          this.showLoading = false;
        });
    },
     fetchOneCall(lat, lon) {
      
      API.get("onecall", { //note: onecall is only able to accept lat/lon
        params: { 
          lat,
          lon,
          appid: "cadb942492f5c2c67512076c9cd5e63d",
        },
      })
        .then((response) => {
          // this.$ls.set(cacheLabel, response.data, cacheExpiry);
          this.showLoading = false;
          this.weatherData = response.data;
        })
        .catch((error) => {
          this.showLoading = false;
          this.messages.push({
            type: "error",
            text: error.message,
          });
        })
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
h3 {
  font-weight: normal;
}

h2,
span {
  font-weight: bold;
}

h2,
h3 {
  font-size: 1.7rem;
}

span {
  color: rgb(0, 132, 209);
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

.vueperslides {
  z-index: 0;
}

.vueperslide {
  padding: 8px;
}

.vueperslide:hover {
  background-color: rgb(214, 214, 214);
  cursor: pointer;
}
</style>