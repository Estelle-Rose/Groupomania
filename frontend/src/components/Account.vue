<template>
  <v-container fluid class="signup-container">
    <v-img
      :src="require('../assets/teamjump.jpg')"
      class="my-3 team-img hidden-sm-and-down"
    />
    <v-layout row class="account-box">
      <v-col lg="6" md="8" p="10" class="mx-auto">
        <v-card class="account-card" elevation="4" xs8>
          <div class="profil-top">
            <div class="profil-top__one ">
              <v-card-title flat dense dark>Ton profil </v-card-title>
            </div>
            <div class="profil-middle">
              <v-card-title flat dense dark class="profil-middle__left"
                >Salut {{user.data.pseudo}}
              </v-card-title>

              <v-card-title flat dense dark class="profil-middle__right">
                <v-avatar size="96px">
                 <img v-if="user.data.photo"
                      :src="user.data.photo"
                      alt="Photo de profil"
                    > 
                  <v-icon v-else>{{ mdiAccountCircle }}</v-icon>
                </v-avatar></v-card-title
              >
            </div>
          </div>

          <span class="ml-3 bio" >{{user.data.bio}}</span>
          <v-card-text v-if="options" class="d-flex justify-center my-3">
            <div class="bloc-option-profil">
              <v-btn @click="togglePhoto" class="mx-2 " dark small color="grey">
                Changer ta photo
              </v-btn>

              <v-btn @click="togglePseudo" class="mx-2" dark small color="grey">
                Changer ton pseudo
              </v-btn>
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
             

              <div v-if="updatePhoto">
                <label  for="image">Photo</label>
                <input
                  @change="uploadImage"
                  type="file"
                  accept="image/png, image/jpeg,
                  image/bmp, image/gif"
                  ref="file"
                  name="image"
                />
              </div>
              <v-btn @click="onSubmit()" :disabled="!isValid">Envoyer</v-btn>
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
export default {
  name: "Account",
  data() {
    return {
      user: '',
      mdiAccountCircle,
      updateBio: false,
      updatePseudo: false,
      updatePhoto: false,
      isValid: true,
      options: true,
      newPseudo: '',
      newBio: "",
      rules: [v => v.length <= 30 || "Max 25 characters"],
      file: "",
      messageRetour: null,
      errorMessage: null
    };
  },
     async created() {
    try {
      const id = this.$store.state.user.id;
      console.log(id)
      this.user = await axios.get(
         `http://localhost:3000/api/users/accounts/${id}`,          
          { headers: { Authorization: this.$store.state.token } }        
      );
      console.log(this.user);
      
    } catch (error) {
      this.errorMessage = error.response.data.error;
    }
  },
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
      if(this.newPseudo !==null) {
        formData.append("pseudo", this.newPseudo);        
      }

      formData.append("bio", this.newBio);

      formData.append("photo", this.file);

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
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.v-avatar {
  margin-top: -20px;
}
.profil-top {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 150px;
  &__one {
    display: flex;
    justify-content: center;
  }
}
.profil-middle {
  display: flex;
  justify-content: space-between;
  height: 80px;
}
.account-box {
  position: relative;
  justify-content: center;
  margin-top: 100px;
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
