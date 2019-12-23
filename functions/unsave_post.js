const admin = require('firebase-admin');

module.exports = async (req, res) => {
  const { uid, postID } = req.body;

  if (!uid || !postID) {
    return res.status(422).send({
      success: false,
      payload: { uid: uid, postID: postID },
      error: 'User token and Post ID are both required'
    });
  }

  const postSavedRef = admin.database().ref(`users/${uid}/saved`);

  try {
    let savedKey = await postSavedRef
      .orderByChild('postID')
      .equalTo(postID)
      .once('value');

    const db = admin.database();
    savedKey.forEach(savedChild => {
      db.ref(`users/${uid}/saved/${savedChild.key}`).remove();
    });

    return res.send({ success: true });
  } catch (error) {
    return res.status(422).send({ success: false, error: error });
  }
};
