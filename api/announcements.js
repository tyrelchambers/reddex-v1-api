const { default: axios } = require('axios');
const express = require('express');
const {authHandler}=require('../middleware/authHandler')
const app = express.Router()

app.get('/v1/', authHandler, async (req, res, next) => {
  try {
    const posts = await axios.get(`https://api.storyblok.com/v1/cdn/stories/home?version=published&token=${process.env.STORYBLOK_TOKEN}`)
  } catch (error) {
    next(error)
  }
})

module.exports = app;