<template>
  <transition name="modal">
    <div class="modal-backdrop" @click="$emit('close')">
      <div class="modal-wrapper" @click.stop>
        <div class="modal-container">
          <div class="modal-header">
            <h3>{{data.dt|formatDate}}</h3>
            <button class="modal-default-button" @click="$emit('close')">X</button>
          </div>

          <div class="modal-body">
            <div class="modal-temp">
              <h3 class="avg-temp">{{avgTemp|round}}&deg;F</h3>
              <br />
              <p>(average)</p>
            </div>
            <div class="high-low">
              <table>
                <tr>High: {{data.temp.max|round}}</tr>
                <tr>Low: {{data.temp.min|round}}</tr>
              </table>
            </div>
          </div>

          <div class="modal-footer">
            <table>
              <tr>
                <td>morning</td>
                <td>{{ data.temp.morn|round }}</td>
                <td></td>
              </tr>
              <tr>
                <td>afternoon</td>
                <td>{{data.temp.day|round}}</td>
                <td></td>
              </tr>
              <tr>
                <td>evening</td>
                <td>{{data.temp.eve|round}}</td>
                <td></td>
              </tr>
              <tr>
                <td>night</td>
                <td>{{data.temp.night|round}}</td>
                <td></td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  </transition>
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
  props: ["data", "avgTemp"],
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
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-wrapper {
  background: #ffffff;
  width: 300px;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: table;
  /* flex-direction: column; */
  z-index: 9;
  transition: opacity 0.3s ease;
}

.modal-container {
  width: 300px;
  display: table-cell;
  vertical-align: middle;
  transition: all 0.3s ease;
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}

.modal-header {
  border-bottom: 1px solid #eeeeee;
  color: #4aae9b;
  justify-content: space-between;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  width: 300px;
  display: inline-flex;
  justify-content: space-between;
}

table {
  table-layout: fixed;
}

.avg-temp {
  font-size: 2rem;
}

.modal-body {
  display: flex;
  position: relative;
  padding: 20px 10px;
}

.modal-temp,
.high-low {
  width: 50%;
}

.btn-close {
  border: none;
  font-size: 20px;
  padding: 20px;
  cursor: pointer;
  font-weight: bold;
  color: #4aae9b;
  background: transparent;
}

.btn-green {
  color: white;
  background: #4aae9b;
  border: 1px solid #4aae9b;
  border-radius: 2px;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>