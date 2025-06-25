const shortid = require("shortid");
const URL = require("../model/url");

async function handlegenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url required" });
  const shortID = shortid();

  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
    createdBy:req.user._id,
  });
   
  return res.render("home",{
    id:shortID
  });
  // return res.json({ id: shortID }); // Return the created shortId
}
async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortID;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = {
  handlegenerateNewShortURL,
  handleGetAnalytics,
};
