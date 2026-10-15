module.exports.config = {
  name: "adminmention",
  version: "1.1.0",
  hasPermssion: 0,
  credits: "SHAHADAT SAHU",
  description: "Reply when Admin or Developer is directly mentioned",
  commandCategory: "Other",
  usages: "@",
  cooldowns: 1
};

module.exports.handleEvent = function ({ api, event }) {
  const config = global.config || {};

  const adminIDs = Array.isArray(config.ADMINBOT)
    ? config.ADMINBOT.map(String)
    : [];

  const developerIDs = Array.isArray(config.DEVELOPER)
    ? config.DEVELOPER.map(String)
    : [];

  const targetIDs = [
    ...new Set([
      ...adminIDs,
      ...developerIDs
    ])
  ];

  // ⏭️ Reply wale message skip karo
  if (
    event.type === "message_reply" ||
    event.messageReply
  ) {
    return;
  }

  if (
    !event.mentions ||
    Object.keys(event.mentions).length === 0
  ) {
    return;
  }

  const mentionedIDs =
    Object.keys(event.mentions).map(String);

  const mentionedAdminOrDeveloper =
    mentionedIDs.some(id =>
      targetIDs.includes(id)
    );

  if (!mentionedAdminOrDeveloper) {
    return;
  }

  // 🎭 Random replies (Hindi)
  const replies = [
    "बुलाओ मत, बॉस बिज़ी है 😒😌",
    "बॉस, कोई नालायक तुम्हें mention कर रहा है 😑😃",
    "बॉस, कोई पागल बकरी तुम्हें बुला रहा है 🐸🫵",
    "बॉस अभी बिज़ी है, कुछ कहना हो तो इनबॉक्स में जाकर बोल",
    "बॉस अभी मेरे साथ मीटिंग में है, mention मत कर 🙂",
    "बॉस अभी बिज़ी है, क्या बोलना है मुझे बोल",
    "अरे तेरी इतनी हिम्मत, मेरे बॉस का नाम ले रहा है 😾🫵",
    "ऐसे mention कर रहा है, पता नहीं तू प्यार में पड़ा है कि नहीं 😼❤️"
  ];

  return api.sendMessage(
    replies[
      Math.floor(
        Math.random() * replies.length
      )
    ],
    event.threadID,
    event.messageID
  );
};

module.exports.run = async function () {};