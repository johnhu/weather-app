<template>
  <v-main>
    <v-parallax v-if="photo" :src="photo.src.large2x">
      <div class="overlay">
        <div id="body">
          <div class="content">
            <form>
              <input
                @click="query=''"
                v-on:keyup.enter="preFetchPhoto();"
                v-model="query"
                id="text-box"
              />
              <div class="submits">
                <button @click="preFetchPhoto();">Search city</button>
                <button @click="picker(); getCities(); preFetchPhoto();">Random city</button>
              </div>
            </form>
            <div id="search-results">
              <load-spinner v-if="loading" color="ffffff" size=50></load-spinner>
              <ul class="cities" v-if="results && results.list.length > 0">
                <li class="city-result" v-for="(city,index) in results.list" :key="index">
                  <router-link
                    class="result-name"
                    v-bind:to="{ name: 'WeatherData',
    params: { cityLat: city.coord.lat,
    cityLon: city.coord.lon,
    cityName: city.name,
    cityCountry: city.sys.country
     } }"
                  >{{ city.name }}, {{ city.sys.country }}</router-link>

                  <img
                    class="result-img"
                    :src="require('@/assets/' + city.weather[0].icon + '.svg')"
                    :alt="city.weather[0].main"
                  />
                </li>
              </ul>
              <ul class="error" v-if="message!==''">
                <li>{{this.message}}</li>
              </ul>
            </div>
          </div>
        </div>
        <div id="data-footer">
          <div id="attribution"><h5>
          Photo of
          <p v-if="this.initiallyFailed==false">{{this.query}}</p>
          <p v-else>{{this.results.list[0].weather[0].main}} (weather in {{this.query}})</p>
          by {{photo.photographer}} on
          <a href="https://www.pexels.com/">Pexels</a>
          </h5></div>
          <button class="new-photo" @click="newPhoto()">New Photo</button>
        </div>
      </div>
    </v-parallax>
  </v-main>
</template>

<script>
import { ClipLoader } from "@saeris/vue-spinners";
import axios from "axios";

