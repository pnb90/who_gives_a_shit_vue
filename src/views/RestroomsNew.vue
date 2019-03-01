<template>
  <div class="restrooms-new">
    <div class="pos-f-t">
      <div class="collapse" id="navbarToggleExternalContent">
        <div class="bg-dark p-4">
          <div>
            <router-link to="/">Home</router-link>
          </div>
          <router-link to="/logout">Log Out</router-link>
        </div>
      </div>
      <nav class="navbar navbar-dark bg-dark">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      </nav>
    </div>
    <h1>New Restroom</h1>
    <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul>
    <div class="container">
      <form v-on:submit.prevent="submit()">
        <div>
        Name: <input v-model="newRestroomName">
        </div>

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
      newRestroomName: "",
      errors: []
    };
  },
created: function() {},
  methods: {
    submit: function() {
      console.log("Rating flushed");
      var params = {
                    location: this.newRestroomLocation,
                    name: this.newRestroomName
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