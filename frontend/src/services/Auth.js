import axios from 'axios';

export default {
  signup(credentials) {
    return axios.post('http://localhost:3000/api/signup', credentials);
  },
};

/* Auth.register({
    pseudo: 'john'
    email: 'test@mail.com',
    password: '123456'
}) */
