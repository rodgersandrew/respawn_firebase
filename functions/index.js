const functions = require('firebase-functions');
const admin = require('firebase-admin');

const updateUserProfile = require('./update_user_profile');
const createPost = require('./create_post');
const getURLMetaData = require('./get_url_metadata')

const serviceAccount = require('./config/firebase_admin.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://respawn-48469.firebaseio.com'
});

exports.updateUserProfile = functions.https.onRequest(updateUserProfile);

exports.createPost = functions.https.onRequest(createPost);

exports.getURLMetaData = functions.https.onRequest(getURLMetaData)
