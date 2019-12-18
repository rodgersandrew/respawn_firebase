const admin = require('firebase-admin');

module.exports = async (req, res) => {
  const { postID } = req.body;

  if (!postID) {
    return res
      .status(422)
      .send({ success: false, error: 'No post ID provided.' });
  }

  try {
    const db = admin.database();
    const postRef = db.ref(`posts/${postID}`);

    let ownerID = (await postRef.child('owner').once('value')).val();

    const userPostRef = db.ref(`users/${ownerID}/posts/${postID}`);
    const usersRef = db.ref('users').orderByChild(`likes/${postID}`);
    const commentRef = db
      .ref('comments')
      .orderByChild('postID')
      .equalTo(postID);

    let users = await usersRef.once('value');
    usersLikedPost = [];
    users.forEach(user => {
      usersLikedPost.push(user.key);
    });

    let comments = await commentRef.once('value');
    commentsOnPost = [];
    comments.forEach(comment => {
      commentsOnPost.push(comment.key);
    });

    // remove post
    db.ref(`posts/${postID}`).remove();

    // remove post from user
    db.ref(`users/${ownerID}/posts/${postID}`).remove();

    // remove likes on post from users
    usersLikedPost.forEach(user => {
      db.ref(`users/${user}/likes/${postID}`).remove();
    });

    // remove comments on post
    commentsOnPost.forEach(commentID => {
      db.ref(`comments/${commentID}`).remove();
    });
  } catch (error) {
    return res.status(422).send({ success: false, error: error });
  }

  res.send({ success: true });
};
