const express = require("express"***REMOVED***
const authHandler = require("../middleware/authHandler"***REMOVED***
const db = require("../models"***REMOVED***

const app = express.Router(***REMOVED***

app.post("/v1/save", authHandler(), async (req, res, next) => {
  try {
    const { tag, stories ***REMOVED*** = req.body;

    const newTags = await db.Tag.create({
      tag: tag.tag,
      userId: res.locals.userId,
    ***REMOVED******REMOVED***

    newTags.setStories(stories***REMOVED***

    res.sendStatus(200***REMOVED***
  ***REMOVED*** catch (error) {
    next(error***REMOVED***
  ***REMOVED***
***REMOVED******REMOVED***

app.delete("/v1/:id/delete", authHandler(), async (req, res, next) => {
  try {
    const { id ***REMOVED*** = req.params;

    await db.Tag.destroy({
      where: {
        uuid: id,
        userId: res.locals.userId,
      ***REMOVED***,
    ***REMOVED******REMOVED***

    res.sendStatus(200***REMOVED***
  ***REMOVED*** catch (error) {
    next(error***REMOVED***
  ***REMOVED***
***REMOVED******REMOVED***

app.put("/v1/edit", authHandler(), async (req, res, next) => {
  try {
    const { tag, stories ***REMOVED*** = req.body;

    await db.Tag.update(
      {
        tag: tag.tag,
      ***REMOVED***,
      {
        where: {
          uuid: tag.uuid,
          userId: res.locals.userId,
        ***REMOVED***,
        returning: true,
        plain: true,
      ***REMOVED***
    ***REMOVED***

    const tagToAddStoryTo = await db.Tag.findOne({
      where: {
        uuid: tag.uuid,
        userId: res.locals.userId,
      ***REMOVED***,
    ***REMOVED******REMOVED***

    tagToAddStoryTo.setStories(stories***REMOVED***

    res.sendStatus(200***REMOVED***
  ***REMOVED*** catch (error) {
    next(error***REMOVED***
  ***REMOVED***
***REMOVED******REMOVED***

app.get("/v1/:uuid", authHandler(), async (req, res, next) => {
  try {
    const { uuid ***REMOVED*** = req.params;

    const tag = await db.Tag.findOne({
      where: {
        uuid,
      ***REMOVED***,
      include: ["stories"],
    ***REMOVED******REMOVED***

    res.send(tag***REMOVED***
  ***REMOVED*** catch (error) {
    next(error***REMOVED***
  ***REMOVED***
***REMOVED******REMOVED***

app.get("/v1/", authHandler(), async (req, res, next) => {
  try {
    const tags = await db.Tag.findAll({
      where: {
        userId: res.locals.userId,
      ***REMOVED***,
      include: ["stories"],
    ***REMOVED******REMOVED***

    res.send(tags***REMOVED***
  ***REMOVED*** catch (error) {
    next(error***REMOVED***
  ***REMOVED***
***REMOVED******REMOVED***

module.exports = app;
