<template>
    <div class="add-category">
      <p>Ajouter une catégorie</p>
      <div class="error" v-if="isError">Veuillez remplir tous les champs!</div>
      <div class="close" @click="close">FERMER</div>
      <form @submit.prevent="postCategory">
        <div class="form-group">
          <label for="categoryName">Nom de la catégorie</label>
          <input type="text" id="categoryName" v-model="categoryName" />
        </div>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { defineEmits } from 'vue';
  
  const token = localStorage.getItem('token');
  
  const isError = ref(false);
  const categoryName = ref('');
  
  const emit = defineEmits(['close']);
  const close = () => {
    emit('close', true);
  };
  
  // POST category
  async function postCategory() {
    if (!categoryName.value) {
      isError.value = true;
      return;
    }
  
    const data = {
      name: categoryName.value,
    };
  
    try {
      const response = await axios.post('http://localhost/api/categories', data, {
        headers: {
          Accept: 'application/ld+json',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      close();
      isError.value = false;
      fetchData();
    } catch (error) {
      console.error("Erreur lors de l'ajout de la catégorie:", error);
      isError.value = true;
    }
  }
  </script>
  
  <style scoped>
  /* Votre style ici */
  .add-category {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    max-width: 400px;
    background-color: #f4f4f4;
    padding: 1.5em;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .add-category p {
    text-align: center;
    font-weight: bold;
    margin-bottom: 1em;
  }
  
  .add-category .error {
    color: red;
    text-align: center;
    margin-bottom: 1em;
  }
  
  .add-category .close {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    color: #007bff;
  }
  
  .add-category form {
    display: flex;
    flex-direction: column;
    gap: 1.5em;
  }
  
  .add-category .form-group label {
    font-weight: bold;
    color: #555;
  }
  
  .add-category input[type="text"] {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .add-category button[type="submit"] {
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .add-category button[type="submit"]:hover {
    background-color: #0056b3;
  }
  </style>
  