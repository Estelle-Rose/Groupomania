const token = require("../middleware/token");
const db = require("../models"); // accès tables
const fs = require("fs"); //

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await db.Post.findAll({
      attributes: ["id", "message", "imageUrl", "link", "createdAt"],
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: db.User,
          attributes: ["pseudo", "id", "photo"],
        },
        {
          model: db.Like,
          attributes: ["UserId"],
        },
        {
          model: db.Comment,
          attributes: ["message", "pseudo", "UserId", "id"],
          order: [["createdAt", "DESC"]],
          include: [
            {
              model: db.User,
              attributes: ["photo"],
            },
          ],
        },
      ],
    });
    res.status(200).send(posts);
  } catch (error) {
    return res.status(500).send({
      error: "Une erreur est survenu lors de la récupération des posts ",
    });
  }
};
// afficher le sposts les plus likés
exports.getHotPosts = async (req, res) => {
  try {
    const posts = await db.Post.findAll({
      attributes: [
        "id",
        "message",
        "imageUrl",
        "link",
        "createdAt",
        [
          db.sequelize.literal(
            "(SELECT COUNT(*) FROM Likes WHERE Likes.PostId = Post.id)"
          ),
          "LikeCount",
        ],
      ],
      order: [[db.sequelize.literal("LikeCount"), "DESC"]],

      include: [
        {
          model: db.User,
          attributes: ["pseudo", "id", "photo"],
        },
        {
          model: db.Like,
          attributes: ["PostId", "UserId"],
        },
        {
          model: db.Comment,
          order: [["createdAt", "DESC"]],
          attributes: ["message", "pseudo", "UserId", "id"],
          include: [
            {
              model: db.User,
              attributes: ["photo"],
            },
          ],
        },
      ],
    });
    res.status(200).send(posts);
  } catch (error) {
    return res.status(500).send({
      error: "Une erreur est survenu lors de la récupération des posts ",
    });
  }
};
exports.getOnePost = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await db.Post.findOne({
      where: { id: id },
      include: [
        {
          model: db.User,
          attributes: ["pseudo", "photo", "id"],
        },
        {
          model: db.Like,
          attributes: ["PostId", "UserId"],
        },
        {
          model: db.Comment,
          attributes: ["message", "pseudo", "UserId"],
          order: [["createdAt", "DESC"]],
        },
      ],
    });
    res.status(200).json(post);
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" });
  }
};
exports.createPost = (req, res) => {
  const userId = token.getUserId(req);
  console.log(userId);

  let imageUrl;
  db.User.findOne({
    attributes: ["pseudo", "id", "photo"],
    where: { id: userId },
  })
    .then((user) => {
      console.log(user);
      if (req.file) {
        imageUrl = `${req.protocol}://${req.get("host")}/upload/${
          req.file.filename
        }`;
      } else {
        imageUrl = null;
      }

      db.Post.create({
        message: req.body.message,
        link: req.body.link,
        imageUrl: imageUrl,
        UserId: user.id,
      })
        .then((newPost) => {
          console.log(newPost);
          res
            .status(201)
            .json({ post: newPost, messageRetour: "Votre post est ajouté" });
        })
        .catch((err) => {
          res.status(400).send({ error: "Erreur " });
        });
    })
    .catch((err) => {
      res.status(500).send({ error: "Erreur serveur" });
    });
};
exports.deletePost = async (req, res) => {
  try {
    const userId = token.getUserId(req);
    console.log(userId);
    const postId = parseInt(req.params.id);
    console.log(postId);
    const checkAdmin = await db.User.findOne({ where: { id: userId } });

    const post = await db.Post.findOne({ where: { id: req.params.id } });
    console.log(post.userId);
    if (userId === post.UserId || checkAdmin.admin === true) {
      if (post.imageUrl) {
        const filename = post.imageUrl.split("/upload")[1];
        console.log(post.imageUrl);
        fs.unlink(`upload/${filename}`, () => {
          db.Post.destroy({ where: { id: post.id } });
          res.status(200).json({ message: "Post supprimé" });
        });
      } else {
        db.Post.destroy({ where: { id: post.id } }, { truncate: true });
        res.status(200).json({ message: "Post supprimé" });
      }
    } else {
      res.status(400).json({ message: "Vous n'avez pas les droits requis" });
    }
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" });
  }
};

exports.updatePost = async (req, res) => {
  try {
    let newImageUrl;
    const userId = token.getUserId(req);
    if (req.file) {
      newImageUrl = `${req.protocol}://${req.get("host")}/upload/${
        req.file.filename
      }`;
    }
    let post = await db.Post.findOne({ where: { id: req.params.id } });
    if (userId === post.UserId) {
      if (post.imageUrl) {
        const filename = post.imageUrl.split("/upload")[1];
        fs.unlink(`upload/${filename}`, (err) => {
          if (err) console.log(err);
          else {
            console.log(`Deleted file: upload/${filename}`);
          }
        });
      }
      post.message = req.body.message;
      post.link = req.body.link;
      post.imageUrl = newImageUrl;
      const newPost = await post.save({
        fields: ["message", "link", "imageUrl"],
      });

      res.status(200).json({ newPost: newPost, messageRetour: "post modifié" });
    } else {
      res.status(400).json({ message: "Vous n'avez pas les droits requis" });
    }
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" });
  }
};

exports.likePost = async (req, res, next) => {
  try {
    const userId = token.getUserId(req);
    const postId = req.params.id;
    const user = await db.Like.findOne({
      where: { UserId: userId, PostId: postId },
    });
    if (user) {
      await db.Like.destroy(
        { where: { UserId: userId, PostId: postId } },
        { truncate: true, restartIdentity: true }
      );
      console.log("le like est annulé");
      res
        .status(200)
        .send({ messageRetour: "vou n'aimez plus ce post", isLiked: false });
    } else {
      const newLike = await db.Like.create({
        UserId: userId,
        PostId: postId,
      });
      res
        .status(201)
        .json({ messageRetour: "vous aimez ce post", isLiked: true });
    }
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" });
  }
};
exports.addComment = async (req, res) => {
  try {
    const userId = token.getUserId(req);
    const comment = req.body.commentMessage;
    const pseudo = req.body.commentPseudo;
    const postId = parseInt(req.params.id);
    const newComment = await db.Comment.create({
      message: comment,
      pseudo: pseudo,
      UserId: userId,
      PostId: postId,
    });

    res
      .status(201)
      .json({ newComment, messageRetour: "votre commentaire est publié" });
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" });
  }
};
exports.deleteComment = async (req, res) => {
  try {
    const userId = token.getUserId(req);
    console.log(userId);
    const checkAdmin = await db.User.findOne({ where: { id: userId } });
    const comment = await db.Comment.findOne({ where: { id: req.params.id } });
    console.log(req.params.id);
    if (userId === comment.UserId || checkAdmin.admin === true) {
      db.Comment.destroy({ where: { id: req.params.id } }, { truncate: true });
      res.status(200).json({ message: "commentaire supprimé" });
    } else {
      res.status(400).json({ message: "Vous n'avez pas les droits requis" });
    }
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" });
  }
};
