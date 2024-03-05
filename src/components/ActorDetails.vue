<template>
  <div class="actor-details">
    <h2>{{ actor.firstName }} {{ actor.lastName }}</h2>
    <p v-if="actor.nationality && actor.nationality.name" class="actor-nationality">{{ actor.nationality.name }}</p>
    <div class="delete" @click="deleteActor">Supprimer</div>

    <h3>Modifier les détails de l'acteur</h3>
    <form @submit.prevent="updateActor">
      <div class="form-group">
        <label for="firstName">Prénom</label>
        <input type="text" id="firstName" v-model="updatedActor.firstName" />
      </div>
      <div class="form-group">
        <label for="lastName">Nom</label>
        <input type="text" id="lastName" v-model="updatedActor.lastName" />
      </div>
      <div class="form-group">
        <label for="nationality">Nationalité</label>
        <select id="nationality" v-model="updatedActor.nationality">
          <option value="" disabled>--Nationalité--</option>
          <option v-for="nationality in nationalityList" :key="nationality.id" :value="nationality.id">
            {{ nationality.name }}
          </option>
        </select>
      </div>

      <button type="submit">Modifier</button>
    </form>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import axios from "axios";

const { actor, fetchData } = defineProps(["actor", "fetchData"]);

const updatedActor = reactive({ ...actor });

const deleteActor = async () => {
  try {
    const response = await axios.delete(`http://localhost/api/actors/${actor.id}`);
    console.log(response);
    fetchData();
  } catch (error) {
    console.error("Erreur lors de la suppression de l'acteur:", error);
  }
};

const updateActor = async () => {
  try {
    const response = await axios.put(`http://localhost/api/actors/${actor.id}`, updatedActor);
    console.log(response);
    fetchData();
  } catch (error) {
    console.error("Erreur lors de la modification de l'acteur:", error);
  }
};

// Fonction pour récupérer la liste des nationalités
const getNationalities = async () => {
  try {
    const response = await axios.get(`http://localhost/api/nationalities`);
    return response.data["hydra:member"];
  } catch (error) {
    console.error("Erreur lors de la récupération des nationalités:", error);
    return [];
  }
};

// Initialiser la liste des nationalités lors du chargement du composant
onMounted(async () => {
  nationalityList.value = await getNationalities();
});
</script>

<style scoped>
.actor-details {
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

.actor-details h2 {
  font-size: 1.2em;
  margin: 0;
}

.actor-details p {
  color: #ccc;
  margin-bottom: 1em;
}

.delete {
  background-color: #e50914;
  color: white;
  text-align: center;
  padding: 0.5em 0;
  cursor: pointer;
  margin-bottom: 1em;
}

.delete:hover {
  background-color: #ff0000;
}

.form-group {
  margin-bottom: 1em;
}

.form-group label {
  font-weight: bold;
  color: #ccc;
}

.form-group input[type="text"],
.form-group select {
  width: 100%;
  padding: 0.5em;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button[type="submit"] {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button[type="submit"]:hover {
  background-color: #0056b3;
}
</style>
