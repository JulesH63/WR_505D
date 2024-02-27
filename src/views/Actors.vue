<script setup>
import { onMounted, ref, toRaw } from "vue";
import axios from "axios";
import ActorCard from "../components/ActorCard.vue";

let data = ref("");
let token = localStorage.getItem("token");

onMounted(async () => {
  const response = await axios.get("http://localhost/api/actors?page=1", {
    headers: {
      Accept: "application/ld+json",
      Authorization: `Bearer ${token}`,
    },
  });
  data.value = response.data["hydra:member"];
  console.log(toRaw(data.value));
});
</script>

<template>
  <div class="gallery">
    <ActorCard v-for="actor in data" :key="actor.id" :actor="actor" />
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
  max-width: 1200px; 
  border-radius: 12px;
}
</style>