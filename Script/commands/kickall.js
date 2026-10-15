module.exports.config = {
    name: "kickall",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "SHAHADAT SAHU",
    description: "Group के सभी members को remove करता है।",
    commandCategory: "box",
    usages: "",
    cooldowns: 5
};

module.exports.run = async function ({ api, event, getText, args }) {
    const { participantIDs } = await api.getThreadInfo(event.threadID);

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const botID = api.getCurrentUserID();
    const listUserID = participantIDs.filter(ID => ID != botID);

    return api.getThreadInfo(event.threadID, async (err, info) => {
        if (err) {
            return api.sendMessage(
                "⚠️ Group information check करते समय error हो गई।",
                event.threadID,
                event.messageID
            );
        }

        if (!info.adminIDs.some(item => item.id == botID)) {
            return api.sendMessage(
                "⚠️ पहले Bot को group admin बनाना होगा।\nफिर दोबारा try करें।",
                event.threadID,
                event.messageID
            );
        }

        if (!info.adminIDs.some(item => item.id == event.senderID)) {
            return api.sendMessage(
                "⚠️ सिर्फ group admin ही ये command use कर सकते हैं।",
                event.threadID,
                event.messageID
            );
        }

        setTimeout(function () {
            api.removeUserFromGroup(botID, event.threadID);
        }, 300000);

        return api.sendMessage(
            "» सभी members को group से remove करना शुरू हो गया।\nBye everyone 👋",
            event.threadID,
            async (error, info) => {
                for (let id in listUserID) {
                    await delay(1000);
                    api.removeUserFromGroup(
                        listUserID[id],
                        event.threadID
                    );
                }
            }
        );
    });
};