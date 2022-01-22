const multerS3 = require("multer-s3-transform"***REMOVED***
const aws = require("aws-sdk"***REMOVED***
const multer = require("multer"***REMOVED***
const sharp = require("sharp"***REMOVED***

require("dotenv").config(***REMOVED***

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  region: process.env.AWS_REGION,
  bucket: process.env.AWS_BUCKET,
***REMOVED******REMOVED***

const s3 = new aws.S3(***REMOVED***

const dateNow = Date.now().toString(***REMOVED***

const uploadLogo = multer({
  storage: multerS3({
    s3: s3,
    bucket: "reddex",
    shouldTransform: true,
    transforms: [
      {
        id: "original",
        key: async function (req, file, cb) {
          const fullPath = `${dateNow***REMOVED***_${file.originalname***REMOVED***/logo-original-${file.originalname***REMOVED***`;
          cb(null, fullPath***REMOVED***
        ***REMOVED***,
      ***REMOVED***,
    ],
  ***REMOVED***),
  files: 1,
  fileSize: 3000000,
  fileFilter: (req, file, cb) => {
    let isFinished = 0;
    const acceptedMimeTypes = ["image/jpeg", "image/png", "image/jpg"];

    for (let i = 0; i < acceptedMimeTypes.length; i++) {
      if (file.mimetype === acceptedMimeTypes[i]) {
        isFinished = 1;
        return cb(null, true***REMOVED***
      ***REMOVED***
    ***REMOVED***

    if (isFinished === 0) {
      cb(null, false***REMOVED***
    ***REMOVED***
  ***REMOVED***,
***REMOVED******REMOVED***

const uploadBanner = multer({
  storage: multerS3({
    s3: s3,
    bucket: "reddex",
    shouldTransform: true,
    transforms: [
      {
        id: "original",
        key: async function (req, file, cb) {
          const fullPath = `${dateNow***REMOVED***_${file.originalname***REMOVED***/banner-original-${file.originalname***REMOVED***`;
          cb(null, fullPath***REMOVED***
        ***REMOVED***,
      ***REMOVED***,
    ],
  ***REMOVED***),
  files: 1,
  fileSize: 3000000,
  fileFilter: (req, file, cb) => {
    let isFinished = 0;
    const acceptedMimeTypes = ["image/jpeg", "image/png", "image/jpg"];

    for (let i = 0; i < acceptedMimeTypes.length; i++) {
      if (file.mimetype === acceptedMimeTypes[i]) {
        isFinished = 1;
        return cb(null, true***REMOVED***
      ***REMOVED***
    ***REMOVED***

    if (isFinished === 0) {
      cb(null, false***REMOVED***
    ***REMOVED***
  ***REMOVED***,
***REMOVED******REMOVED***

const deleteObject = (url) => {
  const regex = /(?<=\/)[\d][\S][^\/]+/gim;
  const key = url.match(regex).toString(***REMOVED***

  var params = {
    Bucket: process.env.AWS_BUCKET,
    Prefix: key,
    MaxKeys: 2,
  ***REMOVED***;

  s3.listObjectsV2(params, (err, data) => {
    if (err) return console.log(err***REMOVED***

    params = {
      Bucket: process.env.AWS_BUCKET,
    ***REMOVED***;
    params.Delete = { Objects: [] ***REMOVED***;

    data.Contents.forEach((x) => {
      params.Delete.Objects.push({ Key: x.Key ***REMOVED******REMOVED***
    ***REMOVED******REMOVED***

    s3.deleteObjects(params, (err, data) => {
      if (err) return false;

      return true;
    ***REMOVED******REMOVED***
  ***REMOVED******REMOVED***
***REMOVED***;

module.exports = {
  uploadLogo,
  uploadBanner,
  deleteObject,
***REMOVED***;
