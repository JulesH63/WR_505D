<script setup>
import { onMounted, ref, toRaw } from "vue";
import axios from "axios";
// import CategoryCard from "../components/CustomCategoryCard.vue"; 
let categoryData = ref(""); 
// onMounted(async () => {
//   const response = await axios.get(
//     // "http://localhost/api/category"
//     {
//       headers: {
//         Accept: "application/json",
//       },
//     }
//   );
//   categoryData.value = response.data; 
//   console.log(toRaw(categoryData.value));
// });
</script>

<template>
  <div class="title"><h1>Our Categories</h1></div> 
  <div class="category-gallery"> 
    <CustomCategoryCard 
      v-for="category in categoryData" 
      :key="category.id"
      :category="category"
    />
  </div>
</template>

<style scoped lang="scss">
.category-gallery {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 2em auto;
  gap: 2em;
  padding: 2em;
  max-width: 1200px;
  background-color: #f0f0f0; 
  border-radius: 16px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.1); 
}

.title {
  text-align: center;
  margin-bottom: 20px;
  h1 {
    font-size: 2em; 
    color: #333;
  }
}
</style>
