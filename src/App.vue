<script setup>
import { RouterLink, RouterView, routeLocationKey } from 'vue-router'

function logout() {
  localStorage.removeItem('token')
  location.href = '/login'
}
</script>

<template>
  <header>  
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/Movies">Movies</RouterLink>
    <RouterLink to="/Actors">Actors</RouterLink>
    <RouterLink to="/Categories">Categories</RouterLink>
    <RouterLink to="/Login">Contact</RouterLink>
    <button @click="logout">Logout</button>
  </header>

  <RouterView />
</template>

<style scoped>
</style>
