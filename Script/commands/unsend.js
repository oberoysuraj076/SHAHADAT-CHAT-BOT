const fs = require("fs");
const path = require("path");

module.exports.config = {
  name: "unsend",
  aliases: ["del", "remove"],
  version: "2.0.0",
  hasPermssion: 0,
  credits: "SHAHADAT SAHU",
  description: "Unsend bot's sent message",
  commandCategory: "system",
  usages: "uns / del / delete / remove / u",
  cooldowns: 0
};

// 💬 Hindi messages
const lang = {
  returnCant: "क्या unsend करूँ? reply करके बोलो  🫰",
  missingReply: "क्या unsend करूँ? reply करके बोलो 🫰"
};

module.exports.run = async function ({ api, event }) {
  // ⏭️ Reply zaroori hai
  if (event.type !== "message_reply")
    return api.sendMessage(lang.missingReply, event.threadID, event.messageID);

  // 🤖 Sirf bot ke apne message delete kar sakta hai
  if (event.messageReply.senderID !== api.getCurrentUserID())
    return api.sendMessage(lang.returnCant, event.threadID, event.messageID);

  return api.unsendMessage(event.messageReply.messageID);
};

module.exports.handleEvent = async function ({ api, event }) {
  try {
    const body = (event.body || "").trim().toLowerCase();

    const triggers = ["uns", "unsend", "del", "delete", "remove", "u"];

    // 🔧 Prefix detect karo
    let prefixes = [""];
    try {
      const prefixFile = path.join(__dirname, "prefix.js");
      if (fs.existsSync(prefixFile)) {
        const getPrefix = require(prefixFile);
        if (Array.isArray(getPrefix)) prefixes = ["", ...getPrefix];
        else if (typeof getPrefix === "string") prefixes = ["", getPrefix];
      }
    } catch (e) {}

    const isTriggered = prefixes.some(p =>
      triggers.some(t => body === p + t)
    );

    if (isTriggered) {
      // ⏭️ Reply zaroori hai
      if (event.type !== "message_reply")
        return api.sendMessage(lang.missingReply, event.threadID, event.messageID);

      // 🤖 Sirf bot ka message
      if (event.messageReply.senderID !== api.getCurrentUserID())
        return api.sendMessage(lang.returnCant, event.threadID, event.messageID);

      return api.unsendMessage(event.messageReply.messageID);
    }
  } catch (err) {
    console.error("तेरी बात सुन नहीं पाया 🤣", err);
  }
};