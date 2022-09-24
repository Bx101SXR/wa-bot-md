const { WASocket, proto, getContentType, downloadContentFromMessage } = require('@adiwajshing/baileys')
const axios = require('axios').default
const { PassThrough } = require('stream')
const moment = require('moment-timezone')
const ffmpeg = require('fluent-ffmpeg')
const FormData = require('form-data')
const chalk = require('chalk')
const fs = require('fs')
const util = require('util')
const os = require('os')
const speed = require('performance-now')
const { performance } = require('perf_hooks')
const { exec, spawn, execSync } = require("child_process")
const ind = require("../utils/message")
const { getBuffer, formatp } = require("../lib/function.js")
const hxz = require("hxz-api")
const xa = require("xfarr-api")
const request = require('request')
const Requests = require('node-fetch')
const {pinterest, igstalk, igdl} = require("../lib/scrape.js")
const { fetchJson, getBase64, kyun, createExif } = require('../lib/fetch')
const { getRandom, runtime } = require('../lib/myfunc')
const commandsDB = JSON.parse(fs.readFileSync('./assets/commands.json'))
const commandsD = JSON.parse(fs.readFileSync('./assets/command.json'))
const { addCommands, checkCommands, deleteCommands } = require("../lib/autoresp.js")
const _scommand = JSON.parse(fs.readFileSync('./assets/scommand.json'))
const afk = require("../lib/afk")
const { antiSpam } = require('../lib/antispam')

let _afk = JSON.parse(fs.readFileSync('./assets/afk.json'));


const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}



/**
 *
 * @param { string } text
 * @param { string } color
 */
const color = (text, color) => {
    return !color ? chalk.green(text) : chalk.keyword(color)(text)
}

Array.prototype.random = function () {
    return this[Math.floor(Math.random() * this.length)]
}

/**
 * @param {WASocket} sock
 * @param {proto.IWebMessageInfo} msg
 */
 
 // Sticker Cmd
const addCmd = (id, command) => {
    const obj = { id: id, chats: command }
    _scommand.push(obj)
    fs.writeFileSync('./assets/scommand.json', JSON.stringify(_scommand))
}

const getCommandPosition = (id) => {
    let position = null
    Object.keys(_scommand).forEach((i) => {
        if (_scommand[i].id === id) {
            position = i
        }
    })
    if (position !== null) {
        return position
    }
}

const getCmd = (id) => {
    let position = null
    Object.keys(_scommand).forEach((i) => {
        if (_scommand[i].id === id) {
            position = i
        }
    })
    if (position !== null) {
        return _scommand[position].chats
    }
}



