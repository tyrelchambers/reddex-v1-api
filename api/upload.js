const express = require("express");
const { uploadLogo, uploadBanner, deleteObject } = require("../libs/aws");
const authHandler = require("../middleware/authHandler");
const multer = require("multer");
const processAudioFile = require("../libs/processAndUploadAudio");
const fs = require("fs");

const anyUploadLogo = uploadLogo.any();
const anyUploadBanner = uploadBanner.any();
const allowedMimeTypes = ["audio/wav", "audio/mp3"];
const mimeTypeMap = {
  "audio/wav": ".wav",
  "audio/mp3": ".mpeg",
};

const audioUpload = multer({
  storage: multer.diskStorage({
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(
        null,
        file.fieldname + "-" + uniqueSuffix + mimeTypeMap[file.mimetype]
      );
    },
    destination: "public/audio/",
  }),
  fileFilter: function (req, file, cb) {
    if (!allowedMimeTypes.includes(file.mimetype.toLowerCase())) {
      cb(null, false);
    }
    cb(null, true);
  },
}).single("files");

const app = express.Router();

app.post("/v1/logo", authHandler(), (req, res, next) => {
  anyUploadLogo(req, res, (err) => {
    if (err) {
      return res.status(422).send({
        errors: [{ title: "Image Upload Error", detail: err.message }],
      });
    }
    for (let i = 0; i < req.files.length; i++) {
      res.send({
        original: req.files[0].location,
      });
    }
  });
});

app.post("/v1/banner", authHandler(), (req, res, next) => {
  anyUploadBanner(req, res, (err) => {
    if (err) {
      return res.status(422).send({
        errors: [{ title: "Image Upload Error", detail: err.message }],
      });
    }
    for (let i = 0; i < req.files.length; i++) {
      res.send({
        original: req.files[0].location,
      });
    }
  });
});

app.post("/v1/audio", authHandler(), (req, res, next) => {
  audioUpload(req, res, async (err) => {
    if (req.file) {
      const { path, mimetype } = req.file;
      const wpm = await processAudioFile({
        filePath: path,
        mimeType: mimetype,
        id: res.locals.userId,
      });

      fs.rmSync(path);
      fs.rmSync(`public/${res.locals.userId}-transcription.txt`);

      res.send({
        words_per_minute: wpm,
      });
    }
  });
});

app.delete("/revert", authHandler(), async (req, res, next) => {
  try {
    const { url } = req.query;
    await deleteObject(url);

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

module.exports = app;
