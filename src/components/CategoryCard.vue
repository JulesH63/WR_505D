<template>
  <div class="category-card">
    <div class="category-content">
      <div class="category-header">
        <h2>{{ category.name }}</h2>
      </div>
      <div class="category-details">
        <!-- Ajoutez d'autres détails de la catégorie ici si nécessaire -->
      </div>
    </div>
    <div class="actions">
      <div class="edit" @click="openEditModal">Modifier</div>
      <div class="delete" @click="deleteCategory">Supprimer</div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import axios from 'axios';

const { category, fetchData } = defineProps(["category", "fetchData"]);
const baseUrl = "http://localhost"; // Remplacez par votre URL de base
const token = localStorage.getItem("token");

const deleteCategory = async () => {
  try {
    // Récupérer l'ID de la catégorie en découpant l'URL
    const categoryId = category["@id"].split("/").pop();
    const response = await axios.delete(`${baseUrl}/api/categories/${categoryId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    if (fetchData) {
      fetchData(); // Actualiser les données après la suppression
    }
  } catch (error) {
    console.error("Erreur lors de la suppression de la catégorie:", error);
  }
};
</script>


<style scoped>
.category-card {
  width: 15em;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin: 1em;
  height: fit-content;
  border: 1px solid white; /* Ajout d'un bord blanc solide */
}

.category-content {
  padding: 1.5em;
}

.category-header {
  text-align: center;
  margin-bottom: 1em;
}

.category-header h2 {
  font-size: 1.2em;
  margin: 0;
}

.category-details {
  font-size: 0.9em;
}

.actions {
  display: flex;
  justify-content: space-between;
  padding: 0 1.5em;
}

.actions .edit,
.actions .delete {
  background-color: #007bff;
  color: white;
  text-align: center;
  padding: 0.5em 0.7em;
  cursor: pointer;
  border-radius: 5px;
}

.actions .edit:hover,
.actions .delete:hover {
  background-color: #0056b3;
}
</style>