const admin = require('firebase-admin');
const uuid = require('uuid/v4');

module.exports = async (req, res) => {
  const { postID, userID, comment } = req.body;

  if (!postID) {
    return res
      .status(422)
      .send({ success: false, error: 'Could not find post. Try Again.' });
  } else if (!userID) {
    return res
      .status(422)
      .send({ error: 'You must have an account to do that' });
  } else if (!comment) {
    return res
      .status(422)
      .send({ success: false, error: 'No comment provided' });
  }

  //   const commentUUID = uuid();
  const commentRef = admin.database().ref(`comments`);
  const userProfileRef = admin.database().ref(`users/${userID}/profile`);

  let userProf = await userProfileRef.once('value');

  const commentRequest = {
    postID: postID,
    owner: userID,
    ownerProfile: { ...userProf.val() },
    comment: comment,
    createdAt: admin.database.ServerValue.TIMESTAMP,
    likesCount: 0
  };

  let commentRes = await commentRef.push(commentRequest);
  return res.send({
    success: true,
    commentRef: commentRes,
    payload: commentRequest
  });
};
