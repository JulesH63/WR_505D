<template>
  <div class="container">
    <h1>Détails du film</h1>
    <div v-if="movie">
      <h2>{{ movie.title }}</h2>
      <p><strong>Date de sortie:</strong> {{ movie.releaseDate }}</p>
      <p><strong>Durée:</strong> {{ movie.duration }} minutes</p>
      <p><strong>Catégorie:</strong> {{ movie.category }}</p>
      <p><strong>Description:</strong> {{ movie.description }}</p>
      <!-- Autres détails du film -->
      <p><strong>Âge du film:</strong> {{ ageMovie(movie.releaseDate) }}</p>
    </div>
    <div v-else>
      <p>Chargement des détails du film...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const movieId = route.params.id;
const movie = ref(null);

// Appel à une fonction pour récupérer les détails du film lors de la création du composant
onMounted(async () => {
  // Exemple de fonction pour récupérer les détails du film
  movie.value = await fetchMovieDetails(movieId);
});

async function fetchMovieDetails(id) {
  try {
    const response = await fetch(`http://localhost/api/movies/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
  }
}

function ageMovie(date) {
  // Calculer l'âge du film
  const releaseYear = new Date(date).getFullYear();
  const currentYear = new Date().getFullYear();
  return currentYear - releaseYear;
}
</script>
  
<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.movie-details {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.detail-row {
  margin-bottom: 10px;
}

.detail-label {
  font-weight: bold;
  margin-right: 10px;
}

.detail-value {
  color: #333;
}

</style>
  