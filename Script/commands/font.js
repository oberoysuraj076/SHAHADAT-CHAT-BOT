module.exports.config = {
  name: "font",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "SHAHADAT SAHU",
  description: "Convert text into fonts",
  commandCategory: "Others",
  usages: "<1-10> <text>",
  usePrefix: true,
  cooldowns: 0
};

module.exports.run = async ({ event, api, args }) => {

  const fonts = [
    { name: "1",  map: mono() },
    { name: "2",  map: full() },
    { name: "3",  map: squared() },
    { name: "4",  map: squaredSmall() },
    { name: "5",  map: negative() },
    { name: "6",  map: italicBold() },
    { name: "7",  map: sansBold() },
    { name: "8",  map: serifBold() },
    { name: "9",  map: fraktur() },
    { name: "10", map: doubleStruck() }
  ];

  if (args.length < 2) {
    return api.sendMessage(
`┏━━━━━━━━━━━━━━━━━━━┓
┃    🌸AVAILABLE FONTS🌸
┣━━━━━━━━━━━━━━━━━━━┫
┃ 1) 𝚁𝙸𝚂𝙷𝙸𝙺𝙴𝚂𝙷
┃ 2) ＲＩＳＨＩＫＥＳＨ
┃ 3) 🅁🄸🅂🄷🄸🄺🄴🅂🄷
┃ 4) 🅡🅘🅢🅗🅘🅚🅔🅢🅗
┃ 5) 🆁🅸🆂🅷🅸🅺🅴🆂🅷
┃ 6) 𝙍 𝙄 𝙎 𝙃 𝙄 𝙆 𝙀 𝙎 𝙃
┃ 7) 𝗥𝗜𝗦𝗛𝗜𝗞𝗘𝗦𝗛
┃ 8) 𝐑𝐈𝐒𝐇𝐈𝐊𝐄𝐒𝐇
┃ 9) 𝖱𝖨𝖲𝖧𝖨𝖪𝖤𝖲𝖧
┃10) 𝕽𝕴𝕾𝕳𝕴𝕶𝕰𝕾𝕳
┣━━━━━━━━━━━━━━━━━━━┫
┃Use: font <1-10> <text>
┗━━━━━━━━━━━━━━━━━━━┛`,
      event.threadID,
      event.messageID
    );
  }

  const type = args.shift();
  const font = fonts.find(f => f.name === type);
  if (!font) {
    return api.sendMessage("❌ Invalid font number. Choose 1-10.", event.threadID, event.messageID);
  }

  const text = args.join(" ");
  const result = text.split("").map(c => font.map[c] || c).join("");
  return api.sendMessage(result, event.threadID, event.messageID);
};


/* ============ FONT GENERATORS ============ */

// 1) Monospace
function mono() {
  return gen("𝙰", "𝚉", "𝚊", "𝚣", "𝟶");
}

// 2) Fullwidth
function full() {
  return gen("Ａ", "Ｚ", "ａ", "ｚ", "０");
}

// 3) Squared (uppercase only style)
function squared() {
  return gen("🄰", "🅉", "🄰", "🅉", "0");
}

// 4) Squared Small
function squaredSmall() {
  return gen("🅐", "🅩", "🅐", "🅩", "0");
}

// 5) Negative Squared
function negative() {
  return gen("🅰", "🆉", "🅰", "🆉", "0");
}

// 6) Italic Bold
function italicBold() {
  return gen("𝘼", "𝙕", "𝙖", "𝙯", "𝟬");
}

// 7) Sans-Serif Bold
function sansBold() {
  return gen("𝗔", "𝗭", "𝗮", "𝘇", "𝟬");
}

// 8) Serif Bold
function serifBold() {
  return gen("𝐀", "𝐙", "𝐚", "𝐳", "𝟎");
}

// 9) Fraktur (with proper gaps for special chars)
function fraktur() {
  const m = gen("𝖠", "𝖹", "𝖺", "𝗓", "𝟢");
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const frakUpper = "𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ";
  for (let i = 0; i < 26; i++) {
    m[upper[i]] = [...frakUpper][i];
  }
  return m;
}

// 10) Double-Struck (with proper gaps)
function doubleStruck() {
  const m = gen("𝔸", "ℤ", "𝕒", "𝕫", "𝟘");
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const dsUpper = "𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const dsLower = "𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫";
  const nums  = "0123456789";
  const dsNums = "𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡";
  for (let i = 0; i < 26; i++) {
    m[upper[i]] = [...dsUpper][i];
    m[lower[i]] = [...dsLower][i];
  }
  for (let i = 0; i < 10; i++) {
    m[nums[i]] = [...dsNums][i];
  }
  return m;
}


/* ============ CORE MAP GENERATOR ============ */
function gen(A, Z, a, z, n) {
  const m = { " ": " " };

  // Uppercase A-Z
  for (let i = 0; i < 26; i++) {
    m[String.fromCharCode(65 + i)] = String.fromCodePoint(A.codePointAt(0) + i);
  }

  // Lowercase a-z
  for (let i = 0; i < 26; i++) {
    m[String.fromCharCode(97 + i)] = a
      ? String.fromCodePoint(a.codePointAt(0) + i)
      : m[String.fromCharCode(65 + i)];
  }

  // Numbers 0-9
  if (n && n !== "0") {
    for (let i = 0; i < 10; i++) {
      try {
        m[i] = String.fromCodePoint(n.codePointAt(0) + i);
      } catch {
        m[i] = i.toString();
      }
    }
  } else {
    for (let i = 0; i < 10; i++) m[i] = i.toString();
  }

  return m;
}