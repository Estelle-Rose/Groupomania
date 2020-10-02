<template>
  <nav>
    <!-- Start of app toolbar -->
    <v-app-bar app color="red lighten-4" dark>
      <v-btn-toggle @click.stop="drawer = !drawer" class="hidden-md-and-up"></v-btn-toggle>
      <v-toolbar-title class="headline text-uppercase">
        <router-link to="/">
          <v-img
            alt="Groupomania Logo"
            class="shrink mr-2"
            contain
            to="/"
            :src="require('../assets/logogroupo.png')"
            transition="scale-transition"
            width="250"
          />
        </router-link>
      </v-toolbar-title>
      <v-btn v-if="$store.state.isLoggedIn" text to="/posts">Fil d'actu</v-btn>
      <v-spacer></v-spacer>

      <!-- <v-btn v-if="!$store.state.isLoggedIn" text to="/" exact>Accueil</v-btn> -->
      <div>
        <v-row justify="center">
          <v-menu bottom min-width="200px" rounded offset-y>
            <template v-slot:activator="{ on }">
              <v-btn icon x-large v-on="on">
                <v-avatar size="36px">
                  <!-- <img v-if="photo" alt="Avatar" :src="photo" /> -->

                  <v-icon>{{mdiAccountCircle}}</v-icon>
                </v-avatar>
              </v-btn>
            </template>
            <v-card>
              <v-list-item-content class="justify-center">
                <div class="mx-auto text-center">
                  <v-avatar>
                    <!-- <img v-if="$store.state.user.photo" alt="Avatar" :src="photo" /> -->
                    <v-icon>{{mdiAccountCircle}}</v-icon>
                  </v-avatar>
                  <h3>{{pseudo}}</h3>
                  <p class="caption mt-1">{{email}}</p>
                  <v-divider class="my-3"></v-divider>
                  <v-btn rounded text to="/account">Editer profil</v-btn>
                  <v-divider class="my-3"></v-divider>
                  <v-btn @click="logOut" rounded text>Déconnexion</v-btn>
                </div>
              </v-list-item-content>
            </v-card>
          </v-menu>
        </v-row>
      </div>

      <v-btn v-if="!$store.state.isLoggedIn" text to="/login">Connexion</v-btn>
      <v-btn v-if="!$store.state.isLoggedIn" text to="/signup">Inscription</v-btn>
      <v-btn v-if="$store.state.isLoggedIn" @click="logOut" text to="/">Déconnexion</v-btn>

      <v-btn text to="/signup">Profil</v-btn>
      <v-btn text to="/about">About</v-btn>
    </v-app-bar>
    <!-- End of app toolbar -->
    <!-- Start of mobile side menu -->
    <!-- <v-navigation-drawer app v-model="drawer" left>
    Menu title-->
    <!--<v-app-bar text>
        <v-list>
          <v-list-tile>
            <v-list-tile-title class="title">Menu</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-app-bar>
      <v-divider></v-divider>
    Menu Links-->
    <!--<v-list>
        <v-list-tile to="/" exact>
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Home</v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/signup">
          <v-list-tile-action>
            <v-icon>account-plus</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Inscription</v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/signup">
          <v-list-tile-action>
            <v-icon>login</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Connexion</v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/signup">
          <v-list-tile-action>
            <v-icon>account-circle</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Profil</v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/about">
          <v-list-tile-action>
            <v-icon>description</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>About</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>-->
    <!-- End of mobile side menu -->
  </nav>
</template>
<script>
import { mdiAccountCircle } from "@mdi/js";
export default {
  name: "PageHeader",
  data() {
    return {
      mdiAccountCircle,
      // photo: this.$store.state.user.photo,
      pseudo: this.$store.state.user.pseudo,
      email: this.$store.state.user.email
    };
  },
  computed: {},
  methods: {
    logOut: function() {
      console.log(this.$store.state.user.photo);
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
    }
  }
};
</script>
<style lang="scss" scoped>
.v-btn {
  margin-left: 20px;

  &__content {
    color: cornsilk !important;
  }
}
a {
  background-color: transparent;
}
</style>
