<template>
  <div class="map">
    <h1>All Restrooms</h1>
    <div id="map"></div>
  </div>
</template>
<style>
  #map {
    height: 500px;
  }
  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
  }
</style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      restrooms: []
    };
  },
  created: function() {
    axios.get("/api/restrooms")
    .then(response => {
      this.restrooms = response.data;
    });
  },
  methods: {},
  mounted: function() {
    var chicago = {lat: 41.878, lng: -87.629};


    var map = new google.maps.Map(document.getElementById('map'), {
      center: chicago,
      zoom: 10
    });

    var places = [
                  { location: {lat: 41.9484837,lng: -87.6470043}, description: '<h4>Home</h4>'},
                  { location: {lat: 41.8921364,lng: -87.6370182}, description: '<h4>Actualize</h4>'},
                  { location: {lat: 41.8623132,lng: -87.6188771}, description: '<h4>Soldier Field</h4>'}
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
  }
};
</script>