module.exports.config = {
  name: "inbox",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "SHAHADAT SAHU",
  description: "Sends a message directly to the user's inbox from a group",
  commandCategory: "Utility",
  usages: "[message (optional)]",
  cooldowns: 5
};

module.exports.run = async function ({ api, event, args, Users }) {
  const { threadID, messageID, senderID, isGroup } = event;

  try {
    if (!isGroup) {
      return api.sendMessage(
        "अरे पगले! तू तो पहले से ही मेरे इनबॉक्स में है! 😹",
        threadID,
        messageID
      );
    }

    const userName = await Users.getNameUser(senderID);
    const customMessage = args.join(" ");

    let inboxText = "";
    if (customMessage) {
      inboxText = `अस्सलामु अलैकुम ${userName}!\n\nतूने ग्रुप से मुझे ये मैसेज भेजने को कहा था:\n📩 "${customMessage}"\n\nकिसी भी ज़रूरत के लिए मुझे सीधे इनबॉक्स में मैसेज कर सकता है! 🥰`;
    } else {
      inboxText = `अस्सलामु अलैकुम ${userName}! ❤️\n\nतूने ग्रुप से मुझे बुलाया, तो तेरे इनबॉक्स में चला आया। 🙈\n\nबोल जानू, तेरे लिए क्या करूँ? कोई भी बात या मस्ती करनी हो तो मुझे सीधे मैसेज कर! 🤖✨`;
    }

    api.sendMessage(inboxText, senderID, (err) => {
      if (err) {
        return api.sendMessage(
          {
            body: `⚠️ माफ़ करना @${userName}, तेरे इनबॉक्स में मैसेज नहीं भेज पाया!\n\nकारण: तेरी ID का Message Request बंद हो सकता है या मुझे मैसेज भेजने का ऑप्शन लॉक है। कृपया पहले मेरे इनबॉक्स में एक 'Hi' भेज दे।`,
            mentions: [{ tag: `@${userName}`, id: senderID }]
          },
          threadID,
          messageID
        );
      }

      return api.sendMessage(
        {
          body: `✅ ये ले @${userName}, तेरे इनबॉक्स में एक मैसेज भेज दिया है! 💌\n\n👉 इनबॉक्स में मैसेज न मिले तो मैसेंजर के 'Message Requests' या 'Spam' फोल्डर में चेक कर ले।`,
          mentions: [{ tag: `@${userName}`, id: senderID }]
        },
        threadID,
        messageID
      );
    });
  } catch (error) {
    console.error("Inbox Command Error:", error);
    return api.sendMessage(
      `❌ कुछ गड़बड़ हो गई!\n\n${error.message}`,
      threadID,
      messageID
    );
  }
};