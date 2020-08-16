<template>
  <v-main>
    <v-parallax v-if="photoData" :src='photoData.src.large' :alt="setAltImg">
    <div class="overlay">
    <v-container>
    <header>
    <h2 id="weather-title">
    The weather in
    <span
    v-if="weatherData"
    >{{ this.$route.params.cityName }}, {{ this.$route.params.cityCountry }}</span>
    <span v-if="currentCity">{{ this.currentCity.name }} {{ this.currentCity.sys.country }}</span>
    </h2>
    </header>
    <div v-if="weatherData" class="main-weather">
    <spinner v-if="showLoading"></spinner>
    <h3 id="currently">Currently</h3>
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
    v-bind:src="'http://openweathermap.org/img/wn/' + forecast.weather[0].icon + '.png'"
    v-bind:alt="forecast.weather[0].main"
    width="50%"
    />
    <h4>{{forecast.weather[0].main}}</h4>
    </div>
    </template>
    </vueper-slide>
    </vueper-slides>
    <!-- use the modal component, pass in the prop -->
    <modal v-if="showModal" @close="showModal = false" :data="modalData" :avgTemp="avgTemp"></modal>
    </div>
    <h5>Photo courtesy of {{photoData.photographer}} via Pexels</h5>
    </v-container></div>
    </v-parallax>
  </v-main>
</template>

<script>
import axios from "axios";
import WeatherMain from "@/components/WeatherMain";
import CurrentWeather from "@/components/CurrentWeather";
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";
import modal from "@/components/modal.vue";

export default {
  name: "WeatherData",
  components: {
    VueperSlides,
    VueperSlide,
    "weather-info": CurrentWeather,
    "weather-main": WeatherMain,
    modal,
  },
  data: () => ({
    openweathermap: "//api.openweathermap.org/data/2.5/",
    pexels: "https://api.pexels.com/v1/search?query=",
    photoData: null,
    userLat: null,
    userLon: null,
    currentCity: null,
    modalData: null,
    tempValues: null, //only used for calculating avgTemp
    avgTemp: null,
    weatherData: null,
    showModal: false,
    query: "",
    altPic: {picture:'../src/assets/logo.png'}
    // showLoading: false,
  }),
  beforeMount() {
    this.getPhoto();
  },
  created() {
    axios
      .get(this.openweathermap + "onecall", {
        //note: onecall is only able to accept lat/lon
        params: {
          lat: this.$route.params.cityLat,
          lon: this.$route.params.cityLon,
          appid: "cadb942492f5c2c67512076c9cd5e63d",
          units: "imperial",
        },
      })
      .then((response) => {
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
      axios
        .get(this.openweathermap + "weather", {
          params: {
            lat,
            lon,
            appid: "cadb942492f5c2c67512076c9cd5e63d",
            units: "imperial",
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
    async getPhoto() {
      const {
        data: { photos }
      } = await axios({
        url: this.pexels + this.$route.params.cityName + "&per_page=15&page=1",
        headers: {
          Authorization: "563492ad6f91700001000001c0d2839f80374d8cb821b1e3e5561ab2"
        }
      });
      this.photoData = photos[0];
    },
    setAltImg(event){
      event.target.src = "@/assets/logo.png"
    },
    saveImgLink(){
      
    }
    // fetchOneCall(lat, lon) {
    // },
  },
};
</script>

<style scoped>
v-main {
  width: 80%;
  margin: auto;
}

.overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(152, 181, 201, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

#weather-title {
  margin-bottom: 20px;
}

.main-weather {
  margin: auto;
  padding-bottom: 50px;
  display: flex;
  align-items: center;
  width: 50%;
}

.weather-image {
  width: 50%;
}

.weather-info {
  width: 50%;
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
h5 {
  float: right;
}

span {
  color: rgb(170, 235, 255);
  text-shadow: 5px 0px 7px #434969;
}

.vueperslides {
  z-index: 0;
}

.vueperslide {
  padding: 8px;
}

.vueperslide:hover {
  background-color: rgb(214, 214, 214, 0.2);
  cursor: pointer;
}

@media only screen and (max-width: 375px) {
  v-main {
    position: absolute;
    top: 20%;
    left: 10%;
  }
}
</style>