export default {
  name: "Search",
  components: {
    "load-spinner": ClipLoader,
  },
  data() {
    return {
      cityList: [
        "Toronto",
        "Tokyo",
        "Paris",
        "Berlin",
        "Moscow",
        "Cape Town",
        "Las Vegas",
        "London",
        "New York City",
        "Los Angeles",
        "Florida",
        "Cancun",
        "Vienna",
        "Phnom Penh",
        "Montevideo",
        "Delhi",
        "Shanghai",
        "Seoul",
        "Baltimore",
        "Cleveland",
        "Rome",
        "San Antonio",
        "Mumbai",
        "Bangkok",
        "Albuquerque",
        "Charlotte",
        "Omaha",
        "Chicago",
        "Barcelona",
        "Melbourne",
        "Auckland",
        "Sao Paulo",
        "Mexico City",
        "Cairo",
        "Dhaka",
        "Beijing",
        "Osaka",
        "Karachi",
        "Buenos Aires",
        "Istanbul",
        "Kolkata",
        "Rio De Janeiro",
        "Lagos",
        "Manila",
        "Kinshasa",
        "Shenzhen",
        "Lahore",
        "Bangalore",
        "Bogota",
        "Jakarta",
        "Lima",
        "Hyderabad",
        "Tehran",
        "Ho Chi Minh City",
        "Luanda",
        "Kuala Lumpur",
        "Madrid",
        "Houston",
        "Dallas",
        "Seattle",
        "Vancouver",
        "Singapore",
        "Atlanta",
        "Philadelphia",
        "Khartoum",
        "Saint Petersburg",
        "Athens",
        "Amsterdam",
        "Taipei",
      ],
      pexels: "https://api.pexels.com/v1/search?query=",
      openweathermap: "//api.openweathermap.org/data/2.5/",
      initiallyFailed: false,
      photo: null,
      photos: null,
      query: "",
      storedQuery: "",
      results: null,
      loading: false,
      message: ""
    };
  },
  created() {
    this.picker();
  },
  mounted(){
    this.preFetchPhoto();
  },
  methods: {
    preFetchPhoto () {
      if (this.query !== this.storedQuery) {
        this.storedQuery= this.query;
        this.didItFail();
      }
      else if (this.query == this.storedQuery){
        this.getCities();//Will not fetch photos if the query is the same as the last one
      }
    },
    didItFail() { //Resets the boolean so it'll fetch photos with search query instead of weather result
      if(this.initiallyFailed==true) {
        this.initiallyFailed =false;
        this.getPhoto();
      }
      else {
        this.getPhoto();
      }
    },
    async getPhoto() {
      var query = "";
      //conditionally choose query to fetch a photo of the weather
      // if city image not found
      if (this.initiallyFailed == false) {
        query = this.query;
      }
        else if (this.initiallyFailed == true && this.results.count !== 0 && this.results !==null) {
        query = this.results.list[0].weather[0].main;
      }
       else {
        query = "weather";
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
      this.handleUndefined();
      this.newPhoto();
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

    /*city is passed into listItems array*/
    getCities: function () {
      this.message="";
      this.loading = true;
      if (this.query == ""){
        // var elem = document.querySelector('.cities');
        // elem.style.display = 'none';
        this.results = null;
        this.message="Please enter a search term."
          this.loading = false;
      }
      axios
        .get(this.openweathermap + "find", {
          params: {
            q: this.query,
            appid: "cadb942492f5c2c67512076c9cd5e63d",
          },
        })
        .then((response) => {
          this.results = response.data;
          this.loading = false;
        })
        .catch((error) => {
          this.messages.push({
            type: "error",
            text: error.message,
          });
          this.loading = false;
        });
    },
    picker: function () {
      var randomIndex = Math.floor(Math.random() * this.cityList.length);
      this.query = this.cityList[randomIndex];
    },
  },
};
</script>

<style scoped>
#body {
  width: 80%;
  position: absolute;
  left: 50%;
}
.content {
  text-align: center;
  position: absolute;
  top: -220px;
  transform: translate(-50%, -50%);
  width: 30%;
  height: 100%;
}

.v-parallax {
  background-size: cover;
  padding: 0;
  margin: 0;
  height: 880px !important;
}

.overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(152, 187, 201, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
}

h1,
h2 {
  text-align: left;
}

button {
  border: 1px solid rgba(240, 240, 240, 0.8);
  margin: 8px;
  padding: 5px;
}

li {
  text-align: left;
}

.result-name,
.error {
  font-weight: bold;
  text-decoration: none;
  font-size: 1.8em;
  color: rgb(255, 255, 255);
}
.result-name:hover {
  font-weight: bold;
  text-decoration: none;
  font-size: 1.8em;
  color: rgba(240, 240, 240, 0.8);
}

.city-result {
  margin-bottom: 7px;
}

.result-img {
  width: 7%;
  float: right;
}

a {
  color: #caf7ff;
}

#text-box {
  display: inline-flex;
  background-color: transparent;
  border: none;
  border: 1px solid rgb(240, 240, 240, 0.8);
  padding: 6px;
  width: 100%;
  height: 42px;
}

::placeholder {
  color: rgb(255, 255, 255);
  font-size: 1.2em;
}

#data-footer {
  display: inline-grid;
  padding: 8px;
  position: absolute;
  right: 0;
  bottom: 0;
}

input {
  font-size: 1.5rem;
  color: rgb(255, 255, 255);
}
.title {
  margin: 2px;
}

.cities,
.error {
  list-style-type: none;
  padding: 0;
}

.units-toggle {
  display: none;
}

@media only screen and (max-width: 580px) {
  .content {
    width: 70%;
  }
  .shortcuts {
    width: 50%;
    position: unset;
  }
  #search-results {
    width: 100%;
  }
  .cities {
    text-align: center;
  }
}

@media only screen and (max-width: 426px) {
  .shortcuts {
    display: flexbox;
    width: 90%;
    position: unset;
  }

  #text-box {
    margin-left: 10px;
    width: 90%;
  }
  #send-button {
    width: 92%;
    margin-top: 7px;
    margin-left: 10px;
  }
  .search-result {
    width: 92%;
  }
}
</style>


