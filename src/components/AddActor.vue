<template>
  <div class="add-actor">
    <p>Ajouter un acteur</p>
    <div class="error" v-if="isError">Veuillez remplir tous les champs!</div>
    <div class="close" @click="close">FERMER</div>
    <form @submit.prevent="postActor">
      <div class="form-group">
        <label for="firstName">Prénom</label>
        <input type="text" id="firstName" v-model="firstName" />
      </div>
      <div class="form-group">
        <label for="lastName">Nom</label>
        <input type="text" id="lastName" v-model="lastName" />
      </div>
      <div class="form-group">
        <label for="nationality">Nationalité</label>
        <select id="nationality" v-model="selectedNationality">
          <option value="" disabled>--Nationalité--</option>
          <option v-for="nationality in nationalityList" :key="nationality.idUrl" :value="nationality">
            {{ nationality.name }}
          </option>
        </select>
      </div>

      <button type="submit">Ajouter</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { defineEmits } from 'vue';

const token = localStorage.getItem("token");

const isError = ref(false);

const nationalityList = ref([]);
const selectedNationality = ref("");

const firstName = ref("");
const lastName = ref("");

const emit = defineEmits(['close']);
const close = () => {
  emit('close', true);
};

// GET nationalities
async function getNationalities(url = `http://localhost/api/nationalities`) {
  try {
    const response = await axios.get(url, {
      headers: {
        Accept: "application/ld+json",
        Authorization: `Bearer ${token}`,
      },
    });
    nationalityList.value = response.data["hydra:member"].map((nationality) => {
      return {
        idUrl: nationality["@id"],
        name: nationality.name,
      };
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des nationalités:", error);
  }
}

// POST actor
async function postActor() {
  if (!firstName.value || !lastName.value || !selectedNationality.value) {
    isError.value = true;
    return;
  }

  const data = {
    firstName: firstName.value,
    lastName: lastName.value,
    nationality: selectedNationality.value.idUrl,
  };

  try {
    const response = await axios.post(`http://localhost/api/actors`, data, {
      headers: {
        Accept: "application/ld+json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    close();
    isError.value = false;
    await getNationalities(); // Mettre à jour la liste des nationalités après l'ajout d'un acteur
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'acteur:", error);
    isError.value = true;
  }
}

// Fetch nationalities on component mount
onMounted(() => {
  getNationalities();
});
</script>

<style scoped>
/* Votre style ici */
.add-actor {
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

.add-actor p {
  text-align: center;
  font-weight: bold;
  margin-bottom: 1em;
}

.add-actor .error {
  color: red;
  text-align: center;
  margin-bottom: 1em;
}

.add-actor .close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  color: #007bff;
}

.add-actor form {
  display: flex;
  flex-direction: column;
  gap: 1.5em;
}

.add-actor .form-group label {
  font-weight: bold;
  color: #555;
}

.add-actor input[type="text"],
.add-actor select {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.add-actor button[type="submit"] {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-actor button[type="submit"]:hover {
  background-color: #0056b3;
}
</style>
