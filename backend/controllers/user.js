const bcrypt = require('bcrypt'); // chiffrement
const db = require('../models'); // modele user
const token = require('../middleware/token');
const fs = require('fs');


exports.signup = async (req, res) => {
  try {
    const user = await db.User.findOne({
      where: { email: req.body.email } && { pseudo: req.body.pseudo },
    });     
        if (user !== null) {
          res.status(400).json({ message: 'Cette adresse mail ou ce pseudo sont déjà utilisés !' });
        }
        else {
         const hash =  await bcrypt.hash(req.body.password, 10);    
         console.log(hash)        
              const newUser = await db.User.create({
                pseudo: req.body.pseudo,
                email: req.body.email,
                password: hash,
                admin: false
              });  
              console.log(newUser)              
          
          const tokenObject =  await token.issueJWT(newUser);
          res.status(200).send({
            user: newUser,
            token: tokenObject.token,
            expires: tokenObject.expiresIn,
            message: `Votre compte est bien créé ${newUser.pseudo} !`,
          });
        }
  }
  catch (error) {
    return res.status(500).send({ error: 'Erreur serveur' });
  }
};

exports.login = async (req, res) => {  
  try {
    const user = await db.User.findOne({
      where: { email: req.body.email },
    }) // on vérifie que l'adresse mail figure bien dan la bdd          
    if (user === null) {
      return res.status(403).send({ error: 'Connexion échouée' });
    } else {
      const hash =  await bcrypt.compare(req.body.password, user.password); // on compare les mots de passes        
        if (!hash) {
          return res
            .status(401)
            .send({ error: 'Mot de passe incorrect !' });
        }
        else {
          const tokenObject = await token.issueJWT(user)
          res.status(200).send({
            user: user,
            token: tokenObject.token,
            sub: tokenObject.sub,
            expires: tokenObject.expiresIn,
            message: 'Bonjour ' + user.pseudo + ' !',
          });  
        }  
    }     
  } catch (error) {
    return res.status(500).send({ error: 'Erreur serveur' });
  }
};
exports.getAccount = async (req, res) => {
  try {
    const user = await db.User.findOne({
      
      where: { id: id }
    })
    res.status(200).send(user);
  }
  catch (error) {
    return res.status(500).send({ error: 'Erreur serveur' });

  }
}
exports.getAllUsers = async (req, res) => {
  try {
    const user = await db.User.findAll();
    console.log(user)
    res.status(200).json(user);
  }
  catch (error) {
    return res.status(500).send({ error: 'Erreur serveur' });

  }
}

exports.updateAccount = async (req, res) => {
  try {    
    const userId = token.getUserId(req);  
    let newPhoto;         
    let user = await db.User.findOne({ where: { id: id } });
      if (userId === user.id) {
      if (req.file && user.photo) {
        newPhoto = `${req.protocol}://${req.get('host')}/upload/${req.file.filename}`;
        const filename = user.photo.split('/upload')[1];
        console.log(user.photo);
        fs.unlink(`upload/${filename}`, (err => {
          if (err) console.log(err);
          else {
            console.log(`Deleted file: upload/${filename}`);
          }
        }))
      } else if (req.file) {
        newPhoto = `${req.protocol}://${req.get('host')}/upload/${req.file.filename}`;
      }
     
      if(newPhoto ) {
        user.photo = newPhoto  ;        
      }
      if(req.body.bio ) {
        user.bio = req.body.bio  ;        
      }
      if(req.body.pseudo ) {
        user.pseudo = req.body.pseudo  ;        
      }
      const newuser = await user.save({ fields: ['pseudo', 'bio', 'photo'] });
      console.log(newuser)
      res.status(200).json({ user: newuser, messageRetour: 'user modifié' })
    } else {
      res.status(400).json({ messageRetour: 'Vous n\'avez pas les droits requis' })
    }
  }
  catch (error) {
    return res.status(500).send({ error: 'Erreur serveur' });
  }
}
exports.deleteAccount = async (req, res) => {
  try {
    const userId = token.getUserId(req);    
    const id = parseInt(req.params.id);
   console.log(id)
    const checkAdmin = await db.User.findOne({ where: {id: id}})
    const user = await db.User.findOne({ where: { id: id } });
    if ((userId === id) || (checkAdmin.admin === true)) {      
      if (user.photo) {
        const filename = user.photo.split('/upload')[1];
        console.log(user.photo);
        fs.unlink(`upload/${filename}`, () => {
          db.User.destroy({ where: { id: id } });
          res.status(200).json({ messageRetour: 'user supprimé' })
        })
      } else {
        db.User.destroy({ where: { id: id } });
        res.status(200).json({ messageRetour: 'user supprimé' })
      }
    } else {
      res.status(400).json({errorMessage: 'user not allowed'})
    }

  }
  catch (error) {
    return res.status(500).send({ error: 'Erreur serveur' });
  }
}
  /* jwt.sign(
// on génère un token de session pour le user maintenant connecté
{ userId: user.id },
'JWT_SECRET',
{ expiresIn: Math.floor(Date.now() / 1000) + 60 * 60 }
), */