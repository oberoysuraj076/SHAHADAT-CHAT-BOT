const fs = require("fs");
const path = require("path");
const axios = require("axios");

module.exports.config = {
	name: "give",
	version: "1.0.0",
	hasPermssion: 2,
	credits: "Shaon Ahmed",
	description: "Upload local command files to a pastebin service.",
	commandCategory: "utility",
	usages: "[filename]",
	cooldowns: 5
};

module.exports.run = async function ({ api, event, args }) {
	const { threadID, messageID } = event;

	if (args.length === 0) {
		return api.sendMessage(
			"📁 कृपया फ़ाइल का नाम दें।\nउपयोग: give <filename>",
			threadID,
			messageID
		);
	}

	const fileName = args[0];
	const commandsPath = path.join(__dirname, "..", "commands");
	const filePath1 = path.join(commandsPath, fileName);
	const filePath2 = path.join(commandsPath, fileName + ".js");

	let fileToRead;
	if (fs.existsSync(filePath1)) {
		fileToRead = filePath1;
	} else if (fs.existsSync(filePath2)) {
		fileToRead = filePath2;
	} else {
		return api.sendMessage(
			"❌ `commands` फ़ोल्डर में फ़ाइल नहीं मिली।",
			threadID,
			messageID
		);
	}

	// 📖 Read file
	let data;
	try {
		data = fs.readFileSync(fileToRead, "utf8");
	} catch (err) {
		console.error("❗ Read error:", err);
		return api.sendMessage(
			"❗ फ़ाइल पढ़ने में समस्या हुई।",
			threadID,
			messageID
		);
	}

	// 📤 Notify user
	const waitMsg = await api.sendMessage(
		"📤 फ़ाइल PasteBin पर अपलोड हो रही है, कृपया प्रतीक्षा करें...",
		threadID,
		messageID
	);

	try {
		const pastebinAPI = "https://pastebin-api.vercel.app";
		const response = await axios.post(
			`${pastebinAPI}/paste`,
			{ text: data },
			{ timeout: 20000 }
		);

		// 🗑️ Remove "uploading..." message
		setTimeout(() => {
			api.unsendMessage(waitMsg.messageID);
		}, 1000);

		if (response.data && response.data.id) {
			const link = `${pastebinAPI}/raw/${response.data.id}`;
			return api.sendMessage(
				`📄 फ़ाइल: ${path.basename(fileToRead)}\n✅ फ़ाइल सफलतापूर्वक अपलोड हो गई:\n🔗 ${link}`,
				threadID,
				messageID
			);
		} else {
			console.error("⚠️ Unexpected API response:", response.data);
			return api.sendMessage(
				"⚠️ अपलोड विफल रहा। PasteBin सर्वर से सही ID नहीं मिली।",
				threadID,
				messageID
			);
		}

	} catch (uploadError) {
		console.error("❌ Upload error:", uploadError);

		// 🗑️ Remove waiting message on error too
		try { api.unsendMessage(waitMsg.messageID); } catch {}

		return api.sendMessage(
			"❌ फ़ाइल अपलोड करने में समस्या हुई:\n" + uploadError.message,
			threadID,
			messageID
		);
	}
};