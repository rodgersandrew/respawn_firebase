const admin = require('firebase-admin');

module.exports = async (req, res) => {
  const { commentID } = req.body;

  admin
    .database()
    .ref(`comments/${commentID}`)
    .remove()
    .then(() => {
      return res.send({ success: true });
    })
    .catch(err => {
      return res.status(422).send({ success: false, error: err });
    });
};
