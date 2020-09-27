exports.signup = (req, res, next) => {
  res.send({
    message: `Hello ${req.body.pseudo} votre compte est créé !`,
  });
};

/* app.post("/api/register", (req, res) => {
    res.send({ message: `Hello ${ req.body.prenom} votre compte est créé !` });
  }); */
