const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "hug",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "SHAHADAT SAHU",
  description: "Generate hug frame using Avatar Canvas API",
  commandCategory: "banner",
  usePrefix: true,
  usages: "[@mention | reply]",
  cooldowns: 5,
  dependencies: { "axios": "", "fs-extra": "", "path": "" }
};

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
      "⚠️ कृपया किसी को reply या mention करें......",
      threadID,
      messageID
    );
  }

  let imgPath;

  try {
    // 📡 Fetch API list
    const apiList = await axios.get(
      "https://gitlab.com/shahadat-sahu/sahu-api/-/raw/main/API.json",
      { timeout: 15000 }
    );

    const AVATAR_CANVAS_API = apiList?.data?.AvatarCanvas;
    if (!AVATAR_CANVAS_API) throw new Error("AvatarCanvas API not found");

    // 🖼️ Request hug image
    const res = await axios.post(
      `${AVATAR_CANVAS_API}/api`,
      { cmd: "hug", senderID, targetID },
      { responseType: "arraybuffer", timeout: 30000 }
    );

    // 💾 Ensure cache dir exists
    const cacheDir = path.join(__dirname, "cache");
    if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir, { recursive: true });

    imgPath = path.join(
      cacheDir,
      `hug_${senderID}_${targetID}_${Date.now()}.png`
    );

    fs.writeFileSync(imgPath, Buffer.from(res.data));

    // 💌 Captions (Hindi)
    const captions = [
      "❝ अगर कभी एहसास हो, तो तेरे लिए मेरा एहसास दुनिया का सबसे बेहतरीन एहसास है!🌻",
      "❝ तू मेरी ज़िंदगी का सबसे अच्छा चैप्टर है, जिसे बार-बार पढ़ने का मन करता है!💝",
      "❝ तेरे प्यार की कीमत कैसे चुकाऊँ, ये नहीं जानता — बस इतना जानता हूँ कि तुझे खोना नहीं चाहता!❤️",
      "❝ प्यार में पड़ने से पहले तेरी माया में उलझ गया, जो नशे जैसी है!💘",
      "❝ तू मेरा प्यार, मेरी शांति, मेरा सब कुछ है!💞",
      "❝ तुझसे प्यार करना मेरी ज़िंदगी का सबसे खूबसूरत एहसास है!❤️‍🔥",
      "❝ तू मेरी ज़िंदगी की वो कहानी है, जो हर बार पढ़ने पर नया प्यार जगाती है!💚",
      "❝ तुझसे बहुत बहुत प्यार करता हूँ मेरी राजकुमारी।❤️‍🩹",
      "❝ You complete me. A warm hug just for you!🌺"
    ];

    const caption = captions[Math.floor(Math.random() * captions.length)];

    return api.sendMessage(
      { body: caption, attachment: fs.createReadStream(imgPath) },
      threadID,
      () => {
        // 🧹 Cleanup after send
        if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
      },
      messageID
    );

  } catch (e) {
    // 🧹 Cleanup on error
    if (imgPath && fs.existsSync(imgPath)) {
      try { fs.unlinkSync(imgPath); } catch {}
    }

    console.error("[HUG CMD ERROR]", e.message || e);

    return api.sendMessage(
      "❌ API Error | Call Boss SAHU",
      threadID,
      messageID
    );
  }
};