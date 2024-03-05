<template>
  <div v-if="movie" class="movie-card" @click="navigateToMovieDetails">
    <h2>{{ movie.title }}</h2>
    <p><strong>Date de sortie:</strong> {{ convertDate(movie.releaseDate) }}</p>
    <p v-if="movie.averageRating"><strong>Note moyenne:</strong> {{ movie.averageRating }}</p>
    <button @click="deleteMovie(movie.id)" class="btn btn-danger">Supprimer</button>
  </div>
  <div v-else class="no-movie-selected">
    <p>Aucun film sélectionné.</p>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps(['movie']);

const router = useRouter();

const token = localStorage.getItem('token');
if (!token) {
  router.push('/login');
}

// Fonction pour supprimer un film
async function deleteMovie(movieId) {
  try {
    const response = await fetch(`http://localhost/api/movies/${movieId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (response.ok) {
      console.log('Film supprimé avec succès');
    } else {
      console.error('Erreur lors de la suppression du film');
    }
  } catch (error) {
    console.error('Erreur lors de la suppression du film:', error);
  }
}

// Fonction pour naviguer vers les détails du film
function navigateToMovieDetails() {
  router.push(`/movie/${props.movie.id}`);
}

// Fonction pour convertir la date au format souhaité
function convertDate(date, format = 'DD/MM/YYYY') {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const formattedDate = new Date(date).toLocaleDateString('fr-FR', options);
  return formattedDate;
}
</script>

<style scoped>
.movie-card {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 20px;
  cursor: pointer; /* Ajout du curseur pointer pour indiquer que la carte est cliquable */
}

.movie-card h2 {
  margin-top: 0;
}

.btn-danger {
  background-color: #dc3545;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
}

.btn-danger:hover {
  background-color: #c82333;
}

.no-movie-selected {
  font-style: italic;
  color: #888;
}
</style>
