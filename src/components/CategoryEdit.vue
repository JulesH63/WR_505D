<template>
    <div class="category-edit">
      <h1>Modifier les détails de la catégorie</h1>
      <form @submit.prevent="editCategory">
        <div class="form-group">
          <label for="categoryName">Nom de la catégorie</label>
          <input type="text" id="categoryName" v-model="editedCategory.name" required>
        </div>
        <button type="submit">Enregistrer</button>
        <button type="button" @click="onClose">Annuler</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { defineProps, ref } from 'vue';
  import axios from 'axios';
  
  const { category, onClose } = defineProps(['category', 'onClose']);
  const editedCategory = ref({ ...category });
  
  async function editCategory() {
    try {
      const response = await axios.patch(`http://localhost/api/categories/${category.id}`, editedCategory.value);
      console.log(response.data);
      closeModal();
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la catégorie :', error);
    }
  }
  
  function closeModal() {
    onClose(); // Appel de la fonction onClose pour fermer la modal
  }
  </script>
  
  <style scoped>
  .category-edit {
    max-width: 600px;
    margin: 0 auto;
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  label {
    display: block;
    font-weight: bold;
  }
  
  input[type="text"] {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  