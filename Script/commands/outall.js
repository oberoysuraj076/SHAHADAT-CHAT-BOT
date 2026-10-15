module.exports.config = {
  name: "outall",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "SHAHADAT SAHU",
  description: "Leave all groups with goodbye message",
  commandCategory: "Admin",
  usages: "outall",
  cooldowns: 0
};

module.exports.run = async function ({ api, event }) {
  try {
    const list = await api.getThreadList(
      100,
      null,
      ["INBOX"]
    );

    let count = 0;

    const botName =
      global.config.BOTNAME || "Messenger Chat Bot";

    for (const group of list) {
      if (
        group.isGroup &&
        group.threadID != event.threadID
      ) {
        try {
          // 💬 Hindi goodbye message
          await api.sendMessage(
            `अलविदा सबको! 👋❤️

${botName} इस group से निकल रहा है।
सब अच्छे रहेंगे। 🥺

${botName} use करने के लिए शुक्रिया। 🤖❤️`,
            group.threadID
          );

          // ⏱️ 500ms delay
          await new Promise(resolve =>
            setTimeout(resolve, 500)
          );

          // 🚪 Leave group
          await api.removeUserFromGroup(
            api.getCurrentUserID(),
            group.threadID
          );

          count++;
        } catch (e) {
          console.error(
            `Failed to leave ${group.threadID}:`,
            e.message
          );
        }
      }
    }

    return api.sendMessage(
      `✅ ${count} groups से successfully निकल गया।`,
      event.threadID
    );

  } catch (error) {
    console.error(error);

    return api.sendMessage(
      "📛 Groups से निकलने में fail हो गया।",
      event.threadID
    );
  }
};