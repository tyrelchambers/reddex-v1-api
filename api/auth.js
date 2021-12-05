const express = require("express"***REMOVED***
const signToken = require("../libs/signToken"***REMOVED***
const db = require("../models"***REMOVED***
const bcrypt = require("bcryptjs"***REMOVED***
const app = express.Router(***REMOVED***
const sgMail = require("@sendgrid/mail"***REMOVED***
const { emailTemplates ***REMOVED*** = require("../constants"***REMOVED***

sgMail.setApiKey(process.env.SENDGRID_API_KEY***REMOVED***

app.get("/v1/login", async (req, res, next) => {
  try {
    const { email, password ***REMOVED*** = req.query;
    const user = await db.User.findOne({
      where: {
        email,
      ***REMOVED***,
    ***REMOVED******REMOVED***

    const hashPassword = await bcrypt.compareSync(password, user.password***REMOVED***
    if (!hashPassword) return next({ error: "Incorrect password" ***REMOVED******REMOVED***

    const token = await signToken(user.uuid, "4w"***REMOVED***

    res.send({ user, token ***REMOVED******REMOVED***
  ***REMOVED*** catch (error) {
    next(error***REMOVED***
  ***REMOVED***
***REMOVED******REMOVED***

app.post("/v1/register", async (req, res, next) => {
  try {
    const { email, password ***REMOVED*** = req.body;

    const msg = {
      to: email, // Change to your recipient
      from: "services@reddex.app", // Change to your verified sender
      subject: "Confirm your email",
      templateId: emailTemplates.confirmEmail,
      dynamic_template_data: {***REMOVED***,
    ***REMOVED***;

    if (!(email || password)) throw new Error("Email or password are missing"***REMOVED***

    const existingUser = await db.User.findOne({
      where: {
        email,
      ***REMOVED***,
    ***REMOVED******REMOVED***

    if (existingUser) throw new Error("User already exists"***REMOVED***

    const hashPassword = bcrypt.hashSync(password, 10***REMOVED***

    const user = await db.User.create({
      email,
      password: hashPassword,
    ***REMOVED******REMOVED***

    await db.Profile.create({
      userId: user.uuid,
    ***REMOVED******REMOVED***

    sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent"***REMOVED***
      ***REMOVED***)
      .catch((error) => {
        console.error(error***REMOVED***
      ***REMOVED******REMOVED***

    const token = await signToken(user.uuid, "1m"***REMOVED***

    res.send({ user, token ***REMOVED******REMOVED***
  ***REMOVED*** catch (error) {
    next(error***REMOVED***
  ***REMOVED***
***REMOVED******REMOVED***

module.exports = app;
