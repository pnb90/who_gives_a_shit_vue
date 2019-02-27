<template>
  <div class="restrooms-index">
    <h1> All Restrooms </h1>
      <div class="row">
        <div class="col-md-4" v-for="restroom in restrooms">
          <router-link v-bind:to="'/restrooms/' + restroom.id">
            <div class="card">
              <h2 class="card-title"> {{ restroom.location }}</h2>
            </div>
          </router-link>
        </div>
      </div>
  </div>
</template>

<style>
</style>

<script>
var axios = require("axios");

export default {
  data: function() {
    return {
      restrooms: [],
      currentRestroom: {}
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