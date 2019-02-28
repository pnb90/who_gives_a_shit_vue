<template>
  <div class="restrooms-edit">
    <h1>Edit Restroom</h1>
    <ul>
      <li v-for="error in errors">{{ error }}</li> 
    </ul>
    <div class="container">
      
    <form v-on:submit.prevent="submit()">
<!--         <div>
          Cleanliness: <input v-model="restroom.Cleanliness">
        </div>
        <div>
          Uniqueness: <input v-model="restroom.uniqueness">
        </div>
        <div>
          Upkeep: <input v-model="restroom.upkeep">
        </div>
        <div>
          Toliet_paper_quality: <input v-model="restroom.toliet_paper_quality">
        </div>
        <div>
          Amenities: <input v-model="restroom.amenities">
        </div>
        <div>
          Accessibility: <input v-model="restroom.accessibility">
        </div>
        <div>
          Number of Stalls: <input v-model="restroom.number_of_stalls">
        </div>
        <div>
          Size: <input v-model="restroom.size">
        </div>
        <div>
          Privacy: <input v-model="restroom.privacy">
        </div> -->
        <div>
          Location: <input v-model="restroom.location">
        </div>
<!--         <div>
          Summary: <input v-model="restroom.summary"> -->
<!--         </div>
        <div>
          Overall Rating: <input v-model="restroom.overall_rating">
        </div> -->
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