<script setup>
defineProps({
  categoryData: Object,
});
</script>

<template>
  <div class="category-container">
    <div class="category-info">
      <h3>{{ categoryData.name }}</h3>
    </div>
    <div class="category-movies">
      <div class="movie-item" v-for="movie in categoryData.movies" :key="movie.id">
        <p>{{ movie.title }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.category-container {
  background-color: #1f1f1f;
  color: white;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  max-width: 380px;
  margin: 20px auto;
  .category-info {
    padding: 0 15px 15px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    h3 {
      margin-top: 0;
      font-size: 1.3em;
    }
    p {
      margin: 8px 0;
      font-size: 0.9em;
      line-height: 1.4;
    }
  }
  .category-movies {
    margin-top: 15px;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    .movie-item {
      flex: 1 1 calc(50% - 8px);
      background-color: #2c2c2c;
      padding: 8px 12px;
      border-radius: 6px;
    }
    p {
      margin: 0;
    }
  }
}
</style>
