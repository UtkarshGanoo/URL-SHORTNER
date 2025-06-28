const shortid = require("shortid");
const qrcode =require("qrcode");
const URL = require("../model/url");

async function handlegenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url required" });
  const shortID = shortid();

  const shortUrl = `${req.protocol}://${req.get("host")}/url/${shortID}`;
  const qrImage = await qrcode.toDataURL(shortUrl);

  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
    createdBy:req.user._id,
  });
    const allurls = await URL.find({ createdBy: req.user._id });
  return res.render("home",{
    urls: allurls,
    shortUrl,
    qrImage,
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
