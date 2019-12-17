const admin = require('firebase-admin');

module.exports = async (req, res) => {
  const { postID, reportedByID, reportReason } = req.body;

  if (!(postID && reportReason && reportedByID)) {
    console.log(req.body);
    return res
      .status(422)
      .send({ success: false, error: 'Not a valid payload to submit' });
  }

  const request = {
    postID: postID,
    reportedByID: reportedByID,
    reportReason: reportReason
  };

  const postReportRef = admin.database().ref(`reports/posts`);

  let postRes = await postReportRef.push(request);

  return res.send({
    success: true,
    postRef: postRes,
    payload: request
  });
};