const checkSCommand = (id) => {
    let status = false
    Object.keys(_scommand).forEach((i) => {
        if (_scommand[i].id === id) {
            status = true
        }
    })
    return status
}
module.exports = sock = async (sock, msg) => {
		try {
    const { ownerNumber, ownerName, botName, apikey } = require('../config.json')
const time = moment().tz('Asia/Jakarta').format('HH:mm:ss') 
 if (!msg.message) return
        if (msg.key && msg.key.remoteJid == 'status@broadcast') return
       const type = getContentType(msg.message)
    const quotedType = getContentType(msg.message?.extendedTextMessage?.contextInfo?.quotedMessage) || null
    if (type == 'ephemeralMessage') {
        msg.message = msg.message.ephemeralMessage.message
        msg.message = msg.message.ephemeralMessage.message.viewOnceMessage
    }

    const botId = sock.user.id.includes(':') ? sock.user.id.split(':')[0] + '@s.whatsapp.net' : sock.user.id

    const from = msg.key.remoteJid
    const body = (type === 'conversation' && msg.message.conversation) ? msg.message.conversation : (type == 'imageMessage') && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : (type == 'documentMessage') && msg.message.documentMessage.caption ? msg.message.documentMessage.caption : (type == 'videoMessage') && msg.message.videoMessage.caption ? msg.message.videoMessage.caption : (type == 'extendedTextMessage') && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text : (type == 'buttonsResponseMessage' && msg.message.buttonsResponseMessage.selectedButtonId) ? msg.message.buttonsResponseMessage.selectedButtonId : (type == 'templateButtonReplyMessage') && msg.message.templateButtonReplyMessage.selectedId ? msg.message.templateButtonReplyMessage.selectedId : (type === 'listResponseMessage') && msg.message[type].selectedButtonId ? msg.message[type].selectedButtonId : (type == 'stickerMessage') && (getCmd(msg.message[type].fileSha256.toString('base64')) !== null && getCmd(msg.message[type].fileSha256.toString('base64')) !== undefined) ? getCmd(msg.message[type].fileSha256.toString('base64')) : ""
    const responseMessage = type == 'listResponseMessage' ? msg.message?.listResponseMessage?.singleSelectReply?.selectedRowId || '' : type == 'buttonsResponseMessage' ? msg.message?.buttonsResponseMessage?.selectedButtonId || '' : ''
    const isGroup = from.endsWith('@g.us')
	
    var sender = isGroup ? msg.key.participant : msg.key.remoteJid
    sender = sender.includes(':') ? sender.split(':')[0] + '@s.whatsapp.net' : sender
    const senderName = msg.pushName
    const senderNumber = sender.split('@')[0]

const pushname = msg.pushName
const nsfw = JSON.parse(fs.readFileSync('./assets/nsfw.json'))
const isnsfw = isGroup ? nsfw.includes(from) : false
const antilink = JSON.parse(fs.readFileSync('./assets/antilink.json'))
const isantilink = isGroup ? antilink.includes(from) : false
const welcome = JSON.parse(fs.readFileSync('./assets/welcome.json'))
const iswelcome = isGroup ? welcome.includes(from) : false

    const groupMetadata = isGroup ? await sock.groupMetadata(from) : null
    const groupName = groupMetadata?.subject || ''
    const groupMembers = groupMetadata?.participants || []
    const groupAdmins = groupMembers.filter((v) => v.admin).map((v) => v.id)

    const isCmd = /^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\\\©^]/.test(body)
    var prefix = isCmd ? body[0] : ''
	//const chats = (type === 'conversation' && msg.message.conversation) ? msg.message.conversation : (type == 'imageMessage') && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : (type == 'documentMessage') && msg.message.documentMessage.caption ? msg.message.documentMessage.caption : (type == 'videoMessage') && msg.message.videoMessage.caption ? msg.message.videoMessage.caption : (type == 'extendedTextMessage') && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text : (type == 'buttonsResponseMessage' && msg.message.buttonsResponseMessage.selectedButtonId) ? msg.message.buttonsResponseMessage.selectedButtonId : (type == 'templateButtonReplyMessage') && msg.message.templateButtonReplyMessage.selectedId ? msg.message.templateButtonReplyMessage.selectedId : (type === 'listResponseMessage' && msg.message.listResponseMessage.title) ? msg.message.listResponseMessage.title : ""
	//const cmd = (type === 'listResponseMessage' && msg.message.listResponseMessage.title) ? msg.message.listResponseMessage.title : (type === 'buttonsResponseMessage' && msg.message.buttonsResponseMessage.selectedButtonId) ? msg.message.buttonsResponseMessage.selectedButtonId : (type === 'conversation' && msg.message.conversation.startsWith(prefix)) ? msg.message.conversation : (type == 'imageMessage') && msg.message.imageMessage.caption.startsWith(prefix) ? msg.message.imageMessage.caption : (type == 'videoMessage') && msg.message.videoMessage.caption.startsWith(prefix) ? msg.message.videoMessage.caption : (type == 'extendedTextMessage') && msg.message.extendedTextMessage.text.startsWith(prefix) ? msg.message.extendedTextMessage.text : ""
    const isGroupAdmins = groupAdmins.includes(sender)
    const isBotGroupAdmins = groupMetadata && groupAdmins.includes(botId)
    const isOwner = ownerNumber.includes(sender)

    let command = isCmd ? body.slice(1).trim().split(' ').shift().toLowerCase() : ''
    let responseId = msg.message?.listResponseMessage?.singleSelectReply?.selectedRowId || msg.message?.buttonsResponseMessage?.selectedButtonId || null
    let args = body.trim().split(' ').slice(1)
	const q = args.join(" ")
	 
	
	 
    let full_args = body.replace(command, '').slice(1).trim()

    let mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid || []

    const isImage = type == 'imageMessage'
    const isVideo = type == 'videoMessage'
    const isAudio = type == 'audioMessage'
    const isSticker = type == 'stickerMessage'
    const isContact = type == 'contactMessage'
    const isLocation = type == 'locationMessage'

    const isQuoted = type == 'extendedTextMessage'
    const isQuotedImage = isQuoted && quotedType == 'imageMessage'
    const isQuotedVideo = isQuoted && quotedType == 'videoMessage'
    const isQuotedAudio = isQuoted && quotedType == 'audioMessage'
    const isQuotedSticker = isQuoted && quotedType == 'stickerMessage'
    const isQuotedContact = isQuoted && quotedType == 'contactMessage'
    const isQuotedLocation = isQuoted && quotedType == 'locationMessage'

    var mediaType = type
    var stream
    if (isQuotedImage || isQuotedVideo || isQuotedAudio || isQuotedSticker) {
        mediaType = quotedType
        msg.message[mediaType] = msg.message.extendedTextMessage.contextInfo.quotedMessage[mediaType]
        stream = await downloadContentFromMessage(msg.message[mediaType], mediaType.replace('Message', '')).catch(console.error)
    }

		      	if (isCmd && antiSpam.isFiltered(from) && !isGroup) {
        console.log(color('[SPAM]', 'red'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
        return }
        if (isCmd && antiSpam.isFiltered(from) && isGroup) {
        console.log(color('[SPAM]', 'red'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(groupName))
       return  }

    if (!isGroup && !isCmd) console.log(color(`[ ${time} ]`, 'white'), color('[ PRIVATE ]', 'aqua'), color(body.slice(0, 50), 'white'), 'from', color(senderNumber, 'yellow'))
    if (isGroup && !isCmd) console.log(color(`[ ${time} ]`, 'white'), color('[  GROUP  ]', 'aqua'), color(body.slice(0, 50), 'white'), 'from', color(senderNumber, 'yellow'), 'in', color(groupName, 'yellow'))
    if (!isGroup && isCmd) console.log(color(`[ ${time} ]`, 'white'), color('[ COMMAND ]', 'aqua'), color(body, 'white'), 'from', color(senderNumber, 'yellow'))
    if (isGroup && isCmd) console.log(color(`[ ${time} ]`, 'white'), color('[ COMMAND ]', 'aqua'), color(body, 'white'), 'from', color(senderNumber, 'yellow'), 'in', color(groupName, 'yellow'))

    const reply = async (text) => {
        return sock.sendMessage(from, { text: text.trim() }, { quoted: msg })
    }
	
	const sendFileFromUrl = async (from, url, caption, msg, men) => {
    let mime = '';
    let res = await axios.head(url)
    mime = res.headers['content-type']
    if (mime.split("/")[1] === "gif") {
        return sock.sendMessage(from, { video: await convertGif(url), caption: caption, gifPlayback: true, mentions: men ? men : []}, {quoted: msg})
        }
    let type = mime.split("/")[0]+"Message"
    if(mime.split("/")[0] === "image"){
        return sock.sendMessage(from, { image: await getBuffer(url), caption: caption, mentions: men ? men : []}, {quoted: msg})
    } else if(mime.split("/")[0] === "video"){
        return sock.sendMessage(from, { video: await getBuffer(url), caption: caption, mentions: men ? men : []}, {quoted: msg})
    } else if(mime.split("/")[0] === "audio"){
        return sock.sendMessage(from, { audio: await getBuffer(url), caption: caption, mentions: men ? men : [], mimetype: 'audio/mpeg'}, {quoted: msg })
    } else {
        return sock.sendMessage(from, { document: await getBuffer(url), mimetype: mime, caption: caption, mentions: men ? men : []}, {quoted: msg })
    }
}

async function downloadAndSaveMediaMessage (type_file, path_file) {
    if (type_file === 'image') {
        var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
        let buffer = Buffer.from([])
        for await(const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
        }
       await fs.writeFileSync(path_file, buffer)
        return fs.readFileSync(path_file)
    } else if (type_file === 'video') {
        var stream = await downloadContentFromMessage(msg.message.videoMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.videoMessage, 'video')
        let buffer = Buffer.from([])
        for await(const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
        }
        fs.writeFileSync(path_file, buffer)
        return fs.readFileSync(path_file)
    } else if (type_file === 'sticker') {
        var stream = await downloadContentFromMessage(msg.message.stickerMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.stickerMessage, 'sticker')
        let buffer = Buffer.from([])
        for await(const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
        }
        fs.writeFileSync(path_file, buffer)
        return fs.readFileSync(path_file)
    } else if (type_file === 'audio') {
        var stream = await downloadContentFromMessage(msg.message.audioMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.audioMessage, 'audio')
        let buffer = Buffer.from([])
        for await(const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
        }
        fs.writeFileSync(path_file, buffer)
        return fs.readFileSync(path_file)
    }
}

 for (let i = 0; i < commandsDB.length ; i++) {

      if (body == commandsDB[i].pesan) {
      sock.sendMessage(from, {text:commandsDB[i].balasan}, {quoted: msg})
      }
      }
	  
	 for (let i = 0; i < commandsD.length ; i++) {

      if (body == commandsD[i].pesan) {
      sock.sendMessage(from, {text: commandsD[i].balasan}, {quoted: msg})
      }
      }
	  
	
	 if (body.startsWith('=>')) {
                    if (!isOwner) return reply('BOSS COMMAND ONLY')
                    function Return(sul) {
                        sat = JSON.stringify(sul, null, 2)
                        bang = util.format(sat)
                            if (sat == undefined) {
                                bang = util.format(sul)
                            }
                            return reply(bang)
                    }
                    try {
                        reply(util.format(eval(`(async () => { return ${body.slice(3)} })()`)))
                    } catch (e) {
                        reply(String(e))
                    }
                }

                if (body.startsWith('>')) {
                    if (!isOwner) return reply('BOSS COMMAND ONLY')
                    try {
                        let evaled = await eval(body.slice(2))
                        if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
                        await reply(evaled)
                    } catch (err) {
                        await reply(String(err))
                    }
                }

                if (body.startsWith('$')) {
                    if (!isOwner) return reply('BOSS COMMAND ONLY')
                    exec(body.slice(2), (err, stdout) => {
                        if(err) return reply(err)
                        if (stdout) return reply(stdout)
                    })
                }
				
					
				 if (body.match(`chat.whatsapp.com`)) {
         if (!isantilink) return
		 if (!isBotGroupAdmins)  return reply(`Ehh bot gak admin T_T`)
       let nekoo = sock.groupInviteCode(from)
   let gclink = (`https://chat.whatsapp.com/$(nekoo)`)
        let isLinkThisGc = new RegExp(gclink, 'i')
        let isgclink = isLinkThisGc.test(q)
        if (isgclink) return reply(`Ehh maaf gak jadi, karena kamu ngirim link group ini`)
		 if (isGroupAdmins) return reply(`Admin terdeteksi mengirim link group`)
        //if (!isOwner) return reply(`Ehh maaf kamu owner bot ku`)
			  reply(`「 ANTI LINK 」\n\nKamu terdeteksi mengirim link group, maaf kamu akan di kick !`)
        sock.groupParticipantsUpdate(from, [sender], 'remove')
        }
        
       
	
	
const menuBut = [
    {index: 1, urlButton: {displayText: 'Source Code', url: 'https://github.com/Bx101SXR/'}}, // Please Don't Change This T_T	 
    {index: 2, callButton: {displayText: 'Number Phone Owner', phoneNumber: '+6282123384291'}},
    {index: 3, quickReplyButton: {displayText: 'MENU', id: prefix+'allmenu'}},
    {index: 4, quickReplyButton: {displayText: 'BOT SUPPORT', id: prefix+'botgroup'}},
	{index: 5, quickReplyButton: {displayText: 'Owner', id: prefix+'owner'}},
]
    switch (command) {
case "sewa":
reply(ind.rent())

break
case "donate":
case "donasi":
reply(ind.donate())
break
case "rules":
case "rule":
reply(ind.rules(prefix))
break
	   case 'owner':
            const vcard =
                'BEGIN:VCARD\n' + // metadata of the contact card
                'VERSION:3.0\n' +
                `FN:${ownerName}\n` + // full name
                `ORG:${botName};\n` + // the organization of the contact
                `TEL;type=MSG;type=CELL;type=VOICE;waid=${ownerNumber[ownerNumber.length - 1].split('@')[0]}:+${ownerNumber[ownerNumber.length - 1].split('@')[0]}\n` + // WhatsApp ID + phone number
                'END:VCARD'

            sock.sendMessage(from, {
                contacts: {
                    displayName: ownerName,
                    contacts: [{ vcard }],
                },
            })
            break
 
case "test":

sock.sendMessage(from, {text: "ACTIVE >\\<"})

break

case "sc":
case "Sc":
case "sourcecode":
case "Code":

sock.sendMessage(from, {text: "https://github.com/Bx101SXR"})

break

case "botgroup":
case "NEKOgroup":
sock.sendMessage(from, {text: "BOT AKAN MENGIRIMKAN LINK MELALUI PRIVATE  CHAT | BOT SEND LINK IN YOUR PRIVATE CHAT"}, {quoted: msg})
              await sleep(1000)
sock.sendMessage(sender, {text: "*BOT SUPPORT 1*\n\nLink :  https://chat.whatsapp.com/BQXKucyoKINAcXExel0EGh\n\n\n*BOT SUPPORT 2*\n\nLink : https://chat.whatsapp.com/DgDVze7crqV7wv2JKDk90a\n\n\n*BOT SUPPORT 3*\n\nLink : https://chat.whatsapp.com/InruhAmOcCw1Nn3uDeRdCK"}, {quoted: msg})
break
case "menu":
case "help":

await sock.sendMessage(from, {caption: `*「PSATIR」*
Hai Kak ${pushname}.
Aku PSATIR, Silahkan Pilih Pilihan Fitur Yang Ada.

Terima Kasih Sudah Menjadi Temanku!

*Kalo buttonnya gak ada/ditekan tidak muncul, silahkan ketik:*
*${prefix}allmenu*`, location: {jpegThumbnail: fs.readFileSync("./assets/header.jpg")}, templateButtons: menuBut, footer: 'CULTIVATION ENTITY DEV'}, )

break

case "allmenu":
    try {
        var pepeh = await sock.profilePictureUrl(sender, 'image')
    } catch {
        var pepeh = 'https://i.pinimg.com/736x/f0/d3/28/f0d328d2f116501a495f7981376a8d3f.jpg'
    }
sendFileFromUrl(from,pepeh, ind.help(prefix))
break
	  case 'listrespon' :{

          let txt = `List Respon\nTotal : ${commandsDB.length}\n\n`

          for (let i = 0; i < commandsDB.length; i++){
          txt += `❏ Key : ${commandsDB[i].pesan}\n`
          }
          reply(txt)
          }
        break
      case 'dellrespon' :
      case 'delrespon' :{
if (!isOwner) return reply('BOSS COMMAND ONLY')
            if (args.length < 1) return reply(`Example ${prefix}delrespon key\n\nContoh : ${prefix}delrespon hai`)
          if (!checkCommands(body.slice(11), commandsDB)) return reply(`Key tersebut tidak ada di database`)
          deleteCommands(body.slice(11), commandsDB)
          reply(`Berhasil menghapus respon dengan key ${body.slice(11)}`)
          }
      break
     case 'addrespon' :{
      //    if (!isOwner && !msg.key.fromMe) return reply(mess.only.ownerB)
 
          if (args.length < 1) return reply(`Example ${prefix}addrespon key|respon\n\nContoh : ${prefix}addrespon hai|juga`)
          let input1 = body.slice(11)
          if (!input1.includes('|')) return reply(`Penggunaan ${prefix}addrespon key|respon\n\nContoh : ${prefix}addrespon hai|juga`)
          let input = input1.split("|")
          if (checkCommands(input[0], commandsDB) === true) return reply(`Command tersebut sudah ada`)
          addCommands(input[0], input[1], sender, commandsDB) 
          reply(`Key : ${input[0]}\nRespon : ${input[1]}\n\nRespon berhasil di set`)
          }
      break
	  case 'chat':
			if (args[0].startsWith('08')) return reply('Awali nomor dengan 62')
            if (args[0].startsWith('+62')) return reply('Awali nomor dengan 62')
			if (args.length < 1) return reply(`Penggunaan ${prefix}chat 62xnxx|teks`)
            var pc = body.slice(6)
            var nomor = pc.split("|")[0];
            var org = pc.split("|")[1];
            sock.sendMessage(nomor+'@s.whatsapp.net', {text: org})   
            reply(`Sukses mengirim chat:\n${org},@${nomor}`)
            break
 case 'addcmd' : 
       case 'setcmd' :
              
			 if (isQuotedSticker) {
              if (!q) return reply(`Penggunaan : ${command} cmdnya dan tag stickernya`)
              var kodenya = msg.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.fileSha256.toString('base64')
              addCmd(kodenya, q)
              reply("Done!")
              } else {
              reply('tag stickernya')
}
              break
       case 'delcmd' :
                          //if (!isOwner) return reply(mess.only.owner)
			if (!isOwner) return reply('BOSS COMMAND ONLY')
			if (!isQuotedSticker) return reply(`Penggunaan : ${command} tagsticker`)
              var kodenya = msg.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.fileSha256.toString('base64')
            _scommand.splice(getCommandPosition(kodenya), 1)
              fs.writeFileSync('./assets/scommand.json', JSON.stringify(_scommand))
              reply("Done!")
              break
       case 'listcmd' :
                        
		  let teksnyee = `\`\`\`『 LIST STICKER CMD 』\`\`\``
              let cemde = [];
              for (let i of _scommand) {
              cemde.push(i.id)
              teksnyee += `\n\n➸ *ID :* ${i.id}\n➸ *Cmd* : ${i.chats}`
}
              reply(teksnyee, cemde, true)
              break

        // Islami //
        case 'listsurah':
            axios
                .get(`https://api.lolhuman.xyz/api/quran?apikey=${apikey}`)
                .then(({ data }) => {
                    var text = 'List Surah:\n'
                    for (var x in data.result) {
                        text += `${x}. ${data.result[x]}\n`
                    }
                    reply(text)
                })
                .catch(console.error)
            break
        case 'alquran':
            if (args.length < 1) return reply(`Example: ${prefix + command} 18 or ${prefix + command} 18/10 or ${prefix + command} 18/1-10`)
            axios
                .get(`https://api.lolhuman.xyz/api/quran/${args[0]}?apikey=${apikey}`)
                .then(({ data }) => {
                    var ayat = data.result.ayat
                    var text = `QS. ${data.result.surah} : 1-${ayat.length}\n\n`
                    for (var x of ayat) {
                        text += `${x.arab}\n${x.ayat}. ${x.latin}\n${x.indonesia}\n\n`
                    }
                    text = text.replace(/<u>/g, '_').replace(/<\/u>/g, '_')
                    text = text.replace(/<strong>/g, '*').replace(/<\/strong>/g, '*')
                    reply(text)
                })
                .catch(console.error)
            break
        case 'alquranaudio':
            if (args.length == 0) return reply(`Example: ${prefix + command} 18 or ${prefix + command} 18/10`)
            sock.sendMessage(from, { audio: { url: `https://api.lolhuman.xyz/api/quran/audio/${args[0]}?apikey=${apikey}` }, mimetype: 'audio/mp4' })
            break
        case 'asmaulhusna':
            axios
                .get(`https://api.lolhuman.xyz/api/asmaulhusna?apikey=${apikey}`)
                .then(({ data }) => {
                    var text = `No : ${data.result.index}\n`
                    text += `Latin: ${data.result.latin}\n`
                    text += `Arab : ${data.result.ar}\n`
                    text += `Indonesia : ${data.result.id}\n`
                    text += `English : ${data.result.en}`
                    reply(text)
                })
                .catch(console.error)
            break
        case 'kisahnabi':
            if (args.length == 0) return reply(`Example: ${prefix + command} Muhammad`)
            axios
                .get(`https://api.lolhuman.xyz/api/kisahnabi/${full_args}?apikey=${apikey}`)
                .then(({ data }) => {
                    var text = `Name : ${data.result.name}\n`
                    text += `Lahir : ${data.result.thn_kelahiran}\n`
                    text += `Umur : ${data.result.age}\n`
                    text += `Tempat : ${data.result.place}\n`
                    text += `Story : \n${data.result.story}`
                    reply(text)
                })
                .catch(console.error)
            break
        case 'jadwalsholat':
            if (args.length == 0) return reply(`Example: ${prefix + command} Yogyakarta`)
            axios
                .get(`https://api.lolhuman.xyz/api/sholat/${daerah}?apikey=${apikey}`)
                .then(({ data }) => {
                    var text = `Wilayah : ${data.result.wilayah}\n`
                    text += `Tanggal : ${data.result.tanggal}\n`
                    text += `Sahur : ${data.result.sahur}\n`
                    text += `Imsak : ${data.result.imsak}\n`
                    text += `Subuh : ${data.result.subuh}\n`
                    text += `Terbit : ${data.result.terbit}\n`
                    text += `Dhuha : ${data.result.dhuha}\n`
                    text += `Dzuhur : ${data.result.dzuhur}\n`
                    text += `Ashar : ${data.result.ashar}\n`
                    text += `Maghrib : ${data.result.imsak}\n`
                    text += `Isya : ${data.result.isya}`
                    reply(text)
                })
                .catch(console.error)
            break

        // Downloader //
        case 'ytplay':
            if (args.length == 0) return await reply(`Example: ${prefix + command} melukis senja`)
            axios
                .get(`https://api.lolhuman.xyz/api/ytsearch?apikey=${apikey}&query=${full_args}`)
                .then(({ data }) => {
                    axios.get(`https://api.lolhuman.xyz/api/ytaudio2?apikey=${apikey}&url=https://www.youtube.com/watch?v=${data.result[0].videoId}`).then(({ data }) => {
                        var caption = `❖ Title    : *${data.result.title}*\n`
                        caption += `❖ Size     : *${data.result.size}*`
                        sock.sendMessage(from, { image: { url: data.result.thumbnail }, caption }).then(() => {
                            sock.sendMessage(from, { audio: { url: data.result.link }, mimetype: 'audio/mp4', fileName: `${data.result.title}.mp3`, ptt: true })
                        })
                    })
                })
                .catch(console.error)
            break
        case 'ytsearch':
            if (args.length == 0) return reply(`Example: ${prefix + command} Melukis Senja`)
            axios
                .get(`https://api.lolhuman.xyz/api/ytsearch?apikey=${apikey}&query=${full_args}`)
                .then(({ data }) => {
                    var text = ''
                    for (var x of data.result) {
                        text += `Title : ${x.title}\n`
                        text += `Views : ${x.views}\n`
                        text += `Published : ${x.published}\n`
                        text += `Thumbnail : ${x.thumbnail}\n`
                        text += `Link : https://www.youtube.com/watch?v=${x.videoId}\n\n`
                    }
                    reply(text)
                })
                .catch(console.error)
            break
        case 'ytmp3':
            if (args.length == 0) return reply(`Example: ${prefix + command} https://www.youtube.com/watch?v=qZIQAk-BUEc`)
            axios
                .get(`https://api.lolhuman.xyz/api/ytaudio2?apikey=${apikey}&url=${args[0]}`)
                .then(({ data }) => {
                    var caption = `❖ Title    : *${data.result.title}*\n`
                    caption += `❖ Size     : *${data.result.size}*`
                    sock.sendMessage(from, { image: { url: data.result.thumbnail }, caption }).then(() => {
                        sock.sendMessage(from, { audio: { url: data.result.link }, mimetype: 'audio/mp4', fileName: `${data.result.title}.mp3`, ptt: true })
                    })
                })
                .catch(console.error)
            break
       
			case 'ytmp4':
            if (args.length == 0) return reply(`Example: ${prefix + command} https://www.youtube.com/watch?v=qZIQAk-BUEc`)
            axios
                .get(`https://api.lolhuman.xyz/api/ytvideo2?apikey=${apikey}&url=${args[0]}`)
                .then(({ data }) => {
                    var caption = `❖ Title    : *${data.result.title}*\n`
                    caption += `❖ Size     : *${data.result.size}*`
                    sock.sendMessage(from, { image: { url: data.result.thumbnail }, caption }).then(() => {
                        sock.sendMessage(from, { video: { url: data.result.link }, mimetype: 'video/mp4', fileName: `${data.result.title}.mp4` })
                    })
                })
                .catch(console.error)
            break
			
        case 'telesticker':
            if (args.length == 0) return reply(`Example: ${prefix + command} https://t.me/addstickers/LINE_Menhera_chan_ENG`)
            axios.get(`https://api.lolhuman.xyz/api/telestick?apikey=${apikey}&url=${args[0]}`).then(({ data }) => {
                sock.sendMessage(from, { sticker: { url: data.result.sticker.random() } }, {quoted: msg})
            })
            break
			 case 'ttp':
                case 'ttp2':
                case 'ttp3':
                case 'ttp4':
                case 'attp':
                    if (args.length == 0) return reply(`Example: ${prefix + command} awan`)
                     sock.sendMessage(from, { sticker: { url: `https://api.lolhuman.xyz/api/${command}?apikey=${apikey}&text=${full_args}` } }, {quoted: msg})
                    break
        case 'tiktoknowm':
		case 'tiktok':
		case 'tt':
            if (args.length == 0) return reply(`Example: ${prefix + command} https://vt.tiktok.com/ZSwWCk5o/`)
            axios.get(`https://api.lolhuman.xyz/api/tiktok?apikey=${apikey}&url=${args[0]}`).then(({ data }) => {
                sock.sendMessage(from, { video: { url: data.result.link }, mimetype: 'video/mp4' })
            })
            break
        case 'tiktokmusic':
            if (args.length == 0) return reply(`Example: ${prefix + command} https://vt.tiktok.com/ZSwWCk5o/`)
            sock.sendMessage(from, { audio: { url: `https://api.lolhuman.xyz/api/tiktokmusic?apikey=${apikey}&url=${args[0]}` }, mimetype: 'audio/mp4', fileName: `${data.result.title}.mp3`, ptt: true })
            break
        case 'spotify':
            if (args.length == 0) return reply(`Example: ${prefix + command} https://open.spotify.com/track/0ZEYRVISCaqz5yamWZWzaA`)
            axios.get(`https://api.lolhuman.xyz/api/spotify?apikey=${apikey}&url=${args[0]}`).then(({ data }) => {
                var caption = `Title : ${data.result.title}\n`
                caption += `Artists : ${data.result.artists}\n`
                caption += `Duration : ${data.result.duration}\n`
                caption += `Popularity : ${data.result.popularity}\n`
                caption += `Preview : ${data.result.preview_url}\n`
                sock.sendMessage(from, { image: { url: data.result.thumbnail }, caption }).then(() => {
                    sock.sendMessage(from, { audio: { url: data.result.link }, mimetype: 'audio/mp4', fileName: `${data.result.title}.mp3`, ptt: true })
                })
            })
            break
        case 'spotifysearch':
            if (args.length == 0) return reply(`Example: ${prefix + command} Melukis Senja`)
            axios.get(`https://api.lolhuman.xyz/api/spotifysearch?apikey=${apikey}&query=${full_args}`).then(({ data }) => {
                var text = ''
                for (var x of data.result) {
                    text += `Title : ${x.title}\n`
                    text += `Artists : ${x.artists}\n`
                    text += `Duration : ${x.duration}\n`
                    text += `Link : ${x.link}\n`
                    text += `Preview : ${x.preview_url}\n\n\n`
                }
                reply(text)
            })
            break
        case 'jooxplay':
            if (args.length == 0) return reply(`Example: ${prefix + command} Melukis Senja`)
            axios.get(`https://api.lolhuman.xyz/api/jooxplay?apikey=${apikey}&query=${full_args}`).then(({ data }) => {
                var caption = `Title : ${data.result.info.song}\n`
                caption += `Artists : ${data.result.info.singer}\n`
                caption += `Duration : ${data.result.info.duration}\n`
                caption += `Album : ${data.result.info.album}\n`
                caption += `Uploaded : ${data.result.info.date}\n`
                caption += `Lirik :\n ${data.result.lirik}\n`
                sock.sendMessage(from, { image: { url: data.result.image }, caption }).then(() => {
                    sock.sendMessage(from, { audio: { url: data.result.audio[0].link }, mimetype: 'audio/mp4', fileName: `${data.result.title}.mp3`, ptt: true })
                })
            })
            break
        //case 'igdl':
		//case 'ig':
		case 'instagram':
            if (args.length == 0) return reply(`Example: ${prefix + command} https://www.instagram.com/p/CJ8XKFmJ4al/?igshid=1acpcqo44kgkn`)
            axios.get(`https://api.lolhuman.xyz/api/instagram?apikey=${apikey}&url=${args[0]}`).then(({ data }) => {
                var url = data.result
                if (url.includes('.mp4')) {
                    sock.sendMessage(from, { video: { url }, mimetype: 'video/mp4' })
                } else {
                    sock.sendMessage(from, { image: { url } }, {quoted: msg})
                }
            })
            break
        case 'igdl2':
            if (args.length == 0) return reply(`Example: ${prefix + command} https://www.instagram.com/p/CJ8XKFmJ4al/?igshid=1acpcqo44kgkn`)
            axios.get(`https://api.lolhuman.xyz/api/instagram2?apikey=${apikey}&url=${args[0]}`).then(({ data }) => {
                for (var x of data.result) {
                    if (x.includes('.mp4')) {
                        sock.sendMessage(from, { video: { url: x }, mimetype: 'video/mp4' })
                    } else {
                        sock.sendMessage(from, { image: { url: x } }, {quoted: msg})
                    }
                }
            })
            break
			 case 'ig4':
      //  if (!isUrl(args[0]) && !args[0].includes('instagram.com')) return reply('link mana tod')
        if (!q) return reply('Linknya?')
        reply('sabar tod ')
	const response = await Requests("https://api.vhtear.com/instadl?link=(q)&apikey=nekobotofficial")
							const ve = await response.json()
							const cok = ve.result.post
							for (var io = 0; io < cok.length; io++) {
								if (cok[io].type === "image") {
									await sock.sendMessage(from, {video: {url: cok[io].urlDownload}, caption: DONE}, {quoted: msg})
								} else {
                                   await sock.sendMessage(from, {image: {url: cok[io].urlDownload}, caption: DONE}, {quoted: msg})
								}
							}
	    break
case 'igdl':
case 'ig':
case "ig3":
   // if (!q) return textImg(ind.wrongFormat(prefix))
await reply ('sebentar kak')


    const getig = await hxz.igdl(q)
let gasdfghasfghasfy = `┌──「 *INSTAGRAM* 」
├ *Request By:* ${pushname}
└──「 *With ${botName}* 」`

for (i of getig.medias) {
	if (i.type == 'video') {
sock.sendMessage(from, {video: {url: i.downloadUrl}, caption: gasdfghasfghasfy}, {quoted: msg})
	} else {

sock.sendMessage(from, {image: {url: i.downloadUrl}, caption: gasdfghasfghasfy}, {quoted: msg})		
	}
}



break

        case 'twtdl':
		case 'twt':
		case 'twitter':
            if (args.length == 0) return reply(`Example: ${prefix + command} https://twitter.com/gofoodindonesia/status/1229369819511709697`)
            axios.get(`https://api.lolhuman.xyz/api/twitter?apikey=${apikey}&url=${args[0]}`).then(({ data }) => {
                sock.sendMessage(from, { video: { url: data.result.link[data.result.link.length - 1].link }, mimetype: 'video/mp4' })
				var url = data.result
                if (url.includes('.mp4')) {
                    sock.sendMessage(from, { video: { url }, mimetype: 'video/mp4' })
                } else {
                    sock.sendMessage(from, { image: { url } }, {quoted: msg})
                }
            })
            break
        case 'fbdl':
		case 'fb':
		case 'facebook':
            if (args.length == 0) return reply(`Example: ${prefix + command} https://id-id.facebook.com/SamsungGulf/videos/video-bokeh/561108457758458/`)
            axios.get(`https://api.lolhuman.xyz/api/facebook?apikey=${apikey}&url=${args[0]}`).then(({ data }) => {
                sock.sendMessage(from, { video: { url: data.result }, mimetype: 'video/mp4' })
            })
            break
        case 'zippyshare':
            if (args.length == 0) return reply(`Example: ${prefix + command} https://www51.zippyshare.com/v/5W0TOBz1/file.html`)
            axios.get(`https://api.lolhuman.xyz/api/zippyshare?apikey=${apikey}&url=${args[0]}`).then(({ data }) => {
                var text = `File Name : ${data.result.name_file}\n`
                text += `Size : ${data.result.size}\n`
                text += `Date Upload : ${data.result.date_upload}\n`
                text += `Download Url : ${data.result.download_url}`
                reply(text)
            })
            break
        case 'pinterest':
            if (args.length == 0) return reply(`Example: ${prefix + command} loli kawaii`)
            axios.get(`https://api.lolhuman.xyz/api/pinterest?apikey=${apikey}&query=${full_args}`).then(({ data }) => {
                sock.sendMessage(from, { image: { url: data.result } }, {quoted: msg})
            })
            break
			 case 'hutao':
            
            axios.get(`https://api.lolhuman.xyz/api/pinterest?apikey=${apikey}&query=hutao`).then(({ data }) => {
                sock.sendMessage(from, { image: { url: data.result } }, {quoted: msg})
            })
            break
        case 'pinterest2':
            if (args.length == 0) return reply(`Example: ${prefix + command} loli kawaii`)
            axios.get(`https://api.lolhuman.xyz/api/pinterest2?apikey=${apikey}&query=${full_args}`).then(({ data }) => {
                for (var x of data.result.slice(0, 5)) {
                    sock.sendMessage(from, { image: { url: x } }, {quoted: msg})
                }
            })
            break
        case 'pinterestdl':
            if (args.length == 0) return reply(`Example: ${prefix + command} https://id.pinterest.com/pin/696580267364426905/`)
            axios.get(`https://api.lolhuman.xyz/api/pinterestdl?apikey=${apikey}&url=${args[0]}`).then(({ data }) => {
                sock.sendMessage(from, { image: { url: data.result[0] } }, {quoted: msg})
            })
            break
        case 'pixiv':
            if (args.length == 0) return reply(`Example: ${prefix + command} loli kawaii`)
            sock.sendMessage(from, { image: { url: `https://api.lolhuman.xyz/api/pixiv?apikey=${apikey}&query=${full_args}` } }, {quoted: msg})
            break
        case 'pixivdl':
            if (args.length == 0) return reply(`Example: ${prefix + command} 63456028`)
            sock.sendMessage(from, { image: { url: `https://api.lolhuman.xyz/api/pixivdl/${args[0]}?apikey=${apikey}` } }, {quoted: msg})
            break

        // AniManga //
        case 'character':
            if (args.length == 0) return reply(`Example: ${prefix + command} Miku Nakano`)
            axios.get(`https://api.lolhuman.xyz/api/character?apikey=${apikey}&query=${full_args}`).then(({ data }) => {
                var caption = `Id : ${data.result.id}\n`
                caption += `Name : ${data.result.name.full}\n`
                caption += `Native : ${data.result.name.native}\n`
                caption += `Favorites : ${data.result.favourites}\n`
                caption += `Media : \n`
                for (var x of data.result.media.nodes) {
                    caption += `- ${x.title.romaji} (${x.title.native})\n`
                }
                caption += `\nDescription : \n${data.result.description.replace(/__/g, '_')}`
                sock.sendMessage(from, { image: { url: data.result.image.large }, caption })
            })
            break
        case 'manga':
            if (args.length == 0) return reply(`Example: ${prefix + command} Gotoubun No Hanayome`)
            axios.get(`https://api.lolhuman.xyz/api/manga?apikey=${apikey}&query=${full_args}`).then(({ data }) => {
                var caption = `Id : ${data.result.id}\n`
                caption += `Id MAL : ${data.result.idMal}\n`
                caption += `Title : ${data.result.title.romaji}\n`
                caption += `English : ${data.result.title.english}\n`
                caption += `Native : ${data.result.title.native}\n`
                caption += `Format : ${data.result.format}\n`
                caption += `Chapters : ${data.result.chapters}\n`
                caption += `Volume : ${data.result.volumes}\n`
                caption += `Status : ${data.result.status}\n`
                caption += `Source : ${data.result.source}\n`
                caption += `Start Date : ${data.result.startDate.day} - ${data.result.startDate.month} - ${data.result.startDate.year}\n`
                caption += `End Date : ${data.result.endDate.day} - ${data.result.endDate.month} - ${data.result.endDate.year}\n`
                caption += `Genre : ${data.result.genres.join(', ')}\n`
                caption += `Synonyms : ${data.result.synonyms.join(', ')}\n`
                caption += `Score : ${data.result.averageScore}%\n`
                caption += `Characters : \n`
                for (var x of data.result.characters.nodes) {
                    caption += `- ${x.name.full} (${x.name.native})\n`
                }
                caption += `\nDescription : ${data.result.description}`
                sock.sendMessage(from, { image: { url: data.result.coverImage.large }, caption })
            })
            break
        case 'anime':
            if (args.length == 0) return reply(`Example: ${prefix + command} Gotoubun No Hanayome`)
            axios.get(`https://api.lolhuman.xyz/api/anime?apikey=${apikey}&query=${full_args}`).then(({ data }) => {
                var caption = `Id : ${data.result.id}\n`
                caption += `Id MAL : ${data.result.idMal}\n`
                caption += `Title : ${data.result.title.romaji}\n`
                caption += `English : ${data.result.title.english}\n`
                caption += `Native : ${data.result.title.native}\n`
                caption += `Format : ${data.result.format}\n`
                caption += `Episodes : ${data.result.episodes}\n`
                caption += `Duration : ${data.result.duration} mins.\n`
                caption += `Status : ${data.result.status}\n`
                caption += `Season : ${data.result.season}\n`
                caption += `Season Year : ${data.result.seasonYear}\n`
                caption += `Source : ${data.result.source}\n`
                caption += `Start Date : ${data.result.startDate.day} - ${data.result.startDate.month} - ${data.result.startDate.year}\n`
                caption += `End Date : ${data.result.endDate.day} - ${data.result.endDate.month} - ${data.result.endDate.year}\n`
                caption += `Genre : ${data.result.genres.join(', ')}\n`
                caption += `Synonyms : ${data.result.synonyms.join(', ')}\n`
                caption += `Score : ${data.result.averageScore}%\n`
                caption += `Characters : \n`
                for (var x of data.result.characters.nodes) {
                    caption += `- ${x.name.full} (${x.name.native})\n`
                }
                caption += `\nDescription : ${data.result.description}`
                sock.sendMessage(from, { image: { url: data.result.coverImage.large }, caption })
            })
            break
        case 'wait':
            if (!isImage && !isQuotedImage) return reply(`Kirim gambar dengan caption ${prefix + command} atau tag gambar yang sudah dikirim`)
            var form = new FormData()
            form.append('img', stream, 'tahu.jpg')
            axios.post(`https://api.lolhuman.xyz/api/wait?apikey=${apikey}`, form).then(({ data }) => {
                var caption = `Anilist id : ${data.result.anilist_id}\n`
                caption += `MAL id : ${data.result.mal_id}\n`
                caption += `Title Romaji : ${data.result.title_romaji}\n`
                caption += `Title Native : ${data.result.title_native}\n`
                caption += `Title English : ${data.result.title_english}\n`
                caption += `at : ${data.result.at}\n`
                caption += `Episode : ${data.result.episode}\n`
                caption += `Similarity : ${data.result.similarity}`
                sock.sendMessage(from, { video: { url: data.result.video }, mimetype: 'video/mp4', caption })
            })
            break
        case 'kusonime':
            if (args.length == 0) return reply(`Example: ${prefix + command} https://kusonime.com/nanatsu-no-taizai-bd-batch-subtitle-indonesia/`)
            axios.get(`https://api.lolhuman.xyz/api/kusonime?apikey=${apikey}&url=${args[0]}`).then(({ data }) => {
                var caption = `Title : ${data.result.title}\n`
                caption += `Japanese : ${data.result.japanese}\n`
                caption += `Genre : ${data.result.genre}\n`
                caption += `Seasons : ${data.result.seasons}\n`
                caption += `Producers : ${data.result.producers}\n`
                caption += `Type : ${data.result.type}\n`
                caption += `Status : ${data.result.status}\n`
                caption += `Total Episode : ${data.result.total_episode}\n`
                caption += `Score : ${data.result.score}\n`
                caption += `Duration : ${data.result.duration}\n`
                caption += `Released On : ${data.result.released_on}\n`
                caption += `Desc : ${data.result.desc}\n`
                for (var x in data.result.link_dl) {
                    caption += `\n${x}\n`
                    for (var y in link_dl[x]) {
                        caption += `${y} - ${link_dl[x][y]}\n`
                    }
                }
                sock.sendMessage(from, { image: { url: data.result.thumbnail }, caption })
            })
            break
        case 'kusonimesearch':
            if (args.length == 0) return reply(`Example: ${prefix + command} Gotoubun No Hanayome`)
            axios.get(`https://api.lolhuman.xyz/api/kusonimesearch?apikey=${apikey}&query=${full_args}`).then(({ data }) => {
                var caption = `Title : ${data.result.title}\n`
                caption += `Japanese : ${data.result.japanese}\n`
                caption += `Genre : ${data.result.genre}\n`
                caption += `Seasons : ${data.result.seasons}\n`
                caption += `Producers : ${data.result.producers}\n`
                caption += `Type : ${data.result.type}\n`
                caption += `Status : ${data.result.status}\n`
                caption += `Total Episode : ${data.result.total_episode}\n`
                caption += `Score : ${data.result.score}\n`
                caption += `Duration : ${data.result.duration}\n`
                caption += `Released On : ${data.result.released_on}\n`
                caption += `Desc : ${data.result.desc}\n`
                for (var x in data.result.link_dl) {
                    caption += `\n${x}\n`
                    for (var y in link_dl[x]) {
                        caption += `${y} - ${link_dl[x][y]}\n`
                    }
                }
                sock.sendMessage(from, { image: { url: data.result.thumbnail }, caption })
            })
            break
        case 'otakudesu':
            if (args.length == 0) return reply(`Example: ${prefix + command} https://otakudesu.tv/lengkap/pslcns-sub-indo/`)
            axios.get(`https://api.lolhuman.xyz/api/otakudesu?apikey=${apikey}&url=${args[0]}`).then(({ data }) => {
                var text = `Title : ${data.result.title}\n`
                text += `Japanese : ${data.result.japanese}\n`
                text += `Judul : ${data.result.judul}\n`
                text += `Type : ${data.result.type}\n`
                text += `Episode : ${data.result.episodes}\n`
                text += `Aired : ${data.result.aired}\n`
                text += `Producers : ${data.result.producers}\n`
                text += `Genre : ${data.result.genres}\n`
                text += `Duration : ${data.result.duration}\n`
                text += `Studios : ${data.result.status}\n`
                text += `Rating : ${data.result.rating}\n`
                text += `Credit : ${data.result.credit}\n`
                for (var x in data.result.link_dl) {
                    text += `\n\n*${data.result.link_dl[x].title}*\n`
                    for (var y in data.result.link_dl[x].link_dl) {
                        ini_info = data.result.link_dl[x].link_dl[y]
                        text += `\n\`\`\`Reso : \`\`\`${ini_info.reso}\n`
                        text += `\`\`\`Size : \`\`\`${ini_info.size}\n`
                        text += `\`\`\`Link : \`\`\`\n`
                        down_link = ini_info.link_dl
                        for (var z in down_link) {
                            text += `${z} - ${down_link[z]}\n`
                        }
                    }
                }
                reply(text)
            })
            break
        case 'otakudesusearch':
            if (args.length == 0) return reply(`Example: ${prefix + command} Gotoubun No Hanayome`)
            axios.get(`https://api.lolhuman.xyz/api/otakudesusearch?apikey=${apikey}&query=${full_args}`).then(({ data }) => {
                var text = `Title : ${data.result.title}\n`
                text += `Japanese : ${data.result.japanese}\n`
                text += `Judul : ${data.result.judul}\n`
                text += `Type : ${data.result.type}\n`
                text += `Episode : ${data.result.episodes}\n`
                text += `Aired : ${data.result.aired}\n`
                text += `Producers : ${data.result.producers}\n`
                text += `Genre : ${data.result.genres}\n`
                text += `Duration : ${data.result.duration}\n`
                text += `Studios : ${data.result.status}\n`
                text += `Rating : ${data.result.rating}\n`
                text += `Credit : ${data.result.credit}\n`
                for (var x in data.result.link_dl) {
                    text += `\n\n*${data.result.link_dl[x].title}*\n`
                    for (var y in data.result.link_dl[x].link_dl) {
                        var info = data.result.link_dl[x].link_dl[y]
                        text += `\n\`\`\`Reso : \`\`\`${info.reso}\n`
                        text += `\`\`\`Size : \`\`\`${info.size}\n`
                        text += `\`\`\`Link : \`\`\`\n`
                        var link = info.link_dl
                        for (var z in link) {
                            text += `${z} - ${link[z]}\n`
                        }
                    }
                }
                reply(text)
            })
            break

        // Information //
        case 'kbbi':
            if (args.length == 0) return reply(`Example: ${prefix + command} kursi`)
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/kbbi?apikey=${apikey}&query=${full_args}`)
            var text = `\`\`\`Kata : ${data.result[0].nama}\`\`\`\n`
            text += `\`\`\`Kata Dasar : ${data.result[0].kata_dasar}\`\`\`\n`
            text += `\`\`\`Pelafalan : ${data.result[0].pelafalan}\`\`\`\n`
            text += `\`\`\`Bentuk Tidak Baku : ${data.result[0].bentuk_tidak_baku}\`\`\`\n\n`
            for (var x of data.result) {
                text += `\`\`\`Kode : ${x.makna[0].kelas[0].kode}\`\`\`\n`
                text += `\`\`\`Kelas : ${x.makna[0].kelas[0].nama}\`\`\`\n`
                text += `\`\`\`Artinya : \n${x.makna[0].kelas[0].deskripsi}\`\`\`\n\n`
                text += `\`\`\`Makna Lain : \n${x.makna[0].submakna}\`\`\`\n `
                text += `\`\`\`Contoh Kalimat : \n${x.makna[0].contoh}\`\`\`\n`
            }
            reply(text)
            break
        case 'brainly':
            if (args.length == 0) return reply(`Example: ${prefix + command} siapakah sukarno`)
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/brainly?apikey=${apikey}&query=${full_args}`)
            var text = 'Beberapa Pembahasan Dari Brainly :\n\n'
            for (var x of data.result) {
                text += `==============================\n`
                text += `\`\`\`Pertanyaan :\`\`\`\n${x.question.content}\n\n`
                text += `\`\`\`Jawaban :\`\`\`\n${x.answer[0].content}\n`
                text += `==============================\n\n`
            }
            reply(text)
            break
        case 'jarak':
            if (args.length == 0) return reply(`Example: ${prefix + command} jakarta - yogyakarta`)
            var text1 = full_args.split('-')[0].trim()
            var text2 = full_args.split('-')[1].trim()
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/jaraktempuh?apikey=${apikey}&kota1=${text1}&kota2=${text2}`)
            var text = `Informasi Jarak dari ${text1} ke ${text2} :\n\n`
            text += `\`\`\`◪ Asal :\`\`\` ${data.result.from.name}\n`
            text += `\`\`\`◪ Garis Lintang :\`\`\` ${data.result.from.latitude}\n`
            text += `\`\`\`◪ Garis Bujur :\`\`\` ${data.result.from.longitude}\n\n`
            text += `\`\`\`◪ Tujuan :\`\`\` ${data.result.to.name}\n`
            text += `\`\`\`◪ Garis Lintang :\`\`\` ${data.result.to.latitude}\n`
            text += `\`\`\`◪ Garis Bujur :\`\`\` ${data.result.to.longitude}\n\n`
            text += `\`\`\`◪ Jarak Tempuh :\`\`\` ${data.result.jarak}\n`
            text += `\`\`\`◪ Waktu Tempuh :\`\`\`\n`
            text += `   ╭───────────────❏\n`
            text += `❍┤ Kereta Api : ${data.result.kereta_api}\n`
            text += `❍┤ Pesawat : ${data.result.pesawat}\n`
            text += `❍┤ Mobil : ${data.result.mobil}\n`
            text += `❍┤ Motor : ${data.result.motor}\n`
            text += `❍┤ Jalan Kaki : ${data.result.jalan_kaki}\n`
            text += `   ╰───────────────❏\n`
            reply(text)
            break
        case 'urbandictionary':
            var { data } = await axios.get(`http://lolhuman.herokuapp.com/api/urdict?apikey=${apikey}&query=${full_args}`)
            for (var x of data.result) {
                var text = `\`\`\`Meaning :\n${x.definition}\`\`\`\n\n`
                text += `\`\`\`Link : ${x.permalink}\`\`\`\n\n`
                text += `\`\`\`Sounds Url : ${x.sound_urls[0]}\`\`\`\n\n`
                text += `\`\`\`Like : ${x.thumbs_up}\`\`\`\n\n`
                text += `\`\`\`Dislike : ${x.thumbs_down}\`\`\`\n\n`
                text += `\`\`\`Created On : \n${x.written_on}\`\`\`\n\n`
                text += `\`\`\`Author : ${x.author}\`\`\`\n\n`
                text += `\`\`\`Word : ${x.word}\`\`\`\n\n`
                text += `\`\`\`Defined Id : ${x.defid}\`\`\`\n\n`
                text += `\`\`\`Example : ${x.example}\`\`\`\n\n`
            }
            reply(text)
            break
        case 'chord':
            if (args.length == 0) return reply(`Example: ${prefix + command} Melukis senja`)
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/chord?apikey=${apikey}&query=${full_args}`)
            var text = `Title : ${data.result.title}\n`
            text += `Chord : \n${data.result.chord}`
            reply(text)
            break
        case 'heroml':
            if (args.length == 0) return reply(`Example: ${prefix + command} Fanny`)
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/heroml/${full_args}?apikey=${apikey}`)
            var caption = `Name : ${data.result.hero_name}\n`
            caption += `Entrance Quotes : ${data.result.ent_quotes}\n`
            caption += `Role : ${data.result.detail.role}\n`
            caption += `Specialty : ${data.result.detail.specialty}\n`
            caption += `Laning : ${data.result.detail.laning_recommendation}\n`
            caption += `Release : ${data.result.detail.release_date}\n`
            caption += `Movement speed : ${data.result.attr.movement_speed}\n`
            caption += `Physical attack : ${data.result.attr.physical_attack}\n`
            caption += `Magic power : ${data.result.attr.magic_power}\n`
            caption += `Physical defense : ${data.result.attr.physical_defense}\n`
            caption += `Magic defense : ${data.result.attr.magic_defense}\n`
            caption += `Critical rate : ${data.result.attr.basic_atk_crit_rate}\n`
            caption += `Hp : ${data.result.attr.hp}\n`
            caption += `Mana : ${data.result.attr.mana}\n`
            caption += `Mana regen : ${data.result.attr.mana_regen}\n`
            sock.sendMessage(from, { image: { url: data.result.icon }, caption })
            break
        case 'mlstalk':
            if (args.length == 0) return reply(`Example: ${prefix + command} 84830127/2169`)
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/mobilelegend/${args[0]}?apikey=${apikey}`)
            reply(data.result)
            break
        case 'genshin':
            if (args.length == 0) return reply(`Example: ${prefix + command} jean`)
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/genshin/${full_args}?apikey=${apikey}`)
            var caption = `Name : ${data.result.title}\n`
            caption += `Intro : ${data.result.intro}\n`
            caption += `Icon : ${data.result.icon}\n`
            await sock.sendMessage(from, { image: { url: data.result.cover1 }, caption })
            await sock.sendMessage(from, { audio: { url: data.result.cv[0].audio[0] }, mimetype: 'audio/mp4' })
            break
        case 'qrreader':
            if (!isImage && !isQuotedImage) return reply(`Kirim gambar dengan caption ${prefix + command} atau tag gambar yang sudah dikirim`)
            var form = new FormData()
            form.append('img', stream, { filename: 'tahu.jpg' })
            var { data } = await axios.post(`https://api.lolhuman.xyz/api/read-qr?apikey=${apikey}`, form)
            reply('Result: ' + data.result)
            break
        case 'wikipedia':
            if (args.length == 0) return reply(`Example: ${prefix + command} Tahu`)
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/wiki?apikey=${apikey}&query=${full_args}`)
            reply(data.result)
            break
        case 'translate':
            if (args.length == 0) return reply(`Example: ${prefix + command} en Tahu Bacem`)
            var kode_negara = args[0]
            args.shift()
            var text = args.join(' ')
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/translate/auto/${kode_negara}?apikey=${apikey}&text=${text}`)
            init_txt = `From : ${data.result.from}\n`
            init_txt += `To : ${data.result.to}\n`
            init_txt += `Original : ${data.result.original}\n`
            init_txt += `Translated : ${data.result.translated}\n`
            init_txt += `Pronunciation : ${data.result.pronunciation}\n`
            reply(init_txt)
            break
        case 'brainly':
            if (args.length == 0) return reply(`Example: ${prefix + command} Soekarno adalah`)
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/brainly?apikey=${apikey}&query=${full_args}`)
            var text = 'Result : \n'
            for (var x of data.result) {
                text += `${x.title}\n`
                text += `${x.url}\n\n`
            }
            reply(text)
            break
        case 'jadwaltv':
            if (args.length == 0) return reply(`Example: ${prefix + command} RCTI`)
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/jadwaltv/${args[0]}?apikey=${apikey}`)
            var text = `Jadwal TV ${args[0].toUpperCase()}\n`
            for (var x in data.result) {
                text += `${x} - ${data.result[x]}\n`
            }
            reply(text)
            break
        case 'jadwaltvnow':
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/jadwaltv/now?apikey=${apikey}`)
            var text = `Jadwal TV Now :\n`
            for (var x in data.result) {
                text += `${x.toUpperCase()}${data.result[x]}\n\n`
            }
            reply(text)
            break
        case 'newsinfo':
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/newsinfo?apikey=${apikey}`)
            var text = 'Result :\n'
            for (var x of data.result) {
                text += `Title : ${x.title}\n`
                text += `Author : ${x.author}\n`
                text += `Source : ${x.source.name}\n`
                text += `Url : ${x.url}\n`
                text += `Published : ${x.publishedAt}\n`
                text += `Description : ${x.description}\n\n`
            }
            reply(text)
            break
        case 'cnnindonesia':
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/cnnindonesia?apikey=${apikey}`)
            var text = 'Result :\n'
            for (var x of data.result) {
                text += `Judul : ${x.judul}\n`
                text += `Link : ${x.link}\n`
                text += `Tipe : ${x.tipe}\n`
                text += `Published : ${x.waktu}\n\n`
            }
            reply(text)
            break
        case 'cnnnasional':
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/cnnindonesia/nasional?apikey=${apikey}`)
            var text = 'Result :\n'
            for (var x of data.result) {
                text += `Judul : ${x.judul}\n`
                text += `Link : ${x.link}\n`
                text += `Tipe : ${x.tipe}\n`
                text += `Published : ${x.waktu}\n\n`
            }
            reply(text)
            break
        case 'cnninternasional':
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/cnnindonesia/internasional?apikey=${apikey}`)
            var text = 'Result :\n'
            for (var x of data.result) {
                text += `Judul : ${x.judul}\n`
                text += `Link : ${x.link}\n`
                text += `Tipe : ${x.tipe}\n`
                text += `Published : ${x.waktu}\n\n`
            }
            reply(text)
            break
        case 'infogempa':
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/infogempa?apikey=${apikey}`)
            var caption = `Lokasi : ${data.result.lokasi}\n`
            caption += `Waktu : ${data.result.waktu}\n`
            caption += `Potensi : ${data.result.potensi}\n`
            caption += `Magnitude : ${data.result.magnitude}\n`
            caption += `Kedalaman : ${data.result.kedalaman}\n`
            caption += `Koordinat : ${data.result.koordinat}`
            sock.sendMessage(from, { image: { url: data.result.map }, caption })
            break
        case 'lirik':
            if (args.length == 0) return reply(`Example: ${prefix + command} Melukis Senja`)
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/lirik?apikey=${apikey}&query=${full_args}`)
            reply(data.result)
            break
        case 'cuaca':
            if (args.length == 0) return reply(`Example: ${prefix + command} Yogyakarta`)
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/cuaca/${args[0]}?apikey=${apikey}`)
            var text = `Tempat : ${data.result.tempat}\n`
            text += `Cuaca : ${data.result.cuaca}\n`
            text += `Angin : ${data.result.angin}\n`
            text += `Description : ${data.result.description}\n`
            text += `Kelembapan : ${data.result.kelembapan}\n`
            text += `Suhu : ${data.result.suhu}\n`
            text += `Udara : ${data.result.udara}\n`
            text += `Permukaan laut : ${data.result.permukaan_laut}\n`
            sock.sendMessage(from, { location: { degreesLatitude: data.result.latitude, degreesLongitude: data.result.longitude } }, {quoted: msg})
            reply(text)
            break
        case 'covidindo':
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/corona/indonesia?apikey=${apikey}`)
            var text = `Positif : ${data.result.positif}\n`
            text += `Sembuh : ${data.result.sembuh}\n`
            text += `Dirawat : ${data.result.dirawat}\n`
            text += `Meninggal : ${data.result.meninggal}`
            reply(text)
            break
        case 'covidglobal':
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/corona/global?apikey=${apikey}`)
            var text = `Positif : ${data.result.positif}\n`
            text += `Sembuh : ${data.result.sembuh}\n`
            text += `Dirawat : ${data.result.dirawat}\n`
            text += `Meninggal : ${data.result.meninggal}`
            reply(text)
            break
        case 'kodepos':
            if (args.length == 0) return reply(`Example: ${prefix + command} Slemanan or ${prefix + command} 66154`)
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/kodepos?apikey=${apikey}&query=${full_args}`)
            var text = `Provinsi : ${data.result[0].province}\n`
            text += `Kabupaten : ${data.result[0].city}\n`
            text += `Kecamatan : ${data.result[0].subdistrict}\n`
            text += `Kelurahan : ${data.result[0].urban}\n`
            text += `Kode Pos : ${data.result[0].postalcode}`
            reply(text)
            break
        case 'jadwalbola':
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/jadwalbola?apikey=${apikey}`)
            var text = 'Jadwal Bola :\n'
            for (var x of data.result) {
                text += `Hari : ${x.hari}\n`
                text += `Jam : ${x.jam}\n`
                text += `Event : ${x.event}\n`
                text += `Match : ${x.match}\n`
                text += `TV : ${x.tv}\n\n`
            }
            reply(text)
            break
        case 'indbeasiswa':
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/indbeasiswa?apikey=${apikey}`)
            var text = 'Info Beasiswa :\n'
            for (var x of data.result) {
                text += `Title : ${x.title}\n`
                text += `Link : ${x.link}\n\n`
            }
            reply(text)
            break
        case 'hoax':
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/turnbackhoax?apikey=${apikey}`)
            var text = 'Info Hoax :\n'
            for (var x of data.result) {
                text += `Title : ${x.title}\n`
                text += `Link : ${x.link}\n`
                text += `Posted : ${x.posted}\n`
                text += `Description : ${x.desc}\n\n`
            }
            reply(text)
            break
        case 'nsfwcheck':
            if (!isImage && !isQuotedImage) return reply(`Kirim gambar dengan caption ${prefix + command} atau tag gambar yang sudah dikirim`)
            var form = new FormData()
            form.append('img', stream, { filename: 'tahu.jpg' })
            var { data } = await axios.post(`https://api.lolhuman.xyz/api/nsfwcheck?apikey=${apikey}`, form)
            var is_nsfw = 'No'
            if (Number(data.result.replace('%', '')) >= 50) {
                is_nsfw = 'Yes'
            }
            reply(`Is NSFW? ${is_nsfw}\nNSFW Score : ${data.result}`)
            break
        case 'ocr':
            if (!isImage && !isQuotedImage) return reply(`Kirim gambar dengan caption ${prefix + command} atau tag gambar yang sudah dikirim`)
            var form = new FormData()
            form.append('img', stream, { filename: 'tahu.jpg' })
            var { data } = await axios.post(`https://api.lolhuman.xyz/api/ocr?apikey=${apikey}`, form)
            reply(`Result : ${data.result}`)
            break

        // Movie & Story
        case 'lk21':
            if (args.length == 0) return reply(`Example: ${prefix + command} Transformer`)
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/lk21?apikey=${apikey}&query=${full_args}`)
            var caption = `Title : ${data.result.title}\n`
            caption += `Link : ${data.result.link}\n`
            caption += `Genre : ${data.result.genre}\n`
            caption += `Views : ${data.result.views}\n`
            caption += `Duration : ${data.result.duration}\n`
            caption += `Tahun : ${data.result.tahun}\n`
            caption += `Rating : ${data.result.rating}\n`
            caption += `Desc : ${data.result.desc}\n`
            caption += `Actors : ${data.result.actors.join(', ')}\n`
            caption += `Location : ${data.result.location}\n`
            caption += `Date Release : ${data.result.date_release}\n`
            caption += `Language : ${data.result.language}\n`
            caption += `Link Download : ${data.result.link_dl}`
            sock.sendMessage(from, { image: { url: data.result.thumbnail }, caption })
            break
        case 'drakorongoing':
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/drakorongoing?apikey=${apikey}`)
            var text = 'Ongoing Drakor\n\n'
            for (var x of data.result) {
                text += `Title : ${x.title}\n`
                text += `Link : ${x.link}\n`
                text += `Thumbnail : ${x.thumbnail}\n`
                text += `Year : ${x.category}\n`
                text += `Total Episode : ${x.total_episode}\n`
                text += `Genre : ${x.genre.join(', ')}\n\n`
            }
            reply(text)
            break
        case 'wattpad':
            if (args.length == 0) return reply(`Example: ${prefix + command} https://www.wattpad.com/707367860-kumpulan-quote-tere-liye-tere-liye-quote-quote`)
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/wattpad?apikey=${apikey}&url=${args[0]}`)
            var caption = `Title : ${data.result.title}\n`
            caption += `Rating : ${data.result.rating}\n`
            caption += `Motify date : ${data.result.modifyDate}\n`
            caption += `Create date: ${data.result.createDate}\n`
            caption += `Word : ${data.result.word}\n`
            caption += `Comment : ${data.result.comment}\n`
            caption += `Vote : ${data.result.vote}\n`
            caption += `Reader : ${data.result.reader}\n`
            caption += `Pages : ${data.result.pages}\n`
            caption += `Description : ${data.result.desc}\n\n`
            caption += `Story : \n${data.result.story}`
            sock.sendMessage(from, { image: { url: data.result.photo }, caption })
            break
        case 'wattpadsearch':
            if (args.length == 0) return reply(`Example: ${prefix + command} Tere Liye`)
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/wattpadsearch?apikey=${apikey}&query=${full_args}`)
            var text = 'Wattpad Seach : \n'
            for (var x of data.result) {
                text += `Title : ${x.title}\n`
                text += `Url : ${x.url}\n`
                text += `Part : ${x.parts}\n`
                text += `Motify date : ${x.modifyDate}\n`
                text += `Create date: ${x.createDate}\n`
                text += `Coment count: ${x.commentCount}\n\n`
            }
            reply(text)
            break
        case 'cerpen':
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/cerpen?apikey=${apikey}`)
            var text = `Title : ${data.result.title}\n`
            text += `Creator : ${data.result.creator}\n`
            text += `Story :\n${data.result.cerpen}`
            reply(text)
            break
        case 'ceritahoror':
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/ceritahoror?apikey=${apikey}`)
            var caption = `Title : ${data.result.title}\n`
            caption += `Desc : ${data.result.desc}\n`
            caption += `Story :\n${data.result.story}\n`
            sock.sendMessage(from, { image: { url: data.result.thumbnail }, caption })
            break

        // Searching
        case 'gimage':
        case 'konachan':
        case 'wallpapersearch':
            if (args.length == 0) return reply(`Example: ${prefix + command} loli kawaii`)
            if (command === 'wallpapersearch') {
                command = 'wallpaper'
            }
            sock.sendMessage(from, { image: { url: `https://api.lolhuman.xyz/api/${command}?apikey=${apikey}&query=${full_args}` } }, {quoted: msg})
            break
        case 'gimage2':
            if (args.length == 0) return reply(`Example: ${prefix + command} loli kawaii`)
            axios.get(`https://api.lolhuman.xyz/api/gimage2?apikey=${apikey}&query=${full_args}`).then(({ data }) => {
                for (var x of data.result.slice(0, 5)) {
                    sock.sendMessage(from, { image: { url: x } }, {quoted: msg})
                }
            })
            break
        case 'wallpapersearch2':
            if (args.length == 0) return reply(`Example: ${prefix + command} loli kawaii`)
            axios.get(`https://api.lolhuman.xyz/api/wallpaper2?apikey=${apikey}&query=${full_args}`).then(({ data }) => {
                sock.sendMessage(from, { image: { url: data.result } }, {quoted: msg})
            })
            break
        case 'playstore':
            if (args.length == 0) return reply(`Example: ${prefix + command} telegram`)
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/playstore?apikey=${apikey}&query=${full_args}`)
            var text = 'Play Store Search : \n'
            for (var x of data.result) {
                text += `Name : ${x.title}\n`
                text += `ID : ${x.appId}\n`
                text += `Developer : ${x.developer}\n`
                text += `Link : ${x.url}\n`
                text += `Price : ${x.priceText}\n`
                text += `Price : ${x.price}\n\n`
            }
            reply(text)
            break
        case 'shopee':
            if (args.length == 0) return reply(`Example: ${prefix + command} tas gendong`)
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/shopee?apikey=${apikey}&query=${full_args}`)
            var text = 'Shopee Search : \n'
            for (var x of data.result) {
                text += `Name : ${x.name}\n`
                text += `Terjual : ${x.sold}\n`
                text += `Stock : ${x.stock}\n`
                text += `Lokasi : ${x.shop_loc}\n`
                text += `Link : ${x.link_produk}\n\n`
            }
            reply(text)
            break
        case 'google':
            if (args.length == 0) return reply(`Example: ${prefix + command} loli kawaii`)
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/gsearch?apikey=${apikey}&query=${full_args}`)
            var text = 'Google Search : \n'
            for (var x of data.result) {
                text += `Title : ${x.title}\n`
                text += `Link : ${x.link}\n`
                text += `Desc : ${x.desc}\n\n`
            }
            reply(text)
            break

        // Random Text //
        case 'quotes':
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/random/quotes?apikey=${apikey}`)
            reply(`_${data.result.quote}_\n\n*― ${data.result.by}*`)
            break
        case 'quotesanime':
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/random/quotesnime?apikey=${apikey}`)
            reply(`_${data.result.quote}_\n\n*― ${data.result.character}*\n*― ${data.result.anime} ${data.result.episode}*`)
            break
        case 'quotesdilan':
            quotedilan = await axios.get(`https://api.lolhuman.xyz/api/quotes/dilan?apikey=${apikey}`)
            reply(quotedilan.result)
            break
        case 'faktaunik':
        case 'katabijak':
        case 'pantun':
        case 'bucin':
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/random/${command}?apikey=${apikey}`)
            reply(data.result)
            break
        case 'randomnama':
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/random/nama?apikey=${apikey}`)
            reply(data.result)
            break

        // Entertainment
        case 'asupan':
            axios.get(`https://api.lolhuman.xyz/api/asupan?apikey=${apikey}`).then(({ data }) => {
                sock.sendMessage(from, { video: { url: data.result }, mimetype: 'video/mp4' })
            })
            break
        case 'wancak':
            sock.sendMessage(from, { image: { url: `https://api.lolhuman.xyz/api/onecak?apikey=${apikey}` } }, {quoted: msg})
            break

        // Primbon
        case 'artinama':
            if (args.length == 0) return reply(`Example: ${prefix + command} LoL Human`)
            axios.get(`https://api.lolhuman.xyz/api/artinama?apikey=${apikey}&nama=${full_args}`).then(({ data }) => {
                reply(data.result)
            })
            break
        case 'jodoh':
            if (args.length == 0) return reply(`Example: ${prefix + command} Tahu & Bacem`)
            axios.get(`https://api.lolhuman.xyz/api/jodoh/${full_args.split('&')[0]}/${full_args.split('&')[1]}?apikey=${apikey}`).then(({ data }) => {
                var text = `Positif : ${data.result.positif}\n`
                text += `Negative : ${data.result.negatif}\n`
                text += `Deskripsi : ${data.result.deskripsi}`
                reply(text)
            })
            break
        case 'weton':
            if (args.length == 0) return reply(`Example: ${prefix + command} 12 12 2020`)
            axios.get(`https://api.lolhuman.xyz/api/weton/${args[0]}/${args[1]}/${args[2]}?apikey=${apikey}`).then(({ data }) => {
                var text = `Weton : ${data.result.weton}\n`
                text += `Pekerjaan : ${data.result.pekerjaan}\n`
                text += `Rejeki : ${data.result.rejeki}\n`
                text += `Jodoh : ${data.result.jodoh}`
                reply(text)
            })
            break
        case 'jadian':
            if (args.length == 0) return reply(`Example: ${prefix + command} 12 12 2020`)
            axios.get(`https://api.lolhuman.xyz/api/jadian/${args[0]}/${args[1]}/${args[2]}?apikey=${apikey}`).then(({ data }) => {
                var text = `Karakteristik : ${data.result.karakteristik}\n`
                text += `Deskripsi : ${data.result.deskripsi}`
                reply(text)
            })
            break
        case 'tebakumur':
            if (args.length == 0) return reply(`Example: ${prefix + command} LoL Human`)
            axios.get(`https://api.lolhuman.xyz/api/tebakumur?apikey=${apikey}&name=${full_args}`).then(({ data }) => {
                var text = `Nama : ${data.result.name}\n`
                text += `Umur : ${data.result.age}`
                reply(text)
            })
            break

        case '1977':
        case 'aden':
        case 'brannan':
        case 'brooklyn':
        case 'clarendon':
        case 'gingham':
        case 'hudson':
        case 'inkwell':
        case 'earlybird':
        case 'kelvin':
        case 'lark':
        case 'lofi':
        case 'maven':
        case 'mayfair':
        case 'moon':
        case 'nashville':
        case 'perpetua':
        case 'reyes':
        case 'rise':
        case 'slumber':
        case 'stinson':
        case 'toaster':
        case 'valencia':
        case 'walden':
        case 'willow':
        case 'xpro2':
        case 'pencil':
        case 'quotemaker3':
        case 'roundsticker':
        case 'stickerwm':
            if (!isImage && !isQuotedImage) return reply(`Kirim gambar dengan caption ${prefix + command} atau tag gambar yang sudah dikirim`)
            var url = `https://api.lolhuman.xyz/api/filter/${command}?apikey=${apikey}`
            var form = new FormData()
            form.append('img', stream, 'tahu.jpg')

            if (command === 'pencil') {
                url = `https://api.lolhuman.xyz/api/editor/pencil?apikey=${apikey}`
            }
            if (command === 'quotemaker3') {
                url = `https://api.lolhuman.xyz/api/quotemaker3?apikey=${apikey}`
                form.append('text', full_args)
            }
            if (command === 'roundsticker') {
                url = `https://api.lolhuman.xyz/api/convert/towebpwround?apikey=${apikey}`
            }
            if (command === 'stickerwm') {
                url = `https://api.lolhuman.xyz/api/convert/towebpauthor?apikey=${apikey}`
                form.append('package', 'Aishiteruyo')
                form.append('author', 'PSATIR')
            }

            axios
                .post(url, form, { responseType: 'arraybuffer' })
                .then(({ data }) => {
                    if (command === 'roundsticker' || command === 'stickerwm') {
                        return sock.sendMessage(from, { sticker: data })
                    }
                    sock.sendMessage(from, { image: data })
                })
                .catch(console.error)
            break
			 case 'tagall': 
			   if (!isGroup) return reply ('ONLY GROUP BAKA !!!')
         if (isGroupAdmins || isOwner) {
let teks = `══✪〘 *👥 Tag All* 〙✪══
 
 ➲ *Pesan : ${q ? q : 'kosong'}*\n\n`
                for (let mem of groupMembers) {
                teks += `⭔ @${mem.id.split('@')[0]}\n`
                }
                sock.sendMessage(from, { text: teks, mentions: groupMembers.map(a => a.id) }, { quoted: msg })
                                }
                break
		case 'hidetag':
                if (!isGroup) return reply ('ONLY GROUP BAKA !!!')
         

                if (isGroupAdmins || isOwner) {
                sock.sendMessage(from, { text : q ? q : '' , mentions: groupMembers.map(a => a.id)}, { quoted: msg })
                } else {
                     reply('ONLY ADMIN BAKA  !!!')
                }
            break	
			case "toimg":
