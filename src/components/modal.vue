<template>
    <div class="modal-backdrop" @click="$emit('close')">
      
  <transition name="fade">
      <div class="modal-wrapper" role="dialog" @click.stop>
        <div class="modal-container">
          <div class="modal-header">
            <h3 class="date">{{data.dt|formatDate}}</h3>
            <h3 class="modal-city">{{city}}</h3>
            <button class="modal-default-button" @click="$emit('close')">X</button>
          </div>

          <div class="modal-body">
            <div class="modal-temp">
              <h3 class="avg-temp">{{avgTemp|round}}&deg;</h3>
            </div>
            <div class="modal-icon">
              <img
                v-bind:src="require('@/assets/' + data.weather[0].icon + '.svg')"
                v-bind:alt="data.weather[0].main"
                width="50%"
              />
              <h3 class="modal-main">{{data.weather[0].description}}</h3>
            </div>
          </div>

          <div class="modal-footer">
            
            <div class="modal-data">
              <table>
                <tr>
                  <td>high</td>
                  <td>{{data.temp.max|round}}&deg;</td>
                </tr>
                <tr>
                  <td>low</td>
                  <td>{{data.temp.min|round}}&deg;</td>
                </tr>
                <tr>
                  <td>humidity</td>
                  <td>{{data.humidity}}%</td>
                </tr>
                <tr>
                  <td>wind</td>
                  <td>{{data.wind_speed}}mph</td>
                </tr>
                <tr>
                  <td>uv index</td>
                  <td>{{data.uvi}}</td>
                </tr>
              </table>
            </div>
            <table class="footer-items">
              <tr>
                <td>morning</td>
                <td>{{ data.temp.morn|round }}&deg;</td>
                <td></td>
              </tr>
              <tr>
                <td>afternoon</td>
                <td>{{data.temp.day|round}}&deg;</td>
                <td></td>
              </tr>
              <tr>
                <td>evening</td>
                <td>{{data.temp.eve|round}}&deg;</td>
                <td></td>
              </tr>
              <tr>
                <td>night</td>
                <td>{{data.temp.night|round}}&deg;</td>
                <td></td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      
  </transition>
    </div>
</template>
<script>
export default {
  name: "modal",
  methods: {
    close() {
      this.$emit("close");
    },
  },
  data() {
    return {
      modalData: null,
      averageTmp: null,
      weatherData: null,
      messages: [],
      query: "",
      showLoading: false,
    };
  },
  props: ["data", "avgTemp", "city"],
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
    round: function (value, decimals) {
      if (!value) {
        value = 0;
      }

      if (!decimals) {
        decimals = 0;
      }

      value =
        Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
      return value;
    },
  },
};
</script>
<style>
.modal-icon h3 {
  color: #363636;
}
.modal-backdrop {
  position: fixed;
  width: 100%;
  height:100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.modal-wrapper {
  background: rgba(112, 172, 182, 0.8);
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 10px;
  position: relative;
  border-radius: 25px;
  width: 35%;
  box-shadow: 2px 2px 20px 1px rgba(0, 0, 0, 0.3);
  overflow-x: hidden;
  display: table;
  /* flex-direction: column; */
  z-index: 9998;
  transition: opacity 0.3s ease;
}

.date, .modal-city {
  color: white;
}

tr,
td {
  color: rgb(255, 255, 255);
  text-align: left;
}

td {
  padding-left: 20px;
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}

.modal-header {
  border-bottom: 1px solid #eeeeee;
  color: #dbdbdb;
  justify-content: space-between;
}

.modal-body {
  display: flex;
  padding: 20px 10px;
  padding-bottom: 0;
}

h3.modal-main {
  color: #dbdbdb;
}

.modal-footer {
  width: 100%;
  display: flex;
  justify-content: center;
  text-align: center;
}

.avg-temp {
  font-size: 3.5rem;
  color: #dbdbdb;
}
.modal-temp,
.modal-data,
.modal-icon {
  width: 50%;
  margin: auto;
}

table {
  margin: auto;
}

.footer-items {
  justify-content: center;
}

.btn-close {
  border: none;
  font-size: 20px;
  padding: 20px;
  cursor: pointer;
  font-weight: bold;
  color: #414141;
  background: transparent;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.fade-enter-active, .fade-leave-active {
  opacity: 0.5s;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

@media only screen and (max-width: 768px) {
 .modal-header{
   display: inline-flex;
   width: 100%;
 }
 
.modal-default-button {
 float: right;
 width:10%;
}
}

@media only screen and (max-width: 425px) {
  .modal-wrapper {
    margin-left: 10px;
    padding: 0;
    padding-bottom: 10px;
     zoom: 0.95;
  }
  
.modal-backdrop {
  justify-content:left;
}
}

@media only screen and (max-width: 320px) {
  .modal-wrapper {
    margin-left: 8px;
    padding: 0;
    padding-bottom: 10px;
     zoom: 0.85;
  }

}
</style>