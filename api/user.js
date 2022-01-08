const { default: axios ***REMOVED*** = require("axios"***REMOVED***
const express = require("express"***REMOVED***
const authHandler = require("../middleware/authHandler"***REMOVED***
const db = require("../models"***REMOVED***
const app = express.Router(***REMOVED***
const jwt = require("jsonwebtoken"***REMOVED***
require("dotenv").config(***REMOVED***
const bcrypt = require("bcryptjs"***REMOVED***
const sendEmail = require("../emails/sendEmail"***REMOVED***
const { emailTemplates ***REMOVED*** = require("../constants"***REMOVED***

app.get("/v1/me", authHandler(), async (req, res, next) => {
  try {
    const userId = res.locals.userId;

    const user = await db.User.findOne({
      where: {
        uuid: userId,
      ***REMOVED***,
      attributes: {
        exclude: ["password"],
      ***REMOVED***,
      include: [db.Profile, db.Searched],
    ***REMOVED******REMOVED***

    res.send(user***REMOVED***
  ***REMOVED*** catch (error) {
    next(error***REMOVED***
  ***REMOVED***
***REMOVED******REMOVED***

app.get("/v1/link-reddit", authHandler(), async (req, res, next) => {
  try {
    const { code ***REMOVED*** = req.query;

    const encode = Buffer.from(
      `${process.env.REDDIT_APP***REMOVED***:${process.env.REDDIT_SECRET***REMOVED***`
    ).toString("base64"***REMOVED***

    const { refresh_token ***REMOVED*** = await axios
      .post(
        "https://www.reddit.com/api/v1/access_token",
        `grant_type=authorization_code&code=${code***REMOVED***&redirect_uri=${process.env.REDDIT_REDIRECT***REMOVED***`,

        {
          headers: {
            Authorization: `Basic ${encode***REMOVED***`,
            "Content-Type": "application/x-www-form-urlencoded",
          ***REMOVED***,
        ***REMOVED***
      )
      .then((res) => {
        return res.data;
      ***REMOVED******REMOVED***

    await db.User.update(
      {
        reddit_refresh_token: refresh_token,
      ***REMOVED***,
      {
        where: {
          uuid: res.locals.userId,
        ***REMOVED***,
      ***REMOVED***
    ***REMOVED***

    res.sendStatus(200***REMOVED***
  ***REMOVED*** catch (error) {
    next(error***REMOVED***
  ***REMOVED***
***REMOVED******REMOVED***

app.get("/v1/reddit-profile", authHandler(), async (req, res, next) => {
  try {
    const { accessToken ***REMOVED*** = req.query;

    const redditProfile = await axios
      .get("https://oauth.reddit.com/api/v1/me", {
        headers: {
          Authorization: `bearer ${accessToken***REMOVED***`,
        ***REMOVED***,
      ***REMOVED***)
      .then((res) => res.data***REMOVED***

    await db.Profile.update(
      {
        reddit_profile: redditProfile,
      ***REMOVED***,
      {
        where: {
          userId: res.locals.userId,
        ***REMOVED***,
      ***REMOVED***
    ***REMOVED***

    res.sendStatus(200***REMOVED***
  ***REMOVED*** catch (error) {
    next(error***REMOVED***
  ***REMOVED***
***REMOVED******REMOVED***

app.get("/v1/reddit-access-token", authHandler(), async (req, res, next) => {
  try {
    const encode = Buffer.from(
      `${process.env.REDDIT_APP***REMOVED***:${process.env.REDDIT_SECRET***REMOVED***`
    ).toString("base64"***REMOVED***

    const user = await db.User.findOne({
      where: {
        uuid: res.locals.userId,
      ***REMOVED***,
    ***REMOVED******REMOVED***

    const { access_token ***REMOVED*** = await axios
      .post(
        "https://www.reddit.com/api/v1/access_token",
        `grant_type=refresh_token&refresh_token=${user.reddit_refresh_token***REMOVED***`,
        {
          headers: {
            Authorization: `Basic ${encode***REMOVED***`,
          ***REMOVED***,
        ***REMOVED***
      )
      .then((res) => res.data***REMOVED***

    res.send({ access_token ***REMOVED******REMOVED***
  ***REMOVED*** catch (error) {
    next(error***REMOVED***
  ***REMOVED***
***REMOVED******REMOVED***

app.put("/v1/update", authHandler(), async (req, res, next) => {
  try {
    const { greeting, recurring, words_per_minute ***REMOVED*** = { ...req.body ***REMOVED***;

    await db.Profile.update(
      {
        greeting,
        recurring,
        words_per_minute,
      ***REMOVED***,
      {
        where: {
          userId: res.locals.userId,
        ***REMOVED***,
      ***REMOVED***
    ***REMOVED***

    res.sendStatus(200***REMOVED***
  ***REMOVED*** catch (error) {
    next(error***REMOVED***
  ***REMOVED***
***REMOVED******REMOVED***

app.get("/v1/confirm_email", async (req, res, next) => {
  try {
    const { emailToken ***REMOVED*** = req.query;

    const userId = await jwt.verify(
      emailToken,
      process.env.JWT_SECRET,
      async (err, decoded) => {
        if (decoded === "undefined" || !decoded || err) return false;
        let uuid = decoded.uuid;

        return uuid;
      ***REMOVED***
    ***REMOVED***

    if (!userId) throw new Error("Something went wrong"***REMOVED***

    await db.User.update(
      {
        email_confirmed: true,
      ***REMOVED***,
      {
        where: {
          uuid: userId,
        ***REMOVED***,
        returning: true,
        plain: true,
      ***REMOVED***
    ***REMOVED***

    res.sendStatus(200***REMOVED***
  ***REMOVED*** catch (error) {
    next(error***REMOVED***
  ***REMOVED***
***REMOVED******REMOVED***

app.post("/v1/change-password", authHandler(), async (req, res, next) => {
  try {
    const { currentPassword, newPassword ***REMOVED*** = req.body;

    const user = await db.User.findOne({
      where: {
        uuid: res.locals.userId,
      ***REMOVED***,
    ***REMOVED******REMOVED***

    const hashPassword = await bcrypt.compareSync(
      currentPassword,
      user.password
    ***REMOVED***
    if (!hashPassword) return next({ error: "Incorrect password" ***REMOVED******REMOVED***

    const hashNewPassword = await bcrypt.hashSync(newPassword, 10***REMOVED***

    await user.update({
      password: hashNewPassword,
    ***REMOVED******REMOVED***

    sendEmail({
      to: user.email,
      subject: "Your password has been changed",
      template: emailTemplates.passwordChange,
    ***REMOVED******REMOVED***

    res.sendStatus(200***REMOVED***
  ***REMOVED*** catch (error) {
    next(error***REMOVED***
  ***REMOVED***
***REMOVED******REMOVED***

app.post("/v1/change-email", authHandler(), async (req, res, next) => {
  try {
    const { email ***REMOVED*** = req.body;

    if (!email) throw new Error("Email is required"***REMOVED***

    const existingUser = await db.User.findOne({
      where: {
        email,
      ***REMOVED***,
    ***REMOVED******REMOVED***

    if (existingUser) throw new Error("Email already exists"***REMOVED***

    const user = await db.User.findOne({
      where: {
        uuid: res.locals.userId,
      ***REMOVED***,
    ***REMOVED******REMOVED***

    await user.update({
      email,
    ***REMOVED******REMOVED***

    sendEmail({
      to: user.email,
      subject: "Your email has been changed",
      template: emailTemplates.emailChange,
    ***REMOVED******REMOVED***

    res.sendStatus(200***REMOVED***
  ***REMOVED*** catch (error) {
    next(error***REMOVED***
  ***REMOVED***
***REMOVED******REMOVED***

module.exports = app;
