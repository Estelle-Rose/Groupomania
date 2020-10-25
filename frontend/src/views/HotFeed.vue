<template>
  <v-container fluid class="feed-container">
    <v-row class="text-center d-flex flex-column justify-center align-center">
      <v-img
        :src="require('../assets/logo_transparent.png')"
        class="my-2"
        contain
        height="50"
      />
      <h1 class="font-weight-regular">Le fil d'actu !</h1>
      <v-col sm="12" md="6">
        <v-card class="posts-card mx-auto" elevation="2">
          <v-card-title class="d-flex justify-space-between" flat dense dark>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  to="/posts"
                  small
                  class="recents"
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
                  small
                  class="hot-posts"
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
                  small
                  to="/add"
                  v-bind="attrs"
                  v-on="on"
                  aria-label="publier"
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
import Posts from "@/components/Posts.vue";
import { mdiPencilOutline } from "@mdi/js";
export default {
  name: "HotFeed",
  components: {
    Posts,
  },

  data() {
    return {
      errorMessage: null,
      mdiPencilOutline,
    };
  },
  computed: {
    posts() {
      return this.$store.getters.posts;
    },
  },
  async beforeMount() {
    this.$store.dispatch("getHotPosts");
    /*  try {
      const response = await PostService.getHotPosts();
      console.log(response);
      this.posts = response.data;
      
      console.log(this.posts)
    } catch (error) {
      this.errorMessage = error.response.data.error;
    } */
  },
  methods: {
    deletePost(id) {
      this.$store.dispatch("deletePost", id);
    },
    deleteComment(id) {
      console.log;
      this.$store.dispatch("deleteComment", id);
    },

    likePost(id) {
      const data = 1;
      console.log(id);
      this.$store.dispatch("likePost", {
        id: id,
        data: data,
      });
    },
  },
};
</script>

<style>
.feed-container {
  margin-bottom: 50px;
  margin-left: 0 !important;
}
</style>
