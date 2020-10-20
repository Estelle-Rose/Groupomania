import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import PostService from '../services/PostService';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    token: null,
    user: null,
    isLoggedIn: false,
    isLoading: false,
    posts: [],
    newPosts: [],
    post:{},
    message: '',
    error: '',
    isLiked: false

  },
  plugins: [
    createPersistedState()
  ],
  getters: {
    posts(state) {
      return state.posts;
    },
    newPosts(state) {
      return state.newPosts
    },
    post(state) {
      return state.post;
    },
    user(state) {
      return state.user;
    },
    messageRetour(state) {
      return state.message;
    },
    errorMessage(state) {
      return state.error;
    },
    isLiked(state) {
      return state.isLiked;
    }
  },


  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
      if (token) {
        state.isLoggedIn = true;
      } else {
        state.isLoggedIn = false;
      }
    },
    SET_USER(state, user) {
      state.user = user;
    },    
    GET_POSTS (state, posts) {
      state.posts = posts,
      state.filteredPosts = posts;
      state.isLoading = false
    },
    GET_POST_BY_ID (state,post) {
      state.post = post;
      state.isLoading = false
    },
    ADD_POST (state, post) {
      state.posts = [post, ...state.posts];
      state.message = 'post créé'
    }, 
    UPDATE_POST (state, id,post) {
      Object.assign(state.posts.find(element => element.id === id), post);
    },    
      
     DELETE_POST(state, id) {
        state.posts = [
           ...state.posts.filter((item) => item.id !== id)
        ];
       
    },   
    LIKE_POST(state,like) {
      state.posts = [like, ...state.posts];
      
      state.isLiked = like.isLiked;
      console.log(state.isLiked)
    }

  },
  actions: {
    setToken({ commit }, token) {
      commit('SET_TOKEN', token);
    },
    setUser({ commit }, user) {
      commit('SET_USER', user);
    },
    
     deletePost ({commit},id) {
      PostService.deletePost(id)
        .then(() => {                      
            commit('DELETE_POST', id)
        })
    },
    getPosts({commit}) {      
      PostService.getPosts()
      .then(response => {
        const posts = response.data;
     console.log(posts)
   
        commit('GET_POSTS', posts)
      })
    } ,
    getPostById({commit}, id,) {
      PostService.getPostById(id)
      .then(response => {
        const post = response.data;
     console.log(post)
   
        commit('GET_POST_BY_ID', post)
      })
    },
    createPost({commit}, post) {
      PostService.createPost( post)
      .then(response => {
        const post = response.data;
        console.log(post)   
        commit('ADD_POST', post)
      })
    },
     updatePost({commit}, data) {   
       let id = this.state.post.id
   axios.put(
    `http://localhost:3000/api/posts/${id}`,
    data,
    { headers: { Authorization: this.state.token } }
  )
      .then(response => {
        const post = response.data;
         console.log(post)   
        commit('UPDATE_POST',id, post);      
        
      })
    }, 
     likePost({commit}, payload) {     
      axios.post(
        `http://localhost:3000/api/posts/${payload.id}/like`,
        payload.data,
        { headers: { Authorization: this.state.token } }
      )
      .then(response => {
        const like = response.data;
       console.log(like)   
        commit('LIKE_POST', like);           
      })
      .then(() => {             
        PostService.getPosts()
        .then(response => {
          const posts = response.data;          
          commit('GET_POSTS', posts)
        })
      }) 
    }, 

  },
});
