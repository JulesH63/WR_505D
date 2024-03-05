<template>
  <div class="header-container">
    <header class="menu-header">  
      <div class="menu-links">
        <RouterLink to="/" class="menu-link">Home</RouterLink>
        <RouterLink to="/Movies" class="menu-link">Movies</RouterLink>
        <RouterLink to="/Actors" class="menu-link">Actors</RouterLink>
        <RouterLink to="/Categories" class="menu-link">Categories</RouterLink>
        <RouterLink to="/Login" class="menu-link">Contact</RouterLink>
      </div>
      <div class="logout-button">
        <button @click="logout" class="btn">Logout</button>
      </div>
    </header>
  </div>

  <RouterView />
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'

function logout() {
  localStorage.removeItem('token')
  location.href = '/login'
}
</script>

<style scoped>
.header-container {
  background-color: #000;
}

.menu-header {
  color: #fff;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.menu-links {
  display: flex;
}

.menu-link {
  color: #fff;
  text-decoration: none;
  margin-right: 20px;
  transition: color 0.3s;
}

.menu-link:hover {
  color: #ff0000;
}

.logout-button {
  display: flex;
  align-items: center;
}

.btn {
  background-color: transparent;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 16px;
  transition: color 0.3s;
}

.btn:hover {
  color: #ff0000;
}
</style>
