<template>
  <div class="restrooms-show">
    <div id="map"></div>      
    <h1 class="d-flex justify-content-center header-text">{{ restroom.location }}</h1>
      <router-link :to=" '/restrooms/' + restroom.id + '/edit' " class="btn btn-warning">Edit</router-link>
      <button v-on:click="destroyRestroom()" class="btn btn-danger">Delete</button>
    <div class="reviews-new">
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
      <div class="accordion d-flex justify-content-center" id="accordionExample275">
        <div class="card z-depth-0 bordered">
          <div class="card-header" id="headingOne2">
            <h5 class="mb-0">
              <button class="btn btn-link d-flex justify-content-center" type="button" data-toggle="collapse" data-target="#collapseOne2"
                aria-expanded="true" aria-controls="collapseOne2">
                Rate This Restroom!
              </button>
            </h5>
          </div>
          <div id="collapseOne2" class="collapse" aria-labelledby="headingOne2" data-parent="#accordionExample275">
            <div class="card-body">
              <div class="container">
                <form v-on:submit.prevent="submit()">
                  <div>
                  Cleanliness: <star-rating v-bind:star-size="25" v-model="newReviewCleanliness"></star-rating>
                  </div>
                  <div>
                  Uniqueness: <star-rating v-bind:star-size="25" v-model="newReviewUniqueness"></star-rating> 
                  </div>
                  <div> 
                  Upkeep: <star-rating v-bind:star-size="25" v-model="newReviewUpkeep"></star-rating> 
                  </div>
                  <div>
                  Toliet Paper Quality: <star-rating v-bind:star-size="25" v-model="newReviewTolietPaperQuality"></star-rating> 
                  </div>
                  <div>
                  Amenities: <star-rating v-bind:star-size="25" v-model="newReviewAmenities"></star-rating> 
                  </div>
                  <div>
                  Accessibility: <star-rating v-bind:star-size="25" v-model="newReviewAccessibility"></star-rating> 
                  </div>
                  <div>
                  Number of Stalls: <star-rating v-bind:star-size="25" v-model="newReviewNumberOfStalls"></star-rating> 
                  </div>
                  <div>
                  Size: <star-rating v-bind:star-size="25" v-model="newReviewSize"></star-rating> 
                  </div>
                  <div>
                  Privacy: <star-rating v-bind:star-size="25" v-model="newReviewPrivacy"></star-rating> 
                  </div>
                  <div>
                  Summary: <input type="text" v-model="newReviewSummary">
                  </div>
                  <input type="submit" v-on:click="totalRatings()" value="Rate" name="btn btn-success">
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container" style="height: 500px">
      
    <div class="row">
        <div class="card col-md-3 text-center" id="reviews-star" v-for="review in restroom.reviews">
          <router-link v-bind:to="'/reviews/' + review.id">
            <star-rating v-model="review.overall_rating" read-only :show-rating="false"></star-rating>
          </router-link>
        </div>
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
                    reviews_count: "",     
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
                              accessibility: "",
                              overall_rating: 0,
                              accessibility: ""     
                              }]
                  },
        newReviewCleanliness: 0,
        newReviewUniqueness: 0,
        newReviewUpkeep: 0,
        newReviewTolietPaperQuality: 0,
        newReviewAmenities: 0,
        newReviewAccessibility: 0,
        newReviewNumberOfStalls: 0,
        newReviewSize: 0,
        newReviewPrivacy: 0,
        newReviewLocation: "",
        newReviewName: "",
        newReviewSummary: "",
        newReviewOverallRating: 0,
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
                      name: this.newReviewName,
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
