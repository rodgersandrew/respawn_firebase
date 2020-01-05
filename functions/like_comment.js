const admin = require('firebase-admin');

module.exports = async (req, res) => {
  const { uid, commentID } = req.body;

  if (!uid || !commentID) {
    return res.status(422).send({
      success: false,
      payload: { uid: uid, commentID: commentID },
      error: 'User token and Comment ID are both required'
    });
  }

  const request = {
    userID: uid,
    commentID: commentID
  };

  const commentRef = admin.database().ref(`comments/${commentID}`);
  const commentDislikeRef = admin
    .database()
    .ref(`comments/${commentID}/dislikes/${uid}`);

  var userDislikesComment = false;

  commentDislikeRef.once('value', snapshot => {
    if (snapshot.val()) {
      userDislikesComment = true;
      commentDislikeRef.remove();
    }
  });

  await commentRef
    .child('likesCount')
    .once('value', async snapshot => {
      const countToChange = userDislikesComment ? 2 : 1;

      const newLikesCount = snapshot.val() ? snapshot.val() + countToChange : 1;
      await commentRef.update({ likesCount: newLikesCount });
    })
    .catch(err => {
      return res.status(422).send({ success: false, error: err });
    });

  const likedObj = {
    createdAt: admin.database.ServerValue.TIMESTAMP
  };

  const commentLikeRef = admin
    .database()
    .ref(`comments/${commentID}/likes/${uid}`);

  commentLikeRef
    .update(likedObj, () => {
      return res.send({ success: true });
    })
    .catch(error => {
      res.status(422).send({ success: false, error: err });
    });
};
