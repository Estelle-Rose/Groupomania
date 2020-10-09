const token = require('../middleware/token');
const models = require('../models'); // accès tables
const fs = require('fs');




exports.getAllPosts = async (req, res) => {
  try {
    const posts = await models.Post.findAll({
      order: [['createdAt', 'DESC']],
      include: [{
        model: models.User,
        attributes: ['pseudo', 'id']
      },
      {
        model: models.Like,
        attributes: ['type', 'UserId']
      }
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
      order: [['createdAt', 'DESC']],
      include: [{
        model: models.User,
        attributes: ['pseudo', 'id']
      },
      {
        model: models.Like,
        attributes: ['type', 'UserId']
      }
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
      where: { id: req.params.id },
      include: [
        {
          model: models.User,
          attributes: ['pseudo', 'photo', 'id']
        },
        {
          model: models.Like,
          attributes: ['like', 'UserId']
        }
      ]

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
          console.log(newPost,)
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
exports.updatePost = async (req, res) => {
  try {
    let link;
    let newImageUrl;
    if (req.file) {
      newImageUrl = `${req.protocol}://${req.get('host')}/upload/${req.file.filename}`;
      link = null;
    } else {
      imageUrl = null;
    }
    let post = await models.Post.findOne({ where: { id: req.params.id } });
    if (post.imageUrl) {
      const filename = post.imageUrl.split('/upload')[1];
      console.log(post.imageUrl);
      fs.unlink(`upload/${filename}`,(err => { 
        if (err) console.log(err);        
        else { 
          console.log(`Deleted file: upload/${filename}`); 
        }
    }))
  }
    post.message = req.body.message;
    post.link = req.body.link || link;
    post.imageUrl = newImageUrl;
    const newPost = await post.save({ fields: ['message', 'link', 'imageUrl'] });
    console.log(newPost)
    res.status(200).json({ newPost: newPost, message: 'post modifié' })

  }
  catch (error) {
    return res.status(500).send({ error: 'Erreur serveur' });

  }

}
/* exports.updatePost = (req, res) => {

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
            models.Post.create({
              message: req.body.message,
                  link: null,    
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
          models.Post.save({
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
        models.Post.create({
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
} */

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
exports.likePost =  async (req, res, next) => {
  try {
    const userId = token.getUserId(req)
    console.log(userId)
    const like = req.body.type;
    const postId = req.params.id;
    console.log(postId);  

    if (like === 1) {
      console.log(like)
     const newLike =  await models.Like.create({
      type: true,
       UserId: userId,
       PostId: postId       
      });
        console.log(newLike);          
        res.status(201).json({ message: 'vous aimez ce post', newLike });       
    }
    if (like === -1) {
      const newDislike =  await models.Like.create({
        type: false,
        UserId: userId,
        PostId: postId,
        
       }); 
         console.log(newDislike);          
         res.status(400).json({ message: 'vous aimez pas ce post', newDislike });       
       
    }
  }
  catch (error) {
    return res.status(500).send({ error: 'Erreur serveur' });

  }
}