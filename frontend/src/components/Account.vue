<template>
  <v-container fluid class="signup-container ">
   
    <v-layout row class="account-box">
      <v-col lg="4" md="6" sm="7" class="mx-auto">
        <v-card class="account-card" elevation="4" xs6>
          <div class="profil-top">
            <div class="profil-top__one ">
              <v-card-title flat dense dark class="profil-title"
                >Ton profil
              </v-card-title>
              <div class="delete-account">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                    @click="deleteAccount()"
                      class="mx-2"
                      fab
                      primary
                      x-small                     
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon
                        
                        small
                        class=" rounded-circle "
                      >
                        {{ mdiTrashCanOutline }}
                      </v-icon>
                    </v-btn>
                  </template>
                  <span>Supprimer le compte</span>
                </v-tooltip>
              </div>
            </div>
            <div class="profil-middle">
              <v-card-title flat dense dark class="profil-middle__left"
                >Salut {{ this.$store.state.user.pseudo }} !
              </v-card-title>

              <v-card-title flat dense dark class="profil-middle__right">
                <v-avatar size="96px">
                  <img
                    v-if="this.$store.state.user.photo"
                    :src="this.$store.state.user.photo"
                    alt="Photo de profil"
                  />
                  <v-icon v-else>{{ mdiAccountCircle }}</v-icon>
                </v-avatar></v-card-title
              >
            </div>
          </div>

          <v-card-text class=" bio"
            ><strong>Ta bio: </strong>
            <span v-if="!this.$store.state.user.bio"> Parle nous de toi 😊</span>
            <span>{{ this.$store.state.user.bio }}</span></v-card-text
          >
          <v-card-text v-if="options" class="d-flex justify-center my-3">
            <div
              class="bloc-option-profil d-flex flex-column justify-center align-center"
            >
              <strong class="text-align pb-2">Que veux-tu modifier ?</strong>

              <div class="d-flex flex-column flex-md-row">
                <v-btn
                  @click="togglePseudo"
                  class="mx-2 mt-2"
                  text
                  x-small
                  :elevation="2"
                >
                  Changer ton pseudo
                </v-btn>
                <v-btn
                  @click="toggleBio"
                  class="mx-2 mt-2 "
                  text
                  x-small
                  :elevation="2"
                >
                  Changer ta bio
                </v-btn>
                <v-btn
                  @click="togglePhoto"
                  class="mx-2 mt-2"
                  text
                  x-small
                  :elevation="2"
                >
                  Changer ta photo
                </v-btn>
              </div>
            </div>
          </v-card-text>
          <v-card-text class="font-weight-light">
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
                <v-btn @click="onSubmit()" :disabled="!isValid">Envoyer</v-btn>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
import { mdiAccountCircle } from "@mdi/js";
import { mdiTrashCanOutline } from "@mdi/js";
export default {
  name: "Account",
  data() {
    return {
      user: "",
      mdiAccountCircle,
      mdiTrashCanOutline,
      updateBio: false,
      updatePseudo: false,
      updatePhoto: false,
      isValid: true,
      options: true,
      newPseudo: "",
      newBio: "",
      rules: [v => v.length <= 30 || "Max 25 characters"],
      file: "",
      messageRetour: null,
      errorMessage: null
    };
  },
  /* async beforeMount() {
    try {
      const id = this.$store.state.user.id;
      console.log(id);
      this.user = await axios.get(
        `http://localhost:3000/api/users/accounts/${id}`,
        { headers: { Authorization: this.$store.state.token } }
      );
      console.log(this.user.data.pseudo);
      
    } catch (error) {
      this.errorMessage = error.response.data.error;
    }
  }, */
  methods: {
    togglePseudo() {
      this.updatePseudo = true;
    },
    togglePhoto() {
      this.updatePhoto = true;
      this.showImage = false;
    },
    toggleBio() {
      this.updateBio = true;
    },
    uploadImage() {
      const file = this.$refs.file.files[0];
      this.file = file;
      console.log(this.file);
    },
    async onSubmit() {
      const id = this.$store.state.user.id;
      const formData = new FormData();
      console.log(this.newBio, this.newPseudo);
      if (this.newPseudo !== null) {
        formData.append("pseudo", this.newPseudo);
      }
      formData.append("bio", this.newBio);
      if(this.file !== null) {
        formData.append("photo", this.file);

      }

      //formData.append("userId", this.userId);
      try {
        const response = await axios.put(
          `http://localhost:3000/api/users/accounts/${id}`,
          formData,
          { headers: { Authorization: this.$store.state.token } }
        );
        this.messageRetour = response.data.messageRetour;
        console.log(response);
        this.$store.dispatch("setUser", response.data.user);
        let router = this.$router;
        setTimeout(function() {
          router.push("/posts");
        }, 2000);
      } catch (error) {
        this.errorMessage = error.response.data.error;
      }
    },
     async deleteAccount() {
    try {
      const id = this.$store.state.user.id;
      console.log(id);
      const response = await axios.delete(
        `http://localhost:3000/api/users/accounts/${id}`,
        { headers: { Authorization: this.$store.state.token } }
      );
      this.messageRetour = response.data.messageRetour;
      
       setTimeout(function() {
          this.$router.push('/');
        }, 2000);
        this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
    } catch (error) {
      this.errorMessage = error.response.data.error;
    }
  },
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
