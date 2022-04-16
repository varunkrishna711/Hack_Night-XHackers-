const router = require("express").Router();
const Twitter = require("twitter");

const client = new Twitter({
  consumer_key: process.env.API_KEY,
  consumer_secret: process.env.API_KEY_SECRET,
  access_token_key: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

router.get("/2/tweets", async (req, res, next) => {
  try {
    const { id } = req.query;
    console.log(req.query);
    const response = await client.get(
      `https://api.twitter.com/2/tweets/${id}?expansions=author_id,attachments.media_keys&user.fields=profile_image_url,verified&tweet.fields=created_at,attachments,public_metrics,entities,source&media.fields=preview_image_url,url`,
      {}
    );
    res.send(response);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;

// https://api.twitter.com/2/tweets/${id}?expansions=author_id,attachments.media_keys&user.fields=profile_image_url,verified&tweet.fields=created_at,attachments,public_metrics,entities,source&media.fields=preview_image_url,url
