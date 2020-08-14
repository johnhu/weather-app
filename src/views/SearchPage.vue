<template>
  <div id="body">
      <div class="content">
        <h2>Enter a city</h2>
        <input
          v-on:keyup.enter="submitQuery"
          v-model="query"
          placeholder="Seattle"
          id="text-box"
        />
        <!-- <button v-on:click="submitQuery" id="send-button">Search</button> -->
        <div class="citylist">
          <button @click="submitQuery">Search</button>
          <button @click="picker">Random city</button>
          <button @click="goToCurrent">Current city</button>
        </div>
      </div>
  </div>
</template>

<script>

export default {
  name: "SearchPage",
  data() {
    return {
      cityList: ['Toronto', 'Tokyo','Paris','Berlin','Moscow','Cape Town', 'Las Vegas',
      'London', 'New York', 'Los Angeles', 'Florida', 'Cancun', 'Vienna', 'Phnom Penh', 'Montevideo', 
      'New Delhi', 'Shanghai', 'Seoul', 'Baltimore', 'Cleveland', 'Rome', 'San Antonio', 'Mumbai', 'Bangkok',
      'Albuquerque', 'Charlotte', 'Omaha', 'Chicago', 'Barcelona'],
      query: ''
    };
  },
  components: {
    // "about": About;
  },
  mounted(){
    this.picker();
  },
  methods: {
    submitQuery: function() { //push search query to results view
      this.$router.push({
        name: "SearchResults",
        params: {
          query: this.query
        }
      });
    },
    goToCurrent: function() {
      this.$router.push("current");
    },
    picker: function(){
      var randomIndex = Math.floor(Math.random() * this.cityList.length);
      this.query = this.cityList[randomIndex];
    }
  }
};
</script>

<style scoped>
.content {
  text-align: center;
  position: absolute;
  background-repeat: no-repeat;
  background-position: 15px;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30%;
  height: 100%;
  z-index: -1;
}

.errors li {
  color: red;
  border: solid red 1px;
  padding: 5px;
}
h1,
h2 {
  font-weight: bold;
  text-align: left;
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

.current-city {
  text-decoration: none;
  color: unset;
}

button {
  border: 1px solid rgb(134, 134, 134);
  margin: 8px;
  padding: 5px;
}

/* #send-button {
  padding: 10px;
  background-color: transparent;
  margin-left: 7px;
  border: 1px solid;
  border-color: rgb(134, 134, 134);
  color: rgb(134, 134, 134);
} */

#send-button:hover {
  background-color: rgb(227, 236, 240);
}

::placeholder {
  color:rgb(134, 134, 134);
  font-size: 1.2em;
}

input {
  color: rgb(134, 134, 134);
}

@media only screen and (max-width: 670px) {
  .content{
    width: 80%;
  }
  #send-button {
    padding-left: 20px;
    padding-right: 20px;
    margin-top: 15px;
  }

  #about {
    background-color: rgb(43, 45, 47, 0.6);
    z-index: 6;
  }
}

@media only screen and (min-width: 670px) {
  #about {
    width: 33%;
  }
}

@media only screen and (max-width: 376px) {
  h1,
  #send-button,
  #text-box {
    margin-left: 30px;
    margin-right: 30px;
  }

  #text-box {
    width: 75%;
  }
}
</style>


