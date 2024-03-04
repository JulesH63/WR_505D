<script setup>
import { defineProps } from "vue";
import axios from "axios";

const { actor } = defineProps(["actor"]);
const baseUrl = "http://localhost/api/actors";
const token = localStorage.getItem("token");

import { onMounted } from "vue";

onMounted(() => {
  console.log(actor);
});

async function deleteActor() {
  const actorId = actor["@id"].split("/").pop();
  try {
    const response = await axios.delete(`${baseUrl}/${actorId}`, {
      headers: {
        Accept: "application/ld+json",
        Authorization: `Bearer ${token}`,
      },
    });
    fetchData();
  } catch (error) {
    console.log(error);
  }
}
</script>

<template>
  <div>
    <h2>{{ actor.firstName }} {{ actor.lastName }}</h2>
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
  background-color: #f4f4f4;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}
</style>
