const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "love",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "SHAHADAT SAHU",
  description: "Generate a couple banner image using sender and target Facebook UID via Avatar Canvas API",
  commandCategory: "banner",
  usePrefix: true,
  usages: "[@mention | reply]",
  cooldowns: 5
};

module.exports.run = async function ({ event, api }) {
  const { threadID, messageID, mentions, messageReply, senderID } = event;

  let targetID = null;
  if (mentions && Object.keys(mentions).length > 0) {
    targetID = Object.keys(mentions)[0];
  } else if (messageReply && messageReply.senderID) {
    targetID = messageReply.senderID;
  }

  if (!targetID) {
    return api.sendMessage(
      "⚠️ कृपया किसी को reply या mention करें......",
      threadID,
      messageID
    );
  }

  // 💌 Captions (Hindi)
  const captions = [
    "💖 ⎯͢⎯⃝🩷😽 तू मेरी आँखों में सादगी की मिसाल है ⎯͢⎯⃝🩷🐰🍒",
    "💖 🥺❤️ प्रिय.....! 😊\nकभी रोता है, कभी हँसता है,\nकभी ऐसा प्यार देता है,\nजैसे दुनिया की सारी खुशियाँ तुझमें ढूँढ लूँ...! 💔❤️",
    "जुदाई के बाद भी संपर्क बनाए रखने का नाम ही माया है ____💖 💗🌺",
    "लोग चले जाते हैं, पर यादें नहीं!💖",
    "इच्छाएँ शब्दहीन हैं...!! सोच तो रोज़ की है..! 🌸💔",
    "प्यार सिर्फ इश्क नहीं, बल्कि वो है जिसकी हँसी से सुबह शुरू होती है 💖",
    "जो रिश्ता आँखों से नहीं दिखता, दिल में रहता है— वही सच्चा प्यार है 💗",
    "तू शायद दूर है, पर एहसास का पता आज भी तू ही है!💞",
    "आँखों की भाषा जो समझे, वही प्रिय ❤️",
    "तू मीठी आदत है— जिसे छोड़कर रहा भी नहीं जाता 💖"
  ];

  const caption = captions[Math.floor(Math.random() * captions.length)];

  let imgPath;

  try {
    const apiList = await axios.get(
      "https://gitlab.com/shahadat-sahu/sahu-api/-/raw/main/API.json",
      { timeout: 15000 }
    );

    const AVATAR_CANVAS_API = apiList?.data?.AvatarCanvas;
    if (!AVATAR_CANVAS_API) throw new Error("AvatarCanvas API not found");

    const res = await axios.post(
      `${AVATAR_CANVAS_API}/api`,
      {
        cmd: "love",
        senderID,
        targetID
      },
      { responseType: "arraybuffer", timeout: 20000 }
    );

    const cacheDir = path.join(__dirname, "cache");
    if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir, { recursive: true });

    imgPath = path.join(
      cacheDir,
      `love_${senderID}_${targetID}_${Date.now()}.png`
    );

    fs.writeFileSync(imgPath, Buffer.from(res.data));

    return api.sendMessage(
      {
        body: caption,
        attachment: fs.createReadStream(imgPath)
      },
      threadID,
      () => {
        if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
      },
      messageID
    );

  } catch (e) {
    if (imgPath && fs.existsSync(imgPath)) {
      try { fs.unlinkSync(imgPath); } catch {}
    }

    console.error("[LOVE CMD ERROR]", e.message || e);

    return api.sendMessage(
      "❌ API Error | Call Boss SAHU",
      threadID,
      messageID
    );
  }
};