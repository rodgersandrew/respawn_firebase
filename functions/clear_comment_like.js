const admin = require("firebase-admin");

module.exports = async (req, res) => {
  const { uid, commentID } = req.body;

  if (!uid || !commentID) {
    return res.status(422).send({
      success: false,
      payload: { uid: uid, commentID: commentID },
      error: "User token and Comment ID are both required"
    });
  }

  const request = {
    userID: uid,
    commentID: commentID
  };

  const commentRef = admin.database().ref(`comments/${commentID}`);
  const commentLikeRef = admin
    .database()
    .ref(`comments/${commentID}/likes/${uid}`)
    .remove();

  await commentRef
    .child("likesCount")
    .once("value", async snapshot => {
      const countToChange = 1;

      const newLikesCount = snapshot.val() - 1;
      await commentRef.update({ likesCount: newLikesCount });

      res.send({ success: true });
    })
    .catch(err => {
      return res.status(422).send({ success: false, error: err });
    });
};
