module.exports.config = {
    name: "adduser",
    aliases: ["useradd", "addmember"],
    version: "1.1.0",
    hasPermssion: 0,
    credits: "SHAHADAT SAHU",
    description: "Add user to group using profile link or UID",
    commandCategory: "system",
    usages: "[uid/link]",
    cooldowns: 5,
    usePrefix: true
};

const axios = require("axios");

module.exports.run = async ({ api, event, args }) => {
    const { threadID, messageID } = event;
    const out = msg => api.sendMessage(msg, threadID, messageID);

    if (!args[0]) return out("UID या Link दें......");


    if (!isNaN(args[0])) {
        return addUserToGroup(args[0]);
    }


    let link = args[0];
    let uid = null;

    try {
        if (!link.includes("facebook.com") && !link.includes("fb.com"))
            return out("Facebook link दें.....");

        let res = await axios.get(link);
        let data = res.data;

        
        let match = data.match(/"userID":"(\d+)"/);
        if (match) uid = match[1];

        if (!uid) return out("UID नहीं मिला.....");

        return addUserToGroup(uid);

    } catch (e) {
        return out("Link से UID निकालने में समस्या हुई!");
    }

    async function addUserToGroup(uid) {
        try {
            let info = await api.getThreadInfo(threadID);
            let participantIDs = info.participantIDs.map(e => parseInt(e));
            let admins = info.adminIDs.map(e => parseInt(e.id));
            let botID = parseInt(api.getCurrentUserID());

            uid = parseInt(uid);

            if (participantIDs.includes(uid))
                return out("ये user ग्रुप में पहले से है.....");

            await api.addUserToGroup(uid, threadID);

            if (info.approvalMode === true && !admins.includes(botID))
                return out("Request list में add हो गया ✔️");

            return out("Successfully added ✔️");

        } catch (err) {
            return out("Add नहीं किया जा सका..!\n user शायद Friendlist में नहीं है........");
        }
    }
};