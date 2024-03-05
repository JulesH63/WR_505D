<template>
  <main class="home-container">
    <h1 class="title">Bienvenue sur notre plateforme de streaming de films</h1>
    <div v-for="(row, index) in movieRows" :key="index" class="movie-row">
      <div v-for="movie in row" :key="movie.id" class="movie-info">
        <h2 class="movie-title">{{ movie.title }}</h2>
        <p class="movie-description">{{ movie.description }}</p>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';

const movies = ref([
  {
    id: 1,
    title: 'Le Parrain',
    description: 'Un chef-d\'œuvre de Francis Ford Coppola, Le Parrain est un film incontournable du cinéma. Il raconte l\'histoire de la famille mafieuse Corleone et de son chef, Don Vito Corleone, joué par Marlon Brando.'
  },
  {
    id: 2,
    title: 'Forrest Gump',
    description: 'Forrest Gump, interprété par Tom Hanks, raconte une histoire extraordinaire dans un contexte historique mouvementé. Ce film suit la vie de Forrest, un homme simple d\'esprit, à travers les événements marquants du XXe siècle américain.'
  },
  {
    id: 3,
    title: 'Inception',
    description: 'Inception est un film de Christopher Nolan qui défie les limites de la réalité et de l\'imagination. Il plonge les spectateurs dans un monde de rêves et d\'espionnage où les frontières entre la réalité et l\'illusion s\'estompent.'
  },
  {
    id: 4,
    title: 'Matrix',
    description: 'Matrix est un film de science-fiction révolutionnaire qui explore des concepts philosophiques et technologiques. Il suit l\'histoire de Neo, un hacker qui découvre que le monde dans lequel il vit n\'est qu\'une simulation contrôlée par des machines.'
  },
  {
    id: 5,
    title: 'Interstellar',
    description: 'Interstellar est une épopée spatiale époustouflante qui plonge dans les mystères de l\'univers. Réalisé par Christopher Nolan, ce film suit une équipe d\'explorateurs qui voyagent à travers les dimensions pour trouver une nouvelle planète habitable pour l\'humanité.'
  },
  {
    id: 6,
    title: 'Gladiator',
    description: 'Gladiator est un film épique sur la vengeance, le courage et l\'honneur dans l\'ancienne Rome. Il met en scène Maximus Decimus Meridius, un général romain déchu qui devient gladiateur et se bat pour venger sa famille et son empereur.'
  },
  {
    id: 7,
    title: 'Pulp Fiction',
    description: 'Pulp Fiction est un film culte de Quentin Tarantino, plein de dialogues mémorables et de rebondissements inattendus. Il présente plusieurs histoires entrelacées mettant en vedette des personnages colorés et des situations imprévisibles.'
  },
  {
    id: 8,
    title: 'The Dark Knight',
    description: 'The Dark Knight est une adaptation sombre et captivante du célèbre super-héros de DC Comics, Batman. Réalisé par Christopher Nolan, ce film explore les thèmes de la justice, de la vengeance et du chaos, avec une performance emblématique de Heath Ledger dans le rôle du Joker.'
  },
  {
    id: 9,
    title: 'Fight Club',
    description: 'Fight Club est un film provocateur sur l\'aliénation, la violence et la quête de sens dans la société moderne. Il suit l\'histoire d\'un homme anonyme, joué par Edward Norton, qui trouve un soulagement de sa vie ennuyeuse en rejoignant un club de combat clandestin dirigé par Tyler Durden, joué par Brad Pitt.'
  }
]);

const movieRows = ref([]);
for (let i = 0; i < Math.ceil(movies.value.length / 3); i++) {
  movieRows.value.push(movies.value.slice(i * 3, i * 3 + 3));
}
</script>

<style scoped>
.home-container {
  padding: 20px;
  background-image: radial-gradient(circle, #ff0000, #000000);
  color: #fff;
  font-family: 'Arial', sans-serif;
}

.title {
  text-align: center;
  font-size: 28px;
  margin-bottom: 40px;
}

.movie-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 20px;

}

.movies-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.movie-info {
  width: calc(33.3333% - 20px);
  margin-left: 20px;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 8px;
}

.movie-title {
  text-align: center;
  font-size: 20px;
  margin-bottom: 10px;
}

.movie-description {
  font-size: 16px;
  margin-bottom: 10px;
}

.movie-rating {
  font-size: 14px;
}

@media (max-width: 768px) {
  .movie-info {
    width: calc(50% - 20px);
  }
}

@media (max-width: 480px) {
  .movie-info {
    width: 100%;
  }
}
</style>
