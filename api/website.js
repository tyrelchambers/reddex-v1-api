const express = require("express"***REMOVED***
const authHandler = require("../middleware/authHandler"***REMOVED***
const db = require("../models"***REMOVED***

const app = express.Router(***REMOVED***

app.put("/v1/update", authHandler, async (req, res, next) => {
  try {
    let website = await db.Website.findOne({
      where: {
        userId: res.locals.userId,
      ***REMOVED***,
    ***REMOVED******REMOVED***

    if (!website) {
      website = await db.Website.create({
        userId: res.locals.userId,
      ***REMOVED******REMOVED***
    ***REMOVED***

    await website.update({ config: { ...req.body ***REMOVED*** ***REMOVED******REMOVED***
    await website.save(***REMOVED***

    res.sendStatus(200***REMOVED***
  ***REMOVED*** catch (error) {
    next(error***REMOVED***
  ***REMOVED***
***REMOVED******REMOVED***

app.get("/v1/:subdomain", async (req, res, next) => {
  try {
    const { subdomain ***REMOVED*** = req.params;
    console.log(subdomain***REMOVED***
    const website = await db.Website.findOne({
      where: {
    ***REMOVED***: {
          general: {
            domain: subdomain,
          ***REMOVED***,
        ***REMOVED***,
      ***REMOVED***,
    ***REMOVED******REMOVED***

    if (!website) {
      return res.sendStatus(404***REMOVED***
    ***REMOVED***

    res.send(website.config***REMOVED***
  ***REMOVED*** catch (error) {
    next(error***REMOVED***
  ***REMOVED***
***REMOVED******REMOVED***

app.get("/v1/me", authHandler, async (req, res, next) => {
  try {
    const website = await db.Website.findOne({
      where: {
        userId: res.locals.userId,
      ***REMOVED***,
    ***REMOVED******REMOVED***

    res.send(website***REMOVED***
  ***REMOVED*** catch (error) {
    next(error***REMOVED***
  ***REMOVED***
***REMOVED******REMOVED***

module.exports = app;
