const { default: axios } = require('axios');
const express = require('express');
const authHandler=require('../middleware/authHandler')
const app = express.Router()

app.get('/v1/', authHandler, async (req, res, next) => {
  try {
    console.log('here,--------------------');
    // const posts = await axios.get(`https://api.storyblok.com/v1/cdn/stories/home?version=published&token=${process.env.STORYBLOK_TOKEN}`)
    // console.log(posts);

    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})

module.exports = app;