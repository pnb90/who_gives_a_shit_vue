<template>
  <div class="restrooms-show">
    <div id="map"></div>
    <h1>{{ restroom.location }}</h1>
    <div>Number of Reviews: {{ restroom.reviews_count }}</div>
    <div class="row">
        <div class="card col-md-3 text-center" v-for="review in restroom.reviews">
          <router-link v-bind:to="'/reviews/' + review.id">
            <div>Rating: {{ review.overall_rating }}</div>
          </router-link>
        </div>
    </div>
    <router-link :to=" '/restrooms/' + restroom.id + '/edit' " class="btn btn-warning">Edit</router-link>
    <button v-on:click="destroyRestroom()" class="btn btn-danger">Delete</button>
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
          <input type="submit" v-on:click="totalRatings()" value="Rate" name="btn btn-success">
        </form>
      </div>
    </div>
  </div>

</template>

<style>
  .col-md-4 {
    height: 75px;
  }
</style>
<script>
  var axios = require('axios')

  export default {
    data: function() {
      return {
        restroom: {
                    id: "",
                    location: "",
                    reviews_count: "",
                    reviews: [{
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
                              }]
                  },
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
        newReviewName: "",
        newReviewSummary: "",
        newReviewOverallRating: "",
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
      destroyRestroom: function() {
        axios.delete("/api/restrooms/" + this.restroom.id)
          .then(response => {
            console.log("Success", response.data);
            this.$router.push("/restrooms");
          });
      },
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
                      overall_rating: this.newReviewOverallRating,
                      restroom_id: this.restroom.id
                      };
        axios.post("/api/reviews", params)
          .then(response => {
            console.log("Rated", response.data);
            this.restroom.reviews.push(response.data);
          }).catch(error => {
            this.errors = error.response.data.errors;
          });
      },
      totalRatings: function() {
        var total = parseFloat(this.newReviewPrivacy) + parseFloat(this.newReviewAmenities)
          + parseFloat(this.newReviewCleanliness) + parseFloat(this.newReviewUniqueness)
          + parseFloat(this.newReviewUpkeep) + parseFloat(this.newReviewTolietPaperQuality)
          + parseFloat(this.newReviewAccessibility) + parseFloat(this.newReviewNumberOfStalls)
          + parseFloat(this.newReviewSize);
        var sum = (total / 9);
          
        this.newReviewOverallRating = sum;
      }
      // insertStars: function() {
      //   if (this.)
      // }
    },
    mounted: function() {
      var chicago = {lat: 41.878, lng: -87.629};


      var map = new google.maps.Map(document.getElementById('map'), {
        center: chicago,
        zoom: 14
      });

      var places = [];

      places.forEach(function(place) {
        var infowindow = new google.maps.InfoWindow({ content: place.description });

        var marker = new google.maps.Marker({
          position: place.location,
          map: map,
        });
        marker.addListener('click', function() {
          infowindow.open(map, marker);
        });
      });
    }
  }
</script>
