<script setup>
defineProps({
  movie: Object,
});
</script>

<template>
  <div class="movie-card">
    <div class="infos">
      <h2>{{ movie.title }}</h2>
      <p><span class="bold">Synopsis : </span> {{ movie.description }}</p>
      <p><span class="bold">Date de sortie : </span>{{ movie.releaseDate }}</p>
    </div>
    <div class="actors">
      <div class="actor">
        <p v-for="actor in movie.actors">
          {{ actor.firstName + " " + actor.lastName }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.movie-card {
  background-color: #1b1b1b;
  color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 350px;
  margin: 20px auto;
}

.movie-card .infos {
  padding: 0 20px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.movie-card .infos h2 {
  margin-top: 0;
  font-size: 1.5em;
}

.movie-card .infos p {
  margin: 10px 0;
  font-size: 0.9em;
  line-height: 1.4;
}

.movie-card .actors {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.movie-card .actors .actor {
  flex: 1 1 calc(50% - 10px);
}

.movie-card .actors p {
  margin: 0;
  background-color: #2d2d2d;
  padding: 5px 10px;
  border-radius: 5px;
}

.bold {
  font-weight: bold;
  color: #f39c12; /* couleur d'accent */
}
</style>
