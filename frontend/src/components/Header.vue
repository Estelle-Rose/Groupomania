<template>
  <nav>
    <!-- Start of app toolbar -->
    <v-app-bar app  dark>
      <v-btn-toggle
        @click.stop="drawer = !drawer"
        class="hidden-md-and-up"
      ></v-btn-toggle>
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
     
            
       <v-btn v-if="$store.state.isLoggedIn"  small link to="/posts">Fil d'actu</v-btn>
      <account-preview v-if="$store.state.isLoggedIn"></account-preview> 

      <v-btn v-if="!$store.state.isLoggedIn" small to="/login">Connexion</v-btn>
      <v-btn v-if="!$store.state.isLoggedIn" small to="/signup"
        >Inscription</v-btn
      >
      <v-btn  v-if="$store.state.isLoggedIn" small  to="/account">Mon profil</v-btn>
      
 
      
    </v-app-bar>

  </nav>
</template>
<script>
//import AccountPreview from "../components/AccountPreview";

export default {
  name: "PageHeader",
 /*  components: {
    "account-preview": AccountPreview
  }, */
  data() {
    return {};
  },
  computed: {},

  methods: {
    logOut: function() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
    }
  }
};
</script>
<style lang="scss" scoped>
.v-btn {
  margin-left: 20px;  
  color: text2 !important;
  background-color: accent !important;
}

</style>
