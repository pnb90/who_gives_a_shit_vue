<template>
  <div class="restrooms-show">
    <div id="map"></div>
    <h1>{{ restroom.location }}</h1>
    <div v-for="review in restroom.reviews">
      <div> id: {{ review.id }}</div>
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
      <p></p>
    </div>
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
