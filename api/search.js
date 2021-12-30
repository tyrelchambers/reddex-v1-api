const express = require("express"***REMOVED***
const authHandler = require("../middleware/authHandler"***REMOVED***
const db = require("../models"***REMOVED***

const app = express.Router(***REMOVED***

app.post("/v1/save", authHandler(), async (req, res, next) => {
  try {
    const { subreddit ***REMOVED*** = req.body.data;

    const existingSearched = await db.Searched.findOne({
      where: {
        subreddit,
        userId: res.locals.userId,
      ***REMOVED***,
    ***REMOVED******REMOVED***

    if (existingSearched || !subreddit) return res.sendStatus(200***REMOVED***

    await db.Searched.create({
      subreddit,
      userId: res.locals.userId,
    ***REMOVED******REMOVED***

    res.sendStatus(200***REMOVED***
  ***REMOVED*** catch (error) {
    next(error***REMOVED***
  ***REMOVED***
***REMOVED******REMOVED***

app.delete("/v1/", authHandler(), async (req, res, next) => {
  try {
    const { id, subreddit ***REMOVED*** = req.query;

    await db.Searched.destroy({
      where: {
        id,
        userId: res.locals.userId,
        subreddit,
      ***REMOVED***,
    ***REMOVED******REMOVED***

    res.sendStatus(200***REMOVED***
  ***REMOVED*** catch (error) {
    next(error***REMOVED***
  ***REMOVED***
***REMOVED******REMOVED***

app.get("/v1/", authHandler(), async (req, res, next) => {
  try {
    const searches = await db.Searched.findAll({
      where: {
        userId: res.locals.userId,
      ***REMOVED***,
    ***REMOVED******REMOVED***

    res.send(searches***REMOVED***
  ***REMOVED*** catch (error) {
    next(error***REMOVED***
  ***REMOVED***
***REMOVED******REMOVED***

module.exports = app;
