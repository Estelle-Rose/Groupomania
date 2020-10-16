<template >
  <div>
    <v-card class="posts-card mx-auto mt-4 mb-4 pb-5" round elevation="2">
      <div>
        <div class="d-flex justify-space-between pr-2 ">
          <v-card-title class="post-title"
            >
            <v-avatar size="52px">
                   <img v-if="post.User.photo"
                      :src="post.User.photo"
                      alt="Photo de profil"
                    > 
                  <v-icon v-else >{{ mdiAccountCircle }}</v-icon>
                </v-avatar> 
                <div class="nom-date mt-3">
                  <span class="pseudo pl-3">{{ post.User.pseudo }}</span>
                  <span class="date">{{ post.createdAt | moment("calendar")  }}</span>
                </div>
           
          </v-card-title>
          <div class="post-options">
            <v-btn
              v-if="post.UserId === this.$store.state.user.id"
              @click="getOnePost(post.id)"
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
                post.UserId === this.$store.state.user.id ||
                  this.$store.state.user.admin === true
              "
              class="mx-2"
              fab
              dark
              x-small
              color="white"
            >
              <v-icon @click="deletePost()" small class=" rounded-circle">
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
            <v-btn
              @click="(show = !show)"
              color="red lighten-2 "
              text
            >
              Commentaires
            </v-btn>
            <v-btn icon @click="show = !show">
              <v-icon>{{
                show ? "mdi-chevron-up" : "mdi-chevron-down"
              }}</v-icon>
            </v-btn>
          </div>
          <div class="d-flex">
            <span
              ><v-btn @click="addComment(post.id)" class="mx-2" small>
                <v-icon class="material-icons">{{
                  mdiCommentTextOutline
                }}</v-icon> </v-btn
              >{{ post.Comments.length }}</span
            >
          </div>
          <div class="d-flex">
            <span
              ><v-btn
                
                @click="likePost(post.id), reloadFeed()"
                x-small
                class="like-btn"          
              >
                
                <v-icon  class=" material-icons ">
                  {{ mdiEmoticonOutline }}
                </v-icon>
              </v-btn>              
              {{ post.Likes.length }}</span
            >
          </div>
        </v-card-actions>
        <v-expand-transition>
          <div v-show="show">
            <v-divider></v-divider>
            <div class="comments-box">
              <v-list v-for="comment in post.Comments" :key="comment.id" :comment="comment">
                <v-list-item>
                  <v-list-item-avatar>
                    <img v-if="comment.User.photo"
                      :src="comment.User.photo"
                      alt="Photo de profil"
                    > 
                    <v-icon v-else>{{ mdiAccountCircle }}</v-icon>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <div class="comment mt-5 ">
                      <strong
                        v-html="comment.pseudo"
                        class="pr-5 comment__pseudo"
                      ></strong>
                      <p
                        v-html="comment.message"
                        class="pr-2 text-left comment__message"
                      ></p>
                      <v-icon
                        @click="deleteComment(comment.id)"
                        class=" rounded-circle comment-delete"
                        >{{ mdiCloseThick }}
                      </v-icon>
                    </div>
                  </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>
              </v-list>
            </div>
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
import { mdiAccountCircle } from "@mdi/js";
import { mdiCloseThick } from "@mdi/js";
import { mdiCommentTextOutline } from "@mdi/js";

//import Likes from "../components/Likes.vue";
import axios from "axios";
export default {
  name: "Posts",

  props: {
    post: {
      type: Object
    },     
    postUrl: {
      type: String
    },   

  },
  data: function() {
    return {
      show: false,
      mdiEmoticonOutline,
      mdiCommentTextOutline,
      mdiEmoticonSadOutline,
      mdiTrashCanOutline,
      mdiCloseThick,
      mdiAccountCircle,
      mdiUpdate,
      width: 500,
      commentForm: false,
      user: false,
      showFeed: true,
      update: false,
      isValid: true,
      isliked: false,
      rules: {
        required: value => !!value || "Required."
      },
      messageRetour: null,
      errorMessage: null
    };
  },

  
  methods: {
    deletePost() {
      this.$emit("deletePost", this.post.id);
    },   
    getOnePost() {
      this.$router.push(this.postUrl);
    },
    addComment(id) {
      this.$router.push(`/posts/${id}/addcomment`);
      console.log(id)
    },
    /* likePost() {
      this.$emit("likePost", this.id);
    }, */
    async likePost(id) {  
      const data = 1;
      console.log(id)
      try {
        const response = await axios.post(
          `http://localhost:3000/api/posts/${id}/like`, 
          data    ,     
          { headers: { Authorization: this.$store.state.token } }
        );
        this.messageRetour = response.data.messageRetour;
        console.log(typeof(response.data.isalreadyliked));
         if (response.data.isalreadyliked === 'no'){
          this.isliked = true;
          console.log(this.isliked)
        } else {
          this.isliked = false;
        }
       
      } catch (error) {
        this.errorMessage = error.response.data.error;
      } 

       
    },

    reloadFeed() {
      this.$emit("reloadFeed");
    },

    showComentForm() {
      this.commentForm = true;
    },
    deleteComment() {}
  }
};
</script>
<style lang="scss" scoped>
/* .posts-card {
  width: 40em;
} */
.post-title {
  font-size: 20px;
  margin-left: 15px;
}
.nom-date{
  display: flex;
  flex-direction: column;
}
.date {
  font-size: 14px;
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
.comment {
  display: flex;
  align-content: center;
  position: relative;
  &__pseudo {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  &__message {
    width: 30rem;
  }
}
.comment-delete {
  position: absolute;
  right: 0;
  bottom: 10px;
}
.comment-form {
  display: flex;
  justify-content: space-between;

  padding: 10px;

  &__btn {
    margin-left: 1rem;
    margin-top: 0.33rem;
  }
}
</style>
