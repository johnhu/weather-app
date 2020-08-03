<template>
  <li class="error" v-show="showMessage">
    Error: {{ message.Error }}
    <button v-on:click="close">close</button>
  </li>
</template>

<script>
export default {
  name: "MessageContainer",
  props: {
    message: Object
  },
  data() {
    return {
      showMessage: true
    };
  },
  methods: {
    close: function() {
      this.showMessage = false;
    }
  },
  created() {
    setTimeout(this.close, 5000);
  }
};
</script>

<style scoped>
.error {
  background: rgb(223, 70, 121);
  color: rgb(255, 255, 255);
  margin: 2px auto;
  padding: 2px;
  font-size: 1rem;
  width: 75%;
}
.success {
  background: green;
  color: white;
}
.info {
  background: blue;
  color: white;
}
</style>