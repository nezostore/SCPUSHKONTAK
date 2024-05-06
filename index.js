const {
  default: xietyConnect,
  Browsers,
  DisconnectReason,
  makeInMemoryStore,
  jidDecode,
  downloadContentFromMessage,
  useMultiFileAuthState,
} = require("@adiwajshing/baileys");
const fs = require("fs");
const chalk = require("chalk");
const pino = require("pino");
const figlet = require("figlet");
const readline = require("readline");
const { Boom } = require("@hapi/boom");
const PhoneNumber = require("awesome-phonenumber");
const FileType = require("file-type");
const path = require('path');
const usePairingCode = true;
const store = makeInMemoryStore({
  logger: pino().child({ level: "silent", stream: "store" }),
});
const { open } = require("./lib/connections");
const logging = require("./lib/logging");
const { smsg } = require("./lib/myfunc");
const { color, bgcolor, mycolor } = require("./lib/color");
const sleep = async (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
const question = (text) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(text, resolve);
  });
};

require("./nezo.js");

async function startxiety() {
  const { state, saveCreds } = await useMultiFileAuthState("./auth");
  const xiety = xietyConnect({
    logger: pino({ level: "silent" }),
    printQRInTerminal: !usePairingCode,
    auth: state,
    browser: ['Mac OS', 'Safari', '17.2']
  });
  if (usePairingCode && !xiety.authState.creds.registered) {
    const phoneNumber = await question(
      "Masukan Nomer Yang Aktif Awali Dengan 62 Contoh 628xxxxx:\n"
    );
    const code = await xiety.requestPairingCode(phoneNumber.trim());
    console.log(`Pairing code: ${code}`);
  }

  store.bind(xiety.ev);

  console.log(
    color(
      figlet.textSync(`VIP | NEZO`, {
        font: "Standard",
        horizontalLayout: "default",
        vertivalLayout: "default",
        width: 80,
        whitespaceBreak: false,
      }),
      "gold"
    )
  );

  xiety.ev.on("messages.upsert", async (chatUpdate) => {
    try {
      m = chatUpdate.messages[0];
      if (!m.message) return;
      m.message =
        Object.keys(m.message)[0] === "ephemeralMessage"
          ? m.message.ephemeralMessage.message
          : m.message;
      if (!xiety.public && !m.key.fromMe && chatUpdate.type === "notify")
        return;
      if (m.key.id.startsWith("BAE5") && m.key.id.length === 16) return;
      m = smsg(xiety, m, store);
      require("./nezo")(xiety, m, chatUpdate, store);
    } catch (err) {
      console.log(err);
    }
  });

  xiety.public = true;
  
  setInterval(() => {
let directoryPath = path.join();
fs.readdir(directoryPath, async function (err, files) {
var filteredArray = await files.filter(item =>
item.endsWith("gif") ||
item.endsWith("png") || 
item.endsWith("mp3") ||
item.endsWith("mp4") || 
item.endsWith("jpg") ||
item.endsWith("jpeg") ||
item.endsWith("webp") ||
item.endsWith("webm") ||
item.endsWith("zip") 
)
if(filteredArray.length > 0){
let teks =`Terdeteksi ${filteredArray.length} file sampah`
console.log(teks)
setInterval(() => {
if(filteredArray.length == 0) return console.log("File sampah telah hilang")
filteredArray.forEach(function (file) {
let sampah = fs.existsSync(file)
if(sampah) fs.unlinkSync(file)
})
}, 15_000)
}
});
}, 30_000)


  xiety.ev.on("creds.update", saveCreds);
  xiety.ev.on("connection.update", async ({ connection }) => {
    if (connection === "close") startxiety();
    if (connection === "connecting") {
      logging("info", "Connection", "Connecting");
    }
    if (connection === "open") {
      open(xiety);
    }
  });

  xiety.decodeJid = (jid) => {
    if (!jid) return jid;
    if (/:\d+@/gi.test(jid)) {
      let decode = jidDecode(jid) || {};
      return (
        (decode.user && decode.server && decode.user + "@" + decode.server) ||
        jid
      );
    } else return jid;
  };

  xiety.getName = (jid, withoutContact = false) => {
    id = xiety.decodeJid(jid);
    withoutContact = xiety.withoutContact || withoutContact;
    let v;
    if (id.endsWith("@g.us"))
      return new Promise(async (resolve) => {
        v = store.contacts[id] || {};
        if (!(v.name || v.subject)) v = xiety.groupMetadata(id) || {};
        resolve(
          v.name ||
            v.subject ||
            PhoneNumber("+" + id.replace("@s.whatsapp.net", "")).getNumber(
              "international"
            )
        );
      });
    else
      v =
        id === "0@s.whatsapp.net"
          ? {
              id,
              name: "WhatsApp",
            }
          : id === xiety.decodeJid(xiety.user.id)
          ? xiety.user
          : store.contacts[id] || {};
    return (
      (withoutContact ? "" : v.name) ||
      v.subject ||
      v.verifiedName ||
      PhoneNumber("+" + jid.replace("@s.whatsapp.net", "")).getNumber(
        "international"
      )
    );
  };

  xiety.downloadAndSaveMediaMessage = async (
    message,
    filename,
    attachExtension = true
  ) => {
    let quoted = message.msg ? message.msg : message;
    let mime = (message.msg || message).mimetype || "";
    let messageType = message.mtype
      ? message.mtype.replace(/Message/gi, "")
      : mime.split("/")[0];
    const stream = await downloadContentFromMessage(quoted, messageType);
    let buffer = Buffer.from([]);
    for await (const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk]);
    }
    let type = await FileType.fromBuffer(buffer);
    trueFileName = attachExtension ? filename + "." + type.ext : filename;
    await fs.writeFileSync(trueFileName, buffer);
    return trueFileName;
  };

  xiety.downloadMediaMessage = async (message) => {
    let mime = (message.msg || message).mimetype || "";
    let messageType = message.mtype
      ? message.mtype.replace(/Message/gi, "")
      : mime.split("/")[0];
    const stream = await downloadContentFromMessage(message, messageType);
    let buffer = Buffer.from([]);
    for await (const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk]);
    }
    return buffer;
  };

  xiety.sendTextWithMentions = async (jid, text, quoted, options = {}) =>
    xiety.sendMessage(
      jid,
      {
        text: text,
        contextInfo: {
          mentionedJid: [...text.matchAll(/@(\d{0,16})/g)].map(
            (v) => v[1] + "@s.whatsapp.net"
          ),
        },
        ...options,
      },
      { quoted }
    );

  xiety.sendContact = async (jid, kon, quoted = "", opts = {}) => {
    let list = [];
    for (let i of kon) {
      list.push({
        displayName: await xiety.getName(i + "@s.whatsapp.net"),
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await xiety.getName(
          i + "@s.whatsapp.net"
        )}\nFN:${await xiety.getName(
          i + "@s.whatsapp.net"
        )}\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Ponsel\nitem2.EMAIL;type=INTERNET:aplusscell@gmail.com\nitem2.X-ABLabel:Email\nitem3.URL:https://youtube.com/@HardzBanx\nitem3.X-ABLabel:Instagram\nitem4.ADR:;;Indonesia;;;;\nitem4.X-ABLabel:Region\nEND:VCARD`,
      });
    }
    //=================================================//
    xiety.sendMessage(
      jid,
      {
        contacts: { displayName: `${list.length} Kontak`, contacts: list },
        ...opts,
      },
      { quoted }
    );
  };

  xiety.ev.on("call", async (celled) => {
    let botNumber = await xiety.decodeJid(xiety.user.id);
    let koloi = global.anticall;
    if (!koloi) return;
    console.log(celled);
    for (let kopel of celled) {
        if (kopel.isGroup == false) {
            if (kopel.status == "offer") {
                await xiety.sendTextWithMentions(
                    kopel.from,
                    `*${xiety.user.name}* tidak bisa menerima panggilan ${
                        kopel.isVideo ? `video` : `suara`
                    }. Maaf @${
                        kopel.from.split("@")[0]
                    } panggilanmu akan ditolak.`
                );
                await xiety.rejectCall(kopel.id, kopel.from);
            }
        }
    }
});
}

startxiety();

let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.yellowBright(`Update File Terbaru ${__filename}`));
  delete require.cache[file];
  require(file);
});
