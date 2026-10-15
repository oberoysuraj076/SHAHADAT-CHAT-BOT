const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "married",
  aliases: ["marry"],
  version: "2.0.0",
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
        cmd: "married",
        senderID,
        targetID
      },
      {
        responseType: "arraybuffer",
        timeout: 30000
      }
    );

    const cacheDir = path.join(__dirname, "cache");
    if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir, { recursive: true });

    imgPath = path.join(
      cacheDir,
      `married_${senderID}_${targetID}_${Date.now()}.png`
    );

    fs.writeFileSync(imgPath, Buffer.from(res.data));

    // 💌 Captions (Hindi)
    const captions = [
      "💟ღــ💘तेरा प्यार, मेरी ज़िंदगी का सबसे बड़ा तोहफा है।💘ღــ💟",
      "तेरी आँखों में देखते ही मुझे लगता है कि मेरी एक दुनिया है, और मैं सब कुछ भूल जाता हूँ!💚❤️‍🩹💞",
      "तू मेरी ज़िंदगी की वो कहानी है, जिसे मैं कभी खत्म नहीं करना चाहता!🥰😘🌻",
      "I am so lucky person! तेरे जैसा प्यार करने वाला इंसान मुझे जीवनसाथी के रूप में मिला!❤️‍🩹💞🌺",
      "I feel complete in my life, जब सोचता हूँ कि तेरे जैसा लक्ष्मी-सा इंसान मेरा जीवनसाथी है!💝",
      "तुझसे शुरू तुझ पर ही खत्म, तू न हो तो हमारी कहानी यहीं खत्म!🌺",
      "मैं था, मैं हूँ, मैं रहूँगा, सिर्फ तेरे लिए!💞",
      "❥💙══ღ══❥तुझे गले लगाने का सुख इस दुनिया की किसी चीज़ से खरीदा नहीं जा सकता, प्रियतमा।══ღ══❥💙❥",
      "🌻•━इतना प्यार करता हूँ, इतना चाहता हूँ…लगता ही नहीं कि वो पास नहीं है!🌻•━",
      "🌼══ღ══❥चलते हुए मेरे हाथ में अपना हाथ थमा देना, ठोकर लगे तो मुझे तू सँभाल लेना।🌼══ღ══❥",
      "💠✦💟✦💠मुझे लगता है मेरे दिल की एक नरम ज़मीन पर, सिर्फ तेरा ही बसेरा है।💠✦💟✦💠",
      "मेरी ज़िंदगी में सुख-शांति नहीं चाहिए, मुझे सिर्फ तू चाहिए!🌼"
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
    if (imgPath && fs.existsSync(imgPath)) {
      try { fs.unlinkSync(imgPath); } catch {}
    }

    console.error("[MARRIED CMD ERROR]", e.message || e);

    return api.sendMessage(
      "❌ API Error | Call Boss Rishu",
      threadID,
      messageID
    );
  }
};