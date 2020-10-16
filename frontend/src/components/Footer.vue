<template>
  <v-footer fixed padless dark  >
    <v-row justify="space-between"
      >
        <v-btn small to="/about" class="ml-5 mt-2">About</v-btn>
        <v-btn v-if="$store.state.isLoggedIn"  class="mr-5 mt-2" small @click="logOut"  to="/"
        >Déconnexion</v-btn
      >
      <v-col
        class="dark py-4 text-center white--text"
        cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>Groupomania</strong>
      </v-col>
    </v-row>
  
    
  </v-footer>
</template>
<script>
  import { mdiHome } from '@mdi/js';
  import { mdiEmail } from '@mdi/js';
  export default {
    name: 'PageFooter',
    data: () => ({
      mdiHome,

      mdiEmail,
   
      padless: false,
      variant: 'default',
    }),
   
    
    methods: {
    logOut: function() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
    }
  }
  };
</script>
<style lang="scss" scoped>
.footer {  
  padding: 0!important;
  
}
.footer-links {
display: flex;

}
</style>