if (!isQuotedSticker) return reply('ONLY FOR STICKER')
//await adReply(ind.wait(), "Sticker To Image", `~> Request By ${pushname}`, msg)
let rand = await Math.floor(Math.random()*7613786)
var rand1 = rand+'.webp' 
let buffer = await downloadAndSaveMediaMessage("sticker", "./"+rand1)

var rand2 = rand+'.png'			   
			    fs.writeFileSync(`./${rand1}`, buffer)
			    if (isQuotedSticker && msg.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.isAnimated !== true) {
			    exec(`ffmpeg -i ./${rand1} ./${rand2}`, (err) => {
			      fs.unlinkSync(`./${rand1}`)
			      if (err) return reply(err)
			      sock.sendMessage(from, { image: fs.readFileSync(`${rand2}`) }, { quoted: msg })
			    
				  fs.unlinkSync(`${rand2}`)
			    })
			    } else {
			    /*
		          webp2mp4File(`./${rand1}`).then( data => {
			       fs.unlinkSync(`./${rand1}`)
			       sock.sendMessage(from, { video: { url: data.result }}, { quoted: msg })
			       
				  })*/
			    }
break
        case 'sticker':
        case 's':
            if (!isImage && !isQuotedImage) return reply
            var stream = await downloadContentFromMessage(msg.message[mediaType], mediaType.replace('Message', ''))
            let stickerStream = new PassThrough()
            if (isImage || isQuotedImage) {
                ffmpeg(stream)
                    .on('start', function (cmd) {
                        console.log(`Started : ${cmd}`)
                    })
                    .on('error', function (err) {
                        console.log(`Error : ${err}`)
                    })
                    .on('end', function () {
                        console.log('Finish')
                    })
                    .addOutputOptions([
                        `-vcodec`,
                        `libwebp`,
                        `-vf`,
                        `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`,
                    ])
                    .toFormat('webp')
                    .writeToStream(stickerStream)
                sock.sendMessage(from, { sticker: { stream: stickerStream } }, {quoted: msg})
            } else if (isVideo || isQuotedVideo) {
                ffmpeg(stream)
                    .on('start', function (cmd) {
                        console.log(`Started : ${cmd}`)
                    })
                    .on('error', function (err) {
                        console.log(`Error : ${err}`)
                    })
                    .on('end', async () => {
                        sock.sendMessage(from, { sticker: { url: `./temp/stickers/${sender}.webp` } }).then(() => {
                            fs.unlinkSync(`./temp/stickers/${sender}.webp`)
                            console.log('Finish')
                        })
                    })
                    .addOutputOptions([
                        `-vcodec`,
                        `libwebp`,
                        `-vf`,
                        `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`,
                    ])
                    .toFormat('webp')
                    .save(`./temp/stickers/${sender}.webp`)
            }
            break

        // Stalk
        case 'stalkig':
            if (args.length == 0) return reply(`Example: ${prefix + command} jessnolimit`)
            axios.get(`https://api.lolhuman.xyz/api/stalkig/${args[0]}?apikey=${apikey}`).then(({ data }) => {
                var caption = `Username : ${data.result.username}\n`
                caption += `Full Name : ${data.result.fullname}\n`
                caption += `Posts : ${data.result.posts}\n`
                caption += `Followers : ${data.result.followers}\n`
                caption += `Following : ${data.result.following}\n`
                caption += `Bio : ${data.result.bio}`
                sock.sendMessage(from, { image: { url: data.result.photo_profile }, caption })
            })
            break
        case 'stalkgithub':
            if (args.length == 0) return reply(`Example: ${prefix + command} LoL-Human`)
            axios.get(`https://api.lolhuman.xyz/api/github/${args[0]}?apikey=${apikey}`).then(({ data }) => {
                var caption = `Name : ${data.result.name}\n`
                caption += `Link : ${data.result.url}\n`
                caption += `Public Repo : ${data.result.public_repos}\n`
                caption += `Public Gists : ${data.result.public_gists}\n`
                caption += `Followers : ${data.result.followers}\n`
                caption += `Following : ${data.result.following}\n`
                caption += `Bio : ${data.result.bio}`
                sock.sendMessage(from, { image: { url: data.result.avatar }, caption })
            })
            break
        case 'stalktwitter':
            if (args.length == 0) return reply(`Example: ${prefix + command} jokowi`)
            axios.get(`https://api.lolhuman.xyz/api/twitter/${args[0]}?apikey=${apikey}`).then(({ data }) => {
                var caption = `Username : ${data.result.screen_name}\n`
                caption += `Name : ${data.result.name}\n`
                caption += `Tweet : ${data.result.tweet}\n`
                caption += `Joined : ${data.result.joined}\n`
                caption += `Followers : ${data.result.followers}\n`
                caption += `Following : ${data.result.following}\n`
                caption += `Like : ${data.result.like}\n`
                caption += `Description : ${data.result.description}`
                sock.sendMessage(from, { image: { url: data.result.profile_picture }, caption })
            })
            break
        case 'stalktiktok':
            if (args.length == 0) return reply(`Example: ${prefix + command} bulansutena`)
            axios.get(`https://api.lolhuman.xyz/api/stalktiktok/${args[0]}?apikey=${apikey}`).then(({ data }) => {
                var caption = `Username : ${data.result.username}\n`
                caption += `Nickname : ${data.result.nickname}\n`
                caption += `Followers : ${data.result.followers}\n`
                caption += `Followings : ${data.result.followings}\n`
                caption += `Likes : ${data.result.likes}\n`
                caption += `Video : ${data.result.video}\n`
                caption += `Bio : ${data.result.bio}\n`
                sock.sendMessage(from, { image: { url: data.result.user_picture }, caption })
            })
            break

        // Other
        case 'ssweb':
            if (args.length == 0) return reply(`Example: ${prefix + command} https://api.lolhuman.xyz`)
            sock.sendMessage(from, { image: { url: `https://api.lolhuman.xyz/api/ssweb?apikey=${apikey}&url=${args[0]}` } }, {quoted: msg})
            break
        case 'ssweb2':
            if (args.length == 0) return reply(`Example: ${prefix + command} https://api.lolhuman.xyz`)
            sock.sendMessage(from, { image: { url: `https://api.lolhuman.xyz/api/sswebfull?apikey=${apikey}&url=${args[0]}` } }, {quoted: msg})
            break
        case 'shortlink':
            if (args.length == 0) return reply(`Example: ${prefix + command} https://api.lolhuman.xyz`)
            axios.get(`https://api.lolhuman.xyz/api/ouoshortlink?apikey=${apikey}&url=${args[0]}`).then(({ data }) => {
                reply(data.result)
            })
            break

        // Random Image //
        case 'art':
        case 'bts':
        case 'exo':
        case 'elf':
        case 'loli':
        case 'neko':
        case 'waifu':
        case 'shota':
        case 'husbu':
        case 'sagiri':
        case 'shinobu':
        case 'megumin':
        case 'wallnime':
        case 'quotesimage':
		{
            let buttons = [
                    {buttonId: `${prefix + command}`, buttonText: {displayText: 'Next Image'}, type: 1}
                ]
                let buttonMessage = {
                    image: { url: `https://api.lolhuman.xyz/api/random/${command}?apikey=${apikey}` },
                    caption: `◦ With ${botName} ◦`,
                    footer: `_CULTIVATION ENTITY DEV_`,
                    buttons: buttons,
                    headerType: 4
                }
                sock.sendMessage(from, buttonMessage, { quoted: msg })
            }
            break
            //sock.sendMessage(from, { image: { url: `https://api.lolhuman.xyz/api/random/${command}?apikey=${apikey}` } }, {quoted: msg})
            //break
