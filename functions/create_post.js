const admin = require('firebase-admin');

module.exports = (req, res) => {
  if (!req.body.uid) {
    return res.status(422).send({ error: 'No valid user was provided' });
  }

  if (!req.body.post.media) {
    return res.status(422).send({ error: 'No media was received in post' });
  }

  const { uid, uuid, post } = req.body;

  const postRequest = {
    owner: uid,
    media: post.media,
    aspect: post.aspect,
    mediaType: post.type,
    tags: post.tags,
    createdAt: admin.database.ServerValue.TIMESTAMP
  };

  admin
    .database()
    .ref(`posts/${uuid}`)
    .update(postRequest, () => {
      admin
        .database()
        .ref(`users/${uid}/posts/${uuid}`)
        .update({ postID: uuid }, () => {
          return res.send({ success: true });
        });
    })
    .catch(error => {
      res.status(422).send({ success: false, error: err });
    });
};
