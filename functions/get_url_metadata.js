const fetch = require('node-fetch');
var ogs = require('open-graph-scraper');

module.exports = async (req, res) => {
  if (!req.body.url) {
    return res
      .status(422)
      .send({ success: false, error: 'No valid URL was provided' });
  }

  const { url } = req.body;
  console.log(url);

  var options = { url: url, timeout: 4000 };
  ogs(options, function(error, results) {
    if (error) {
      return res.status(422).send({
        success: false,
        error: 'Could not get tags from URL provided'
      });
    }
    const { ogSiteName, ogVideo } = results.data;
    res.send({ success: true, source: { name: ogSitename, media: ogVideo } });
  });
};
