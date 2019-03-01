<template>
  <div class="restrooms-edit">
    <h1>Edit Restroom</h1>
    <ul>
      <li v-for="error in errors">{{ error }}</li> 
    </ul>
    <div class="container">
      
    <form v-on:submit.prevent="submit()">
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
                  location: ""
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
                      location: this.restroom.location
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