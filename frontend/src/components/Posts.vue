<template >
  <div>
    <v-card class="posts-card mx-auto mt-4 mb-4 pb-5" round elevation="2">
      <div>
        <div class="d-flex justify-space-between pr-2 ">
          <v-card-title class="post-title">
            <v-avatar size="52px">
              <img
                v-if="post.User.photo"
                :src="post.User.photo"
                alt="Photo de profil"
              />
              <v-icon v-else>{{ mdiAccountCircle }}</v-icon>
            </v-avatar>
            <div class="nom-date mt-3">
              <span class="pseudo pl-3">{{ post.User.pseudo }}</span>
              <span class="date">{{
                post.createdAt | moment("calendar")
              }}</span>
            </div>
          </v-card-title>
          <div class="post-options">
            <v-tooltip  v-if="$store.state.user.id === post.UserId " bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="mx-2"
                  fab
                  primary
                  x-small                  
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon @click="getOnePost(post.id)" class=" rounded-circle">{{ mdiUpdate }}</v-icon>
                </v-btn>
              </template>
              <span>Modifier</span>
            </v-tooltip>
            <v-tooltip v-if="($store.state.user.id === post.UserId || $store.state.user.admin === true) " bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="mx-2"
                  fab
                  primary
                  x-small
                 
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon @click="deletePost(post.id)" small class=" rounded-circle">
                    {{ mdiTrashCanOutline }}
                  </v-icon>
                </v-btn>
              </template>
              <span>Supprimer</span>
            </v-tooltip>
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
            :max-height="300"
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
        <div class="d-flex flex-column align-end pr-3">
          <div>{{ post.Comments.length }} comments</div>
          <div>{{ post.Likes.length }} j'aime</div>
        </div>
        <v-divider></v-divider>
        <v-card-actions class="pt-5  pr-4 d-flex justify-space-between">
          <div class=" d-flex justify-md-space-between">
            <v-btn @click="show = !show" text>
              Commentaires
            </v-btn>
            <v-btn icon @click="show = !show">
              <v-icon>{{
                show ? "mdi-chevron-up" : "mdi-chevron-down"
              }}</v-icon>
            </v-btn>
          </div>
          <div class="d-flex  align-end pr-3">
            <v-btn @click="show = !show" class="mx-2" x-small>
              <v-icon class="material-icons">{{
                mdiCommentTextOutline
              }}</v-icon>
            </v-btn>
            <v-btn
              @click="likePost(post.id)"
              x-small
              class="isliked isliked-btn">
              <v-icon class=" material-icons ">
                {{ mdiEmoticonOutline }}
              </v-icon>
            </v-btn>
          </div>
        </v-card-actions>
        <v-expand-transition>
          <div v-show="show">
            <v-divider></v-divider>
            <div class="comments-box">
              <v-card-text class="comment-input">
                <v-form
                  v-model="isValid"   
                  @submit.prevent="onSubmitComment(post.id)"              
                  enctype="multipart/form-data"
                  class="validate comment-form"
                >
                  <v-text-field
                    name="input-1-3"
                    label="ton commentaire"
                    v-model="data.commentMessage"
                    auto-grow
                    class="comment-form__message"
                  >
                  </v-text-field>
                  <v-btn
                    @click="onSubmitComment(post.id)"
                    :disabled="!isValid"
                    class="comment-form__btn"
                    >Poster</v-btn
                  >
                </v-form>
                <div>
                  <div class="danger-alert" v-html="errorMessage" />
                  <div class="danger-alert" v-html="messageRetour" />
                </div>
              </v-card-text> 
              <v-list
                v-for="comment in post.Comments"
                :key="comment.id"
                :comment="comment"
              >
                <v-list-item>
                  <v-list-item-avatar>
                    <img
                      v-if="comment.User.photo"
                      :src="comment.User.photo"
                      alt="Photo de profil"
                    />
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
                      <v-tooltip bottom>
                        <template v-if="($store.state.user.id === comment.UserId || $store.state.user.admin === true) " v-slot:activator="{ on, attrs }">
                          <v-btn
                            class="mx-2"
                            fab
                            primary
                            x-small
                            v-bind="attrs"
                            v-on="on"
                          >
                            <v-icon
                              @click="deleteComment(comment.id)"
                              class=" rounded-circle "
                              >{{ mdiTrashCanOutline }}
                            </v-icon>
                          </v-btn>
                        </template>
                        <span>Supprimer</span>
                      </v-tooltip>
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
import PostService from '../services/PostService';
//import Likes from "../components/Likes.vue";

export default {
  name: "Posts",

  props: {
    post: {
      type: Object
    },
    postUrl: {
      type: String
    },
    isliked: {
      type: Boolean
    }
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
     
      rules: {
        required: value => !!value || "Required."
      },
      messageRetour: null,
      errorMessage: null,
       data: {
        commentMessage: "",
        commentPseudo: this.$store.state.user.pseudo
      }
    };
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
    deletePost() {
      this.$emit("deletePost", this.post.id);
    },
    likePost() {
      this.$emit("likePost", this.post.id);
    },
    getOnePost() {
      this.$router.push(this.postUrl);
    },
    onSubmitComment(id) {    
    console.log(id);
  
    this.$store.dispatch('commentPost',  {
      id: id,
      data: this.data
      });
        this.data.commentMessage = '';
  }, 
    /* deleteComment() {   
      this.$emit("deleteComment", this.comment.id); 
      console.log(this.comment.id) 
   
       /* this.$store.dispatch("deleteComment", { id : id, comId : comId});
            this.reloadFeed(); 
    }, */
    deleteComment(id) {
      console.log(id)
     this.$store.dispatch('deleteComment',id),
     this.reloadFeed();
   }, 
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
.nom-date {
  display: flex;
  flex-direction: column;
}
.date {
  font-size: 14px;
}
.posts-row {
  justify-content: center;
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
.isliked {
  color: #ff4081 !important;
}
</style>
