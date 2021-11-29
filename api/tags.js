const express = require("express"***REMOVED***
const authHandler = require("../middleware/authHandler"***REMOVED***
const { db ***REMOVED*** = require("../models/index"***REMOVED***

const app = express.Router(***REMOVED***

app.post("/v1/save", authHandler, async (req, res, next) => {
  try {
    const { tag ***REMOVED*** = req.body;

    await db.Tag.create({
      tag,
      userId: res.locals.userId,
    ***REMOVED******REMOVED***

    res.sendStatus(200***REMOVED***
  ***REMOVED*** catch (error) {
    next(error***REMOVED***
  ***REMOVED***
***REMOVED******REMOVED***

app.delete("/v1/:id/delete", authHandler, async (req, res, next) => {
  try {
    const { id ***REMOVED*** = req.params;
  ***REMOVED*** catch (error) {
    next(error***REMOVED***
  ***REMOVED***
***REMOVED******REMOVED***

app.get("/v1/", authHandler, async (req, res, next) => {
  try {
    console.log(db***REMOVED***
  ***REMOVED*** catch (error) {
    next(error***REMOVED***
  ***REMOVED***
***REMOVED******REMOVED***

module.exports = app;
