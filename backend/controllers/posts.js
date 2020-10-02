const { Posts } = require('../models'); // accès tables
const { Users } = require('../models');
Users.hasMany(Posts, { foreignKey: 'user_id' });
Posts.belongsTo(Users, { foreignKey: 'user_id' });
exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Posts.findAll({
      include: Users,
    });

    console.log('All posts:', JSON.stringify(posts, null, 2));
    res.status(200).send({ posts });
  } catch (error) {
    return res.status(500).send({ error: 'Erreur serveur' });
  }
};
exports.createPost = async (req, res) => {
  try {
    const post = await Posts.create({
      title: req.body.title,
      message: req.body.message,
      url: req.body.url,
      user_id: req.body.user_id,
    });
    res.send(JSON.stringify(post));
    console.log('post:', JSON.stringify(post));
    //const postJson = await post.toJSON();
    // res.status(200).json({ postJson });
    /*  console.log(
      postJson.title,
      postJson.message,
      postJson.url,
      postJson.user_id
    ); */
  } catch (error) {
    return res.status(500).send({ error: 'Une erreur est survenue lors de la création du post' });
  }
};
