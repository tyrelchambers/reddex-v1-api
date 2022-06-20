require("dotenv").config();
const fs = require("fs");
const SpeechToTextV1 = require("ibm-watson/speech-to-text/v1");
const { getAudioDurationInSeconds } = require("get-audio-duration");

const { IamAuthenticator } = require("ibm-watson/auth");

const speechClient = new SpeechToTextV1({
  authenticator: new IamAuthenticator({
    apikey: process.env.IBM_API_KEY,
  }),
  serviceUrl: process.env.IBM_URL,
});

const processAudioFile = ({ filePath, mimeType, id }) => {
  return new Promise((resolve, reject) => {
    const stream = fs
      .createReadStream(filePath)
      .pipe(
        speechClient.recognizeUsingWebSocket({
          contentType: `${mimeType}; rate=44100`,
        })
      )
      .pipe(fs.createWriteStream(`public/${id}-transcription.txt`));

    stream.on("finish", async () => {
      const file = fs.readFileSync(`public/${id}-transcription.txt`, "utf8");
      const audioLen = await getAudioDurationInSeconds(filePath);
      const wpm = file.split(" ").length / (audioLen / 60);

      resolve(Math.floor(wpm));
    });

    stream.on("error", reject);
  });
};

module.exports = processAudioFile;
