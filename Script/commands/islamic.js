const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
    name: "hindu",
    aliases: ["hinduvideo", "bhakti", "mandir"],
    version: "1.0.0",
    hasPermssion: 0,
    credits: "SHAHADAT SAHU",
    description: "Send a random Hindu devotional video",
    commandCategory: "Random video",
    usages: "hindu",
    cooldowns: 5,
    usePrefix: true,
    dependencies: {
        axios: "",
        "fs-extra": ""
    }
};

// 📌 Apni Hindu / Bhakti videos ke Imgur .mp4 links yahan daalein
const videos = [
    "https://i.imgur.com/XXXXXXXX1.mp4",
    "https://i.imgur.com/XXXXXXXX2.mp4",
    "https://i.imgur.com/XXXXXXXX3.mp4",
    "https://i.imgur.com/XXXXXXXX4.mp4",
    "https://i.imgur.com/XXXXXXXX5.mp4",
    "https://i.imgur.com/XXXXXXXX6.mp4",
    "https://i.imgur.com/XXXXXXXX7.mp4",
    "https://i.imgur.com/XXXXXXXX8.mp4",
    "https://i.imgur.com/XXXXXXXX9.mp4",
    "https://i.imgur.com/XXXXXXXX10.mp4"
];

// 🕉️ Hindu greetings / captions (Hindi)
const captions = [
    "🕉️ ॐ नमः शिवाय!\n\nजय श्री राम 🚩\nभगवान हम सबका कल्याण करें। 🙏",
    "🚩 जय श्री कृष्ण!\n\nराधे राधे 🌸\nहर हर महादेव 🕉️",
    "🕉️ हर हर महादेव!\n\nबोलो जय श्री राम 🚩\nसंकट हरें भगवान। 🙏",
    "🌸 जय माता दी!\n\nजय श्री गणेश 🐘\nहर कार्य में सफलता मिले। 🙏",
    "🚩 सियावर रामचंद्र की जय!\n\nप्रभु श्री राम हम सब पर कृपा करें। 🙏",
    "🕉️ ॐ नमो भगवते वासुदेवाय!\n\nश्री कृष्ण की कृपा सदा बनी रहे। 🌸",
    "🙏 जय बजरंगबली!\n\nसंकट कटे, मन शांत रहे। 🚩",
    "🌸 दुर्गा माता की जय!\n\nशेरावाली माँ हमें शक्ति दें। 🙏",
    "🚩 जय लक्ष्मी माता!\n\nघर में सुख-समृद्धि बनी रहे। 🌸",
    "🕉️ वक्रतुण्ड महाकाय!\n\nगणपति बप्पा मोरया 🐘"
];

module.exports.run = async function ({ api, event }) {
    const fileName =
        `hindu_${Date.now()}_${Math.random()
            .toString(36)
            .slice(2)}.mp4`;

    const cacheDir =
        path.join(__dirname, "cache");

    const filePath =
        path.join(cacheDir, fileName);

    try {
        await fs.ensureDir(cacheDir);

        const videoUrl =
            videos[
                Math.floor(
                    Math.random() * videos.length
                )
            ];

        // ⚠️ Placeholder check
        if (videoUrl.includes("XXXXXXXX")) {
            return api.sendMessage(
                "⚠️ Pehle `videos` array mein apne Imgur .mp4 links daalein!",
                event.threadID,
                event.messageID
            );
        }

        api.setMessageReaction(
            "⏳",
            event.messageID,
            () => {},
            true
        );

        const response = await axios.get(
            videoUrl,
            {
                responseType: "stream",
                timeout: 60000,
                maxContentLength: Infinity,
                maxBodyLength: Infinity
            }
        );

        await new Promise((resolve, reject) => {
            const writer =
                fs.createWriteStream(filePath);

            response.data.pipe(writer);

            writer.on("finish", resolve);
            writer.on("error", reject);

            response.data.on(
                "error",
                reject
            );
        });

        const stat =
            await fs.stat(filePath);

        if (!stat.size) {
            throw new Error(
                "Downloaded video is empty"
            );
        }

        api.setMessageReaction(
            "✅",
            event.messageID,
            () => {},
            true
        );

        // 🎲 Random caption pick
        const caption =
            captions[
                Math.floor(
                    Math.random() * captions.length
                )
            ];

        return api.sendMessage(
            {
                body: caption,
                attachment:
                    fs.createReadStream(filePath)
            },
            event.threadID,
            async () => {
                await fs.remove(filePath)
                    .catch(() => {});
            },
            event.messageID
        );

    } catch (error) {
        await fs.remove(filePath)
            .catch(() => {});

        console.error(
            "[HINDU ERROR]",
            error?.response?.status ||
            error?.message ||
            error
        );

        api.setMessageReaction(
            "❌",
            event.messageID,
            () => {},
            true
        );

        return api.sendMessage(
            "❌ हिंदू भक्ति वीडियो भेजा नहीं जा सका।\n\n" +
            "⚠️ वीडियो सोर्स या डाउनलोड कनेक्शन में समस्या हुई है।",
            event.threadID,
            event.messageID
        );
    }
};