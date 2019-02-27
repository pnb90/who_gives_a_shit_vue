<template>
  <div class="restrooms-index">
    <h1>All Restrooms</h1>
    <div v-for="restroom in restrooms">
      <h2>{{ restroom.name }}</h2>
      <img v-bind:src="restroom.url">
      <p>Width: {{ restroom.width }}</p>
      <p>Height: {{ restroom.height }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      restrooms: []
    };
  },
  created: function() {
    axios.get("/api/restrooms")
    .then(response => {
      this.restrooms = response.data;
    });
  },
  methods: {}
};
</script>