case 'coffe': case 'kopi': {
            let buttons = [
                    {buttonId: `.coffe`, buttonText: {displayText: 'Next Image'}, type: 1}
                ]
                let buttonMessage = {
                    image: { url: 'https://coffee.alexflipnote.dev/random' },
                    caption: `☕ Random Coffe`,
                    footer: `☕ Random Coffe`,
                    buttons: buttons,
                    headerType: 4
                }
                sock.sendMessage(from, buttonMessage, { quoted: msg })
            }
            break
case 'nsfw' :

 
 if (!isGroup) return reply('only group admin')
              if (!isGroupAdmins) return reply('only group admin')
              if (!isBotGroupAdmins) return reply(`Bot Harus jadi Admin`)
					if (args.length < 1) return reply(`untuk mengaktifkan ketik : ${prefix}nsfw 1`)
					if (Number(args[0]) === 1) {
						if (isnsfw) return reply('Sudah Aktif Kak')
						nsfw.push(from)
						fs.writeFileSync('./assets/nsfw.json', JSON.stringify(nsfw))
						reply('「 SUKSES 」Fitur NSFW Diaktifkan | Bebas mencari harta karun >\\<')
					  //sock.sendMessage(from, `NSFW ACTIVE`, text)
					  //sock.sendMessage(from, {text: "NSFW ACTIVE"})
					} else if (Number(args[0]) === 0) {
						if (!isnsfw) return reply('Sudah Mati Kak')
						var ini = nsfw.indexOf(from)
						nsfw.splice(ini, 1)
						fs.writeFileSync('./assets/nsfw.json', JSON.stringify(nsfw))
						reply('「 SUKSES 」Fitur NSFW Dimatikan | Cukup penjelajahan hari ini')
					} else {
						reply('1 untuk mengaktifkan, 0 untuk mematikan')
					}
					break
