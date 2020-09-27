import Api from '../services/Api';

export default {
  signup(info) {
    return Api().post('signup', info);
  },
};

/* Auth.register({
    nom: 'Doe',
    prenom: 'John',
    email: 'test@mail.com',
    password: '123456'
}) */
