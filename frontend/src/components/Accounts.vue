<template>
  <v-container fluid class="signup-container">
    <div class="account">

    <v-layout v-if="$store.state.users" row class="account-box">
      <v-card
        v-for="user of users"
        
        :key="user.id"
        :user="user"
        class="users"
        elevation="4"
      >
        <div  class="d-flex justify-space-between">
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
            <v-tooltip v-if="($store.state.user.id === user.id || $store.state.user.admin === true)" bottom >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                class="delete-btn"
                  @click="deleteAccount(user.id)"
                 
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
    </div>
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
  margin-right: 1em;
}
strong {
  font-size: 16px;
}
span {
  font-size: 16px;
}
.signup-container {
  background-image: url("../assets/stars.svg");
  background-repeat: repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}
.account {
  width: 80%;
}
.delete-btn {
position: absolute;
right: 10px;
top: 10px;
}

.account-box {
  justify-content: center;
  flex-direction: row-reverse;
  margin-top: 3em;
  margin-bottom: 3em; 
 

}
.users {
  
  margin-right: 2em;
  margin-top: 2em;
  width: 370px;
  height: 120px;
   position: relative;
}

</style>
