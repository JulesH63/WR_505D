<template>
    <div class="actor-edit">
      <h1>Modifier les détails de l'acteur</h1>
      <form @submit.prevent="editActor">
        <div class="form-group">
          <label for="firstName">Prénom</label>
          <input type="text" id="firstName" v-model="editedActor.firstName" required>
        </div>
        <div class="form-group">
          <label for="lastName">Nom</label>
          <input type="text" id="lastName" v-model="editedActor.lastName" required>
        </div>
        <div class="form-group">
          <label for="nationality">Nationalité</label>
          <select id="nationality" v-model="editedActor.nationality" required>
            <option v-for="nationality in nationalities" :key="nationality.id" :value="nationality.id">{{ nationality.name }}</option>
          </select>
        </div>
        <button type="submit">Enregistrer</button>
        <button type="button" @click="closeModal">Annuler</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { defineProps, ref, onMounted } from 'vue';
  import axios from 'axios';
  
  const { actor } = defineProps(['actor']);
  const editedActor = ref({ ...actor });
  const nationalities = ref([]);
  
  async function fetchNationalities() {
    try {
      const response = await axios.get('http://localhost/api/nationalities?page=1');
      nationalities.value = response.data['hydra:member'];
    } catch (error) {
      console.error('Erreur lors de la récupération des nationalités :', error);
    }
  }
  
  async function editActor() {
  try {
    const { id, firstName, lastName, nationalityId } = editedActor.value;
    const data = {
      firstName: firstName,
      lastName: lastName,
      nationalityId: nationalityId
    };

    const response = await axios.patch(`http://localhost/api/actors/${id}`, data);
    console.log(response.data);
    closeModal();
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'acteur :', error);
  }
}
  
  function closeModal() {
    // Code pour fermer la modal, par exemple, émettre un événement ou changer un état
  }
  
  onMounted(fetchNationalities);
  </script>
  
  
  <style scoped>
  .actor-edit {
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
  
  input[type="text"],
  select {
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