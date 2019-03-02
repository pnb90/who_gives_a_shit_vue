<template>
  <div class="reviews-edit">
    <div class="container">
      <div class="restroom-content">
    <h1>Edit Review</h1>
    <ul>
      <li v-for="error in errors">{{ error }}</li> 
    </ul>
      <form v-on:submit.prevent="submit()">
        <div>
        Cleanliness: <star-rating class="d-flex justify-content-center" v-bind:star-size="25" v-model="review.cleanliness"></star-rating>
        </div>
        <div>
        Uniqueness: <star-rating class="d-flex justify-content-center" v-bind:star-size="25" v-model="review.uniqueness"></star-rating> 
        </div>
        <div> 
        Upkeep: <star-rating class="d-flex justify-content-center" v-bind:star-size="25" v-model="review.upkeep"></star-rating> 
        </div>
        <div>
        Toliet Paper Quality: <star-rating class="d-flex justify-content-center" v-bind:star-size="25" v-model="review.toilet_paper_quality"></star-rating> 
        </div>
        <div>
        Amenities: <star-rating class="d-flex justify-content-center" v-bind:star-size="25" v-model="review.amenities"></star-rating> 
        </div>
        <div>
        Accessibility: <star-rating class="d-flex justify-content-center" v-bind:star-size="25" v-model="review.accessibility"></star-rating> 
        </div>
        <div>
        Number of Stalls: <star-rating class="d-flex justify-content-center" v-bind:star-size="25" v-model="review.number_of_stalls"></star-rating> 
        </div>
        <div>
        Size: <star-rating class="d-flex justify-content-center" v-bind:star-size="25" v-model="review.size"></star-rating> 
        </div>
        <div>
        Privacy: <star-rating class="d-flex justify-content-center" v-bind:star-size="25" v-model="review.privacy"></star-rating> 
        </div>
        <div>
        Summary: 
        <input type="text" v-model="review.summary">
        </div>
        <input type="submit" v-on:click="totalRatings()" value="Rate" class="btn btn-primary">
      </form>
      </div>

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
                  cleanliness: 0,
                  uniqueness: 0,
                  upkeep: 0,
                  toliet_paper_quality: 0,
                  amenities: 0,
                  accessibility: 0,
                  number_of_stalls: 0,
                  size: 0,
                  privacy: 0,
                  location: "",
                  summary: "",
                  overall_rating: 0
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
                      toilet_paper_quality: this.review.toilet_paper_quality,
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
      },
      totalRatings: function() {
        var total = parseFloat(this.review.privacy) + parseFloat(this.review.amenities)
          + parseFloat(this.review.cleanliness) + parseFloat(this.review.uniqueness)
          + parseFloat(this.review.upkeep) + parseFloat(this.review.toliet_paper_quality)
          + parseFloat(this.review.accessibility) + parseFloat(this.review.number_of_stalls)
          + parseFloat(this.review.size);
        var sum = (total / 9);
        console.log(total);
          
        this.review.overall_rating = sum;
      }
    }
  }
</script>