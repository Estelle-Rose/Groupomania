<template>
  <v-app>
    <!-- header -->
    <page-header :user="user"    ></page-header>
    <v-main>
    
        <router-view></router-view>
        <!-- Display view pages here based on route -->
     
    </v-main>
    <page-footer  :user="user"></page-footer>
  </v-app>
</template>

<script>
import PageHeader from "./components/Header.vue";
import PageFooter from "./components/Footer.vue";
export default {
  name: "app",
  components: {
    PageHeader,
    PageFooter
  },

  data: () => {
    return {
      
    };
  },
   computed:{
     user() {
       return this.$store.getters.user
     }
   },
};
</script>
<style lang="scss">
.v-btn {
  color: primary !important;
  background-color: accent !important;
 
  &:hover {
   background-color:  #FFCDD2!important;
  }
  
}


</style>

