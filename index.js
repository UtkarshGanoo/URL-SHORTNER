const express = require("express");
const path = require("path");
const cookieParser=require("cookie-parser")
const { connectTOMongoDB } = require("./connect");
const {/*restrictToLoggedinUserOnly,checkAuth*/ checkforAuthentication,restrictTo}=require("./middleware/auth")

const URL = require("./model/url");

const urlRoute = require("./routes/url");
const staticRoute=require("./routes/staticRouter");
const userRoute=require("./routes/user")

const app = express();
const PORT = 8001;

connectTOMongoDB("mongodb://localhost:27017/short-url").then(() =>
  console.log("mongoDBconnected")
);

app.set("view engine", "ejs");
app.set("views", path.resolve("./view"));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(checkforAuthentication);

// app.get("/test", async (req, res) => {
//   const allUrl = await URL.find({});
//   return res.render("home", { 
//     urls: allUrl,
//   });
// });

app.use("/url" /*restrictToLoggedinUserOnly*/,restrictTo(["NORMAL","ADMIN"]),urlRoute);
app.use("/user", userRoute);
app.use ("/"/*checkAuth*/ ,staticRoute);

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: { timestamp: Date.now() },
      },
    }
  );
  if (!entry) {
    return res.status(404).send("Short URL not found");
  }
  res.redirect(entry.redirectURL);
});
app.listen(PORT, () => console.log(`Server Started at Port:${PORT}`));
