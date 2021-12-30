const express = require("express"***REMOVED***
const authHandler = require("../middleware/authHandler"***REMOVED***
const db = require("../models"***REMOVED***

const app = express.Router(***REMOVED***

app.post("/v1/save", authHandler(), async (req, res, next) => {
  try {
    const { name ***REMOVED*** = req.body;

    await db.Contacted.create({
      name,
      userId: res.locals.userId,
    ***REMOVED******REMOVED***

    res.sendStatus(200***REMOVED***
  ***REMOVED*** catch (error) {
    next(error***REMOVED***
  ***REMOVED***
***REMOVED******REMOVED***

app.get("/v1/", authHandler(), async (req, res, next) => {
  try {
    const contacteds = await db.Contacted.findAll({
      where: {
        userId: res.locals.userId,
      ***REMOVED***,
    ***REMOVED******REMOVED***

    res.send(contacteds***REMOVED***
  ***REMOVED*** catch (error) {
    next(error***REMOVED***
  ***REMOVED***
***REMOVED******REMOVED***

module.exports = app;
