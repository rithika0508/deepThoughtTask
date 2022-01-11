const express = require("express");
const request = require("request");
const cheerio = require("cheerio");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.post("/scrape-meta-data", async (req, res) => {
  const url = req.body.url;
  request(url, function (error, response, body) {
    if (error) {
      res.status(500).json({
        success: true,
      });
    }
    $ = cheerio.load(body)
    $title = $("title").text(),
    $desc = $('meta[name="description"]').attr("content"),
    $ogImage = $('meta[property="og:image"]').attr("content"),
    $ogTitle = $('meta[property="og:title"]').attr("content"),
    $images = $("img");


    console.log($title, $desc, $ogTitle, $ogImage, $images);
    const resObj = {
      title: $title && $title,
      ogTitle: $ogTitle && $ogTitle,
      description: $desc && $desc,
      ogImage: $ogImage && $ogImage,
    };

    if ($images && $images.length) {
      resObj.images = [];
      for (var i = 0; i < $images.length; i++) {
        resObj.images.push($($images[i]).attr("src"));
      }
    }
    res.status(200).json(resObj)
  });
});

app.listen(PORT, () => {
  console.log(`server is on port ${PORT}`);
});
