const functions = require('firebase-functions');
const admin = require('firebase-admin');

const updateUserProfile = require('./update_user_profile');
const createPost = require('./create_post');
const getURLMetaData = require('./get_url_metadata');
const likePost = require('./like_post');
const unlikePost = require('./unlike_post');
const createComment = require('./create_comment');
const deleteComment = require('./delete_comment');
const reportComment = require('./report_comment');
const reportPost = require('./report_post');
const deletePost = require('./delete_post');
const savePost = require('./save_post');
const unsavePost = require('./unsave_post');

const serviceAccount = require('./config/firebase_admin.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://respawn-48469.firebaseio.com'
});

// User
exports.updateUserProfile = functions.https.onRequest(updateUserProfile);

// Posts
exports.createPost = functions.https.onRequest(createPost);
exports.likePost = functions.https.onRequest(likePost);
exports.unlikePost = functions.https.onRequest(unlikePost);
exports.getURLMetaData = functions.https.onRequest(getURLMetaData);
exports.reportPost = functions.https.onRequest(reportPost);
exports.deletePost = functions.https.onRequest(deletePost);
exports.savePost = functions.https.onRequest(savePost);
exports.unsavePost = functions.https.onRequest(unsavePost);

// Comments
exports.createComment = functions.https.onRequest(createComment);
exports.deleteComment = functions.https.onRequest(deleteComment);
exports.reportComment = functions.https.onRequest(reportComment);
