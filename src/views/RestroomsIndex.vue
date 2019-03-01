<template>
  <div class="restrooms-index">
    <div class="pos-f-t">
      <div class="collapse" id="navbarToggleExternalContent">
        <div class="bg-dark p-4">
          <div>
          <router-link to="/">Home</router-link> 
          </div>
          <div>
          <router-link to="/about">About</router-link>
        </div>
        </div>
      </div>
      <nav class="navbar navbar-dark bg-dark">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      </nav>
    </div>
    <div id="map"></div>
    <h1 class="d-flex justify-content-center header-text"> All Restrooms </h1>

    <div>
      Filter Location: <input v-model="locationFilter" list="locations">

      <datalist id="locations">
        <option v-for="restroom in restrooms">{{restroom.title}}</option>

      </datalist>

    </div> 
    

    <router-link class="btn btn-success" to="/restrooms/new"> Add New Restroom </router-link>
    <p></p>
      <div class="row">
        <div class="col-md-4" v-for="restroom in filterBy(restrooms, locationFilter, 'location')">
          <router-link v-bind:to="'/restrooms/' + restroom.id">
            <div class="card">
              <h2 class="card-title"> {{ restroom.location }}</h2>
            </div>
          </router-link>
        </div>
      </div>
  </div>




</template>

<style>
</style>

<script>
var axios = require("axios");
import Vue2Filters from "vue2-filters";

export default {
  data: function() {
    return {
      restrooms: [],
      currentRestroom: {},
      reviews: [{
              overall_rating: 5
              }],
      locationFilter: ''
    };
  },
  created: function() { 
    axios.get("/api/restrooms")
    .then(response => {
        this.restrooms = response.data;
      });
  },
  methods: {
    averageRating: function() {
      this.restrooms.reviews
    }
  },
  mounted: function() {
    var chicago = {lat: 41.891486, lng: -87.630833};


    var map = new google.maps.Map(document.getElementById('map'), {
      center: chicago,
      zoom: 14
    });

    var places = [
                  { location: {lat: 41.889774,lng: -87.630282}, description: '<h4>59 W Hubbard St #2</h4>'},
                  { location: {lat: 41.8921364,lng: -87.6370182}, description: '<h4>Actualize</h4>'},
                  { location: {lat: 41.891486,lng: -87.630833}, description: '<h4>519 N Clark St, Chicago, IL</h4>'},
                  { location: {lat: 41.890336,lng: -87.624701}, description: '<h4>430 N Michigan Ave, Chicago, IL 60611</h4>'},
                  { location: {lat: 41.892987,lng: -87.630885}, description: '<h4>100 W Ontario St, Chicago, IL 60654</h4>'}
                  ];

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
  },
  mixins: [Vue2Filters.mixin]
};
</script>