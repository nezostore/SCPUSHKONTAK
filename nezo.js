require("./settings");
const {
  baileys,
  proto,
  MessageType,
  generateWAMessageFromContent,
  getContentType,
} = require("@adiwajshing/baileys");
const { getGroupAdmins, updateDatabase } = require("./lib/functions.js");
const { exec } = require("child_process");
const fs = require("fs");
const { Boom } = require("@hapi/boom");
const chalk = require("chalk");
const util = require("util");
const axios = require("axios");
const crypto = require("crypto");
const { smsg, isUrl } = require("./lib/myfunc");
const { uptotelegra } = require(`./lib/upload`);
const { join } = require("path");
module.exports = xiety = async (xiety, m, chatUpdate, store) => {
  try {
    const type = getContentType(m.message);
    const content = JSON.stringify(m.message);
    const from = m.key.remoteJid;
    const quoted = m.quoted ? m.quoted : m;
    const mime = (quoted.msg || quoted).mimetype || "";
    const isMedia = /image|video|sticker|audio/.test(mime);
    const { chats } = m;
    const body =
      type === "conversation" && m.message.conversation
        ? m.message.conversation
        : type == "imageMessage" && m.message.imageMessage.caption
        ? m.message.imageMessage.caption
        : type == "documentMessage" && m.message.documentMessage.caption
        ? m.message.documentMessage.caption
        : type == "videoMessage" && m.message.videoMessage.caption
        ? m.message.videoMessage.caption
        : type == "extendedTextMessage" && m.message.extendedTextMessage.text
        ? m.message.extendedTextMessage.text
        : type == "buttonsResponseMessage" &&
          m.message.buttonsResponseMessage.selectedButtonId
        ? m.message.buttonsResponseMessage.selectedButtonId
        : type == "templateButtonReplyMessage" &&
          m.message.templateButtonReplyMessage.selectedId
        ? m.message.templateButtonReplyMessage.selectedId
        : "";
    const budy = typeof m.text == "string" ? m.text : "";
    const prefix = /^[^.]/.test(body) ? "." : ".";
    const args = body.trim().split(/ +/).slice(1);
    const q = (text = args.join(" "));
    const isCmd = body.startsWith(prefix);
    const command = isCmd
      ? body.slice(prefix.length).trim().split(" ").shift().toLowerCase()
      : "";
          let listpc = await store.chats.all().filter(v => v.id.endsWith('.net')).map(v => v.id)
    const isGroup = from.endsWith("@g.us");
    const botNumber = xiety.user.id.split(":")[0];
    const sender = m.key.fromMe
      ? xiety.user.id.split(":")[0] + "@s.whatsapp.net" || xiety.user.id
      : m.key.participant || m.key.remoteJid;
    const senderNumber = sender.split("@")[0];
    const pushname = m.pushName || `${senderNumber}`;
    const groupMetadata = isGroup
      ? await xiety.groupMetadata(m.chat).catch((e) => {})
      : "";
    const groupName = isGroup ? groupMetadata.subject : "";
    const groupId = isGroup ? groupMetadata.id : "";
    const groupMembers = isGroup ? groupMetadata.participants : "";
    const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : "";
    const isBotGroupAdmins =
      groupAdmins.includes(`${botNumber}@s.whatsapp.net`) || false;
    const isGroupAdmins = groupAdmins.includes(sender) || false;
    const participants = isGroup ? await groupMetadata.participants : "";
    const isSaya = botNumber.includes(senderNumber);
    const isDev = owner.includes(senderNumber) || isSaya;
    var isOwner = owner.includes(senderNumber) || isSaya;
    const kontakxiety = ["6285713888398"];
    const reply = (teks) => {
      xiety.sendMessage(from, { text: teks }, { quoted: m });
    };
    const sleep = async (ms) => {
      return new Promise((resolve) => setTimeout(resolve, ms));
    };
    const validGrup = (id, array) => {
      for (var i = 0; i < array.length; i++) {
        if (array[i] == id) {
          return !0;
        }
      }
      return !1;
    };
    0;
    const kirimprib = async (text, id) => {
      await xiety.sendMessage(id, { text: text }, { quoted: m });
    };

    const pengguna = JSON.parse(fs.readFileSync("./database/user.json"));
    const contacts = JSON.parse(fs.readFileSync("./database/contacts.json"));

    const isContacts = contacts.includes(sender);
    const isUser = pengguna.includes(m.sender);

    const fkontak = {
      key: {
        fromMe: false,
        participant: `0@s.whatsapp.net`,
        ...(from ? { remoteJid: "status@broadcast" } : {}),
      },
      message: {
        contactMessage: {
          displayName: `${pushname}\n`,
          vcard: `BEGIN:VCARD\nVERSION:3.0\nN:XL;VelzzyBot,;;;\nFN:${pushname},\nitem1.TEL;waid=${
            sender.split("@")[0]
          }:${sender.split("@")[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
          jpegThumbnail: {
            url: "https://telegra.ph/file/3c485ff201d9337be14ef.jpg",
          },
        },
      },
    };
    function parseMention(text = "") {
      return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(
        (v) => v[1] + "@s.whatsapp.net"
      );
    }

    const createSerial = (size) => {
      return crypto.randomBytes(size).toString("hex").slice(0, size);
    };

    function clearJSONFile(filePath) {
      const data = [];
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    }

    function clearVCFFile(filePath) {
      try {
        const fileData = fs.readFileSync(filePath, "utf8");
        const clearedData = "";
        fs.writeFileSync(filePath, clearedData, "utf8");
      } catch (error) {
        console.error("Terjadi kesalahan saat menghapus isi file:", error);
      }
    }

    async function loading() {
      var xietyvip = [
        "●●●●○○○○○○",
        "○○○●●●●○○○",
        "●●○○○○●●●●",
        "○○○●●●●○○○",
        "●●●●○○○○●●",
        "●●●●●●●●●●",
      ];
      let { key } = await xiety.sendMessage(from, { text: "Loading Please Waitt.." }); //Pengalih isu

      for (let i = 0; i < xietyvip.length; i++) {
        await sleep(700);
        await xiety.sendMessage(from, { text: xietyvip[i], edit: key }); //PESAN LEPAS
      }
    }

    let list = [];
    for (let i of owner) {
      list.push({
        displayName: await xiety.getName(i + "@s.whatsapp.net"),
        vcard: `BEGIN:VCARD\n
VERSION:3.0\n
N:${await xiety.getName(i + "@s.whatsapp.net")}\n
FN:${await xiety.getName(i + "@s.whatsapp.net")}\n
item1.TEL;waid=${i}:${i}\n
item1.X-ABLabel:Ponsel\n
item2.EMAIL;type=INTERNET:tesheroku123@gmail.com\n
item2.X-ABLabel:Email\n
item3.URL:https://bit.ly/39Ivus6\n
item3.X-ABLabel:YouTube\n
item4.ADR:;;Indonesia;;;;\n
item4.X-ABLabel:Region\n
END:VCARD`,
      });
    }

    let list2 = [];
    for (let i of kontakxiety) {
      list2.push({
        displayName: "Xiety",
        vcard: `BEGIN:VCARD\n
VERSION:3.0\n
N:Xiety\n
FN:Xiety\n
item1.TEL;waid=${i}:${i}\n
item1.X-ABLabel:Ponsel\n
item2.EMAIL;type=INTERNET:tesheroku123@gmail.com\n
item2.X-ABLabel:Email\n
item3.URL:https://bit.ly/39Ivus6\n
item3.X-ABLabel:YouTube\n
item4.ADR:;;Indonesia;;;;\n
item4.X-ABLabel:Region\n
END:VCARD`,
      });
    }

    // Fungsi untuk membuat case .save
    async function handleSaveContact(contactName) {
      try {
        if (!contactName) {
          await reply(from, "Maaf, nama kontak tidak boleh kosong.");
          return;
        }

        const vcardContent = `BEGIN:VCARD\nVERSION:3.0\nFN:${contactName}\nTEL;type=CELL;type=VOICE;waid=${
          from.split("@")[0]
        }:+${from.split("@")[0]}\nEND:VCARD`;

        fs.appendFileSync(
          "./database/contacts1.vcf",
          vcardContent + "\n",
          "utf8"
        );

        await reply(from, `Sukses menyimpan kontak ${contactName}!`);
      } catch (err) {
        console.error(err);
        await reply(from, "Terjadi kesalahan dalam proses menyimpan kontak.");
      }
    }

    // Case untuk handle .save

    ///////////////////

    if (!xiety.public) {
      if (!m.key.fromMe) return;
    }

        if (isCmd && !isUser) {
            pengguna.push(sender);
            fs.writeFileSync(
                "./database/user.json",
                JSON.stringify(pengguna, null, 2)
            );
        }

if (isCmd) {
  console.log(require("chalk").black(require("chalk").bgGreen(`Command ${prefix+command} `)), require("chalk").black(require("chalk").bgWhite(`Dari ${m.pushName}`)))
}
    try {
      ppuser = await push.profilePictureUrl(m.sender, "image");
    } catch (err) {
      ppuser =
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60";
    }

    switch (command) {
      case "menu":
        {
          await loading();
          const more = String.fromCharCode(8206);
          const readmore = more.repeat(4001);
          const owned = `${kontakxiety}@s.whatsapp.net`;
          const menunya = `${menu}`;
          xiety.sendMessage(
            from,
            {
              image: thumb,
              caption: menunya,
              contextInfo: {
                mentionedJid: [sender, owned],
                forwardingScore: 9999,
                isForwarded: true,
              },
            },
            { quoted: fkontak }
          );
        }
        break;

      case "delete":
      case "d":
      case "del":
        if (!isOwner) return reply(mess.owner);
        if (!isOwner && !m.key.fromMe)
          return reply("Fitur Ini Hanya Dapat Digunakan Oleh Developer!");
        xiety.sendMessage(from, {
          delete: {
            id: m.message.extendedTextMessage.contextInfo.stanzaId,
            remoteJid: from,
            fromMe: true,
          },
        });
        break;

      case "shutdown":
        if (!isOwner) return reply(mess.owner);
        reply(`Byee👋`);
        await sleep(3000);
        process.exit();
        break;

      case 'stoppush':{
                if (!isOwner)
                reply('Stoping Push...');
                await sleep(3000)
                    process.send('reset')
            }
                break

      case "getidgc":
        if (!isGroup) return reply(mess.group);
        reply(`${m.chat}`);
        break;

      case "public":
        {
          if (!isOwner) return reply(mess.owner);
          xiety.public = true;
          reply(`*SUKSES MODE PUBLIC ✅*`);
        }
        break;
      case "self":
        {
          if (!isOwner) return reply(mess.owner);
          xiety.public = false;
          reply(`*SUKSES MODE SELF ✅*`);
        }
        break;

case "cekidgc":
{
  if (!isOwner) return reply(mess.owner);
  let getGroups = await xiety.groupFetchAllParticipating();
  let groups = Object.entries(getGroups)
    .slice(0)
    .map((entry) => entry[1]);
  let anu = groups.map((v) => v.id);
  let teks = `⬣ *LIST GROUP ANDA*\n\nTotal Group : ${anu.length} GROUP\n\n`;
  for (let x of anu) {
    // Tambahkan penundaan sebelum permintaan metadata grup
    await new Promise(resolve => setTimeout(resolve, 1000)); // Penundaan 1 detik (1000 milidetik)
    let metadata2 = await xiety.groupMetadata(x);
    teks += `❏ *INFO GROUP*\n│⭔ *NAMA :* ${metadata2.subject}\n│⭔ *ID :* ${metadata2.id}\n│⭔ *MEMBER :* ${metadata2.participants.length}\n╰────|\n\n`;
  }
  reply(teks);
}
break;

      case "jpm":
      case "post":
        {
          if (!isOwner) return reply(mess.owner);
          if (!text)
            return reply(
              `*Penggunaan Salah Silahkan Gunakan Seperti Ini*\n${
                prefix + command
              } teks|jeda\n\nReply Gambar Untuk Mengirim Gambar Ke Semua Group\nUntuk Jeda Itu Delay Jadi Nominal Jeda Itu 1000 = 1 detik`
            );
          await reply("_Wᴀɪᴛɪɴɢ ɪɴ ᴘʀᴏɢʀᴇss !!_");
          let getGroups = await xiety.groupFetchAllParticipating();
          let groups = Object.entries(getGroups)
            .slice(0)
            .map((entry) => entry[1]);
          let anu = groups.map((v) => v.id);
          for (let xnxx of anu) {
            let metadat72 = await xiety.groupMetadata(xnxx);
            let participanh = await metadat72.participants;
            if (/image/.test(mime)) {
              media = await xiety.downloadAndSaveMediaMessage(quoted);
              mem = await uptotelegra(media);
              await xiety.sendMessage(xnxx, {
                image: { url: mem },
                caption: text.split("|")[0],
                mentions: participanh.map((a) => a.id),
              });
              await sleep(text.split("|")[1]);
            } else {
              await xiety.sendMessage(xnxx, {
                text: text.split("|")[0],
                mentions: participanh.map((a) => a.id),
              });
              await sleep(text.split("|")[1]);
            }
          }
          reply("*SUCCESFUL ✅*");
        }
        break;

      case "sendcontact":
        if (!isOwner) return reply(mess.owner);
        if (isGroup) return reply(mess.private);
        try {
          const vcfFilePath = "./database/contacts1.vcf";
          const captionText = "Ini adalah file kontak save nama";

          // Kirim vCard ke pengguna dengan caption
          await xiety.sendMessage(
            m.key.remoteJid,
            {
              document: fs.readFileSync(vcfFilePath),
              mimetype: "text/vcard",
              caption: captionText,
            },
            { quoted: fkontak }
          );
        } catch (err) {
          console.error(err);
        }
        break;

      case "save": {
        if (!isOwner) return reply(mess.owner);
        if (isGroup) return reply(mess.private);
        if (!text)
          return reply(
            `Penggunaan Salah Silahkan Gunakan Command Seperti Ini\n${
              prefix + command
            } nezo`
          );
        const userId = m.key.remoteJid;
        const contactName = body.slice(6).trim();
        const contactNumber = sender.split("@")[0];
        await handleSaveContact(contactName);

        // Simpan kontak ke dalam file contacts.vcf
        const vcardContent =
          "BEGIN:VCARD\n" +
          "VERSION:3.0\n" +
          `FN:${contactName}\n` +
          `TEL;type=CELL;type=VOICE;waid=${userId.split("@")[0]}:+${
            userId.split("@")[0]
          }\n` +
          "END:VCARD";

        try {
          // Kirim vCard ke pengguna
          const contactMessage = {
            displayName: contactName,
            vcard: vcardContent,
          };
          const repf = await xiety.sendMessage(
            from,
            {
              contacts: {
                displayName: `${contactName}`,
                contacts: [contactMessage],
              },
              mentions: [sender],
            },
            { quoted: fkontak }
          );

          // Kirim pesan sukses ke grup atau chat
          await xiety.sendMessage(
            from,
            {
              text: `Hai Kak @${
                sender.split("@")[0]
              }, Kontak ${contactName} berhasil disimpan!`,
              mentions: [sender],
            },
            { quoted: repf }
          );
        } catch (err) {
          console.error(err);
          await xiety.sendMessage(from, {
            text: "Terjadi kesalahan dalam proses menyimpan kontak.",
          });
        }
        break;
      }

      case "pushkontak":
        {
          if (!isOwner) return reply(mess.owner);
          if (!text)
            return reply(
              `Penggunaan Salah Silahkan Gunakan Command Seperti Ini\n${
                prefix + command
              } idgroup|tekspushkontak\nUntuk Liat Id Group Silahkan Ketik .cekidgc`
            );
          await reply("_Wᴀɪᴛɪɴɢ ɪɴ ᴘʀᴏɢʀᴇss !!_");
          const groupMetadataa = !isGroup
            ? await xiety
                .groupMetadata(`${text.split("|")[0]}`)
                .catch((e) => {})
            : "";
          const participants = !isGroup
            ? await groupMetadataa.participants
            : "";
          const halls = await participants
            .filter((v) => v.id.endsWith(".net"))
            .map((v) => v.id);
          global.tekspushkon = text.split("|")[1];
          for (let mem of halls) {
            if (isContacts) return;
            contacts.push(mem);
            fs.writeFileSync(
              "./database/contacts.json",
              JSON.stringify(contacts)
            );
            if (/image/.test(mime)) {
              media = await xiety.downloadAndSaveMediaMessage(quoted);
              memk = await uptotelegra(media);
              await push.sendMessage(mem, {
                image: { url: memk },
                caption: global.tekspushkon,
              });
              await sleep(3000);
            } else {
              await push.sendMessage(mem, { text: global.tekspushkon });
              await sleep(3000);
            }
          }
          try {
            const uniqueContacts = [...new Set(contacts)];
            const vcardContent = uniqueContacts
              .map((contact, index) => {
                const vcard = [
                  "BEGIN:VCARD",
                  "VERSION:3.0",
                  `FN:WA[${createSerial(2)}] ${contact.split("@")[0]}`,
                  `TEL;type=CELL;type=VOICE;waid=${contact.split("@")[0]}:+${
                    contact.split("@")[0]
                  }`,
                  "END:VCARD",
                  "",
                ].join("\n");
                return vcard;
              })
              .join("");
            fs.writeFileSync("./database/contacts.vcf", vcardContent, "utf8");
          } catch (err) {
            reply(util.format(err));
          } finally {
            await xiety.sendMessage(
              from,
              {
                document: fs.readFileSync("./database/contacts.vcf"),
                fileName: "contacts.vcf",
                caption: "Nih Kak Tinggal Pencet File Di Atas Terus Save",
                mimetype: "text/vcard",
              },
              { quoted: m }
            );
            contacts.splice(0, contacts.length);
            fs.writeFileSync(
              "./database/contacts.json",
              JSON.stringify(contacts)
            );
          }
        }
        break;
      case "pushkontakv1":
        {
          if (!isOwner) return reply(mess.owner);
          if (!isGroup)
            return reply(
              `Maaf Kak Fitur ${
                prefix + command
              } Hanya Bisa Di Gunakan Di Dalam Group\nUntuk Memasukan Bot Ke Dalam Group Yang Di Ingin Kan\nSilahkan Ketik Command .join`
            );
          if (!text)
            return reply(
              `Penggunaan Salah Silahkan Gunakan Command Seperti Ini\n${
                prefix + command
              } teks`
            );
          await reply("_Wᴀɪᴛɪɴɢ ɪɴ ᴘʀᴏɢʀᴇss !!_");
          const groupMetadata = m.isGroup
            ? await xiety.groupMetadata(from).catch((e) => {})
            : "";
          const groupOwner = isGroup ? groupMetadata.owner : "";
          const participantts = isGroup ? await groupMetadata.participants : "";
          const halsss = await participantts
            .filter((v) => v.id.endsWith(".net"))
            .map((v) => v.id);
          global.tekspushkonv1 = text;
          for (let men of halsss) {
            if (isContacts) return;
            contacts.push(men);
            fs.writeFileSync(
              "./database/contacts.json",
              JSON.stringify(contacts)
            );
            if (/image/.test(mime)) {
              media = await xiety.downloadAndSaveMediaMessage(quoted);
              mem = await uptotelegra(media);
              await xiety.sendMessage(men, {
                image: { url: mem },
                caption: global.tekspushkonv1,
              });
              await sleep(3000);
            } else {
              await xiety.sendMessage(men, { text: global.tekspushkonv1 });
              await sleep(3000);
            }
          }
          reply(`File Kontak Sudh Di Kirim Lewat Private Chat`);
          try {
            const uniqueContacts = [...new Set(contacts)];
            const vcardContent = uniqueContacts
              .map((contact, index) => {
                const vcard = [
                  "BEGIN:VCARD",
                  "VERSION:3.0",
                  `FN:WA[${createSerial(2)}] ${contact.split("@")[0]}`,
                  `TEL;type=CELL;type=VOICE;waid=${contact.split("@")[0]}:+${
                    contact.split("@")[0]
                  }`,
                  "END:VCARD",
                  "",
                ].join("\n");
                return vcard;
              })
              .join("");
            fs.writeFileSync("./database/contacts.vcf", vcardContent, "utf8");
          } catch (err) {
            reply(util.format(err));
          } finally {
            await xiety.sendMessage(
              sender,
              {
                document: fs.readFileSync("./database/contacts.vcf"),
                fileName: "contacts.vcf",
                caption: "Nih Kak Tinggal Pencet File Di Atas Terus Save",
                mimetype: "text/vcard",
              },
              { quoted: m }
            );
            contacts.splice(0, contacts.length);
            fs.writeFileSync(
              "./database/contacts.json",
              JSON.stringify(contacts)
            );
          }
        }
        break;
      case "pushkontakv2":
        if (!isOwner) return reply(mess.owner);
        if (!q)
          return reply(
            `Penggunaan Salah Silahkan Gunakan Command Seperti Ini\n${
              prefix + command
            } idgroup|jeda|teks\nUntuk Liat Id Group Silahkan Ketik .cekidgc`
          );
        await reply("Otw Boskuuu");
        const groupMetadataa = !isGroup
          ? await xiety.groupMetadata(`${q.split("|")[0]}`).catch((e) => {})
          : "";
        const participantss = !isGroup ? await groupMetadataa.participants : "";
        const halls = await participantss
          .filter((v) => v.id.endsWith(".net"))
          .map((v) => v.id);
        global.tekspushkonv2 = q.split("|")[2];
        for (let mem of halls) {
          if (/image/.test(mime)) {
            media = await xiety.downloadAndSaveMediaMessage(quoted);
            memk = await uptotelegra(media);
            await xiety.sendMessage(mem, {
              image: { url: memk },
              caption: global.tekspushkonv2,
            });
            await sleep(q.split("|")[1]);
          } else {
            await xiety.sendMessage(mem, { text: global.tekspushkonv2 });
            await sleep(q.split("|")[1]);
          }
        }
        reply("Succes Boss!");
        break;
      case "pushkontakv3":
        if (!isOwner) return reply(mess.owner);
        if (!isGroup)
          return reply(
            `Maaf Kak Fitur ${
              prefix + command
            } Hanya Bisa Di Gunakan Di Dalam Group\nUntuk Memasukan Bot Ke Dalam Group Yang Di Ingin Kan\nSilahkan Ketik Command .join`
          );
        if (!text)
          return reply(
            `Penggunaan Salah Silahkan Gunakan Command Seperti Ini\n${
              prefix + command
            } jeda|teks`
          );
        await reply("Otw Boskuuu");
        const halsss = await participants
          .filter((v) => v.id.endsWith(".net"))
          .map((v) => v.id);
        global.tekspushkonv3 = text.split("|")[1];
        for (let men of halsss) {
          if (/image/.test(mime)) {
            media = await xiety.downloadAndSaveMediaMessage(quoted);
            mem = await uptotelegra(media);
            await xiety.sendMessage(men, {
              image: { url: mem },
              caption: global.tekspushkonv3,
            });
            await sleep(text.split("|")[0]);
          } else {
            await xiety.sendMessage(men, { text: global.tekspushkonv3 });
            await sleep(text.split("|")[0]);
          }
        }
        reply("Succes Boss!");
        break;
      case "savecontactv1":
      case "svkontak":
        if (!isOwner) return reply(mess.owner);
        if (!isGroup) return reply(mess.group);
        let cmiggc = await xiety.groupMetadata(m.chat);
        let orgiggc = participants.map((a) => a.id);
        vcard = "";
        noPort = 0;
        for (let a of cmiggc.participants) {
          vcard += `BEGIN:VCARD\nVERSION:3.0\nFN:[${noPort++}] +${
            a.id.split("@")[0]
          }\nTEL;type=CELL;type=VOICE;waid=${a.id.split("@")[0]}:+${
            a.id.split("@")[0]
          }\nEND:VCARD\n`;
        } // (?); mengimpor kontak seluruh member - save
        let nmfilect = "./database/contacts.vcf";
        reply("*Mengimpor " + cmiggc.participants.length + " kontak..*");
        fs.writeFileSync(nmfilect, vcard.trim());
        await sleep(2000);
        xiety.sendMessage(
          m.chat,
          {
            document: fs.readFileSync(nmfilect),
            mimetype: "text/vcard",
            fileName: "Contact.vcf",
            caption:
              "GROUP: *" +
              cmiggc.subject +
              "*\nMEMBER: *" +
              cmiggc.participants.length +
              "*",
          },
          { ephemeralExpiration: 86400, quoted: m }
        );
        fs.unlinkSync(nmfilect);
        break;
      case "savecontactv2": {
        if (!isOwner) return reply(mess.owner);
        if (!isGroup)
          return reply(
            `Maaf Kak, Fitur ${
              prefix + command
            } Hanya Bisa Digunakan Di Dalam Grup\nUntuk Memasukkan Bot Ke Dalam Grup Yang Diinginkan\nSilakan Ketik Command .join linkgroup`
          );
        await reply("_Menunggu proses!!_");

        const groupMetadata = isGroup
          ? await xiety.groupMetadata(from).catch((e) => {})
          : "";
        const participantts = isGroup ? await groupMetadata.participants : "";
        const halsss = await participantts
          .filter((v) => v.id.endsWith(".net"))
          .map((v) => v.id);

        for (let men of halsss) {
          if (isContacts) return;
          contacts.push(men);
          fs.writeFileSync(
            "./database/contacts.json",
            JSON.stringify(contacts)
          );
        }

        reply("Sukses! File Sudah Dikirim Lewat Chat Pribadi");

        try {
          const uniqueContacts = [...new Set(contacts)];
          const vcardContent = uniqueContacts
            .map((contact, index) => {
              const vcard = [
                "BEGIN:VCARD",
                "VERSION:3.0",
                `FN:WA[${createSerial(2)}] ${contact.split("@")[0]}`,
                `TEL;type=CELL;type=VOICE;waid=${contact.split("@")[0]}:+${
                  contact.split("@")[0]
                }`,
                "END:VCARD",
                "",
              ].join("\n");
              return vcard;
            })
            .join("");

          // Tambahkan konten vCard ke dalam file contacts.vcf tanpa menghapus data yang sudah ada
          fs.appendFileSync("./database/contacts1.vcf", vcardContent, "utf8");

          // Kirim file kontak ke pengirim lewat obrolan pribadi
          await xiety.sendMessage(sender, {
            document: fs.readFileSync("./database/contacts1.vcf"),
            fileName: "contacts.vcf",
            caption: "Sukses! Tinggal Save Ya Kakak",
            mimetype: "text/vcard",
          });
        } catch (err) {
          console.error(err);
          reply(util.format(err));
        } finally {
          contacts.splice(0, contacts.length);
          fs.writeFileSync(
            "./database/contacts.json",
            JSON.stringify(contacts)
          );
        }
        break;
      }

      case "savecontactv3":
        {
          if (!isOwner) return reply(mess.owner);
          if (isGroup) return reply("Khusus Private Chat");
          if (!text)
            return reply(
              `Penggunaan Salah Silahkan Gunakan Command Seperti Ini\n${
                prefix + command
              } idgroup\nUntuk Liat Id Group Silahkan Ketik .cekidgc`
            );
          await reply("_Wᴀɪᴛɪɴɢ ɪɴ ᴘʀᴏɢʀᴇss !!_");
          const groupMetadataa = !isGroup
            ? await xiety.groupMetadata(`${text}`).catch((e) => {})
            : "";
          const participants = !isGroup
            ? await groupMetadataa.participants
            : "";
          const halls = await participants
            .filter((v) => v.id.endsWith(".net"))
            .map((v) => v.id);
          for (let mem of halls) {
            if (isContacts) return;
            contacts.push(mem);
            fs.writeFileSync(
              "./database/contacts.json",
              JSON.stringify(contacts)
            );
          }
          try {
            const uniqueContacts = [...new Set(contacts)];
            const vcardContent = uniqueContacts
              .map((contact, index) => {
                const vcard = [
                  "BEGIN:VCARD",
                  "VERSION:3.0",
                  `FN:WA[${createSerial(2)}] ${contact.split("@")[0]}`,
                  `TEL;type=CELL;type=VOICE;waid=${contact.split("@")[0]}:+${
                    contact.split("@")[0]
                  }`,
                  "END:VCARD",
                  "",
                ].join("\n");
                return vcard;
              })
              .join("");
            fs.writeFileSync("./database/contacts1.vcf", vcardContent, "utf8");
          } catch (err) {
            reply(util.format(err));
          } finally {
            await xiety.sendMessage(
              from,
              {
                document: fs.readFileSync("./database/contacts1.vcf"),
                fileName: "contacts.vcf",
                caption: "Sukses Tinggal Save Ya Kakak",
                mimetype: "text/vcard",
              },
              { quoted: m }
            );
            contacts.splice(0, contacts.length);
            fs.writeFileSync(
              "./database/contacts.json",
              JSON.stringify(contacts)
            );
          }
        }
        break;

      case "join":
        {
          if (!isOwner) return reply(mess.owner);
          if (!text) return reply(`Contoh ${prefix + command} linkgc`);
          if (!isUrl(args[0]) && !args[0].includes("whatsapp.com"))
            return reply("Link Invalid!");
          let result = args[0].split("https://chat.whatsapp.com/")[1];
          await xiety
            .groupAcceptInvite(result)
            .then((res) => reply(util.format(res)))
            .catch((err) => reply(util.format(err)));
        }
        break;

      case "clearjson":
        {
          if (!isOwner) return reply(mess.owner);
          const filePath = "./database/contacts.json";
          clearJSONFile(filePath);
          await xiety.sendMessage(
            from,
            { text: "Isi file JSON telah dihapus." },
            { quoted: fkontak }
          );
        }
        break;

      case "clearvcf":
        {
          if (!isOwner) return reply(mess.owner);
          const filePath = "./database/contacts.vcf";
          const filePath1 = "./database/contacts1.vcf";
          clearVCFFile(filePath);
          clearVCFFile(filePath1);
          await xiety.sendMessage(
            from,
            { text: "Isi file VCF telah dihapus." },
            { quoted: fkontak }
          );
        }
        break;

      case "owner":
        {
          const repf = await xiety.sendMessage(
            from,
            {
              contacts: {
                displayName: `${list.length} Kontak`,
                contacts: list,
              },
              contextInfo: {
                forwardingScore: 9999999,
                isForwarded: true,
                mentionedJid: [sender],
              },
            },
            { quoted: m }
          );
          xiety.sendMessage(
            from,
            {
              text: `Hai Kak @${
                sender.split("@")[0]
              }, Nih Owner Ku Jangan Macam-macam Ya`,
              contextInfo: {
                forwardingScore: 9999999,
                isForwarded: true,
                mentionedJid: [sender],
              },
            },
            { quoted: repf }
          );
        }
        break;

      case "ownsc":
      case "sc":
        {
          const repf = await xiety.sendMessage(
            from,
            {
              contacts: {
                displayName: `${list2.length} Kontak`,
                contacts: list2,
              },
              contextInfo: {
                forwardingScore: 9999999,
                isForwarded: true,
                mentionedJid: [sender],
              },
            },
            { quoted: m }
          );
          xiety.sendMessage(
            from,
            {
              text: `Hai Kak @${
                sender.split("@")[0]
              }, Nih Owner Pemilik Sc, Kalo mau order sc ini atau yang lain chat nomor diatas ya kak`,
              contextInfo: {
                forwardingScore: 9999999,
                isForwarded: true,
                mentionedJid: [sender],
              },
            },
            { quoted: repf }
          );
        }
        break;

      case "bcvideo":
      case "broadcastimage":
      case "bcimage":
      case "broadcastvideo":
      case "broadcastvid":
        if (!isOwner) return reply(mess.owner);
        if (!q) return reply(`*Enter Text*`);

        let getGroups = await xiety.groupFetchAllParticipating();
        let groups = Object.entries(getGroups)
          .slice(0)
          .map((entry) => entry[1]);
        let xietycast = groups.map((v) => v.id);

        reply(
          `\`\`\`Broadcasting in\`\`\` *${
            xietycast.length
          }* \`\`\`Group Chat, in\`\`\` *${xietycast.length * 1.5} seconds*`
        );

        for (let i of xietycast) {
          let txt = `${q}`;

          if (/image/.test(mime)) {
            let media = await quoted.download();
            let participants = await xiety.groupMetadata(i).catch((e) => []);
            let participantsArray = Array.isArray(participants)
              ? participants
              : [participants];
            let mentions = participantsArray.map((a) => a.id);

            await xiety.sendMessage(i, {
              image: media,
              caption: txt,
              mentions,
            });
          }

          if (/video/.test(mime)) {
            let media = await quoted.download();
            let participants = await xiety.groupMetadata(i).catch((e) => []);
            let participantsArray = Array.isArray(participants)
              ? participants
              : [participants];
            let mentions = participantsArray.map((a) => a.id);

            await xiety.sendMessage(i, {
              video: media,
              caption: txt,
              mentions,
            });
          }
        }

        reply(
          `\`\`\`Successfuly Broadcasted in\`\`\` *${xietycast.length} Groups`
        );
        break;

      case "bcgc":
      case "bcgroup":
        {
          if (!isOwner) return reply(mess.owner);
          if (!text)
           return reply(`Text mana?\n\nExample : ${prefix + command} Tes Broadcast`);
          let getGroups = await xiety.groupFetchAllParticipating();
          let groups = Object.entries(getGroups)
            .slice(0)
            .map((entry) => entry[1]);
          let anu = groups.map((v) => v.id);
          reply(
            `Mengirim Broadcast Ke ${anu.length} Group Chat, Waktu Selesai ${
              anu.length * 1.5
            } detik`
          );
          for (let i of anu) {
            await sleep(1500);
            xiety.sendMessage(i, { text: `${text}` }, { quoted: m });
          }
          reply(`Sukses Mengirim Broadcast Ke ${anu.length} Group`);
        }
        break;

      case "call":
        if (!isOwner) return reply(mess.owner);
        if (!args[0])
          return reply(
            `Penggunaan ${prefix + command} nomor\nContoh ${
              prefix + command
            } 628123456789000`
          );
        await reply(mess.wait);
        let nosend = "+" + q.split("|")[0].replace(/[^0-9]/g, "");
        axios
          .post(
            "https://magneto.api.halodoc.com/api/v1/users/authentication/otp/requests",
            { phone_number: `${nosend}`, channel: "voice" },
            {
              headers: {
                authority: "magneto.api.halodoc.com",
                "accept-language": "id,en;q=0.9,en-GB;q=0.8,en-US;q=0.7",
                cookie:
                  "_gcl_au=1.1.1860823839.1661903409; _ga=GA1.2.508329863.1661903409; afUserId=52293775-f4c9-4ce2-9002-5137c5a1ed24-p; XSRF-TOKEN=12D59ACD8AA0B88A7ACE05BB574FAF8955D23DBA28E8EE54F30BCB106413A89C1752BA30DC063940ED30A599C055CC810636; _gid=GA1.2.798137486.1664887110; ab.storage.deviceId.1cc23a4b-a089-4f67-acbf-d4683ecd0ae7=%7B%22g%22%3A%2218bb4559-2170-9c14-ddcd-2dc80d13c3e3%22%2C%22c%22%3A1656491802961%2C%22l%22%3A1664887110254%7D; amp_394863=nZm2vDUbDAvSia6NQPaGum...1gehg2efd.1gehg3c19.f.0.f; ab.storage.sessionId.1cc23a4b-a089-4f67-acbf-d4683ecd0ae7=%7B%22g%22%3A%22f1b09ad8-a7d9-16f3-eb99-a97ba52677d2%22%2C%22e%22%3A1664888940400%2C%22c%22%3A1664887110252%2C%22l%22%3A1664887140400%7D",
                origin: "https://www.halodoc.com",
                "sec-ch-ua":
                  '"Microsoft Edge";v="105", "Not)A;Brand";v="8", "Chromium";v="105"',
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": '"Windows"',
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-site",
                "user-agent":
                  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36 Edg/105.0.1343.53",
                "x-xsrf-token":
                  "12D59ACD8AA0B88A7ACE05BB574FAF8955D23DBA28E8EE54F30BCB106413A89C1752BA30DC063940ED30A599C055CC810636",
              },
            }
          )
          .then(function (response) {
            reply(`${JSON.stringify(response.data, null, 2)}`);
          })
          .catch(function (error) {
            reply(`${JSON.stringify(error, null, 2)}`);
          });
        break;

      case "tutor":
        {
          let tutorial = ``;
          xiety.sendMessage(from, { text: tutorial }, { quoted: fkontak });
        }
        break;
        
        case "postsw":
{
    if (!isOwner) return reply(mess.owner);
    // Mendapatkan semua percakapan

    const message = m.quoted ? { text: m.quoted.text } : { text };
    await xiety.sendMessage(
        "status@broadcast",
        message,
        {
            backgroundColor: "#5ca904",
            font: 3,
            statusJidList: listpc
        }
    );
    reply(`*Sukses mengirim status WhatsApp ke ${listpc.length} kontak.*`)
}
break;
                
            case "postswimage":
                {
                    if (!isOwner) return reply(mess.owner);
                    if (!quoted)
                        reply(`Kirim image Dengan Caption ${prefix + command}`);
                    if (!/image/.test(mime))
                        reply(
                            `Kirim image dengan caption *${prefix + command}*`
                        );
                    const media =
                        await xiety.downloadAndSaveMediaMessage(quoted);
                    xiety.sendMessage(
                        "status@broadcast",
                        { image: { url: media } },
                        { statusJidList: listpc }
                    );
                }
                reply(
                    `*Sukses mengirim status whatsapp ke ${listpc.length} Orang Yang Ada Di database*`
                );
                break;

            case "postswvideo":
                {
                    if (!isOwner) return reply(mess.owner);
                    if (!quoted)
                        reply(`Kirim video Dengan Caption ${prefix + command}`);
                    if (!/video/.test(mime))
                        reply(
                            `Kirim video dengan caption *${prefix + command}*`
                        );
                    const media =
                        await xiety.downloadAndSaveMediaMessage(quoted);
                    xiety.sendMessage(
                        "status@broadcast",
                        { video: { url: media } },
                        { statusJidList: listpc }
                    );
                }
                reply(
                    `*Sukses mengirim status whatsapp ke ${listpc.length} Orang Yang Ada Di database*`
                );
                break;
                

      default:
    }
  } catch (e) {
    console.log(e);
  }
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.yellowBright(`Update File Terbaru ${__filename}`));
  delete require.cache[file];
  require(file);
});
