<template>
  <div class="add-movie">
    <h1>Edit Movie</h1>
    <div class="error" v-if="isError">Veuillez remplir tous les champs!</div>
    <div class="close" @click="close">FERMER</div>
    <form @submit.prevent="editMovie">
      <div>
        <label for="title">Title:</label>
        <input type="text" id="title" v-model="formData.title" required>
      </div>
      <div>
        <label for="categoryId">Category:</label>
        <select id="categoryId" v-model="formData.categoryId" required>
          <option value="" disabled>Select Category</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
        </select>
      </div>
      <div>
        <label for="description">Description:</label>
        <textarea id="description" v-model="formData.description" required></textarea>
      </div>
      <div>
        <label for="releaseDate">Release Date:</label>
        <input type="date" id="releaseDate" v-model="formData.releaseDate" required>
      </div>
      <div>
        <label for="duration">Duration (minutes):</label>
        <input type="number" id="duration" v-model="formData.duration" required>
      </div>
      <button type="submit">Edit Movie</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const formData = ref({
  title: '',
  categoryId: '',
  description: '',
  releaseDate: '',
  duration: ''
});

const categories = ref([]); // Placeholder for categories data
const movieId = ref(''); // Placeholder for movie ID

// Function to fetch categories data
const fetchCategories = async () => {
  try {
    const response = await axios.get(`${baseUrlApi}/categories`);
    categories.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

// Call the fetchCategories function when the component is mounted
onMounted(fetchCategories);

// Function to fetch movie details
const fetchMovieDetails = async () => {
  try {
    const response = await axios.get(`${baseUrlApi}/movies/${movieId.value}`);
    const movieData = response.data;
    formData.value = {
      title: movieData.title,
      categoryId: movieData.category_id,
      description: movieData.description,
      releaseDate: movieData.release_date,
      duration: movieData.duration
    };
  } catch (error) {
    console.error('Error fetching movie details:', error);
  }
};

// Call the fetchMovieDetails function when the component is mounted
onMounted(fetchMovieDetails);

// Function to edit a movie
const editMovie = () => {
  axios.put(`${baseUrlApi}/movies/${movieId.value}`, formData.value, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then(response => {
      // Handle successful movie edit
      console.log('Movie edited successfully:', response.data);
    })
    .catch(error => {
      console.error('Error editing movie:', error);
    });
};
</script>

<style scoped>
.title {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

.search-container {
  margin-bottom: 20px;
}

.add-movie-container {
  margin-bottom: 20px;
}

.add-movie {
  padding: 10px 20px;
  background-color: #55868C;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-movie:hover {
  background-color: #3a5f63;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.page {
  width: 40px;
  height: 40px;
  background-color: #55868C;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
  margin-right: 5px;
  transition: background-color 0.3s;
}

.page:hover,
.page.active-page {
  background-color: #3a5f63;
}

.movie-gallery {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.no-results {
  text-align: center;
  margin-top: 20px;
}

.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30vh;
}
</style>
