const express = require("express"***REMOVED***
const { Op ***REMOVED*** = require("sequelize"***REMOVED***
const authHandler = require("../middleware/authHandler"***REMOVED***
const db = require("../models"***REMOVED***

const app = express.Router(***REMOVED***

app.get("/v1/approved", authHandler(), async (req, res, next) => {
  try {
    const stories = await db.Story.findAll({
      where: {
        user_id: res.locals.userId,
        permission: true,
      ***REMOVED***,
    ***REMOVED******REMOVED***

    res.send(stories***REMOVED***
  ***REMOVED*** catch (error) {
    next(error***REMOVED***
  ***REMOVED***
***REMOVED******REMOVED***

app.get("/v1/completed", authHandler(), async (req, res, next) => {
  try {
    const stories = await db.Story.findAll({
      where: {
        user_id: res.locals.userId,
        read: true,
      ***REMOVED***,
    ***REMOVED******REMOVED***

    res.send(stories***REMOVED***
  ***REMOVED*** catch (error) {
    next(error***REMOVED***
  ***REMOVED***
***REMOVED******REMOVED***

app.post("/v1/approved/save", authHandler(), async (req, res, next) => {
  try {
    const { subject ***REMOVED*** = req.body;

    const story = await db.Story.findOne({
      where: {
        user_id: res.locals.userId,
        title: {
          [Op.substring]: `${subject.substring(0, subject.length - 3)***REMOVED***`,
        ***REMOVED***,
      ***REMOVED***,
    ***REMOVED******REMOVED***

    if (!story) throw new Error("Story not found"***REMOVED***

    await story.update({
      permission: true,
    ***REMOVED******REMOVED***

    res.sendStatus(200***REMOVED***
  ***REMOVED*** catch (error) {
    next(error***REMOVED***
  ***REMOVED***
***REMOVED******REMOVED***

app.put("/v1/transfer/to_completed", authHandler(), async (req, res, next) => {
  try {
    const { uuid ***REMOVED*** = req.body.data;

    const story = await db.Story.findOne({
      where: {
        uuid,
        user_id: res.locals.userId,
      ***REMOVED***,
    ***REMOVED******REMOVED***

    if (!story) throw new Error("Story not found"***REMOVED***

    await story.update({
      read: true,
      permission: false,
    ***REMOVED******REMOVED***

    res.sendStatus(200***REMOVED***
  ***REMOVED*** catch (error) {
    next(error***REMOVED***
  ***REMOVED***
***REMOVED******REMOVED***

app.put("/v1/transfer/to_approved", authHandler(), async (req, res, next) => {
  try {
    const { uuid ***REMOVED*** = req.body.data;

    const story = await db.Story.findOne({
      where: {
        uuid,
        user_id: res.locals.userId,
      ***REMOVED***,
    ***REMOVED******REMOVED***

    if (!story) throw new Error("Story not found"***REMOVED***

    await story.update({
      read: false,
      permission: true,
    ***REMOVED******REMOVED***

    res.sendStatus(200***REMOVED***
  ***REMOVED*** catch (error) {
    next(error***REMOVED***
  ***REMOVED***
***REMOVED******REMOVED***

module.exports = app;
