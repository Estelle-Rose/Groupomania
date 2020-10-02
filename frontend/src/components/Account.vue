<template>
  <v-container fluid class="signup-container">
    <v-img :src="require('../assets/teamjump.jpg')" class="my-3 team-img hidden-sm-and-down" />
    <v-layout row class="account-box">
      <v-col lg="10" md="9" ml-5>
        <v-card class="account-card" elevation="4" xs6>
          <v-card-title flat dense dark>Inscription</v-card-title>
          <v-card-text class="font-weight-light">
            <v-form v-model="isValid" autocomplete="off">
              <v-text-field
                label="pseudo"
                v-model="pseudo"
                type="text"
                :rules="[(v) => !!v || 'Pseudo is required']"
                required
                class="input-group--focused"
              ></v-text-field>
              <form action="/profile" method="post" enctype="multipart/form-data">
                <input type="file" name="avatar" />
              </form>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-layout>
  </v-container>
</template>

<script>
// import axios from 'axios';

export default {
  name: "Account",
  data() {
    return {};
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.signup-box {
  position: relative;
  justify-content: center;

  margin-left: 200px;
}
.signup-card {
  border: 3px solid #676c75 !important;
  background-color: #ffebee !important;
}
.team-img {
  clip-path: polygon(
    0 30%,
    60% 30%,
    60% 0%,
    100% 50%,
    60% 100%,
    60% 71%,
    0 72%
  );
  width: 600px;
  height: 500px;
  position: absolute;
  top: 70px;
  left: 0;
}
</style>
