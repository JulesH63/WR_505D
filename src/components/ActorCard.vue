<template>
  <div class="actor-card">
    <div class="actor-content">
      <div class="actor-header">
        <h2>{{ actor.firstName }} {{ actor.lastName }}</h2>
      </div>
      <div class="actor-details">
        <p v-if="actor.nationality && actor.nationality.name" class="actor-nationality">{{ actor.nationality.name }}</p>
      </div>
    </div>
    <div class="delete" @click="deleteActor">Supprimer</div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import axios from 'axios';

const { actor, fetchData } = defineProps(["actor", "fetchData"]);

const deleteActor = async () => {
  try {
    const response = await axios.delete(`http://localhost/api/actors/${actor.id}`);
    console.log(response);
    fetchData();
  } catch (error) {
    console.error("Erreur lors de la suppression de l'acteur:", error);
  }
};
</script>

<style scoped>
.actor-card {
  width: 15em;
  background-color: #141414;
  color: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin: 1em;
  height: fit-content;
  border: 1px solid white;
}

.actor-content {
  padding: 1.5em;
}

.actor-header {
  text-align: center;
  margin-bottom: 1em;
}

.actor-header h2 {
  font-size: 1.2em;
  margin: 0;
}

.actor-details {
  font-size: 0.9em;
}

.actor-nationality {
  color: #ccc;
  margin-bottom: 1em;
}

.actor-movie-list {
  display: flex;
  flex-direction: column;
}

.movie-link {
  color: #e50914;
  text-decoration: none;
  margin-bottom: 0.5em;
  transition: color 0.3s ease;
}

.movie-link:hover {
  color: #ff0000;
}

.delete {
  background-color: #e50914;
  color: white;
  text-align: center;
  padding: 0.5em 0;
  cursor: pointer;
}

.delete:hover {
  background-color: #ff0000;
}
</style>
