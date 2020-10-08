const token = require('../middleware/token');
const models = require('../models'); // accès tables
const fs = require('fs');


exports.getAllPosts = async (req, res) => {
  try {
    const posts = await models.Post.findAll({
      order: [['createdAt', 'DESC']],
      include: [
        models.User
      ]
    });
    res.status(200).send(posts);
  }
  catch (error) {
    return res.status(500).send({ error: 'Une erreur est survenu lors de la récupération des posts ' });
  }
}
// afficher le sposts les plus likés
exports.getHotPosts = async (req, res) => {
  try {
    const posts = await models.Post.findAll({

      include: [
        models.User
      ]
    });
    res.status(200).send(posts);
  }
  catch (error) {
    return res.status(500).send({ error: 'Une erreur est survenu lors de la récupération des posts ' });

  }
}
exports.getOnePost = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await models.Post.findOne({
      attributes: ['id', 'message', 'link', 'userId'],
      where: { id: req.params.id }
    })
    res.status(200).json(post);
  }
  catch (error) {
    return res.status(500).send({ error: 'Erreur serveur' });

  }
}
exports.createPost = (req, res) => {

  const userId = token.getUserId(req)
  console.log(userId)

  let imageUrl
  models.User.findOne({
    attributes: ['pseudo', 'id', 'photo'],
    where: { id: userId }
  })
    .then(user => {
      console.log(user)
      if (req.file) {
        imageUrl = `${req.protocol}://${req.get('host')}/upload/${req.file.filename}`
      } else {
        imageUrl = null;
      }
      
      models.Post.create({
        message: req.body.message,
        link: req.body.link,
        imageUrl: imageUrl,
        UserId: user.id
      })
        .then(newPost => {
          console.log(newPost, user)
          res.status(201).json({ post: newPost, messageRetour: 'Votre post est ajouté' })
        })
        .catch(err => {
          res.status(400).send({ error: 'Erreur ' });
        })
    })
    .catch(err => {
      res.status(500).send({ error: 'Erreur serveur' });
    })
};
exports.deletePost = (req, res) => {

  models.Post.findOne({ where: { id: req.params.id } })
    .then(post => {
      if (post.imageUrl) {
        const filename = post.imageUrl.split('/upload')[1];
        console.log(post.imageUrl);
        fs.unlink(`upload/${filename}`, () => {
          models.Post.destroy({ where: { id: post.id } });
          res.status(200).json({ message: 'Post supprimé' })
        })
      } else {
        models.Post.destroy({ where: { id: post.id } });
        res.status(200).json({ message: 'Post supprimé' })
      }
    })
    .catch(err => {
      res.status(500).send({ error: 'Erreur ' });
    })

}
exports.updatePost = (req, res) => {

  let newImageUrl;
  models.Post.findOne({ where: { id: req.params.id } })
    .then(post => {
      // si il y a une image dans la requête
      if (req.file) {
        // s'il ya déjà une image stockée on l'enlève
        if (post.imageUrl) {
          const filename = post.imageUrl.split('/upload')[1];
          console.log(post.imageUrl);
          fs.unlink(`upload/${filename}`, () => {
            newImageUrl = `${req.protocol}://${req.get('host')}/upload/${req.file.filename}`;
            models.Post.update({
              message: req.body.message,
              link: req.body.link,
              imageUrl: newImageUrl,

            }, { where: { id: req.params.id } }
            )
              .then(newPost => {
                console.log(newPost)
                res.status(201).json({ post: newPost, messageRetour: 'Votre post est modifié' })

              })
              .catch(err => {
                res.status(500).send({ error: 'Erreur ' });
              })

          })
        } // s'il n'y avait pas d'image on enregistre celle de la requête
        else {
          newImageUrl = `${req.protocol}://${req.get('host')}/upload/${req.file.filename}`;
          models.Post.update({
            message: req.body.message,
            link: req.body.link,
            imageUrl: newImageUrl,
          }, { where: { id: req.params.id } })
            .then(newPostnewImage => {
              console.log(newPostnewImage)
              res.status(201).json({ post: newPostnewImage, messageRetour: 'Votre post est modifié' })

            })
            .catch(err => {
              res.status(500).send({ error: 'Erreur ' });
            })
        }
      } else {
        models.Post.update({
          message: req.body.message,
          link: req.body.link
        }, { where: { id: req.params.id } })
          .then(updatedPost => {
            console.log(updatedPost.id)
            res.status(201).json({ post: updatedPost.id, messageRetour: 'Votre post est modifié' })

          })
          .catch(err => {
            res.status(500).send({ error: 'Erreur ' });
          })
      }
    })
    .catch(err => {
      res.status(500).send({ error: 'Erreur ' });
    })
}

/* exports.createPost = async (req, res) => {
  try {
    const userId = await token.getUserId(req)
    console.log(userId)
    let imageUrl;
    if (req.file) {
      imageUrl = `${req.protocol}://${req.get('host')}/upload/${req.file.filename}`

    } else {
      imageUrl = null;
    }
    console.log(message)
    const post = await models.Post.create({
      include: [
        { model: models.User },
        { attributes: ["pseudo", "id"] }
      ],
      message: req.body.message,
      link: req.body.link,
      imageUrl: imageUrl,
      UserId: userId
    })
    res.status(200).send({ message: 'post créé' })
  }
  catch (error) {
    return res.status(500).send({ error: 'Erreur serveur' });

  }
}   */