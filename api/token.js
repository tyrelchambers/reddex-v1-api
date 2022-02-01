const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express.Router()

app.get('/v1/postToken', async (req, res, next) => {
  try {
    let token = req.headers.postToken;

    if (!token) {
      token = uuidv4()
    }

    res.send({ postToken: token })
  } catch (error) {
    next(error)
  }
})

module.exports = app