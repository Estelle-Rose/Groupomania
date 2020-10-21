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
    

      <v-btn v-if="!$store.state.isLoggedIn" small to="/login">Connexion</v-btn>
      <v-btn v-if="!$store.state.isLoggedIn" small to="/signup"
        >Inscription</v-btn
      >
    <!--   <v-btn  v-if="$store.state.isLoggedIn" small  @click="getProfile(user.id)">Mon profil</v-btn> -->
      <v-btn  v-if="$store.state.isLoggedIn" icon @click="getProfile(user.id)" size="35px" ><v-avatar >
                 <img v-if="user.photo" alt="Avatar" :src="user.photo"  />  
                <v-icon v-else >{{ mdiAccountCircle }}</v-icon>
              </v-avatar></v-btn>
      <v-btn v-if="$store.state.isLoggedIn" to="/accounts" icon  size="25px" ><v-avatar >
                
                <v-icon >{{ mdiAccountSupervisorCircle  }}</v-icon>
              </v-avatar></v-btn>
      
 
      
    </v-app-bar>

  </nav>
</template>
<script>
//import AccountPreview from "../components/AccountPreview";
import { mdiAccountSupervisorCircle  } from '@mdi/js';
import { mdiAccountCircle} from '@mdi/js';


export default {
  name: "PageHeader",
   props: {
     user: {
       type: Object
     }
   },
  data() {
    return {
      mdiAccountCircle,
      mdiAccountSupervisorCircle 
    };
  },
  /*  computed:{
     user() {
       return this.$store.getters.user
     }
   }, */
  methods: {
    /* logOut: function() {
      this.$store.dispatch("logOut");
     /*  this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null); */
    
    getProfile(id) {
      this.$router.push(`/account/${id}`);
      
    },
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
