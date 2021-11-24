const express = require('express'***REMOVED***
const { v4: uuidv4 ***REMOVED*** = require('uuid'***REMOVED***

const app = express.Router()

app.get('/v1/postToken', async (req, res, next) => {
  try {
    let token = req.headers.postToken;

    if (!token) {
      token = uuidv4()
    ***REMOVED***

    res.send({ postToken: token ***REMOVED***)
  ***REMOVED*** catch (error) {
    next(error)
  ***REMOVED***
***REMOVED***)

module.exports = app