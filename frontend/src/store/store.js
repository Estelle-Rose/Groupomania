import Vue from 'vue';

import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
//import Api from '../services/Api';
//import PostService from '../services/PostService';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    token: null,
    user: null,
    isLoggedIn: false,
    loadingStatus: 'notLoading',
    posts: [],

  },
  plugins: [
    createPersistedState()
  ],


  mutations: {
    setToken(state, token) {
      state.token = token;
      if (token) {
        state.isLoggedIn = true;
      } else {
        state.isLoggedIn = false;
      }
    },
    setUser(state, user) {
      state.user = user;
    },
    setLoadingStatus(state, status) {
      state.loadingStatus = status
    },
    setPosts(state, posts) {
      state.posts = posts
    },
    reloadPosts(state,posts) {
      state.posts = posts
    }


  },
  actions: {
    setToken({ commit }, token) {
      commit('setToken', token);
    },
    setUser({ commit }, user) {
      commit('setUser', user);
    },
    setPosts({ commit }, posts) {
      commit('setPosts', posts);
    },
    /* fetchPosts(context) {
      //
      PostService.getPosts()
      .then(response => {
        //context.commit('setLoadingStatus', 'notLoading')
        context.commit('setPosts', response.data.posts)
      })
    } */

  },
});
