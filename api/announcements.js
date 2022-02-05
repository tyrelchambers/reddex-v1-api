const { default: axios } = require("axios");
const express = require("express");
const authHandler = require("../middleware/authHandler");
const app = express.Router();
const StoryblokClient = require("storyblok-js-client");

const Storyblok = new StoryblokClient({
  accessToken: process.env.STORYBLOK_TOKEN,
  cache: {
    clear: "auto",
    type: "memory",
  },
});

app.get("/v1/all", authHandler(), async (req, res, next) => {
  try {
    const posts = await Storyblok.get("cdn/stories/", {
      per_page: 2,
      page: 1,
    }).then((res) => res.data);

    res.send(posts);
  } catch (error) {
    next(error);
  }
});

module.exports = app;
