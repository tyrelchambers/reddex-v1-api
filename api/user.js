const express = require('express'***REMOVED***
const authHandler = require('../middleware/authHandler'***REMOVED***
const db = require('../models'***REMOVED***
const app = express.Router()
require('dotenv').config()

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

app.get('/v1/link-reddit', authHandler, async (req,res,next) => {
  try {
    const encode = window.btoa(
      `${process.env.REDDIT_APP***REMOVED***:${process.env.REDDIT_SECRET***REMOVED***`
    ***REMOVED***

    const redditTokens = await Axios.post(
      "https://www.reddit.com/api/v1/access_token",
      `grant_type=authorization_code&code=${token***REMOVED***&redirect_uri=${process.env.REACT_APP_REDIRECT***REMOVED***/signup`,

      {
        headers: {
          Authorization: `Basic ${encode***REMOVED***`,
          "Content-Type": "application/x-www-form-urlencoded",
        ***REMOVED***,
      ***REMOVED***
    )
      .then((res) => {
        return res.data;
      ***REMOVED***)
      .catch(console.log)

  ***REMOVED*** catch (error) {
    next(error)
  ***REMOVED***
***REMOVED***)

module.exports = app