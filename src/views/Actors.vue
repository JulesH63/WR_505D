<template>
  <div>
    <!-- Ajout du formulaire d'édition de l'acteur -->
    <ActorEdit :actor="selectedActor" v-if="isEditing" @close="closeEditForm" />

    <AddActorForm :fetchData="fetchData" @close="toggleAddActor" v-if="isAddActor" />
  
    <div class="crud">
      <div class="addActor" @click="toggleAddActor">Ajouter un acteur</div>
    </div>
  
    <div class="search-bar-container">
      <input
        type="text"
        placeholder="Rechercher un acteur..."
        v-model="searchQuery"
        @input="searchActor"
      />
    </div>
  
    <div class="gallery">
      <ActorCard v-for="actor in state.filteredData" :key="actor.id" :actor="actor" :fetchData="fetchData" @edit="openEditForm" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import axios from "axios";
import ActorCard from "../components/ActorCard.vue";
import AddActorForm from "../components/AddActor.vue";
import ActorEdit from "../components/ActorEdit.vue";

let state = reactive({
  data: [],
  filteredData: [],
});
let token = localStorage.getItem("token");
const isAddActor = ref(false);
const isEditing = ref(false);
const searchQuery = ref("");
const selectedActor = ref(null);

function removeAccents(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function filterActors(actors, searchTerm) {
  if (!searchTerm) {
    return actors;
  }

  searchTerm = removeAccents(searchTerm.toLowerCase());

  return actors.filter(actor => {
    const normalizedLastName = removeAccents(actor.lastName.toLowerCase());
    const normalizedFirstName = removeAccents(actor.firstName.toLowerCase());
    return normalizedLastName.includes(searchTerm) || normalizedFirstName.includes(searchTerm);
  });
}

async function fetchData() {
  try {
    const response = await axios.get("http://localhost/api/actors", {
      headers: {
        Accept: "application/ld+json",
        Authorization: `Bearer ${token}`,
      },
    });
    state.data = response.data["hydra:member"].map(actor => ({
      id: actor.id,
      firstName: actor.firstName,
      lastName: actor.lastName,
    }));
    console.log(state.data); // Vérifiez les données récupérées dans la console
    state.filteredData = filterActors(state.data, searchQuery.value);
  } catch (error) {
    console.error("Une erreur s'est produite lors de la récupération des données.", error);
  }
}

onMounted(() => {
  fetchData();
});

function toggleAddActor() {
  isAddActor.value = !isAddActor.value;
}

// Méthode pour ouvrir le formulaire d'édition de l'acteur
function openEditForm(actor) {
  selectedActor.value = actor;
  isEditing.value = true;
}

// Méthode pour fermer le formulaire d'édition de l'acteur
function closeEditForm() {
  selectedActor.value = null;
  isEditing.value = false;
}

async function searchActor() {
  try {
    const response = await axios.get(`http://localhost/api/actors`, {
      params: {
        page: 1,
        lastName: searchQuery.value
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data;
    state.data = data['hydra:member'];
    state.filteredData = filterActors(state.data, searchQuery.value);
  } catch (error) {
    console.error("Une erreur s'est produite lors de la recherche des acteurs.", error);
  }
}
</script>

<style scoped lang="scss">
.gallery {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 2em auto;
  gap: 2em;
  padding: 2em;
  max-width: 1200px;
  background-color: #f4f4f4;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.crud {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2em;
  gap: 1em;

  .addActor {
    width: 10em;
    height: 3em;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #a76571;
    color: white;
    border-radius: 8px;
    cursor: pointer;
  }
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