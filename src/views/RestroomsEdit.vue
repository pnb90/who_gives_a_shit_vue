<template>
  <div class="restrooms-edit">
    <div class="pos-f-t">
      <div class="collapse" id="navbarToggleExternalContent">
        <div class="bg-dark p-4">
          <div>
            <router-link to="/">Home</router-link>
          </div>
          <router-link to="/logout">Log Out</router-link>
        </div>
      </div>
      <nav class="navbar navbar-dark bg-dark">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      </nav>
    </div>
    <h1>Edit Restroom</h1>
    <ul>
      <li v-for="error in errors">{{ error }}</li> 
    </ul>
    <div class="container">
      
    <form v-on:submit.prevent="submit()">

        <div>
          Name: <input v-model="restroom.name">
        </div>

        <div>
          Location: <input v-model="restroom.location">
        </div>

        <input type="submit" value="Update" class="btn btn-primary">
     </form>
    </div>
  </div>
</template>

<style>
  
</style>

<script>
var axios = require('axios');

  export default {
    data: function() {
      return {
        restroom: {
                  location: "",
                  name: ""
                },
        errors: []
      };
    },
    created: function() {
      axios.get("/api/restrooms/" + this.$route.params.id)
      .then(response => {
        console.log(response.data);
        this.restroom = response.data;
      });
    },
    methods: {
      submit: function() {
        var params = {
                      location: this.restroom.location,
                      name: this.restroom.name
                      };


        axios.patch("/api/restrooms/" + this.restroom.id, params)
          .then(response => {
           this.$router.push("/restrooms/" + this.restroom.id);
          }).catch(error => {
          this.errors = error.response.data.errors;
          });
      }
    }
  }
</script>