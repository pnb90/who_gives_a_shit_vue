<template>
  <div id="app">
    <nav-bar/>
    <router-view/>
    <footer/>
  </div>
</template>

<style>
</style>

<script>
  import NavBar from "./components/NavBar";
  export default {
    name: "App",
    components: {
      NavBar
    }
  };
</script>
