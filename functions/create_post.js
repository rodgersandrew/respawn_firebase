const admin = require('firebase-admin');

module.exports = (req, res) => {
  if (!req.body.uid) {
    return res.status(422).send({ error: 'No valid user was provided' });
  }

  if (!req.body.post.media) {
    return res.status(422).send({ error: 'No media was received in post' });
  }

  const { uid, uuid, post } = req.body;

  console.log({ post });

  admin
    .database()
    .ref(`users/${uid}/posts/${uuid}`)
    .update(({ post }), () => {
      return res.send({ success: true });
    })
    .catch(error => {
      res.status(422).send({ success: false, error: err });
    });
};
