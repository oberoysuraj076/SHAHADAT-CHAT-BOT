module.exports.config = {
  name: "bro",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "SHAHADAT SAHU",
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

module.exports.run = async function ({ event, api }) {
  const axios = require("axios");
  const fs = require("fs-extra");
  const path = require("path");

  const { threadID, messageID, senderID, mentions, messageReply } = event;

  let targetID = null;

  if (mentions && Object.keys(mentions).length > 0) {
    targetID = Object.keys(mentions)[0];
  } else if (messageReply && messageReply.senderID) {
    targetID = messageReply.senderID;
  }

  if (!targetID) {
    return api.sendMessage(
      "किसी को reply करें या mention करें......\n" +
      "Please reply or mention someone......",
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
        cmd: "bro",
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
      `bro_${senderID}_${targetID}.png`
    );

    fs.writeFileSync(imgPath, res.data);

    return api.sendMessage(
      {
        body:
          `🌸 𝐓𝐞𝐫𝐚 𝐁𝐚𝐢 🌸\n\n` +
          `🤝 भाई-बंधु का रिश्ता हमेशा अटूट रहे 💖\n` +
          `🫱 ये ले, अपने भाई को रख ❤️\n\n` +
          `👑 𝐁𝐑𝐎𝐓𝐇𝐄𝐑 𝐅𝐎𝐑𝐄𝐕𝐄𝐑 🩷🌸\n` +
          `━━━━━━━━━━━━━━━━━\n` +
          `🤝 May the bond of brothers always remain unbroken 💖\n` +
          `🫱 Here, keep your brother ❤️\n` +
          `👑 𝐁𝐑𝐎𝐓𝐇𝐄𝐑 𝐅𝐎𝐑𝐄𝐕𝐄𝐑 🩷🌸`,
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
      "❌ API Error, Boss Rishu को call करें\n" +
      "❌ API Error, Call Boss Rishu",
      threadID,
      messageID
    );
  }
};