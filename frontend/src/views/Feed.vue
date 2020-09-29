<template>
  <v-container fluid>
    <v-row class="text-center d-flex flex-column justify-center align-center">
      <v-col cols="8">
        <v-img
          :src="require('../assets/logo_transparent.png')"
          class="my-2"
          contain
          height="50"
        />
      </v-col>
      <v-col cols="8">
        <v-card class="posts-card mx-auto" elevation="2">
          <v-card-title flat dense dark class="red lighten-4">
            <v-icon>mdi-share-variant</v-icon>
            <v-btn text to="/signup">Les + récents</v-btn>
            <v-btn text to="/about">Les + likés</v-btn>
          </v-card-title>
        </v-card>
      </v-col>
      <posts
        v-for="(item, i) in postsContent"
        :key="i"
        :title="item.title"
        :message="item.message"
        :author="item.author"
        :image="item.image"
      ></posts>
    </v-row>
  </v-container>
</template>

<script>
  // @ is an alias to /src
  import Posts from '../components/Posts.vue';
  export default {
    name: 'Feed',
    components: {
      Posts,
    },
    data() {
      return {
        postsContent: [
          {
            title: 'Ce soir il fair froid',
            message: '',
            image: {
              source: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
            },
            author: 'Estelle66',
          },
          {
            title: 'Trop de la balle',
            message: '',
            image: {
              source: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
            },
            author: 'Paul66',
          },
          {
            title: 'Je suis la plus belle',
            message: 'hkjhkjhkjhkjhkjhkhkjhkjh',
            image: {
              source: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
            },
            author: 'Estelle66',
          },
        ],
      };
    },
  };
</script>
<style></style>
