sendMessage(
  `बॉस साहू की तरफ से तुम्हें जन्मदिन की शुभकामनाएँ, @${name}!\n` +
  `🎉 HAPPY BIRTHDAY 🎉\n` +
  `Boss rishu wishes you a Happy Birthday, @${name}!`
);

const messages = [
  {
    delay: 3000,
    msg:
      `🎂 सालगिरह मुबारक हो @${name}!\n` +
      `पिछले साल वाले सपने अभी भी पूरे नहीं हुए? 😂\n` +
      `कोई बात नहीं, इस साल भी वही सपने देख लो, कम से कम consistent तो हो! 😜\n` +
      `━━━━━━━━━━━━━━━━━\n` +
      `🎂 Happy Birthday @${name}!\n` +
      `Last year's dreams still not fulfilled? 😂\n` +
      `No worries, dream the same this year too, at least you're consistent! 😜`
  },
  {
    delay: 6000,
    msg:
      `🍰 केक काट लिया? या अभी भी "diet पर हूँ" वाला नाटक चल रहा है? 😂\n` +
      `आज तो ब्रेक दे, कल से वापस डाइट! 😋\n` +
      `🎉 HBD @${name}\n` +
      `━━━━━━━━━━━━━━━━━\n` +
      `🍰 Cake cut yet? Or still "I'm on a diet" drama going on? 😂\n` +
      `Take a break today, back to diet tomorrow! 😋\n` +
      `🎉 HBD @${name}`
  },
  {
    delay: 10000,
    msg:
      `🎁 गिफ्ट मिला?\n` +
      `अगर नहीं मिला, तो बताओ, मैं बॉस साहू को बोल दूँगा 😎\n` +
      `वो दे देंगे - "एक और साल, एक और promise!" 😂\n` +
      `🎂 HBD @${name}\n` +
      `━━━━━━━━━━━━━━━━━\n` +
      `🎁 Got a gift?\n` +
      `If not, tell me, I'll tell Boss SAHU 😎\n` +
      `He'll give you - "one more year, one more promise!" 😂\n` +
      `🎂 HBD @${name}`
  },
  {
    delay: 14000,
    msg:
      `😏 तुम्हारी उम्र कितनी है?\n` +
      `गिनती मत करना, सिर्फ बढ़ना है! 😜\n` +
      `पर सैलरी, प्यार और सेहत — ये तीनों भी बढ़ने चाहिए! 💰❤️💪\n` +
      `🎉 Happy Birthday @${name}\n` +
      `━━━━━━━━━━━━━━━━━\n` +
      `😏 How old are you?\n` +
      `Don't count, just grow! 😜\n` +
      `But salary, love, and health — all three should grow too! 💰❤️💪\n` +
      `🎉 Happy Birthday @${name}`
  },
  {
    delay: 18000,
    msg:
      `🤔 आज तुम्हारा जन्मदिन है…\n` +
      `यानी कल तुम एक साल और बड़े हो चुके थे! 😂\n` +
      `अरे नहीं, मज़ाक है! आज हो, कल हो, हर दिन हो! 🎂\n` +
      `❦~ HBD @${name} ~❦\n` +
      `━━━━━━━━━━━━━━━━━\n` +
      `🤔 Today is your birthday…\n` +
      `Meaning, yesterday you were one year older! 😂\n` +
      `Just kidding! Today, tomorrow, every day! 🎂\n` +
      `❦~ HBD @${name} ~❦`
  },
  {
    delay: 22000,
    msg:
      `😎 जन्मदिन पर एक सच बता दूँ?\n` +
      `तुम जितने बड़े हो रहे हो, उतने सिंगल भी हो रहे हो 😂\n` +
      `अगले साल GF/BF नहीं मिला तो हम तेरे लिए बैंड बजवा देंगे! 🎺\n` +
      `🎉 HBD @${name}\n` +
      `━━━━━━━━━━━━━━━━━\n` +
      `😎 Let me tell you a truth on your birthday?\n` +
      `The older you get, the more single you're becoming 😂\n` +
      `If no GF/BF next year, we'll hire a band for you! 🎺\n` +
      `🎉 HBD @${name}`
  },
  {
    delay: 26000,
    msg:
      `🎂 जन्मदिन मुबारक!\n` +
      `आज तो WhatsApp, Instagram, Facebook सब तेरे नाम!\n` +
      `कल से वापस पुरानी ज़िंदगी — रोज़ 9 बजे "Good Morning" forward 😂\n` +
      `🎉 HBD @${name}\n` +
      `━━━━━━━━━━━━━━━━━\n` +
      `🎂 Happy Birthday!\n` +
      `Today WhatsApp, Instagram, Facebook all in your name!\n` +
      `Back to old life tomorrow — daily 9 AM "Good Morning" forwards 😂\n` +
      `🎉 HBD @${name}`
  },
  {
    delay: 30000,
    msg:
      `💸 तो… ट्रीट कब?\n` +
      `केक भी नहीं भेजा, चॉकलेट भी नहीं भेजी,\n` +
      `बस "Thank you" वाले sticker भेज रहे हो? 😏\n` +
      `पहले पार्टी, फिर बात! 🍕🍔🥤\n` +
      `🎂 HBD @${name}\n` +
      `━━━━━━━━━━━━━━━━━\n` +
      `💸 So… when's the treat?\n` +
      `No cake, no chocolate,\n` +
      `Just sending "Thank you" stickers? 😏\n` +
      `Party first, talk later! 🍕🍔🥤\n` +
      `🎂 HBD @${name}`
  },
  {
    delay: 34000,
    msg:
      `🧁 जन्मदिन मुबारक हो @${name}!\n` +
      `तू बड़ा होकर क्या बनेगा?\n` +
      `पता है? — "और बड़ा!" 😂\n` +
      `कोई बात नहीं, हम तो तुझे ऐसे ही प्यार करते हैं!\n` +
      `❤️ HBD @${name}\n` +
      `━━━━━━━━━━━━━━━━━\n` +
      `🧁 Happy Birthday @${name}!\n` +
      `What will you become when you grow up?\n` +
      `You know? — "Even bigger!" 😂\n` +
      `No worries, we love you as you are!\n` +
      `❤️ HBD @${name}`
  },
  {
    delay: 38000,
    msg:
      `🎈 जन्मदिन की हार्दिक शुभकामनाएँ!\n` +
      `भगवान करे तेरी सारी मनोकामनाएँ पूरी हों,\n` +
      `बैंक बैलेंस ट्रिलियन हो,\n` +
      `और तेरे दुश्मन तेरे सामने बैठकर हाथ जोड़ें! 😎🔥\n` +
      `🎉 HBD @${name}\n` +
      `━━━━━━━━━━━━━━━━━\n` +
      `🎈 Heartiest birthday wishes!\n` +
      `May all your wishes come true,\n` +
      `May your bank balance be a trillion,\n` +
      `And may your enemies fold hands before you! 😎🔥\n` +
      `🎉 HBD @${name}`
  },
  {
    delay: 42000,
    msg:
      `🎂 आखिरी बात…\n` +
      `हम चाहते हैं तू हमेशा खुश रहे,\n` +
      `कभी उदास न हो,\n` +
      `और हर जन्मदिन पर याद रखे —\n` +
      `बॉस साहू और ये बॉट हमेशा तेरे साथ हैं! ❤️🤝\n` +
      `🎉 Happy Birthday @${name} 🎂\n` +
      `━━━━━━━━━━━━━━━━━\n` +
      `🎂 Last thing…\n` +
      `We want you to always be happy,\n` +
      `Never be sad,\n` +
      `And remember on every birthday —\n` +
      `Boss rishu and this bot are always with you! ❤️🤝\n` +
      `🎉 Happy Birthday @${name} 🎂`
  }
];