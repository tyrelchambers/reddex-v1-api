const express = require("express"***REMOVED***
const signToken = require("../libs/signToken"***REMOVED***
const db = require("../models"***REMOVED***
const bcrypt = require('bcryptjs')
const app = express.Router(***REMOVED***

app.get("/v1/login", async (req, res, next) => {
  try {
    const { email, password ***REMOVED*** = req.query;
    const user = await db.User.findOne({
      where: {
        email,
      ***REMOVED***,
    ***REMOVED******REMOVED***

    const hashPassword = await bcrypt.compareSync(password, user.password***REMOVED***
    if ( !hashPassword ) return next({ error: "Incorrect password"***REMOVED***)

    const token = await signToken(user.uuid, "4w"***REMOVED***

    res.send({ user, token ***REMOVED******REMOVED***
  ***REMOVED*** catch (error) {
    next(error***REMOVED***
  ***REMOVED***
***REMOVED******REMOVED***

app.post('/v1/register', async (req, res, next) => {
  try {
    const {email, password***REMOVED*** = req.body

    if (!(email || password)) throw new Error("Email or password are missing"***REMOVED***
    const existingUser = await db.User.findOne({
      where: {
        email,
      ***REMOVED***,
    ***REMOVED******REMOVED***

    if (existingUser) throw new Error("User already exists")

    const hashPassword = bcrypt.hashSync(password, 10***REMOVED***


    const user = await db.User.create({
      email,
      password: hashPassword
    ***REMOVED***)

    await db.Profile.create({
      userId: user.uuid
    ***REMOVED***)

    const token = await signToken(user.uuid, "1m")

    res.send({user, token***REMOVED***)
  ***REMOVED*** catch (error) {
    next(error)
  ***REMOVED***
***REMOVED***)

module.exports = app;