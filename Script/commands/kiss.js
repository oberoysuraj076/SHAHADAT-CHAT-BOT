const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "kiss",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "SHAHADAT SAHU",
  description: "Generate a couple kiss image using sender and target Facebook UID via Avatar Canvas API",
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
    const apiList = await axios.get(
      "https://gitlab.com/shahadat-sahu/sahu-api/-/raw/main/API.json",
      { timeout: 15000 }
    );

    const AVATAR_CANVAS_API = apiList?.data?.AvatarCanvas;
    if (!AVATAR_CANVAS_API) throw new Error("AvatarCanvas API not found");

    const res = await axios.post(
      `${AVATAR_CANVAS_API}/api`,
      {
        cmd: "kiss",
        senderID,
        targetID
      },
      { responseType: "arraybuffer", timeout: 30000 }
    );

    const cacheDir = path.join(__dirname, "cache");
    if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir, { recursive: true });

    imgPath = path.join(
      cacheDir,
      `kiss_${senderID}_${targetID}_${Date.now()}.png`
    );

    fs.writeFileSync(imgPath, Buffer.from(res.data));

    // 💌 Captions (Hindi)
    const captions = [
      "बिना वजह हर रोज़ एक आदत सी बन गई, तेरी माया में फिर-फिर उलझता जा रहा हूँ!🌷",
      "तुझसे क्यों प्यार करता हूँ, इसका कोई खास कारण मुझे नहीं पता! पर तेरे साथ सारी ज़िंदगी रहने के हज़ार कारण मेरे पास हैं!💚",
      "तेरे साथ बिताए पलों के बारे में सोचूँ, तो लगता है ये एक जनम तेरे साथ बहुत कम है!😘",
      "प्रिय तू क्या मेरी ज़िंदगी की वो कहानी बनेगी? जिसकी शुरुआत होगी, पर कोई अंत न होगा!♥️",
      "तू पास हो तो सब कुछ सुंदर लगता है, ज़िंदगी जैसे एक मीठी कविता बन जाती है!😍",
      "तेरे बिना ज़िंदगी अधूरी है, तू मेरे प्यार की पूर्णता है!🧡",
      "तू मेरा सपना है, तू मेरी ज़िंदगी का हर खूबसूरत पल है!🌻",
      "मेरी आँखों में अपनी हस्ती ढूँढने मत आना, खो जाओगे! क्योंकि मेरे पूरे वजूद में तेरी ही खामोश आहट है!🌺",
      "तुझसे शुरू तुझ पर ही खत्म, तू न हो तो हमारी कहानी यहीं खत्म!😘",
      "अगर प्यार कोई एहसास है, तो तेरे लिए मेरा एहसास दुनिया का सबसे बेहतरीन एहसास है।🌻ღ🌺"
    ];

    const caption = captions[Math.floor(Math.random() * captions.length)];

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
    // 🧹 Cleanup on error
    if (imgPath && fs.existsSync(imgPath)) {
      try { fs.unlinkSync(imgPath); } catch {}
    }

    console.error("[KISS CMD ERROR]", e.message || e);

    return api.sendMessage(
      "❌ API Error | Call Boss RISHU",
      threadID,
      messageID
    );
  }
};