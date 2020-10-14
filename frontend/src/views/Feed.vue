<template>
  <v-container fluid>
    <v-row class="text-center d-flex flex-column justify-center align-center">
      <v-img
        :src="require('../assets/logo_transparent.png')"
        class="my-2"
        contain
        height="50"
      />
      <v-col sm="12" md="6">
        <v-card class="posts-card mx-auto" elevation="2">
          <v-card-title
            class="d-flex justify-space-between red lighten-4"
            flat
            dense
            dark
          >
            <div>
              <v-btn to="/posts" class="recents">Les + récents</v-btn>
              <v-btn class="ml-4 hot-posts" @click="getHotPosts()"
                >Les + likés</v-btn
              >
            </div>
            <v-btn to="/add"
              ><v-icon>{{ mdiPencilOutline }}</v-icon></v-btn
            >
          </v-card-title>
          <v-card-text v-for="(post, i) in posts" :key="i">
           <div>
    <v-card class="posts-card mx-auto mt-4 mb-4 pb-5" round elevation="2">
      <div>
        <div class="d-flex justify-space-between pr-2 blue-grey lighten-2">
          <v-card-title class="h6"
            >Le {{ post.createdAt.split("T") [0]}} {{ post.User.pseudo }} a publié le post numero {{ post.id }} 
          </v-card-title>
          <div class="post-options">
            <v-btn
              v-if="post.userId === $store.state.user.id"
              to="/posts/ + ${post.id}"
              class="mx-2"
              fab
              dark
              x-small
              color="white">
              <v-icon class=" rounded-circle">{{ mdiUpdate }}</v-icon>
            </v-btn>
            <v-btn
              v-if="
                post.userId === $store.state.user.id ||
                  $store.state.user.admin === true
              "
              class="mx-2"
              fab
              dark
              x-small
              color="white"
            >
              <v-icon @click="deletePost" small class=" rounded-circle">
                {{ mdiTrashCanOutline }}
              </v-icon>
            </v-btn>
          </div>
        </div>
        <div class="pl-3 pr-2-3">
          <v-card-text class="text-left">
            <p class="body-1">
              {{ post.message }}
            </p>
          </v-card-text>
        </div>
        <div class="pb-5">
          <v-img
            v-if="post.link"
            :src="post.link"
            :max-height="600"
            :max-width="400"
            class="mx-auto pb-5"
          >
          </v-img>
          <v-img
            v-if="post.imageUrl"
            :src="post.imageUrl"
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

            <!-- likes -->
           <div>
            <v-btn >
              <v-icon class=" material-icons ">
                {{ mdiEmoticonOutline }}
              </v-icon>
              {{ post.Likes.filter((obj) => obj.type === true).length }}
            </v-btn>
            <v-btn  class="ml-3">
              <v-icon>{{ mdiEmoticonSadOutline }}</v-icon>
              {{ post.Likes.filter((obj) => obj.type === false).length }}
            </v-btn>
          </div>
          <!-- likes -->
        </v-card-actions>
        <v-expand-transition>
          <div v-show="show">
            <v-divider></v-divider>

            <v-card-text> {{ post.comments }} </v-card-text>
          </div>
        </v-expand-transition>
      </div>
    </v-card>
  </div>
          </v-card-text>
        </v-card>
      </v-col>
      <div class="danger-alert" v-html="errorMessage" />
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import PostService from "../services/PostService";
//import Posts from "../components/Posts.vue";


//import UpdatePost from '../components/UpdatePost';
import { mdiEmoticonOutline } from "@mdi/js";
import { mdiEmoticonSadOutline } from "@mdi/js";
import { mdiTrashCanOutline } from "@mdi/js";
import { mdiUpdate } from "@mdi/js";
import { mdiPencilOutline } from "@mdi/js";
export default {
  name: "Feed",
  /* components: {
    Posts
  }, */
  data() {
    return {
      posts: [],  
      Likes: [],       
      errorMessage: null,
      mdiPencilOutline,
      show: false,
      mdiEmoticonOutline,
      mdiEmoticonSadOutline,
      mdiTrashCanOutline,
      mdiUpdate,
      width: 500,
    };
  },
  async mounted() {
    try {
      const response = await PostService.getPosts();
      console.log(response);
      for (const post of response.data) {    
        this.posts.push(post);          
    
    
      };
    } catch (error) {
      this.errorMessage = error.response.data.error;
    }
  },

  methods: {
    /* async getHotPosts() {
      try {
        console.log(this.posts);
        const response = await PostService.getPosts();
        console.log(response);
        for (const post of response.data) {
          console.log(post);
          this.posts.push(post);
        }
      } catch (error) {
        this.errorMessage = error.response.data.error;
      }
    }, */

    /* async deletePost(id) {
      try {
        const userId = this.$store.state.user.id;
        console.log(userId);
        console.log(id);
        const response = await PostService.deletePost(id);
        console.log(response);
        const postIndex = this.posts.findIndex(post => post.id === id);
        console.log(postIndex);
        this.posts.splice(postIndex, 1);
      } catch (error) {
        this.errorMessage = error.response.data.error;
      }
    } */
  }
};
</script>

<style>
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
}</style>
