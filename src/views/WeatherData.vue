<template>
  <v-main>
    <load-spinner v-if="loading" color="ffffff" size=50></load-spinner>
    <v-parallax v-if="photo" :src="photo.src.large2x" :alt="this.currentCity">
      <div class="overlay">
        <v-container>
          <header>
            <h2 id="weather-title">
            <span v-if="weatherData">{{ currentCity }}</span>
            </h2>
          </header>
          <div v-if="weatherData" class="main-weather">
            <h3 id="currently">Currently</h3>
            <div id="current-weather">
              <div class="weather-image">
                <weather-main :weatherMain="weatherData"></weather-main>
              </div>
              <div class="weather-info">
                <weather-info :currentWeather="weatherData"></weather-info>
              </div>
            </div>
          </div>
          <div v-if="weatherData" class="forecast">
            <vueper-slides
              class="no-shadow"
              :visible-slides="3"
              :slide-ratio="1 / 4"
              :dragging-distance="70"
              arrows-on-edges
            >
              <vueper-slide v-for="(forecast,i) in weatherData.daily" :key="i">
                <template v-slot:content>
                  <!-- <v-hover v-slot:default="{ hover }"> -->
                  <div class="slide" @click="showModal = true, addToModal(i);">
                    <h3 class="slide-date">{{forecast.dt|formatDate}}</h3>
                    <div class="slide-img-div">
                      <img
                        class="slide-img"
                        :src="require('@/assets/' + forecast.weather[0].icon + '.svg')"
                        :alt="forecast.weather[0].main"
                        width="50%"
                      />
                    </div>
                    <!-- <v-expand-transition>
                        <modal v-if="hover" :data="modalData" :avgTemp="avgTemp"></modal>
                    </v-expand-transition>-->
                    <h4 class="slide-main">{{forecast.weather[0].main}}</h4>
                  </div>
                  <!-- </v-hover> -->
                </template>
              </vueper-slide>
            </vueper-slides>
            <!-- use the modal component, pass in the prop -->
            <modal
              v-if="showModal"
              @close="showModal = false"
              :data="modalData"
              :avgTemp="avgTemp"
              :city="currentCity"
            ></modal>
          </div>
          <div id="data-footer">
          <div id="attribution"><h5>
          Photo of <p v-if="this.initiallyFailed==false">{{this.$route.params.cityName}}</p>
          <p v-else>{{this.weatherData.current.weather[0].main}} (weather in {{this.$route.params.cityName}})</p>
          <br>by {{photo.photographer}} on
          <a href="https://www.pexels.com/">Pexels</a>
          </h5></div>
          <div id="footer"><button class="new-photo" @click="newPhoto()">New Photo</button>
          <a href="http://www.github.com/johnhu/weather-app">
          <img
          src="@/assets/github-white.svg"
          title="GitHub repo"
          width="20px"
          height="20px"
          />
          </a></div>
        </div>
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
import { ClipLoader } from "@saeris/vue-spinners";

export default {
  name: "WeatherData",
  components: {
    VueperSlides,
    VueperSlide,
    "weather-info": CurrentWeather,
    "weather-main": WeatherMain,
    modal,
    "load-spinner": ClipLoader,
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
    loading: false,
  }),
  created() {
    this.loading = true;
    this.getWeather();
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
    getWeather() {
      this.loading = true;
      if (this.$parent.isCelsius == false) {
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
      } else {
        axios
          .get(this.openweathermap + "onecall", {
            //note: onecall is only able to accept lat/lon
            params: {
              lat: this.$route.params.cityLat,
              lon: this.$route.params.cityLon,
              appid: "cadb942492f5c2c67512076c9cd5e63d",
              units: "metric",
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
    },
    setCurrentCity() {
      this.currentCity =
        this.$route.params.cityName + ", " + this.$route.params.cityCountry;
    },
    async getPhoto() {
      var query = "";
      //conditionally choose query to fetch a photo of the weather
      // if city image not found
      if (this.initiallyFailed == false) {
        query = this.$route.params.cityName;
      } else {
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
    handleUndefined() {
      if (this.photos == undefined || this.photos.length == 0) {
        this.initiallyFailed = true;
        this.getPhoto();
      }
    },
    newPhoto() {
      var randomIndex = Math.floor(Math.random() * this.photos.length);
      this.photo = this.photos[randomIndex];
    },
  },
};
</script>

<style scoped>
.main {
  height: 100%;
}

.container {
  margin-top: 30px;
}

.v-parallax {
  height: 880px !important;
  background-attachment: fixed;
  backface-visibility: hidden;
  padding: 0;
  margin: 0;
}

.overlay {
  position:absolute;
  height: 100%;
  width:100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(152, 187, 201, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  width: 100%;
  height: 100%;
}

#weather-title {
  font-size: 2.2em;
  margin: 20px;
  color: white;
}

.main-weather {
  margin: auto;
  margin-bottom: 50px;
  display: flex;
  align-items: center;
  width: 50%;
}

#currently {
  width: 33.33%;
}

#current-weather {
  width: 66.66%;
  display: flex;
  margin: auto;
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
h5 > a {
  color: #d5f5ff;
}

h5>p {
  display: inline-flex;
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

.slide-main {
  font-size: 2.2rem;
  position: absolute;
  text-align: center;
  bottom: 10px;
}

button{
  border: 1px solid rgba(240, 240, 240, 0.8);
  margin: 8px;
  padding: 5px;
}

#data-footer {
  display: inline-grid;
  padding: 8px;
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 5;
}

#attribution {
  text-align: left;
  padding: 8px;
}

#footer {
  display:flex;
  padding: 8px;
  padding-top:0;
  width:100%
}

.new-photo {
  margin: 0;
  margin-right: 3px;
  width: 80%;
}

#footer>a{
  width: 20%;
  margin:auto;
}


@media only screen and (max-width: 965px) {
  .vueperslides__arrows--outside .vueperslides__arrow--prev {
    left: 0 !important;
  }
  .vueperslides__arrows--outside .vueperslides__arrow--next {
    right: 0 !important;
  }
}

@media only screen and (max-width: 640px) {
  #weather-title {
    margin-left: 100px;
    margin-right: 100px;
  }
  h4.slide-main {
    font-size: 110%;
  }
  .main-weather {
    display: grid;
    width:100%;
    margin-bottom: 0px;
  }
  #current-weather {
    display: flex;
    align-items:center;
  }

  #currently {
    display: grid;
    text-align: center;
    width: 100%;
  }
}

@media only screen and (max-width: 425px) {
  .container {
    margin-top: 0px;
  }
  #weather-title {
    margin:0;
    margin-top: 80px;
  }
#weather-title>span {
  font-size: 0.75em;
}
#currently {
  font-size: 23px;
}
  .slide-date {
    font-size: 23px;
  }
}
</style>