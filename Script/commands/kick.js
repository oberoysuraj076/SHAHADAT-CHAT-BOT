module.exports.config = {
    name: "kick",
    aliases: ["boot"],
    version: "1.0.0",
    hasPermssion: 0,
    credits: "SHAHADAT SAHU",
    description: "Tag किए गए user को group से remove करता है",
    commandCategory: "System",
    usages: "[tag]",
    cooldowns: 0
};

function getThreadInfo(api, threadID) {
    return new Promise((resolve, reject) => {
        if (typeof api.getThreadInfo !== "function") {
            return reject(new Error("getThreadInfo supported नहीं है"));
        }

        let doneOnce = false;

        const done = (error, data) => {
            if (doneOnce) return;
            doneOnce = true;
            error ? reject(error) : resolve(data);
        };

        try {
            const result = api.getThreadInfo(threadID, done);

            if (result && typeof result.then === "function") {
                result.then(data => done(null, data)).catch(done);
            } else if (result && typeof result === "object") {
                done(null, result);
            }
        } catch (error) {
            done(error);
        }
    });
}

function removeUser(api, userID, threadID) {
    return new Promise((resolve, reject) => {
        let doneOnce = false;

        const done = (error, data) => {
            if (doneOnce) return;
            doneOnce = true;
            error ? reject(error) : resolve(data);
        };

        try {
            const result = api.removeUserFromGroup(userID, threadID, done);

            if (result && typeof result.then === "function") {
                result.then(data => done(null, data)).catch(done);
            }
        } catch (error) {
            done(error);
        }
    });
}

module.exports.run = async function ({ api, event }) {
    const { threadID, messageID, senderID, mentions } = event;

    try {
        const mentionIDs = Object.keys(mentions || {});

        if (!mentionIDs.length) {
            return api.sendMessage(
                "⚠️ जिसे kick करना है उसे tag करें।",
                threadID,
                messageID
            );
        }

        const threadInfo = await getThreadInfo(api, threadID);

        if (!threadInfo || !Array.isArray(threadInfo.adminIDs)) {
            return api.sendMessage(
                "❌ Group admin information check नहीं हो पा रही।",
                threadID,
                messageID
            );
        }

        const botID = String(api.getCurrentUserID());

        const botIsAdmin = threadInfo.adminIDs.some(admin => {
            const id = typeof admin === "object" ? admin.id : admin;
            return String(id) === botID;
        });

        if (!botIsAdmin) {
            return api.sendMessage(
                "⚠️ पहले Bot को group admin बनाना होगा।",
                threadID,
                messageID
            );
        }

        const senderIsAdmin = threadInfo.adminIDs.some(admin => {
            const id = typeof admin === "object" ? admin.id : admin;
            return String(id) === String(senderID);
        });

        if (!senderIsAdmin) {
            return api.sendMessage(
                "⚠️ सिर्फ group admin ही ये command use कर सकते हैं।",
                threadID,
                messageID
            );
        }

        let success = 0;
        let failed = 0;

        for (const userID of mentionIDs) {
            if (String(userID) === botID) {
                failed++;
                continue;
            }

            try {
                await removeUser(api, userID, threadID);
                success++;
            } catch (error) {
                failed++;
                console.error(
                    `[KICK] ${userID} को remove नहीं कर पाए:`,
                    error?.message || error
                );
            }
        }

        if (success > 0 && failed === 0) {
            return api.sendMessage(
                `✅ ${success} लोगों को group से remove कर दिया गया।`,
                threadID,
                messageID
            );
        }

        if (success > 0) {
            return api.sendMessage(
                `✅ Remove हुए: ${success} लोग\n❌ Failed: ${failed} लोग`,
                threadID,
                messageID
            );
        }

        return api.sendMessage(
            "⚠️ User को group से remove नहीं किया जा सका।",
            threadID,
            messageID
        );

    } catch (error) {
        console.error("[KICK ERROR]", error);

        return api.sendMessage(
            "⚠️ Kick करते समय एक error हो गई।",
            threadID,
            messageID
        );
    }
};