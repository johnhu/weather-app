<template>
    <ul class="city-list">
        <li><h2></h2></li>
        <li v-if="savedCities.length < 1">Add cities to this list</li>
        <li v-for="(city,index) in savedCities" :key="index">
          <router-link v-bind:to="{ name: 'CurrentWeather', params: { cityId: city.id } }">{{ city.name }}</router-link> 
          <button v-on:click="removeCity(city)" class="remove">x</button>
        </li>
    </ul>
</template>

<script>
export default {
  name: 'CityList',
  data () {
    return {}
  },
  props: {
    savedCities: Array
  },
  methods: {
    removeCity: function (city) {
      this.savedCities.splice(this.savedCities.indexOf(city), 1);
      this.$ls.set('savedCities', this.savedCities);
    }
  }
}
</script>

<style scoped>
.city-list {
  list-style-type: none;
  padding: 10px;
  background: #ccc;
  width: 25%;
  float: right;
}
.remove {
  font-size: 0.8rem;
  color: white;
  background: #AA0000;
  padding: 2px;
  cursor: pointer;
}
</style>