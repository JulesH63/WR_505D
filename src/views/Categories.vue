<template>
  <div class="categories">
    <div class="title">
      <h1>Our Categories</h1>
    </div>
    <div class="search-bar-container">
      <input type="text" placeholder="Search category..." v-model="searchQuery" @input="searchCategory" />
    </div>
    <div class="category-gallery">
      <CategoryCard v-for="category in filteredCategories" :key="category.id" :category="category" />
    </div>
    <!-- Ajout du bouton d'ajout de catégorie -->
    <button @click="openAddCategoryModal">Ajouter une catégorie</button>
    <!-- Ajout du composant AddCategoryForm avec la liaison des événements -->
    <AddCategory v-if="isAddingCategory" :isAddingCategory="isAddingCategory" @close="closeAddCategoryModal" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import CategoryCard from '@/components/CategoryCard.vue';
import AddCategory from '@/components/AddCategory.vue';

const categories = ref([]);
const searchQuery = ref('');
const isAddingCategory = ref(false); // Déclaration de la variable pour le contrôle de la modale

onMounted(async () => {
  await fetchData();
});

const fetchData = async () => {
  try {
    const response = await axios.get('http://localhost/api/categories?page=1', {
      headers: {
        Accept: 'application/ld+json',
      },
    });
    categories.value = response.data['hydra:member'];
    searchCategory();
  } catch (error) {
    console.error("An error occurred while fetching categories:", error);
  }
};

const filteredCategories = ref([]);

const searchCategory = () => {
  filteredCategories.value = categories.value.filter(category => {
    return category.name.toLowerCase().includes(searchQuery.value.toLowerCase());
  });
};

// Fonction pour ouvrir la modale d'ajout de catégorie
const openAddCategoryModal = () => {
  isAddingCategory.value = true;
};

// Fonction pour fermer la modale d'ajout de catégorie
const closeAddCategoryModal = () => {
  isAddingCategory.value = false;
};
</script>

<style scoped>
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
}

h1 {
  font-size: 2em; 
  color: #333;
}

.search-bar-container {
  margin: 1em auto;
  text-align: center;

  input {
    width: 300px;
    padding: 0.5em;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 1rem;
  }
}
</style>
