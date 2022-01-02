const express = require("express"***REMOVED***
const { upload, deleteObject ***REMOVED*** = require("../libs/aws"***REMOVED***
const authHandler = require("../middleware/authHandler"***REMOVED***

const anyUpload = upload.any(***REMOVED***

const app = express.Router(***REMOVED***

app.post("/save/logo", authHandler(), (req, res, next) => {
  anyUpload(req, res, (err) => {
    if (err) {
      return res.status(422).send({
        errors: [{ title: "Image Upload Error", detail: err.message ***REMOVED***],
      ***REMOVED******REMOVED***
    ***REMOVED***
    for (let i = 0; i < req.files.length; i++) {
      res.send({
        original: req.files[0].transforms[1].location,
        thumbnail: req.files[0].transforms[0].location,
      ***REMOVED******REMOVED***
    ***REMOVED***
  ***REMOVED******REMOVED***
***REMOVED******REMOVED***

app.post("/save/banner", authHandler(), (req, res, next) => {
  anyUpload(req, res, (err) => {
    if (err) {
      return res.status(422).send({
        errors: [{ title: "Image Upload Error", detail: err.message ***REMOVED***],
      ***REMOVED******REMOVED***
    ***REMOVED***
    for (let i = 0; i < req.files.length; i++) {
      res.send({
        original: req.files[0].transforms[1].location,
      ***REMOVED******REMOVED***
    ***REMOVED***
  ***REMOVED******REMOVED***
***REMOVED******REMOVED***

app.delete("/revert", authHandler(), async (req, res, next) => {
  try {
    const { url ***REMOVED*** = req.query;
    await deleteObject(url***REMOVED***

    res.sendStatus(200***REMOVED***
  ***REMOVED*** catch (err) {
    next(err***REMOVED***
  ***REMOVED***
***REMOVED******REMOVED***

module.exports = app;
