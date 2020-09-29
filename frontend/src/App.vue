<template>
  <v-app>
    <page-header></page-header>
    <v-main>
      <v-container fluid>
        <router-view></router-view>
        <!-- Display view pages here based on route -->
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  import PageHeader from './components/Header.vue';
  export default {
    name: 'app',
    components: {
      PageHeader,
    },

    data: () => {
      return {
        drawer: false,
      };
    },
  };
</script>
<style lang="scss">
  .v-btn {
    color: #003032 !important;
    &:hover {
      color: #ff4081 !important; /*accent color*/
    }
  }
</style>
<!--   <v-app-bar app color="red lighten-4" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Groupomania Logo"
          class="shrink mr-2"
          contain
          src="./assets/Fichier 3.png"
          transition="scale-transition"
          width="250"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar> -->
