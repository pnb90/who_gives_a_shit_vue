<template>
  <div class="restrooms-show">
    <h1>New Restroom</h1>
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
      <div v-if="currentrestroom === restroom">
        <p>Width: {{ restroom.width }}</p>
        <p>Height: {{ restroom.height }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      restrooms: [],
      currentRestroom: {},
      newRestroomName: "",
      newRestroomWidth: "",
      newRestroomHeight: ""
    };
  },
  created: function() {
       axios.get("/api/restrooms")
       .then(response => {
          this.restrooms = response.data;
        });
      },
  methods: {
    createrestroom: function() {
      var params = {
        name: this.newRestroomName,
        width: this.newRestroomWidth,
        height: this.newRestroomHeight
      };
      axios.post("/api/restrooms", params)
      .then(response => {
        this.restrooms.push(response.data);
        this.newRestroomName = "";
        this.newRestroomWidth = "";
        this.newRestroomHeight = "";
      });
    },
    showRestroom: function(restroom) {
      if (this.currentrestroom === restroom) {
        this.currentRestroom = {};
      } else {
        this.currentRestroom = restroom;
      }
    },
    destroyRestroom: function(photo) {
      axios
        .delete("/api/restrooms/" + restroom.id)
        .then(response => {
          var index = this.restrooms.indexOf(photo);
          this.restrooms.splice(index, 1);
        });
    }

  }
};
</script>
