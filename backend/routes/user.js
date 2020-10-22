const router = require('express').Router();
const userCtrl = require('../controllers/user');
const authUser = require('../middleware/authUser');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/signup', authUser.checkPseudo, authUser.signup, userCtrl.signup);
router.post('/login', authUser.signup, userCtrl.login);
router.get('/accounts', auth, userCtrl.getAllUsers);
router.put('/accounts/:id', auth, multer,authUser.checkPseudo, userCtrl.updateAccount);
router.get('/accounts/:id', auth, userCtrl.getAccount);
router.delete('/accounts/:id', auth, userCtrl.deleteAccount);

module.exports = router;
