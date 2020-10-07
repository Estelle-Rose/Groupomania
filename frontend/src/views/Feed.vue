<template>
  <v-container fluid>
    <v-row class="text-center d-flex flex-column justify-center align-center">
      <v-col cols="8">
        <v-img
          :src="require('../assets/logo_transparent.png')"
          class="my-2"
          contain
          height="50"
        />
      </v-col>
      <v-col cols="6">
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
            <v-btn to="/posts/add"
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
              @deletePost="deletePost($event)"
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
import { mdiPencilOutline } from "@mdi/js";
export default {
  name: "Feed",
  components: {
    Posts
  },
  data() {
    return {
      posts: [],
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
    async deletePost() {
      try {
        const id = this.posts[0].id;
        console.log(id);
        const response = await PostService.deletePost(id);
        console.log(response);
        const postIndex = this.posts.findIndex(p => p.id === id);
        this.posts.splice(postIndex, 1);
      } catch (error) {
        this.errorMessage = error.response.data.error;
      }
    }
  }
};
</script>

<style></style>
