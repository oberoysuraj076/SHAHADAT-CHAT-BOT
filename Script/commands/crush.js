const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "crush",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "RISHIKESH",
  description: "Generate a couple banner image using sender and target Facebook UID via Avatar Canvas API",
  commandCategory: "banner",
  usePrefix: true,
  usages: "[@mention | reply]",
  cooldowns: 5,
  dependencies: {
    "axios": "",
    "fs-extra": "",
    "path": ""
  }
};

const crushCaptions = [
  "प्यार में अगर अधूरापन ही सुंदर है,\nतो पूर्णता की सुंदरता कहाँ है? ❤️",

  "काश मैं बारिश होता…\nतुम्हारी नज़रों को छू जाता!\nआँखों में जमा उदासी को\nएक पल में धो देता 🤗",

  "तुम्हारे प्यार की परछाईं देखी है बार-बार 💖",

  "तुम्हारे साथ एक दिन अच्छा हो सकता है,\nपर तुम्हारे साथ हर दिन प्यार हो सकता है 🌸",

  "एक साल नहीं, कई जन्म सिर्फ तुम्हारे प्यार में\nपड़ते-पड़ते ही निकल जाएँगे 😍",

  "कैसे ये दिल दे दूँ तुम्हें…\nजिसे चाहा दिल से,\nदिल भी दे दिया उसी को 🫶",

  "पीछे-पीछे घूमने से क्या प्यार हो जाता है…\nपास आकर बैठो, दिल पाया जाता है ❤️‍🩹",

  "तुम हो तो खुद को इतना खुशनसीब लगता है,\nजैसे ज़िंदगी में कोई ग़म ही नहीं 😊",

  "तुम्हारा हाथ थाम लूँ तो लगता है\nपूरी दुनिया थाम ली 🥰",

  "तुम्हारे लिए ये अच्छा लगना\nहर दिन बढ़ता ही जा रहा है 😘"
];

module.exports.run = async function ({ event, api }) {
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
        cmd: "crush",
        senderID,
        targetID
      },
      { responseType: "arraybuffer", timeout: 30000 }
    );

    // ---------- Cache Folder Auto-Create ----------
    const cacheDir = path.join(__dirname, "cache");
    if (!fs.existsSync(cacheDir)) {
      fs.mkdirSync(cacheDir, { recursive: true });
    }

    const imgPath = path.join(
      cacheDir,
      `crush_${senderID}_${targetID}.png`
    );

    fs.writeFileSync(imgPath, res.data);

    const caption =
      crushCaptions[Math.floor(Math.random() * crushCaptions.length)];

    return api.sendMessage(
      {
        body: `✧•❁𝐂𝐫𝐮𝐬𝐡❁•✧\n\n${caption}`,
        attachment: fs.createReadStream(imgPath)
      },
      threadID,
      () => {
        try {
          fs.unlinkSync(imgPath);
        } catch (_) {}
      },
      messageID
    );

  } catch (e) {
    return api.sendMessage(
      "❌ API Error, Boss RISHIKESH को call करें",
      threadID,
      messageID
    );
  }
};