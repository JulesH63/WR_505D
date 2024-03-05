<template>
    <div class="container">
      <h2>Modifier le film "{{ movieTitle }}"</h2>
      <form @submit.prevent="updateMovie">
        <div class="form-group">
          <label for="title">Titre du film:</label>
          <input type="text" class="form-control" id="title" v-model="movieTitle" required>
        </div>
        <!-- Autres champs du formulaire de modification de film -->
        <button type="submit" class="btn btn-primary">Mettre à jour</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const movieId = ref('');
  let movieTitle = ref('');
  let movieDescription = ref('');
  let movieReleaseDate = ref('');
  let movieDuration = ref(0);
  let movieCategory = ref('');
  // Autres variables pour la modification du film
  
  const token = localStorage.getItem('token');
  if (!token) {
    router.push('/login');
  }
  const role = localStorage.getItem('role');
  if (role !== 'ROLE_ADMIN') {
    router.push('/');
  }
  
  onMounted(async () => {
    await getMovieDetails();
  });
  
  async function getMovieDetails() {
    try {
      const response = await fetch(`${API_URL}/movies/${movieId.value}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        // Mettre à jour les variables de données du film avec les détails reçus
        movieTitle.value = data.title;
        movieDescription.value = data.description;
        movieReleaseDate.value = data.releaseDate;
        movieDuration.value = data.duration;
        movieCategory.value = data.category;
        // Mettre à jour d'autres variables de données du film
      } else {
        console.error('Erreur lors de la récupération des détails du film à modifier');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des détails du film à modifier:', error);
    }
  }
  
  async function updateMovie() {
    try {
      const response = await fetch(`http://localhost/api/movies/${movieId.value}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: movieTitle.value,
          description: movieDescription.value,
          releaseDate: movieReleaseDate.value,
          duration: movieDuration.value,
          category: movieCategory.value
          // Ajouter d'autres champs à mettre à jour si nécessaire
        })
      });
      if (response.ok) {
        console.log('Film mis à jour avec succès');
        // Rediriger vers une autre page ou effectuer une action supplémentaire
      } else {
        console.error('Erreur lors de la mise à jour du film');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du film:', error);
    }
  }
  </script>
  
  <style scoped>
  
  </style>
  