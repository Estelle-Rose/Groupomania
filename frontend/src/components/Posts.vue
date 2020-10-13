<template >
  <div>
    <v-card class="posts-card mx-auto mt-4 mb-4 pb-5" round elevation="2">
      <div>
        <div class="d-flex justify-space-between pr-2 blue-grey lighten-2">
          <v-card-title class="h6"
            >Post publié par {{ pseudo }} {{ id }}  ||| le {{ createdAt.split("T") [0]}}
          </v-card-title>
          <div class="post-options">
            <v-btn
              v-if="userId === this.$store.state.user.id"
              @click="getOnePost"
              class="mx-2"
              fab
              dark
              x-small
              color="white"
            >
              <v-icon class=" rounded-circle">{{ mdiUpdate }}</v-icon>
            </v-btn>
            <v-btn
              v-if="
                userId === this.$store.state.user.id ||
                  this.$store.state.user.admin === true
              "
              class="mx-2"
              fab
              dark
              x-small
              color="white"
            >
              <v-icon @click="deletePost({ id })" small class=" rounded-circle">
                {{ mdiTrashCanOutline }}
              </v-icon>
            </v-btn>
          </div>
        </div>
        <div class="pl-3 pr-2-3">
          <v-card-text class="text-left">
            <p class="body-1">
              {{ message }}
            </p>
          </v-card-text>
        </div>
        <div class="pb-5">
          <v-img
            v-if="link"
            :src="link"
            :max-height="600"
            :max-width="400"
            class="mx-auto pb-5"
          >
          </v-img>
          <v-img
            v-if="imageUrl"
            :src="imageUrl"
            :max-height="600"
            :max-width="400"
            class="mx-auto pb-5"
          >
          </v-img>
        </div>

        <v-divider></v-divider>
        <v-card-actions class="pt-5  pr-4 d-flex justify-md-space-between">
          <div class="">
            <v-btn @click="show = !show" color="red lighten-2 " text>
              Commentaires
            </v-btn>
            <v-btn icon @click="show = !show">
              <v-icon>{{
                show ? "mdi-chevron-up" : "mdi-chevron-down"
              }}</v-icon>
            </v-btn>
          </div>

           <div>
            <v-btn @click="likePost">
              <v-icon class=" material-icons ">
                {{ mdiEmoticonOutline }}
              </v-icon>
              {{ Likes.filter((obj) => obj.type === true).length }}
            </v-btn>
            <v-btn @click="dislikePost" class="ml-3">
              <v-icon>{{ mdiEmoticonSadOutline }}</v-icon>
              {{ Likes.filter((obj) => obj.type === false).length }}
            </v-btn>
          </div>
        </v-card-actions>
        <v-expand-transition>
          <div v-show="show">
            <v-divider></v-divider>

            <v-card-text> {{ comments }} </v-card-text>
          </div>
        </v-expand-transition>
      </div>
    </v-card>
  </div>
</template>

<script>
//import DeleteButton from "../components/DeleteButton";

import { mdiEmoticonOutline } from "@mdi/js";
import { mdiEmoticonSadOutline } from "@mdi/js";
import { mdiTrashCanOutline } from "@mdi/js";
import { mdiUpdate } from "@mdi/js";
//import Likes from "../components/Likes.vue";
//import PostService from "../services/PostService";
export default {
  name: "Posts",
 
  props: {
    link: {
      type: String
    },
    message: {
      type: String
    },
    userId: {
      type: Number
    },
    pseudo: {
      type: String
    },
    imageUrl: {
      type: String
    },
    id: {
      type: Number
    },
    postUrl: {
      type: String
    },
    Likes: {
      type: Array
    },
    createdAt: {
      type: Date
    },
    comments: {
      type: Array
    }
  },
  data: function() {
    return {
      show: false,
      mdiEmoticonOutline,
      mdiEmoticonSadOutline,
      mdiTrashCanOutline,
      mdiUpdate,
      width: 500,
      
      user: false,
      showFeed: true,
      update: false,
      isValid: true,
      rules: {
        required: value => !!value || "Required."
      },
      formData: {
        message: "",
        link: null,
        //userId: this.$store.state.user.id,
        file: ""
      },
      messageRetour: null,
      errorMessage: null
    };
  },

  methods: {
    
    deletePost() {
      this.$emit("deletePost", this.id);
    },
    getOnePost() {
      this.$router.push(this.postUrl);
    }
  }
};
</script>
<style lang="scss" scoped>
/* .posts-card {
  width: 40em;
} */
.body-1 {
  font-size: 20px;

  border: 2px grey solid;
  padding: 15px;
}
.posts-row {
  justify-content: center;
}
.materials-icons {
  color: brown;
}
.post-options {
  margin-top: 1rem;
  display: flex;
}
.update-title {
  display: flex;
  justify-content: space-between;
}
</style>
