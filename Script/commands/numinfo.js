const axios = require("axios");

const dipto = "https://www.noobs-api.rf.gd/dipto";

module.exports.config = {
    name: "numinfo",
    aliases: ["numberinfo", "numberi"],
    version: "2.0.0",
    hasPermssion: 0,
    credits: "Dipto",
    description: "Get basic information about a phone number",
    commandCategory: "Information",
    usages: "numinfo <number>",
    cooldowns: 5
};

module.exports.run = async function ({
    api,
    event,
    args
}) {
    const {
        threadID,
        messageID
    } = event;

    // ❌ Number nahi diya
    if (!args[0]) {
        return api.sendMessage(
            "⚠️ कृपया एक number दें!\n\n𝗨𝘀𝗮𝗴𝗲: /numinfo <number>",
            threadID,
            messageID
        );
    }

    let number = String(args[0]).trim();

    // 🔧 Number normalize karo
    if (number.startsWith("+88")) {
        number = number.substring(1);
    }

    if (number.startsWith("01")) {
        number = "88" + number;
    }

    // ✅ Bangladeshi number validation
    if (!/^8801\d{9}$/.test(number)) {
        return api.sendMessage(
            "⚠️ सही बांग्लादेशी मोबाइल number दें।",
            threadID,
            messageID
        );
    }

    try {
        // ⏳ Reaction
        if (typeof api.setMessageReaction === "function") {
            api.setMessageReaction(
                "⌛",
                messageID,
                () => {},
                true
            );
        }

        const response = await axios.get(
            `${dipto}/numinfo?number=${encodeURIComponent(number)}`,
            {
                timeout: 15000
            }
        );

        const data = response.data;

        // ❌ Data nahi mila
        if (!data || !data.info || !data.info.length) {
            return api.sendMessage(
                "⚠️ कोई public information नहीं मिली।",
                threadID,
                messageID
            );
        }

        const types = [
            ...new Set(
                data.info
                    .map(item => item.type)
                    .filter(Boolean)
            )
        ];

        const body = [
            "📱 Number Information",
            "",
            `📞 Number: ${number}`,
            `📡 Type: ${types.length ? types.join(", ") : "Not found"}`,
            "",
            "ℹ️ निजी नाम या निजी जानकारी नहीं दिखाई जा रही।"
        ].join("\n");

        return api.sendMessage(
            body,
            threadID,
            messageID
        );

    } catch (error) {
        console.error(
            "[NUMINFO]",
            error.response?.data || error.message
        );

        // ❌ API error
        return api.sendMessage(
            "⚠️ जानकारी नहीं मिल पाई। कुछ देर बाद दोबारा कोशिश करें।",
            threadID,
            messageID
        );
    }
};