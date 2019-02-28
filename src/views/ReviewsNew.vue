<template>
  <div class="reviews-new">
    <h1>New Review</h1>
    <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul>
    <div class="container">
      <form v-on:submit.prevent="submit()">
        <div>
        Cleanliness: <input v-model="newReviewCleanliness">
        </div>
        <div>
        Uniqueness: <input v-model="newReviewUniqueness">
        </div>
        <div> 
        Upkeep: <input v-model="newReviewUpkeep">
        </div>
        <div>
        Toliet Paper Quality: <input v-model="newReviewTolietPaperQuality">
        </div>
        <div>
        Amenities: <input v-model="newReviewAmenities">
        </div>
        <div>
        Accessibility: <input v-model="newReviewAccessibility">
        </div>
        <div>
        Number of Stalls: <input v-model="newReviewNumberOfStalls">
        </div>
        <div>
        Size: <input v-model="newReviewSize">
        </div>
        <div>
        Privacy: <input v-model="newReviewPrivacy">
        </div>
        <div>
        Summary: <input type="text" v-model="newReviewSummary">
        </div>
        <h3>
        Overall Rating: <input v-model="newReviewOverallRating">
        </h3>
        <input type="submit" value="Rate" name="btn btn-success">
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
      reviews: [],
      newReviewName: "",
      newReviewCleanliness: "",
      newReviewUniqueness: "",
      newReviewUpkeep: "",
      newReviewTolietPaperQuality: "",
      newReviewAmenities: "",
      newReviewAccessibility: "",
      newReviewNumberOfStalls: "",
      newReviewSize: "",
      newReviewPrivacy: "",
      newReviewLocation: "",
      newReviewSummary: "",
      newReviewOverallRating: "",
      errors: []
    };
  },
created: function() {},
  methods: {
    submit: function() {
      console.log("Rating flushed");
      var params = {
                    cleanliness: this.newReviewCleanliness,
                    uniqueness: this.newReviewUniqueness,
                    upkeep: this.newReviewUpkeep,
                    toliet_paper_quality: this.newReviewTolietPaperQuality,
                    amenities: this.newReviewAmenities,
                    accessibility: this.newReviewAccessibility,
                    number_of_stalls: this.newReviewNumberOfStalls,
                    size: this.newReviewSize,
                    privacy: this.newReviewPrivacy,
                    location: this.newReviewLocation,
                    summary: this.newReviewSummary,
                    overall_rating: this.newReviewOverallRating
                    };
      axios.post("/api/reviews", params)
        .then(response => {
          console.log("Rated", response.data);
          this.$router.push("/");
        }).catch(error => {
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>