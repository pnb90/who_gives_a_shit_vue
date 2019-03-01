<template>
  <div class="reviews-show">
      <div> Cleanliness <star-rating v-model="review.cleanliness" read-only></star-rating></div>
      <div> Uniqueness <star-rating v-model="review.uniqueness" read-only></star-rating></div>
      <div> Upkeep <star-rating v-model="review.upkeep" read-only></star-rating></div>
      <div> Toilet Paper Quality <star-rating v-model="review.toilet_paper_quality" read-only></star-rating></div>
      <div> Amenities <star-rating v-model="review.amenities" read-only></star-rating></div>
      <div> Number of Stalls <star-rating v-model="review.number_of_stalls" read-only></star-rating></div>
      <div> Size <star-rating v-model="review.size" read-only></star-rating></div>
      <div> Privacy <star-rating v-model="review.privacy" read-only></star-rating></div>
      <div> Accessibility <star-rating v-model="review.accessibility" read-only></star-rating></div>
      <div> Overall Rating <star-rating v-model="review.overall_rating" read-only></star-rating></div>
      <div> Summary: {{ review.summary }}</div>
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
                        cleanliness: 0,
                        uniqueness: 0,
                        upkeep: 0,
                        toilet_paper_quality: 0,
                        amenities: 0,
                        number_of_stalls: 0,
                        size: 0,
                        privacy: 0,
                        summary: "",
                        overall_rating: 0,
                        accessibility: 0     
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
      // totalRatings: function() {
      //   var sum = 0;
      //   var ratingArray = Object.values(this.review);
      //   // ratingArray.forEach(function(number) {
      //   //   sum += number;
      //   //   console.log(number);
      //   // });
      //   return s
      // }
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