case 'antilink' :

 
 if (!isGroup) return reply('only group admin')
              if (!isGroupAdmins) return reply('only group admin')
              if (!isBotGroupAdmins) return reply(`Bot Harus jadi Admin`)
					if (args.length < 1) return reply(`untuk mengaktifkan ketik : ${prefix}antilink 1`)
					if (Number(args[0]) === 1) {
						if (isantilink) return reply('Sudah Aktif Kak')
						antilink.push(from)
						fs.writeFileSync('./assets/antilink.json', JSON.stringify(antilink))
						reply('「 SUKSES 」Fitur ANTILINK AKTIF')
					  //sock.sendMessage(from, `NSFW ACTIVE`, text)
					  //sock.sendMessage(from, {text: "NSFW ACTIVE"})
					} else if (Number(args[0]) === 0) {
						if (!isantilink) return reply('Sudah Mati Kak')
						var ini = antilink.indexOf(from)
						antilink.splice(ini, 1)
						fs.writeFileSync('./assets/antilink.json', JSON.stringify(antilink))
						reply('「 SUKSES 」Fitur ANTILINK MATI')
					} else {
						reply('1 untuk mengaktifkan, 0 untuk mematikan')
					}
					break
case 'welcome' :

 
 if (!isGroup) return reply('only group admin')
              if (!isGroupAdmins) return reply('only group admin')
              if (!isBotGroupAdmins) return reply(`Bot Harus jadi Admin`)
					if (args.length < 1) return reply(`untuk mengaktifkan ketik : ${prefix}welcome 1`)
					if (Number(args[0]) === 1) {
						if (iswelcome) return reply('ALREADY ACTIVE')
						welcome.push(from)
						fs.writeFileSync('./assets/welcome.json', JSON.stringify(welcome))
						reply('「 SUKSES 」Fitur welcome enable')
					  //sock.sendMessage(from, `welcome ACTIVE`, text)
					  //sock.sendMessage(from, {text: "welcome ACTIVE"})
					} else if (Number(args[0]) === 0) {
						if (!iswelcome) return reply('ALREADY DISABLE')
						var ini = welcome.indexOf(from)
						welcome.splice(ini, 1)
						fs.writeFileSync('./assets/welcome.json', JSON.stringify(welcome))
						reply('「 SUKSES 」Fitur welcome disable')
					} else {
						reply('1 untuk mengaktifkan, 0 untuk mematikan')
					}
					break
        case 'chiisaihentai':
        case 'trap':
        case 'blowjob':
        case 'yaoi':
        case 'ecchi':
        case 'hentai':
        case 'ahegao':
        case 'hololewd':
        case 'sideoppai':
        case 'animefeets':
        case 'animebooty':
        case 'animethighss':
        case 'hentaiparadise':
        case 'animearmpits':
        case 'hentaifemdom':
        case 'lewdanimegirls':
        case 'biganimetiddies':
        case 'animebellybutton':
        case 'hentai4everyone':
		if (!isnsfw) return	reply('*NSFW MATI* (.nsfw 1 | untuk mengaktifkan & .nsfw 0 | untuk mematikan | cari harta karun secukupnya saja | *note: fitur hanya bekerja dalam grup*)')
         {
            let buttons = [
                    {buttonId: `${prefix + command}`, buttonText: {displayText: 'Next Image'}, type: 1}
                ]
                let buttonMessage = {
                    image: { url: `https://api.lolhuman.xyz/api/random/nsfw/${command}?apikey=${apikey}` },
                    caption: `◦ With ${botName} ◦`,
                    footer: `_CULTIVATION ENTITY DEV_`,
                    buttons: buttons,
                    headerType: 4
                }
                sock.sendMessage(from, buttonMessage, { quoted: msg })
            } 
		//sock.sendMessage(from, { image: { url: `https://api.lolhuman.xyz/api/random/nsfw/${command}?apikey=${apikey}` } }, {quoted: msg})
		      //buttons = [{buttonId: `${prefix + command}`,buttonText:{displayText: `➡️Next`},type:1}]
              //imageMsg = (await imsg.prepareMessageMedia(buff, "imageMessage", { thumbnail: buff, })).imageMessage
              //buttonsMessage = {footerText:'KAWAI BOT', imageMessage: imageMsg,
              //contentText:`Jangan Lupa Follow @wan_awannn`,buttons,headerType:4}
              //prep = await imsg.prepareMessageFromContent(from,{buttonsMessage},{quoted: freply})
              //imsg.relayWAMessage(prep)
    
            break

        case 'bj':
        case 'ero':
        case 'cum':
        case 'feet':
        case 'yuri':
        case 'trap':
        case 'lewd':
        case 'feed':
        case 'eron':
        case 'solo':
        case 'gasm':
        case 'poke':
        case 'anal':
        case 'holo':
        case 'tits':
        case 'kuni':
        case 'kiss':
        case 'erok':
        case 'smug':
        case 'baka':
        case 'solog':
        case 'feetg':
        case 'lewdk':
        case 'waifu':
        case 'pussy':
        case 'femdom':
        case 'cuddle':
        case 'hentai':
        case 'eroyuri':
        case 'cum_jpg':
        case 'blowjob':
        case 'erofeet':
        case 'holoero':
        case 'classic':
        case 'erokemo':
        case 'fox_girl':
        case 'futanari':
        case 'lewdkemo':
        case 'wallpaper':
        case 'pussy_jpg':
        case 'kemonomimi':
        case 'nsfw_avatar':
		if (!isnsfw) return	reply('*NSFW MATI* (.nsfw 1 | untuk mengaktifkan & .nsfw 0 | untuk mematikan | cari harta karun secukupnya saja | *note: fitur hanya bekerja dalam grup*)')
					{
            let buttons = [
                    {buttonId: `${prefix + command}`, buttonText: {displayText: 'Next Image'}, type: 1}
                ]
                let buttonMessage = {
                    image: { url: `https://api.lolhuman.xyz/api/random2/${command}?apikey=${apikey}` },
                    caption: `◦ With ${botName} ◦`,
                    footer: `_CULTIVATION ENTITY DEV_`,
                    buttons: buttons,
                    headerType: 4
                }
                sock.sendMessage(from, buttonMessage, { quoted: msg })
            } 
            //sock.sendMessage(from, { image: { url: `https://api.lolhuman.xyz/api/random2/${command}?apikey=${apikey}` } }, {quoted: msg})
            break
