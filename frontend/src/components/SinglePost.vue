<template >
  <v-container fluid class="bloc-modal">
    <div class="overlay "></div>
    <div class="modal-card ">
      <v-card class="mx-auto post-card" color="text2" max-width="600">
        <v-card-title class="post-title-box">
          <v-icon medium color="white" left>
            {{ mdiMessageSettingsOutline }}
          </v-icon>
          <div class="update-title pl-3 pb-5 ">
            <span class="title font-weight-light post-title ">Modifier le post</span>
            <v-btn
              @click="getBackToFeed"
              class="mx-2 return-btn"              
              small            
            >
              Retour
            </v-btn>
          </div>
        </v-card-title>
  <v-card-text>
    <span>Ton message: </span>
    <span>{{ post.data.message }}</span>
  </v-card-text>
        <v-form
          v-model="isValid"
          @submit.prevent="onSubmit"
          enctype="multipart/form-data"
          class="validate "
        >
          <div v-if="withMessage" class="text-box">
            <v-textarea
              label="Message"
              v-model="message"              
              text="text"
              solo
              name="input-7-4"
              class="mr-5 ml-3 text-area"
            ></v-textarea>
          </div>

          <div v-if="withLink" class="link-box pb-5 pt-5">
            <v-text-field
              name="input-1-3"
              filled
              label="link"
              v-model="link"
              auto-grow
              class="mr-5 ml-3"
            ></v-text-field>
          </div>
          <v-img
            v-if="showImage"
            :src="post.data.imageUrl"
            :max-height="200"
            :max-width="100"
            class="mx-auto mb-5"
          ></v-img>
          <v-img
            v-if="showImage"
            :src="post.data.link"
            :max-height="200"
            :max-width="100"
            class="mx-auto mb-5"
          ></v-img>
          <div v-if="withImage" class="pb-5 pt-5 d-flex justify-center">
            <label for="image" class="pr-3">Image</label>
            <input
              @change="uploadImage"
              type="file"
              accept="image/png, image/jpeg,image/bmp, image/gif"
              ref="file"
              name="image"
            />
          </div>
          <v-divider></v-divider>
          <v-card-text v-if="options" class="d-flex justify-center my-3">
            <div class="bloc-option">
               <v-btn
                  @click="toggleMessage"
                  class="mx-2 mt-2 "
                  text
                  x-small
                  :elevation="2"
                >   Changer ton message
                </v-btn>
               <v-btn
                  @click="toggleLink"
                  class="mx-2 mt-2 "
                  text
                  x-small
                  :elevation="2"
                >   Poster un lien
                </v-btn>
               <v-btn
                  @click="toggleImage"
                  class="mx-2 mt-2 "
                  text
                  x-small
                  :elevation="2"
                >  Poster une image
                </v-btn>
             
            </div>
          </v-card-text>
          <div class=" d-flex justify-center pt-5 ">
            <v-btn @click="onSubmit" :disabled="!isValid">Poster</v-btn>
          </div>

          <br />
          <div class="danger-alert" v-html="errorMessage" />
          <div class="danger-alert" v-html="messageRetour" />
        </v-form>
      </v-card>
    </div>
  </v-container>
</template>
<script>
//import PostService from "../services/PostService";
import axios from "axios";
import { mdiCloseThick } from "@mdi/js";
import { mdiMessageSettingsOutline } from "@mdi/js";
import PostService from "../services/PostService";
export default {
  name: "SinglePost",

  data() {
    return {
      post: "",
      options: true,
      mdiCloseThick,
      mdiMessageSettingsOutline,
      isValid: true,
      withLink: false,
      withImage: false,
      withMessage: false,
      showImage: true,
      shoMessage:true,
     
      message: null,
      link: null,
      file: "",
      messageRetour: null,
      errorMessage: null,
      linkInput: false,
      textInput: false
    };
  },
  async mounted() {
    try {
      const id = this.$route.params.id;
      this.post = await PostService.getPostById(id);
      console.log(this.post);
    } catch (error) {
      console.log(error);
    }
  },

  methods: {
    toggleMessage() {
      this.withMessage = true;
      this.showMessage = false;
      
    },
    toggleLink() {
      this.withLink = true;
      this.showImage = false;
      this.options = false;
    },
    toggleImage() {
      this.withImage = true;
      this.showImage = false;
      this.options = false;
    },
    uploadImage() {
      const file = this.$refs.file.files[0];
      this.file = file;
    },
    async onSubmit() {
      const formData = new FormData();
      if (this.message !== null) {
        formData.append("message", this.message);
      } else {
        formData.append("message", this.post.data.message);
      }
      if (this.link !== null) {
        formData.append("link", this.link);
      }
      formData.append("imageUrl", this.file);
      
      try {
        const response = await axios.put(
          `http://localhost:3000/api/posts/${this.$route.params.id}`,
          formData,
          { headers: { Authorization: this.$store.state.token } }
        );
        this.messageRetour = response.data.messageRetour;
        console.log(response);
        let router = this.$router;
        setTimeout(function() {
          router.push("/posts");
        }, 2000);
      } catch (error) {
        this.errorMessage = error.response.data.error;
      }
    },
    getBackToFeed() {
      this.$router.push("/posts");
    },
    newLink() {
      this.linkInput = true;
    },
    newText() {
      this.textInput = true;
    }
  }
};
</script>
<style lang="scss" scoped>
.post-title {
  position: relative;
}
.return-btn {
  position: absolute;
  right: 0;
}

.link-box {
  display: flex;
  align-content: center;
}
.message {
  font-size: 20px;
  border: 2px grey solid;
  padding: 15px;
  width: 85%;
  margin-left: 20px;
}
</style>
