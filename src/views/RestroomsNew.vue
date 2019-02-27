<template>
  <div class="restrooms-new">
    <h1>New Restroom</h1>
    <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul>
    <div class="container">
      
      <form v-on:submit.prevent="submit()">
        <div>
        
        Cleanliness: <input v-model="newRestroomName">
        </div>
        <div>
        Uniqueness: <input v-model="newRestroomUniqueness">
        </div>
        <div> 
        Upkeep: <input v-model="newRestroomUpkeep">
        </div>
        <div>
        Toliet Paper Quality: <input v-model="newRestroomTolietPaperQuality">
        </div>
        <div>
        Amenities: <input v-model="newRestroomAmenities">
        </div>
        <div>
        Accessibility: <input v-model="newRestroomAccessibility">
        </div>
        <div>
        Number of Stalls: <input v-model="newRestroomNumberOfStalls">
        </div>
        <div>
        Size: <input v-model="newRestroomSize">
        </div>
        <div>
        Privacy: <input v-model="newRestroomPrivacy">
        </div>
        <div>
        Location: <input v-model="newRestroomLocation">
        </div>
        <div>
        Summary: <input v-model="newRestroomSummary">
        </div>
        <div>
        Overall Rating: <input v-model="newRestroomOverallRating">
        </div>
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
      restrooms: [],
      newRestroomName: "",
      newRestroomCleanliness: "",
      newRestroomUniqueness: "",
      newRestroomUpkeep: "",
      newRestroomTolietPaperQuality: "",
      newRestroomAmenities: "",
      newRestroomAccessibility: "",
      newRestroomNumberOfStalls: "",
      newRestroomSize: "",
      newRestroomPrivacy: "",
      newRestroomLocation: "",
      newRestroomSummary: "",
      newRestroomOverallRating: "",
      errors: []
    };
  },
created: function() {},
  methods: {
    submit: function() {
      console.log("Rating flushed");
      var params = {
                    cleanliness: this.newRestroomCleanliness,
                    uniqueness: this.newRestroomUniqueness,
                    upkeep: this.newRestroomUpkeep,
                    toliet_paper_quality: this.newRestroomTolietPaperQuality,
                    amenities: this.newRestroomAmenities,
                    accessibility: this.newRestroomAccessibility,
                    number_of_stalls: this.newRestroomNumberOfStalls,
                    size: this.newRestroomSize,
                    privacy: this.newRestroomPrivacy,
                    location: this.newRestroomLocation,
                    summary: this.newRestroomSummary,
                    overall_rating: this.newRestroomOverallRating
                    };
      axios.post("/api/restrooms", params)
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