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
          <v-card-text>
            <posts
              v-for="(item, i) in posts"
              :key="i"
              :message="item.message"
              :pseudo="item.User.pseudo"
              :link="item.link"
              :imageUrl="item.imageUrl"
              :id="item.id"
              :userId="item.UserId"
              :postUrl="'posts/' + item.id"
              @deletePost="deletePost(item.id)"
            ></posts>
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

//import UpdatePost from '../components/UpdatePost';
import { mdiPencilOutline } from "@mdi/js";
export default {
  name: "Feed",
  components: {
    Posts
  },
  data() {
    return {
      posts: [],
      post: {},
      errorMessage: null,
      mdiPencilOutline
    };
  },
  async mounted() {
    try {
      const response = await PostService.getPosts();
      console.log(response);
      for (const post of response.data) {
        console.log(post);
        this.posts.push(post);
        this.$store.dispatch("setPosts", post);
        console.log(this.$store.state.posts);
      }
    } catch (error) {
      this.errorMessage = error.response.data.error;
    }
  },

  methods: {
    async getHotPosts() {
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
    },

    async deletePost(id) {
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
    }
        
  }
};
</script>

<style></style>
