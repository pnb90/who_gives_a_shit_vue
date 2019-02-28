<template>
  <div class="reviews-show">
      <div> cleanliness: {{ review.cleanliness }}</div>
      <div> uniqueness: {{ review.uniqueness }}</div>
      <div> upkeep: {{ review.upkeep }}</div>
      <div> toilet_paper_quality: {{ review.toilet_paper_quality }}</div>
      <div> amenities: {{ review.amenities }}</div>
      <div> number_of_stalls: {{ review.number_of_stalls }}</div>
      <div> size: {{ review.size }}</div>
      <div> privacy: {{ review.privacy }}</div>
      <div> summary: {{ review.summary }}</div>
      <div> overall_rating: {{ review.overall_rating }}</div>
      <div> accessibility: {{ review.accessibility }}</div>
      <router-link :to=" '/reviews/' + review.id + '/edit' " class="btn btn-warning">Edit</router-link>
    <button v-on:click="destroyReview()" class="btn btn-danger">Delete</button>
  </div>
</template>

<style>
  
</style>
<script>
  var axios = require('axios')

  export default {
    data: function() {
      return {
              review: {
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
      destroyReview: function() {
        axios.delete("/api/reviews/" + this.review.id)
          .then(response => {
            console.log("Success", response.data);
            this.$router.push("/");
          });
      }
    }
  }
</script>

<!-- t.integer "cleanliness"
t.integer "uniqueness"
t.integer "upkeep"
t.integer "toilet_paper_quality"
t.integer "amenities"
t.integer "accessibility"
t.integer "number_of_stalls"
t.integer "size"
t.integer "privacy"
t.integer "overall_rating"
t.text "summary"
t.datetime "created_at", null: false
t.datetime "updated_at", null: false
t.integer "restroom_id"
t.integer "user_id" -->