const admin = require('firebase-admin');

module.exports = (req, res) => {
  if (!req.body.uid) {
    return res.status(422).send({ error: 'No valid user was provided' });
  }

  const { uid, profile } = req.body;

  admin
    .database()
    .ref(`users/${uid}`)
    .update({ profile }, () => {
      return res.send({ success: true });
    })
    .catch(err => {
      res.status(422).send({ error: err });
    });
};
