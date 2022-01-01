const express = require("express"***REMOVED***
const signToken = require("../libs/signToken"***REMOVED***
const db = require("../models"***REMOVED***
const bcrypt = require("bcryptjs"***REMOVED***
const app = express.Router(***REMOVED***
const sendEmail = require("../libs/sendEmail"***REMOVED***
const stripe = require("../libs/stripe"***REMOVED***
const { addWeeks ***REMOVED*** = require("date-fns"***REMOVED***
const pricePlans = require("../constants/pricePlans"***REMOVED***

app.get("/v1/login", async (req, res, next) => {
  try {
    const { email, password ***REMOVED*** = req.query;

    const user = await db.User.findOne({
      where: {
        email,
      ***REMOVED***,
      include: [db.Profile],
    ***REMOVED******REMOVED***

    if (!user) throw new Error("User not found"***REMOVED***

    const hashPassword = await bcrypt.compareSync(password, user.password***REMOVED***
    if (!hashPassword) return next({ error: "Incorrect password" ***REMOVED******REMOVED***

    const token = await signToken(user.uuid, "4w"***REMOVED***

    if (!user.email_confirmed) {
      sendEmail({
        email,
        subject: "Confirm your email",
        token,
      ***REMOVED******REMOVED***
    ***REMOVED***

    res.send({ user, token ***REMOVED******REMOVED***
  ***REMOVED*** catch (error) {
    next(error***REMOVED***
  ***REMOVED***
***REMOVED******REMOVED***

app.post("/v1/register", async (req, res, next) => {
  try {
    const { email, password, plan, term ***REMOVED*** = req.body;

    if (!(email || password)) throw new Error("Email or password are missing"***REMOVED***
    if (!(plan || term)) throw new Error("Plan or term are missing"***REMOVED***

    const existingUser = await db.User.findOne({
      where: {
        email,
      ***REMOVED***,
      include: [db.Profile],
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

    const customer = await stripe.customers.create({
      email,
    ***REMOVED******REMOVED***

    // start customer on pro monthly trial
    const sub = await stripe.subscriptions.create({
      customer: customer.id,
      items: [
        {
          price: pricePlans.pro.monthly,
        ***REMOVED***,
      ],
      trial_end: addWeeks(new Date(Date.now()), 1),
    ***REMOVED******REMOVED***

    await db.Subscription.create({
      customerId: customer.id,
      subscriptionId: sub.id,
      userId: user.uuid,
      plan,
      term,
    ***REMOVED******REMOVED***

    const token = await signToken(user.uuid, "1m"***REMOVED***

    sendEmail({
      email,
      subject: "Confirm your email",
      token,
    ***REMOVED******REMOVED***

    res.send({ user, token ***REMOVED******REMOVED***
  ***REMOVED*** catch (error) {
    next(error***REMOVED***
  ***REMOVED***
***REMOVED******REMOVED***

module.exports = app;
