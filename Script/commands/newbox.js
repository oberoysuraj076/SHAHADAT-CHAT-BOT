module.exports.config = {
    name: "newbox",
    aliases: ["newgroup", "creategroup"],
    version: "1.1.0",
    hasPermssion: 1,
    credits: "SHAHADAT SAHU",
    description: "Create a new chat group with mentioned users",
    commandCategory: "Group",
    usages: "newbox @tag1 @tag2 | Group Name",
    cooldowns: 0
};

module.exports.run = async function ({
    api,
    event
}) {
    try {
        const senderID = String(event.senderID);
        const body = String(event.body || "");

        // 🧩 "|" zaroori hai separator ke liye
        if (!body.includes("|")) {
            return api.sendMessage(
                "⚠️ उपयोग:\nnewbox @tag1 @tag2 | Group Name",
                event.threadID,
                event.messageID
            );
        }

        const parts = body.split("|");

        const groupName = parts
            .slice(1)
            .join("|")
            .trim();

        if (!groupName) {
            return api.sendMessage(
                "⚠️ कृपया group का नाम लिखें।\n\nउदाहरण:\nnewbox @user1 @user2 | My Group",
                event.threadID,
                event.messageID
            );
        }

        const mentions = Object.keys(
            event.mentions || {}
        );

        const members = [
            senderID,
            ...mentions.map(id => String(id))
        ];

        const uniqueMembers = [
            ...new Set(members)
        ];

        // 👥 Kam se kam 1 aur user hona chahiye
        if (uniqueMembers.length < 2) {
            return api.sendMessage(
                "⚠️ कम से कम एक user को mention करें।",
                event.threadID,
                event.messageID
            );
        }

        return api.createNewGroup(
            uniqueMembers,
            groupName,
            (error, threadID) => {

                if (error) {
                    console.error(
                        "[NEWBOX ERROR]",
                        error
                    );

                    return api.sendMessage(
                        "⚠️ Group नहीं बनाया जा सका।",
                        event.threadID,
                        event.messageID
                    );
                }

                return api.sendMessage(
                    `✅ Group सफलतापूर्वक बन गया!\n\n` +
                    `👥 Group: ${groupName}`,
                    event.threadID,
                    event.messageID
                );
            }
        );

    } catch (error) {
        console.error(
            "[NEWBOX ERROR]",
            error
        );

        return api.sendMessage(
            "⚠️ Group बनाते समय एक समस्या हुई।",
            event.threadID,
            event.messageID
        );
    }
};