const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const authUser = require('../middleware/authUser');

router.post('/signup', authUser.signup, userCtrl.signup);
router.post('/login', authUser.signup, userCtrl.login);
router.get('/accounts', userCtrl.getAllUsers);
router.put('/:id', userCtrl.updateAccount);
router.get('/:id', userCtrl.getAccount);
//router.delete('/:id', userCtrl.deleteUser);

module.exports = router;