//vhtear
case 'comictext' :
					
    //if (!isRegistered) return reply(nad.noregis())
    //if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
    
    if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}comictext Noel`)
    
    vhbuff = await getBuffer(`https://api.vhtear.com/comic_text?text=${q}&apikey=nekobotofficial`)
    sock.sendMessage(from, {image: vhbuff}, {quoted: msg})
    break
case 'hekerlogo' :
    
    //if (!isRegistered) return reply(nad.noregis())
    //if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
    
    if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}hekerlogo Noel`)
    reply(`[🗿] Buset Hemker`)
    vhbuff = await getBuffer(`https://api.vhtear.com/hacker_avatar?text=${q}&apikey=nekobotofficial`)
    sock.sendMessage(from, {image: vhbuff}, {quoted: msg})
    break
case 'graffiti' :
    
    //if (!isRegistered) return reply(nad.noregis())
    //if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
    
    var gh = body.slice(10)
    var vl = gh.split("&")[0];
    var za = gh.split("&")[1];
    if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}graffiti Noel & Gamteng`)
    
    vhbuff = await getBuffer(`https://api.vhtear.com/cool_wall_graffiti?text1=${vl}&text2=${za}&apikey=nekobotofficial`)
    sock.sendMessage(from, {image: vhbuff}, {quoted: msg})
    break
