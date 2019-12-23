const admin = require('firebase-admin');

module.exports = async (req, res) => {
  const { uid, postID } = req.body;

  if (!uid || !postID) {
    return res.status(422).send({
      success: false,
      error: 'userID and postID must be included in request'
    });
  }

  const request = {
    userID: uid,
    postID: postID,
    createdAt: admin.database.ServerValue.TIMESTAMP
  };

  const userSavedRef = admin.database().ref(`users/${uid}/saved`);

  let savedPostRes = await userSavedRef.push(request);
  return res.send({
    success: true,
    savedPostRef: savedPostRes,
    payload: request
  });
};
