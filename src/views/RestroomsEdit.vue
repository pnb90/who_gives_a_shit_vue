<template>
  <div class="restrooms-edit">
    <h1>Edit Restroom</h1>
    <div>
      Name: <input type="text" v-model="newRestroomName">
      Width: <input type="text" v-model="newRestroomWidth">
      Height: <input type="text" v-model="newRestroomHeight">
      <button v-on:click="createRestroom()">Create Restroom</button>
    </div>
    <h1>All restrooms</h1>
    <div v-for="restroom in restrooms">
      <h2>{{ restroom.name }}</h2>
      <img v-bind:src="restroom.url">
      <button v-on:click="showRestroom(restroom)">Show more</button>
      <div v-if="currentRestroom === restroom">
        <p>Width: {{ restroom.width }}</p>
        <p>Height: {{ restroom.height }}</p>
        <div>
          Name: <input type="text" v-model="restroom.name">
          Width: <input type="text" v-model="restroom.width">
          Height: <input type="text" v-model="restroom.height">
          <button v-on:click="updaterestroom(restroom)">Update restroom</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      photos: [],
      currentPhoto: {},
            newPhotoName: "",
            newPhotoWidth: "",
            newPhotoHeight: ""
          };
        },
  created: function() {
    axios.get("/api/photos").then(response => {
      this.photos = response.data;
    });
  },
  methods: {
    createPhoto: function() {
      var params = {
        name: this.newPhotoName,
        width: this.newPhotoWidth,
        height: this.newPhotoHeight
      };
      axios.post("/api/photos", params).then(response => {
        this.photos.push(response.data);
        this.newPhotoName = "";
        this.newPhotoWidth = "";
        this.newPhotoHeight = "";
      });
    },
    showPhoto: function(photo) {
      if (this.currentPhoto === photo) {
        this.currentPhoto = {};
      } else {
        this.currentPhoto = photo;
      }
    },
    updatePhoto: function(photo) {
      var params = {
        name: photo.name,
        width: photo.width,
        height: photo.height
      };
      axios
        .patch("/api/photos/" + photo.id, params)
        .then(response => {
          this.currentPhoto = {};
        });
    }
  }
};
</script>
