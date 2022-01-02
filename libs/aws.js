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

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "reddex",
    shouldTransform: true,
    transforms: [
      {
        id: "original",
        key: async function (req, file, cb) {
          const fullPath = `${dateNow***REMOVED***_${file.originalname***REMOVED***/original-${file.originalname***REMOVED***`;
          cb(null, fullPath***REMOVED***
        ***REMOVED***,
        transform: function (req, file, cb) {
          if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg") {
            cb(null, sharp().jpeg()***REMOVED***
          ***REMOVED***

          if (file.mimetype === "image/png") {
            cb(null, sharp().png()***REMOVED***
          ***REMOVED***
        ***REMOVED***,
      ***REMOVED***,
      {
        id: "thumbnail",
        key: function (req, file, cb) {
          cb(
            null,
            `${dateNow***REMOVED***_${file.originalname***REMOVED***/thumbnail-${file.originalname***REMOVED***`
          ***REMOVED***
        ***REMOVED***,
        transform: function (req, file, cb) {
          if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg") {
            cb(
              null,
              sharp()
                .resize({
                  width: 400,
                  fit: "cover",
                ***REMOVED***)
                .jpeg({
                  quality: 90,
                  chromaSubsampling: "4:4:4",
                ***REMOVED***)
            ***REMOVED***
          ***REMOVED***

          if (file.mimetype === "image/png") {
            cb(
              null,
              sharp()
                .resize({
                  width: 400,
                  fit: "cover",
                ***REMOVED***)
                .png({
                  quality: 90,
                  chromaSubsampling: "4:4:4",
                ***REMOVED***)
            ***REMOVED***
          ***REMOVED***
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
  upload,
  deleteObject,
***REMOVED***;
