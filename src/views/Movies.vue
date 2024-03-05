<template>
  <div class="container">
    <h1>Liste des films</h1>
    <div class="search-filter-container">
      <input type="text" v-model="search" placeholder="Rechercher un film..." class="form-control">
      <button @click="openAddMovieModal">Ajouter un film</button>
    </div>
    <div class="row movie-cards-container">
      <div class="col-md-4 mb-3" v-for="movie in filteredMovies" :key="movie.id">
        <movie-card :movie="movie" @delete="deleteMovie(movie.id)" @edit="openEditMovieModal(movie.id)"></movie-card>
      </div>
    </div>
    <AddMovie v-if="isAddingMovie" @close="closeAddMovieModal" />
  </div>
</template>

<script>
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import MovieCard from '../components/MovieCard.vue';
import AddMovie from '../components/AddMovie.vue';

export default {
  components: {
    MovieCard,
    AddMovie
  },
  setup() {
    const router = useRouter();
    const filteredMovies = ref([]);
    const movies = ref([]);
    const search = ref('');
    const isAddingMovie = ref(false);
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
        const response = await axios.get(API_URL);
        movies.value = response.data['hydra:member'];
        searchMovie();
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    }

    watch(search, (newValue, oldValue) => {
      searchMovie();
    });

    const searchMovie = () => {
      filteredMovies.value = movies.value.filter(movie => {
        return movie.title.toLowerCase().includes(search.value.toLowerCase());
      });
    };

    function openAddMovieModal() {
      isAddingMovie.value = true;
    }

    function closeAddMovieModal() {
      isAddingMovie.value = false;
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

    function openEditMovieModal(movieId) {
      // Naviguer vers AddMovie avec l'ID du film à éditer dans l'URL
      router.push({ name: 'EditMovie', params: { id: movieId } });
    }

    // Retournez les méthodes et données utilisées dans le template
    return {
      filteredMovies,
      search,
      isAddingMovie,
      openAddMovieModal,
      closeAddMovieModal,
      deleteMovie,
      openEditMovieModal
    };
  }
};
</script>

<style scoped>
.container {
  background-color: #141414;
  color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.container h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.search-filter-container {
  display: flex;
  align-items: center;
  justify-content: center; /* Ajout de cette ligne */
  margin-bottom: 20px; /* Ajout de cette ligne */
}

.form-control {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-right: 10px;
  background-color: #fff;
}

.form-control:focus {
  outline: none;
  border-color: #ff0000;
}

button {
  background-color: #e50914;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
}

button:hover {
  background-color: #ff0000;
}

.form-control {
  margin-right: 10px;
}

.movie-cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 20px;
}

.mb-3 {
  margin-bottom: 15px;
}

.add-movie {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #141414;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 9999;
}

.add-movie:focus {
  outline: none;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  color: #fff;
}

/* Styles pour les éléments des films */

.movie-card {
  background-color: #141414;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.movie-card img {
  width: 100%;
  height: auto;
  border-radius: 5px 5px 0 0;
}

.movie-card-content {
  padding: 15px;
}

.movie-title {
  margin: 0;
  font-size: 16px;
  color: #fff;
}

.movie-description {
  font-size: 14px;
  color: #ccc;
  margin-top: 5px;
}

.play-button {
  background-color: #e50914;
  color: #fff;
  padding: 8px 15px;
  border: none;
  border-radius: 3px;
  font-size: 14px;
  cursor: pointer;
  margin-top: 10px;
}

.play-button:hover {
  background-color: #ff0b24;
}
</style>