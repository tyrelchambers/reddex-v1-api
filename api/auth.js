const express = require("express"***REMOVED***
const signToken = require("../libs/signToken"***REMOVED***
const db = require("../models"***REMOVED***
const bcrypt = require("bcryptjs"***REMOVED***
const app = express.Router(***REMOVED***
const sendEmail = require("../emails/sendEmail"***REMOVED***
const stripe = require("../libs/stripe"***REMOVED***
const { addWeeks ***REMOVED*** = require("date-fns"***REMOVED***
const pricePlans = require("../constants/pricePlans"***REMOVED***
const addUserToSendGridContact = require("../libs/addUserToSendGridContact"***REMOVED***
const { emailTemplates ***REMOVED*** = require("../constants"***REMOVED***
const decodeToken = require("../libs/decodeToken"***REMOVED***

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
    if (!hashPassword) throw new Error("Password is incorrect"***REMOVED***

    const token = await signToken(user.uuid, "4w"***REMOVED***

    if (!user.email_confirmed) {
      sendEmail({
        to: user.email,
        subject: "Confirm your email",
        template: emailTemplates.confirmEmail,
        dynamics: {
          redirect_url: process.env.FRONT_END,
          token,
        ***REMOVED***,
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

    if (password.length < 8)
      throw new Error("Password must be at least 8 characters"***REMOVED***
    if (password.length > 255)
      throw new Error("Password must be less than 255 characters"***REMOVED***

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
      to: user.email,
      subject: "Confirm your email",
      template: emailTemplates.confirmEmail,
      dynamics: {
        redirect_url: process.env.FRONT_END,
        token,
      ***REMOVED***,
    ***REMOVED******REMOVED***

    addUserToSendGridContact(user***REMOVED***

    res.send({ user, token ***REMOVED******REMOVED***
  ***REMOVED*** catch (error) {
    next(error***REMOVED***
  ***REMOVED***
***REMOVED******REMOVED***

app.post("/v1/forgot-password", async (req, res, next) => {
  try {
    const { email ***REMOVED*** = req.body;

    const user = await db.User.findOne({
      where: {
        email,
      ***REMOVED***,
    ***REMOVED******REMOVED***

    if (!user) throw new Error("User not found"***REMOVED***

    const token = await signToken(user.uuid, "1m"***REMOVED***

    sendEmail({
      to: user.email,
      subject: "Reset your password",
      template: emailTemplates.forgotPassword,
      dynamics: {
        redirect_url: `${process.env.FRONT_END***REMOVED***/reset-password?token=${token***REMOVED***`,
      ***REMOVED***,
    ***REMOVED******REMOVED***

    res.sendStatus(200***REMOVED***
  ***REMOVED*** catch (error) {
    next(error***REMOVED***
  ***REMOVED***
***REMOVED******REMOVED***

app.post("/v1/reset-password", async (req, res, next) => {
  try {
    const { newPassword: password, token ***REMOVED*** = req.body;

    if (password.length < 8)
      throw new Error("Password must be at least 8 characters"***REMOVED***
    if (password.length > 255)
      throw new Error("Password must be less than 255 characters"***REMOVED***

    const userId = await decodeToken(token***REMOVED***

    const user = await db.User.findOne({
      where: {
        uuid: userId,
      ***REMOVED***,
    ***REMOVED******REMOVED***

    if (!user) throw new Error("User not found"***REMOVED***

    const hashPassword = bcrypt.hashSync(password, 10***REMOVED***

    user.password = hashPassword;

    await user.save(***REMOVED***

    res.sendStatus(200***REMOVED***
  ***REMOVED*** catch (error) {
    next(error***REMOVED***
  ***REMOVED***
***REMOVED******REMOVED***

module.exports = app;
