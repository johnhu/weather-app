<template>
    <div id="body">
      
    <div class="content"><div id="form">
    <p>Enter a city</p>
    <input
    v-on:keyup.enter="getCities"
    v-model="$route.params.query"
    placeholder="Seattle"
    id="text-box"
    />
    </div>
    <div id="search-results">
    <load-spinner v-if="loading">
    </load-spinner>
    <ul class="cities" v-if="results && results.list.length > 0"> 
    <li v-for="(city,index) in results.list" :key="index">
    <router-link class="result-name" v-bind:to="{ name: 'WeatherData',
    params: { cityLat: city.coord.lat,
    cityLon: city.coord.lon,
    cityName: city.name,
    cityCountry: city.sys.country } }">
    {{ city.name }}, {{ city.sys.country }}
    </router-link>
    </li>
    </ul>
    <ul class="error" v-else> <li>{{this.message}}</li> </ul>
    </div></div>
    </div>
</template>

<script>
import { ClipLoader } from '@saeris/vue-spinners'
import axios from 'axios';

export default {
  name: "SearchResults",
  components: {
    "load-spinner":ClipLoader
  },
  data() {
    return {
      openweathermap: '//api.openweathermap.org/data/2.5/',
      results: null,
      query: "",
      loading: false,
      message: null
    };
  },
  created(){
    this.getCities();
  },
  methods: {
    /*city is passed into listItems array*/
    getCities: function() {
      this.results = null;
      this.loading = true;

      axios.get(this.openweathermap+'find', {
        params: {
            q: this.$route.params.query,
            appid: "cadb942492f5c2c67512076c9cd5e63d"
        }
      })
      .then(response => {
      this.results = response.data;
      this.handleResults();
      this.loading = false;
      })
      .catch(error => {
        this.messages.push({
          type: 'error',
          text: error.message
        });
        this.loading = false;
      });
      },
    handleResults: function(){
      if (this.results.count == 1) {
        this.loading = true;
        this.$router.push({
        name: "WeatherData",
        params: {
          cityLat: this.results.list[0].coord.lat,
          cityLon: this.results.list[0].coord.lon,
          cityName: this.results.list[0].name,
          cityCountry: this.results.list[0].sys.country } });
      }
      else if (this.results.count == 0) {
        this.message = "No results found. Try another search.";
      }
    }
    }
  }

</script>

<style scoped>
.content {
  text-align: center;
  position: absolute;
  background-repeat: no-repeat;
  background-position: 15px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30%;
  height: 100%;
  z-index: -1;
}

li {
  text-align: left;
}

.result-name, .error {
  font-weight: bold;
  text-decoration: none;
  font-size: 1.8em;
  color: rgb(114, 114, 114);
}
.result-name:hover {
  font-weight: bold;
  text-decoration: none;
  font-size: 1.8em;
  color: rgb(189, 189, 189);
}

.save {
  background-color: transparent;
  border: 1.5px solid white;
  color: white;
  padding: 10px;
}

.save:hover {
  background-color: rgb(59, 63, 66, 0.5);
}

.learn-more:hover {
  color: rgb(206, 206, 29);
}

#form {
  margin-bottom: 5px;
  margin-top: 30px;
}

.shortcuts {
  margin: 0px;
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0;
}

p {
  margin-bottom: 5px;
}

#text-box {
  display: inline-flex;
  background-color: transparent;
  border: none;
  border: 1px solid rgb(134, 134, 134);
  padding: 3px;
  width: 100%;
  height: 42px;
}

#text-box:hover {
  background-color: rgb(227, 236, 240);
}
/* #send-button {
  padding: 10px;
  background-color: transparent;
  margin-left: 7px;
  border: 1.5px solid;
  border-color: white;
  color: white;
} */

::placeholder {
  color:rgb(134, 134, 134);
  font-size: 1.2em;
}

input {
  color: rgb(134, 134, 134);
}
/* 
#send-button:hover {
  background-color: rgb(59, 63, 66, 0.5);
} */

.title {
  margin: 2px;
}
/* 
#search-results {
  
} */

.cities, .error {
  list-style-type: none;
  padding: 0;
}

a {
  color: yellow;
}

.poster {
  width: 60%;
}

.year {
  font-size: 75%;
  margin-left: 2px;
  color: lightgray;
}

.units-toggle {
  display:none;
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


