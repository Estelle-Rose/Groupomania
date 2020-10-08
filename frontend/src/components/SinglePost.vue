<template >
  <v-container fluid class="bloc-modal">
    <div class="overlay "></div>
    <div class="modal-card ">
      <v-card class="mx-auto post-card" color="red lighten-4" max-width="600">
        <v-card-title class="post-title-box">
          <v-icon medium color="white" left>
            {{ mdiMessageSettingsOutline }}
          </v-icon>

          <div class="update-title">
            <span class="title font-weight-light post-title"
              >Modifiez votre post</span
            >
            <v-icon
              @click="getBackToFeed"
              class=" rounded-circle cancel-update"
              >{{ mdiCloseThick }}</v-icon
            >
          </div>
        </v-card-title>
        <v-form
          v-model="isValid"
          @submit.prevent="onSubmit"
          enctype="multipart/form-data"
          class="validate "
        >
          <div class="text-box">
            <v-textarea
              name="input-1-2"
              filled
              label="Message"
              v-model="post.data.message"
              :rules="[rules.required]"
              auto-grow
              clearable: true
              class="mr-5 ml-3"
            ></v-textarea>
            <v-icon @click="clearField" class=" rounded-circle cancel-update">{{
              mdiCloseThick
            }}</v-icon>
          </div>

          <div class="link-box">
            <v-text-field
              name="input-1-3"
              filled
              label="link"
              v-model="post.data.link"
              auto-grow
              class="mr-5 ml-3"
            ></v-text-field>
            <v-icon @click="clearField" class=" rounded-circle cancel-update">{{
              mdiCloseThick
            }}</v-icon>
          </div>
          <div>
            <label for="image">Image</label>
            <input
              @change="uploadImage"
              type="file"
              accept="image/png, image/jpeg,
        image/bmp, image/gif"
              ref="file"
              name="image"
            />
          </div>
          <v-btn @click="onSubmit" :disabled="!isValid">Poster</v-btn>
          <br />
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
      mdiCloseThick,
      mdiMessageSettingsOutline,
      isValid: true,
      rules: {
        required: value => !!value || "Required."
      },

      newMessage: "",
      newLink: null,
      //userId: this.$store.state.user.id,
      file: "",
      messageRetour: null,
      errorMessage: null
    };
  },
  async mounted() {
    try {
      const id = this.$route.params.id;
      console.log(id);
      this.post = await PostService.getPostById(id);
      console.log(this.post);
    } catch (error) {
      console.log(error);
    }
  },

  methods: {
    uploadImage() {
      const file = this.$refs.file.files[0];
      this.file = file;
    },
    async onSubmit() {
      const formData = new FormData();
      formData.append("message", this.message);
      if (this.link !== null) {
        formData.append("link", this.link);
      }
      formData.append("imageUrl", this.file);
      //formData.append("userId", this.userId);

      try {
        const response = await axios.post(
          "http://localhost:3000/api/posts/add",
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
    clearLink() {
      this.post.data.link = null;
    },
    clearMessage() {
      this.post.data.message = null;
    }
  }
};
</script>
<style lang="scss" scoped>
.text-box {
  display: flex;
  align-content: center;
}
.link-box {
  display: flex;
  align-content: center;
}
</style>