case 'glowtext' :
    
    //if (!isRegistered) return reply(nad.noregis())
    //if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
    
    if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}glowtext Noel`)
    
    vhbuff = await getBuffer(`https://api.vhtear.com/glow_metallic?text=${q}&apikey=nekobotofficial`)
    sock.sendMessage(from, {image: vhbuff}, {quoted: msg})
    break
case 'covertext' :
    
    //if (!isRegistered) return reply(nad.noregis())
    //if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
    
    if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}covertext Noel`)
    
    vhbuff = await getBuffer(`https://api.vhtear.com/cover_banner?text=${q}&apikey=nekobotofficial`)
    sock.sendMessage(from, {image: vhbuff}, {quoted: msg})
    break
case 'narutotext' :
    
    //if (!isRegistered) return reply(nad.noregis())
    //if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
    
    if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}narutotext Noel`)
    
    vhbuff = await getBuffer(`https://api.vhtear.com/naruto_text?text=${q}&apikey=nekobotofficial`)
    sock.sendMessage(from, {image: vhbuff}, {quoted: msg})
    break
case 'erodedtext' :
    
    //if (!isRegistered) return reply(nad.noregis())
    //if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
    
    if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}erodedtext Noel`)
    
    vhbuff = await getBuffer(`https://api.vhtear.com/eroded_metal?text=${q}&apikey=nekobotofficial`)
    sock.sendMessage(from, {image: vhbuff}, {quoted: msg})
    break
case 'walltext' :
    
    //if (!isRegistered) return reply(nad.noregis())
    //if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
    
    if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}walltext Noel`)
    
    vhbuff = await getBuffer(`https://api.vhtear.com/the_wall?text=${q}&apikey=nekobotofficial`)
    sock.sendMessage(from, {image: vhbuff}, {quoted: msg})
    break
case 'vietteltext' :
    
    //if (!isRegistered) return reply(nad.noregis())
    //if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
    
    if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}vietteltext Noel`)
    
    vhbuff = await getBuffer(`https://api.vhtear.com/viettel_text?text=${q}&apikey=nekobotofficial`)
    sock.sendMessage(from, {image: vhbuff}, {quoted: msg})
    break
case 'valorantbanner':
    
if (args.length < 1) return reply(`Text Mana Kak?\n*Contoh ${prefix}valorantbanner PSATIR|Totemo|Kawaii*`)
ct = body.slice(15)
ll1 = ct.split("|")[0];
ll2 = ct.split("|")[1];
ll3 = ct.split("|")[2];
buffer = await getBuffer(`http://api.lolhuman.xyz/api/ephoto3/valorantbanner?apikey=${settings.lolkey}&text1=${ll1}&text2=${ll2}&text3=${ll3}`)

sock.sendMessage(from, buffer, image, { quoted: msg, caption: 'Nih Hasilnya...' })
break
case 'wingstext' :
    
    //if (!isRegistered) return reply(nad.noregis())
    //if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
    
    if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}wingstext Noel`)
    
    vhbuff = await getBuffer(`https://api.vhtear.com/wings_galaxy?text=${q}&apikey=nekobotofficial`)
    sock.sendMessage(from, {image: vhbuff}, {quoted: msg})
    break
case 'halloween' :
    
    //if (!isRegistered) return reply(nad.noregis())
    //if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
    
    if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}halloween Noel`)
    
    vhbuff = await getBuffer(`https://api.vhtear.com/halloween_text?text=${q}&apikey=nekobotofficial`)
    sock.sendMessage(from, {image: vhbuff}, {quoted: msg})
    break
case 'graffiti2' :
    
    //if (!isRegistered) return reply(nad.noregis())
    //if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
    
    var gh = body.slice(11)
    var vi = gh.split("&")[0];
    var za = gh.split("&")[1];
    if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}graffiti2 Noel & Gamteng`)
    
    vhbuff = await getBuffer(`https://api.vhtear.com/girl_graffiti?text1=${vi}&text2=${za}&apikey=nekobotofficial`)
    sock.sendMessage(from, {image: vhbuff}, {quoted: msg})
    break
case 'graffiti3' :
    
    //if (!isRegistered) return reply(nad.noregis())
    //if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
    
    if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}graffiti3 Noel`)
    
    vhbuff = await getBuffer(`https://api.vhtear.com/cartoon_graffiti?text=${q}&apikey=nekobotofficial`)
    sock.sendMessage(from, {image: vhbuff}, {quoted: msg})
    break
case 'foiltext' :
    
    //if (!isRegistered) return reply(nad.noregis())
    //if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
    
    if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}foiltext Noel`)
    
    vhbuff = await getBuffer(`https://api.vhtear.com/foil_text?text=VHTEAR&apikey=nekobotofficial`)
    sock.sendMessage(from, {image: vhbuff}, {quoted: msg})
    break
case 'bloodtext' :
    
    //if (!isRegistered) return reply(nad.noregis())
    //if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
    
    if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}bloodtext Noel`)
    
    vhbuff = await getBuffer(`https://api.vhtear.com/blood_text?text=${q}&apikey=nekobotofficial`)
    sock.sendMessage(from, {image: vhbuff}, {quoted: msg})
    break
case 'hekertext' :
    
    //if (!isRegistered) return reply(nad.noregis())
    //if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
    
    if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}hekertext Noel`)
    reply(`[😎] Heker AbiZzz`)
    vhbuff = await getBuffer(`https://api.vhtear.com/matrix_text?text=${q}&apikey=nekobotofficial`)
    sock.sendMessage(from, {image: vhbuff}, {quoted: msg})
    break
case 'bokehtext' :
    
    //if (!isRegistered) return reply(nad.noregis())
    //if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
    
    if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}bokehtext Noel`)
    
    vhbuff = await getBuffer(`https://api.vhtear.com/bokeh_text?text=${q}&apikey=nekobotofficial`)
    sock.sendMessage(from, {image: vhbuff}, {quoted: msg})
    break
case 'carbontext' :
    
    //if (!isRegistered) return reply(nad.noregis())
    //if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
    
    if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}carbontext Noel`)
    
    vhbuff = await getBuffer(`https://api.vhtear.com/carbon_text?text=${q}&apikey=nekobotofficial`)
    
	sock.sendMessage(from, {image: vhbuff}, {quoted: msg})
    break
case 'avengerstext' :
    
    //if (!isRegistered) return reply(nad.noregis())
    //if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
    
    var gh = body.slice(14)
    var vo = gh.split("&")[0];
    var za = gh.split("&")[1];
    if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}avengerstext Noel & Gamteng`)
    
    vhbuff = await getBuffer(`https://api.vhtear.com/avengers_text?text1=${vo}&text2=${za}&apikey=nekobotofficial`)
    sock.sendMessage(from, {image: vhbuff}, {quoted: msg})
    break
case 'watertext' :
    
    //if (!isRegistered) return reply(nad.noregis())
    //if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
    
    if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}watertext Noel`)
    
    vhbuff = await getBuffer(`https://api.vhtear.com/water_maker?text=${q}&apikey=nekobotofficial`)
    sock.sendMessage(from, {image: vhbuff}, {quoted: msg})
    break
case 'firetext' :
    
    //if (!isRegistered) return reply(nad.noregis())
    //if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
    
    if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}firetext Noel`)
    
    vhbuff = await getBuffer(`https://api.vhtear.com/fire_maker?text=${q}&apikey=nekobotofficial`)
    sock.sendMessage(from, {image: vhbuff}, {quoted: msg})
    break
case 'metaltext' :
    
    //if (!isRegistered) return reply(nad.noregis())
    //if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
    
    if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}metaltext Noel`)
    
    vhbuff = await getBuffer(`https://api.vhtear.com/metal_maker?text=${q}&apikey=nekobotofficial`)
    sock.sendMessage(from, {image: vhbuff}, {quoted: msg})
    break
case 'ballontext' :
    
    //if (!isRegistered) return reply(nad.noregis())
    //if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
    
    var gh = body.slice(12)
    var va = gh.split("&")[0];
    var za = gh.split("&")[1];
    if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}ballontext Noel & Gamteng`)
    
    vhbuff = await getBuffer(`https://api.vhtear.com/balloonmaker?text1=${va}&text2=${za}&apikey=nekobotofficial`)
    sock.sendMessage(from, {image: vhbuff}, {quoted: msg})
    break
case 'gemboktext' :
    
    //if (!isRegistered) return reply(nad.noregis())
    //if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
    
    var gh = body.slice(12)
    var vt = gh.split("&")[0];
    var za = gh.split("&")[1];
    if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}gemboktext 11 01 2021 & Noel dan Nadia`)
    
    vhbuff = await getBuffer(`https://api.vhtear.com/padlock?text1=${vt}&text2=${za}&apikey=nekobotofficial`)
    sock.sendMessage(from, {image: vhbuff}, {quoted: msg})
    break
case 'bannerff' :
    
    //if (!isRegistered) return reply(nad.noregis())
    //if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
    
    var gh = body.slice(10)
    var vx = gh.split("&")[0];
    var za = gh.split("&")[1];
    if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}bannerff Noel & Gamteng`)
    
    vhbuff = await getBuffer(`https://api.vhtear.com/bannerff?title=${vx}&text=${za}&apikey=nekobotofficial`)
    sock.sendMessage(from, {image: vhbuff}, {quoted: msg})
    break
