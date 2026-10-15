module.exports.config = {
  name: "broken",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "SHAHADAT SAHU",
  description: "tag 1 person and unlimited msg.",
  commandCategory: "admin",
  usages: "please @mention",
  cooldowns: 0,
  dependencies: {
    "fs-extra": "",
    "axios": ""
  }
};

module.exports.run = async function ({ api, args, Users, event }) {
  var mention = Object.keys(event.mentions)[0];

  if (!mention)
    return api.sendMessage(
      "जिसे ज्ञान देना चाहते हैं उसे mention करें ✅",
      event.threadID
    );

  let name = event.mentions[mention];
  var arraytag = [];
  arraytag.push({ id: mention, tag: name });

  var a = function (a) {
    api.sendMessage(a, event.threadID);
  };

  a("तुम्हें कुछ उपदेश दिए जाएँगे। मान लो तो जीवन में बहुत उन्नति करोगे और मरने के बाद भी अच्छे रहोगे 😇");

  setTimeout(() => {
    a({
      body:
        "मुसीबत के समय दुनिया के सारे दरवाज़े बंद हो जाएँ, पर अल्लाह का दरवाज़ा हमेशा खुला रहता है 🥰🥰 " +
        name,
      mentions: arraytag
    });
  }, 3000);

  setTimeout(() => {
    a({
      body:
        "दुनिया में सिर्फ एक ही घर है, जिसका नाम 'काबा घर' है। जिसके ऊपर से आज तक कोई पक्षी या हवाई जहाज़ उड़ नहीं पाया 😍 " +
        name,
      mentions: arraytag
    });
  }, 5000);

  setTimeout(() => {
    a({
      body:
        "उसके लिए रो जो तेरे आँसू देखकर खुद भी रो दे, पर ऐसे किसी के लिए मत रो जो तेरे आँसू देखकर मज़ाक करे 🐰 " +
        name,
      mentions: arraytag
    });
  }, 7000);

  setTimeout(() => {
    a({
      body:
        "सबसे कठिन काम है खुद को पहचानना और सबसे आसान काम है दूसरों को उपदेश देना 💔 " +
        name,
      mentions: arraytag
    });
  }, 9000);

  setTimeout(() => {
    a({
      body:
        "प्यार में धोखा खाया, उसे भूल नहीं पा रहे? 5 वक़्त की नमाज़ पढ़ो और उसके लिए जो प्यार था वो अल्लाह के लिए कर दो 🥰 " +
        name,
      mentions: arraytag
    });
  }, 12000);

  setTimeout(() => {
    a({
      body:
        "डिप्रेशन में हो, किसी तरह कट नहीं रहा? इस्लामिक वीडियो देखो, वाज़ सुनो, मन को इस्लामिक बातों में लगाओ, डिप्रेशन कट जाएगा " +
        name,
      mentions: arraytag
    });
  }, 15000);

  setTimeout(() => {
    a({
      body:
        "जो तुम दिखाते हो, उससे ज़्यादा तुम्हारे पास होना चाहिए 🤬 " +
        name,
      mentions: arraytag
    });
  }, 17000);

  setTimeout(() => {
    a({
      body:
        "जो तुम जानते हो, उसके मुक़ाबले कम बोलना चाहिए 🤟 " +
        name,
      mentions: arraytag
    });
  }, 20000);

  setTimeout(() => {
    a({
      body:
        "दोस्ती हो या प्यार, निभाने की ज़िम्मेदारी दोनों की होती है 🤝 " +
        name,
      mentions: arraytag
    });
  }, 23000);

  setTimeout(() => {
    a({
      body:
        "अगर सपने देख सकते हो, तो उन्हें पूरा भी कर सकते हो 💉 " +
        name,
      mentions: arraytag
    });
  }, 25000);

  setTimeout(() => {
    a({
      body:
        "जो तुम्हें आज नज़रअंदाज़ कर रहा है, सब्र करो एक दिन ज़रूरत पड़ेगी उसे तुम्हारी " +
        name,
      mentions: arraytag
    });
  }, 28500);

  setTimeout(() => {
    a({
      body:
        "उसे छोड़कर मत जाओ 💔 जो तुम्हारी सौ बुराइयों के बाद भी तुम्हें छोड़कर नहीं गया 😘 ✋ " +
        name,
      mentions: arraytag
    });
  }, 31000);

  setTimeout(() => {
    a({
      body:
        "अल्लाह के दिखाए रास्ते पर चलो 🥰 " +
        name,
      mentions: arraytag
    });
  }, 36000);

  setTimeout(() => {
    a("~ दूसरों को गाली देने से बाज़ आओ ♥️");
  }, 39000);

  setTimeout(() => {
    a({
      body:
        "गर्लफ्रेंड को नहीं ✌️ अपने माँ-बाप को प्यार करो ✋🥰 " +
        name,
      mentions: arraytag
    });
  }, 42000);

  setTimeout(() => {
    a({
      body:
        "खुद पर भरोसा रखने का मतलब है एक आत्मविश्वासी इंसान। वो मानता है कि उसमें अपने लिए सही फैसला लेने की ताकत है 😍 " +
        name,
      mentions: arraytag
    });
  }, 48000);

  setTimeout(() => {
    a({
      body:
        "मौत तय है, पर समय अनिश्चित। या अल्लाह! जब भी मौत दो, ईमान वाली हालत में दो 😍🐰 " +
        name,
      mentions: arraytag
    });
  }, 51000);

  setTimeout(() => {
    a({
      body:
        "टेंशन दूर करने के लिए नशा नहीं, पाँच वक़्त की नमाज़ ही काफी है 💔 " +
        name,
      mentions: arraytag
    });
  }, 54000);

  setTimeout(() => {
    a({
      body:
        "तुम्हारी गर्लफ्रेंड तुम्हें छोड़कर किसी अमीर के पास चली गई? तुम खुद को कष्ट दे रहे हो? नशा कर रहे हो? अरे बेवकूफ, खुद को ऐसा बनाओ कि वो गर्लफ्रेंड तुम्हें देखकर पछताए और तुम्हारे पास वापस आना चाहे ✌️ " +
        name,
      mentions: arraytag
    });
  }, 57000);

  setTimeout(() => {
    a({
      body:
        "10 रुपये की नमाज़ सीखने वाली किताब में जो है, वो दुनिया की महँगी किताबों में भी नहीं है 😍 " +
        name,
      mentions: arraytag
    });
  }, 59400);

  setTimeout(() => {
    a({
      body:
        "शरीर की बीमारी की दवा फार्मेसी में मिल जाए, पर मन की बीमारी की दवा अल-क़ुरान में है ✋ " +
        name,
      mentions: arraytag
    });
  }, 63000);

  setTimeout(() => {
    a({
      body:
        "जो धोखा दे, मेरा उससे कोई रिश्ता नहीं 🤟 " +
        name,
      mentions: arraytag
    });
  }, 66000);

  setTimeout(() => {
    a({
      body:
        "या अल्लाह! जब मुसलमान बनाया है, तो ईमान के साथ मौत देना " +
        name,
      mentions: arraytag
    });
  }, 69000);

  setTimeout(() => {
    a({
      body:
        "हराम के पैसे की मेज़ भर खाने से, हलाल के पैसे का सीमित खाना ज़्यादा मज़ेदार है 💉 " +
        name,
      mentions: arraytag
    });
  }, 72000);

  setTimeout(() => {
    a({
      body:
        "दुनिया में सबसे कंजूस वो है, जो मुसलमान होकर दूसरे मुसलमान को सलाम करने में कंजूसी करे " +
        name,
      mentions: arraytag
    });
  }, 75000);

  setTimeout(() => {
    a({
      body:
        "चरित्रहीन पति के साथ महल में रहने से, गरीब आदर्शवान पति के साथ झोपड़ी में रहना ज़्यादा सुखद है 🙂✋ " +
        name,
      mentions: arraytag
    });
  }, 78000);
};