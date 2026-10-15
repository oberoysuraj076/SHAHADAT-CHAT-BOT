module.exports.config = {
  name: "gf",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "SHAHADAT SAHU",
  description: "couple banner",
  commandCategory: "banner",
  usages: "[@mention | reply]",
  cooldowns: 5,
  dependencies: {
    "axios": "",
    "fs-extra": "",
    "path": ""
  }
};

module.exports.run = async function ({ event, api }) {
  const axios = require("axios");
  const fs = require("fs-extra");
  const path = require("path");

  const { threadID, messageID, senderID, mentions, messageReply } = event;

  // 🎯 Get target (reply first, else mention)
  let targetID =
    messageReply?.senderID ||
    (mentions && Object.keys(mentions)[0]);

  if (!targetID) {
    return api.sendMessage(
      "⚠️ Please reply to or mention someone to make a GF banner!",
      threadID,
      messageID
    );
  }

  // 🚫 Don't allow self
  if (targetID === senderID) {
    return api.sendMessage(
      "😅 You can't make a GF banner with yourself!",
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
    if (!AVATAR_CANVAS_API) {
      throw new Error("AvatarCanvas API not found in API.json");
    }

    // 🖼️ Request GF banner image
    const res = await axios.post(
      `${AVATAR_CANVAS_API}/api`,
      { cmd: "gf", senderID, targetID },
      { responseType: "arraybuffer", timeout: 30000 }
    );

    // 💾 Ensure cache dir exists
    const cacheDir = path.join(__dirname, "cache");
    if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir, { recursive: true });

    imgPath = path.join(
      cacheDir,
      `gf_${senderID}_${targetID}_${Date.now()}.png`
    );

    fs.writeFileSync(imgPath, Buffer.from(res.data));

    // 📤 Send image
    return api.sendMessage(
      {
        body: "~ये ले तेरी गर्लफ्रेंड, दूसरी लड़कियों को देखा तो गया तू 😍😸",
        attachment: fs.createReadStream(imgPath)
      },
      threadID,
      () => {
        // 🧹 Cleanup after send
        if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
      },
      messageID
    );

  } catch (e) {
    // 🧹 Cleanup on error too
    if (imgPath && fs.existsSync(imgPath)) {
      try { fs.unlinkSync(imgPath); } catch {}
    }

    console.error("[GF CMD ERROR]", e.message || e);

    return api.sendMessage(
      "❌ GF API Error | SAHU-API unreachable or failed.\nTry again later.",
      threadID,
      messageID
    );
  }
};