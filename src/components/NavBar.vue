<template>
  <div class="pos-f-t">
    <div class="collapse" id="navbarToggleExternalContent">
      <div class="bg-dark p-4">
        <div>
        <router-link to="/">Home</router-link> 
        </div>
        <div>
          <router-link to="/signup">Sign Up</router-link>
        </div>
        <div>
          <router-link to="/login">Log In</router-link>
        </div>
        <div>
          <router-link to="/logout">Log Out</router-link>
        </div>
      </div>
    </div>
    <nav class="navbar navbar-dark bg-dark">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
     <router-link to="/"><h2 id="app-name">Who Gives a Shit</h2></router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  props: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
