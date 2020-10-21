<template>
  <v-container fluid class="">
    <v-layout v-if="$store.state.users" row class="account-box">
      <v-card
        v-for="user of users"
        
        :key="user.id"
        :user="user"
        class="users"
        elevation="4"
      >
        <div v-if="!user.admin === true" class="d-flex justify-space-between">
          <v-card-title flat dense dark>
            <v-avatar size="42px" class="mt-3">
              <img v-if="user.photo" :src="user.photo" alt="Photo de profil" />
              <v-icon v-else>{{ mdiAccountCircle }}</v-icon>
            </v-avatar>
            <div class="d-flex flex-column">
              <div>
                <strong>Pseudo : </strong><span>{{ user.pseudo }}</span>
              </div>
              <div>
                <strong>Email : </strong><span>{{ user.email }}</span>
              </div>
            </div>
          </v-card-title>
          <div>
            <v-tooltip v-if="($store.state.user.id === user.id || $store.state.user.admin === true)" bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                
                  @click="deleteAccount(user.id)"
                  class="mt-3 mr-3"
                  fab
                  primary
                  x-small
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon small class=" rounded-circle ">
                    {{ mdiTrashCanOutline }}
                  </v-icon>
                </v-btn>
              </template>
              <span>Supprimer le compte</span>
            </v-tooltip>
          </div>
        </div>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>

import { mdiAccountCircle } from "@mdi/js";
import { mdiTrashCanOutline } from "@mdi/js";
export default {
  name: "Account",

  data() {
    return {
      mdiAccountCircle,
      mdiTrashCanOutline,
      messageRetour: null,
      errorMessage: null
    };
  },

  computed: {
    users() {
      return this.$store.getters.users;
    }
  },
  beforeMount() {
    this.$store.dispatch("getUsers");
  },
  methods: {
    getBackHome() {
      this.$router.push("/");
    },
    logOut: function() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
    },

  deleteAccount(id) {  
    this.$store.dispatch('deleteAccount',id)
    console.log(id)
    if(id == this.$store.state.user.id) {
      this.logOut();
      this.getBackHome();
    }
  }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.v-avatar {
  margin-top: -30px;
  margin-right: 1em;
}
.signup-container {
  background-image: url("../assets/stars.svg");
  background-repeat: repeat;
  display: flex;
  justify-content: center;
  align-items: center;

  height: 80vh;
}
.profil-top {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 150px;

  &__one {
    display: flex;
    justify-content: center;
    padding-top: 0 !important;
    position: relative;
  }
}
.delete-account {
  position: absolute;

  right: 0;
  top: -10px;
}
.profil-title {
  padding: 0;
}
.profil-middle {
  display: flex;
  justify-content: space-between;
  height: 80px;
  padding: 0;
}
.account-box {
  justify-content: center;
  margin-top: 3em;
  margin-bottom: 3em;
}
.bio {
  display: flex;
  flex-direction: column;
  padding: 0 1em 0 1em;
  width: 85%;
}
.signup-card {
  border: 3px solid #676c75 !important;
  background-color: #ffebee !important;
}
/* .team-img {
    width: 500px;
    height: 500px;
    position: absolute;
    bottom: 110px;
    left: 0;
  } */
/*  .team-img2 {
    width: 500px;
    height: 500px;
    position: absolute;
    top:0;
    right: 0;
  } */
.rotation20 {
  -webkit-transform: rotate(20deg);
  -moz-transform: rotate(20deg);
  -ms-transform: rotate(20deg);
  -o-transform: rotate(20deg);
  transform: rotate(20deg);
}
</style>
