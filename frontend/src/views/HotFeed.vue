<template>
  <v-container fluid  class="feed-container">
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
            class="d-flex justify-space-between"
            flat
            dense
            dark
          >
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                to="/posts"
                  small class="recents"
                v-bind="attrs"
                v-on="on"
              >
              Les + récents
              </v-btn>
            </template>
            <span>Les plus récents</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
              to="/hot"
                small class="hot-posts" 
                v-bind="attrs"
                v-on="on"
              >
              Les + likés
              </v-btn>
            </template>
            <span>Les plus likés</span>
          </v-tooltip>          
            
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
               small  to="/add"
                v-bind="attrs"
                v-on="on"
              >
             <v-icon>{{ mdiPencilOutline }}</v-icon>
              </v-btn>
            </template>
            <span>Publier</span>
          </v-tooltip>          
            
      
          </v-card-title>
          <v-card-text>
            <posts
              v-for="post of posts"
              :key="post.id"
              :post="post"
              :id="post.id"
              :liked="liked"
              :postUrl="'posts/' + post.id"
              @deletePost="deletePost(post.id)"
             @likePost="likePost(post.id)"
              @reloadFeed="reloadFeed()"
            >
            </posts>
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
import Posts from "../components/Posts.vue";
import axios from 'axios';
//import UpdatePost from '../components/UpdatePost';
import { mdiPencilOutline } from "@mdi/js";
export default {
  name: "HotFeed",
  components: {
    Posts
  },

  data() {
    return {
      posts: [],
      liked: false,
      errorMessage: null,
      mdiPencilOutline,
      componentKey: 0
    };
  },
  async beforeMount() {
    try {
      const response = await PostService.getHotPosts();
      console.log(response);
      this.posts = response.data;
      
      console.log(this.posts)
    } catch (error) {
      this.errorMessage = error.response.data.error;
    }
  },
  methods: {
    
    async reloadFeed() {
      try {
        const response = await PostService.getPosts();
        console.log(response);
        this.posts = response.data;
      } catch (error) {
        this.errorMessage = error.response.data.error;
      }
    },
   
  
    async deletePost(id) {
      try {
        const response = await PostService.deletePost(id);
        console.log(response);
        const postIndex = this.posts.findIndex(post => post.id === id);
        console.log(postIndex);
        this.posts.splice(postIndex, 1);
      } catch (error) {
        this.errorMessage = error.response.data.error;
      }
    },
    async likePost(id) {
      const data = 1;
      console.log(id);
      try {
        const response = await axios.post(
          `http://localhost:3000/api/posts/${id}/like`,
          data,
          { headers: { Authorization: this.$store.state.token } }
        );
        this.messageRetour = response.data.messageRetour;
        console.log(typeof response.data.isalreadyliked);
        if (response.data.isalreadyliked === "no") {
          this.isliked = true;
          console.log(this.isliked);
        } else {
          this.isliked = false;
        }
      } catch (error) {
        this.errorMessage = error.response.data.error;
      }
    },
  }
};
</script>

<style lang="scss" scoped>
.feed-container {
  margin-bottom: 50px;
  margin-left: 0!important;
 
  /* background-image:  linear-gradient(rgba(255,255,255,.5), rgba(255,255,255,.5)),url('../assets/test_fond.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
   */
  
 
}
</style>
