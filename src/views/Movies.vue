<template>
  <div class="container">
    <h1>Liste des films</h1>
    <div class="search-filter-container">
      <input type="text" v-model="search" placeholder="Rechercher un film..." @keyup.enter="searchMovie" class="form-control">
      <button class="btn btn-primary" @click="searchMovie">Rechercher</button>
      <input type="number" v-model="rating" placeholder="Note minimum" class="form-control">
      <button class="btn btn-primary" @click="searchByRating">Filtrer par note</button>
      <router-link to="/add-movie" class="btn btn-primary">Ajouter un film</router-link>
    </div>
    <div class="row movie-cards-container">
      <div class="col-md-4 mb-3" v-for="movie in movies" :key="movie.id">
        <movie-card :movie="movie" @delete="deleteMovie(movie.id)"></movie-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import MovieCard from '../components/MovieCard.vue'; 

const router = useRouter();
let movies = ref([]);
let search = ref('');
let rating = ref('');

const token = localStorage.getItem('token');
const API_URL = 'http://localhost/api/movies';

if (!token) {
  router.push('/login');
}

onMounted(async () => {
  await getMovies();
});

async function getMovies() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    movies.value = data['hydra:member'];
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
}

async function searchMovie() {
  try {
    const response = await fetch(`${API_URL}?search=${search}`);
    const data = await response.json();
    movies.value = data['hydra:member'];
  } catch (error) {
    console.error('Error searching movies:', error);
  }
}

async function searchByRating() {
  try {
    const response = await fetch(`${API_URL}?rating=${rating}`);
    const data = await response.json();
    movies.value = data['hydra:member'];
  } catch (error) {
    console.error('Error filtering movies by rating:', error);
  }
}

function addMovie() {
  router.push('/add-movie');
}

async function deleteMovie(movieId) {
  try {
    await fetch(`${API_URL}/${movieId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    await getMovies();
  } catch (error) {
    console.error('Error deleting movie:', error);
  }
}
</script>

<style scoped>
.container {
  margin-top: 20px;
}

h1 {
  margin-bottom: 20px;
}

.search-filter-container {
  margin-bottom: 20px;
}

.form-control {
  margin-right: 10px;
}

.movie-cards-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.col-md-4 {
  width: calc(33.3333% - 10px);
}

.mb-3 {
  margin-bottom: 15px;
}
</style>
