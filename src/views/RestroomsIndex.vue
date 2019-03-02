<template>
  <div class="restrooms-index">
    <div id="map"></div>
    <h1 class="d-flex justify-content-center header-text"> Reviewed Restrooms </h1>
    <div class="container restroom-content">
    <table class="table table-striped table-dark">
      <thead class="thead-light"> 
       <tr>
         <th scope="col" v-on:click="setSortAttribute('id')">ID<span v-if="sortAttribute === 'id'"> *</span></th>
         <th scope="col" v-on:click="setSortAttribute('name')">Name <span v-if="sortAttribute === 'name'"> *</span></th>
         <th scope="col" v-on:click="setSortAttribute('location')">Location <span v-if="sortAttribute === 'location'"> *</span></th>
         <th scope="col" v-on:click="setSortAttribute('prep_time')">Rating <span v-if="sortAttribute === 'prep_time'"> *</span></th>
       </tr>
      </thead>
      <tbody is="transition-group" class="fadeLeftBig-enter-active">
       <tr v-for="restroom in orderBy(filterBy(restrooms, locationFilter, 'location'), sortAttribute, sortOrder)" v-bind:key="restroom.id">
         <th scope="row">
         {{restroom.id}}
        </th scope="row">
         <td>
          {{restroom.name}}
        </td>
         <td>
          <router-link v-bind:to="'/restrooms/' + restroom.id">
          {{restroom.location}}
        </router-link>
        </td>
         <td>
         <!-- {{recipe.formatted.prep_time}} -->
        </td>
       </tr>
      </tbody>
     </table>
    <router-link class="btn btn-success" style="margin: 30px;" to="/restrooms/new"> Add New Restroom </router-link>
    <span>
        Find Location: <input v-model="locationFilter" list="locations">
      <datalist id="locations">
        <option v-for="restroom in restrooms">{{restroom.title}}</option>
      </datalist>
    </span> 
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
      locationFilter: '',
      sortAttribute: 'id',
      sortOrder: 1
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
    },
    setSortAttribute: function(inputAttribute) {
      if (this.sortAttribute === inputAttribute) {
        this.sortOrder *= -1;       
      } else {
        this.sortAttribute = inputAttribute;
        this.sortOrder = 1;
      }
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