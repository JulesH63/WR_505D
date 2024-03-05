<template>
  <div>
    <h1>Détails du film</h1>
    <div v-if="movie">
      <h2>{{ movie.title }}</h2>
      <p><strong>Description:</strong> {{ movie.description }}</p>
      <p><strong>Date de sortie:</strong> {{ convertDate(movie.releaseDate) }}</p>
      <p><strong>Durée:</strong> {{ movie.duration }} minutes</p>
      <p v-if="movie.averageRating"><strong>Note moyenne:</strong> {{ movie.averageRating }}</p>
    </div>
    <div v-else>
      <p>Aucun film sélectionné.</p>
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