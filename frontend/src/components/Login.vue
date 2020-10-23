<template>
  <v-container fluid class="signup-container ">
    <v-layout row class="signup-box">
      <v-col lg="4" md="5" sm="7">
        <v-card class="signup-card" elevation="4" xs6>
          <v-card-title flat dense dark>Connexion</v-card-title>
          <v-card-text class="font-weight-light">
            <v-form v-model="isValid">
              <v-text-field
                label="email"
                v-model="email"
                type="email"
                :rules="[v => !!v || 'Email is required']"
                required
                class="input-group--focused"
              >
              </v-text-field>
              <v-text-field
                label="mot de passe"
                v-model="password"
                type="password"
                :rules="[v => !!v || 'Password is required']"
                required
                class="input-group--focused"
              >
              </v-text-field>

             
            </v-form>
          </v-card-text>
            
              <div class="danger-alert" v-html="errorMessage" />
              <div class="danger-alert" v-html="message" />
          <v-card-actions>
            <v-btn
              class="dark signup-card__submit"
              elevation="2"
              :disabled="!isValid"
              v-on:click.prevent="login"
              >Envoyer
            </v-btn>
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
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      errorMessage: null,
      isValid: true,
      message: null
    };
  },
  methods: {
    async login() {
      try {
        const response = await Auth.login({
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
<style lang="scss">

</style>
