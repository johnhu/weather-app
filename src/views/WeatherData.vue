<template>
  <v-main>
    <load-spinner v-if="loading">
    </load-spinner>
    <v-parallax v-if="photo" :src="photo.src.large" :alt="this.currentCity">
      
      <div class="overlay">
        
        <v-container>
          <header>
            <h2 id="weather-title">
              The weather in
              <span
                v-if="weatherData"
              >{{ currentCity }}</span>
            </h2>
          </header>
          <div v-if="weatherData" class="main-weather">
            <spinner v-if="showLoading"></spinner>
            <h3 id="currently">Currently</h3>
            <div class="weather-image">
              <weather-main :weatherMain="weatherData"></weather-main>
            </div>
            <div class="weather-info">
              <weather-info :currentWeather="weatherData"></weather-info>
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
                  <!-- <v-hover v-slot:default="{ hover }"> -->
                    <div class="slide" @click="showModal = true, addToModal(i);">
                      <h3>{{forecast.dt|formatDate}}</h3>
                      <img
                        v-bind:src="'http://openweathermap.org/img/wn/' + forecast.weather[0].icon + '.png'"
                        v-bind:alt="forecast.weather[0].main"
                        width="50%"
                      />
                      <!-- <v-expand-transition>
                        <modal v-if="hover" :data="modalData" :avgTemp="avgTemp"></modal>
                      </v-expand-transition> -->
                      <h4>{{forecast.weather[0].main}}</h4>
                      
                    </div>
                  <!-- </v-hover> -->
                </template>
              </vueper-slide>
            </vueper-slides>
            <!-- use the modal component, pass in the prop -->
            <modal v-if="showModal" @close="showModal = false" :data="modalData" :avgTemp="avgTemp" :city="currentCity"></modal>
          </div>
          <div id="data-footer">
          <button class="new-photo" @click="newPhoto()">New Photo</button>
          <h5 id="attribution">Photo courtesy of {{photo.photographer}} via <a href="https://www.pexels.com/">Pexels</a></h5></div>
        </v-container>
      </div>
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
import { ClipLoader } from '@saeris/vue-spinners'

export default {
  name: "WeatherData",
  components: {
    VueperSlides,
    VueperSlide,
    "weather-info": CurrentWeather,
    "weather-main": WeatherMain,
    modal,
    "load-spinner":ClipLoader
  },
  data: () => ({
    openweathermap: "//api.openweathermap.org/data/2.5/",
    pexels: "https://api.pexels.com/v1/search?query=",
    photo: null,
    photos: null,
    userLat: null,
    userLon: null,
    currentCity: null,
    modalData: null,
    tempValues: null, //only used for calculating avgTemp
    avgTemp: null,
    weatherData: null,
    showModal: false,
    query: "",
    initiallyFailed: false,
    // isCelsius: this.$parent.isCelsius,
    loading: false,
  }),
  // beforeMount() {
    
  // },
  created() {
    this.getWeather();
    this.loading = true;
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
    getWeather (){
      this.loading = true;
      if (this.$parent.isCelsius == false) {
    axios
      .get(this.openweathermap + "onecall", {
        //note: onecall is only able to accept lat/lon
        params: {
          lat: this.$route.params.cityLat,
          lon: this.$route.params.cityLon,
          appid: "cadb942492f5c2c67512076c9cd5e63d",
          units: "imperial"
          },
        })
      .then((response) => {
        this.loading = false;
        this.weatherData = response.data;
        this.setCurrentCity();
        this.getPhoto();
      })
      .catch((error) => {
        this.loading = false;
        this.messages.push({
          type: "error",
          text: error.message,
        });
      });
      }
      else {
        axios
       .get(this.openweathermap + "onecall", {
        //note: onecall is only able to accept lat/lon
         params: {
          lat: this.$route.params.cityLat,
       lon: this.$route.params.cityLon,
           appid: "cadb942492f5c2c67512076c9cd5e63d",
          units: "metric"
           },
         })
       .then((response) => {
         this.loading = false;
         this.weatherData = response.data;
         this.setCurrentCity();
         this.getPhoto();
       })
       .catch((error) => {
         this.loading = false;
         this.messages.push({
           type: "error",
           text: error.message,
       });
       });
       }
       }
    ,
    // fetchByLocation(lat, lon) {
    //   axios
    //     .get(this.openweathermap + "weather", {
    //       params: {
    //         lat,
    //         lon,
    //         appid: "cadb942492f5c2c67512076c9cd5e63d",
    //         units: "imperial",
    //       },
    //     })
    //     .then((response) => {
    //       this.currentCity = response.data;
    //       this.showLoading = false;
    //     })
    //     .catch((error) => {
    //       this.messages.push({
    //         type: "error",
    //         text: error.message,
    //       });
    //       this.showLoading = false;
    //     });
    // },
    setCurrentCity(){
      this.currentCity = this.$route.params.cityName + ", " + this.$route.params.cityCountry;
    },
    async getPhoto() {
      var query = ''
      //conditionally choose query to fetch a photo of the weather
      // if city image not found
      if (this.initiallyFailed == false){ 
      query = this.$route.params.cityName;
      }
      else{
      query = this.weatherData.current.weather[0].main;
      }
      const {
        data: { photos },
      } = await axios({
        url: this.pexels + query + "&per_page=15&page=1",
        headers: {
          Authorization:
            "563492ad6f91700001000001c0d2839f80374d8cb821b1e3e5561ab2",
        },
      });
      this.photos = photos;
      this.newPhoto();
      this.handleUndefined();
    },
    handleUndefined(){
      if (this.photos == undefined || this.photos.length == 0 ) {
        this.initiallyFailed = true;
        this.getPhoto();
      }
    },
    newPhoto(){
      var randomIndex = Math.floor(Math.random() * this.photos.length);
      this.photo = this.photos[randomIndex];
    }
    // fetchOneCall(lat, lon) {
    // },
}};
</script>

<style scoped>
v-main {
  width: 100%;
  margin: auto;
}

.overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(152, 187, 201, 0.7);
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

#currently {
  width: 33.33%;
}

.weather-image {
  width: 33.33%;
}

.weather-info {
  width: 33.33%;
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
h5>a{
  color:#d5f5ff;
}

span {
  color: #caf7ff;
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

.new-photo {
  font-weight: bold;
  color:#2c3e50;
  float: right;
  padding: 8px;
}
.new-photo:hover {
  background-color: rgb(214, 214, 214, 0.2);
  border-radius: 50px;
}

#data-footer {
  display: block;
  line-height: normal;
}


@media only screen and (max-width: 375px) {
  v-main {
    position: absolute;
    top: 20%;
    left: 10%;
  }
}
</style>