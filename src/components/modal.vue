<template>
  <transition name="modal">
    <div class="modal-backdrop">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <h3>{{data.dt|formatDate}}</h3>
          </div>

          <div class="modal-body">
            <div class="temp">
              <h3>79 F</h3>
            </div>
            <div class="high-low">
              <dt>High: </dt>
              <dd>55 F </dd>
              <br/>
              <dt>Low: </dt>
              <dd>51 F </dd>
              </div>
          </div>

          <div class="modal-footer">
            <button class="modal-default-button" @click="$emit('close')">X</button>
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
      weatherData: null,
      messages: [],
      query: "",
      showLoading: false,
    };
  },
  props: ["data"],
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
  display: flex;
  /* flex-direction: column; */
  z-index: 2;
}

.modal-container {
  width: 300px;
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
  justify-content: flex-end;
}

.modal-body {
  display: flex;
  position: relative;
  padding: 20px 10px;
}

.temp,
.high-low {
  width: 50%;
}
dd, dt {
  display: inline-flex;
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
</style>