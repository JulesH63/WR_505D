<template>
  <div class="container">
    <h1>Liste des catégories</h1>
    <div class="search-filter-container">
      <input type="text" v-model="search" placeholder="Rechercher une catégorie..." class="form-control">
      <button @click="openAddCategoryModal">Ajouter une catégorie</button>
    </div>
    <div class="row category-cards-container">
      <div class="col-md-4 mb-3" v-for="category in filteredCategories" :key="category.id">
        <category-card :category="category" @delete="deleteCategory(category.id)" @edit="openEditCategoryModal(category.id)"></category-card>
      </div>
    </div>
    <AddCategory v-if="isAddingCategory" @close="closeAddCategoryModal" />
  </div>
</template>

<script>
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import CategoryCard from '../components/CategoryCard.vue';
import AddCategory from '../components/AddCategory.vue';

export default {
  components: {
    CategoryCard,
    AddCategory
  },
  setup() {
    const router = useRouter();
    const filteredCategories = ref([]);
    const categories = ref([]);
    const search = ref('');
    const isAddingCategory = ref(false);
    const token = localStorage.getItem('token');
    const API_URL = 'http://localhost/api/categories';

    if (!token) {
      router.push('/login');
    }

    onMounted(async () => {
      await getCategories();
    });

    async function getCategories() {
      try {
        const response = await axios.get(API_URL);
        categories.value = response.data['hydra:member'];
        searchCategory();
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }

    watch(search, (newValue, oldValue) => {
      searchCategory();
    });

    const searchCategory = () => {
      filteredCategories.value = categories.value.filter(category => {
        return category.name.toLowerCase().includes(search.value.toLowerCase());
      });
    };

    function openAddCategoryModal() {
      isAddingCategory.value = true;
    }

    function closeAddCategoryModal() {
      isAddingCategory.value = false;
    }

    async function deleteCategory(categoryId) {
      try {
        await axios.delete(`${API_URL}/${categoryId}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        await getCategories();
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    }

    function openEditCategoryModal(categoryId) {
      // Naviguer vers AddCategory avec l'ID de la catégorie à éditer dans l'URL
      router.push({ name: 'EditCategory', params: { id: categoryId } });
    }

    // Retournez les méthodes et données utilisées dans le template
    return {
      filteredCategories,
      search,
      isAddingCategory,
      openAddCategoryModal,
      closeAddCategoryModal,
      deleteCategory,
      openEditCategoryModal
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
  justify-content: center;
  margin-bottom: 20px;
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

.category-cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 20px;
}

.mb-3 {
  margin-bottom: 15px;
}

.add-category {
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

.add-category:focus {
  outline: none;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  color: #fff;
}

/* Styles pour les éléments des catégories */

.category-card {
  background-color: #141414;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.category-card-content {
  padding: 15px;
}

.category-name {
  margin: 0;
  font-size: 16px;
  color: #fff;
}

.category-description {
  font-size: 14px;
  color: #ccc;
  margin-top: 5px;
}

</style>