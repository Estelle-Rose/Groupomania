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
              <v-btn to="/signup">Les + récents</v-btn>
              <v-btn class="ml-4" to="/about">Les + likés</v-btn>
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
            ></posts>
          </v-card-text>
        </v-card>
        <!-- <v-card class="mx-auto" max-width="344">
          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
            height="200px"
          ></v-img>

          <v-card-title>
            Top western road trips
          </v-card-title>

          <v-card-subtitle>
            1,000 miles of wonder
          </v-card-subtitle>

          <v-card-actions>
            <v-btn color="orange lighten-2" text>
              Explore
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn icon @click="show = !show">
              <v-icon>{{
                show ? "mdi-chevron-up" : "mdi-chevron-down"
              }}</v-icon>
            </v-btn>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="show">
              <v-divider></v-divider>

              <v-card-text>
                I'm a thing. But, like most politicians, he promised more than
                he could deliver. You won't have time for sleeping, soldier, not
                with all the bed making you'll be doing. Then we'll go with that
                data file! Hey, you add a one and two zeros to that or we walk!
                You're going to do his laundry? I've got to find a way to
                escape.
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card> -->
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

      /* this.$store.dispatch('setToken', response.data.token);
          this.$store.dispatch('setUser', response.data.user);
          let router = this.$router;
          setTimeout(function() {
            router.push('/posts');
          }, 1500); */
    } catch (error) {
      this.errorMessage = error.response.data.error;
    }
  }
};
</script>

<style></style>
