<template>
  <v-container class="signup-container">
    <v-card>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img :src="require('../assets/logo_transparent.png')" class="my-2" contain height="100" />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-1 font-weight-bold mb-3">Bienvenue sur le social network de Groupomania !</h1>

        <p class="subheading font-weight-regular">
          For help and collaboration with other Vuetify developers,
          <br />please join our online
          <a
            href="https://community.vuetifyjs.com"
            target="_blank"
          >Discord Community</a>
        </p>
      </v-col>

      <v-col class="mb-5" cols="12">
        <h2 class="headline font-weight-bold mb-3">What's next?</h2>
      </v-col>
    </v-row>

    </v-card>

    
  </v-container>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home"
};
</script>
<style lang="scss" scoped>
.signup-container {
  background-image: url('../assets/stars.svg');
  background-repeat: repeat;
     display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  }
</style>
