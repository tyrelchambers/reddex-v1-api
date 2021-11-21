const express = require('express'***REMOVED***
const authHandler = require('../middleware/authHandler'***REMOVED***
const db = require('../models'***REMOVED***
const app = express.Router()

app.get('/v1/me', authHandler, async (req, res, next) => {
  try {
    const userId = res.locals.userId;

    const user = await db.User.findOne({
      where: {
        uuid: userId,
      ***REMOVED***,
      attributes: {
        exclude: ["password"],
      ***REMOVED***,
    ***REMOVED******REMOVED***

    res.send(user***REMOVED*** 
  ***REMOVED*** catch (error) {
    next(error)
  ***REMOVED***
***REMOVED***)

module.exports = app