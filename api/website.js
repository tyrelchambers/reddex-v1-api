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

      await db.User.update(
        {
          websiteId: website.uuid,
        ***REMOVED***,
        {
          where: {
            uuid: res.locals.userId,
          ***REMOVED***,
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***

    await website.update({ config: { ...req.body ***REMOVED*** ***REMOVED******REMOVED***
    await website.save(***REMOVED***

    res.sendStatus(200***REMOVED***
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

app.get("/v1/checkSubdomain", async (req, res, next) => {
  try {
    const { subdomain ***REMOVED*** = req.query;

    const website = await db.Website.findOne({
      where: {
    ***REMOVED***: {
          general: {
            domain: subdomain,
          ***REMOVED***,
        ***REMOVED***,
      ***REMOVED***,
    ***REMOVED******REMOVED***

    if (website) {
      return res.send({ isDomainTaken: true ***REMOVED******REMOVED***
    ***REMOVED***

    res.send({ isDomainTaken: false ***REMOVED******REMOVED***
  ***REMOVED*** catch (error) {
    next(error***REMOVED***
  ***REMOVED***
***REMOVED******REMOVED***

app.post("/v1/submitStory", async (req, res, next) => {
  try {
    const { title, email, content, author, sentToOthers, siteOwner ***REMOVED*** = req.body;

    await db.SubmittedStory.create({
      story_title: title,
      email,
      body: content,
      author,
      sentToOthers,
      userId: siteOwner,
    ***REMOVED******REMOVED***

    res.sendStatus(200***REMOVED***
  ***REMOVED*** catch (error) {
    next(error***REMOVED***
  ***REMOVED***
***REMOVED******REMOVED***

app.get("/v1/:subdomain", async (req, res, next) => {
  try {
    const { subdomain ***REMOVED*** = req.params;
    const website = await db.Website.findOne({
      where: {
    ***REMOVED***: {
          general: {
            domain: subdomain,
          ***REMOVED***,
        ***REMOVED***,
      ***REMOVED***,
      include: [
        {
          model: db.User,
          as: "user",
          attributes: ["uuid"],
        ***REMOVED***,
      ],
    ***REMOVED******REMOVED***

    if (!website) {
      return res.sendStatus(404***REMOVED***
    ***REMOVED***

    res.send(website***REMOVED***
  ***REMOVED*** catch (error) {
    next(error***REMOVED***
  ***REMOVED***
***REMOVED******REMOVED***

module.exports = app;
