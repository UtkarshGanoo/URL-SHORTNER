const express =require("express");
const {handlegenerateNewShortURL,handleGetAnalytics}=require("../controller/url");
const router =express.Router();

router.post("/",handlegenerateNewShortURL);
router.get("/analytics/:shortId",handleGetAnalytics);


module.exports= router;