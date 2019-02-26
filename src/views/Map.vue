<template>
  <div class="map">
    <h1>All Restrooms</h1>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      restrooms: []
    };
  }
  // created: function() {
  //   axios.get("/api/restrooms")
  //   .then(response => {
  //     this.restrooms = response.data;
  //   });
  // },
  // methods: {},
};
</script>