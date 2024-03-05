<template>
  <div class="container">
    <div v-if="movie" class="movie-details">
      <h1>Détails du film</h1>
      <h2>{{ movie.title }}</h2>
      <p><strong>Description:</strong> {{ movie.description }}</p>
      <p><strong>Date de sortie:</strong> {{ convertDate(movie.releaseDate) }}</p>
      <p><strong>Durée:</strong> {{ movie.duration }} minutes</p>
      <p v-if="movie.averageRating"><strong>Note moyenne:</strong> {{ movie.averageRating }}</p>
    </div>
    <div v-else>
      <p class="no-movie">Aucun film sélectionné.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const movie = ref(null);

// Fonction pour récupérer le film depuis l'API
async function getMovie(movieId) {
  try {
    const response = await fetch(`http://localhost/api/movies/${movieId}`);
    const data = await response.json();
    movie.value = data;
  } catch (error) {
    console.error('Erreur lors de la récupération du film :', error);
  }
}

// Récupérer l'ID du film à partir des paramètres de l'URL
const movieId = router.currentRoute.value.params.id;

// Charger le film lorsque le composant est monté
onMounted(async () => {
  await getMovie(movieId);
});

// Fonction pour convertir la date au format souhaité
function convertDate(date) {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(date).toLocaleDateString('fr-FR', options);
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: 'Arial', sans-serif; /* Changer la police ici */
  color: #000; /* Changer la couleur du texte ici */
}

.movie-details {
  max-width: 600px;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.9); /* Fond blanc transparent */
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

h1 {
  margin-bottom: 20px;
  font-size: 24px;
}

h2 {
  margin-bottom: 10px;
  font-size: 20px;
}

p {
  margin-bottom: 10px;
  font-size: 16px;
}

</style>
