const express = require("express"***REMOVED***
const { uploadLogo, uploadBanner, deleteObject ***REMOVED*** = require("../libs/aws"***REMOVED***
const authHandler = require("../middleware/authHandler"***REMOVED***

const anyUploadLogo = uploadLogo.any(***REMOVED***
const anyUploadBanner = uploadBanner.any(***REMOVED***

const app = express.Router(***REMOVED***

app.post("/v1/logo", authHandler(), (req, res, next) => {
  anyUploadLogo(req, res, (err) => {
    if (err) {
      return res.status(422).send({
        errors: [{ title: "Image Upload Error", detail: err.message ***REMOVED***],
      ***REMOVED******REMOVED***
    ***REMOVED***
    for (let i = 0; i < req.files.length; i++) {
      res.send({
        original: req.files[0].transforms[0].location,
      ***REMOVED******REMOVED***
    ***REMOVED***
  ***REMOVED******REMOVED***
***REMOVED******REMOVED***

app.post("/v1/banner", authHandler(), (req, res, next) => {
  anyUploadBanner(req, res, (err) => {
    if (err) {
      return res.status(422).send({
        errors: [{ title: "Image Upload Error", detail: err.message ***REMOVED***],
      ***REMOVED******REMOVED***
    ***REMOVED***
    for (let i = 0; i < req.files.length; i++) {
      res.send({
        original: req.files[0].transforms[0].location,
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
