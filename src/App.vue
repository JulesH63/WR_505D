<script setup>
import { RouterLink, RouterView, routeLocationKey } from 'vue-router'
</script>

<template>
  <header>  
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/Movies">Movies</RouterLink>
    <RouterLink to="/Actors">Actors</RouterLink>
    <RouterLink to="/Categories">Categories</RouterLink>
    <RouterLink to="/Login">Contact</RouterLink>
  </header>

  <RouterView />
</template>

<style scoped>
</style>
