const express = require("express"***REMOVED***
const authHandler = require("../middleware/authHandler"***REMOVED***
const db = require("../models"***REMOVED***

const app = express.Router(***REMOVED***

app.post("/v1/save", authHandler(), async (req, res, next) => {
  try {
    const { name, notes ***REMOVED*** = req.body;

    await db.Contact.create({
      name,
      notes,
      userId: res.locals.userId,
    ***REMOVED******REMOVED***

    res.sendStatus(200***REMOVED***
  ***REMOVED*** catch (error) {
    next(error***REMOVED***
  ***REMOVED***
***REMOVED******REMOVED***

app.delete("/v1/delete/:uuid", authHandler(), async (req, res, next) => {
  try {
    const { uuid ***REMOVED*** = req.params;
    await db.Contact.destroy({
      where: {
        uuid,
        userId: res.locals.userId,
      ***REMOVED***,
    ***REMOVED******REMOVED***

    res.sendStatus(200***REMOVED***
  ***REMOVED*** catch (error) {
    next(error***REMOVED***
  ***REMOVED***
***REMOVED******REMOVED***

app.put("/v1/:id/edit", authHandler(), async (req, res, next) => {
  try {
    const { id ***REMOVED*** = req.params;
    const { name, notes ***REMOVED*** = req.body;

    await db.Contact.update(
      {
        name,
        notes,
      ***REMOVED***,
      {
        where: {
          uuid: id,
          userId: res.locals.userId,
        ***REMOVED***,
      ***REMOVED***
    ***REMOVED***

    res.sendStatus(200***REMOVED***
  ***REMOVED*** catch (error) {
    next(error***REMOVED***
  ***REMOVED***
***REMOVED******REMOVED***

app.get("/v1/contact", authHandler(), async (req, res, next) => {
  try {
    const { username, uuid ***REMOVED*** = { ...req.query ***REMOVED***;
    const options = {***REMOVED***;

    if (username) {
      options.name = username;
    ***REMOVED***

    if (uuid) {
      options.uuid = uuid;
    ***REMOVED***

    const contact = await db.Contact.findOne({
      where: {
        ...options,
        userId: res.locals.userId,
      ***REMOVED***,
    ***REMOVED******REMOVED***

    res.send(contact***REMOVED***
  ***REMOVED*** catch (error) {
    next(error***REMOVED***
  ***REMOVED***
***REMOVED******REMOVED***

app.get("/v1/", authHandler(), async (req, res, next) => {
  try {
    const contacts = await db.Contact.findAll({
      where: {
        userId: res.locals.userId,
      ***REMOVED***,
    ***REMOVED******REMOVED***

    res.send(contacts***REMOVED***
  ***REMOVED*** catch (error) {
    next(error***REMOVED***
  ***REMOVED***
***REMOVED******REMOVED***

module.exports = app;
