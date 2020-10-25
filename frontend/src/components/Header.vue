<template>
  <nav>
    <!-- Start of app toolbar -->
    <v-app-bar app dark>
      <v-toolbar-title class="headline text-uppercase">
        <router-link to="/">
          <v-img
            alt="Groupomania Logo"
            class="shrink mr-2"
            contain
            to="/"
            :src="require('../assets/icon-left-font-monochrome-white.png')"
            transition="scale-transition"
            width="250"
          />
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        v-if="$store.state.isLoggedIn"
        x-small
        link
        aria-label="fil d'actualité"
        class="input-group--focused"
        to="/posts"
        >Fil d'actu</v-btn
      >
      <v-btn
        v-if="!$store.state.isLoggedIn"
        x-small
        aria-label="Connexion"
        class="input-group--focused"
        to="/login"
        >Connexion</v-btn
      >
      <v-btn
        v-if="!$store.state.isLoggedIn"
        x-small
        aria-label="Inscription"
        class="input-group--focused"
        to="/signup"
        >Inscription</v-btn
      >
      <v-btn
        v-if="$store.state.isLoggedIn"
        aria-label="Profil"
        small
        icon
        @click="getProfile(user.id)"
        class="input-group--focused"
        ><v-avatar>
          <img
            v-if="user.photo"
            alt="Avatar"
            :src="user.photo"
            class="photo-header"
          />
          <v-icon :color="isLoggedIn" size="35px" v-else
            >$vuetify.icons.account</v-icon
          >
        </v-avatar></v-btn
      >
      <v-btn
        v-if="$store.state.isLoggedIn"
        aria-label="tous les profils"
        to="/accounts"
        icon
        small
        class="input-group--focused mr-4"
        ><v-avatar>
          <v-icon size="35px">$vuetify.icons.friends</v-icon>
        </v-avatar></v-btn
      >
    </v-app-bar>
  </nav>
</template>
<script>
//import AccountPreview from "../components/AccountPreview";

export default {
  name: "PageHeader",
  props: {
    user: {
      type: Object,
    },
  },
  data() {
    return {};
  },
  computed: {
    isLoggedIn() {
      if (this.$store.state.isLoggedIn) {
        return "pink";
      } else {
        return "";
      }
    },
  },

  methods: {
    /* logOut: function() {
      this.$store.dispatch("logOut");
     /*  this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null); */

    getProfile(id) {
      this.$router.push(`/account/${id}`);
    },
  },
};
</script>
<style lang="scss" scoped>
.v-btn {
  margin-left: 20px;
  color: text2 !important;
  background-color: accent !important;
}
</style>
