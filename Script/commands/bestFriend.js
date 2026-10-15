const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "bestfriend",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "SHAHADAT SAHU",
  description: "Generate a best friend banner image using sender and target Facebook UID via Avatar Canvas API",
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
        cmd: "bestFriend",
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
      `bestFriend_${senderID}_${targetID}.png`
    );

    fs.writeFileSync(imgPath, res.data);

    // ---------- Captions (Hindi + English) ----------
    const BEST_FRIEND_CAPTIONS = [
      // 🌸 Radhe Radhe Style
      "🦚🌸 राधे राधे ❤️🙏\n" +
      "दोस्ती का मतलब सिर्फ साथ रहना नहीं,\n" +
      "बल्कि उदास दिनों में भी हँसी लाना है 💛\n" +
      "हमेशा ऐसे ही रहना मेरे Best Friend 🫶\n" +
      "━━━━━━━━━━━━━━━━━\n" +
      "🦚🌸 Radhe Radhe ❤️🙏\n" +
      "Friendship isn't just about being there,\n" +
      "It's about bringing laughter even on sad days 💛\n" +
      "Always stay like this my Best Friend 🫶",

      // 🚩 Jai Shree Ram Style
      "🚩🌸 जय श्री राम ❤️🙏\n" +
      "एक इंसान ही काफी है,\n" +
      "जिससे सारी बातें कही जा सकें,\n" +
      "हँसी-आँसू सब बाँट सकें 💛🌻\n" +
      "Best Friend Forever 🫶\n" +
      "━━━━━━━━━━━━━━━━━\n" +
      "🚩🌸 Jai Shree Ram ❤️🙏\n" +
      "One person is enough,\n" +
      "With whom you can share everything,\n" +
      "Laughter and tears all shared 💛🌻\n" +
      "Best Friend Forever 🫶",

      // 🕉️ Har Har Mahadev Style
      "🕉️🔱 हर हर महादेव 🔱🕉️\n" +
      "तू है तभी,\n" +
      "ज़िंदगी इतनी खूबसूरत लगती है 🫶🌸\n" +
      "My Best Friend 💛\n" +
      "━━━━━━━━━━━━━━━━━\n" +
      "🕉️🔱 Har Har Mahadev 🔱🕉️\n" +
      "Because you exist,\n" +
      "Life feels so beautiful 🫶🌸\n" +
      "My Best Friend 💛",

      // 🦚 Krishna Style
      "🦚 राधे कृष्णा ❤️🙏\n" +
      "खून का रिश्ता न होकर भी,\n" +
      "जो अपने से भी ज़्यादा करीब हो 💛\n" +
      "वही है असली Best Friend 🌻🫶\n" +
      "━━━━━━━━━━━━━━━━━\n" +
      "🦚 Radhe Krishna ❤️🙏\n" +
      "Not related by blood,\n" +
      "But closer than your own 💛\n" +
      "That's the true Best Friend 🌻🫶",

      // 🌸 Simple Style
      "🌸 बात कम,\n" +
      "समझ बहुत 😌💛\n" +
      "यही है हमारी दोस्ती 🫶\n" +
      "━━━━━━━━━━━━━━━━━\n" +
      "🌸 Fewer words,\n" +
      "More understanding 😌💛\n" +
      "That's our friendship 🫶",

      // 🚩 Ram Style
      "🚩 जय श्री राम 🚩\n" +
      "दोस्ती कोई नाम नहीं,\n" +
      "ये एक एहसास है 💛\n" +
      "जो सिर्फ भाग्यवान लोगों को मिलता है 🌻🫶\n" +
      "━━━━━━━━━━━━━━━━━\n" +
      "🚩 Jai Shree Ram 🚩\n" +
      "Friendship isn't a name,\n" +
      "It's a feeling 💛\n" +
      "That only fortunate people get 🌻🫶",

      // 🌸 Best Friend Forever
      "🌸 दोस्ती का रंग निराला है,\n" +
      "हर दिल का ये सवाला है,\n" +
      "दोस्त वो नहीं जो पास रहे,\n" +
      "दोस्त वो है जो हर पल हँसाए 💛🫶\n" +
      "━━━━━━━━━━━━━━━━━\n" +
      "🌸 Friendship has a unique color,\n" +
      "It's a question of every heart,\n" +
      "A friend isn't one who stays close,\n" +
      "A friend is one who makes you laugh 💛🫶",

      // 🌻 Emotional
      "🌻 तेरे बिना ये दिन भी अधूरे,\n" +
      "तेरे बिना ये पल भी अधूरे,\n" +
      "तू है तो सब कुछ है 💛\n" +
      "Best Friend Forever 🫶🌸\n" +
      "━━━━━━━━━━━━━━━━━\n" +
      "🌻 Without you days feel incomplete,\n" +
      "Without you moments feel empty,\n" +
      "With you, everything is complete 💛\n" +
      "Best Friend Forever 🫶🌸"
    ];

    const caption =
      BEST_FRIEND_CAPTIONS[
        Math.floor(Math.random() * BEST_FRIEND_CAPTIONS.length)
      ];

    return api.sendMessage(
      {
        body: caption,
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
      "❌ API Error, Boss rishu को call करें\n" +
      "❌ API Error, Call Boss rishu",
      threadID,
      messageID
    );
  }
};