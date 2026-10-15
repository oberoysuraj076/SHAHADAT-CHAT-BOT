const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "couple",
  version: "2.0.0",
  hasPermssion: 0,
  credits: "SHAHADAT SAHU",
  description: "Generate a crush banner image with 1000+ random captions",
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

/* ==================== CAPTION BUILDER ==================== */
// 4 भागों को combine करके हर बार नई caption बनेगी

// 1️⃣ Opening lines (30)
const OPENINGS = [
  "तुम्हारा नाम सुनते ही",
  "तुम्हें देखकर लगता है",
  "तुम्हारे बारे में सोचते ही",
  "तुम्हारी एक झलक से ही",
  "तुम्हारी हँसी देखकर",
  "तुमसे मिलकर लगा",
  "तुम्हारी बातें सुनकर",
  "तुम्हारी आँखों में देखकर",
  "तुम्हारे पास होकर भी",
  "तुम्हें याद करते ही",
  "तुम्हारी ख़ामोशी में भी",
  "तुम्हारे साथ वक़्त बिताकर",
  "तुम्हारे संग हँसते हुए",
  "तुम्हें दूर से देखकर",
  "तुम्हारी तस्वीर देखकर",
  "तुम्हारे मैसेज पढ़कर",
  "तुम्हारी आवाज़ सुनकर",
  "तुम्हारी मुस्कान देखकर",
  "तुम्हारे साथ चलते हुए",
  "तुम्हारी बाहों में",
  "तुम्हारे बिना हर पल",
  "तुम्हारी यादों में",
  "तुम्हारे सपनों में",
  "तुम्हारी परवाह करते हुए",
  "तुम्हें पाने की उम्मीद में",
  "तुम्हारे प्यार में",
  "तुम्हारे इंतज़ार में",
  "तुम्हारे दीदार को",
  "तुम्हें फॉलो करते हुए",
  "तुम्हारे नाम की ठंडक में"
];

// 2️⃣ Middle lines (30)
const MIDDLES = [
  "दिल कैसा हल्का हो जाता है",
  "दिल की धड़कन तेज़ हो जाती है",
  "चेहरे पे मुस्कान आ जाती है",
  "पूरी दुनिया रुक सी जाती है",
  "दिल बोलता है — बस तुम ही तुम हो",
  "लगता है जैसे सब ठीक हो जाएगा",
  "दिल में एक अजीब सी बेचैनी होती है",
  "दिल कहता है — काश तुम मेरी होती",
  "मन करता है तुम्हें देखता रहूँ",
  "एक अलग ही सुकून मिलता है",
  "लगता है ज़िंदगी पूरी हो गई",
  "दिल से दुआ निकलती है तुम्हारे लिए",
  "थोड़ा प्यार और थोड़ा इंतज़ार होता है",
  "दिल कहता है — कुछ तो कह दूँ",
  "दिमाग कहता है — चुप रह",
  "आँखें सब बता देती हैं",
  "दिल बस तुम्हें ही ढूँढता है",
  "हर पल तुम्हारी याद आती है",
  "लगता है जैसे तुम्हें पहले से जानता हूँ",
  "दिल में तुम्हारे लिए जगह बन जाती है",
  "तुम्हारे बिना कुछ अधूरा लगता है",
  "दिल कहता है — यही तो वो है",
  "एक अजीब सा नशा होता है",
  "लगता है जैसे दुनिया बदल गई",
  "दिल तुम्हारे नाम से धड़कता है",
  "मन करता है तुम्हें गले लगा लूँ",
  "दिल कहता है — तुम्हें खोना नहीं",
  "थोड़ा डर और थोड़ी उम्मीद होती है",
  "दिल बस तुम्हारा हो जाता है",
  "लगता है जैसे सपना सच हो गया"
];

// 3️⃣ Endings (25)
const ENDINGS = [
  "यही एहसास शायद Crush है 🫶",
  "Crush का जादू है यही 🌸💫",
  "यही तो है प्यार का पहला एहसास 💛",
  "Crush 💛",
  "यही है दिल का मामला 🫶",
  "और यही है दिल की बात 🌸",
  "बस यही है Crush 🌼",
  "यही है मेरा एहसास 🌹",
  "Crush कहते हैं इसे 🫶💖",
  "और कुछ नहीं, बस यही 🌸",
  "यही है दिल का रिश्ता 💫",
  "यही है सच्चा एहसास 💛",
  "यही है मेरा Crush 🌺",
  "बस यही है दिल की दास्तान ✨",
  "और यही है Crush का मतलब 🫶",
  "यही तो है प्यार 💖",
  "यही है दिल का सफ़र 🌸",
  "और यही है मेरा जहाँ 🌹",
  "बस यही है, और कुछ नहीं 💫",
  "यही है दिल की धड़कन 💛",
  "और यही है Crush 🌸",
  "यही है मेरा सुकून 🫶",
  "यही है मेरा जुनून 💖",
  "और यही है प्यार का पहला कदम ✨",
  "बस यही है, कुछ और नहीं 🌺"
];

// 4️⃣ Emojis (10)
const EMOJI_SETS = [
  "💛🌻",
  "🫶💖",
  "🌸✨",
  "🌹💫",
  "💫💛",
  "🌺🫶",
  "💖🌻",
  "✨🌸",
  "🌼💛",
  "💛🌸"
];

/* ==================== RANDOM CAPTION GENERATOR ==================== */
function getRandomCaption() {
  const opening = OPENINGS[Math.floor(Math.random() * OPENINGS.length)];
  const middle = MIDDLES[Math.floor(Math.random() * MIDDLES.length)];
  const ending = ENDINGS[Math.floor(Math.random() * ENDINGS.length)];
  const emoji = EMOJI_SETS[Math.floor(Math.random() * EMOJI_SETS.length)];

  return `${emoji}\n${opening}\n${middle},\n${ending}`;
}

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
        cmd: "crush2",
        senderID,
        targetID
      },
      { responseType: "arraybuffer", timeout: 30000 }
    );

    const cacheDir = path.join(__dirname, "cache");
    if (!fs.existsSync(cacheDir)) {
      fs.mkdirSync(cacheDir, { recursive: true });
    }

    const imgPath = path.join(
      cacheDir,
      `crush2_${senderID}_${targetID}.png`
    );

    fs.writeFileSync(imgPath, res.data);

    // ---------- Random Caption ----------
    const caption = getRandomCaption();

    return api.sendMessage(
      {
        body: caption,
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

  } catch {
    return api.sendMessage(
      "❌ API Error, Boss SAHU को call करें",
      threadID,
      messageID
    );
  }
};