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
      where: { id: id },
      include: [
        {
          model: models.User,
          attributes: ['pseudo', 'photo', 'id']
        },
        {
          model: models.Like,
          attributes: ['type', 'UserId']
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
exports.deletePost = async (req, res) => {
  try {
    const userId = token.getUserId(req);    
    const postId = parseInt(req.params.id);  
    const checkAdmin = await models.User.findOne({ where: {id: userId}})
    console.log(checkAdmin.admin)
    const post = await models.Post.findOne({ where: { id: postId } });
    if ((userId === post.userId) || (checkAdmin.admin === true)) {
      if (post.imageUrl) {
        const filename = post.imageUrl.split('/upload')[1];
        console.log(post.imageUrl);
        fs.unlink(`upload/${filename}`, () => {
          models.Post.destroy({ where: { id: post.id } });
          res.status(200).json({ message: 'Post supprimé' })
        })
      } else {
        models.Post.destroy({ where: { id: post.id } }, { truncate: true });
        res.status(200).json({ message: 'Post supprimé' })
      }
    } else {
      res.status(400).json({ message: 'Vous n\'avez pas les droits requis' })
    }
  }
  catch (error) {
    return res.status(500).send({ error: 'Erreur serveur' });
  }
}


exports.updatePost = async (req, res) => {
  try {
    let link;
    let newImageUrl;
    const userId = token.getUserId(req);  
    console.log(userId)  
    const postId = parseInt(req.params.id);  
    console.log(postId)
    const checkAdmin = await models.User.findOne({ where: { id: userId }})
    if (req.file) {
      newImageUrl = `${req.protocol}://${req.get('host')}/upload/${req.file.filename}`;
      link = null;
    } else {
      imageUrl = null;
    }
    let post = await models.Post.findOne({ where: { id: req.params.id } });
      if ((userId === post.userId) || (checkAdmin.admin === true)) {
      if (post.imageUrl) {
        const filename = post.imageUrl.split('/upload')[1];
        console.log(post.imageUrl);
        fs.unlink(`upload/${filename}`, (err => {
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
    } else {
      res.status(400).json({ message: 'Vous n\'avez pas les droits requis' })
    }
  }
  catch (error) {
    return res.status(500).send({ error: 'Erreur serveur' });
  }

}

exports.likePost = async (req, res, next) => {
  try {
    const userId = token.getUserId(req)
    console.log(userId)
    const like = req.body.type;
    const postId = req.params.id;
    console.log(postId);
    const userLike = await models.Like.findOne({ where: { UserId: userId, PostId: postId } });
    console.log(userLike instanceof models.Like);
    if (userLike === null) {
      if (like === 1) {
        console.log(like)
        const newLike = await models.Like.create({
          type: true,
          UserId: userId,
          PostId: postId
        });
        console.log(newLike);
        res.status(201).json({ message: 'vous aimez ce post', newLike });
      }
      if (like === -1) {
        const newDislike = await models.Like.create({
          type: false,
          UserId: userId,
          PostId: postId,
        });
        console.log(newDislike);
        res.status(400).json({ message: 'vous aimez pas ce post', newDislike });
      }
    }
    else {
      await models.Like.destroy({ where: { UserId: userId, PostId: postId } }, { truncate: true, restartIdentity: true });
      console.log('le like est annulé')
      res.status(400).json({ message: 'le like est annulé' });
    }
  }
  catch (error) {
    return res.status(500).send({ error: 'Erreur serveur' });

  }
}