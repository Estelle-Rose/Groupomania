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
              :isLiked="isLiked"
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
//import axios from 'axios';
//import UpdatePost from '../components/UpdatePost';
import { mdiPencilOutline } from "@mdi/js";
export default {
  name: "Feed",
  components: {
    Posts
  },
  computed: {
    posts() {
      return this.$store.getters.posts
    },
    isLiked() {
      return this.$store.getters.isLiked
    }
  } ,
  data() {
    return {          
      errorMessage: null,
      mdiPencilOutline,    
    };
  },
  beforeMount()  {
     this.$store.dispatch('getPosts')
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
   deletePost(id) {
     this.$store.dispatch('deletePost',id),
     this.reloadFeed();
   },
 
  likePost(id) {
    const data = 1;
    console.log(id);
    this.$store.dispatch('likePost',  {
      id: id,
      data: data
      })
      
  },
   
  }
};
</script>

<style lang="scss" scoped>
.feed-container {
  margin-bottom: 50px;
  margin-left: 0!important;
 
}
</style>
