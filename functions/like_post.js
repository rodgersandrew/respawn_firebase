const admin = require('firebase-admin');
const uuid = require('uuid/v4');

module.exports = async (req, res) => {
  const { uid, postID } = req.body;

  if (!uid || !postID) {
    return res.status(422).send({
      success: false,
      payload: { uid: uid, postID: postID },
      error: 'User token and Post ID are both required'
    });
  }

  const request = {
    userID: uid,
    postID: postID
  };

  const postRef = admin.database().ref(`posts/${postID}`);

  await postRef
    .child('likes')
    .once('value', async snapshot => {
      const newLikesCount = snapshot.val() + 1;
      await postRef.update({ likes: newLikesCount });
    })
    .catch(err => {
      return res.status(422).send({ success: false, error: err });
    });

  const likedObj = {
    postID: postID,
    createdAt: admin.database.ServerValue.TIMESTAMP
  };

  const userLikeRef = admin.database().ref(`users/${uid}/likes/${postID}`);

  userLikeRef
    .update(likedObj, () => {
      return res.send({ success: true });
    })
    .catch(error => {
      res.status(422).send({ success: false, error: err });
    });
};
