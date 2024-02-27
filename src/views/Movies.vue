<template>
  <div class="movie-list">
    <div class="title">
      <h1>FILMS</h1>
    </div>
    <div class="gallery">
      <MovieCard v-for="movie in data" :key="movie.id" :movie="movie" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import MovieCard from "../components/MovieCard.vue";

let data = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get(
      "http://localhost/laragon/www/WR_505D/public/index.php/api/movies?page=1",
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    data.value = response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
});
</script>

<style scoped lang="scss">
.movie-list {
  .title {
    text-align: center;
    margin-bottom: 1em;
  }

  .gallery {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1em;
    justify-items: center;
  }
}
</style>
