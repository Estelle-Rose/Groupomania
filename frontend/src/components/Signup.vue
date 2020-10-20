<template>
  <v-container fluid class="signup-container ">
    <v-layout row class="signup-box">
      <v-col lg="4" md="5" sm="7">
        <v-card class="signup-card" color="text2" elevation="4" xs6>
          <v-card-title flat dense dark class="justify-center"
            >Inscription</v-card-title
          >
          <v-card-text class="font-weight-light">
            <v-form v-model="isValid" autocomplete="off">
              <v-text-field
                label="pseudo"
                v-model="pseudo"
                type="text"
                :rules="[v => !!v || 'Pseudo is required']"
                required
                class="input-group--focused"
              ></v-text-field>
              <v-text-field
                label="email"
                v-model="email"
                type="email"
                :rules="[v => !!v || 'Email is required']"
                required
                class="input-group--focused"
                autocomplete="off"
              ></v-text-field>
              <v-text-field
                label="mot de passe"
                v-model="password"
                type="password"
                :rules="[v => !!v || 'Password is required']"
                required
                class="input-group--focused"
              ></v-text-field>

              <br />
              <input />
              <br />
              <input />
              <br />
              <div class="danger-alert" v-html="errorMessage" />
              <div class="danger-alert" v-html="message"></div>
              <br />
            </v-form>
          </v-card-text>
          <v-card-actions class=" d-flex justify-center">
            <v-btn
              elevation="2"
              :disabled="!isValid"
              v-on:click.prevent="signup"
              >Envoyer</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-layout>
  </v-container>
</template>

<script>
// import axios from 'axios';
import Auth from "../services/Auth.js";
export default {
  name: "Signup",
  data() {
    return {
      pseudo: "",
      email: "",
      password: "",
      errorMessage: null,
      message: null,
      isValid: true,
      hasSignedUp: false
    };
  },
  methods: {
    async signup() {
      try {
        const response = await Auth.signup({
          pseudo: this.pseudo,
          email: this.email,
          password: this.password
        });
        this.message = response.data.message;  

        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setUser", response.data.user);
        let router = this.$router;
        setTimeout(function() {
          router.push("/posts");
        }, 1500);
      } catch (error) {
        this.errorMessage = error.response.data.error;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.signup-container {
  background-image: url("../assets/stars.svg");
  background-repeat: repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}
.signup-box {
  position: relative;
  justify-content: center;
}
.signup-card {
  border: 3px solid #676c75 !important;
  &__submit {
    margin: auto;
    padding-bottom: 20px;
  }
}

@media (max-width: 640px) {
  .signup-box {
    margin-left: 0 !important;
  }
}
</style>
