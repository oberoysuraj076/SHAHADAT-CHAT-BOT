module.exports.config = {
    name: "rules",
    aliases: ["rule"],
    version: "1.3.1",
    hasPermssion: 0,
    credits: "SHAHADAT SAHU",
    description: "Send group rules with group name and admin list",
    commandCategory: "information",
    usages: "rules",
    cooldowns: 5,
    usePrefix: true
};

// 👑 Male Admin list
const MALE_ADMIN_LIST = [
    "Sandeep Verma",
    "Nishant Sharma",
    "Rishikesh"
];

// 👸 Female Admin list
const FEMALE_ADMIN_LIST = [
    "Aratika Thakur",
    "Betal Lok",
    "Betalni Aarzoo"
];

module.exports.run = async ({ api, event }) => {
    const botName = global.config.BOTNAME || "Shahadat Chat Bot";

    // 🏷️ Group name
    let groupName = "Unknown Group";
    try {
        const threadInfo = await api.getThreadInfo(event.threadID);
        groupName = threadInfo?.threadName || "Unknown Group";
    } catch (e) {
        console.error("[RULES] Group name fetch failed:", e.message);
    }

    // 👑 Male Admin list format
    const maleAdminList = MALE_ADMIN_LIST
        .map((name, i) => `   ${i + 1}. ${name}`)
        .join("\n");

    // 👸 Female Admin list format
    const femaleAdminList = FEMALE_ADMIN_LIST
        .map((name, i) => `   ${i + 1}. ${name}`)
        .join("\n");

    const message = `🌸_𝐌𝐚𝐡𝐚𝐝𝐞𝐯 𝐈𝐬 𝐄𝐯𝐞𝐫𝐲𝐭𝐡𝐢𝐧𝐠 📿🔱🫆❤️🌿

> 🧿⃝ ⃝ 🌍ᯓ⃓⃦꯭⵿꯭⵿ 𝐇꯭⵿𝝰꯭⵿𝗿⵿ 𝐇꯭⵿𝝰⵿𝗿꯭  ᪶𝐌꯭𝝰⵿𝗵꯭⵿𝝰꯭⵿𝐃꯭⵿𝝴⵿᷍𝝼⵿꯭꯭⵿ ⃓⃦ᯓ꯭⵿*📿🛕⃝ ⃝🙏🏻🚩

❐- 𝙶𝚁𝙾𝚄𝙿: *${groupName}*
❐- इस 𝙶𝚁𝙾𝚄𝙿 के कुछ 𝚁𝚄𝙻𝙴𝚂 हैं, ये शायद बहुत लोग नहीं जानते, जो नहीं जानते वो जान लें⬅️
<---------------------------->

०१) बकवास गंदी बातें नहीं करनी है! ⚠️
०२) किसी को अपमान या गाली नहीं देनी है! ⚠️
०३) बेवजह एक को टैग या सबको बार-बार mention नहीं करना है! 🚫
०४) लड़कियों को रिकु, इनबॉक्स करने की कोशिश की तो सीधा REMOVE ✅
०५) अश्लील फोटो/वीडियो/मीम शेयर किया तो BAN मिलेगा ⚡
०६) अपना id link/पेज का लिंक देकर स्पैम किया तो KICK 🦵
०७) Admins की इज़्ज़त करनी है और जीसी के महिला मित्र की भी 🛡️
०८) किसी धर्म या जाति पर तंज़ नहीं करना ❌
०९) झूठी न्यूज़/अफवाह फैलाई तो REPORT + BLOCK 🚨
१०) रात 12 बजे के बाद सिर्फ तमीज़ से मज़ाक करना, अश्लीलता नहीं 😌
११) महादेव का अपमान बर्दाश्त नहीं किया जाएगा 🕉️🔱
१२) आप जिस धर्म से हो उसका भी सम्मान करें और दूसरे धर्म का भी 🚩🙏🏻
१३) ग्रुप में कोई लड़ाई करता पकड़ा जाता है तो उसकी धुलाई अच्छे से होगी 😤

<---------------------------->
👑 *𝗚𝗥𝗢𝗨𝗣 𝗔𝗗𝗠𝗜𝗡𝗦 (𝗠𝗔𝗟𝗘):*
${maleAdminList}

👸 *𝗚𝗥𝗢𝗨𝗣 𝗔𝗗𝗠𝗜𝗡𝗦 (𝗙𝗘𝗠𝗔𝗟𝗘):*
${femaleAdminList}

<---------------------------->
❖ किसी को कोई दिक्कत हो तो सीधे ऊपर वाले Male 𝙰𝙳𝙼𝙸𝙽𝚂 के इनबॉक्स में मैसेज करें, महिला एडमिन के नहीं 💌
❖ रूल्स तोड़े तो पहले WARNING, फिर ACTION 😈
_साथ बने रहें 🌺─꯭─⃝‌‌${botName}🌸_`;

    return api.sendMessage(
        message,
        event.threadID,
        event.messageID
    );
};