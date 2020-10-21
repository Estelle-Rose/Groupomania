<template>
  <v-container fluid class="post-box">
    <v-card class="mx-auto post-card" max-width="600">
      <v-card-title class="post-title-box">
        <v-icon large color="white" left>
          {{ mdiMessageSettingsOutline }}
        </v-icon>
        <div>
          <span class="title font-weight-light post-title"
            >Que partages-tu aujourd'hui ?</span
          >
        </div>
      </v-card-title>
      <v-form
        v-model="isValid"
        @submit.prevent="onSubmit"
        enctype="multipart/form-data"
        class="validate"
      >
        <div class="bloc-statut py-5 px-5 mr-5">
          <v-textarea
            name="input-1-3"
            filled
            label="Message"
            v-model="message"
            :rules="[rules.required]"
            auto-grow
          ></v-textarea>
        </div>
        <v-card-text v-if="options" class="d-flex flex-column justify-center my-3">
           
           <div class=" d-flex justify-center">
             <v-icon large  center>
              {{ mdiHospitalBox }}
            </v-icon>
             </div>
          <div >
            <div class=" d-flex justify-space-around">
              <v-btn @click="toggleLink" small>
                Lien
              </v-btn>

              <v-btn @click="toggleImage"  small >
                Image
              </v-btn>
            </div>
          </div>
        </v-card-text>
        <div class="d-flex justify-center">
          <div v-if="withImage" class="pb-5 pt-5 ">
            <div class="d-flex  justify-center ">
              <label for="image" class="pr-2">Image</label>
              <input
                @change="uploadImage"
                type="file"
                accept="image/png, image/jpeg,
                image/bmp, image/gif"
                ref="file"
                name="image"
              />
            </div>
          </div>
          <div v-if="withLink" class="pb-5 pt-5 d-flex  justify-center">
            <v-text-field
              name="input-1-7"
              filled
              label="link"
              v-model="link"
              auto-grow
            >
            </v-text-field>
          </div>
        </div>
        <div class="pb-5 pt-5 d-flex justify-center">
          <v-btn @click="onSubmit" :disabled="!isValid">Poster</v-btn>
        </div>
      </v-form>
      <br />
      <br />
      <div class="danger-alert" v-html="errorMessage" />
      <div class="danger-alert" v-html="messageRetour" />
    </v-card>
  </v-container>
</template>
<script>
import { mdiMessageSettingsOutline } from "@mdi/js";
import { mdiHospitalBox } from '@mdi/js';
//import PostService from "../services/PostService";
//import axios from "axios";

export default {
  name: "NewPost",

  data() {
    return {
      mdiMessageSettingsOutline,
      mdiHospitalBox,
      isValid: true,
      options: true,
      showLink: true,
      showImage: false,
      withLink: false,
      withImage: false,
      withText: false,
      rules: {
        required: value => !!value || "Required."
      },
      message: "",
      link: null,
      file: ""
    };
  },
  computed: {
    messageRetour() {
      return this.$store.getters.message;
    },
    errorMessage() {
      return this.$store.getters.error;
    }
  },
  methods: {
    toggleLink() {
      (this.withLink = true), (this.options = false);
    },
    toggleImage() {
      (this.withImage = true), (this.options = false);
    },
    uploadImage() {
      const file = this.$refs.file.files[0];
      this.file = file;
      console.log(this.file);
    },
    onSubmit() {
      const formData = new FormData();
      console.log(typeof this.message);
      formData.append("message", this.message);
      if (this.link !== null) {
        formData.append("link", this.link);
      }
      if (this.imageUrl !== null) {
        formData.append("imageUrl", this.file);
      }
      this.$store.dispatch("createPost", formData);
      this.$router.push("/posts");      
    }
  }
};
</script>
<style lang="scss" scoped>
.title-input {
  width: 500px !important;
}
//statut
.bloc-statut {
  display: flex;
  align-items: center;
}
// lien ou image

.post-title-box {
  background-color: gray;
  .post-title {
    color: white;
    font-weight: 600 !important;
  }
}
.post-card {
  margin-top: 8rem;
}
.post-box {
  height: 100%;
  padding-bottom: 10rem;
}
</style>
