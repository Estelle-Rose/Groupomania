import Api from '../services/Api';

export default {


  getPosts() {
    return Api().get('posts');
  },
  getHotPosts() {
    return Api().get('posts/hot');
  },
  getPostById(id) {
    return Api().get('posts/' + id);
  },
  createPost(data) {
    return Api().post('posts/add',data)
  },
  updatePost(id,data) {
    return Api.put('posts/'+ id, data)
  },

  deletePost(id) {
    return Api().delete('posts/' + id);
  },
  likePost(id) {
    return Api().post('posts/' + id) + '/like';
  },

  commentPost(id) {
    return Api().post('posts/' + id + '/comment');
  },
  updateComment(id, comId) {
    return Api().put(
      'posts/' + id + '/comment/' + comId
    );
  },
  deleteComment(id, comId) {
    return Api().delete(
      'posts/' + id + '/comment' + comId
    );
  },
};
