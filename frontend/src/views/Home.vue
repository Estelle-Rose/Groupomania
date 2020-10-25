<template>
  <v-container class="signup-container">
    <v-card>
      <v-row class="text-center">
        <v-col cols="12">
          <v-img
            :src="require('../assets/logo_transparent.png')"
            class="my-2 "
            contain
            height="100"
            alt="logo"
          />
        </v-col>

        <v-col class="mb-4 px-5">
          <h1 class="display-1 font-weight-bold mb-3">
            Bienvenue sur le social network de Groupomania !
          </h1>

          <p class="subheading font-weight-regular">
            Vous pouvez publier des messages seuls ou accompagné au choix d'un gif ou d'une image.
            <br>
            Vous pouvez ajouter une photo de profil et renseigner votre bio pour vous décrire en cliquant sur l'avatar coloré d'accès au compte une fois connecté.
            <br>
            Merci de rester bienveillant et tolérant avec les autres
            utilisateurs. Tout manquement au respect du règlement pourra entraîner
            la suppression, d'un commentaire, d'un post, et même d'un compte
            utilisateur.
            <br>
            L'Admin veille pour maintenir la bonne humeur ! Have fun ! 😊
            <br>
        
          </p>
        </v-col>

       
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "Home",
};
</script>
<style lang="scss" scoped>
.signup-container {
  background-image: url("../assets/stars.svg");
  background-repeat: repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}
</style>
