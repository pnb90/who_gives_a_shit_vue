<template>
  <div class="reviews-edit">
    <h1>Edit Review</h1>
    <ul>
      <li v-for="error in errors">{{ error }}</li> 
    </ul>
    <div class="container">
      
    <form v-on:submit.prevent="submit()">
        <div>
          Cleanliness: <input v-model="review.cleanliness">
        </div>
        <div>
          Uniqueness: <input v-model="review.uniqueness">
        </div>
        <div>
          Upkeep: <input v-model="review.upkeep">
        </div>
        <div>
          Toliet_paper_quality: <input v-model="review.toilet_paper_quality">
        </div>
        <div>
          Amenities: <input v-model="review.amenities">
        </div>
        <div>
          Accessibility: <input v-model="review.accessibility">
        </div>
        <div>
          Number of Stalls: <input v-model="review.number_of_stalls">
        </div>
        <div>
          Size: <input v-model="review.size">
        </div>
        <div>
          Privacy: <input v-model="review.privacy">
        </div>
        <div>
          Summary: <input v-model="review.summary">
        </div>
        <div>
          Overall Rating: <input v-model="review.overall_rating">
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
        review: {
                  cleanliness: "",
                  uniqueness: "",
                  upkeep: "",
                  toliet_paper_quality: "",
                  amenities: "",
                  accessibility: "",
                  number_of_stalls: "",
                  size: "",
                  privacy: "",
                  location: "",
                  summary: "",
                  overall_rating: ""
                },
                restroom: [],
        errors: []
      };
    },
    created: function() {
      axios.get("/api/reviews/" + this.$route.params.id)
      .then(response => {
        console.log(response.data);
        this.review = response.data;
      });
    },
    methods: {
      submit: function() {
        var params = {
                      cleanliness: this.review.cleanliness,
                      uniqueness: this.review.uniqueness,
                      upkeep: this.review.upkeep,
                      toliet_paper_quality: this.review.toliet_paper_quality,
                      amenities: this.review.amenities,
                      accessibility: this.review.accessibility,
                      number_of_stalls: this.review.number_of_stalls,
                      size: this.review.size,
                      privacy: this.review.privacy,
                      location: this.review.location,
                      summary: this.review.summary,
                      overall_rating: this.review.overall_rating
                      };


        axios.patch("/api/reviews/" + this.review.id, params)
          .then(response => {
           this.$router.push("/reviews/" + this.review.id);
          }).catch(error => {
          this.errors = error.response.data.errors;
          });
      }
    }
  }
</script>