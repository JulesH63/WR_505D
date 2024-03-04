<script setup>
import { ref, onMounted, reactive } from "vue";
import axios from "axios";
import ActorCard from "../components/ActorCard.vue";
import AddActorForm from "../components/AddActor.vue";

let state = reactive({
  data: [],
});
let token = localStorage.getItem("token");
const isAddActor = ref(false);

async function fetchData() {
  const response = await axios.get("http://localhost/api/actors", {
    headers: {
      Accept: "application/ld+json",
      Authorization: `Bearer ${token}`,
    },
  });
  state.data = response.data["hydra:member"];
}

onMounted(() => {
  fetchData();
});

function toggleAddActor() {
  isAddActor.value = !isAddActor.value;
}
</script>

<template>
  <div>
    <AddActorForm :fetchData="fetchData" @close="toggleAddActor" v-if="isAddActor" />
  </div>

  <div class="crud">
    <div class="addActor" @click="toggleAddActor">Ajouter un acteur</div>
  </div>

  <div class="gallery">
    <ActorCard v-for="actor in state.data" :key="actor.id" :actor="actor" :fetchData="fetchData" />
  </div>
</template>

<style scoped lang="scss">
.gallery {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 2em auto;
  gap: 2em;
  padding: 2em;
  max-width: 1200px; // Adaptez en fonction de la largeur désirée
  background-color: #f4f4f4; // Une couleur de fond légère pour contraster avec les cartes
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
    background-color: #A76571;
    color: white;
    border-radius: 8px;
    cursor: pointer;
  }
}
</style>
