module.exports.config = {
 name: "tag",
 version: "1.0.0",
 hasPermssion: 2,
 credits: "SHAHADAT SAHU",
 description: "Group में सभी को निश्चित संख्या में mention भेजना",
 commandCategory: "group",
 usages: "/tag [everyone]",
 cooldowns: 2
};

module.exports.run = async ({ api, event, args }) => {
 const threadID = event.threadID;
 const threadInfo = await api.getThreadInfo(threadID);
 const memberIDs = threadInfo.participantIDs;

 // 🔢 Repeat count (default 1)
 const repeatCount = parseInt(args[0]) || 1;

 // 👥 Sabhi members ko mention karo (bot ko chhod ke)
 const mentions = memberIDs
 .filter(id => id != api.getCurrentUserID())
 .map(id => ({ tag: "@everyone", id }));

 for (let i = 0; i < repeatCount; i++) {
 await api.sendMessage({
 body: `📢 @everyone\nसब चुप से बाहर निकलो 🐸`,
 mentions
 }, threadID);

 // ⏱️ 2 second gap between repeats
 await new Promise(resolve => setTimeout(resolve, 2000)); 
 }
};