const admin = require('firebase-admin');

module.exports = async (req, res) => {
  const {
    comment,
    commentID,
    ownerID,
    postID,
    reportedByID,
    reportReason
  } = req.body;

  if (
    !(comment && commentID && ownerID && postID && reportReason && reportedByID)
  ) {
    console.log(req.body);
    return res
      .status(422)
      .send({ success: false, error: 'Not a valid payload to submit' });
  }

  const request = {
    commentID: commentID,
    ownerID: ownerID,
    postID: postID,
    reportedByID: reportedByID,
    comment: comment,
    reportReason: reportReason
  };

  const commentReportRef = admin.database().ref(`reports/comments`);

  let commentRes = await commentReportRef.push(request);

  return res.send({
    success: true,
    commentRef: commentRes,
    payload: request
  });
};
