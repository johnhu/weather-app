<template>
  <body>
    <message-container v-bind:messages="messages"></message-container>
    <city-list :citylist="listItems" class="city-list"></city-list>
    <div id="body">
    <div id="form">
      <p>Enter a city</p>
      <input
        v-on:keyup.enter="getCities"
        v-model="$route.params.query"
        placeholder="Seattle"
        id="text-box"
      />
      <!-- <button v-on:click="getCities" id="send-button">Search</button> -->
    </div>
    <!--Iterates through results and displays city search data in a list -->
    <div id="search-results">
      <load-spinner v-if="showLoading"></load-spinner>
      <ul class="cities" v-if="results && results.list.length > 0">
      <li v-for="(city,index) in results.list" :key="index">
        <router-link class="result-name" v-bind:to="{ name: 'WeatherData', 
        params: { cityLat: city.coord.lat, 
        cityLon: city.coord.lon, 
        cityName: city.name, 
        cityCountry: city.sys.country } }">
        {{ city.name }}, {{ city.sys.country }}
        </router-link>
          <p>
            <button class="save" v-on:click="saveCity(city)">Add to Shortcuts</button>
          </p>
        </li>
      </ul>
    </div>
    </div>
  </body>
</template>

<script>
// import Spinner from "@/components/Spinner";
import {API} from '@/common/api';
// import MessageContainer from "@/components/MessageContainer";
import CityList from "@/components/CityList";

export default {
  name: "SearchResults",
  components: {
    // "spinner": Spinner,
    // "message-container": MessageContainer,
    "city-list": CityList
  },
  data() {
    return {
      results: null,
      query: "",
      showLoading: false,
      messages: [],
      listItems: []
    };
  },
  created() {
    this.getCities();
    if (this.$ls.get("saved")) {
      this.listItems = this.$ls.get("city-list");
    }
  },
  methods: {
    /*city is passed into listItems array*/
    saveCity: function(city) {
      this.listItems.push(city);
      this.$ls.set("city-list", this.listItems);
    },
    getCities: function() {
      this.results = null;
      this.showLoading = true;
      let cacheLabel = "citySearch_" + this.$route.params.query;
      let cacheExpiry = 15 * 60 * 1000; // 15 minutes
      if (this.$ls.get(cacheLabel)) {
        console.log("Cached query detected.");
        this.results = this.$ls.get(cacheLabel);
        this.showLoading = false;
      } else {
        console.log("No cache available. Making API request.");

        
      API.get('find', {
        params: {
            q: this.$route.params.query
        }
      })
      .then(response => {
      this.$ls.set(cacheLabel, response.data, cacheExpiry);
      console.log('New query has been cached as: ' + cacheLabel);
      this.results = response.data;
      this.showLoading = false;
      })
      .catch(error => {
        this.messages.push({
          type: 'error',
          text: error.message
        });
        this.showLoading = false;
      });
      }
    }
  }
}
</script>

<style scoped>
body {
  background-repeat: no-repeat;
  background-position-y: 30px;
}
#body {
  position: absolute;
  background-repeat: no-repeat;
  background-position: 15px;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
}

/* #search-results {
} */

.errors li {
  color: red;
  border: solid red 1px;
  padding: 5px;
}
.result-name {
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
  width: 420px;
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

.cities {
  list-style-type: none;
  padding: 0;
}
.search-result {
  display: inline-block;
  text-align: center;
  vertical-align: top;
  width: 235px;
  min-height: 300px;
  border: none;
  padding: 5px;
  margin: 5px;
  box-shadow: 0px 0px 3px rgb(131, 131, 131);
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

@media only screen and (max-width: 580px) {
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