case 'aloklogo' :
    
    //if (!isRegistered) return reply(nad.noregis())
    //if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
    
    if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}aloklogo Noel`)
    
    vhbuff = await getBuffer(`https://api.vhtear.com/logoff?hero=alok&text=${q}&apikey=nekobotofficial`)
    sock.sendMessage(from, {image: vhbuff}, {quoted: msg})
    break
case 'mllogo' :
    
    //if (!isRegistered) return reply(nad.noregis())
    //if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
    
    if (args.length < 1) return reply(`Text Mana Cuy?\n*Contoh ${prefix}mllogo PSATIR|kirei*`)
ct = body.slice(8)
ll = ct.split("|")[0];
l2 = ct.split("|")[1];

    
    vhbuff = await getBuffer(`https://api.vhtear.com/logoml?hero=${ll}&text=${l2}&apikey=nekobotofficial`)
    sock.sendMessage(from, {image: vhbuff}, {quoted: msg})
    break
case 'gamelogo' :
    
    //if (!isRegistered) return reply(nad.noregis())
    //if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
    
    if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}gamelogo Noel`)
    
    vhbuff = await getBuffer(`https://api.vhtear.com/gamelogo?text=${q}&apikey=nekobotofficial`)
    sock.sendMessage(from, {image: vhbuff}, {quoted: msg})
    break
case 'blackpink' :
    
    //if (!isRegistered) return reply(nad.noregis())
    //if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
    
    if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}blackpink Noel`)
    reply(`[😱] Hah Blekping :v`)
    vhbuff = await getBuffer(`https://api.vhtear.com/blackpinkicon?text=${q}&apikey=nekobotofficial`)
    sock.sendMessage(from, {image: vhbuff}, {quoted: msg})
    break
case 'thundername' :
    
    //if (!isRegistered) return reply(nad.noregis())
    //if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
    
    if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}thundername Noel`)
    
    vhbuff = await getBuffer(`https://api.vhtear.com/thundertext?text=${q}&apikey=nekobotofficial`)
    sock.sendMessage(from, {image: vhbuff}, {quoted: msg})
    break
case 'silktext' :
    
    //if (!isRegistered) return reply(nad.noregis())
    //if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
    
    if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}silktext Noel`)
    
    vhbuff = await getBuffer(`https://api.vhtear.com/silktext?text=${q}&apikey=nekobotofficial`)
    sock.sendMessage(from, {image: vhbuff}, {quoted: msg})
    break
case 'partytext' :
    
    //if (!isRegistered) return reply(nad.noregis())
    //if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
    
    if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}partytext Noel`)
    
    vhbuff = await getBuffer(`https://api.vhtear.com/partytext?text=${q}&apikey=nekobotofficial`)
    sock.sendMessage(from, {image: vhbuff}, {quoted: msg})
    break
case 'romancetext' :
    
    //if (!isRegistered) return reply(nad.noregis())
    //if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
    
    if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}romancetext Noel`)
    
    vhbuff = await getBuffer(`https://api.vhtear.com/romancetext?text=${q}&apikey=nekobotofficial`)
    sock.sendMessage(from, {image: vhbuff}, {quoted: msg})
    break
case 'googletext' :
    
    //if (!isRegistered) return reply(nad.noregis())
    //if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
    
    var gh = body.slice(12)
    var vb = gh.split("&")[0];
    var za = gh.split("&")[1];
    var ga = gh.split("&")[2];
    if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}googletext Noel & Noel Gans & Noel Baik`)
    
    vhbuff = await getBuffer(`https://api.vhtear.com/googletext?text1=${vb}&text2=${za}&text3=${ga}&apikey=nekobotofficial`)
    sock.sendMessage(from, {image: vhbuff}, {quoted: msg})
    break
case 'glowtext2' :
    
    //if (!isRegistered) return reply(nad.noregis())
    //if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
    
    if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}glowtext2 Noel`)
    
    vhbuff = await getBuffer(`https://api.vhtear.com/glowtext?text=${q}&apikey=nekobotofficial`)
    sock.sendMessage(from, {image: vhbuff}, {quoted: msg})
    break
case 'lovemessage' :
    
    //if (!isRegistered) return reply(nad.noregis())
    //if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
    
    if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}lovemessage Noel`)
    
    vhbuff = await getBuffer(`https://api.vhtear.com/lovemessagetext?text=${q}&apikey=nekobotofficial`)
    sock.sendMessage(from, {image: vhbuff}, {quoted: msg})
    break
case 'glitchtext' :
    
    //if (!isRegistered) return reply(nad.noregis())
    //if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
    
    var gh = body.slice(12)
    var vs = gh.split("&")[0];
    var za = gh.split("&")[1];
    if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}glitchtext Noel & Gamteng`)
    
    vhbuff = await getBuffer(`https://api.vhtear.com/glitchtext?text1=${vs}&text2=${za}&apikey=nekobotofficial`)
    sock.sendMessage(from, {image: vhbuff}, {quoted: msg})
    break
case 'galaxytext' :
    
    //if (!isRegistered) return reply(nad.noregis())
    //if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
    
    if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}galaxytext Noel`)
    
    vhbuff = await getBuffer(`https://api.vhtear.com/galaxytext?text=${q}&apikey=nekobotofficial`)
    sock.sendMessage(from, {image: vhbuff}, {quoted: msg})
    break
case 'pornhub' :
    
    //if (!isRegistered) return reply(nad.noregis())
    //if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
    
    var gh = body.slice(9)
    var vf = gh.split("&")[0];
    var za = gh.split("&")[1];
    if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}pornhub Noel & Gamteng`)
    
    vhbuff = await getBuffer(`https://api.vhtear.com/pornlogo?text1=${vf}&text2=${za}&apikey=nekobotofficial`)
    sock.sendMessage(from, {image: vhbuff}, {quoted: msg})
    break
case 'hartatahta' :
    
    //if (!isRegistered) return reply(nad.noregis())
    //if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
    
    if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}hartatahta Noel`)
    reply(`[❗] Hirti Tihti Tai Anjg :v`)
    vhbuff = await getBuffer(`https://api.vhtear.com/hartatahta?text=${q}&apikey=nekobotofficial`)
    sock.sendMessage(from, {image: vhbuff}, {quoted: msg})
    break
case 'wetglass' :
    
    //if (!isRegistered) return reply(nad.noregis())
    //if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
    
    if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}wetglass Noel`)
    
    vhbuff = await getBuffer(`https://api.vhtear.com/wetglass?text=${q}&apikey=nekobotofficial`)
    sock.sendMessage(from, {image: vhbuff}, {quoted: msg})
    break
case 'stylelogo' :
    
    //if (!isRegistered) return reply(nad.noregis())
    //if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
    
    if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}stylelogo Noel`)
    
    vhbuff = await getBuffer(`https://api.vhtear.com/stylelogo?text=${q}&apikey=nekobotofficial`)
    sock.sendMessage(from, {image: vhbuff}, {quoted: msg})
    break
case 'watercolor' :
    
    //if (!isRegistered) return reply(nad.noregis())
    //if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
    
    if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}watercolor Noel`)
    
    vhbuff = await getBuffer(`https://api.vhtear.com/watercolor?text=${q}&apikey=nekobotofficial`)
    sock.sendMessage(from, {image: vhbuff}, {quoted: msg})
    break
case 'wolflogo' :
    
    //if (!isRegistered) return reply(nad.noregis())
    //if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
    
    var gh = body.slice(10)
    var vk = gh.split("&")[0];
    var za = gh.split("&")[1];
    if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}wolflogo Noel & Gamteng`)
    
    vhbuff = await getBuffer(`https://api.vhtear.com/avatarwolf?text1=${vk}&text2=${za}&apikey=nekobotofficial`)
    sock.sendMessage(from, {image: vhbuff}, {quoted: msg})
    break


        // Textprome //
        case 'blackpink':
        case 'neon':
        case 'greenneon':
        case 'advanceglow':
        case 'futureneon':
        case 'sandwriting':
        case 'sandsummer':
        case 'sandengraved':
        case 'metaldark':
        case 'neonlight':
        case 'holographic':
        case 'text1917':
        case 'minion':
        case 'deluxesilver':
        case 'newyearcard':
        case 'bloodfrosted':
        case 'halloween':
        case 'jokerlogo':
        case 'fireworksparkle':
        case 'natureleaves':
        case 'bokeh':
        case 'toxic':
        case 'strawberry':
        case 'box3d':
        case 'roadwarning':
        case 'breakwall':
        case 'icecold':
        case 'luxury':
        case 'cloud':
        case 'summersand':
        case 'horrorblood':
        case 'thunder':
            if (args.length == 0) return reply(`Example: ${prefix + command} LoL Human`)
            sock.sendMessage(from, { image: { url: `https://api.lolhuman.xyz/api/textprome/${command}?apikey=${apikey}&text=${full_args}` } }, {quoted: msg})
            break

        case 'pornhub':
        case 'glitch':
        case 'avenger':
        case 'space':
        case 'ninjalogo':
        case 'marvelstudio':
        case 'lionlogo':
        case 'wolflogo':
        case 'steel3d':
        case 'wallgravity':
            if (args.length == 0) return reply(`Example: ${prefix + command} LoL Human`)
            sock.sendMessage(from, { image: { url: `https://api.lolhuman.xyz/api/textprome2/${command}?apikey=${apikey}&text1=${args[0]}&text2=${args[1]}` } }, {quoted: msg})
            break

        // Photo Oxy //
        case 'shadow':
        case 'cup':
        case 'cup1':
        case 'romance':
        case 'smoke':
        case 'burnpaper':
        case 'lovemessage':
        case 'undergrass':
        case 'love':
        case 'coffe':
        case 'woodheart':
        case 'woodenboard':
        case 'summer3d':
        case 'wolfmetal':
        case 'nature3d':
        case 'underwater':
        case 'golderrose':
        case 'summernature':
        case 'letterleaves':
        case 'glowingneon':
        case 'fallleaves':
        case 'flamming':
        case 'harrypotter':
        case 'carvedwood':
            if (args.length == 0) return reply(`Example: ${prefix + command} LoL Human`)
            sock.sendMessage(from, { image: { url: `https://api.lolhuman.xyz/api/photooxy1/${command}?apikey=${apikey}&text=${full_args}` } }, {quoted: msg})
            break

        case 'tiktoktext':
        case 'arcade8bit':
        case 'battlefield4':
        case 'pubg':
            if (args.length == 0) return reply(`Example: ${prefix + command} LoL Human`)
            sock.sendMessage(from, { image: { url: `https://api.lolhuman.xyz/api/photooxy2/${command}?apikey=${apikey}&text1=${args[0]}&text2=${args[1]}` } }, {quoted: msg})
            break

        // Ephoto 360 //
        case 'wetglass':
        case 'multicolor3d':
        case 'watercolor':
        case 'luxurygold':
        case 'galaxywallpaper':
        case 'lighttext':
        case 'beautifulflower':
        case 'puppycute':
        case 'royaltext':
        case 'heartshaped':
        case 'birthdaycake':
        case 'galaxystyle':
        case 'hologram3d':
        case 'greenneon':
        case 'glossychrome':
        case 'greenbush':
        case 'metallogo':
        case 'noeltext':
        case 'glittergold':
        case 'textcake':
        case 'starsnight':
        case 'wooden3d':
        case 'textbyname':
        case 'writegalacy':
        case 'galaxybat':
        case 'snow3d':
        case 'birthdayday':
        case 'goldplaybutton':
        case 'silverplaybutton':
        case 'freefire':
            if (args.length == 0) return reply(`Example: ${prefix + command} LoL Human`)
            sock.sendMessage(from, { image: { url: `https://api.lolhuman.xyz/api/ephoto1/${command}?apikey=${apikey}&text=${text}` } }, {quoted: msg})
            break
			  case 'speed': {
            reply('Testing Speed...')
            let cp = require('child_process')
            let { promisify } = require('util')
            let exec = promisify(cp.exec).bind(cp)
          let o
          try {
          o = await exec('python speed.py')
          } catch (e) {
          o = e
         } finally {
        let { stdout, stderr } = o
        if (stdout.trim()) reply(stdout)
        if (stderr.trim()) reply(stderr)
            }
            }
            break
			case 'ping': case 'botstatus': case 'statusbot': {
                const used = process.memoryUsage()
                const cpus = os.cpus().map(cpu => {
                    cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0)
			        return cpu
                })
                const cpu = cpus.reduce((last, cpu, _, { length }) => {
                    last.total += cpu.total
                    last.speed += cpu.speed / length
                    last.times.user += cpu.times.user
                    last.times.nice += cpu.times.nice
                    last.times.sys += cpu.times.sys
                    last.times.idle += cpu.times.idle
                    last.times.irq += cpu.times.irq
                    return last
                }, {
                    speed: 0,
                    total: 0,
                    times: {
			            user: 0,
			            nice: 0,
			            sys: 0,
			            idle: 0,
			            irq: 0
                }
                })
                let timestamp = speed()
                let latensi = speed() - timestamp
                neww = performance.now()
                oldd = performance.now()
                respon = `
Kecepatan Respon ${latensi.toFixed(4)} _Second_ \n ${oldd - neww} _miliseconds_

💻 Info Computer
RAM: ${formatp(os.totalmem() - os.freemem())} / ${formatp(os.totalmem())}

_NodeJS Memory Usaage_
${Object.keys(used).map((key, _, arr) => `${key.padEnd(Math.max(...arr.map(v=>v.length)),' ')}: ${formatp(used[key])}`).join('\n')}

${cpus[0] ? `_Total CPU Usage_
${cpus[0].model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}
_CPU Core(s) Usage (${cpus.length} Core CPU)_
${cpus.map((cpu, i) => `${i + 1}. ${cpu.model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}`).join('\n\n')}` : ''}
                `.trim()
                reply(respon)
            }
            break
       
	   default:
            if (!isGroup && !isCmd){
				  simi = await fetchJson(`https://api.simsimi.net/v2/?text=${body}&lc=id`)
                        reply(simi.success)
                    } 
            break
    }
} catch (e) {
   e = String(e)
   if (!e.includes("this.isZero")) {
	console.log('Message : %s', color(e, 'cyan'))
// sock.sendMessage(`62881026500047-1617261999@g.us`, {text: `─────「 *LOG ERROR* 」─────\n\n\`\`\`${e}\`\`\`\n\n────────────────────`},  {quoted: msg})
  ///  sock.sendMessage(`628815887040@s.whatsapp.net`, {text: `─────「 *LOG ERROR* 」─────\n\n\`\`\`${e}\`\`\`\n\n────────────────────`},  {quoted: msg})
	//sock.sendMessage(`6289530480310@s.whatsapp.net`, {text: `─────「 *LOG ERROR* 」─────\n\n\`\`\`${e}\`\`\`\n\n────────────────────`},  {quoted: msg})
	//sock.sendMessage(`6282123384291@s.whatsapp.net`, {text: `─────「 *LOG ERROR* 」─────\n\n\`\`\`${e}\`\`\`\n\n────────────────────`},  {quoted: msg})
    }
   }
    }
   
	