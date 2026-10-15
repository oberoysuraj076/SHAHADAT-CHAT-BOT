const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "arrest",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "SHAHADAT SAHU",
  description: "Generate scooby-doo meme using sender and target Facebook UID via Avatar Canvas API",
  commandCategory: "fun",
  usePrefix: true,
  usages: "[@mention | reply]",
  cooldowns: 5,
  dependencies: {
    "axios": "",
    "fs-extra": "",
    "path": ""
  }
};

module.exports.run = async function ({ event, api, Users }) {
  const { threadID, messageID, senderID, mentions, messageReply } = event;

  let targetID = null;

  if (mentions && Object.keys(mentions).length > 0) {
    targetID = Object.keys(mentions)[0];
  } else if (messageReply && messageReply.senderID) {
    targetID = messageReply.senderID;
  }

  if (!targetID) {
    return api.sendMessage(
      "किसी को reply करें या mention करें......",
      threadID,
      messageID
    );
  }

  try {
    const apiList = await axios.get(
      "https://gitlab.com/shahadat-sahu/sahu-api/-/raw/main/API.json"
    );

    const AVATAR_CANVAS_API = apiList.data.AvatarCanvas;

    const res = await axios.post(
      `${AVATAR_CANVAS_API}/api`,
      {
        cmd: "chor",
        senderID,
        targetID
      },
      {
        responseType: "arraybuffer",
        timeout: 30000
      }
    );

    // ---------- Cache Folder Auto-Create ----------
    const cacheDir = path.join(__dirname, "cache");
    if (!fs.existsSync(cacheDir)) {
      fs.mkdirSync(cacheDir, { recursive: true });
    }

    const imgPath = path.join(
      cacheDir,
      `chor_${senderID}_${targetID}.png`
    );

    fs.writeFileSync(imgPath, res.data);

    let tag = targetID;
    try {
      tag = (await Users.getNameUser(targetID)) || targetID;
    } catch (_) {}

    return api.sendMessage(
      {
        body: `हाला मुर्गी चोर, तुझे आज हाथों-हाथ पकड़ रहा हूँ, भागेगा कहाँ 😹🕵️‍♂️\n=> ${tag}`,
        attachment: fs.createReadStream(imgPath)
      },
      threadID,
      () => {
        // ---------- Safe Delete ----------
        try {
          fs.unlinkSync(imgPath);
        } catch (_) {}
      },
      messageID
    );

  } catch (e) {
    return api.sendMessage(
      "API Error, Boss SAHU को call करें",
      threadID,
      messageID
    );
  }
};