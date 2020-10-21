<template>
  <v-container fluid class="signup-container">
    <v-layout v-if="$store.state.isLoggedIn" row class="account-box">
      <v-col lg="4" md="6" sm="7" class="mx-auto">
        <v-card class="account-card d-flex flex-column" elevation="4" xs6>
          <div class="profil-top ">
            <v-btn to="/posts" class="mx-2 return-btn" small>
              Retour
            </v-btn>
            <v-card-title flat dense dark class="profil-title mr-3"
              >Ton profil
            </v-card-title>
            <div class="delete-account">
              <v-tooltip v-if="!$store.state.user.admin === true" bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    @click="deleteAccount(user.id)"
                    class="mx-2"
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
          <div class="profil-middle">
            <v-card-title
              dark
              class=" profil-middle__left d-flex justify-space-between"
            >
              <span> Salut {{ user.pseudo }} ! </span>
              <v-btn @click="togglePseudo" class="" text x-small :elevation="2">
                Modifier
              </v-btn>
            </v-card-title>

            <v-card-title
              class="profil-middle__right d-flex justify-space-between"
            >
              <v-avatar size="96px">
                <img
                  v-if="user.photo"
                  :src="user.photo"
                  alt="Photo de profil"
                />
                <v-icon v-else>{{ mdiAccountCircle }}</v-icon>
              </v-avatar>
              <v-btn
                @click="togglePhoto"
                class="mx-2"
                text
                x-small
                :elevation="2"
              >
                modifier
              </v-btn>
            </v-card-title>
          </div>

          <v-card-text class=" bio">
            <div class="d-flex flex-column justify-space-between" max-width="70%">
              <strong>Ta bio: </strong>
              <div>
                <span v-if="!user.bio"> Parle nous de toi 😊</span>
                <span class="bio-field">{{ user.bio }}</span>
              </div>
            </div>
              <v-btn
                @click="toggleBio"
                class="mx-2 mt-2 "
                text
                x-small
                :elevation="2"
              >
                Modifier
              </v-btn>
          </v-card-text>
          
          <div>
            <v-card-text v-if="options" class="font-weight-light">
              <v-form
                v-model="isValid"
                @submit.prevent="onSubmit"
                enctype="multipart/form-data"
                class="validate"
              >
                <v-card-text>
                  <v-text-field
                    v-if="updatePseudo"
                    label="Nouveau pseudo"
                    v-model="newPseudo"
                    :rules="rules"
                    counter="30"
                    hint="Le pseudo doit avoir 4 caractères min et 30 max"
                    class="input-group--focused"
                  ></v-text-field>
                  <v-textarea
                    v-if="updateBio"
                    label="Bio"
                    v-model="newBio"
                    text="text"
                    solo
                    name="input-7-4"
                    class="bio"
                  ></v-textarea>
                </v-card-text>

                <div v-if="updatePhoto" class="d-flex justify-center">
                  <label for="image" class="mr-3">Photo</label>
                  <input
                    @change="uploadImage"
                    type="file"
                    accept="image/png, image/jpeg,
                    image/bmp, image/gif"
                    ref="file"
                    name="image"
                  />
                </div>
                <br />
                <div class="danger-alert" v-html="errorMessage" />
                <div class="danger-alert" v-html="messageRetour" />
                <br />
                <div class="d-flex justify-center">
                  <v-btn
                  
                    @click="onSubmit(user.id)"
                    :disabled="!isValid"
                    >Envoyer</v-btn
                  >
                </div>
              </v-form>
            </v-card-text>
          </div>
        </v-card>
      </v-col>
    </v-layout>
    <v-card v-else>
      <v-card-title class="post-title-box">
        <div class=" d-flex flex-column update-title pl-3 pb-5 ">
          <span class="title font-weight-light post-title pb-5 "
            >Votre compte a été supprimé</span
          >
          <v-btn @click="getBackHome" class="mx-2 return-btn" small>
            Retour à l'accueil
          </v-btn>
        </div>
      </v-card-title>
    </v-card>
  </v-container>
</template>

<script>
//import axios from "axios";
import { mdiAccountCircle } from "@mdi/js";
import { mdiTrashCanOutline } from "@mdi/js";
export default {
  name: "Account",
  data() {
    return {
      mdiAccountCircle,
      mdiTrashCanOutline,
      updateBio: false,
      updatePseudo: false,
      updatePhoto: false,
   
      isValid: true,
      options: false,
      newPseudo: "",
      newBio: "",
      rules: [v => v.length <= 30 || "Max 25 characters"],
      file: "",
      messageRetour: null,
      errorMessage: null
    };
  },
  /*  async beforeMount() {
    try {
      const id = this.$store.state.user.id;
      console.log(id);
      const response = await axios.get(
        `http://localhost:3000/api/users/accounts`,
        { headers: { Authorization: this.$store.state.token } }
      );
      this.users = response.data;
      console.log(this.users)     
      
    } catch (error) {
      this.errorMessage = error.response.data.error;
    }
  },  */
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  beforeMount() {
    this.$store.dispatch("getUserById");
  },
  methods: {
    getBackHome() {
      this.$router.push("/");
    },
    togglePseudo() {
      this.updatePseudo = true;
      
      this.options = true;
    },
    togglePhoto() {
      this.updatePhoto = true;
      this.showImage = false;
      
      this.options = true;
    },
    toggleBio() {
      this.updateBio = true;
    
      this.options = true;
    },
    uploadImage() {
      const file = this.$refs.file.files[0];
      this.file = file;
      console.log(this.file);
    },
    onSubmit() {
      const formData = new FormData();
      formData.append("pseudo", this.newPseudo);
      formData.append("bio", this.newBio);
      formData.append("photo", this.file);
      this.$store.dispatch("updateAccount", formData);

      this.updateBio = false;
      this.updatePhoto = false;
      this.updatePseudo = false;
     
      this.options = false;
      /* try {
        const response = await axios.put(
          `http://localhost:3000/api/users/accounts/${id}`,
          formData,
          { headers: { Authorization: this.$store.state.token } }
        );
        this.messageRetour = response.data.messageRetour;
        console.log(response);
        this.$store.dispatch("setUser", response.data.user);
        console.log(response.data.user)
        this.updateBio = false;
        this.updatePhoto = false;
        this.updatePseudo = false;
        
      } catch (error) {
        this.errorMessage = error.response.data.error;
      } */
    },
    deleteAccount(id) {
      this.$store.dispatch("deleteAccount", id);
      console.log(id);
      if (id == this.$store.state.user.id) {
        this.$store.dispatch("setUser", null);
        this.$store.dispatch("setToken", null);
        this.getBackHome();
      }
    }

    /*   async deleteAccount() {
    try {
     let id = this.user.id
      const response = await axios.delete(
        `http://localhost:3000/api/users/accounts/${id}`,
        { headers: { Authorization: this.$store.state.token } }
      );
      console.log( response.data.messageRetour);      
      this.$store.dispatch("setUser", null);
        this.$store.dispatch("setToken", null);
      
    } catch (error) {
      this.errorMessage = error.response.data.error;
    }
  }, */
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
  justify-content: space-between;
  align-items: center;

  height: 80vh;
}
.account-card {
  display: flex;
  justify-content: space-around;
}
.profil-top {
  display: flex;
  justify-content: space-between;
  padding-top: 1em;
}
.profil-middle {
  width: 80%;
  margin: auto !important;
}


.profil-title {
  padding: 0;
}

.signup-card {
  border: 3px solid #676c75 !important;
  background-color: #ffebee !important;
}
</style>
