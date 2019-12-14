const functions = require('firebase-functions');
const admin = require('firebase-admin');

const updateUserProfile = require('./update_user_profile');
const createPost = require('./create_post');
const getURLMetaData = require('./get_url_metadata');
const likePost = require('./like_post');
const unlikePost = require('./unlike_post');
const createComment = require('./create_comment');

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

// Comments
exports.createComment = functions.https.onRequest(createComment);
