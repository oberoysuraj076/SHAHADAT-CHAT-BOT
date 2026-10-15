module.exports.config = {
  name: "pending",
  aliases: ["pen", "aproved", "aprval", "apv"],
  version: "2.0.0",
  credits: "SHAHADAT SAHU",
  hasPermssion: 2,
  description: "Manage bot pending group requests",
  commandCategory: "system",
  cooldowns: 0
};

module.exports.handleReply = async function ({ api, event, handleReply }) {
  if (String(event.senderID) !== String(handleReply.author)) return;

  const body = String(event.body || "").trim().toLowerCase();
  if (!body) return;

  const pending = handleReply.pending;

  // 💬 Hindi welcome message
  const notify = `🌸 आपके ग्रुप में आ गया हूँ — ${global.config.BOTNAME}!

♡ अब से आप सबके साथ मस्ती, मनोरंजन और हर काम में साथ रहूँगा।

› मदद पाने के लिए use करें:
${global.config.PREFIX}help

✦ ${global.config.BOTNAME} use करने के लिए शुक्रिया।
♡ उम्मीद है हमारे साथ अच्छा समय बिताएँगे!`;

  // ❌ call — sab groups se nikal jao
  if (body === "call") {
    let count = 0;

    for (const group of pending) {
      try {
        await api.removeUserFromGroup(
          api.getCurrentUserID(),
          group.threadID
        );
        count++;
      } catch (e) {}
    }

    return api.sendMessage(
      `⚠️ ${count} group(s) successfully reject कर दिए गए!`,
      event.threadID,
      event.messageID
    );
  }

  // ✅ all — sab groups ko approve karo
  if (body === "all") {
    let count = 0;

    for (const group of pending) {
      try {
        await api.sendMessage(notify, group.threadID);
        count++;
      } catch (e) {}
    }

    return api.sendMessage(
      `✅ ${count} group(s) successfully approve कर दिए गए!`,
      event.threadID,
      event.messageID
    );
  }

  const rejectMode =
    body.startsWith("c") ||
    body.startsWith("cancel");

  const numbers = body.match(/\d+/g) || [];
  if (!numbers.length) return;

  let count = 0;

  for (const num of numbers) {
    const index = parseInt(num);

    if (index <= 0 || index > pending.length) {
      return api.sendMessage(
        `⚠️ ${num} एक सही number नहीं है।`,
        event.threadID,
        event.messageID
      );
    }

    const group = pending[index - 1];

    try {
      if (rejectMode) {
        await api.removeUserFromGroup(
          api.getCurrentUserID(),
          group.threadID
        );
      } else {
        await api.sendMessage(notify, group.threadID);
      }

      count++;
    } catch (e) {
      console.error(e);
    }
  }

  return api.sendMessage(
    rejectMode
      ? `📛 ${count} group(s) successfully reject कर दिए गए!`
      : `✅ ${count} group(s) successfully approve कर दिए गए!`,
    event.threadID,
    event.messageID
  );
};

module.exports.run = async function ({ api, event }) {
  const { threadID, messageID } = event;

  try {
    const [spam, pending] = await Promise.all([
      api.getThreadList(100, null, ["OTHER"]),
      api.getThreadList(100, null, ["PENDING"])
    ]);

    const list = [
      ...(spam || []),
      ...(pending || [])
    ].filter(
      group =>
        group.isSubscribed &&
        group.isGroup
    );

    if (!list.length) {
      return api.sendMessage(
        "✅ कोई pending group नहीं मिला।",
        threadID,
        messageID
      );
    }

    const text = list
      .map(
        (group, i) =>
          `${i + 1}. ${group.name || "Unnamed Group"}`
      )
      .join("\n");

    return api.sendMessage(
      `📋 Pending Groups: ${list.length}

${text}

Reply करें:
• 1 2 3 — चुने हुए approve करें
• all — सब approve करें
• c1 c2 — चुने हुए reject करें
• call — सब reject करें`,
      threadID,
      (err, info) => {
        if (err) return;

        global.client.handleReply.push({
          name: this.config.name,
          messageID: info.messageID,
          author: event.senderID,
          pending: list
        });
      },
      messageID
    );

  } catch (e) {
    console.error(e);

    return api.sendMessage(
      "❌ Pending groups नहीं मिल पाए।",
      threadID,
      messageID
    );
  }
};