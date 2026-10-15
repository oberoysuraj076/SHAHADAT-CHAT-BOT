module.exports.config = {
    name: "out",
    aliases: ["leave"],
    version: "1.1.0",
    hasPermssion: 2,
    credits: "SHAHADAT SAHU",
    description: "Leave group with goodbye message",
    commandCategory: "Admin",
    usages: "out [id]",
    cooldowns: 0,
    usePrefix: true
};

module.exports.run = async function({
    api,
    event,
    args
}) {
    const botID = api.getCurrentUserID();

    const threadID =
        args[0] && !isNaN(args[0])
            ? args.join(" ")
            : event.threadID;

    // 💬 Hindi goodbye message
    const message = `👋 अलविदा सबको! 💚

💖 सबका बहुत-बहुत शुक्रिया मेरे साथ रहने के लिए।
🌸 इस group के साथ रहकर बहुत अच्छा लगा।
🥰 सब अच्छे रहेंगे, अपना ख्याल रखेंगे!
💫 फिर मिलेंगे! 🌺`;

    try {
        // 📤 Goodbye message bhejo
        await api.sendMessage(
            message,
            threadID
        );

        // 🚪 1.5 second baad group chhodo
        setTimeout(() => {
            api.removeUserFromGroup(
                botID,
                threadID
            );
        }, 1500);

    } catch (error) {
        console.error("[OUT]", error);

        return api.sendMessage(
            "⚠️ Group छोड़ने में fail हो गया।",
            event.threadID,
            event.messageID
        );
    }
};