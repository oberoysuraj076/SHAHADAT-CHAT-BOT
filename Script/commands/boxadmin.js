module.exports.config = {
  name: "boxadmin",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "SHAHADAT SAHU",
  description: "Add/remove admin via me, mention, or reply",
  commandCategory: "system",
  usages: "boxadmin me | boxadmin add/remove @mention | reply",
  cooldowns: 5
};

const cleanName = (name) => {
  if (!name) return null;
  return name.replace(/\s+/g, " ").trim();
};

module.exports.run = async function ({ api, event, args }) {
  const threadID = event.threadID;
  const botID = api.getCurrentUserID();

  try {
    let action = args[0]?.toLowerCase();

    if (action === "me") action = "add";

    if (!["add", "remove"].includes(action))
      return api.sendMessage(
        "🌸 Usage : boxadmin me | boxadmin add/remove @mention | reply",
        threadID,
        event.messageID
      );

    let uid;
    let targetName;

    if (args[0]?.toLowerCase() === "me") {
      uid = event.senderID;
    } else if (event.mentions && Object.keys(event.mentions).length > 0) {
      uid = Object.keys(event.mentions)[0];
    } else if (event.type === "message_reply" && event.messageReply) {
      uid = event.messageReply.senderID;
    } else if (args[1]?.toLowerCase() === "me") {
      uid = event.senderID;
    } else {
      return api.sendMessage(
        "🌸 Usage : boxadmin me | boxadmin add/remove @mention | reply",
        threadID,
        event.messageID
      );
    }

    const userInfo = await api.getUserInfo([uid, event.senderID]);

    const senderName = cleanName(userInfo[event.senderID]?.name) || "आप";

    if (event.mentions && Object.keys(event.mentions).length > 0) {
      targetName = cleanName(Object.values(event.mentions)[0]);
    } else if (event.type === "message_reply" && event.messageReply) {
      targetName =
        cleanName(event.messageReply.senderName) ||
        cleanName(userInfo[uid]?.name);
    } else {
      targetName = cleanName(userInfo[uid]?.name);
    }

    if (!targetName) targetName = "User";

    const threadInfo = await api.getThreadInfo(threadID);
    const botIsAdmin = threadInfo.adminIDs.some(
      (admin) => admin.id == botID
    );
    const targetIsAdmin = threadInfo.adminIDs.some(
      (admin) => admin.id == uid
    );

    if (!botIsAdmin && uid !== event.senderID)
      return api.sendMessage(
        "🌸 इस कमांड को इस्तेमाल करने के लिए पहले मुझे ग्रुप का एडमिन बनाएँ 🌺",
        threadID,
        event.messageID
      );

    if (action === "add") {
      if (targetIsAdmin)
        return api.sendMessage(
          `${targetName} पहले से ही ग्रुप का एडमिन है ✅`,
          threadID,
          event.messageID
        );

      await api.changeAdminStatus(threadID, uid, true);

      if (uid === event.senderID)
        return api.sendMessage(
          `✅ ${senderName} ने खुद को एडमिन बना लिया! 🌸`,
          threadID,
          event.messageID
        );
      else
        return api.sendMessage(
          `✅ ${senderName} ने ${targetName} को एडमिन बना दिया! 😘`,
          threadID,
          event.messageID
        );

    } else if (action === "remove") {
      if (!targetIsAdmin)
        return api.sendMessage(
          `${targetName} अभी तक ग्रुप का एडमिन नहीं है! ❌`,
          threadID,
          event.messageID
        );

      await api.changeAdminStatus(threadID, uid, false);

      if (uid === event.senderID)
        return api.sendMessage(
          `✅ ${senderName} ने खुद को एडमिन से रिमूव कर लिया! 🐸`,
          threadID,
          event.messageID
        );
      else
        return api.sendMessage(
          `✅ ${senderName} ने ${targetName} को एडमिन से रिमूव कर दिया! 🤣`,
          threadID,
          event.messageID
        );
    }

  } catch (e) {
    return api.sendMessage(
      "⚠️ Error: " + e.message,
      threadID,
      event.messageID
    );
  }
};