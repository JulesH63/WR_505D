<template>
  <div class="container">
    <h1>Liste des films</h1>
    <div class="search-filter-container">
      <input type="text" v-model="search" placeholder="Rechercher un film..." class="form-control">      <button @click="openAddMovieModal">Ajouter un film</button>
    </div>
    <div class="row movie-cards-container">
      <div class="col-md-4 mb-3" v-for="movie in filteredMovies" :key="movie.id">
        <movie-card :movie="movie" @delete="deleteMovie(movie.id)"></movie-card>
      </div>
    </div>

    <div class="modal" :class="{ 'is-active': isAddMovieModalOpen }">
      <div class="modal-background" @click="closeAddMovieModal"></div>
      <div class="modal-content">
        <h2>Ajouter un film</h2>
        <form @submit.prevent="addMovie">
          <label for="title">Titre:</label>
          <input type="text" id="title" v-model="newMovie.title" required>
          <!-- Ajoutez d'autres champs de formulaire pour d'autres détails du film -->
          <button type="submit">Ajouter</button>
        </form>
      </div>
      <button class="modal-close is-large" aria-label="close" @click="closeAddMovieModal"></button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import MovieCard from '../components/MovieCard.vue'; 

const router = useRouter();
const filteredMovies = ref([]);
const movies = ref([]);
const search = ref('');
const isAddMovieModalOpen = ref(false);
const newMovie = ref({ title: '', categoryId: '', description: '', releaseDate: '', duration: '' });

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
    console.log('Fetching movies...');
    const response = await axios.get(API_URL);
    movies.value = response.data['hydra:member'];
    console.log('Movies fetched:', movies.value);
    searchMovie(); // Appel pour filtrer les films après avoir récupéré les données
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
}

watch(search, (newValue, oldValue) => {
  console.log('Updating search query:', newValue);
  searchMovie();
});

const searchMovie = () => {
  filteredMovies.value = movies.value.filter(movie => {
    return movie.title.toLowerCase().includes(search.value.toLowerCase());
  });
};

function openAddMovieModal() {
  isAddMovieModalOpen.value = true;
}

function closeAddMovieModal() {
  isAddMovieModalOpen.value = false;
}

async function deleteMovie(movieId) {
  try {
    await axios.delete(`${API_URL}/${movieId}`, {
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

async function addMovie() {
  try {
    await axios.post(API_URL, newMovie.value, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    // Réinitialiser l'objet du nouveau film après l'ajout réussi
    newMovie.value = { title: '', categoryId: '', description: '', releaseDate: '', duration: '' };
    await getMovies();
    isAddMovieModalOpen.value = false; // Fermer la modal après avoir ajouté le film
  } catch (error) {
    console.error('Error adding movie:', error);
  }
}

function updateSearch(value) {
  search.value = value;
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

/* Styles pour la modal */
.modal {
  display: none;
}

.modal.is-active {
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
}

.modal-close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  background: transparent;
  border: none;
}
</style>
