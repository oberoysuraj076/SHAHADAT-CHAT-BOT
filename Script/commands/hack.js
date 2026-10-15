module.exports.config = {
    name: "hack",
    aliases: ["idhack", "hacked"],
    version: "2.0.0",
    hasPermssion: 0,
    credits: "SHAHADAT SAHU",
    description: "Create a fun fake hacker style image using user's profile picture",
    commandCategory: "fun",
    usages: "reply or mention",
    cooldowns: 10,
    usePrefix: true,
    dependencies: {
        "canvas": "",
        "fs-extra": "",
        "axios": ""
    }
};

module.exports.wrapText = function(ctx, text, maxWidth) {
    const words = text.split(" ");
    const lines = [];
    let line = "";

    for (const word of words) {
        const testLine = line ? `${line} ${word}` : word;

        if (ctx.measureText(testLine).width <= maxWidth) {
            line = testLine;
        } else {
            if (line) lines.push(line);
            line = word;
        }
    }

    if (line) lines.push(line);

    return lines;
};

module.exports.run = async function({ api, event }) {
    const { loadImage, createCanvas } = require("canvas");
    const fs = global.nodemodule["fs-extra"];
    const axios = global.nodemodule.axios;

    const cacheDir = __dirname + "/cache";

    const bgPath = cacheDir + `/hack_${event.senderID}_${Date.now()}.png`;
    const avatarPath = cacheDir + `/avatar_${event.senderID}_${Date.now()}.png`;

    try {
        fs.ensureDirSync(cacheDir);

        let targetID;

        if (
            event.type === "message_reply" &&
            event.messageReply &&
            event.messageReply.senderID
        ) {
            targetID = event.messageReply.senderID;
        } else if (event.mentions && Object.keys(event.mentions).length > 0) {
            targetID = Object.keys(event.mentions)[0];
        } else {
            targetID = event.senderID;
        }

        // 👤 Get user name
        const userInfo = await api.getUserInfo(targetID);
        const name =
            userInfo &&
            userInfo[targetID] &&
            userInfo[targetID].name
                ? userInfo[targetID].name
                : "Unknown User";

        // 🖼️ Background image URL
        const backgroundUrl =
            "https://drive.google.com/uc?id=1RwJnJTzUmwOmP3N_mZzxtp63wbvt9bLZ";

        // 👤 Avatar URL
        const avatarUrl =
            `https://graph.facebook.com/${targetID}/picture` +
            `?width=720&height=720` +
            `&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;

        // ⬇️ Download both images in parallel
        const [avatarResponse, backgroundResponse] = await Promise.all([
            axios.get(avatarUrl, {
                responseType: "arraybuffer",
                timeout: 20000
            }),
            axios.get(backgroundUrl, {
                responseType: "arraybuffer",
                timeout: 20000
            })
        ]);

        fs.writeFileSync(avatarPath, Buffer.from(avatarResponse.data));
        fs.writeFileSync(bgPath, Buffer.from(backgroundResponse.data));

        const background = await loadImage(bgPath);
        const avatar = await loadImage(avatarPath);

        const canvas = createCanvas(background.width, background.height);
        const ctx = canvas.getContext("2d");

        // 🎨 Draw background
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        // ✍️ Draw name text
        ctx.font = "400 23px Arial";
        ctx.fillStyle = "#1878F3";
        ctx.textAlign = "start";

        const lines = this.wrapText(ctx, name, 1160);
        const lineHeight = 28;

        lines.forEach((line, index) => {
            ctx.fillText(line, 200, 497 + index * lineHeight);
        });

        // 👤 Draw avatar
        ctx.drawImage(avatar, 83, 437, 100, 101);

        // 💾 Save result
        const imageBuffer = canvas.toBuffer("image/png");
        fs.writeFileSync(bgPath, imageBuffer);

        // 🧹 Cleanup avatar temp
        if (fs.existsSync(avatarPath)) {
            fs.unlinkSync(avatarPath);
        }

        return api.sendMessage(
            {
                body: "तेरा ID हैक कर लिया गया 😽✔️",
                attachment: fs.createReadStream(bgPath)
            },
            event.threadID,
            () => {
                if (fs.existsSync(bgPath)) {
                    fs.unlinkSync(bgPath);
                }
            },
            event.messageID
        );

    } catch (error) {
        console.error("[HACK CMD ERROR]", error);

        // 🧹 Cleanup on error
        try {
            if (fs.existsSync(avatarPath)) fs.unlinkSync(avatarPath);
            if (fs.existsSync(bgPath)) fs.unlinkSync(bgPath);
        } catch (e) {}

        return api.sendMessage(
            "कुछ गड़बड़ हो गई। दोबारा कोशिश करें।",
            event.threadID,
            event.messageID
        );
    }
};