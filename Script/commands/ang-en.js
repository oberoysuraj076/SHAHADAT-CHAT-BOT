module.exports.config = {
  name: "en",
  version: "1.0.3",
  hasPermssion: 0,
  credits: "SHAHADAT SAHU",
  usePrefix: false,
  description: "Hindi to English text translation",
  commandCategory: "media",
  usages: "[Text]",
  cooldowns: 5,
  dependencies: {
    "request": ""
  }
};

module.exports.run = async ({ api, event, args }) => {
  const request = global.nodemodule["request"];

  let translateThis = "";

  // अगर user ने किसी message पर reply किया है → reply का text लो
  if (event.type === "message_reply" && event.messageReply?.body) {
    translateThis = event.messageReply.body;
  }
  // वरना user का लिखा हुआ text लो
  else {
    translateThis = args.join(" ");
  }

  // अगर text खाली है → error
  if (!translateThis || translateThis.length === 0) {
    return api.sendMessage(
      "⚠️ Please provide Hindi text to translate.\nExample: en नमस्ते",
      event.threadID,
      event.messageID
    );
  }

  // Google Translate API → Hindi से English
  const url = encodeURI(
    `https://translate.googleapis.com/translate_a/single?client=gtx&sl=hi&tl=en&dt=t&q=${translateThis}`
  );

  return request(url, (err, response, body) => {
    if (err) {
      return api.sendMessage(
        "❌ An error occurred while translating!",
        event.threadID,
        event.messageID
      );
    }

    try {
      const retrieve = JSON.parse(body);
      let text = "";
      retrieve[0].forEach(item => {
        if (item[0]) text += item[0];
      });

      if (!text) text = "❌ Translation failed.";

      return api.sendMessage(text, event.threadID, event.messageID);
    } catch (e) {
      return api.sendMessage(
        "❌ Failed to parse translation result.",
        event.threadID,
        event.messageID
      );
    }
  });
};