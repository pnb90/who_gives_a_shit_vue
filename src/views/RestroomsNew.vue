<template>
  <div class="restrooms-new">
    <h1>New Restroom</h1>
    <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul>
    <div class="container">
      <form v-on:submit.prevent="submit()">
        <div>
        Address: <input v-model="newRestroomLocation">
        </div>
        <input type="submit" value="Submit" name="btn btn-success">
      </form>
    </div>
  </div>
</template>
<style>

</style>

<script>
var axios = require('axios');

export default {
  data: function() {
    return {
      newRestroomLocation: "",
      errors: []
    };
  },
created: function() {},
  methods: {
    submit: function() {
      console.log("Rating flushed");
      var params = {
                    location: this.newRestroomLocation
                    };
      axios.post("/api/restrooms", params)
        .then(response => {
          console.log("Rated", response.data);
          this.$router.push("/restrooms");
        }).catch(error => {
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>