<template>
  <div class="container">
    <h2>Ajouter un film</h2>
    <form @submit.prevent="createMovie">
      <div class="form-group">
        <label for="title">Titre du film:</label>
        <input type="text" class="form-control" id="title" v-model="movieTitle" required>
      </div>
      <!-- Autres champs du formulaire d'ajout de film -->
      <button type="submit" class="btn btn-primary">Ajouter</button>
    </form>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
let movieTitle = ref('');
let movieDescription = ref('');
let movieReleaseDate = ref('');
let movieDuration = ref(0);
let movieCategory = ref('');
let movieActors = ref([]);

let categories = ref([]);
let actors = ref([]);

const API_URL = import.meta.env.VITE_SERVER_API_URL;
const token = localStorage.getItem('token');
if (!token) {
  router.push('/login');
}
const role = localStorage.getItem('role');
if (role !== 'ROLE_ADMIN') {
  router.push('/');
}

const today = new Date().toISOString().split('T')[0];

onMounted(async () => {
  await getCategories();
  await getActors();
});

async function getCategories() {
  try {
    const response = await fetch(`${API_URL}/categories`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (response.ok) {
      categories.value = await response.json();
    } else {
      console.error('Erreur lors de la récupération des catégories');
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories:', error);
  }
}

async function getActors() {
  try {
    const response = await fetch(`${API_URL}/actors`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (response.ok) {
      actors.value = await response.json();
    } else {
      console.error('Erreur lors de la récupération des acteurs');
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des acteurs:', error);
  }
}

async function createMedia() {
  // Créer le média pour le film
  // Vous devez implémenter cette fonction en fonction de vos besoins
}

async function createMovie() {
  try {
    const response = await fetch(`${API_URL}/movies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        title: movieTitle.value,
        description: movieDescription.value,
        releaseDate: movieReleaseDate.value,
        duration: movieDuration.value,
        category: movieCategory.value,
        actors: movieActors.value,
      })
    });
    if (response.ok) {
      console.log('Film ajouté avec succès');
      // Rediriger vers une autre page ou effectuer une action supplémentaire
    } else {
      console.error('Erreur lors de l\'ajout du film');
    }
  } catch (error) {
    console.error('Erreur lors de l\'ajout du film:', error);
  }
}

const uploadFile = (event) => {
  // Gérer le téléchargement du fichier
};
</script>

<style scoped>

</style>
