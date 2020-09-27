import axios from 'axios';

export default {
  signup(info) {
    return axios.post('http://localhost:3000/api/signup', info);
  },
};

/* Auth.register({
    pseudo: 'john'
    email: 'test@mail.com',
    password: '123456'
}) */
