<template>
  <div class="restrooms-show">
    <h1>{{ restroom.location }}</h1>
    <h2>{{ restroom.reviews.id}}</h2>
<!--     <h4>Id: {{ restroom.id }}</h4> 
    <h4>Cleanliness: {{ restroom.cleanliness }}</h4>
    <h4>Uniqueness: {{ restroom.uniqueness }}</h4>
    <h4>Upkeep: {{ restroom.upkeep }}</h4>
    <h4>Toilet Paper Quality: {{ restroom.toilet_paper_quality }}</h4>
    <h4>Amenities: {{ restroom.amenities }}</h4>
    <h4>Number of Stalls: {{ restroom.number_of_stalls }}</h4>
    <h4>Size: {{ restroom.size }}</h4>
    <h4>Privacy: {{ restroom.privacy }}</h4>
    <h4>Location: {{ restroom.location }}</h4>
    <h4>Summary: {{ restroom.summary }}</h4>
    <h4>Overall Rating: {{ restroom.overall_rating }}</h4>
    <h4>Accessibility: {{ restroom.accessibility }}</h4> -->
      <router-link :to=" '/restrooms/' + restroom.id + '/edit' " class="btn btn-warning">Edit</router-link>
      <button v-on:click="destroyRestroom()" class="btn btn-danger">Delete</button>
  </div>
</template>

<style>
  
</style>
<script>
  var axios = require('axios')

  export default {
    data: function() {
      return {
        restroom: {
                    location: "",
                    reviews: {
                              id: "",
                              cleanliness: "",
                              uniqueness: "",
                              upkeep: "",
                              toilet_paper_quality: "",
                              amenities: "",
                              number_of_stalls: "",
                              size: "",
                              privacy: "",
                              summary: "",
                              overall_rating: "",
                              accessibility: ""     
                              }
                  }
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
      destroyRestroom: function() {
        axios.delete("/api/restrooms/" + this.restroom.id)
          .then(response => {
            console.log("Success", response.data);
            this.$router.push("/");
          });
      }
    }
  }
</script>
